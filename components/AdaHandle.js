import { useEffect, useState } from "react";
import { getData } from "../utils/Api";
export default function AdaHandle({stake}) { 
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
            <a target="_blank" title={stake} href={"/wallet/"+stake}><span style={{color: 'green'}}>$</span> {handle}</a>
        </>
    } else { 
        return <>
            <a target="_blank" href={"/wallet/"+stake} title={stake}>{stake.substring(0,7)}...{stake.slice(-6)}</a>
        </>
    }
  }
  