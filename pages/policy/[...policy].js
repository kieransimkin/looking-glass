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
 * @description Retrieves a policy from a Redis client and checks for token authentication.
 * If authenticated, it fetches policy data, tokens, and thumbnails from cache or API
 * calls, and returns props to be rendered on the server-side.
 *
 * @param {object} context - Used to access request data.
 *
 * @returns {object} A prop object. If successful, it contains policy data and related
 * information; otherwise, it may redirect to a new URL or return null.
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
 * @description Renders a media slide component with thumbnail images and details
 * information. It fetches data from an API based on a policy ID, handles loading and
 * error states, and allows users to navigate through the slides and select items for
 * further information.
 *
 * @param {any} props - Used to pass data from parent component.
 *
 * @returns {JSX.Element} A React component. This component renders a MediaSlide
 * component with various properties such as initialSelection, slideItemHTML,
 * listItemHTML, thumbnailsItemHTML, detailsItemHTML, selectionChange, renderBigInfo,
 * and onLoadMoreData.
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
        // Retrieves and updates local state.

        if (!policy || policy=='') return;
        if (gallery) return;
        
        getData('/policyTokens?policy='+policy).then((d)=>{
            // Converts JSON data to JavaScript object and sets gallery.

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
     * @description Renders a component called `BigInfoBox`. It takes three parameters:
     * an index `i`, a callback function `onClose`, and another callback function
     * `goFullscreen`. The rendered component receives these parameters as props and uses
     * them to configure its behavior.
     *
     * @param {object} i - Used to represent item data.
     *
     * @param {Function} onClose - Intended for closing the BigInfoBox component.
     *
     * @param {boolean} goFullscreen - Used to enable or disable full-screen mode.
     *
     * @returns {JSX.Element} `<BigInfoBox onClose={onClose} goFullscreen={goFullscreen}
     * item={i} />`.
     */
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen} item={i} />
    }
    /**
     * @description Retrieves additional policy tokens from a server, merges them with
     * existing tokens in the `gallery.tokens` array, and updates the state of the
     * application with the new data, pagination information, and a flag indicating whether
     * media is still loading.
     *
     * @param {object} obj - Denoted by `{}`. It contains at least one property named
     * `page`. The value of this property is expected to be an integer, which represents
     * the current page for pagination purposes.
     *
     * @param {number} obj.page - Used to track the current page being loaded.
     *
     * @param {number} offset - Used to adjust pagination.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        
        getData('/policyTokens?policy='+policy+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Processes data.

            d.json().then((j) => { 
                // Concatenates and updates gallery data.

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
     * @description Handles errors when an image is not found. It replaces the missing
     * image with a loading animation and then, upon receiving a response from a message
     * event, updates the image source to the correct URL if it matches the original
     * requested image.
     *
     * @param {Event} e - Passed by the browser.
     */
    const imgError = (e) => { 
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        /**
         * @description Handles messages received from other windows or frames, specifically
         * checking if the message is a request for a new thumbnail image and if it matches
         * the original source URL. If true, it updates the target element's source with the
         * new image URL and removes the event listener.
         *
         * @param {object} mes - An event message from a window or frame.
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
     * @description Generates an HTML list item for a slide, given an item object and
     * three parameters: click handler, thumbnail spacing, and total size. It creates a
     * list item with an image, title, and link, and applies styles to the parent element
     * based on the provided spacing and size values.
     *
     * @param {(item: object) => void} click - Intended to handle an item's click event.
     *
     * @param {number} ts - Used for image height calculation.
     *
     * @param {number} thumbSpacing - Used to set padding for each slide item.
     *
     * @returns {(item: object) => JSX.Element} A higher-order function that returns a
     * JSX element representing an item list.
     */
    const slideItemHTML = (click,ts, thumbSpacing) => { 
 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Returns a higher-order function that generates HTML list items based
     * on the provided `item`, `s`, and `thumbSpacing` parameters. Each item is styled
     * with custom padding, contains an image, title, and link to another page.
     *
     * @param {(item: any) => void} click - Used to handle item clicks.
     *
     * @param {number} ts - Unused.
     *
     * @param {number} thumbSpacing - Used to set the padding for images.
     *
     * @returns {(item, s, thumbSpacing) => JSX.Element} A higher-order function that
     * generates a list item element. The returned function takes three parameters and
     * produces an HTML list item with various attributes and child elements.
     */
    const listItemHTML = (click,ts, thumbSpacing) => { 
        return (item,s,thumbSpacing) => { 
            return <li  style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={32} /><br />{item.title}</a></Link></li>
        }
    }
    

    /**
     * @description Generates a JSX element for a list item representing an item's details.
     * It takes three parameters: `click`, `ts`, and `thumbSpacing`. The function returns
     * a new function that, when called with an item as an argument, returns the list
     * item HTML with styles and event listeners applied.
     *
     * @param {(item: any) => void} click - Intended to handle item click events.
     *
     * @param {number} ts - Used to specify the thumbnail spacing.
     *
     * @param {number} thumbSpacing - Used to set the padding for list items.
     *
     * @returns {(item: object) => JSX.Element} A function that takes an item as input
     * and returns a JSX element representing an HTML list item.
     */
    const detailsItemHTML=(click,ts, thumbSpacing) => { 
        return (item) => { 
            return <li style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={64} /><br />{item.title}</a></Link></li>
        }
    }


    /**
     * @description Generates a list item for a thumbnail, with customizable spacing and
     * an optional click handler. It returns a function that creates the list item HTML,
     * which includes an image, title, and link to a URL. The image has a width specified
     * by `ts`.
     *
     * @param {(item: object) => void} click - Intended for handling click events on
     * thumbnail items.
     *
     * @param {number} ts - Used to set the width of an image.
     *
     * @param {number} thumbSpacing - Used to specify spacing around thumbnail items.
     *
     * @returns {(liProps) => JSX.Element} A higher-order function that takes an item as
     * an argument and returns an HTML list element (`<li>`) with various attributes and
     * child elements.
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
            // Transforms.

            i.linkUrl='/policy/'+props.policy.slug+'.'+i.unit.substr(56);
            return i;
        })
    }

    /**
     * @description Changes the current route by pushing a new URL to the browser's history
     * stack using React Router's `push` method. It constructs the URL based on the given
     * `item` and `props.policy.slug`, and sets the query and hash parameters accordingly.
     *
     * @param {object} item - Not explicitly defined within this code snippet.
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