/* eslint-disable react/display-name */
import {useState, useRef} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import path from 'path';
import { promises as fs } from 'fs';
import { useEffect } from 'react';
import { getData, postData } from '../../utils/Api';
import {MediaSlide} from 'react-mediaslide'
import {SmartNFTPortal} from 'smartnftportal'
import BigInfoBox from '../../components/BigInfoBox';
import {tokenPortal} from '../../utils/tokenPortal';
import { CircularProgress } from '@material-ui/core';
import { getWallet } from '../../utils/database.mjs';
import { checkCacheItem, getClient, incrementCacheItem } from '../../utils/redis.mjs';
import { getTokenData } from '../../utils/formatter';
import Head from 'next/head'
import LoadingTicker from '../../components/LoadingTicker';
import Link from 'next/link';
import { getDataURL } from '../../utils/DataStore';
import punycode from 'punycode'
/**
 * @description Retrieves wallet information from a cache or database using Redis and
 * GraphQL APIs. It processes the data, generates redirect responses if necessary,
 * and returns the processed data as props for server-side rendering.
 *
 * @param {any} context - Used to retrieve data from the request.
 *
 * @returns {object} Assigned to `props`. This object may contain properties such as
 * `wallet`, `token` and `gallery`.
 */
export const getServerSideProps = async (context) => { 
    const redisClient = await getClient();
    let wallet = context.query.address[0];
    console.log("1111111");
    console.log('First wallet:'+wallet);
    const segs = wallet.split('.');
    let token = segs.length>1?segs[segs.length-1]:null;
    if (token) { 
        wallet = wallet.substr(0,wallet.length-(token.length+1));
    }
    console.log(2);
    console.log("2222");
    console.log(wallet);
    console.log('GOT HERE');
    console.log("33333");
    let result = await getWallet(wallet);
    console.log(wallet);
    console.log("5555");
    console.log(result);
    if (!result && token) { 
        token = null;
        wallet = context.query.address[0];
        result = await getWallet(wallet);
    }
    console.log('update:');
    console.log(result);
    let props = {};
    
    if (result) { 
        /*
        if (result.slug != result.stake && wallet!=result.slug) { 
            return {
                redirect: {
                    destination: '/wallet/'+result.slug+(segs[1]?.length?'.'+segs[1]:''),
                    permanent: true
                }
            }
        }
        if (result.stake != wallet && wallet!=result.slug) { 
            return {
                redirect: {
                    destination: '/wallet/'+result.stake+(segs[1]?.length?'.'+segs[1]:''),
                    permanent: true
                }
            }
        }*/
        
        props.wallet = JSON.parse(JSON.stringify(result));
        
        
        let tokens = await checkCacheItem('getTokensFromAddress:'+result.stake);
        console.log('Got tokens here');
        console.log(tokens);
        await incrementCacheItem('walletHits:'+result.stake);
        await incrementCacheItem('walletRecentHits:'+result.stake, 3600);
        await redisClient.lPush('lg:walletHitLog:'+result.stake, JSON.stringify(Date.now()))
        if (tokens && tokens.length>0) { 
            const perPage = 10;
            let page = 0;
            let start=0,end=perPage;
            if (token) { 
                const idx = tokens.findIndex((i)=>i.unit==token);
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
                if (token && tokResult[c].unit==token) { 
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
 * @description Renders a media slide component that displays a list of tokens related
 * to a given address or token unit, and allows users to navigate through the tokens
 * and view detailed information about each one.
 *
 * @param {any} props - Used to pass data from parent component.
 *
 * @returns {JSX.Element} A React component that consists of a `<Head>` element and
 * a `<MediaSlide>` element.
 */
export default  function CIP54Playground(props) {
    
    console.log(props);
    let dbStake = props.wallet?.stake;
    const router = useRouter();
    let address = router.query.address[0];
    
    const [gallery, setGallery] = useState(props.gallery);
    const [mediaSlideLoading, setMediaSlideLoading]=useState(false);
    if (!address) address='';
    
    useEffect(() => { 
        // Loads tokens data from server API based on provided address.

        if (!address || address=='') return;
        if (gallery) return;
        setMediaSlideLoading(true);
        if (address.substring(0,1)=='$') { 
            const punycoded = punycode.toASCII(address.substr(1).trim());
            getData('/getTokenHolders?unit=f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'+Buffer.from(punycoded).toString('hex')).then((a)=>{
                // Processes JSON data.

                a.json().then((j) => { 
                    // Processes JSON response and navigates to wallet page.

                    if (j.length && j[0]?.address) { 
                        router.push({pathname:'/wallet/'+j[0].address})

                    }})});
        } else {
        
            getData('/addressTokens?address='+address).then((d)=>{
                // Processes JSON data from an API response.

                d.json().then((j) => { 
                    // Updates state.

                    setGallery(j);
                    setMediaSlideLoading(false);
                });
                
            });
        }
        
    },[address])

    /**
     * @description Takes an argument `i`, renders a `BigInfoBox` component with `item`
     * prop set to `i`, and returns the resulting JSX element. This function likely serves
     * as a wrapper for rendering information about an item in a list or array.
     *
     * @param {object} i - Passed to `BigInfoBox`.
     *
     * @returns {JSX.Element} An instance of a React component named `BigInfoBox`.
     */
    const renderBigInfo = (i) => { 
        
        return <BigInfoBox item={i} />
    }
    /**
     * @description Loads additional data for a media gallery by making an API request
     * to fetch tokens with a specified page number and offset. It updates the gallery
     * state with the new tokens, page number, and total pages.
     *
     * @param {object} obj - Assigned to the variable `page`. It represents the current
     * page number being fetched, which is incremented by one unit of `offset` value when
     * calling this function.
     *
     * @param {number} obj.page - Used to specify the current page.
     *
     * @param {number} offset - Used to specify the direction of data loading.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        setMediaSlideLoading(true);
        getData('/addressTokens?address='+address+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Fetches and merges JSON data.

            d.json().then((j) => { 
                // Merges two arrays and updates state.

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

    let newGallery = null;
    if (gallery) {
        newGallery=gallery.tokens.map((i)=>{
        // Manipulates array.

        i.linkUrl='/policy/'+i.unit.substring(0,56)+'.'+i.unit.substr(56);
        return i;
        })
    }
    /**
     * @description Generates HTML for a slide item list component, given an item object
     * and click event handler. It returns a functional component that renders a list
     * item with an image, title, and link to an external URL, based on the provided item
     * data and a thumbnail size parameter.
     *
     * @param {(item: object) => void} click - Intended to handle an item click event.
     *
     * @param {number} ts - Used for setting image height.
     *
     * @returns {(item: object) => JSX.Element} A higher-order function returning an
     * element that represents a list item (`<li>`) with properties like key, data-id,
     * onClick event handler and child elements such as link, image, and text.
     */
    const slideItemHTML = (click,ts) => {
         
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    let title = props.wallet?.name+" - Cardano Looking Glass - clg.wtf"
    
    let description = "";
    let url = "https://clg.wtf/policy/"+props.token?.unit?.substr(0,56);
    let image = props.walletProfileThumb;
    let initialSelection = gallery?gallery[0]:null;
    if (props.token) { 
        title = props.token.title + ' - ' + props.wallet.name+" - Cardano Looking Glass - clg.wtf";
        url = "https://clg.wtf/policy/"+props.token.unit.substr(0,56)+"."+props.token.unit.substr(56);
        initialSelection=props.token;
    }
    /**
     * @description Handles a selection event by logging the selected item to the console,
     * sending a message to the window to show loading indicator, and then navigates to
     * a new URL using the router library while preserving the current route's state.
     *
     * @param {object} item - Used to determine the URL path of navigation.
     */
    const selectionChange = (item) => { 
        console.log(item);
        window.postMessage({request:'showLoading'},'*',false);
        router.push({
            pathname: '/wallet/'+address+'.'+item.unit,
            query: {  }
        }, undefined, {shallow:true})
    }
    /*
    
    */
   console.log(props);
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