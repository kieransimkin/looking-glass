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
 * @description Retrieves policy data from Redis and fetches related assets (tokens)
 * when a query parameter is provided. It handles redirects, caching, and calculates
 * page numbers for token gallery display. The function returns props for server-side
 * rendering.
 *
 * @param {object} context - Used to access the query parameters passed from a request.
 *
 * @returns {object} An object with a property named `props`, whose value can be
 * either undefined or another object containing various properties such as `policy`,
 * `policyProfile`, `token`, and `gallery`.
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
 * @description Renders a media slide component with a list of items (e.g., images,
 * videos) for a given policy ID from a database. It fetches data for the policy and
 * updates the component state accordingly, allowing users to navigate through the
 * slides and select items.
 *
 * @param {any} props - Passed to the component from its parent.
 *
 * @returns {JSX.Element} A React component that renders a set of media items with
 * pagination and loading indicators, along with metadata such as title, description,
 * URL, image, and selection change handling.
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
        // Fetches data from an API and sets it to a state.
        if (!policy || policy=='') return;
        if (gallery) return;
        
        getData('/policyTokens?policy='+policy).then((d)=>{
            // Converts data to JSON and updates gallery state.
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
     * @description Renders a `BigInfoBox` component, passing three props: `onClose`,
     * `goFullscreen`, and `item`. The `onClose` prop is passed as is, while the
     * `goFullscreen` prop is the result of calling a function with `i` as an argument.
     *
     * @param {number} i - Used as an item index.
     *
     * @param {Function} onClose - Intended to close something.
     *
     * @param {(i: number) => boolean} goFullscreen - Intended to return whether item i
     * should be displayed full-screen or not.
     *
     * @returns {JSX.Element} A React component representing a BigInfoBox with props
     * onClose, goFullscreen(i), and item equal to i.
     */
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen(i)} item={i} />
    }
    /**
     * @description Retrieves additional data for a gallery, appending or prepending it
     * to the existing data array depending on the `offset` parameter, and updates the
     * state with the new data, page number, and total pages.
     *
     * @param {object} obj - Named `page`. It is expected to be passed as an argument
     * when calling this function, along with an optional `offset` parameter. The value
     * of `page` is incremented by `offset` before being appended to the URL for the API
     * request.
     *
     * @param {number} obj.page - Used to specify the page number for retrieving data.
     *
     * @param {number} offset - Used for pagination purposes.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        
        getData('/policyTokens?policy='+policy+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Concatenates and updates an array.
            d.json().then((j) => { 
                // Concatenates tokens from two arrays and updates gallery state.
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
     * @description Handles errors when an image cannot be loaded, replacing it with a
     * loading animation GIF. It then listens for messages from a parent window to receive
     * the actual image URL and update the image source once available.
     *
     * @param {Event} e - Triggered by an error loading an image.
     */
    const imgError = (e) => { 
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        /**
         * @description Receives a message from an origin and checks if it's related to a new
         * thumbnail request. If true, it updates the source URL of the current element
         * (`e.target`) with the received URL and removes the event listener after handling
         * the message.
         *
         * @param {MessageEvent} mes - Received from an external source.
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
     * @description Generates HTML for a slide item, which is an interactive list element
     * that displays a thumbnail image and title. The function takes three arguments: a
     * click handler, a threshold size, and thumb spacing. It returns a higher-order
     * function that creates individual list items with these properties.
     *
     * @param {(item: object) => void} click - Used to handle click events on each slide
     * item.
     *
     * @param {number} ts - Used to set image height.
     *
     * @param {number} thumbSpacing - Used to set padding for the thumb images.
     *
     * @returns {(item) => JSX.Element} A higher-order function that takes an item as an
     * argument and returns a React element representing a list item (`<li>`) with various
     * properties and event handlers.
     */
    const slideItemHTML = (click,ts, thumbSpacing) => { 
 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Creates a closure that generates a list item (LI) element for each
     * item in an array, with customizable padding and event handling. The generated LI
     * element contains an image, title, and link to the item's URL.
     *
     * @param {(item: any) => void} click - Meant to handle item click events.
     *
     * @param {number} ts - Unused.
     *
     * @param {number} thumbSpacing - Used for spacing between thumbnails.
     *
     * @returns {(item, s, thumbSpacing) => JSX.Element} A higher-order function that
     * returns an HTML list item (`<li>`) with its attributes and child elements set based
     * on the input parameters.
     */
    const listItemHTML = (click,ts, thumbSpacing) => { 
        return (item,s,thumbSpacing) => { 
            return <li  style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={32} /><br />{item.title}</a></Link></li>
        }
    }
    

    /**
     * @description Generates a JSX element for an HTML list item (`<li>`) and its nested
     * elements, including a link with an image and text content, based on provided
     * properties such as click handler, thumbnail spacing, and item data.
     *
     * @param {(item: any) => void} click - Used to handle item clicks.
     *
     * @param {boolean} ts - Unused.
     *
     * @param {number} thumbSpacing - Used for padding on either side of an item's thumbnail.
     *
     * @returns {(item: object) => JSX.Element} A function that accepts an item as an
     * argument and returns a JSX element representing an HTML list item (`<li>`) with
     * various attributes and child elements.
     */
    const detailsItemHTML=(click,ts, thumbSpacing) => { 
        return (item) => { 
            return <li style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={64} /><br />{item.title}</a></Link></li>
        }
    }


    /**
     * @description Generates a JSX element representing an HTML list item (`<li>`) that
     * creates a thumbnail for each item in an array. It takes three parameters: `click`,
     * `ts`, and `thumbSpacing`.
     *
     * @param {(item: object) => void} click - Used to handle the click event of list items.
     *
     * @param {number} ts - Used to set the width of the thumbnail image.
     *
     * @param {number} thumbSpacing - Used to set left, right, and bottom padding for
     * thumbnails items.
     *
     * @returns {(item: object) => JSX.Element} A function that returns a list item (li)
     * element containing an image and text.
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
     * @description Navigates to a new URL when an item is selected, using the React
     * Router library. The URL path is constructed by concatenating '/policy/' with the
     * slug of the policy and a substring of the unit property, starting from index 56.
     *
     * @param {object} item - Used to determine the URL path.
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