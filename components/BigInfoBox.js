import * as JsonTree from 'json-tree-viewer'
import { useTheme } from '@material-ui/core';
import { getData, postData } from '../utils/Api';
import AdaHandle from './AdaHandle';
import TokenRoundall from '../components/TokenRoundall';
import { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {tokenPortal} from '../utils/tokenPortal';
import PolicyInfo from './PolicyInfo';
import { red } from '@material-ui/core/colors';
import IconRoundall from './IconRoundall';

const useStyles = makeStyles(theme => { 
    let bgi = '';
    if (theme.palette.type=='dark') { 
      bgi='';
    }
    return {
      root: {
        borderRadius: '2em !important',
        transition: 'all 0.8s ease',
        filter: 'drop-shadow(9px 5px 8px rgba(0,0,0,0.25))',
        
        
        width: '100%'
      },


      'mediaslideCloseIcon': {
        outline:'1px solid rgba(240,200,100,1.0)',
backgroundColor:'rgba(255,200,60,1),',

position:'absolute', right: 0, top: '9vh',
borderRadius:'16px',
cursor: 'pointer',
zIndex:'20000',
width:'32px',
height:'32px',
transition:'opacity 2s, box-shadow 1s',
'&:hover':{
    boxShadow:'inset 1px 1px 5px 2px rgba(247,154,27,0.6)',
    transition:'opacity: 1s, box-shadow 0.1s'
}





      },
      'mediaslideBottomCloseIcon': {
        outline:'1px solid rgba(240,200,100,1.0)',
backgroundColor:'rgba(255,200,60,1),',
position:'absolute', right: 0, top: '89vh',
borderRadius:'16px',
zIndex:'20000',
cursor: 'pointer',
width:'32px',
height:'32px',
transition:'opacity 2s, box-shadow 1s',
'&:hover':{
    boxShadow:'inset 1px 1px 5px 2px rgba(247,154,27,0.6)',
    transition:'opacity: 1s, box-shadow 0.1s'
},
'mediaslideTransportFullscreen': { 
    backgroundImage: 'url(`data:image/svg+xml,<%3Fxml version="1.0" encoding="utf-8"%3F><!-- Generator: Adobe Illustrator 21.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M94.6,55.6l31.9-31.9c2.3-2.3,2.3-6,0-8.2c-0.9-0.9-2.1-1.5-3.4-1.7L6.6,0C2.9-0.4-0.3,2.7,0.1,6.5L13.9,123c0.6,4.8,6.5,6.8,9.9,3.4l31.8-31.8l97.2,97.1c2.3,2.3,6,2.3,8.2,0l30.8-30.8c2.3-2.3,2.3-6,0-8.2L94.6,55.6z M351,191.8c2.3,2.3,6,2.3,8.2,0l97.2-97.1l31.8,31.8c2.3,2.3,6,2.3,8.2,0c0.9-0.9,1.5-2.1,1.7-3.4L511.9,6.6c0.4-3.7-2.7-6.9-6.5-6.5L388.9,13.9c-4.8,0.6-6.8,6.5-3.4,9.9l31.9,31.9l-97.2,97.1c-2.3,2.3-2.3,5.9,0,8.2L351,191.8z M498.1,389c-0.6-4.8-6.5-6.8-9.9-3.4l-31.8,31.8l-97.2-97.1c-2.3-2.3-5.9-2.3-8.2,0L320.2,351c-2.3,2.3-2.3,5.9,0,8.2l97.2,97.2l-31.9,31.9c-2.3,2.3-2.3,6,0,8.2c0.9,0.9,2.1,1.5,3.4,1.7L505.4,512c3.7,0.4,6.9-2.7,6.5-6.5L498.1,389z M161,320.2c-2.3-2.3-5.9-2.3-8.2,0l-97.2,97.1l-31.8-31.8c-2.3-2.3-6-2.3-8.2,0c-0.9,0.9-1.5,2.1-1.7,3.4L0.1,505.4c-0.4,3.7,2.7,6.9,6.5,6.5l116.5-13.7c4.8-0.6,6.8-6.5,3.4-9.9l-31.9-31.9l97.2-97.1c2.3-2.3,2.3-6,0-8.2L161,320.2z"/></g></svg>`)'
}
      },
      cardContent: { 
        '& a': { 
          '&:hover': { 
        
            transition: `color 0s ease`
          },
          transition: `color 0.8s ease`,
          textDecoration: 'none',
        
        }
      },
    };
  });
export default function BigInfoBox ({item,onClose,goFullscreen}) { 
    const theme = useTheme();
    const styles=useStyles();
    console.log(onClose);
    const [ownerList, setOwnerList] = useState([]);
    const [portalHTML, setPortalHTML] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [portalOpacity, setPortalOpacity] = useState(0);
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [closeIconVisible, setCloseIconVisible] = useState(false);
    const [overlaysVisible, setOverlaysVisible] = useState(false);
    const [metadataContent, setMetadataContent] = useState(<pre>{JSON.stringify(item.metadata,null,'  ')}</pre>)
    const metadataRef = useRef();
    const imgRef = useRef();
    const containerRef = useRef();
    const containerBottomRef = useRef();
    const floatingDiv = useRef();
    const floatingBottomDiv = useRef();
    const floatingBottomHoverDiv = useRef();
    const topButtonDiv = useRef();
    const bottomButtonDiv = useRef();
    const bodyDiv = useRef();
    let fadeTimer = null;
    
    const readyCallback = () => { 
        setPortalOpacity(1);
    }       
    const load = (e) => {
        setTimeout(() => { 
            setHeight(imgRef.current.offsetHeight);
            setWidth(imgRef.current.offsetWidth)
            setLoaded(true);
        },0) 
        
    }
    const mouseOver =(e) => { 
     
        
            
                setCloseIconVisible(true);
        
                
        
        

    }
    const mouseOut = (e) => { 
            console.log()
            setCloseIconVisible(false);
        
    }
    const mouseOverMain = (e) => { 
        setOverlaysVisible(true);
        console.log('overlays on');
    }
    const mouseOutMain = (e) => { 
        console.log('overlays offf');
        setOverlaysVisible(false);
    }
    useEffect(() => { 
            if (floatingBottomHoverDiv.current) { 
                floatingBottomHoverDiv.current.addEventListener("mouseenter",mouseOverMain);
                floatingBottomHoverDiv.current.addEventListener("mouseleave",mouseOutMain);
            }
            if (bodyDiv.current) { 
                bodyDiv.current.addEventListener("mouseenter",mouseOverMain);
                bodyDiv.current.addEventListener("mouseleave",mouseOutMain);
            }
            //window.addEventListener("mousemove",mouseMove);
            if (floatingDiv.current){ 
                floatingDiv.current.addEventListener("mouseenter",mouseOver);
                floatingDiv.current.addEventListener("mouseleave",mouseOut);
            }
            if (topButtonDiv.current) { 
                topButtonDiv.current.addEventListener("mouseenter",mouseOver);
                topButtonDiv.current.addEventListener("mouseleave",mouseOut);
                
            }
            if (bottomButtonDiv.current) { 
                bottomButtonDiv.current.addEventListener("mouseenter",mouseOver);
                bottomButtonDiv.current.addEventListener("mouseleave",mouseOut);
            }
            
            if (floatingBottomDiv.current) { 
                floatingBottomDiv.current.addEventListener("mouseenter",mouseOver);
                floatingBottomDiv.current.addEventListener("mouseleave",mouseOut);
            }
        
        return () => { 

            if (floatingBottomHoverDiv.current) { 
                floatingBottomHoverDiv.current.removeEventListener("mouseenter",mouseOverMain);
                floatingBottomHoverDiv.current.removeEventListener("mouseleave",mouseOutMain);
            }
            if (bodyDiv.current) { 
                bodyDiv.current.removeEventListener("mouseenter",mouseOverMain);
                bodyDiv.current.removeEventListener("mouseleave",mouseOutMain);
            }
            if (floatingDiv.current) { 
                
                floatingDiv.current.removeEventListener("mouseenter",mouseOver);
                floatingDiv.current.removeEventListener("mouseleave",mouseOut);
            }
            if (floatingBottomDiv.current) { 
                                
                floatingBottomDiv.current.removeEventListener("mouseenter",mouseOver);
                floatingBottomDiv.current.removeEventListener("mouseleave",mouseOut);
            }
            if (bottomButtonDiv.current) { 
                bottomButtonDiv.current.removeEventListener("mouseenter",mouseOver);
                bottomButtonDiv.current.removeEventListener("mouseleave",mouseOut);

            }
            if (topButtonDiv.current) { 
                topButtonDiv.current.removeEventListener("mouseenter,",mouseOver);
                topButtonDiv.current.removeEventListener("mouseleave",mouseOut);
            }
            //window.removeEventListener("mousemove",mouseMove);
        }
    },[])
    useEffect(()=> { 
        console.log('new sidebar item');
    },[item])
    useEffect(() => { 
        if (imgRef.current) { 
            if (imgRef.current.complete) { 
                setTimeout(()=>{load();},100);
            } else { 
                imgRef.current.addEventListener('load', load);
            }
        }
        
        setMetadataContent(null)
        const tree = JsonTree.create(item.metadata, metadataRef.current)
        metadataRef.current.querySelectorAll('.jsontree_value_string').forEach((div)=>div.style.color=theme.palette.primary.main)
        metadataRef.current.querySelectorAll('.jsontree_value_number').forEach((div)=>div.style.color='#ff0000')
        metadataRef.current.querySelectorAll('.jsontree_value_boolean').forEach((div)=>div.style.color='#ff0000')
        metadataRef.current.querySelectorAll('.jsontree_value_null').forEach((div)=>div.style.color='#ff0000')
        setOwnerList([])
        setPortalOpacity(0);
        if (loaded) {
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
    const onFullscreen = () => { 
        goFullscreen();
        console.log('on fullscreen');
    }
    // Todo format the initial metadata JSON better for SEO reasons
    return <>
        <div ref={floatingDiv} style={{zIndex: '1000',position: 'absolute',top:'0', right:'0', width:'300px', height:'300px'}}>&nbsp;</div>
        <div ref={containerRef} style={{position:'relative', marginTop: '1em', marginLeft: '1em'}}>
            <div ref={topButtonDiv} onClick={onClose} className={styles['mediaslideCloseIcon']} style={{ opacity:closeIconVisible?'1.0':'0.0'}}>
            <div style={{position:'relative',left:'-0.2em',top:'-0.1em', fontSize:'1.5em' , webkitTransform: 'scaleX(-1)', transform: 'scaleX(-1)'}}>
            ➺
            </div>
            </div>
        </div>

        <div ref={floatingBottomDiv} style={{zIndex: '1000',position: 'absolute',top:'75vh', right:'0', width:'200px', height:'200px'}}>&nbsp;</div>
        <div ref={containerBottomRef} style={{position:'relative', bottom: '8vh', marginLeft: '1.1em'}}>
        <div ref={bottomButtonDiv} onClick={onClose} className={styles['mediaslideBottomCloseIcon']} style={{ opacity:closeIconVisible?'1.0':'0.0'}}>
        <div style={{position:'relative',left:'-0.2em',top:'-0.1em', fontSize:'1.5em' , webkitTransform: 'scaleX(-1)', transform: 'scaleX(-1)'}}>
        ➺
            </div>
            </div>
        </div>
        <div ref={bodyDiv} style={{display:'flex', flexDirection:'column', alignItems: 'center', height:'100%'}}>
    
        <img ref={imgRef} src={item.thumb} style={{maxWidth:'100%', transition: 'none', overflow: 'visible'}} />
        <div style={{position:'relative'}}> 
        <div ref={floatingBottomHoverDiv} onClick={onFullscreen} style={{zIndex: '1000',position: 'absolute',top:'-200px', width:'300px', height:'300px',backgroundColor:'transparent'}}>&nbsp;</div>
        </div>
        <div>
        <TokenRoundall overlaysVisible={overlaysVisible} quantity={item.quantity} />
        </div>
   
        
        <div style={{position: 'absolute', top: '0px', opacity:portalOpacity, transition: portalOpacity==1?'opacity 1s':""}}>
        {portalHTML}
        </div>
        <div onClick={onClose} style={{position:'relative',top:'-80px', right:'0px', height:'0px', width:'100%'}}>
        <div style={{position:'absolute', right:'5em', top:'-2em', zIndex:2000000}}>
        <IconRoundall onClick={onFullscreen} overlaysVisible={overlaysVisible}>
            <img style={{position:'relative',left:'7px', top:'4px'}} width="59" height="59" src='data:image/svg+xml,<%3Fxml version="1.0" encoding="utf-8"%3F><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><svg version="1.1" id="svg2" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns%23" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns%23" xmlns:svg="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" sodipodi:docname="fullscreen.svg" inkscape:version="0.48.4 r9939" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200" xml:space="preserve"><sodipodi:namedview inkscape:cy="445.30147" inkscape:cx="453.66298" inkscape:zoom="0.37249375" showgrid="false" id="namedview30" guidetolerance="10" gridtolerance="10" objecttolerance="10" borderopacity="1" bordercolor="%23666666" pagecolor="%23ffffff" inkscape:current-layer="svg2" inkscape:window-maximized="1" inkscape:window-y="24" inkscape:window-height="876" inkscape:window-width="1535" inkscape:pageshadow="2" inkscape:pageopacity="0" inkscape:window-x="65"></sodipodi:namedview><path id="path9678" inkscape:connector-curvature="0" d="M0,0v413.818l144.141-145.386L475.708,600L143.555,932.153L0,789.844V1200h413.818l-145.386-144.141L600,724.292l332.153,332.153L789.844,1200H1200V786.182l-144.141,145.386L724.292,600l332.153-332.153L1200,410.156V0H786.182l145.386,144.141L600,475.708L267.847,143.555L410.156,0H0z"/></svg>' />
            </IconRoundall>
        </div>
        </div>
        <h1 style={{wordBreak: 'break-word', display: 'inline-block', marginLeft:'0.4em', marginBlock: 0}}>{item.title}</h1>
        
        
        <div style={{position: 'relative', marginBottom: '0.3em', marginTop:'0em', paddingTop:'0em'}}>
        <PolicyInfo policyID={item.unit.substring(0,56)} />
        </div>
        
        <div style={{position: 'relative', marginBottom: '0.5em'}}>
        <ul className="owner-list">{ownerList.map((i) => <li key={i.stake}><AdaHandle stake={i.stake} /> </li>)}</ul>
        </div>
    
        
        <h2 style={{margin:0}}>Metadata:</h2>
        <div ref={metadataRef} style={{width:'100%', overflowX: 'auto', overflowY: 'auto'}} />
        {metadataContent}
        </div>
        </>
}