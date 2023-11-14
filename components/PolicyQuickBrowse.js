import {MediaSlide} from 'react-mediaslide'
export default function PolicyQuickBrowse({policies}) { 
    const list = policies.map((p) => { 
        p.thumb=p.policyProfile.thumb;
        p.tiny=p.policyProfile.tiny;
        p.full=p.policyProfile.full;
        p.title=p.name;
        p.linkUrl='/policy/'+p.policyID;
                return p;
    })
    console.log(list);
    return (
        
        <MediaSlide defaultThumbSize={100} defaultDisplayType='slide' defaultStageHidden={true} defaultNavbarHidden={true} gallery={list} />
            
        
    )
}