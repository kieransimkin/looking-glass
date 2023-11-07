import {useState, useRef} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import path from 'path';
import { promises as fs } from 'fs';
import { useEffect } from 'react';
import { getData, postData } from '../../utils/Api';
import {MediaSlide} from 'react-mediaslide'
import {SmartNFTPortal} from 'smartnftportal'
import * as JsonTree from 'json-tree-viewer'
import { useTheme } from '@material-ui/core';
const renderFile= async (item, ready, width='100%', height='100%') => { 
    let smI = {tokenUnit:''};
    if (item.metadata?.uses) { 
        const walletAddr = (await (await getData('/getTokenHolders?unit='+item.unit)).json())[0].stake;
        const imports = await postData('/getSmartImports',{metadata: item.metadata, unit: item.unit, walletAddr});
        const importJson = await imports.json();
        smI=importJson;
        
    }
    const doCallback = () => { 
        ready();
    }
    return <SmartNFTPortal key={Math.random()} onReady={doCallback} loading={false} metadata={item.metadata} smartImports={smI} style={{width:width,height:height, borderWidth:'0', minWidth:'10px',minHeight:'10px'}} />
}
function BigInfoBox({item}) { 
    const theme = useTheme();
    const [ownerList, setOwnerList] = useState([]);
    const [portalHTML, setPortalHTML] = useState(null);
    const [portalOpacity, setPortalOpacity] = useState(0);
    const metadataRef = useRef();
    const imgRef = useRef();
    const readyCallback = () => { 
        setPortalOpacity(1);
    }
    useEffect(() => { 
        const tree = JsonTree.create(item.metadata, metadataRef.current)
        metadataRef.current.querySelectorAll('.jsontree_value_string').forEach((div)=>div.style.color=theme.palette.primary.main)
        metadataRef.current.querySelectorAll('.jsontree_value_number').forEach((div)=>div.style.color='#ff0000')
        metadataRef.current.querySelectorAll('.jsontree_value_boolean').forEach((div)=>div.style.color='#ff0000')
        metadataRef.current.querySelectorAll('.jsontree_value_null').forEach((div)=>div.style.color='#ff0000')
        setOwnerList([])
        
        setPortalOpacity(0);
        renderFile(item,readyCallback, imgRef.current.clientWidth, imgRef.current.clientHeight).then((h) => { 
            setPortalHTML(h);
        })
        
        getData('/getTokenHolders?unit='+item.unit).then((data) => { 
            data.json().then((o) => { 
                
                setOwnerList(o);
                
            })
        })
        return ()=> { 
            if (metadataRef.current)  metadataRef.current.innerHTML='';
        }
    },[item])
    
    return <div style={{display:'flex', flexDirection:'column', alignItems: 'center', height:'100%'}}>
    <div style={{position:'relative', marginTop: '1em', marginLeft: '1em'}}>
        <img ref={imgRef} src={item.thumb} style={{maxWidth:'100%'}} />
        <div style={{position: 'absolute', top: '0px', opacity:portalOpacity, transition: portalOpacity==1?'opacity 1s':""}}>
        {portalHTML}
        </div>
        </div>
        <h1>{item.title}</h1>
        <ul>{ownerList.map((i) => <li>{i.stake}</li>)}</ul>
        Metadata:
        <div ref={metadataRef} style={{width:'100%', overflowX: 'auto', overflowY: 'auto'}} />
        </div>
        
}
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

    const renderBigInfo = async (i) => { 
        
        return <BigInfoBox item={i} />
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
            <MediaSlide renderBigInfo={renderBigInfo} renderFile={renderFile} onLoadMoreData={loadMoreData} loading={mediaSlideLoading} gallery={gallery?.tokens} pagination={{page: gallery?.page, totalPages: gallery?.totalPages }} />
        </>
    );
}