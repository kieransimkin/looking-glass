import { useEffect, useRef, useState } from "react";
import { getData } from "../utils/Api";
import AdaHandle from "./AdaHandle";
export default function OwnerList({unit, lazy}) { 
    const [ownerList, setOwnerList] = useState([]);
    const ref=useRef();
    useEffect(() => { 
        getData('/getTokenHolders?unit='+unit).then((data) => { 
            if (data.status==425) { 
                const messageHandler = (mes) => { 
                    if (mes.data.request=='newOwnerList' && mes.data.unit == unit) { 
                        
                        setOwnerList(mes.data.holders);
                        window.removeEventListener('message',messageHandler);
                    }
                };
                window.addEventListener('message',messageHandler);
            } else { 
                data.json().then((o) => { 
                    
                    setOwnerList(o);
                    
                })
            }
        })
    },[unit]);
    return <ul ref={ref} style={{display: 'inline'}} className="owner-list">{ownerList.map((i) => <li key={i.stake}><AdaHandle stake={i.stake} /> </li>)}</ul>
    
  }
  