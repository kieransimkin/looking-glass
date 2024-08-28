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
 * @description Fetches data for a server-side rendered page. It retrieves wallet
 * information, redirects if necessary, and populates props with token data. The
 * function also handles caching and updates a Redis log.
 *
 * @param {object} context - Used to provide data to the server-side props.
 *
 * @returns {any} Either a redirect object with permanent redirection or an object
 * containing props for rendering.
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
                    } else { 
                        // The dynamic image loading for the first pagefull of results isn't working at the momment, so let's just make sure 
                        failed=true;
                        //redisClient.publish('requestThumb',JSON.stringify({unit,size,mode, url: req.url}));
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
 * @description Renders a media slide component with data from an API. It fetches
 * token holders or tokens for a given address and displays them as slides with images,
 * titles, and links. The user can navigate through the slides, view details, and
 * select items to visit their corresponding pages.
 *
 * @param {any} props - Passed from parent components.
 *
 * @returns {JSX.Element} A React component that can be rendered to the DOM. It
 * includes various HTML elements such as Head tags, meta tags, links and MediaSlide
 * components wrapped in a JSX element.
 */
export default  function CIP54Playground(props) {
    
    
    let dbStake = props.wallet?.stake;
    const router = useRouter();
    let address = props.address;
    
    const [gallery, setGallery] = useState(props.gallery);
    const [mediaSlideLoading, setMediaSlideLoading]=useState(false);
    if (!address) address='';
    
    useEffect(() => { 
        // Initializes data retrieval based on an address.
        if (!address || address=='') return;
        if (gallery) return;
        setMediaSlideLoading(true);
        if (address.substring(0,1)=='$') { 
            const punycoded = punycode.toASCII(address.substr(1).trim());
            getData('/getTokenHolders?unit=f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'+Buffer.from(punycoded).toString('hex')).then((a)=>{
                // Processes JSON data.
                a.json().then((j) => { 
                    // Checks JSON data and navigates to a specific route if it contains an address.
                    if (j.length && j[0]?.address) { 
                        router.push({pathname:'/wallet/'+j[0].address})

                    }})});
        } else {
        
            getData('/addressTokens?address='+address).then((d)=>{
                // Parses and processes JSON data.
                d.json().then((j) => { 
                    // Sets Gallery and Media Slide Loading states.
                    setGallery(j);
                    setMediaSlideLoading(false);
                });
                
            });
        }
        
    },[address])

    /**
     * @description Renders a `BigInfoBox` component, passing three props: `onClose`,
     * `goFullscreen`, and `item`. It allows for rendering a customizable information box
     * with an optional close button and fullscreen capability.
     *
     * @param {object} i - Referred to as an item.
     *
     * @param {Function} onClose - Used to handle closing events.
     *
     * @param {Function} goFullscreen - Used for full-screen rendering.
     *
     * @returns {JSX.Element} An instance of the React component `<BigInfoBox>`. This
     * component renders information about a specific item (`item={i}`) and also accepts
     * props for handling closure and full-screen transitions (`onClose`, `goFullscreen`).
     */
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen} item={i} />
    }
    /**
     * @description Loads additional data from the server by making a GET request to
     * `/addressTokens`. It appends new data to an existing array, updates the gallery
     * state with the new data and page information, and sets the loading status accordingly.
     *
     * @param {object} obj - Optional. It contains one property named 'page' which
     * represents a page number. This value can be overridden by passing an argument while
     * calling the function. Its default value is not specified.
     *
     * @param {number} obj.page - Used to specify the page number for data retrieval.
     *
     * @param {number} offset - Used to determine direction of token loading.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        setMediaSlideLoading(true);
        getData('/addressTokens?address='+address+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Consolidates data and updates UI state.
            d.json().then((j) => { 
                // Merges arrays and updates state variables.
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
        i.linkUrl='/policy/'+i.unit.substring(0,56)+'.'+i.unit.substr(56);
        return i;
        })
    }
    /**
     * @description Handles errors when an image is not loaded. It replaces the broken
     * image with a loading GIF and establishes a message handler to receive updates from
     * the browser's main process, which can correct the image URL if necessary.
     *
     * @param {Event} e - Triggered by an image loading error.
     */
    const imgError = (e) => { 
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        /**
         * @description Listens for messages from an origin, checks if the message is a request
         * for a new thumbnail and if the original URL matches a specified source. If true,
         * it updates the image source and removes the event listener.
         *
         * @param {object} mes - Used to handle messages received from another origin.
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
     * @description Generates a JSX element representing an item in a slide bar. It takes
     * three parameters: a click handler, a thumb size, and a spacing value. The function
     * returns another function that creates an `<li>` element with the specified styles
     * and content from the input `item`.
     *
     * @param {(item: object) => void} click - Used to handle item clicks.
     *
     * @param {number} ts - Used to specify the height of an image.
     *
     * @param {number} thumbSpacing - Used to set padding for list items.
     *
     * @returns {(item: object) => JSX.Element} A function that takes an item object as
     * an argument and returns a JSX element representing a list item containing the
     * item's title, thumbnail image, and link URL.
     */
    const slideItemHTML = (click,ts, thumbSpacing) => { 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Returns a factory function that generates HTML for a list item. It
     * takes three arguments: `click`, `ts`, and `thumbSpacing`. The generated HTML
     * includes an image, title, and link, with optional click event handling and custom
     * spacing based on the provided thumb spacing value.
     *
     * @param {(item: object) => void} click - Used to handle an item click event.
     *
     * @param {number} ts - Unused.
     *
     * @param {number} thumbSpacing - Used to set padding around thumbnail images.
     *
     * @returns {(item: object) => JSX.Element} A higher-order function that takes an
     * item as an argument and returns a JSX element representing an HTML list item.
     */
    const listItemHTML = (click,ts, thumbSpacing) => { 
        return (item,s,thumbSpacing) => { 
            return <li  style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={32} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Generates an HTML string for a list item representing an item, with
     * styles applied based on `thumbSpacing`, and event handlers for click and error
     * handling. It takes three arguments: `click` callback, `ts` timestamp, and
     * `thumbSpacing`. The inner function returns the JSX element.
     *
     * @param {(item: any) => void} click - Intended to handle item clicks.
     *
     * @param {boolean} ts - Not used within the code.
     *
     * @param {number} thumbSpacing - Used to set the padding for thumbnail images.
     *
     * @returns {(liElement) => void} A higher-order function that takes an item as an
     * argument and returns a JSX element representing an HTML list item (`<li>`).
     */
    const detailsItemHTML=(click,ts, thumbSpacing) => { 
        return (item) => { 
            return <li style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={64} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Generates a list item HTML template for displaying thumbnails. It
     * takes three parameters: a click handler, a thumbnail size, and a spacing value.
     * The returned function can be used to create individual list items with specific properties.
     *
     * @param {(item: any) => void} click - Used to handle click events on thumbnail items.
     *
     * @param {number} ts - Used to set the width of an image.
     *
     * @param {number} thumbSpacing - Used to set padding for thumbnails.
     *
     * @returns {(item: object) => JSX.Element} A higher-order function that takes an
     * item as input and returns a list item element (li).
     */
    const thumbnailsItemHTML = (click,ts, thumbSpacing) => { 
        return (item) => { 
            return <li style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={ts} /><br />{item.title}</a></Link></li>
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
     * @description Logs an item to the console and programmatically navigates the user's
     * browser to a new URL using React Router's `push` method. The URL is constructed
     * by concatenating '/wallet/', the current `address`, and the selected `item.unit`.
     *
     * @param {object} item - Used to determine navigation action.
     */
    const selectionChange = (item) => { 
        console.log(item);
        
        router.push({
            pathname: '/wallet/'+address+'.'+item.unit,
            query: {  },
            hash: ' '
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
            <MediaSlide initialSelection={initialSelection} slideItemHTML={slideItemHTML} detailsItemHTML={detailsItemHTML} thumbnailsItemHTML={thumbnailsItemHTML} listItemHTML={listItemHTML} selectionChange={selectionChange} renderBigInfo={renderBigInfo} renderFile={tokenPortal} onLoadMoreData={loadMoreData} loading={mediaSlideLoading} gallery={newGallery} loadingIndicator=<LoadingTicker /> pagination={{page: gallery?.page, totalPages: gallery?.totalPages }} />
        </>
    );
}