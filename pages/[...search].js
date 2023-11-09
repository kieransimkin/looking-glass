

import { useRouter } from "next/router";
import { useEffect } from "react";
import { getData} from '../utils/Api'
import validator from 'validator';
import * as CSL from "@emurgo/cardano-serialization-lib-browser"
const { isIn, isHexadecimal } = validator.default;
import { CircularProgress } from "@material-ui/core";
import punycode from 'punycode'

export function asciiToHex(str) {
    const arr1 = [];
    for (let n = 0, l = str.length; n < l; n++) {
      const hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  }
  
export function validAddress(address) {
    try {
        return CSL.Address.from_bech32(address)
    } catch (e) {
    }

    try {
        return CSL.Address.from_hex(address)
    } catch (e) {
    }

    return
}

// Policy IDs are always 56 characters hexadecimal string
const validatePolicyID = (val) => { 
    if (val.length!=56) return false;
    return isHexadecimal(val);
}
export default function Search(params) {
    
    const router = useRouter();
    let {search} = router.query;  
    useEffect(() => { 
        if (!search) return;
        
        console.log(search);
        console.log(router);
        if (validAddress(search[0])) { 
            router.push({pathname:'/wallet/'+search[0]})
        } else if (validatePolicyID(search[0]))  { 
            router.push({pathname:'/policy/'+search[0]})
        } else if (search[0].substring(0,1)=='$') { 
            //const punycoded = punycode.encode(search[0].substr(1).trim()).trim();
            const punycoded = punycode.toASCII(search[0].substr(1).trim());
            console.log(punycoded);
            getData('/getTokenHolders?unit=f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'+Buffer.from(punycoded).toString('hex')).then((a)=>{
                a.json().then((j) => { 
                    if (j.length && j[0]?.address) { 
                        router.push({pathname:'/wallet/'+j[0].address})
                    }
                    console.log(j);
                });
                

            });
        }
        
    },[search])
    return (<><CircularProgress /></>);
}