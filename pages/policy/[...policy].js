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
 * @description Fetches and processes policy data from a Redis client to generate
 * page props for server-side rendering. It handles policy redirects, token retrieval,
 * and generates policy thumbnails based on environment settings.
 *
 * @param {any} context - An object that contains information about the server-side
 * rendering process.
 *
 * @returns {object} An object with a single property named `props`. The value of
 * this `props` property can be either a simple policy response object, or a complex
 * object containing additional data such as tokens and thumbnails, depending on the
 * execution path.
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
 * @description Renders a media slide presentation for a Cardano NFT policy, displaying
 * policy tokens with images and details, allowing users to select and navigate through
 * the tokens, and loads additional data on demand.
 *
 * @param {object} props - Passed to the component.
 *
 * @returns {JSX.Element} A React component, specifically a media slide gallery with
 * various list item and thumbnail display options.
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
        // Fetches policy tokens from an API based on the current 'policy' state and updates
        // the component's gallery with the received data.
        if (!policy || policy=='') return;
        if (gallery) return;
        
        getData('/policyTokens?policy='+policy).then((d)=>{
            // Handles JSON data.
            d.json().then((j) => { 
                // Sets gallery data.
                setGallery(j);
        
            });
            
        });
        
    },[policy])
    if (!dbPolicy) { 
        return <h1>Policy Not Found</h1>
    }
    /**
     * @description Returns a JSX element representing a Big Info Box, passing props
     * including an `item` object and two callback functions (`onClose`, `goFullscreen`)
     * to it. The `goFullscreen` prop is called with the current index as an argument.
     *
     * @param {object} i - Used to represent an item.
     *
     * @param {Function} onClose - Intended to handle closure.
     *
     * @param {Function} goFullscreen - Used to pass a callback to make the fullscreen
     * option available.
     *
     * @returns {React.ElementType} JSX element that represents a BigInfoBox component.
     */
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen(i)} item={i} />
    }
    /**
     * @description Loads additional policy tokens from a server, updating the local
     * gallery state with new tokens and pagination information. It handles loading in
     * two directions (forward and backward) based on the `offset` parameter.
     *
     * @param {object} obj - Destructured into a variable named 'page'. It appears to be
     * used as part of an API endpoint URL, representing the current page number.
     *
     * @param {number} obj.page - Used to track data pagination.
     *
     * @param {number} offset - Used to specify how many more pages to load.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        
        getData('/policyTokens?policy='+policy+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Parses JSON data and updates a gallery object.
            d.json().then((j) => { 
                // Merges new media tokens with existing ones and updates the state of a React
                // component's gallery.
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
     * placeholder. It also listens for messages from other scripts, updating the image
     * if a new thumbnail is received and removing the event listener when done.
     *
     * @param {Event} e - An object that holds information about an event.
     */
    const imgError = (e) => { 
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        /**
         * @description Removes an event listener and updates the `src` attribute of an element
         * when it receives a specific message from another origin, indicating a successful
         * replacement of a thumbnail image with a new one.
         *
         * @param {object} mes - An event message.
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
     * @description Generates a React JSX element for a slide item based on provided data
     * and styling parameters. It returns an anonymous function that takes an `item`
     * object as input, creating a unique HTML list item with image, title, and link.
     *
     * @param {Function} click - Meant to handle item clicks.
     *
     * @param {number} ts - 60 pixels more than the height of an image thumb.
     *
     * @param {number} thumbSpacing - Used for setting the left, right and bottom padding
     * of each item.
     *
     * @returns {(HTMLElement | null)} A function that returns an HTML list item element
     * (`<li>`) when invoked with an object as an argument.
     */
    const slideItemHTML = (click,ts, thumbSpacing) => { 
 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Generates a reusable list item template based on an input object, its
     * ID and link URL, with adjustable thumbnail spacing and optional click handler. The
     * generated function returns a JSX element representing the list item HTML.
     *
     * @param {any} click - Intended to return an event handler for the list item's click
     * event.
     *
     * @param {number} ts - Not used anywhere in the code provided.
     *
     * @param {number} thumbSpacing - Used to set padding on HTML elements.
     *
     * @returns {any} A higher-order function that returns a JSX element representing a
     * list item.
     */
    const listItemHTML = (click,ts, thumbSpacing) => { 
        return (item,s,thumbSpacing) => { 
            return <li  style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={32} /><br />{item.title}</a></Link></li>
        }
    }
    

    /**
     * @description Returns a memoized function that generates an HTML table row. It takes
     * three arguments: click handler, timestamp, and thumbnail spacing. The generated
     * row displays item details with a clickable title, owner list, and error handling
     * for the item image.
     *
     * @param {any} click - Likely an event handler for item click actions.
     *
     * @param {boolean} ts - Not used within this code snippet.
     *
     * @param {number} thumbSpacing - Used to set left, right, and bottom padding of table
     * rows.
     *
     * @returns {(HTMLTableRowElement)} A reference to an HTML table row element that
     * contains two table cells: one with an image and title, and another with owner information.
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
     * @description Generates a factory function that creates individual thumbnail list
     * items based on item data and external parameters, including click event handler,
     * thumbnail spacing, and total screen width, with embedded image and link elements.
     *
     * @param {Function} click - Used to specify an action on click.
     *
     * @param {number} ts - Used for thumbnail width styling.
     *
     * @param {number} thumbSpacing - Used to set horizontal spacing between thumbnails.
     *
     * @returns {(liHTML: JSX.Element) => void} A higher-order function returning another
     * function that generates an HTML list item element with specified properties.
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
    let image = "https://clg.wtf"+props.policyProfileThumb;
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
        image = "https://clg.wtf"+props.token.thumb;
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
     * @description Updates the browser's URL without making a full page reload by pushing
     * a new route to the router. It navigates to a specific path with parameters taken
     * from an item object, using a shallow navigation to preserve state.
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