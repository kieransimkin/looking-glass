/* eslint-disable react/display-name */
import {useState, useRef} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import path from 'path';
import { setPolicyAssetCount } from '../../utils/database.mjs';
import { promises as fs } from 'fs';
import { useEffect } from 'react';
import Head from 'next/head'
import { getData, postData } from '../../utils/Api';
import {MediaSlide} from 'react-mediaslide'
import {SmartNFTPortal} from 'smartnftportal'
import BigInfoBox from '../../components/BigInfoBox';
import {tokenPortal} from '../../utils/tokenPortal';
import { CircularProgress } from '@material-ui/core';
import { checkCacheItem, incrementCacheItem, getClient } from '../../utils/redis.mjs';
import { getPolicy} from '../../utils/database.mjs';
import { getTokenData } from '../../utils/formatter';
import LoadingTicker from '../../components/LoadingTicker';
import { getDataURL } from '../../utils/DataStore';
import OwnerList from '../../components/OwnerList';
import {ProfileObject, WithContext} from 'schema-dts'
/**
 * @description Retrieves a policy from a database or cache and generates page
 * properties, including tokens and asset data, for rendering on a server-side rendered
 * (SSR) web page. It also handles redirects and caching operations.
 *
 * @param {object} context - Used to access environment variables, query parameters,
 * etc.
 *
 * @returns {object} Assigned to a property called `props`. The shape of this object
 * can vary depending on the outcome of the function's execution.
 */
export const getServerSideProps = async (context) => { 
    const redisClient = await getClient();
    let policy = context.query.policy[0];
    const segs = policy.split('.');
    let token = segs.length>1?segs[segs.length-1]:null;
    if (token) { 
        policy = policy.substr(0,policy.length-(token.length+1));
    }
    console.log('Token '+token)
    console.log(policy);
    let result = await getPolicy(policy);
    if (!result && token) { 
        token=null;
        policy = context.query.policy[0];
        result = await getPolicy(policy);
    }
    console.log(result);
    let props = {};
    if (result) { 
        if (result.slug != policy && context.query.policy[0]!=result.slug) { 
            return {
                redirect: {
                    destination: '/policy/'+result.slug+(token?'.'+token:''),
                    permanent: true
                }
            }
        }
        props.policy = JSON.parse(JSON.stringify(result));
        props.policyProfile = await checkCacheItem('policyProfile:'+result.policyID);
        if (process.env.NODE_ENV=='production' && props.policyProfile) { 
            const thumbName = 'tokenThumb:'+props.policyProfile+':500:dark';
            let thumbURL;
            if ((thumbURL = getDataURL(thumbName,'jpg'))) {
                props.policyProfileThumb = thumbURL;
            }   
        }
        let tokens = await checkCacheItem('getTokensFromPolicy:'+result.policyID);
        await incrementCacheItem('policyHits:'+result.policyID);
        await incrementCacheItem('policyRecentHits:'+result.policyID, 3600);
        await redisClient.lPush('lg:policyHitLog:'+result.policyID, JSON.stringify(Date.now()))
        if (tokens) { 
            if (!result.assetCount) { 
                await setPolicyAssetCount(result.policyID, tokens.length);
            }
            const perPage = 10;
            let page = 0;
            let start=0,end=perPage;
            if (token) { 
                const idx = tokens.findIndex((i)=>i.unit==props.policy.policyID+token);
                page = Math.floor(idx/perPage);
                start = page*perPage;
                end = (page+1)*perPage;
            }
            const totalPages = Math.ceil(tokens.length/perPage);
            tokens = tokens.slice(start, end);
            const promises = [];
            for (const token of tokens) { 
                promises.push(getTokenData(token,true));
            }
            const tokResult = await Promise.all(promises)
            let failed = false;
            for (let c=0;c<tokResult.length;c++ ) { 
                if (!tokResult[c]) { 
                    failed=true;
                    break;
                }
                if (process.env.NODE_ENV=='production') { 
                    const thumbName = 'tokenThumb:'+tokResult[c].unit+':500:dark';
                    let thumbURL;
                    if ((thumbURL = getDataURL(thumbName,'jpg'))) {
                        tokResult[c].thumb = thumbURL;
                    }   
                }
                if (token && tokResult[c].unit==props.policy.policyID+token) { 
                    props.token=tokResult[c];
                }
            }
            if (!failed) { 
                props.gallery={tokens:tokResult, page:page, start:start, end:end, totalPages: totalPages, perPage: perPage};
            }
        }
    }
    return {
        props
    }
}

/**
 * @description Renders a media slide presentation for an NFT policy, displaying
 * tokens and allowing users to navigate through them with thumbnails, list views,
 * or details views, with pagination and lazy loading.
 *
 * @param {object} props - Passed from parent components to this component.
 *
 * @returns {JSX.Element} A React component representing an HTML page with media slide
 * functionality and structured data for search engine optimization (SEO).
 */
