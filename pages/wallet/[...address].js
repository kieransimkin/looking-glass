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
 * @description Fetches wallet data from a Redis client and database, determines
 * redirects based on wallet slugs and stakes, caches results, and populates properties
 * for server-side rendering. It also retrieves token data and thumbnail URLs as needed.
 *
 * @param {any} context - Used to hold data passed from Next.js.
 *
 * @returns {object} A page property containing server side rendered props. This
 * includes an address and possibly wallet and gallery data.
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
                props.gallery={tokens:tokResult, page:page, start:start, end:end, totalPages: totalPages, perPage: perPage, totalTokens: tokens.length};
            }
        }
    }
    return {
        props
    }
}

/**
 * @description Displays a media slide showcasing tokens or policies associated with
 * a Cardano wallet, along with metadata and interactive features such as filtering,
 * sorting, and navigation.
 *
 * @param {any} props - An object containing data passed from parent component.
 *
 * @returns {JSX.Element} A React component that contains a MediaSlide component and
 * other elements, used for rendering a wallet's media content in a slideshow format.
 */
export default  function CIP54Playground(props) {
    
    
    let dbStake = props.wallet?.stake;
    const router = useRouter();
    let address = props.address;
    
    const [gallery, setGallery] = useState(props.gallery);
    const [mediaSlideLoading, setMediaSlideLoading]=useState(false);
    if (!address) address='';
    
    useEffect(() => { 
        // Loads gallery data when address changes.
        if (!address || address=='') return;
        if (gallery) return;
        setMediaSlideLoading(true);
        if (address.substring(0,1)=='$') { 
            const punycoded = punycode.toASCII(address.substr(1).trim());
            getData('/getTokenHolders?unit=f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'+Buffer.from(punycoded).toString('hex')).then((a)=>{
                // Parses JSON response and navigates to new route.
                a.json().then((j) => { 
                    // Navigates to a new route based on JSON data.
                    if (j.length && j[0]?.address) { 
                        router.push({pathname:'/wallet/'+j[0].address})

                    }})});
        } else {
        
            getData('/addressTokens?address='+address).then((d)=>{
                // Processes API data.
                d.json().then((j) => { 
                    // Sets gallery and updates loading state.
                    setGallery(j);
                    setMediaSlideLoading(false);
                });
                
            });
        }
        
    },[address])

    /**
     * @description Returns a JSX element, specifically a `BigInfoBox`, containing an
     * item and two callback functions: `onClose` to close it, and `goFullscreen` that
     * calls the fullscreen logic with the current item as an argument.
     *
     * @param {object} i - Referenced as an `item`.
     *
     * @param {Function} onClose - Used to handle closing events.
     *
     * @param {Function} goFullscreen - Intended to be called with an argument `i`.
     *
     * @returns {BigInfoBox} Likely a React component. The returned component has props:
     * onClose, goFullscreen (which is called with argument i), and item set to the current
     * index i.
     */
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen(i)} item={i} />
    }
    /**
     * @description Retrieves additional data from a server, updates the local state to
     * reflect the new data, and handles loading and error states. It merges new tokens
     * with existing ones and increments pagination accordingly.
     *
     * @param {object} obj - Destructured from an argument, possibly named page or data
     * payload. It contains only one property named 'page'.
     *
     * @param {number} obj.page - Used to track the current page being loaded.
     *
     * @param {number} offset - Used to specify pagination offset.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        setMediaSlideLoading(true);
        getData('/addressTokens?address='+address+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Parses JSON data.
            d.json().then((j) => { 
                // Merges two arrays.
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
     * @description Changes the source of an image to a placeholder GIF when it fails to
     * load. It then listens for messages from other windows, and if a message with
     * specific data is received, it updates the image source with the new URL provided.
     *
     * @param {Event} e - An error event triggered when an image fails to load.
     */
    const imgError = (e) => { 
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        /**
         * @description Listens for messages from other sources, specifically responding to
         * a 'newThumb' request by updating an image's source URL and then removing itself
         * as a message listener.
         *
         * @param {object} mes - Data received from another source through an event message.
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
     * @description Generates a list item for a slide based on an object, applying styles
     * and event handlers dynamically. It returns a factory function that creates a
     * reusable `<li>` element with a link, image, and title, customized for each slide
     * item.
     *
     * @param {Function} click - Passed an item when invoked, possibly returning a click
     * event handler for that item.
     *
     * @param {number} ts - 60 plus thumb spacing.
     *
     * @param {number} thumbSpacing - Used to set the padding for thumb images.
     *
     * @returns {ReactElement<HTMLLIElement>} A reusable JSX component that represents
     * an HTML list item (li). It contains various styled elements including images and
     * links.
     */
    const slideItemHTML = (click,ts, thumbSpacing) => { 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Returns a factory function that generates a list item HTML element
     * based on provided parameters and an item object, with dynamic styles, event handlers,
     * and content. It takes click handler, timestamp, and thumb spacing as input to
     * create the item template.
     *
     * @param {any} click - Expected to return an event handler function.
     *
     * Define click as a callback function that handles the click event on each list item.
     *
     * @param {number} ts - Not used within the returned function.
     *
     * @param {number} thumbSpacing - Used for styling purposes, specifically padding
     * elements horizontally.
     *
     * @returns {any} A higher-order function that generates and returns individual list
     * items as JSX elements. Each generated list item contains linkable thumbnail images
     * with associated text.
     */
    const listItemHTML = (click,ts, thumbSpacing) => { 
        return (item,s,thumbSpacing) => { 
            return <li  style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={32} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Generates a closure that returns an HTML table row (tr) element for
     * each item passed to it, including a clickable image and title with customizable
     * padding and event handling. The closure is returned for use as an array map callback.
     *
     * @param {Function} click - Used to handle item click events.
     *
     * @param {number} ts - Undefined.
     *
     * @param {number} thumbSpacing - Used to add padding around thumbnail images.
     *
     * @returns {Function} A closure that generates an HTML table row (<tr> element)
     * containing a single cell (<td> element).
     */
    const detailsItemHTML=(click,ts, thumbSpacing) => { 
        return (item) => { 
            return <tr><td style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={64} /><br />{item.title}</a></Link></td></tr>
        }
    }
    /**
     * @description Returns a factory function for generating individual list items with
     * thumbnail images and links, each with unique styles, event handlers, and attributes
     * based on input parameters. The generated item is customizable through input arguments.
     *
     * @param {Function} click - Expected to return an event handler for a click on an item.
     *
     * @param {number} ts - Width of the image thumbnail.
     *
     * @param {number} thumbSpacing - Used for setting padding of thumbnail items.
     *
     * @returns {any} A function that takes an item object and returns HTML content
     * represented as JSX elements.
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
    let url = "https://clg.wtf/policy/"+props.token?.unit?.substr(0,56);
    let image = "https://clg.wtf/"+props.walletProfileThumb;
    let initialSelection = gallery?gallery[0]:null;
    if (props.token) { 
        title = props.token.title + ' - ' + props.wallet.name+" - Cardano Looking Glass - clg.wtf";
        url = "https://clg.wtf/policy/"+props.token.unit.substr(0,56)+"."+props.token.unit.substr(56);
        initialSelection=props.token;
    }
    /**
     * @description Logs an item to the console and navigates to a new URL using the
     * router. It updates the pathname with the address and selected unit, while preserving
     * the shallow navigation state.
     *
     * @param {object} item - Used to represent a selected item.
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