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
 * @description Retrieves and prepares data for a server-side rendered page. It fetches
 * wallet information from Redis, performs redirects based on wallet slug or stake,
 * and assembles props with wallet data, tokens, and other related metadata.
 *
 * @param {any} context - Used to pass server-side data.
 *
 * @returns {object} Either a redirection to another route or an object with key-value
 * pairs representing props to be used by a component.
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
        } else if (tokens && tokens?.length>0) { 
            props.walletProfileThumb = 'https://clg.wtf/api/getTokenThumb?unit='+tokens[tokens?.length-1]?.unit;
        }
        
        if (process.env.NODE_ENV=='production') { 
            const thumbName = result.profileUnit ? 'tokenThumb:'+result.profileUnit+':500:dark': ((tokens?.length)?'tokenThumb:'+tokens[tokens?.length-1]?.unit+':500:dark':null);
            let thumbURL;
            if (thumbName && (thumbURL = getDataURL(thumbName,'jpg'))) {
                props.walletProfileThumb = 'https://clg.wtf'+thumbURL;
            }
        }
        await incrementCacheItem('walletHits:'+result.stake);
        await incrementCacheItem('walletRecentHits:'+result.stake, 3600);
        await redisClient.lPush('lg:walletHitLog:'+result.stake, JSON.stringify(Date.now()))
        if (tokens && tokens?.length>0) { 
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
            for (let c=0;c<tokResult?.length;c++ ) { 
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
 * @description Renders a media slide component displaying tokens from a Cardano
 * wallet or NFT collection. It fetches token data, handles pagination and navigation,
 * and provides structured data for search engine optimization (SEO).
 *
 * @param {any} props - Used to pass custom data from parent components.
 *
 * @returns {JSX.Element} A React component that represents a webpage with various
 * media slides and interactive elements for displaying Cardano wallet information
 * and NFT collections.
 */
export default  function CIP54Playground(props) {
    
    let dbStake = props.wallet?.stake;
    const router = useRouter();
    let address = props.address;
    
    const [gallery, setGallery] = useState(props.gallery);
    const [mediaSlideLoading, setMediaSlideLoading]=useState(false);
    if (!address) address='';
    
    useEffect(() => { 
        // Retrieves token data from an API based on a given address.
        if (!address || address=='') return;
        if (gallery) return;
        setMediaSlideLoading(true);
        if (address.substring(0,1)=='$') { 
            const punycoded = punycode.toASCII(address.substr(1).trim());
            getData('/getTokenHolders?unit=f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'+Buffer.from(punycoded).toString('hex')).then((a)=>{
                // Parses JSON data and navigates to a wallet page if available.
                a.json().then((j) => { 
                    // Navigates to wallet page based on address data received from API response.
                    if (j.length && j[0]?.address) { 
                        router.push({pathname:'/wallet/'+j[0].address})

                    }})});
        } else {
        
            getData('/addressTokens?address='+address).then((d)=>{
                // Parses JSON data.
                d.json().then((j) => { 
                    // Updates application state.
                    setGallery(j);
                    setMediaSlideLoading(false);
                });
                
            });
        }
        
    },[address])

    /**
     * @description Returns a JSX element representing a big info box with props: `onClose`,
     * `item` and optionally a `goFullscreen` callback, which is called with argument
     * `i`. The resulting element displays information about item `i`.
     *
     * @param {object} i - Referenced as an item to be rendered.
     *
     * @param {Function} onClose - Likely a callback to close the Big Info Box.
     *
     * @param {Function} goFullscreen - Called when button is clicked.
     *
     * @returns {BigInfoBox} JSX element that contains several properties and an item
     * reference. It's used to represent a component with big information.
     */
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen(i)} item={i} />
    }
    /**
     * @description Fetches additional address tokens by making a GET request to
     * `/addressTokens`. It merges the new data with existing gallery tokens, updates the
     * gallery state, and toggles loading status.
     *
     * @param {object} obj - Destructured, assigning its property named 'page' to a local
     * variable with the same name, which will be incremented by an offset value before
     * being concatenated into a URL.
     *
     * @param {number} obj.page - Used to load more data from a particular page.
     *
     * @param {number} offset - Used to determine whether to append new data to existing
     * tokens or replace them.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        setMediaSlideLoading(true);
        getData('/addressTokens?address='+address+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Retrieves and processes JSON data.
            d.json().then((j) => { 
                // Merges token arrays.
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
     * @description Displays a placeholder image when an image fails to load, then retrieves
     * and displays the actual image through postMessage communication with another script
     * if it is available.
     *
     * @param {Event} e - An error event triggered by an image loading issue.
     */
    const imgError = (e) => { 
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        /**
         * @description Handles messages from another origin, updating an image's source to
         * a new thumbnail URL if the message meets specific criteria. It also removes itself
         * as a listener after handling the message.
         *
         * @param {Event} mes - An event listener for receiving messages from other windows
         * or frames.
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
     * @description Returns a factory function that generates an HTML list item (LI)
     * element for each item in a collection, including an image and link to display the
     * item's information. The element is customizable with various styles and event handlers.
     *
     * @param {Function} click - Intended to handle click events on slide items.
     *
     * @param {number} ts - Likely an abbreviation for "thumbnail size".
     *
     * @param {number} thumbSpacing - Used to set padding for image elements.
     *
     * @returns {ReactElement} A JSX element representing an HTML list item (li) with
     * associated styles and event handlers. It also contains nested JSX elements for an
     * image and link.
     */
    const slideItemHTML = (click,ts, thumbSpacing) => { 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Returns a new function that generates HTML for an individual list item.
     * It takes three arguments: click handler, timestamp, and thumb spacing.
     * The returned function takes an item object, its sort index, and thumb spacing as
     * arguments to create the list item markup.
     *
     * @param {Function} click - Used as an event handler for li element clicks.
     *
     * @param {number} ts - Unused in this code snippet.
     *
     * @param {number} thumbSpacing - Used to set padding around each list item.
     *
     * @returns {(item: object) => JSX.Element} A list item with attributes such as
     * padding, key and onClick event handler and nested components like image, link, and
     * anchor tags.
     */
    const listItemHTML = (click,ts, thumbSpacing) => { 
        return (item,s,thumbSpacing) => { 
            return <li  style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={32} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Returns a factory function that generates table row HTML for an item.
     * It takes three parameters: a click event handler, a timestamp, and thumb spacing.
     * The returned factory function is called with an item object, which is then used
     * to populate the HTML.
     *
     * @param {Function} click - Used to handle item clicks.
     *
     * @param {number} ts - Unused in this code snippet.
     *
     * @param {number} thumbSpacing - Used for horizontal padding of table cells.
     *
     * @returns {() => JSX.Element} A function that takes an item as argument and returns
     * a tr element containing information about that item in tabular format.
     */
    const detailsItemHTML=(click,ts, thumbSpacing) => { 
        return (item) => { 
            return <tr><td style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={64} /><br />{item.title}</a></Link></td></tr>
        }
    }
    /**
     * @description Generates a template for a list item representing a thumbnail image.
     * It takes three parameters: a click handler, a timestamp, and thumbnail spacing,
     * and returns an anonymous function that constructs an HTML element with the given
     * item properties.
     *
     * @param {Function} click - Used to handle item click events.
     *
     * @param {number} ts - Intended for thumb width specification.
     *
     * @param {number} thumbSpacing - Used for padding in thumbnail item HTML.
     *
     * @returns {Function} A factory function that generates an object representing an
     * HTML list item.
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
     * @description Updates the URL based on a selected item. It logs the item to the
     * console and pushes a new route using the router API, creating a link to a specific
     * wallet page with the selected item's details.
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