import { useEffect, useState } from "react";
import { getData } from "../utils/Api";
export default function AdaHandle({stake}) { 
    const [handle, setHandle] = useState(null);
    useEffect(() => { 
        if (!handle) { 
            getData('/getAdaHandle?address='+stake).then((h) => { 
                if (h.status==425) { 
                    const messageHandler = (mes) => { 
                        if (mes.data.request=='newAdaHandle' && mes.data.address == stake) { 
                            if (mes.data.handle && mes.data.handle!='') { 
                                setHandle(mes.data.handle);
                            }
                            window.removeEventListener('message',messageHandler);
                        }
                    };
                    window.addEventListener('message',messageHandler)
                } else if (h.status==200) { 
                    h.json().then((j)=> {
                        setHandle(j)
                    })
                }
                
                
            });
        }
    },[stake]);
  
    if (handle) { 
        
        return <>
            <a target="_blank" title={stake} href={"/wallet/"+stake}><span style={{color: 'green'}}>$</span> {handle}</a>
        </>
    } else { 
        return <>
            <a target="_blank" href={"/wallet/"+stake} title={stake}>{stake.substring(0,6)}...{stake.slice(-4)}</a>
        </>
    }
  }
  