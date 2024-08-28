import { useEffect, useRef, useState } from "react";
import { getData } from "../utils/Api";
import AdaHandle from "./AdaHandle";
export default function OwnerList({unit, lazy}) { 
    const [ownerList, setOwnerList] = useState([]);
    const ref=useRef();
    useEffect(() => { 
        getData('/getTokenHolders?unit='+unit).then((data) => { 
            data.json().then((o) => { 
                
                setOwnerList(o);
                
            })
        })
    },[unit]);
    return <ul ref={ref} style={{display: 'inline'}} className="owner-list">{ownerList.map((i) => <li key={i.stake}><AdaHandle stake={i.stake} /> </li>)}</ul>
    
  }
  