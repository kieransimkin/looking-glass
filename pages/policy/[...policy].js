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
 * @description Fetches policy data from a database and Redis cache, redirects to a
 * different URL if necessary, and assembles page properties for server-side rendering,
 * including token data and gallery information.
 *
 * @param {any} context - The Next.js server-side rendered page context object.
 *
 * @returns {any} Either an object with a property 'props' containing a data structure
 * of policy information, or an object with a redirect to another page.
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
 * @description Renders a media slideshow for an NFT policy collection, fetching data
 * and displaying tokens, handling navigation and selection changes, and integrating
 * with schema.org structured data for SEO purposes.
 *
 * @param {object} props - Used to receive data from parent components.
 *
 * @returns {JSX.Element} Rendered as a web page comprising a media slide with an
 * optional initial selection, along with structured data and meta tags for social
 * media sharing and search engine optimization.
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
            // Parses JSON data.
            d.json().then((j) => { 
                // Sets gallery state with JSON data.
                setGallery(j);
        
            });
            
        });
        
    },[policy])
    if (!dbPolicy) { 
        return <h1>Policy Not Found</h1>
    }
    /**
     * @description Takes three parameters, `i`, `onClose`, and `goFullscreen`. It returns
     * a JSX element, rendering a `BigInfoBox` component with specified properties. The
     * `item` property is assigned the value of parameter `i`, while the `goFullscreen`
     * property is invoked with argument `i` and its return value passed as a prop.
     *
     * @param {object} i - Used to display item-specific information.
     *
     * @param {Function} onClose - Used to handle closing actions.
     *
     * @param {Function} goFullscreen - Used to enable full-screen functionality.
     *
     * @returns {JSX.Element} A React component that represents a BigInfoBox element. The
     * returned component has props: `onClose`, `goFullscreen`, and `item`.
     */
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen(i)} item={i} />
    }
    /**
     * @description Fetches additional policy tokens from a server, merges them with
     * existing gallery tokens, and updates the gallery state. It conditionally swaps the
     * order of old and new tokens based on whether it's loading more or less data.
     *
     * @param {object} obj - Destructured from an input object to extract its property
     * named 'page'. It contains an integer value that represents the current page number.
     * The default value of this parameter is not specified.
     *
     * @param {number} obj.page - Used to determine pagination.
     *
     * @param {number} offset - Used to offset page number by.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        
        getData('/policyTokens?policy='+policy+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Parses JSON data.
            d.json().then((j) => { 
                // Processes API data.
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
     * @description Handles image loading errors by replacing the failed image with a
     * placeholder GIF and sets up an event listener to listen for a message from the
     * server with the correct image URL, replacing the temporary GIF with the actual image.
     *
     * @param {Event} e - Related to image loading error events.
     */
    const imgError = (e) => { 
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        /**
         * @description Listens for messages from other windows or frames, checks if they
         * contain a specific request and original URL, and updates an image source with new
         * thumbnail data if conditions are met.
         *
         * @param {object} mes - An event message from a different origin.
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
     * @description Generates a JSX function that creates an HTML list item for each item
     * in a slide bar, including an image and link to the item's URL, with event handlers
     * for click and image loading errors.
     *
     * @param {Function} click - Intended to handle item clicks.
     *
     * @param {number} ts - Used to represent thumbnail size.
     *
     * @param {number} thumbSpacing - Used to set padding for an item thumbnail.
     *
     * @returns {React.ReactNode} A functional component that generates an <li> element
     * containing an image and text, as part of a list item for a slide bar.
     */
    const slideItemHTML = (click,ts, thumbSpacing) => { 
 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Generates a high-order function that creates individual list item
     * HTML elements based on input parameters, including padding, key, and event handlers.
     * It encapsulates reusable logic for rendering a single list item with customizable
     * appearance and behavior.
     *
     * @param {Function} click - Likely used to handle an item's click event.
     *
     * @param {Function} ts - Unused.
     *
     * @param {number} thumbSpacing - Used to set padding around images.
     *
     * @returns {Function} A factory for creating list items with dynamic styles and event
     * handlers based on input parameters. The returned value can be called to generate
     * individual list item elements.
     */
    const listItemHTML = (click,ts, thumbSpacing) => { 
        return (item,s,thumbSpacing) => { 
            return <li  style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={32} /><br />{item.title}</a></Link></li>
        }
    }
    

    /**
     * @description Returns a factory function that generates an HTML table row representing
     * an item with customizable styles and content. The generated row includes a link,
     * image, title, and unit information, along with an onClick event handler and error
     * handling for the image.
     *
     * @param {Function} click - Invoked when a table row is clicked.
     *
     * @param {number} ts - Not used in the code snippet provided.
     *
     * @param {number} thumbSpacing - Used for adding horizontal padding to table rows.
     *
     * @returns {JSX.Element} A function that generates an HTML table row element (`<tr>`)
     * with several child elements including an image and text.
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
     * @description Returns a higher-order function that generates HTML for an item in a
     * thumbnail list. It takes three arguments: `click`, `ts`, and `thumbSpacing`. The
     * generated HTML includes an image, title, and link to the item's URL.
     *
     * @param {any} click - Expected to return an event handler function on invocation.
     *
     * @param {number} ts - Used to set image width.
     *
     * @param {number} thumbSpacing - Used to set padding on list items.
     *
     * @returns {() => JSX.Element} A factory function returning another function that
     * generates JSX elements for list items. Each generated element represents an item
     * with its thumbnail and title.
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
     * @description Updates the current URL by pushing a new route to the router, navigating
     * to a specific policy page based on the provided item's unit substring. The navigation
     * is performed with shallow routing, preserving the current route's query and hash.
     *
     * @param {object} item - Being passed into the function when called.
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
          
          "description": dbPolicy.description,
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