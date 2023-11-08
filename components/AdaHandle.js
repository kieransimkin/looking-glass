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
            <a target="_blank" href={"/wallet/"+stake}><span style={{color: 'green'}}>$</span> {handle}</a>
        </>
    } else { 
        return <>
            {stake.substring(0,7)}...{stake.slice(-6)}
        </>
    }
  }
  