/* eslint-disable react/display-name */

import {MediaSlide} from 'react-mediaslide'
import Link from 'next/link';
export default function PolicyQuickBrowse({policies, style})  { 
    if (!policies) { 
        return <>Loading...</>
    }
    const list = policies.map((p) => { 
        console.log(p);
        p.thumb=p.policyProfile?.thumb;
        p.tiny=p.policyProfile?.tiny;
        p.full=p.policyProfile?.full;
        p.title=p?.name;
        if (p?.name == p?.policyID) { 
            p.name = p.policyID.substring(0,6)+'...'+p.policyID.slice(-4);
        
        }
        p.linkUrl='/policy/'+p?.policyID;
                return p;
    })
    
    const slideItemHTML = (click,ts) => { 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a style={{pointerEvents:'all'}}><img src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    
    return (
        <div style={style}>
        <MediaSlide slideItemHTML={slideItemHTML} defaultThumbSize={100} defaultDisplayType='slide' defaultStageHidden={true} defaultNavbarHidden={true} gallery={list} />
        </div>
        
    )
}