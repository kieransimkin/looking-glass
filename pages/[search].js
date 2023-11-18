

import { useRouter } from "next/router";
import { useEffect } from "react";
import { getData} from '../utils/Api'
import { CircularProgress } from "@material-ui/core";
import punycode from 'punycode'
import { validatePolicyID, asciiToHex } from "../utils/Helpers";
import { validAddress } from "../utils/CSLBrowser"
// Generates `/posts/1` and `/posts/2`
function calcPath(relativePath) {
    const path = require('path');
    return path.join(__dirname, relativePath);
  }
export async function getStaticPaths() {
    const fs = require('fs');
    //fs.readFileSync()
    return {
      paths: [{ params: { search: '$adawhale' } },{params:{ search:'$kieran' } }],
      fallback: true, // can also be true or 'blocking'
    }
  }

export const getStaticProps = async (context) => { 
    const fs = require('fs');
    
    console.log(context);
    let filename =  context.params.search;
    console.log(filename);
    let data=0;
    if ((data=fs.readFileSync(calcPath('../../../public/'+filename)))) {

    }
    
    
    
    const segs = wallet.split('.');
    let token = segs.length>1?segs[segs.length-1]:null;
    const props = {};
    if (token) { 
        wallet = wallet.substr(0,wallet.length-(token.length+1));
    }
    let result = await getWallet(wallet);
    return {
        props
    }

};

export default function Search(params) {
    
    const router = useRouter();
    let {search} = router.query;  
    let ext;
    if (search) { 
        ext = String(search).substr(-4,4);
    }
    console.log(ext);
    if (ext=='.jpg') { 
        return fs.readFileSync('public/'+search);    
    }
    console.log(search);
    useEffect(() => { 
        if (!search) return;     
        if (validAddress(search[0])) { 
            router.push({pathname:'/wallet/'+search[0]})
        } else if (validatePolicyID(search[0]))  { 
            router.push({pathname:'/policy/'+search[0]})
        } else if (search[0].substring(0,1)=='$') { 
            const punycoded = punycode.toASCII(search[0].substr(1).trim());
            getData('/getTokenHolders?unit=f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'+Buffer.from(punycoded).toString('hex')).then((a)=>{
                a.json().then((j) => { 
                    if (j.length && j[0]?.address) { 
                        router.push({pathname:'/wallet/'+j[0].address})
                    }
                });
            });
        }
        
    },[search])
    return <div style={{textAlign:'center', position:'absolute', left:'50%', transform:'translateX(-50%)'}}>

                <h1>Loading...</h1><CircularProgress /> 
                </div>
}