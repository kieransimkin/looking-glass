import humanNumber from 'human-number'
import { makeStyles } from '@material-ui/styles';
import { useEffect, useRef } from 'react';
let colour = 'rgba(60,20,10)';
const useStyles = makeStyles(theme => { 
    let bgi;
    if (theme.palette.type=='dark') { 
        bgi = ' linear-gradient(22deg, rgba(36,0,0,1) 0%, rgba(203,36,0,0.7) 42%, rgba(255,232,48,0.8) 65%, rgba(84,2,2,0) 100%),url(/fibres-texture3.jpg);';
    } else { 
         bgi = 'linear-gradient(190deg, rgba(255, 255, 255, 0.2) 33%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 100%), linear-gradient(38deg, rgba(247, 154, 27, 1) 20%, rgba(200, 80, 192, 0.5) 50%, rgba(255, 204, 112, 0.5) 80%),url(/fibres-texture3.jpg) ';
    }
    
    return {
      root: {
        borderRadius: '2em !important',
        transition: 'all 0.8s ease',
        filter: 'drop-shadow(9px 5px 8px rgba(0,0,0,0.25))',
        
        
        width: '100%'
      },
      container: { 
        boxShadow: '1px 2px 5px 1px rgba(0,0,0,0.5)', 
        outline:'1px solid rgba(0,0,0,0.5)', 
        width: '100%',
        zIndex: 200000, 
        top: 0, right: 0, 
        marginTop: '0.4em', marginLeft: '0.5em', marginBottom: 0,
        float: 'right',
        textAlign: 'center',
        borderRadius: '2.5em',
        width:'5em',height:'5em', 
        backgroundImage: bgi,
        
        
        backdropFilter: 'invert(2)',
        backgroundSize: 'contain',
        display: 'inline-block',
        transition:'opacity 1s, transform 1s',
        cursor: 'pointer',
        '&:hover':{
            opacity:'0.9',
            transform:'rotate(45deg)'
        }
      },
      inner: { 
        textShadow:'3px 3px 2px rgb(0,0,0), 0px 0px 3px rgb(0,0,0,1)', 
        marginBlockStart:0, marginBlockEnd: 0, 
        top:'50%', 
        transform: 'translateY(-50%)', 
        position:'relative',
        opacity:'0.9'
      }
    };
});
export default function IconRoundall({icon,onClick,children,overlaysVisible}) { 
    let styles=useStyles();
    
    let containerRef = useRef();
    let margin = '1em';
  
    const doOnClick = () => { 
        console.log(onClick)
        onClick();
        
    }
    const mouseOver = (e) => { 
        if (containerRef.current) { 
            containerRef.current.style.opacity='0.9';
        }
    }
    const mouseOut = (e) => { 
        if (containerRef.current) { 
            containerRef.current.style.opacity='0'
        }
    }
    useEffect(() => { 
        if (containerRef.current) { 
            containerRef.current.addEventListener('mouseenter', mouseOver);
            containerRef.current.addEventListener('mousemove', mouseOver)
            containerRef.current.addEventListener('mouseleave', mouseOut);

            
        }
        return () => { 
            if (containerRef.current) { 
                containerRef.current.removeEventListener('mouseenter',mouseOver);
                containerRef.current.removeEventListener('mousemove',mouseOver);
                containerRef.current.removeEventListener('mouseleave',mouseOut);

            }
        }
    },[])
    return <div ref={containerRef} onClick={doOnClick} className={styles.container} style={{ opacity:overlaysVisible?'0.4':'0.0' }}>
    <div onClick={doOnClick} className={styles.inner}>{children}
Hi
    </div>
    </div>
}