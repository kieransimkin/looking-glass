/* eslint-disable react/display-name */
import {useState, useRef, useCallback} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import path from 'path';
import { setPolicyAssetCount } from '../../utils/database.mjs';
import { promises as fs } from 'fs';
import { useEffect } from 'react';
import Head from 'next/head'
import { getData, postData } from '../../utils/Api';
import {MediaSlide} from 'react-mediaslide'
import {SmartNFTPortal} from 'smartnftportal'
import BigInfoBox from '../../components/BigInfoBox';
import {tokenPortal} from '../../utils/tokenPortal';
import { CircularProgress } from '@material-ui/core';
import { checkCacheItem, incrementCacheItem, getClient } from '../../utils/redis.mjs';
import { getPolicy} from '../../utils/database.mjs';
import { getTokenData } from '../../utils/formatter';
import LoadingTicker from '../../components/LoadingTicker';
import { getDataURL } from '../../utils/DataStore';
import OwnerList from '../../components/OwnerList';
import {ProfileObject, WithContext} from 'schema-dts'
import validator from 'validator';
import { utf8ToHex, hexToUtf8 } from '../../utils/Helpers.mjs';
const { isIn, isHexadecimal } = validator.default;
const getTokenLinkUrl = (slug, t) => { 
    if (!t || t.length<1) { 
        return  '/policy/'+slug;
    }
    if (isHexadecimal(t)) { 
        try { 
            if (utf8ToHex(decodeURIComponent(encodeURIComponent(hexToUtf8(t)))) == t && !isHexadecimal(hexToUtf8(t))) { 
                return '/policy/'+slug+'.'+encodeURIComponent(hexToUtf8(t));
            } else { 
                return '/policy/'+slug+'.'+t;
            }
        } catch (e) { 
            return '/policy/'+slug+'.'+t;
        }
    } else { 
        return '/policy/'+slug+'.'+encodeURIComponent(t);
    }
    
}
export const getServerSideProps = async (context) => { 
    const redisClient = await getClient();
    let policy = context.query.policy[0];
    const segs = policy.split('.');
    let token = segs.length>1?segs[segs.length-1]:null;
    if (token) { 
        policy = policy.substr(0,policy.length-(token.length+1));
    }
    
    let result = await getPolicy(policy);
    if (!result && token) { 
        token=null;
        policy = context.query.policy[0];
        result = await getPolicy(policy);
    }
    

    let props = {};
    if (result) {
        try {  
            if (token && token.length>0 && !isHexadecimal(token)) { 
                token=utf8ToHex(token);
            } else if (token && token.length>0 && utf8ToHex(decodeURIComponent(encodeURIComponent(hexToUtf8(token)))) == token && !isHexadecimal(hexToUtf8(token))) { 
                return {
                    redirect: {
                        destination: getTokenLinkUrl(result.slug,token),
                        statusCode: 301
                    }
                }
            }
        } catch (e) { }
        if (result.slug != policy && context.query.policy[0]!=result.slug) { 
            return {
                redirect: {
                    destination: getTokenLinkUrl(result.slug,token),
                    statusCode: 301
                }
            }
        }
        props.policy = JSON.parse(JSON.stringify(result));
        props.policyProfile = await checkCacheItem('policyProfile:'+result.policyID);
        if (!props.policyProfile) { 
            redisClient.publish('requestPolicyProfile',result.policyID);
        }
        if (process.env.NODE_ENV=='production' && props.policyProfile) { 
            const thumbName = 'tokenThumb:'+props.policyProfile+':500:dark';
            let thumbURL;
            if ((thumbURL = getDataURL(thumbName,'jpg'))) {
                props.policyProfileThumb = thumbURL;
            }
            const tinyName = 'tokenThumb:'+props.policyProfile+':64:dark';
            let tinyURL;
            if ((tinyURL = getDataURL(tinyName,'jpg'))) {
                props.policyProfileTiny = tinyURL;
            }
        }
        let tokens = await checkCacheItem('getTokensFromPolicy:'+result.policyID);
        await incrementCacheItem('policyHits:'+result.policyID);
        await incrementCacheItem('policyRecentHits:'+result.policyID, 3600);
        await redisClient.lPush('lg:policyHitLog:'+result.policyID, JSON.stringify(Date.now()))
        if (tokens) { 
            tokens = tokens.filter((t) => { 
                if (t?.unit.length==56) return false;
                return true;
            })
            if (!result.assetCount) { 
                await setPolicyAssetCount(result.policyID, tokens.length);
            }
            const perPage = 10;
            let page = 0;
            let start=0,end=perPage;
            if (token) { 
                const idx = tokens.findIndex((i)=>i.unit==props.policy.policyID+token);
                page = Math.floor(idx/perPage);
                start = page*perPage;
                end = (page+1)*perPage;
            }
            const totalPages = Math.ceil(tokens.length/perPage);
            tokens = tokens.slice(start, end);
            const promises = [];
            for (const token of tokens) { 
                promises.push(getTokenData(token));
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
                    const tinyName = 'tokenThumb:'+tokResult[c].unit+':64:dark';
                    let tinyURL;
                    if ((tinyURL = getDataURL(tinyName,'jpg'))) {   
                        tokResult[c].tiny = tinyURL;
                    }
                    
                }
                if (!tokResult[c].files) tokResult[c].files=[]
                if (token && tokResult[c].unit==props.policy.policyID+token) { 
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

export default  function CIP54Playground(props) {
    const dbPolicy = props.policy;
    
    const router = useRouter();
    //let {policy} = router.query;  
    let policy = dbPolicy?.policyID;
    const [gallery, setGallery] = useState(props?.gallery);
    const [mediaSlideLoading, setMediaSlideLoading]=useState(false);
    const [bigInfoOpen, setBigInfoOpen] = useState(false);
    const [currentSelection, setCurrentSelection] = useState(props.token);
 
    const openBigInfo = (item) => { 
        console.log('Biginfo open');
        setBigInfoOpen(true);
    }
    const closeBigInfo = (item) => { 
        console.log('Biginfo closed');
        setBigInfoOpen(false);
    }   
    if (!policy) policy='';
    
    useEffect(() => { 
        if (!policy || policy=='') return;
        if (gallery) return;
        
        getData('/policyTokens?policy='+policy).then((d)=>{
            d.json().then((j) => { 
                j.tokens = j.tokens.filter((t)=> { 
                    if (t?.unit.length==56) return false;
                    if (!t?.metadata?.image && !t?.metadata?.files) return false;
                    return true;
                })
                setGallery(j);
        
            });
            
        });
        
    },[policy]);
    const renderBigInfo = useCallback( (i, onClose, goFullscreen, navbarHeight, newBigInfoOpen) => { 
        setBigInfoOpen(newBigInfoOpen);
        console.log('Called render biginfo');
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen(i)} item={i} navbarHeight={navbarHeight} bigInfoOpen={newBigInfoOpen} />
    },[bigInfoOpen, currentSelection]);

    useEffect(()=> { 
        const msgHandler = (e) => { 
            if (e.data.request=='mediaslide-open-leftbar') { 
                console.log('Got open leftbar message');
                setBigInfoOpen(true);
            } else if (e.data.request=='mediaslide-close-leftbar') { 
                console.log('Got close leftbar message');
                setBigInfoOpen(false);
            }
        } 
        if (window) {
            window.addEventListener('message',msgHandler, true);
        }
        return ()=> { 
            window.removeEventListener('message',msgHandler, true);
        }
    },[])
    
    if (!dbPolicy) { 
        return <h1>Policy Not Found</h1>
    }
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        
        getData('/policyTokens?policy='+policy+'&page='+(parseInt(page)+offset)).then((d)=>{
            d.json().then((j) => { 
                j.tokens = j.tokens.filter((t) => { 
                    if (t?.unit.length==56) return false;
                    if (!t?.metadata?.image && !t?.metadata?.files) return false;
                    return true;
                })
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
    const imgError = (e) => { 
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        const messageHandler = (mes) => { 
            if (mes.data.request=='newThumb' && mes.data.originalUrl==origSrc.replace(mes.origin,'')) { 
                e.target.src=mes.data.url;
                window.removeEventListener('message',messageHandler);
            }
        };
        window.addEventListener('message',messageHandler)
        
    }
    const slideItemHTML = (click,ts, thumbSpacing) => { 
 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    const listItemHTML = (click,ts, thumbSpacing) => { 
        return (item,s,thumbSpacing) => { 
            return <li  style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={32} /><br />{item.title}</a></Link></li>
        }
    }
    

    const detailsItemHTML=(click,ts, thumbSpacing) => { 
        return (item) => { 
            return <tr style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}>
                <td width="30%"><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={64} />{item.title}</a></Link></td>
                <td width="auto"><OwnerList unit={item.unit} /></td>
                </tr>
        }
    }


    const thumbnailsItemHTML = (click,ts, thumbSpacing) => { 
        return (item) => { 
            return <li style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={item.thumb} width={ts} /><br />{item.title}</a></Link></li>
        }
    }
  
    
    /*
    
    */
   
    let title = props.policy.name+" - Cardano Looking Glass - clg.wtf"
    let description = props.policy.description;
    let url = "https://clg.wtf/policy/"+props.policy.slug;
    let image = "https://clg.wtf"+props.policyProfileThumb;
    let policyProfileImage = image;
    let initialSelection = gallery?gallery[0]:null;
    
    
    if (props.token) { 
        title = props.token.title + ' - ' + props.policy.name + ' -  Cardano Looking Glass - clg.wtf';
        url = "https://clg.wtf"+getTokenLinkUrl(props.policy.slug,props.token.unit.substr(56));
        image = "https://clg.wtf"+props.token.thumb;
        initialSelection=props.token;
    }
    if (!description && Array.isArray(initialSelection?.metadata?.description)) { 
        description = initialSelection?.metadata?.description.join('');
    }
    if (!description && typeof initialSelection?.metadata?.description == 'string') { 
        description = initialSelection?.metadata?.description
    }
    if (!description && Array.isArray(initialSelection?.metadata['Description'])) { 
        description = initialSelection?.metadata['Description'].join('');
    }
    if (!description && typeof initialSelection?.metadata['Description'] == 'string') { 
        description = initialSelection?.metadata['Description']
    }
    
    if (!description || description.length<1) { 
        if (props.token) { 
            description = props.token.title+' is a token, part of an NFT collection called '+props.policy.name+', minted on Cardano';
        } else { 
            description=props.policy.name+' is an NFT collection, minted on Cardano'
        }
    }
    
    let newGallery = null;
    if (gallery) {
        newGallery=gallery.tokens.map((i)=>{
            i.linkUrl=getTokenLinkUrl(props.policy.slug,i.unit.substr(56));
            return i;
        })
    }

    const selectionChange = (item) => { 
        //window.postMessage({request:'showLoading'},'*');
        setCurrentSelection(item);
        router.push({
            pathname: getTokenLinkUrl(props.policy.slug, item.unit.substr(56)),
            query: {  },
            hash:' '
        }, undefined, {shallow:true})
    }
    let profileStructuredData =
    {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "dateCreated": dbPolicy.createdAt,
        "dateModified": dbPolicy.lastMinted || dbPolicy.lastMoved,
        "mainEntity": {
          "@type": "Organization",
          "name": dbPolicy.name,
          "alternateName": dbPolicy.slug,
          "identifier": dbPolicy.policyID,
          "interactionStatistic": [{
            "@type": "InteractionCounter",
            "interactionType": "https://schema.org/LikeAction",
            "userInteractionCount": dbPolicy.totalHits
          }],
          
            "agentInteractionStatistic": [{
                "@type": "InteractionCounter",
                "interactionType": "https://schema.org/WriteAction",
                "userInteractionCount": dbPolicy.assetCount
              },
              {
                "@type": "InteractionCounter",
                "interactionType": "https://schema.org/ShareAction",
                "userInteractionCount": dbPolicy.totalActivity
              },
            ],
          
          "description": description,
          "image": [
            policyProfileImage,
            image
          ]
        }
    }
    console.log('Redrawing policy page');
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
            <MediaSlide onOpenBigInfo={openBigInfo} onCloseBigInfo={closeBigInfo} initialSelection={initialSelection} slideItemHTML={slideItemHTML} listItemHTML={listItemHTML} thumbnailsItemHTML={thumbnailsItemHTML} detailsItemHTML={detailsItemHTML} selectionChange={selectionChange} renderBigInfo={renderBigInfo} renderFile={tokenPortal} onLoadMoreData={loadMoreData} loading={mediaSlideLoading} gallery={newGallery} loadingIndicator=<LoadingTicker /> pagination={{page: gallery?.page, totalPages: gallery?.totalPages }} />
        </>
    );
}