import {useState, useRef} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import path from 'path';
import { setPolicyAssetCount } from '../../utils/database';
import { promises as fs } from 'fs';
import { useEffect } from 'react';
import Head from 'next/head'
import { getData, postData } from '../../utils/Api';
import {MediaSlide} from 'react-mediaslide'
import {SmartNFTPortal} from 'smartnftportal'
import BigInfoBox from '../../components/BigInfoBox';
import {tokenPortal} from '../../utils/tokenPortal';
import { CircularProgress } from '@material-ui/core';
import { checkCacheItem, incrementCacheItem } from '../../utils/redis';
import { getPolicy} from '../../utils/database';
import { getTokenData } from '../../utils/formatter';
import LoadingTicker from '../../components/LoadingTicker';
export const getServerSideProps = async (context) => { 
    
    let result = await getPolicy(context.query.policy[0]);
    let props = {};

    if (result) { 

        if (result.slug != result.policyID && context.query.policy[0]!=result.slug) { 
            return {
                redirect: {
                    destination: '/policy/'+result.slug,
                    permanent: true
                }
            }
        }
        if (result.policyID != context.query.policy[0] && context.query.policy[0]!=result.slug) { 
            return {
                redirect: {
                    destination: '/wallet/'+result.slug,
                    permanent: true
                }
            }
        }
        props.policy = JSON.parse(JSON.stringify(result));
        props.policyProfile = await checkCacheItem('policyProfile:'+result.policyID);
        let tokens = await checkCacheItem('getTokensFromPolicy:'+result.policyID);
        await incrementCacheItem('policyHits:'+result.policyID);
        await incrementCacheItem('policyRecentHits:'+result.policyID, 3600);
        if (tokens) { 
            if (!result.assetCount) { 
                await setPolicyAssetCount(result.policyID, tokens.length);
            }
            const perPage = 10;
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
            }
            if (!failed) { 
                props.gallery={tokens:tokResult, page:0, start:0, end:perPage, totalPages: Math.ceil(tokens.length/perPage), perPage: perPage};
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
    let policy = dbPolicy.policyID;
    const [gallery, setGallery] = useState(props?.gallery);
    const [mediaSlideLoading, setMediaSlideLoading]=useState(false);
    if (!policy) policy='';
    
    useEffect(() => { 
        if (!policy || policy=='') return;
        if (gallery) return;
        setMediaSlideLoading(true);
        getData('/policyTokens?policy='+policy).then((d)=>{
            d.json().then((j) => { 
                setGallery(j);
                setMediaSlideLoading(false);
            });
            
        });
        
    },[policy])
    if (!dbPolicy) { 
        return <h1>Policy Not Found</h1>
    }
    const renderBigInfo = async (i) => { 
        
        return <BigInfoBox item={i} />
    }
    const loadMoreData = ({page}) => { 
        if (mediaSlideLoading) return;
        setMediaSlideLoading(true);
        getData('/policyTokens?policy='+policy+'&page='+(parseInt(page)+1)).then((d)=>{
            d.json().then((j) => { 
                const newArray = [...gallery.tokens];
                newArray.push(...j.tokens);
                setGallery({tokens:newArray,page:j.page, totalPages: j.totalPages});
                setMediaSlideLoading(false);   
            });
            
        });
        console.log('Called outer load more data function');
        
    }
    /*
    
    */
   console.log(props);
   const title = props.policy.name+" - Cardano Looking Glass - clg.wtf"
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={props.policy.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={"https://clg.wtf/policy/"+props.policy.slug} />
                <meta property="og:site_name" content="Cardano Looking Glass" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={props.policy.description} />
                <meta property="og:image" content={"https://clg.wtf/api/getTokenThumb?unit="+props.policyProfile} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="clg.wtf" />
                <meta property="twitter:url" content={"https://clg.wtf/policy/"+props.policy.slug} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={props.policy.description} />
                <meta name="twitter:image" content={"https://clg.wtf/api/getTokenThumb?unit="+props.policyProfile} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MediaSlide renderBigInfo={renderBigInfo} renderFile={tokenPortal} onLoadMoreData={loadMoreData} loading={mediaSlideLoading} gallery={gallery?.tokens} loadingIndicator=<LoadingTicker /> pagination={{page: gallery?.page, totalPages: gallery?.totalPages }} />
        </>
    );
}