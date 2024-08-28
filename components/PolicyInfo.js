import { useEffect, useState } from "react";
import { getData } from "../utils/Api";
import { IconButton } from "@material-ui/core";
import {CopyToClipboard} from 'react-copy-to-clipboard';
export default function PolicyInfo({policyID}) { 
    const [policy, setPolicy] = useState();
    useEffect(()=> { 
        getData('/getPolicy?id='+policyID).then(result => { 
            result.json().then((o) => { 
            setPolicy(o);
            console.log(o);
            });
            
        });
    },[policyID]);
    /*
    const [info, setInfo] = useState(null);
    useEffect(() => { 
        console.log(1);
        
            console.log(2)
            getData('/getPolicy?id='+policyID).then((h) => { 
                h.json().then((j)=> {
                    setInfo(j)
                })
                
                
            });
        
    },[policyID]);
  */    
 if (policy && policy.slug!=policy.policyID) { 
    return <>
    <b>Project</b>: <small><a target="_blank" title={policy.name} href={"/policy/"+policy.slug}><h3>{policy.name}</h3></a></small><CopyToClipboard text={policyID}><IconButton style={{padding:0}} color="primary" title="Copy to clipboard">⎘</IconButton></CopyToClipboard>
    </>
 } else { 
    return <>
            <b>Policy</b>: <small><a target="_blank" title={policyID} href={"/policy/"+policyID}>{policyID.substring(0,6)}...{policyID.slice(-4)}</a></small><CopyToClipboard text={policyID}><IconButton style={{padding:0}} color="primary" title="Copy to clipboard">⎘</IconButton></CopyToClipboard>
            </>
 }
    
  
  }
  