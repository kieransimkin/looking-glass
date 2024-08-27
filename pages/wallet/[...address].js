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
 * @description Retrieves a wallet's information from a Redis cache or an external
 * API, handles redirects and caching, and constructs props for a React component.
 * It also fetches token data and generates a gallery with thumbnails if available.
 *
 * @param {object} context - Used to access query parameters.
 *
 * @returns {object} Either a redirect object with properties destination and permanent,
 * or an object containing props which may include wallet, token, and gallery.
 */
export const getServerSideProps = async (context) => { 
    const redisClient = await getClient();
    let wallet = context.query.address[0];
    const segs = wallet.split('.');
    let token = segs.length>1?segs[segs.length-1]:null;
    if (token) { 
        wallet = wallet.substr(0,wallet.length-(token.length+1));
    }
    let result = await getWallet(wallet);
    
    if (!result && token) { 
        token = null;
        wallet = context.query.address[0];
        result = await getWallet(wallet);
    }
    
    let props = {};
    
    if (result) { 
        
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
        }
        
        props.wallet = JSON.parse(JSON.stringify(result));
        
        let tokens = await checkCacheItem('getTokensFromAddress:'+result.stake);
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
 * @description Renders a media slide component displaying information about Cardano
 * tokens and their holders, allowing users to navigate through token details, load
 * more data, and select specific tokens for further exploration.
 *
 * @param {any} props - Used to pass data from parent components to this component.
 *
 * @returns {JSX.Element} A React component that represents a webpage with various
 * elements such as metadata, links, images, and a list of items.
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
        // Handles address changes and fetches related data.

        if (!address || address=='') return;
        if (gallery) return;
        setMediaSlideLoading(true);
        if (address.substring(0,1)=='$') { 
            const punycoded = punycode.toASCII(address.substr(1).trim());
            getData('/getTokenHolders?unit=f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'+Buffer.from(punycoded).toString('hex')).then((a)=>{
                // Processes JSON data and navigates to a new URL based on specific conditions.

                a.json().then((j) => { 
                    // Pushes a new route to the browser's URL bar if a JSON response contains an address.

                    if (j.length && j[0]?.address) { 
                        router.push({pathname:'/wallet/'+j[0].address})

                    }})});
        } else {
        
            getData('/addressTokens?address='+address).then((d)=>{
                // Parses JSON data.

                d.json().then((j) => { 
                    // Sets gallery and stops loading when JSON response arrives.

                    setGallery(j);
                    setMediaSlideLoading(false);
                });
                
            });
        }
        
    },[address])

    /**
     * @description Takes an argument `i`, which is presumably a piece of data, and returns
     * JSX that renders a `BigInfoBox` component with the passed `item`. The `BigInfoBox`
     * component likely displays information about the item.
     *
     * @param {object} i - Referred to as an "item".
     *
     * @returns {ReactNode} A JSX element representing a BigInfoBox component with an
     * item property set to the provided value `i`.
     */
    const renderBigInfo = (i) => { 
        
        return <BigInfoBox item={i} />
    }
    /**
     * @description Loads additional data from a server and updates the local state by
     * appending or prepending new items to an array, incrementing the page number and
     * updating the total pages count. It also sets a loading flag and logs a message to
     * the console upon completion.
     *
     * @param {object} obj - Required. It contains only one property, `page`, which
     * represents the current page to load more data from.
     *
     * @param {number} obj.page - Used to specify the page number for retrieving data.
     *
     * @param {number} offset - Used to adjust the page offset for loading data.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        setMediaSlideLoading(true);
        getData('/addressTokens?address='+address+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Consolidates and updates data from API response and UI state.

            d.json().then((j) => { 
                // Concatenates tokens and updates gallery state.

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
        // Transforms array elements.

        i.linkUrl='/policy/'+i.unit.substring(0,56)+'.'+i.unit.substr(56);
        return i;
        })
    }
    /**
     * @description Generates HTML code for a list item representing an item from an
     * array. The HTML includes an image, title, and link, with the height of the image
     * set to a variable `ts` minus 80 pixels.
     *
     * @param {(item: object) => void} click - Used to handle click events on slide items.
     *
     * @param {number} ts - Used to set the height of the image.
     *
     * @returns {(item: object) => JSX.Element} An arrow function that takes an item as
     * input and returns a list item (li) component with various child elements including
     * image, title, link and event handlers.
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
     * @description Logs an item to the console, sends a post message to show loading,
     * and then navigates to a new route using the provided `router`. The new route's
     * path is constructed by concatenating '/wallet/', an address, and the unit of the
     * item.
     *
     * @param {object} item - Used as input for navigation processing.
     */
    const selectionChange = (item) => { 
        console.log(item);
        window.postMessage({request:'showLoading'},'*');
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