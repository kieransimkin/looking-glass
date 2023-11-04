import {useState} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import path from 'path';
import { promises as fs } from 'fs';
import { useEffect } from 'react';
import { getData, postData } from '../../utils/Api';
import {MediaSlide} from 'react-mediaslide'
import {SmartNFTPortal} from 'smartnftportal'
export default  function CIP54Playground(params) {
    
    const router = useRouter();
    let {policy} = router.query;  
    const [gallery, setGallery] = useState(null);
    const [mediaSlideLoading, setMediaSlideLoading]=useState(false);
    if (!policy) policy='';
    
    useEffect(() => { 
        setMediaSlideLoading(true);
        getData('/policyTokens?policy='+policy).then((d)=>{
            d.json().then((j) => { 
                setGallery(j);
                setMediaSlideLoading(false);
            });
            
        });
        
    },[policy])
    const renderFile= async (item, ready) => { 
        let smI = {tokenUnit:''};
        if (item.metadata?.uses) { 
            const imports = await postData('/getSmartImports',{metadata: item.metadata, unit: item.unit, walletAddr:'foo'});
            const importJson = await imports.json();
            smI=importJson;
            
        }
        const doCallback = () => { 
            ready();
        }
        return <SmartNFTPortal key={Math.random()} onReady={doCallback} loading={false} metadata={item.metadata} smartImports={smI} style={{width:'100%',height:'100%', borderWidth:'0', minWidth:'10px',minHeight:'10px'}} />

    }
    const loadMoreData = ({page}) => { 
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
    return (
        <>
            <MediaSlide renderFile={renderFile} onLoadMoreData={loadMoreData} loading={mediaSlideLoading} gallery={gallery?.tokens} pagination={{page: gallery?.page, totalPages: gallery?.totalPages }} />
        </>
    );
}