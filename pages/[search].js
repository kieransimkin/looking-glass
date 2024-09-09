

import { useRouter } from "next/router";
import { useEffect } from "react";
import { getData} from '../utils/Api'
import { CircularProgress } from "@material-ui/core";
import punycode from 'punycode'
import { validatePolicyID, asciiToHex } from "../utils/Helpers.mjs";
import { getPolicy, getPolicyByID } from "../utils/database.mjs";
import { isValidAddress, getStakeFromAny } from "libcip54";
import { getWallet, getPolicy } from "../utils/database.mjs";

// Generates `/posts/1` and `/posts/2`
function calcPath(relativePath) {
    const path = require('path');
    return path.join(__dirname, relativePath);
  }

export const getServerSideProps = async (context) => { 
    
    const fs = require('fs');
    console.log('hello');
    //console.log(context);
    let filename =  context.query.search;
    console.log(filename);
    
    let data=0;
    try { 
    if ((data=fs.readFileSync(calcPath('../../../public/'+filename)))) {
        data.toString();
        // add something to props to make it serve the static file
        console.log('TODO need to add static file serving');
    }
    } catch (e) { }
    try { 
    
    if (validatePolicyID(filename)) { 
        let policy = null;
        try { 
            policy = await getPolicyByID(filename);
        } catch (e) {}
        if (policy) {
            return {
                redirect: { 
                    destination: '/policy/'+policy.slug
                }
            }
        }
    }
    if (isValidAddress(filename)) { 
        console.log('valid address');
        return {
            redirect: {
                destination: '/wallet/'+filename
            }
        }
        
    } else if (filename.substring(0,1)=='$') { 
        return {
            redirect: { 
                destination: '/wallet/'+encodeURIComponent(filename)
            }
        }
    } else { 
        const wallet = await getWallet(filename);
        if (wallet) { 
            return {
                redirect: {
                    destination: '/wallet/'+wallet.slug
                }
            }   
        }
        const project = await getPolicy(filename);
        if (project) { 
            return {
                redirect: { 
                    destination: '/policy/'+project.slug
                }
            }
        }

    }
    } catch (e) { 
console.log(e);

    }
    
    
    const props = {};
    props.filename = filename;
    return {
        props
    }

};

export default function Search(params) {
    
    const router = useRouter();
    let search = params.filename  
    return;
    let ext;
    if (search) { 
        ext = String(search).substr(-4,4);
    }
    useEffect(() => { 
        if (!search) return;     
        console.log(isValidAddress(search));
        if (isValidAddress(search)) { 
            console.log('got here');
            router.push({pathname:'/wallet/'+search})
        } else if (validatePolicyID(search))  { 
            router.push({pathname:'/policy/'+search})
        } else if (search.substring(0,1)=='$') { 
            const punycoded = punycode.toASCII(search.substr(1).trim());
            getData('/getTokenHolders?unit=f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'+Buffer.from(punycoded).toString('hex')).then((a)=>{
                a.json().then((j) => { 
                    if (j.length && j[0]?.address) { 
                        console.log('Got adahandle search which is being handled in browser')
                        getWallet(getStakeFromAny(j[0].address)).then((w) => { 
                            router.push({pathname:'/wallet/'+w.slug})    
                        })
                        
                    }
                });
            });
        } else { 
            getData('/getWallet?id='+search).then((a) => { 
                a.json().then((j)=>{ 
                    console.log(j);
                    getData('/getWallet?id='+search).then((a) => { 
                        a.json().then((j)=>{ 

                        });
                    });
                });
            });

        }
        
    },[search])
    return <div style={{textAlign:'center', position:'absolute', left:'50%', transform:'translateX(-50%)'}}>

                <h3>Loading...</h3><CircularProgress /> 
                </div>
}