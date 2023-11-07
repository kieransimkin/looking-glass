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
import humanNumber from 'human-number'
const renderFile= async (item, ready, width='100%', height='100%') => { 
    let smI = {tokenUnit:''};
    if (item?.metadata?.files[0]?.mediaType?.substring(0,9)!='text/html') return;
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
function TokenRoundall({quantity}) { 
    let colour = 'blue';
    let text = 'FT';
    let margin = '1em';
    if (quantity==1) { 
        text = 'NFT'
        colour='green';
        margin = '0'
    }
    console.log(quantity);
    return <div style={{marginTop: '0.4em', marginBottom: margin,float: 'left',textAlign: 'center', borderRadius: '1.25em', width:'2.5em',height:'2.5em', background: colour, display: 'inline-block'}}>
    <div style={{marginBlockStart:0, marginBlockEnd: 0, top:'50%', transform: 'translateY(-50%)', position:'relative'}}>{text}
    <div style={{position: 'absolute', width:'100%', display:quantity!=1?'block':'none', fontSize:'0.7em', marginTop:'0.3em'}}>
        {humanNumber(quantity, n => Number.parseFloat(n).toFixed(1)*1)}
    </div>
    </div>
    </div>
}
function AdaHandle({stake}) { 
    const [handle, setHandle] = useState(null);
    useEffect(() => { 
        if (!handle) { 
            getData('/getAdaHandle?address='+stake).then((h) => { 
                h.json().then((j)=> {
                    setHandle(j)
                })
                
                
            });
        }
    },[stake]);

    if (handle) { 
        
        return <>
            <a target="_blank" href={"/wallet/"+stake}><span style={{color: 'green'}}>$</span> {handle}</a>
        </>
    } else { 
        return <>
            {stake.substring(0,7)}...{stake.slice(-6)}
        </>
    }
}
function BigInfoBox({item}) { 
    const theme = useTheme();
    const [ownerList, setOwnerList] = useState([]);
    const [portalHTML, setPortalHTML] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [portalOpacity, setPortalOpacity] = useState(0);
    const metadataRef = useRef();
    const imgRef = useRef();
    
    const readyCallback = () => { 
        setPortalOpacity(1);
    }       
    const load = (e) => { 
        setLoaded(true);
    }
    useEffect(() => { 
        if (imgRef.current) { 
            imgRef.current.addEventListener('load', load);
        }
        const tree = JsonTree.create(item.metadata, metadataRef.current)
        metadataRef.current.querySelectorAll('.jsontree_value_string').forEach((div)=>div.style.color=theme.palette.primary.main)
        metadataRef.current.querySelectorAll('.jsontree_value_number').forEach((div)=>div.style.color='#ff0000')
        metadataRef.current.querySelectorAll('.jsontree_value_boolean').forEach((div)=>div.style.color='#ff0000')
        metadataRef.current.querySelectorAll('.jsontree_value_null').forEach((div)=>div.style.color='#ff0000')
        setOwnerList([])
        
        setPortalOpacity(0);
        if (loaded) {
            
            renderFile(item,readyCallback, imgRef.current.clientWidth, imgRef.current.clientHeight).then((h) => { 
                setPortalHTML(h);
            })
        }

        getData('/getTokenHolders?unit='+item.unit).then((data) => { 
            data.json().then((o) => { 
                
                setOwnerList(o);
                
            })
        })
        return ()=> { 
            if (imgRef.current) { 
                imgRef.current.removeEventListener('load',load);
            }
            if (metadataRef.current)  metadataRef.current.innerHTML='';
        }
    },[item,loaded])
    
    return <div style={{display:'flex', flexDirection:'column', alignItems: 'center', height:'100%'}}>
    <div style={{position:'relative', marginTop: '1em', marginLeft: '1em'}}>
        <img ref={imgRef} src={item.thumb} style={{maxWidth:'100%'}} />
        <div style={{position: 'absolute', top: '0px', opacity:portalOpacity, transition: portalOpacity==1?'opacity 1s':""}}>
        {portalHTML}
        </div>
        </div>
        <div style={{position: 'relative', marginBottom: '0.5em'}}>
        <TokenRoundall quantity={item.quantity} /><h1 style={{display: 'inline-block', marginLeft:'0.4em', marginBlockStart:0, marginBlockEnd: 0}}>{item.title}</h1>
        </div>
        <ul className="owner-list">{ownerList.map((i) => <li><AdaHandle stake={i.stake} /> </li>)}</ul>
        <h2 style={{margin:0}}>Metadata:</h2>
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