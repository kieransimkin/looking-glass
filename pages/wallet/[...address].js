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
import { getPolicy, getWallet } from '../../utils/database.mjs';
import { checkCacheItem, getClient, incrementCacheItem } from '../../utils/redis.mjs';
import { getTokenData } from '../../utils/formatter';
import Head from 'next/head'
import LoadingTicker from '../../components/LoadingTicker';
import Link from 'next/link';
import { getDataURL } from '../../utils/DataStore';
import punycode from 'punycode'
/**
 * @description Retrieves and processes data for a wallet page on a server-side
 * rendered application. It fetches data from Redis, verifies user authentication,
 * and populates props with wallet information, policies, and token gallery.
 *
 * @param {any} context - An object that represents server-side rendering context.
 *
 * @returns {object} Assigned to a variable named "props". This object can contain
 * various properties such as 'address', 'wallet', 'policy', 'gallery' among others
 * depending on the conditions in the code.
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
        if (token) { 
            props.policy = JSON.parse(JSON.stringify(await getPolicy(token.substr(0,56))));
        }
        
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
 * @description Displays a media slide showcasing token holdings for a given wallet
 * or token address on the Cardano blockchain, with features such as loading more
 * data and rendering large information boxes.
 *
 * @param {object} props - Used to pass properties from parent components.
 *
 * @returns {JSX.Element} Rendered as a web page with various components such as
 * MediaSlide and BigInfoBox. The returned value is a React component tree that can
 * be mounted to the DOM.
 */
