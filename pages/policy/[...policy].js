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
 * @description Retrieves a policy from the server, handles redirects, and populates
 * a response object with policy data, including tokens and their thumbnails. It also
 * updates cache items and increment hit counters for the policy.
 *
 * @param {object} context - Provided by Next.js for server-side rendering purposes.
 *
 * @returns {object} A property bag (`props`) containing policy and gallery information,
 * possibly including redirects.
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
 * @description Renders a media slide component that displays a list of items (e.g.,
 * images) from a Cardano policy, allowing users to navigate through the items and
 * select one for further information or download.
 *
 * @param {any} props - Expected to contain a policy object.
 *
 * @returns {JSX.Element} A React component that represents a media slide with images
 * and information about the policy tokens. The component includes features such as
 * loading indicators, pagination, and event handlers for selection changes and load
 * more data.
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
        // Fetches policy tokens and updates gallery state when policy changes.

        if (!policy || policy=='') return;
        if (gallery) return;
        
        getData('/policyTokens?policy='+policy).then((d)=>{
            // Converts JSON to gallery data.

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
     * @description Renders a component named `BigInfoBox`, passing three props: `onClose`,
     * `goFullscreen`, and `item`. The function takes an index `i`, a callback function
     * `onClose`, and another callback function `goFullscreen` as arguments, and returns
     * the rendered component.
     *
     * @param {object} i - Intended to be used as an item.
     *
     * @param {Function} onClose - Intended to handle closing events.
     *
     * @param {Function} goFullscreen - Used to toggle full screen mode.
     *
     * @returns {JSX.Element} `<BigInfoBox onClose={onClose} goFullscreen={goFullscreen}
     * item={i} />`.
     */
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen} item={i} />
    }
    /**
     * @description Loads additional data from the `/policyTokens` API endpoint, merging
     * it with existing data in the `gallery.tokens` array. It updates the `gallery` state
     * and sets `mediaSlideLoading` to false when the operation is complete.
     *
     * @param {object} obj - Implicitly destructured from an object. The key 'page' has
     * a value that is incremented by the offset to get the next page data.
     *
     * @param {number} obj.page - Used to specify the page number for retrieving data.
     *
     * @param {number} offset - Used for paginating data.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        
        getData('/policyTokens?policy='+policy+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Handles data fetch and updates state.

            d.json().then((j) => { 
                // Merges and updates data.

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
     * @description Logs an image's source URL to the console when an error occurs while
     * loading the image, then replaces it with a loading GIF until a new thumbnail is
     * received through a window message from another script.
     *
     * @param {Event} e - Related to an error event on an image tag.
     */
    const imgError = (e) => { 
        console.log(e.target.src);
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        window.addEventListener('message',(mes) => { 
            // Handles messages.

            if (mes.data.request=='newThumb' && mes.data.originalUrl==origSrc.replace(mes.origin,'')) { 
                console.log('new thumb found');
                e.target.src=mes.data.url;
                
            } else { 
                console.log(mes);
                console.log([mes.data.originalUrl, origSrc.replace(mes.origin, '')]);
            }
        })
        
    }
    /**
     * @description Generates a list item (LI) for a slide bar, including an image and
     * title. It takes three arguments: `click`, `ts`, and `thumbSpacing`. The `click`
     * function is called when the LI is clicked, and it uses these arguments to create
     * a dynamic list of items.
     *
     * @param {(item: any) => void} click - Used for handling click events on slide items.
     *
     * @param {number} ts - Used to set image height.
     *
     * @param {number} thumbSpacing - Used to set the padding for thumbnail items.
     *
     * @returns {(item: object) => JSX.Element} A higher-order function that generates
     * an HTML list item (`<li>`) element for each given item object.
     */
    const slideItemHTML = (click,ts, thumbSpacing) => { 
 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError.bind(this)} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
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
            // Maps an array.

            i.linkUrl='/policy/'+props.policy.slug+'.'+i.unit.substr(56);
            return i;
        })
    }

    /**
     * @description Navigates to a new URL when an item is selected. It constructs a URL
     * by appending the slug and unit of the policy, and optionally adds query parameters
     * and a hash fragment. The navigation occurs without full page reload due to the
     * `{shallow: true}` option.
     *
     * @param {object} item - Used to determine routing changes.
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
            <MediaSlide initialSelection={initialSelection} slideItemHTML={slideItemHTML} selectionChange={selectionChange} renderBigInfo={renderBigInfo} renderFile={tokenPortal} onLoadMoreData={loadMoreData} loading={mediaSlideLoading} gallery={newGallery} loadingIndicator=<LoadingTicker /> pagination={{page: gallery?.page, totalPages: gallery?.totalPages }} />
        </>
    );
}