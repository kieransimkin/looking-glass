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
 * @description Retrieves a policy from a database or cache, checks for redirects,
 * and populates props with policy data. It also fetches token data, generates
 * thumbnails, and updates cache items. The function returns the populated props
 * object to be used in a server-side rendered page.
 *
 * @param {object} context - Used to access server-side data from Next.js API routes.
 *
 * @returns {object} A property bag containing the props for the page. The properties
 * of this object are policy, policyProfile, policyProfileThumb, token, and gallery
 * (which contains multiple sub-properties).
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
 * @description Renders a media slide component with policy-based data. It fetches
 * data for a given policy ID, handles loading and error states, and allows users to
 * navigate through slides, select items, and view detailed information.
 *
 * @param {any} props - Used to receive data from parent component.
 *
 * @returns {JSX.Element} A React component represented as an element tree consisting
 * of nested elements like `<Head>`, `<MediaSlide>`, and other HTML-like elements.
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
        // Retrieves policy tokens based on a given policy and updates a gallery component
        // with the retrieved data when the policy changes.
        if (!policy || policy=='') return;
        if (gallery) return;
        
        getData('/policyTokens?policy='+policy).then((d)=>{
            // Transforms JSON response.
            d.json().then((j) => { 
                // Processes JSON response and updates gallery state.
                setGallery(j);
        
            });
            
        });
        
    },[policy])
    if (!dbPolicy) { 
        return <h1>Policy Not Found</h1>
    }
    /**
     * @description Renders a component for displaying big information, which is passed
     * as an argument `item`. It also accepts two callback functions: `onClose` and
     * `goFullscreen`, allowing the caller to control the behavior of the component.
     *
     * @param {object} i - Used to pass an item of data to be rendered as big information
     * box.
     *
     * @param {Function} onClose - Intended to be called when the BigInfoBox needs to close.
     *
     * @param {Function} goFullscreen - Intended for toggling fullscreen mode.
     *
     * @returns {JSX.Element} A React component `<BigInfoBox>`.
     */
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen} item={i} />
    }
    /**
     * @description Loads additional policy tokens from a specified API endpoint and
     * updates the `gallery` state by appending or prepending the new tokens to the
     * existing array, while also updating the page number and total pages information.
     *
     * @param {object} obj - Required. It contains one property named 'page', which is
     * used to specify the current page for fetching data from the server.
     *
     * @param {number} obj.page - Used to specify the page number for fetching data.
     *
     * @param {number} offset - Used to offset pagination.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        
        getData('/policyTokens?policy='+policy+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Retrieves and updates UI state.
            d.json().then((j) => { 
                // Combines tokens from two arrays and updates state variables.
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
     * @description Handles errors when an image fails to load. It replaces the failed
     * image with a loading GIF and sets up a message listener to receive updates from
     * the browser's sandboxed origin.
     *
     * @param {Event} e - Passed from an event listener, typically an error event for an
     * image loading operation.
     */
    const imgError = (e) => { 
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        /**
         * @description Listens for messages from a different origin and checks if the message
         * is related to a new thumbnail request. If so, it updates the image source with the
         * provided URL and removes itself as an event listener.
         *
         * @param {object} mes - Received from an event.
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
     * @description Generates a reusable component for rendering slide items. It takes
     * three arguments: `click`, `ts`, and `thumbSpacing`. The function returns another
     * function that creates an HTML list item with image, title, and link, customizable
     * through these parameters.
     *
     * @param {(item: object) => void} click - Called when an item is clicked.
     *
     * @param {number} ts - Used to set the height of image thumbnails.
     *
     * @param {number} thumbSpacing - Used to add padding around an image thumbnail.
     *
     * @returns {(item) => JSX.Element} A higher-order function that takes an item and
     * returns a list item (li) element containing an image and link with additional attributes.
     */
    const slideItemHTML = (click,ts, thumbSpacing) => { 
 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Generates a reusable component for rendering list items with dynamic
     * properties such as padding, ID, link URL, and image source. It accepts three
     * parameters: a click handler, thumbnail spacing, and returns another function that
     * takes an item object and renders the list item HTML.
     *
     * @param {(item: any) => void} click - Used to specify an event handler for the click
     * action.
     *
     * @param {number} ts - Not used anywhere in the code.
     *
     * @param {number} thumbSpacing - Used to set padding for list items.
     *
     * @returns {(item, s, thumbSpacing) => JSX.Element} A higher-order function that
     * returns an HTML list item (`<li>`) element when called with specific parameters.
     */
    const listItemHTML = (click,ts, thumbSpacing) => { 
        return (item,s,thumbSpacing) => { 
            return <li  style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={32} /><br />{item.title}</a></Link></li>
        }
    }
    

    /**
     * @description Generates an HTML list item for a given `item`. It takes three
     * parameters: `click`, `ts`, and `thumbSpacing`. The function returns another function
     * that accepts an `item` and returns an `<li>` element with an image, title, and link.
     *
     * @param {(item: any) => void} click - Used to handle item clicks.
     *
     * @param {boolean} ts - Not used in this code snippet.
     *
     * @param {number} thumbSpacing - Used to set padding for thumbnail images.
     *
     * @returns {(item: object) => JSX.Element} An arrow function that generates a JSX
     * element representing a list item (`<li>`) for each item in the provided data.
     */
    const detailsItemHTML=(click,ts, thumbSpacing) => { 
        return (item) => { 
            return <li style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={64} /><br />{item.title}</a></Link></li>
        }
    }


    /**
     * @description Generates an HTML template for a thumbnail item. It takes three
     * parameters: click handler, thumb spacing, and thumbnail size. It returns a function
     * that creates a list item (LI) with a link to the item's URL, displaying the item's
     * title and thumbnail image with specified spacing and size.
     *
     * @param {(item: object) => void} click - Intended to handle click events for each
     * item.
     *
     * @param {number} ts - Used to set the width of an image.
     *
     * @param {number} thumbSpacing - Used to set the padding for thumbnails.
     *
     * @returns {(item: object) => JSX.Element} A function that generates an HTML list
     * item (`li`) with specific styles and attributes for each given `item`.
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
            i.linkUrl='/policy/'+props.policy.slug+'.'+i.unit.substr(56);
            return i;
        })
    }

    /**
     * @description Updates the current route by pushing a new path to the router when
     * an item is selected, combining the policy slug and unit name with a specific format.
     * The navigation is done in a shallow manner, preserving the current route's query
     * and hash.
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