export default  function CIP54Playground(props) {
    
    let dbStake = props.wallet?.stake;
    const router = useRouter();
    let address = props.address;
    
    const [gallery, setGallery] = useState(props.gallery);
    const [mediaSlideLoading, setMediaSlideLoading]=useState(false);
    if (!address) address='';
    
    useEffect(() => { 
        // Fetches data from an API based on the 'address' variable.
        if (!address || address=='') return;
        if (gallery) return;
        setMediaSlideLoading(true);
        if (address.substring(0,1)=='$') { 
            const punycoded = punycode.toASCII(address.substr(1).trim());
            getData('/getTokenHolders?unit=f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'+Buffer.from(punycoded).toString('hex')).then((a)=>{
                // Processes response data.
                a.json().then((j) => { 
                    // Checks and navigates to a wallet page.
                    if (j.length && j[0]?.address) { 
                        router.push({pathname:'/wallet/'+j[0].address})

                    }})});
        } else {
        
            getData('/addressTokens?address='+address).then((d)=>{
                // Processes JSON data.
                d.json().then((j) => { 
                    // Processes JSON response data.
                    setGallery(j);
                    setMediaSlideLoading(false);
                });
                
            });
        }
        
    },[address])

    /**
     * @description Generates a JSX element representing a big information box. It takes
     * three arguments: an item index `i`, an `onClose` callback, and a `goFullscreen`
     * callback that is called with the item index as an argument. The function returns
     * an instance of the `BigInfoBox` component.
     *
     * @param {object} i - Referenced as an item for display.
     *
     * @param {Function} onClose - Used to close an element.
     *
     * @param {any} goFullscreen - Likely a callback that handles fullscreen functionality.
     *
     * @returns {BigInfoBox} JSX element representing a big information box component.
     */
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen(i)} item={i} />
    }
    /**
     * @description Loads additional address tokens when the user scrolls down, updating
     * the gallery with new tokens and metadata. It prevents unnecessary requests when
     * scrolling back up by checking the `mediaSlideLoading` state.
     *
     * @param {object} obj - Required, containing a single property named 'page'. The
     * value of this property must be obtained from the calling context.
     *
     * @param {number} obj.page - Used to track current page number.
     *
     * @param {number} offset - Used to calculate the new page number.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        setMediaSlideLoading(true);
        getData('/addressTokens?address='+address+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Processes JSON data.
            d.json().then((j) => { 
                // Assembles a new gallery array by combining existing tokens with newly received
                // ones from an API response.
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
     * @description Detects when an image fails to load, temporarily replaces it with a
     * loading GIF, and then re-retrieves the original image from a different source via
     * an IPC (Inter-Process Communication) message event listener.
     *
     * @param {Event} e - The error event triggered when an image fails to load.
     */
    const imgError = (e) => { 
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        /**
         * @description Listens for messages from other windows or iframes and updates an
         * image's source attribute to a new thumbnail URL if it matches specific conditions.
         *
         * @param {MessageEvent} mes - An event that contains data sent by another context.
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
     * @description Generates an HTML list item for a slide, rendering an image with title
     * and link, along with event listeners for clicking and error handling on image
     * loading. It returns a function that takes an item object as input to generate the
     * list item HTML dynamically.
     *
     * @param {Function} click - Called when an item is clicked.
     *
     * @param {number} ts - Used for thumb height calculation.
     *
     * @param {number} thumbSpacing - Used to set horizontal padding.
     *
     * @returns {React.ReactNode} A reference to a DOM node that can be rendered. It is
     * an anonymous function expression that generates JSX elements representing slide
     * items in a list.
     */
    const slideItemHTML = (click,ts, thumbSpacing) => { 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Generates a factory function that produces an HTML list item element
     * for each data object. It creates a reusable component with customizable styles and
     * event handlers, such as click handling and image error detection.
     *
     * @param {Function} click - Used to handle clicks on list items.
     *
     * @param {number} ts - Omitted in the outer scope.
     *
     * @param {number} thumbSpacing - Used to set padding for list items.
     *
     * @returns {any} A function that generates HTML for an unordered list item element
     * (`<li>`). This function takes several parameters and returns the rendered HTML as
     * a JSX element.
     */
    const listItemHTML = (click,ts, thumbSpacing) => { 
        return (item,s,thumbSpacing) => { 
            return <li  style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={32} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Generates a reusable HTML template for a table row item. It takes
     * three arguments: click handler, timestamp, and thumb spacing. The function returns
     * a higher-order function that, when called with an item object, produces the HTML
     * representation of that item in the table.
     *
     * @param {Function} click - Used to handle clicks on table cells.
     *
     * @param {number} ts - 0 by default.
     *
     * @param {number} thumbSpacing - Used to set table cell padding.
     *
     * @returns {any} A function that can be used to generate HTML table rows. The returned
     * function takes an item object as an argument and returns the corresponding table
     * row HTML structure.
     */
    const detailsItemHTML=(click,ts, thumbSpacing) => { 
        return (item) => { 
            return <tr><td style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={64} /><br />{item.title}</a></Link></td></tr>
        }
    }
    /**
     * @description Returns a factory function that generates a list item (LI) element
     * based on an object with specific properties and event handlers, including a click
     * handler and image error handling.
     *
     * @param {Function} click - Used to handle item click events.
     *
     * @param {number} ts - Used for thumbnail width.
     *
     * @param {number} thumbSpacing - Used to set padding for thumbnails.
     *
     * @returns {(liElementWithEventHandlers)} A function that generates an HTML list
     * item element with attributes and event handlers.
     */
    const thumbnailsItemHTML = (click,ts, thumbSpacing) => { 
        return (item) => { 
            return <li style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={ts} /><br />{item.title}</a></Link></li>
        }
    }
    let title = props.wallet?.name+" - Cardano Looking Glass - clg.wtf"
    
    let description = props.wallet?.name+' is a wallet on Cardano';
    if (props.token){ 
        description=props.token.title+' is a token from the '+props.policy.name+' NFT collection, minted on Cardano. Here it is found in the wallet '+props.wallet.name;
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
     * @description Logs the selected item to the console and navigates to a new route
     * using the `router.push` method, updating the URL with the address and selected
     * unit as parameters, while keeping the current view intact due to the `shallow:
     * true` option.
     *
     * @param {object} item - Used to log data and navigate routes.
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