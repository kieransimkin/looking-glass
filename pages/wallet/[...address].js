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
 * @description Retrieves data for a wallet and redirects to another URL if necessary,
 * then parses and formats the retrieved data, including tokens, for rendering on the
 * client-side.
 *
 * @param {RequestProps} context - Used to provide information about the request.
 *
 * @returns {any} An object with properties 'props' and potentially 'redirect'.
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
 * @description Renders a media slide with information about tokens associated with
 * a given address or unit. It fetches data from an API, handles pagination and loading
 * states, and provides user interaction to navigate through the list of tokens.
 *
 * @param {any} props - Used to pass data from parent components.
 *
 * @returns {JSX.Element} A React component that represents a UI slide with images
 * and information about tokens. The returned component includes various HTML elements
 * such as Head, MediaSlide, BigInfoBox, and links to other pages.
 */
export default  function CIP54Playground(props) {
    
    
    let dbStake = props.wallet?.stake;
    const router = useRouter();
    let address = props.address;
    
    const [gallery, setGallery] = useState(props.gallery);
    const [mediaSlideLoading, setMediaSlideLoading]=useState(false);
    if (!address) address='';
    
    useEffect(() => { 
        // Fetches data when address changes.
        if (!address || address=='') return;
        if (gallery) return;
        setMediaSlideLoading(true);
        if (address.substring(0,1)=='$') { 
            const punycoded = punycode.toASCII(address.substr(1).trim());
            getData('/getTokenHolders?unit=f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'+Buffer.from(punycoded).toString('hex')).then((a)=>{
                // Processes JSON data and navigates to a new route.
                a.json().then((j) => { 
                    // Verifies JSON data and navigates to a new route if conditions are met.
                    if (j.length && j[0]?.address) { 
                        router.push({pathname:'/wallet/'+j[0].address})

                    }})});
        } else {
        
            getData('/addressTokens?address='+address).then((d)=>{
                // Processes JSON data.
                d.json().then((j) => { 
                    // Updates state.
                    setGallery(j);
                    setMediaSlideLoading(false);
                });
                
            });
        }
        
    },[address])

    /**
     * @description Renders a BigInfoBox component with three props: `onClose`, `goFullscreen`,
     * and `item`. It calls `goFullscreen` with an argument `i` and passes the result to
     * the component. The `onClose` prop is passed as-is, allowing the component to handle
     * its own closure logic.
     *
     * @param {number} i - Used to render information for the corresponding item.
     *
     * @param {Function} onClose - Called to close the BigInfoBox component.
     *
     * @param {Function} goFullscreen - Intended to control full-screen mode.
     *
     * @returns {ReactElement} `<BigInfoBox />`. This ReactElement represents a JSX element
     * and can be rendered to the DOM.
     */
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen(i)} item={i} />
    }
    /**
     * @description Loads additional data for a media slide gallery by making an API
     * request with a specified offset and page number, merging new data with existing
     * tokens, updating the gallery state, and then disabling loading status.
     *
     * @param {object} obj - Destructured to extract the `page` property, which represents
     * the current page number. It also includes an optional default value of `{page:1}`
     * when not provided.
     *
     * @param {number} obj.page - Used to paginate data.
     *
     * @param {number} offset - Used to determine the direction of data loading.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        setMediaSlideLoading(true);
        getData('/addressTokens?address='+address+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Retrieves data and updates state.
            d.json().then((j) => { 
                // Updates gallery data and loading state.
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
     * @description Handles an error when loading an image, replacing it with a placeholder
     * GIF and sending a message to the parent window to load the correct image if
     * available. It listens for a response message from the parent window and updates
     * the image source accordingly.
     *
     * @param {Event} e - Triggered when an error occurs with the image.
     */
    const imgError = (e) => { 
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        /**
         * @description Processes incoming messages from a different origin. It checks if the
         * message requests a new thumbnail and if the original URL matches a specified
         * pattern. If both conditions are met, it updates an image source and removes itself
         * as an event listener.
         *
         * @param {object} mes - A message from another origin.
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
     * @description Generates a reusable HTML element for slide items, incorporating style
     * attributes and event listeners. It takes three parameters: a click handler, thumb
     * spacing, and a timestamp. The function returns an anonymous function that produces
     * the item's HTML representation based on provided data.
     *
     * @param {(item: any) => void} click - Intended for handling clicks on slide items.
     *
     * @param {number} ts - Used for setting the height of an image element.
     *
     * @param {number} thumbSpacing - Used for padding.
     *
     * @returns {(item: object) => JSX.Element} A function that takes an item as input
     * and returns a JSX element representing a list item with properties such as image,
     * title, and link.
     */
    const slideItemHTML = (click,ts, thumbSpacing) => { 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Generates a reusable JSX template for list items, taking three
     * parameters: `click`, `ts`, and `thumbSpacing`. It returns another function that
     * accepts an `item` object and `thumbSpacing`, generating a styled list item with a
     * link to the item's URL.
     *
     * @param {(item: object) => void} click - Used to handle an item click event.
     *
     * @param {number} ts - Not used anywhere in the code.
     *
     * @param {number} thumbSpacing - Used to set padding for list item.
     *
     * @returns {(item, s, thumbSpacing) => JSX.Element} A higher-order function that
     * generates an HTML list item element for a given item, with styles applied based
     * on the thumb spacing.
     */
    const listItemHTML = (click,ts, thumbSpacing) => { 
        return (item,s,thumbSpacing) => { 
            return <li  style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={32} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Generates a list item component for rendering a thumbnail item, taking
     * into account padding and spacing. It accepts three parameters: a click handler, a
     * timestamp, and thumb spacing. The generated HTML element includes an image, title,
     * and link.
     *
     * @param {(item: object) => void} click - Intended to handle the click event on an
     * item's link.
     *
     * @param {any} ts - Used as a placeholder.
     *
     * @param {number} thumbSpacing - Used for padding on sides of list items.
     *
     * @returns {(item: object) => JSX.Element} A higher-order function that takes an
     * item as input and returns an HTML element representing a list item.
     */
    const detailsItemHTML=(click,ts, thumbSpacing) => { 
        return (item) => { 
            return <li style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={64} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Generates a JSX template for a list item representing a thumbnail.
     * It takes three parameters: a click handler, a thumbnail size, and a spacing value.
     * The function returns a higher-order function that accepts an item object and returns
     * the corresponding HTML element.
     *
     * @param {(item: any) => void} click - Used to handle click events on the list items.
     *
     * @param {number} ts - Used to set the width of an image.
     *
     * @param {number} thumbSpacing - Used to set padding for thumbnails.
     *
     * @returns {(item: object) => JSX.Element} A factory function that produces an HTML
     * list item (`<li>`) for each given item.
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
     * @description Logs an item to the console and navigates the user's browser to a new
     * URL using the `router.push` method, constructing the URL by concatenating a base
     * path (`'/wallet/'`) with an address and unit from the `item` object.
     *
     * @param {object} item - Used to determine navigation.
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