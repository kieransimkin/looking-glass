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

/**
 * @description Retrieves a policy from a database or cache based on a query parameter,
 * checks for redirects, and populates props with the policy data, token data, and
 * gallery information.
 *
 * @param {object} context - Used to access query parameters from the URL.
 *
 * @returns {object} A promise that resolves to another object containing properties:
 * policy, policyProfile, policyProfileThumb, token, and gallery with subproperties
 * tokens, page, start, end, and totalPages.
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
 * @description Renders a media slide presentation component based on policy ID and
 * token data. It fetches data from an API, handles image errors, and implements
 * pagination and selection change logic.
 *
 * @param {any} props - Intended to pass data from parent components.
 *
 * @returns {JSX.Element} A React component consisting of nested elements including
 * Head, MediaSlide and LoadingTicker.
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
        // Retrieves and updates data.

        if (!policy || policy=='') return;
        if (gallery) return;
        
        getData('/policyTokens?policy='+policy).then((d)=>{
            // Processes JSON data.

            d.json().then((j) => { 
                // Sets gallery state.

                setGallery(j);
        
            });
            
        });
        
    },[policy])
    if (!dbPolicy) { 
        return <h1>Policy Not Found</h1>
    }
    /**
     * @description Renders a `BigInfoBox` component with three props: `onClose`,
     * `goFullscreen`, and `item`. It is called with an index `i`, an `onClose` handler,
     * and a `goFullscreen` handler as arguments, passing these to the rendered component.
     *
     * @param {object} i - An item to be rendered.
     *
     * @param {Function} onClose - Invoked to close the BigInfoBox component.
     *
     * @param {Function} goFullscreen - Used to switch to fullscreen mode.
     *
     * @returns {ReactElement} An JSX representation of a component named `BigInfoBox`.
     */
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen} item={i} />
    }
    /**
     * @description Retrieves additional data for a gallery, appending or prepending it
     * to an existing array of tokens, updates the page and total pages information, and
     * sets the loading state to false.
     *
     * @param {object} obj - Specified as an argument to the function when called.
     *
     * @param {number} obj.page - Used to track current page of data.
     *
     * @param {number} offset - Used to specify the direction of data fetching.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        
        getData('/policyTokens?policy='+policy+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Updates gallery data.

            d.json().then((j) => { 
                // Merges and updates token arrays.

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
     * @description Handles errors when loading an image. It replaces the failed image
     * with a temporary placeholder, then listens for incoming messages from the browser
     * to update the image URL if a valid response is received.
     *
     * @param {Event} e - Triggered when an image loading error occurs.
     */
    const imgError = (e) => { 
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        /**
         * @description Processes incoming messages from a separate origin and updates the
         * `src` attribute of an HTML element with the received URL, ensuring it matches the
         * expected original URL pattern. Upon successful processing, it removes itself as a
         * message listener.
         *
         * @param {object} mes - A message sent from another origin.
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
     * @description Generates HTML for a slide item component, including an image and
     * title, with customizable padding and spacing. It returns a function that creates
     * a list item with a link and an event handler for clicking on the item.
     *
     * @param {(item: object) => void} click - Intended for click event handling.
     *
     * @param {number} ts - Used for setting the height of an image.
     *
     * @param {number} thumbSpacing - Used to set padding around thumb images.
     *
     * @returns {(liElement) => void} A higher-order function that takes an item as input
     * and returns a JSX element representing a list item with the specified style, key,
     * and event handlers.
     */
    const slideItemHTML = (click,ts, thumbSpacing) => { 
 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Generates a reusable component for rendering list items with customizable
     * padding and event handling for clicks. It takes three parameters: a click handler,
     * a thumbnail spacing value, and returns an inner function that renders the actual
     * HTML element.
     *
     * @param {(item: any) => void} click - Intended for handling item click events.
     *
     * @param {number} ts - Used for setting image height.
     *
     * @param {number} thumbSpacing - Used for styling purposes.
     *
     * @returns {(item, s, thumbSpacing) => JSX.Element} A higher-order function that
     * generates an HTML list item (`<li>`) element when called with specific parameters.
     */
    const listItemHTML = (click,ts, thumbSpacing) => { 
        return (item,s,thumbSpacing) => { 
            return <li  style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    

    /**
     * @description Generates HTML for a list item representing an item with details. It
     * takes three parameters: `click`, `ts`, and `thumbSpacing`. The returned function
     * accepts an item as input, creating a list item with styled padding, image, title,
     * and link, using the provided parameters.
     *
     * @param {(item: object) => void} click - Used to handle click events on list items.
     *
     * @param {number} ts - Used to set image height.
     *
     * @param {number} thumbSpacing - Used to specify the padding for an item's thumbnail.
     *
     * @returns {(item: object) => JSX.Element} A function that takes an item as an
     * argument and returns a JSX element representing an HTML list item with specific
     * properties and event handlers.
     */
    const detailsItemHTML=(click,ts, thumbSpacing) => { 
        return (item) => { 
            return <li style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }


    /**
     * @description Generates an HTML list item element (`<li>`) for a thumbnail item,
     * taking into account spacing, linking, and event handling (click). It returns a
     * function that creates the `<li>` element with attributes and children based on the
     * provided arguments.
     *
     * @param {(item: object) => void} click - Intended for handling item clicks.
     *
     * @param {number} ts - Used to set image height.
     *
     * @param {number} thumbSpacing - Used to set padding for thumbnails.
     *
     * @returns {(item: object) => JSX.Element} A function that takes an item as an
     * argument and returns a JSX element representing an HTML list item (`<li>`) with
     * various attributes and child elements.
     */
    const thumbnailsItemHTML = (click,ts, thumbSpacing) => { 
        return (item) => { 
            return <li style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    
    /*
    
    */
   
    let title = props.policy.name+" - Cardano Looking Glass - clg.wtf"
    let description = props.policy.description;
    let url = "https://clg.wtf/policy/"+props.policy.slug;
    let image = props.policyProfileThumb;
    let initialSelection = gallery?gallery[0]:null;
    if (props.token) { 
        title = props.token.title + ' - ' + props.policy.name + ' -  Cardano Looking Glass - clg.wtf';
        url = "https://clg.wtf/policy/"+props.policy.slug+'.'+props.token.unit.substr(56);
        image = props.token.thumb;
        initialSelection=props.token;
    }
    
    let newGallery = null;
    if (gallery) {
        newGallery=gallery.tokens.map((i)=>{
            // Maps over an array and modifies each element's link URL.

            i.linkUrl='/policy/'+props.policy.slug+'.'+i.unit.substr(56);
            return i;
        })
    }

    /**
     * @description Updates the URL by pushing a new route to the router. It constructs
     * a path by concatenating '/policy/' with the slug of 'props.policy' and the substring
     * of 'item.unit' starting from index 56, and sets an empty query and hash.
     *
     * @param {object} item - Used to trigger a route change.
     */
    const selectionChange = (item) => { 
        //window.postMessage({request:'showLoading'},'*');
        router.push({
            pathname: '/policy/'+props.policy.slug+'.'+item.unit.substr(56),
            query: {  },
            hash:' '
        }, undefined, {shallow:true})
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
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MediaSlide initialSelection={initialSelection} slideItemHTML={slideItemHTML} listItemHTML={listItemHTML} thumbnailsItemHTML={thumbnailsItemHTML} detailsItemHTML={detailsItemHTML} selectionChange={selectionChange} renderBigInfo={renderBigInfo} renderFile={tokenPortal} onLoadMoreData={loadMoreData} loading={mediaSlideLoading} gallery={newGallery} loadingIndicator=<LoadingTicker /> pagination={{page: gallery?.page, totalPages: gallery?.totalPages }} />
        </>
    );
}