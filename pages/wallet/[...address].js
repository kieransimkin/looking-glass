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
 * @description Fetches and processes data for a web application's wallet page,
 * including fetching user wallet information from Redis, performing redirects if
 * necessary, and caching and retrieving token data.
 *
 * @param {object} context - Used to access server-side data.
 *
 * @returns {object} A payload that contains data to be used in rendering the page,
 * typically used in Next.js framework for server-side rendering.
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
            props.walletProfileThumb = 'https://clg.wtf/api/getTokenThumb?unit='+tokens[0]?.unit;
        }
        
        if (process.env.NODE_ENV=='production') { 
            const thumbName = result.profileUnit ? 'tokenThumb:'+result.profileUnit+':500:dark': 'tokenThumb:'+tokens[0]?.unit+':500:dark';
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
 * @description Renders a media slide showcasing tokens associated with a given wallet
 * address or token. It fetches data, displays the result, and handles interactions
 * such as item selection and loading more items.
 *
 * @param {any} props - Used to pass data from parent components to child components.
 *
 * @returns {JSX.Element} The output of a React component.
 */
export default  function CIP54Playground(props) {
    
    
    let dbStake = props.wallet?.stake;
    const router = useRouter();
    let address = props.address;
    
    const [gallery, setGallery] = useState(props.gallery);
    const [mediaSlideLoading, setMediaSlideLoading]=useState(false);
    if (!address) address='';
    
    useEffect(() => { 
        // Fetches gallery data based on an address.
        if (!address || address=='') return;
        if (gallery) return;
        setMediaSlideLoading(true);
        if (address.substring(0,1)=='$') { 
            const punycoded = punycode.toASCII(address.substr(1).trim());
            getData('/getTokenHolders?unit=f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'+Buffer.from(punycoded).toString('hex')).then((a)=>{
                // Parses JSON data from an API response.
                a.json().then((j) => { 
                    // Checks for wallet address and navigates to a new page.
                    if (j.length && j[0]?.address) { 
                        router.push({pathname:'/wallet/'+j[0].address})

                    }})});
        } else {
        
            getData('/addressTokens?address='+address).then((d)=>{
                // Parses JSON response data from an API call.
                d.json().then((j) => { 
                    // Handles data.
                    setGallery(j);
                    setMediaSlideLoading(false);
                });
                
            });
        }
        
    },[address])

    /**
     * @description Returns a JSX element, rendering a BigInfoBox component with props:
     * `onClose`, `item=i` and `goFullscreen` which calls itself recursively to pass its
     * result as an argument.
     *
     * @param {object} i - Passed to the `BigInfoBox` component.
     *
     * @param {Function} onClose - Not used in the code snippet, implying it is to be
     * handled by the component called `BigInfoBox`.
     *
     * @param {Function} goFullscreen - Passed from an outer scope.
     *
     * @returns {JSX.Element} A BigInfoBox component with props onClose, goFullscreen and
     * item.
     */
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen(i)} item={i} />
    }
    /**
     * @description Loads additional tokens from an API when a user requests to view more
     * content, merging new data with existing tokens and updating the gallery state
     * accordingly while handling loading state changes.
     *
     * @param {object} obj - Destructured to get an attribute named page from it. It's
     * optional, as indicated by its placement after a default value assignment within
     * the parameter definition parentheses.
     *
     * @param {number} obj.page - Intended to represent current page number.
     *
     * @param {number} offset - Described as offset to determine next page.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        setMediaSlideLoading(true);
        getData('/addressTokens?address='+address+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Converts JSON data to an array and updates state variables.
            d.json().then((j) => { 
                // Loads more media tokens into the gallery.
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
     * @description Handles image loading errors by replacing the failed image with a
     * placeholder (`/img-loading.gif`). It also sets up an event listener to receive
     * messages from other scripts, which can then replace the placeholder with the
     * original image's thumbnail if available.
     *
     * @param {Event} e - Intended for error events triggered by images.
     */
    const imgError = (e) => { 
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        /**
         * @description Receives messages from other windows or iframes, checks if they are
         * related to a new thumbnail and match an original URL, then updates the target
         * element's source attribute with the received URL and removes event listener after
         * execution.
         *
         * @param {Event} mes - Related to a message received from another source.
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
     * @description Generates a React component that creates an HTML list item for a
     * slide. It takes four arguments: click handler, thumb spacing, and two constants.
     * The returned function accepts a single argument, an item object, to be used in
     * rendering the HTML list item.
     *
     * @param {Function} click - Used to handle item click events.
     *
     * @param {number} ts - Used for image thumbnail size calculation.
     *
     * @param {number} thumbSpacing - Used for styling purposes, specifically setting padding.
     *
     * @returns {() => JSX.Element} A higher-order function that generates an LI element
     * with nested child elements for each item passed to it.
     */
    const slideItemHTML = (click,ts, thumbSpacing) => { 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Generates a factory for creating list item HTML components. Each
     * created component represents an individual list item, with its own unique key and
     * properties derived from the provided object. The click event is bound to the
     * specified action.
     *
     * @param {Function} click - Intended to be used as an event handler.
     *
     * @param {number} ts - 0.
     *
     * @param {number} thumbSpacing - Used for styling purposes, specifically for setting
     * padding on list items.
     *
     * @returns {Function} A function that generates an HTML list item element (`<li>`)
     * with the specified attributes and content. This generated function takes three
     * arguments: `item`, `s`, and `thumbSpacing`.
     */
    const listItemHTML = (click,ts, thumbSpacing) => { 
        return (item,s,thumbSpacing) => { 
            return <li  style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={32} /><br />{item.title}</a></Link></li>
        }
    }
    /**
     * @description Generates a table row (tr) element with a clickable cell containing
     * an image and text, based on item data passed to it. It returns a higher-order
     * function that takes an item object as an argument.
     *
     * @param {Function} click - Expected to return an event handler function.
     *
     * @param {boolean} ts - Used as a flag for some functionality.
     *
     * @param {number} thumbSpacing - Used to set pixel padding for thumbnail images.
     *
     * @returns {any} An arrow function that returns an HTML table row element (`<tr>`)
     * with a single table data element (`<td>`) containing various attributes and child
     * elements including an image and link.
     */
    const detailsItemHTML=(click,ts, thumbSpacing) => { 
        return (item) => { 
            return <tr><td style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={64} /><br />{item.title}</a></Link></td></tr>
        }
    }
    /**
     * @description Returns a function that generates an HTML list item for a thumbnail
     * image based on provided parameters, including click event handler and styling
     * options. It is used to create dynamic thumbnails with custom styles and behaviors.
     *
     * @param {Function} click - Used to handle item click events.
     *
     * @param {number} ts - Used to set image width.
     *
     * @param {number} thumbSpacing - Used to set the left, right, and bottom padding of
     * thumbnail list items.
     *
     * @returns {any} A factory function that generates an HTML list item element for
     * each item, containing an image and link to the item's URL, with event listeners
     * and styles applied.
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
     * @description Logs the selected item to the console and navigates the user to a new
     * route in the application using the `router.push` method, with options for path,
     * query, and hash modifications.
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