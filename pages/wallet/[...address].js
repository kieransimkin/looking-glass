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


export default  function CIP54Playground(params) {
    
    const router = useRouter();
    let {address} = router.query;  
    const [gallery, setGallery] = useState(null);
    const [mediaSlideLoading, setMediaSlideLoading]=useState(false);
    if (!address) address='';
    
    useEffect(() => { 
        if (!address || address=='') return;
        setMediaSlideLoading(true);
        getData('/addressTokens?address='+address).then((d)=>{
            d.json().then((j) => { 
                setGallery(j);
                console.log(j);
                setMediaSlideLoading(false);
            });
            
        });
        
    },[address])

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
                console.log({tokens:newArray,page:j.page, totalPages: j.totalPages})
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
            <MediaSlide renderBigInfo={renderBigInfo} renderFile={tokenPortal} onLoadMoreData={loadMoreData} loading={mediaSlideLoading} gallery={gallery?.tokens} loadingIndicator=<CircularProgress style={{marginLeft: 'auto', marginRight:'auto'}} /> pagination={{page: gallery?.page, totalPages: gallery?.totalPages }} />
        </>
    );
}