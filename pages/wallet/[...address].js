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
 * @description Fetches and processes data for a wallet page on a Next.js server-side
 * rendered application. It retrieves wallet information from Redis, caches token
 * data, and redirects users based on wallet slug or stake.
 *
 * @param {object} context - Used to access server-side environment variables.
 *
 * @returns {object} Populated with various properties such as 'address', 'wallet',
 * and 'gallery' that are used to render a web page.
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
        if (result.profileUnit) { 
            props.walletProfileThumb = '/api/getTokenThumb?unit='+result.profileUnit;
        } else if (tokens && tokens.length>0) { 
            props.walletProfileThumb = '/api/getTokenThumb?unit='+tokens[0]?.unit;
        }
        
        if (process.env.NODE_ENV=='production') { 
            const thumbName = result.profileUnit ? 'tokenThumb:'+result.profileUnit+':500:dark': 'tokenThumb:'+tokens[0]?.unit+':500:dark';
            let thumbURL;
            if ((thumbURL = getDataURL(thumbName,'jpg'))) {
                props.walletProfileThumb = thumbURL;
            }
        }
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
            const totalTokens = tokens.length;
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
                props.gallery={tokens:tokResult, page:page, start:start, end:end, totalPages: totalPages, perPage: perPage, totalTokens: totalTokens};
            }
        }
    }
    return {
        props
    }
}

/**
 * @description Renders a media slide component displaying tokens or holdings associated
 * with a Cardano wallet address. It fetches data via API requests and handles
 * pagination, selection changes, and rendering of token information.
 *
 * @param {object} props - Not explicitly typed. It contains wallet, token, address,
 * gallery and router data passed from parent components.
 *
 * @returns {JSX.Element} A React element that represents the UI component to be
 * rendered on the page. It is a JSX fragment containing various components such as
 * MediaSlide and BigInfoBox.
 */
