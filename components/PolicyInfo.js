import { useEffect, useState } from "react";
import { getData } from "../utils/Api";
import { IconButton } from "@material-ui/core";
import {CopyToClipboard} from 'react-copy-to-clipboard';
export default function PolicyInfo({policyID}) { 
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
        return <>
            <b>Policy</b>: <small><a target="_blank" title={policyID} href={"/policy/"+policyID}>{policyID.substring(0,8)}...{policyID.slice(-4)}</a></small><CopyToClipboard text={policyID}><IconButton style={{padding:0}} color="primary" title="Copy to clipboard">⎘</IconButton></CopyToClipboard>
            </>
  
  }
  