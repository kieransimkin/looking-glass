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
 * @description Retrieves and prepares data for a server-side rendered page, involving
 * wallet retrieval from Redis, token identification, and caching to optimize performance
 * in various environments.
 *
 * @param {object} context - Provided by Next.js to access server-side request data.
 *
 * @returns {object} Assigned to `props`. This object contains various properties
 * such as address, wallet, token, and gallery, among others, that will be used in
 * the Next.js page.
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
            props.walletProfileThumb = 'https://clg.wtf/api/getTokenThumb?unit='+result.profileUnit;
        } else if (tokens && tokens.length>0) { 
            props.walletProfileThumb = 'https://clg.wtf/api/getTokenThumb?unit='+tokens[tokens.length-2]?.unit;
        }
        
        if (process.env.NODE_ENV=='production') { 
            const thumbName = result.profileUnit ? 'tokenThumb:'+result.profileUnit+':500:dark': 'tokenThumb:'+tokens[tokens.length-2]?.unit+':500:dark';
            let thumbURL;
            if ((thumbURL = getDataURL(thumbName,'jpg'))) {
                props.walletProfileThumb = 'https://clg.wtf'+thumbURL;
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
 * @description Renders a Cardano wallet profile page with media slides, displaying
 * tokens and associated metadata fetched from an API. It handles loading indicators,
 * pagination, and selection changes, while also providing structured data for search
 * engine optimization (SEO).
 *
 * @param {object} props - Used to receive data from parent components.
 *
 * @returns {JSX.Element} A React component that renders a page containing a media
 * slide with wallet information and token details.
 */
export default  function CIP54Playground(props) {
    
    
    let dbStake = props.wallet?.stake;
    const router = useRouter();
    let address = props.address;
    
    const [gallery, setGallery] = useState(props.gallery);
    const [mediaSlideLoading, setMediaSlideLoading]=useState(false);
    if (!address) address='';
    
    useEffect(() => { 
        // Fetches and displays media content.
        if (!address || address=='') return;
        if (gallery) return;
        setMediaSlideLoading(true);
        if (address.substring(0,1)=='$') { 
            const punycoded = punycode.toASCII(address.substr(1).trim());
            getData('/getTokenHolders?unit=f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'+Buffer.from(punycoded).toString('hex')).then((a)=>{
                // Parses JSON and navigates to a new route.
                a.json().then((j) => { 
                    // Navigates to a specific route based on data.
                    if (j.length && j[0]?.address) { 
                        router.push({pathname:'/wallet/'+j[0].address})

                    }})});
        } else {
        
            getData('/addressTokens?address='+address).then((d)=>{
                // Handles JSON data from an API request and updates UI state.
                d.json().then((j) => { 
                    // Handles response data.
                    setGallery(j);
                    setMediaSlideLoading(false);
                });
                
            });
        }
        
    },[address])

    /**
     * @description Returns JSX that renders a BigInfoBox component with specific properties:
     * `onClose`, `goFullscreen` (which is called with argument `i`), and `item` set to
     * the input parameter `i`. The `goFullscreen` function appears to have side effects.
     *
     * @param {object} i - Used as an item to be rendered.
     *
     * @param {Function} onClose - Used to close something.
     *
     * @param {Function} goFullscreen - Used to enable full-screen functionality.
     *
     * @returns {object} JSX element. This element has a specific structure with properties
     * and children elements that represent a "BigInfoBox" component. The JSX object
     * contains references to its props and child components.
     */
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen(i)} item={i} />
    }
    /**
     * @description Loads additional data into the `gallery` state when a user requests
     * to see more items. It fetches data from an API, merges it with existing data, and
     * updates the state accordingly.
     *
     * @param {object} obj - Assigned the value of a variable named "page". It has a
     * default value when not provided to the function, which is also assigned from another
     * variable named "offset", with a default value of 1.
     *
     * @param {number} obj.page - An offset for fetching additional data.
     *
     * @param {number} offset - Used to track pagination progress.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        setMediaSlideLoading(true);
        getData('/addressTokens?address='+address+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Processes API data asynchronously.
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
     * @description Handles image loading errors by displaying a placeholder GIF and
     * sending a message to the parent window when a new thumbnail is received. It updates
     * the image source with the received URL when a valid thumbnail response is detected.
     *
     * @param {Event} e - Associated with an image loading error.
     */
    const imgError = (e) => { 
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        /**
         * @description Listens for messages and updates an image's source if the message is
         * a "newThumb" request from the same origin as the original image URL. It then removes
         * itself from the event listener once triggered.
         *
         * @param {object} mes - Intended to handle incoming messages.
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
     * @description Generates a reusable HTML template for slide items, including image,
     * title, and link. It takes a click handler, thumbnail spacing, and timestamp as
     * arguments, and returns a function that creates a list item with the specified
     * styles and event handlers when called with an item object.
     *
     * @param {Function} click - Used to handle click event on slide item.
     *
     * @param {number} ts - Used to specify thumbnail size.
     *
     * @param {number} thumbSpacing - Used to set padding for list items.
     *
     * @returns {Function} A factory function returning JSX elements representing individual
     * slide items. These elements are HTML list items with an image, title and link
     * inside an anchor tag.
     */
    const slideItemHTML = (click,ts, thumbSpacing) => { 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Returns a function that generates an HTML list item element based on
     * input parameters, including a click event handler, thumbnail spacing, and an object
     * with properties for id, link URL, thumbnail image, title, and error handling.
     *
     * @param {Function} click - Intended to be an item-specific click handler.
     *
     * @param {number} ts - 0 by default.
     *
     * @param {number} thumbSpacing - Used to set padding for list items.
     *
     * @returns {Function} A factory function that generates JSX elements representing
     * individual list items with specific styles and event handlers.
     */
    const listItemHTML = (click,ts, thumbSpacing) => { 
        return (item,s,thumbSpacing) => { 
            return <li  style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={32} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Generates a reusable HTML table row component for displaying item details.
     * It takes three arguments: a click handler, timestamp, and thumb spacing. The
     * generated component includes an image, title, and onClick event.
     *
     * @param {Function} click - Expected to return another function.
     *
     * @param {number} ts - Unused.
     *
     * @param {number} thumbSpacing - Used to set the padding around the thumbnail image.
     *
     * @returns {Function} A callback function that returns a JSX element representing
     * an HTML table row containing a link to an image and its title.
     */
    const detailsItemHTML=(click,ts, thumbSpacing) => { 
        return (item) => { 
            return <tr><td style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={64} /><br />{item.title}</a></Link></td></tr>
        }
    }
    /**
     * @description Generates a reusable HTML fragment for an item in a list, wrapping
     * it with an event handler and styles. It creates a callback function that returns
     * the actual HTML when called, using input parameters to set image size, spacing,
     * link, title, and error handling.
     *
     * @param {Function} click - Likely expected to return an event handler for click events.
     *
     * @param {number} ts - Used for setting image width.
     *
     * @param {number} thumbSpacing - Used for padding thumbnails.
     *
     * @returns {any} A factory that generates JSX elements representing list items
     * containing images and text, with dynamic styles, props, and event handlers based
     * on input data.
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
        image = "https://clg.wtf"+props.token.thumb;
    }
    /**
     * @description Logs an item to the console and redirects the user's browser to a new
     * URL using the `router.push` method, updating the current path with the selected
     * item's details.
     *
     * @param {string | object} item - Used to pass a unit or item value.
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