export default  function CIP54Playground(props) {
    
    
    let dbStake = props.wallet?.stake;
    const router = useRouter();
    let address = props.address;
    
    const [gallery, setGallery] = useState(props.gallery);
    const [mediaSlideLoading, setMediaSlideLoading]=useState(false);
    if (!address) address='';
    
    useEffect(() => { 
        // Loads data asynchronously based on an address input.
        if (!address || address=='') return;
        if (gallery) return;
        setMediaSlideLoading(true);
        if (address.substring(0,1)=='$') { 
            const punycoded = punycode.toASCII(address.substr(1).trim());
            getData('/getTokenHolders?unit=f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'+Buffer.from(punycoded).toString('hex')).then((a)=>{
                // Processes JSON data from an API response.
                a.json().then((j) => { 
                    // Navigates to a wallet page if address exists.
                    if (j.length && j[0]?.address) { 
                        router.push({pathname:'/wallet/'+j[0].address})

                    }})});
        } else {
        
            getData('/addressTokens?address='+address).then((d)=>{
                // Parses JSON from a response and updates the UI.
                d.json().then((j) => { 
                    // Sets gallery and loading state.
                    setGallery(j);
                    setMediaSlideLoading(false);
                });
                
            });
        }
        
    },[address])

    /**
     * @description Returns a JSX element representing a BigInfoBox component, passing
     * props `onClose`, `item` (the current index `i`), and an optionally generated
     * `goFullscreen` prop based on the `goFullscreen` callback with argument `i`.
     *
     * @param {object} i - Passed as an argument to other components.
     *
     * @param {Function} onClose - Intended to handle closing actions.
     *
     * @param {Function} goFullscreen - Used to display data in fullscreen mode.
     *
     * @returns {BigInfoBox} A JSX element that represents big information box component.
     * It contains several attributes and one item property.
     */
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen(i)} item={i} />
    }
    /**
     * @description Loads additional tokens from a server based on the current page and
     * address. It merges the new tokens with the existing gallery, updates the gallery
     * state, and resets loading status.
     *
     * @param {object} obj - Destructured into a property called 'page' from this object.
     * The 'page' property is expected to be an integer number, which represents the
     * current page.
     *
     * @param {number} obj.page - Used to track the current page number.
     *
     * @param {number} offset - Used to indicate whether to load more or previous data.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        setMediaSlideLoading(true);
        getData('/addressTokens?address='+address+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Parses JSON data.
            d.json().then((j) => { 
                // Combines token data.
                let newArray;
                if (offset>0) { 
                    newArray = [...gallery.tokens];
                    newArray.push(...j.tokens);
                } else { 
                    newArray = [...j.tokens];
                    newArray.push(...gallery.tokens);
                }
                setGallery({tokens:newArray,page:j.page, totalPages: j.totalPages, totalTokens: props.gallery?.totalTokens});
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
     * @description Replaces a broken image with a loading indicator, and then, upon
     * receiving a message from another origin, it updates the image source to the new
     * URL if the message's data matches specific criteria.
     *
     * @param {Event} e - An image load error event object.
     */
    const imgError = (e) => { 
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        /**
         * @description Reacts to messages received from a different origin, processes them
         * based on specific conditions, and updates the target element's source attribute
         * accordingly. It also removes itself as an event listener after handling one message.
         *
         * @param {object} mes - An event object from a message event.
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
     * @description Generates a reusable item component for a slide bar, taking in click
     * handler, thumbnail spacing, and timestamp. It returns a function that can create
     * individual list items with image, title, and link, configured with given parameters
     * and dynamic data.
     *
     * @param {Function} click - Intended to handle an item click event.
     *
     * @param {number} ts - 60 in value.
     *
     * @param {number} thumbSpacing - Reserved for padding around image elements.
     *
     * @returns {React.ReactNode} A reusable JSX element for rendering a slide item,
     * represented as an HTML list item (`<li>`) with image and link content.
     */
    const slideItemHTML = (click,ts, thumbSpacing) => { 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Returns a factory function that generates an HTML list item element
     * for each item in a data set, incorporating event handlers and styles based on input
     * parameters.
     *
     * @param {Function} click - Expected to return an event handler for the list item's
     * onClick event.
     *
     * @param {number} ts - 0.
     *
     * @param {number} thumbSpacing - Used to set padding on list item elements.
     *
     * @returns {(item: object) => JSX.Element} A function that generates JSX elements
     * representing list items. Each element has attributes and event handlers. The
     * returned function takes an item as argument and returns the corresponding JSX
     * element with that item's properties applied.
     */
    const listItemHTML = (click,ts, thumbSpacing) => { 
        return (item,s,thumbSpacing) => { 
            return <li  style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={32} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Generates a table row (tr) element with an embedded link to display
     * thumbnail images and item details. It takes three arguments: click handler,
     * timestamp, and thumb spacing. The result is a factory function that returns a
     * customized table row for each item.
     *
     * @param {Function} click - Called upon item click event.
     *
     * @param {number} ts - Not used in the provided code snippet.
     *
     * @param {number} thumbSpacing - Used to set padding on HTML elements.
     *
     * @returns {Function} A row element from an HTML table represented as JSX, containing
     * an image and title linked to a URL.
     */
    const detailsItemHTML=(click,ts, thumbSpacing) => { 
        return (item) => { 
            return <tr><td style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={64} /><br />{item.title}</a></Link></td></tr>
        }
    }
    /**
     * @description Generates a function that returns an HTML list item element containing
     * an image and text, with specified styling, event handling, and attributes based
     * on input parameters. It allows for dynamic creation of thumbnail items with custom
     * click behavior.
     *
     * @param {Function} click - Used to handle item click events.
     *
     * @param {number} ts - Used for specifying thumbnail image width.
     *
     * @param {number} thumbSpacing - Used for setting horizontal padding.
     *
     * @returns {liProps} A template string containing HTML elements representing thumbnail
     * list items, including an image and a link to a larger version of the item.
     */
    const thumbnailsItemHTML = (click,ts, thumbSpacing) => { 
        return (item) => { 
            return <li style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={ts} /><br />{item.title}</a></Link></li>
        }
    }
    let title = props.wallet?.name+" - Cardano Looking Glass - clg.wtf"
    
    let description = props.wallet?.name+' is a wallet on Cardano';
    if (props.token){ 
        description=props.token.title+' is a token which is found in the wallet '+props.wallet.name+' on Cardano';
    }
    let url = "https://clg.wtf/wallet/"+props.wallet?.stake;
    let image = props.walletProfileThumb;
    let initialSelection = gallery?gallery[0]:null;
    if (props.token) { 
        title = props.token.title + ' - ' + props.wallet.name+" - Cardano Looking Glass - clg.wtf";
        url = "https://clg.wtf/wallet/"+props.wallet?.stake+"."+props.token.unit;
        initialSelection=props.token;
        image = props.token.thumb;
    }
    /**
     * @description Logs a selected item and navigates to a new URL using the router API.
     * The URL is constructed by concatenating strings with address and unit properties
     * from the item object, then pushes a new route to the browser's history stack without
     * re-rendering the current component.
     *
     * @param {object} item - Used to log and navigate based on wallet selection data.
     */
    const selectionChange = (item) => { 
        console.log(item);
        
        router.push({
            pathname: '/wallet/'+address+'.'+item.unit,
            query: {  },
            hash: ' '
        }, undefined, {shallow:true})
    }
    let profileStructuredData =
    {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "dateCreated": props.wallet?.createdAt,
        "dateModified": props.wallet?.lastMoved,
        "mainEntity": {
          "@type": "Person",
          "name": props.wallet.name,
          "additionalName": props.wallet.slug,
          "identifier": props.wallet.stake,
          "interactionStatistic": [{
            "@type": "InteractionCounter",
            "interactionType": "https://schema.org/LikeAction",
            "userInteractionCount": props.wallet.totalHits
          }],
          
            "agentInteractionStatistic": [{
                "@type": "InteractionCounter",
                "interactionType": "https://schema.org/WriteAction",
                "userInteractionCount": props.gallery?.totalTokens
              },
              {
                "@type": "InteractionCounter",
                "interactionType": "https://schema.org/ShareAction",
                "userInteractionCount": props.wallet.totalActivity
              },
            ],
          
          "description": description,
          "image": image
          
        }
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
                {profileStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profileStructuredData),
          }}
        />
      )}
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MediaSlide initialSelection={initialSelection} slideItemHTML={slideItemHTML} detailsItemHTML={detailsItemHTML} thumbnailsItemHTML={thumbnailsItemHTML} listItemHTML={listItemHTML} selectionChange={selectionChange} renderBigInfo={renderBigInfo} renderFile={tokenPortal} onLoadMoreData={loadMoreData} loading={mediaSlideLoading} gallery={newGallery} loadingIndicator=<LoadingTicker /> pagination={{page: gallery?.page, totalPages: gallery?.totalPages }} />
        </>
    );
}