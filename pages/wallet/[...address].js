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
 * @description Retrieves data for a wallet page from Redis and performs redirects
 * if necessary. It then fetches wallet details, checks cache items, updates log and
 * token data, and prepares props to be sent to the client as server-side rendered components.
 *
 * @param {object} context - Used to access information about the current request.
 *
 * @returns {object} Either a redirect object with `destination` and `permanent`
 * properties or an object named `props`.
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
    
    let props = {address:wallet};
    
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
 * @description Renders a media slide component, displaying tokens for a given wallet
 * or address. It fetches token data from an API and updates the component state
 * accordingly. The user can navigate through the tokens, load more data, and select
 * a token to view its details.
 *
 * @param {object} props - Used to pass data from parent component.
 *
 * @returns {JSX.Element} A React component that represents the UI layout and structure
 * of the application. It renders a set of slides with images, titles, and links to
 * other pages.
 */
export default  function CIP54Playground(props) {
    
    console.log(props);
    let dbStake = props.wallet?.stake;
    const router = useRouter();
    //let address = router.query.address[0];
    let address = props.address;
    
    const [gallery, setGallery] = useState(props.gallery);
    const [mediaSlideLoading, setMediaSlideLoading]=useState(false);
    if (!address) address='';
    
    useEffect(() => { 
        // Loads data and updates UI when address changes.

        if (!address || address=='') return;
        if (gallery) return;
        setMediaSlideLoading(true);
        if (address.substring(0,1)=='$') { 
            const punycoded = punycode.toASCII(address.substr(1).trim());
            getData('/getTokenHolders?unit=f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'+Buffer.from(punycoded).toString('hex')).then((a)=>{
                // Parses API response data and navigates to wallet page.

                a.json().then((j) => { 
                    // Checks if a JSON response has an address and navigates to a new route if it does.

                    if (j.length && j[0]?.address) { 
                        router.push({pathname:'/wallet/'+j[0].address})

                    }})});
        } else {
        
            getData('/addressTokens?address='+address).then((d)=>{
                // Converts JSON data and updates UI state.

                d.json().then((j) => { 
                    // Sets state.

                    setGallery(j);
                    setMediaSlideLoading(false);
                });
                
            });
        }
        
    },[address])

    /**
     * @description Returns a JSX element representing a `BigInfoBox` component, passing
     * an `item` prop with value `i`. The purpose is to render a UI component that displays
     * information about the item at index `i`.
     *
     * @param {object} i - Passed to the `<BigInfoBox>` component.
     *
     * @returns {ReactElement} A JSX element representing a `<BigInfoBox>` component with
     * an `item` prop set to the provided argument.
     */
    const renderBigInfo = (i) => { 
        
        return <BigInfoBox item={i} />
    }
    /**
     * @description Loads additional data for a gallery when the user requests to view
     * more items, merging new items with existing ones and updating the state of the
     * gallery. It also manages loading states and logs a message upon execution.
     *
     * @param {object} obj - Required for invocation of this function. The 'page' property
     * represents a page number, which seems to be used as part of a URL query string
     * when retrieving data from an API endpoint.
     *
     * @param {number} obj.page - Used to specify the current page number.
     *
     * @param {number} offset - Used to specify the direction of loading data.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        setMediaSlideLoading(true);
        getData('/addressTokens?address='+address+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Updates Gallery State.

            d.json().then((j) => { 
                // Concatenates and updates tokens in gallery state.

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
        // Transforms links.

        i.linkUrl='/policy/'+i.unit.substring(0,56)+'.'+i.unit.substr(56);
        return i;
        })
    }
    /**
     * @description Generates a JavaScript function that creates an HTML list item for
     * each slide item, given the item's data and a click handler. It returns the JSX
     * element with an image, title, and link to the slide URL, adjusting the image height
     * based on the available space.
     *
     * @param {(item: object) => void} click - Intended to handle click events on list items.
     *
     * @param {number} ts - Used for setting image height.
     *
     * @returns {(item: object) => JSX.Element} A JavaScript function that takes an item
     * as an argument and returns a JSX element representing an HTML list item (`<li>`)
     * with its content.
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
     * @description Logs an item to the console and updates the browser's URL by pushing
     * a new route using React Router. The new route includes the `address`, `item.unit`,
     * and an empty query object, with the `shallow` option set to true for a client-side
     * route update.
     *
     * @param {object} item - Used to determine the path for navigation.
     */
    const selectionChange = (item) => { 
        console.log(item);
        
        router.push({
            pathname: '/wallet/'+address+'.'+item.unit,
            query: {  },
            hash: ' '
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