export default  function CIP54Playground(props) {
    const dbPolicy = props.policy;
    
    const router = useRouter();
    //let {policy} = router.query;  
    let policy = dbPolicy.policyID;
    const [gallery, setGallery] = useState(props?.gallery);
    const [mediaSlideLoading, setMediaSlideLoading]=useState(false);
    if (!policy) policy='';
    
    useEffect(() => { 
        // Fetches policy tokens data.
        if (!policy || policy=='') return;
        if (gallery) return;
        
        getData('/policyTokens?policy='+policy).then((d)=>{
            // Parses JSON data from response.
            d.json().then((j) => { 
                // Sets state from JSON data.
                setGallery(j);
        
            });
            
        });
        
    },[policy])
    if (!dbPolicy) { 
        return <h1>Policy Not Found</h1>
    }
    /**
     * @description Renders a component, returning JSX that contains a BigInfoBox with
     * properties: `onClose`, `goFullscreen`, and `item`. The `goFullscreen(i)` expression
     * evaluates to a value that is passed as the `goFullscreen` property of the BigInfoBox.
     *
     * @param {object} i - Likely an item or data to be rendered.
     *
     * @param {Function} onClose - Intended to be executed when the BigInfoBox component
     * needs to close.
     *
     * @param {Function} goFullscreen - Used to switch item to full screen mode.
     *
     * @returns {BigInfoBox} A React component.
     */
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen(i)} item={i} />
    }
    /**
     * @description Loads additional policy tokens when a user requests to view more
     * content, appending new tokens to the existing gallery array while updating the
     * gallery's page and total pages information.
     *
     * @param {object} obj - Destructured into a single property named `page`. It has a
     * default value, which means it is optional, but if not provided, it will be assigned
     * to 1 by default when the function is called.
     *
     * @param {number} obj.page - Used to track current page number.
     *
     * @param {number} offset - Intended to offset the data fetch from the current page.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        
        getData('/policyTokens?policy='+policy+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Parses JSON data.
            d.json().then((j) => { 
                // Handles pagination.
                let newArray;
                if (offset>0) { 
                    newArray = [...gallery.tokens];
                    newArray.push(...j.tokens);
                } else { 
                    newArray = [...j.tokens];
                    newArray.push(...gallery.tokens);
                }
                setGallery({tokens:newArray,page:j.page, totalPages: j.totalPages});
                setMediaSlideLoading(false);   
            });
            
        });
        console.log('Called outer load more data function');
        
    }
    /**
     * @description Replaces a failed image with a loading GIF, then monitors system
     * messages for updates to the image URL and updates it accordingly, removing the
     * event listener once the image is updated.
     *
     * @param {Event} e - An error event for the image being loaded.
     */
    const imgError = (e) => { 
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        /**
         * @description Checks if an incoming message from a different origin is for creating
         * a new thumbnail and matches the original URL being requested. If so, it updates
         * the target element's source with the provided URL and removes the event listener
         * to prevent further execution.
         *
         * @param {Event} mes - An event object received from `window.addEventListener('message')`.
         */
        const messageHandler = (mes) => { 
            if (mes.data.request=='newThumb' && mes.data.originalUrl==origSrc.replace(mes.origin,'')) { 
                e.target.src=mes.data.url;
                window.removeEventListener('message',messageHandler);
            }
        };
        window.addEventListener('message',messageHandler)
        
    }
    /**
     * @description Generates an HTML list item for a slide item, incorporating event
     * handling and conditional rendering based on image loading errors. It takes three
     * parameters: click handler, total space, and thumb spacing, then returns a memoized
     * function to create the list item element for each slide item.
     *
     * @param {Function} click - Called on item click event.
     *
     * @param {number} ts - 60 pixels more than the thumb spacing.
     *
     * @param {number} thumbSpacing - Used to set the padding around an image.
     *
     * @returns {React.ReactNode} A functional component that renders an li element with
     * image and title inside. This li element has event handlers for click and error events.
     */
    const slideItemHTML = (click,ts, thumbSpacing) => { 
 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Generates a factory function that creates list items for a UI component.
     * The generated list item is customizable with attributes such as click handler,
     * thumbnail spacing, and image error handling. It returns an HTML element representing
     * the list item.
     *
     * @param {Function} click - Intended to handle item click events.
     *
     * @param {boolean} ts - Unused.
     *
     * @param {number} thumbSpacing - Used for padding around images.
     *
     * @returns {any} A function that generates HTML for an individual list item. This
     * function takes another object as its argument and produces a string in JSX format
     * representing the HTML element.
     */
    const listItemHTML = (click,ts, thumbSpacing) => { 
        return (item,s,thumbSpacing) => { 
            return <li  style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={32} /><br />{item.title}</a></Link></li>
        }
    }
    

    /**
     * @description Generates a JSX representation of an HTML table row for a list item,
     * incorporating event handlers and props to dynamically render item details based
     * on provided data.
     *
     * @param {Function} click - Expected to return an event handler.
     *
     * @param {number} ts - 0.
     *
     * @param {number} thumbSpacing - Used to set padding for table cells.
     *
     * @returns {ReactElement<tr>} A reusable HTML table row component containing an image
     * and data fields for each item. The component has dynamic styles and event handlers
     * based on its properties.
     */
    const detailsItemHTML=(click,ts, thumbSpacing) => { 
        return (item) => { 
            return <tr style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}>
                <td width="30%"><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={64} />{item.title}</a></Link></td>
                <td width="auto"><OwnerList unit={item.unit} /></td>
                </tr>
        }
    }


    /**
     * @description Generates a reusable HTML component for displaying thumbnails. It
     * takes three arguments: a click handler, thumbnail spacing, and timestamp. The
     * returned function creates an HTML list item with a link to an image and title text,
     * customized for each item passed as an argument.
     *
     * @param {Function} click - Intended to handle item click events.
     *
     * @param {number} ts - Used for image width settings.
     *
     * @param {number} thumbSpacing - Used for setting padding on the thumbnails item.
     *
     * @returns {HTMLElement} A factory for generating list items (`li`) to be used as
     * thumbnails in an unordered list, each containing an image and title.
     */
    const thumbnailsItemHTML = (click,ts, thumbSpacing) => { 
        return (item) => { 
            return <li style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={ts} /><br />{item.title}</a></Link></li>
        }
    }
    
    /*
    
    */
   
    let title = props.policy.name+" - Cardano Looking Glass - clg.wtf"
    let description = props.policy.description;
    let url = "https://clg.wtf/policy/"+props.policy.slug;
    let image = "https://clg.wtf/"+props.policyProfileThumb;
    let policyProfileImage = image;
    let initialSelection = gallery?gallery[0]:null;
    if (!description || description.length<1) { 
        if (props.token) { 
            description = props.token.title+' is a token, part of an NFT collection called '+props.policy.name+', minted on Cardano';
        } else { 
            description=props.policy.name+' is an NFT collection, minted on Cardano'
        }
    }
    if (props.token) { 
        title = props.token.title + ' - ' + props.policy.name + ' -  Cardano Looking Glass - clg.wtf';
        url = "https://clg.wtf/policy/"+props.policy.slug+'.'+props.token.unit.substr(56);
        image = "https://clg.wtf/"+props.token.thumb;
        initialSelection=props.token;
    }
    
    let newGallery = null;
    if (gallery) {
        newGallery=gallery.tokens.map((i)=>{
            i.linkUrl='/policy/'+props.policy.slug+'.'+i.unit.substr(56);
            return i;
        })
    }

    /**
     * @description Navigates to a new URL path when an item is selected. It pushes a new
     * route onto the router stack with specific parameters: pathname, query, and hash,
     * while preventing re-rendering of the current page due to shallow navigation.
     *
     * @param {object} item - Used to access unit properties.
     */
    const selectionChange = (item) => { 
        //window.postMessage({request:'showLoading'},'*');
        router.push({
            pathname: '/policy/'+props.policy.slug+'.'+item.unit.substr(56),
            query: {  },
            hash:' '
        }, undefined, {shallow:true})
    }
    let profileStructuredData =
    {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "dateCreated": dbPolicy.createdAt,
        "dateModified": dbPolicy.lastMinted || dbPolicy.lastMoved,
        "mainEntity": {
          "@type": "Organization",
          "name": dbPolicy.name,
          "alternateName": dbPolicy.slug,
          "identifier": dbPolicy.policyID,
          "interactionStatistic": [{
            "@type": "InteractionCounter",
            "interactionType": "https://schema.org/LikeAction",
            "userInteractionCount": dbPolicy.totalHits
          }],
          
            "agentInteractionStatistic": [{
                "@type": "InteractionCounter",
                "interactionType": "https://schema.org/WriteAction",
                "userInteractionCount": dbPolicy.assetCount
              },
              {
                "@type": "InteractionCounter",
                "interactionType": "https://schema.org/ShareAction",
                "userInteractionCount": dbPolicy.totalActivity
              },
            ],
          
          "description": description,
          "image": [
            policyProfileImage,
            image
          ]
        }
    }
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:site_name" content="Cardano Looking Glass" />
                <meta property="og:url" content={url} />
                <meta property="og:image" content={image} />
                <meta property="twitter:url" content={url} />
                <meta property="twitter:domain" content="clg.wtf" />
                <meta name="twitter:image" content={image} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:card" content="summary_large_image" />
                {profileStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profileStructuredData),
          }}
        />
      )}
    
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MediaSlide initialSelection={initialSelection} slideItemHTML={slideItemHTML} listItemHTML={listItemHTML} thumbnailsItemHTML={thumbnailsItemHTML} detailsItemHTML={detailsItemHTML} selectionChange={selectionChange} renderBigInfo={renderBigInfo} renderFile={tokenPortal} onLoadMoreData={loadMoreData} loading={mediaSlideLoading} gallery={newGallery} loadingIndicator=<LoadingTicker /> pagination={{page: gallery?.page, totalPages: gallery?.totalPages }} />
        </>
    );
}