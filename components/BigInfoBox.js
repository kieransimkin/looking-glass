import * as JsonTree from 'json-tree-viewer'
import { useTheme } from '@material-ui/core';
import { getData, postData } from '../utils/Api';
import AdaHandle from './AdaHandle';
import TokenRoundall from '../components/TokenRoundall';
import { useState, useRef, useEffect } from 'react';
import {tokenPortal} from '../utils/tokenPortal';
import PolicyInfo from './PolicyInfo';
export default function BigInfoBox ({item}) { 
    const theme = useTheme();
    const [ownerList, setOwnerList] = useState([]);
    const [portalHTML, setPortalHTML] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [portalOpacity, setPortalOpacity] = useState(0);
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const metadataRef = useRef();
    const imgRef = useRef();
    
    const readyCallback = () => { 
        setPortalOpacity(1);
    }       
    const load = (e) => {
        setTimeout(() => { 
            setHeight(imgRef.current.offsetHeight);
            setWidth(imgRef.current.offsetWidth)
            console.log(imgRef.current.clientWidth);
            setLoaded(true);
        },0) 
        
    }
    useEffect(()=> { 
        console.log('new sidebar item');
    },[item])
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
            console.log(width,height);
            tokenPortal(item,readyCallback, width, height).then((h) => { 
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
    },[item,loaded, width, height])
    
    return <div style={{position:'relative', marginTop: '1em', marginLeft: '1em'}}><div style={{display:'flex', flexDirection:'column', alignItems: 'center', height:'100%'}}>
    
        <img ref={imgRef} src={item.thumb} style={{maxWidth:'100%', transition: 'none', overflow: 'visible'}} />
        
        <TokenRoundall quantity={item.quantity} />
        <div style={{position: 'absolute', top: '0px', opacity:portalOpacity, transition: portalOpacity==1?'opacity 1s':""}}>
        {portalHTML}
        </div>
        
        <h1 style={{wordBreak: 'break-word', display: 'inline-block', marginLeft:'0.4em', marginBlock: 0}}>{item.title}</h1>
        
        
        <div style={{position: 'relative', marginBottom: '0.3em', marginTop:'0em', paddingTop:'0em'}}>
        <PolicyInfo policyID={item.unit.substring(0,56)} />
        </div>
        <div style={{position: 'relative', marginBottom: '0.5em'}}>
        <ul className="owner-list">{ownerList.map((i) => <li key={i.stake}><AdaHandle stake={i.stake} /> </li>)}</ul>
        </div>
        </div>
        
        <h2 style={{margin:0}}>Metadata:</h2>
        <div ref={metadataRef} style={{width:'100%', overflowX: 'auto', overflowY: 'auto'}} />
        </div>
        
}