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
import { getWallet } from '../../utils/database';
import { checkCacheItem, getClient, incrementCacheItem } from '../../utils/redis';
import { getTokenData } from '../../utils/formatter';
import Head from 'next/head'
import LoadingTicker from '../../components/LoadingTicker';
import Link from 'next/link';
import { getDataURL } from '../../utils/DataStore';
export const getServerSideProps = async (context) => { 
    const redisClient = await getClient();
    let result = await getWallet(context.query.address[0]);
    let props = {};

    if (result) { 
        if (result.slug != result.stake && context.query.address[0]!=result.slug) { 
            return {
                redirect: {
                    destination: '/wallet/'+result.slug,
                    permanent: true
                }
            }
        }
        if (result.stake != context.query.address[0] && context.query.address[0]!=result.slug) { 
            return {
                redirect: {
                    destination: '/wallet/'+result.stake,
                    permanent: true
                }
            }
        }
        
        props.wallet = JSON.parse(JSON.stringify(result));
        
        
        let tokens = await checkCacheItem('getTokensFromAddress:'+result.stake);
        await incrementCacheItem('walletHits:'+result.stake);
        await incrementCacheItem('walletRecentHits:'+result.stake, 3600);
        await redisClient.lPush('lg:walletHitLog:'+result.stake, JSON.stringify(Date.now()))
        if (tokens) { 
            const perPage = 10;
            const totalPages =  Math.ceil(tokens.length/perPage)
            tokens = tokens.slice(0, perPage);       
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
                const thumbName = 'tokenThumb:'+tokResult[c].unit+':500:dark';
                let thumbURL;
                if ((thumbURL = getDataURL(thumbName,'jpg'))) {
                    tokResult[c].thumb = thumbURL;
                }
            }
            if (!failed) { 
                props.gallery={tokens:tokResult, page:0, start:0, end:perPage, totalPages, perPage: perPage};
            }
        }
    }
    return {
        props
    }
}

export default  function CIP54Playground(props) {
    const dbWallet = props.wallet;
 
    const router = useRouter();
    let address = props.wallet.stake;
    const [gallery, setGallery] = useState(props.gallery);
    const [mediaSlideLoading, setMediaSlideLoading]=useState(false);
    if (!address) address='';
    
    useEffect(() => { 
        if (!address || address=='') return;
        if (gallery) return;
        setMediaSlideLoading(true);
        getData('/addressTokens?address='+address).then((d)=>{
            d.json().then((j) => { 
                setGallery(j);
                setMediaSlideLoading(false);
            });
            
        });
        
    },[address])
    if (!dbWallet) { 
        return <h1>Wallet Not Found</h1>
    }
    const renderBigInfo = async (i) => { 
        
        return <BigInfoBox item={i} />
    }
    const loadMoreData = ({page}) => { 
        if (mediaSlideLoading) return;
        setMediaSlideLoading(true);
        getData('/addressTokens?address='+address+'&page='+(parseInt(page)+1)).then((d)=>{
            d.json().then((j) => { 
                const newArray = [...gallery.tokens];
                newArray.push(...j.tokens);
                setGallery({tokens:newArray,page:j.page, totalPages: j.totalPages});
                setMediaSlideLoading(false);   
            });
            
        });
        console.log('Called outer load more data function');
        
    }
    const title = props.wallet.name+" - Cardano Looking Glass - clg.wtf"
    let newGallery = null;
    if (gallery) {
        newGallery=gallery.tokens.map((i)=>{
        i.linkUrl='/policy/'+i.unit.substring(0,56)+'.'+i.unit.substr(56);
        console.log(i.linkUrl);
        return i;
        })
    }
    const slideItemHTML = (click,ts) => {
         
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    /*
    
    */
   console.log(props);
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={props.wallet.bio} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={"https://clg.wtf/wallet/"+props.wallet.slug} />
                <meta property="og:site_name" content="Cardano Looking Glass" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={props.wallet.bio} />
                <meta property="og:image" content={"https://clg.wtf/api/getTokenThumb?unit="+props.wallet.profileUnit} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="clg.wtf" />
                <meta property="twitter:url" content={"https://clg.wtf/wallet/"+props.wallet.slug} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={props.wallet.bio} />
                <meta name="twitter:image" content={"https://clg.wtf/api/getTokenThumb?unit="+props.wallet.profileUnit} />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MediaSlide slideItemHTML={slideItemHTML} renderBigInfo={renderBigInfo} renderFile={tokenPortal} onLoadMoreData={loadMoreData} loading={mediaSlideLoading} gallery={newGallery} loadingIndicator=<LoadingTicker /> pagination={{page: gallery?.page, totalPages: gallery?.totalPages }} />
        </>
    );
}