import { useEffect, useState } from "react";
import { getData } from "../utils/Api";
import { IconButton } from "@material-ui/core";
import {CopyToClipboard} from 'react-copy-to-clipboard';
/**
 * @description Retrieves policy information from a server API, conditional on the
 * existence and matching slug value of the retrieved policy. If the slug matches,
 * it displays a "Policy" title with ID; otherwise, it displays a "Project" title
 * with name and allows copying of the policy ID to clipboard.
 *
 * @param {object} obj - Required. It contains an ID used to identify a policy, which
 * is later used to fetch data about that policy from a server via the `getData` API
 * call.
 *
 * @param {string} obj.policyID - Used to identify a specific policy.
 *
 * @returns {JSX.Element} Either a HTML fragment containing information about a project
 * or a policy, depending on the condition check for `policy.slug`.
 */
export default function PolicyInfo({policyID}) { 
    const [policy, setPolicy] = useState();
    useEffect(()=> { 
        // Fetches and updates policy data.
        getData('/getPolicy?id='+policyID).then(result => { 
            // Processes JSON data.
            result.json().then((o) => { 
            // Sets and logs policy data.
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
  