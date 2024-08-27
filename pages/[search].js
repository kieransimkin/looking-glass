

import { useRouter } from "next/router";
import { useEffect } from "react";
import { getData} from '../utils/Api'
import { CircularProgress } from "@material-ui/core";
import punycode from 'punycode'
import { validatePolicyID, asciiToHex } from "../utils/Helpers.mjs";
import { getPolicyByID } from "../utils/database.mjs";
import { isValidAddress, getStakeFromAny } from "libcip54";
import { getWallet } from "../utils/database.mjs";

// Generates `/posts/1` and `/posts/2`
/**
 * @description Concatenates the current working directory (`__dirname`) with a given
 * relative path using the `path.join` method from the `path` module, returning the
 * resulting absolute path.
 *
 * @param {string} relativePath - Used to specify a relative path.
 *
 * @returns {string} A fully qualified path name, combining the absolute directory
 * (`__dirname`) with the relative path provided.
 */
function calcPath(relativePath) {
    const path = require('path');
    return path.join(__dirname, relativePath);
  }

/**
 * @description Handles server-side rendering for a Next.js application, redirecting
 * to different pages based on query parameters, validating policy IDs and addresses,
 * and serving static files if present.
 *
 * @param {object} context - Used to access server-side request data.
 *
 * @returns {any} Either an object with a property redirect that contains a destination
 * URL for redirection or an object containing props for rendering the page.
 */
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

/**
 * @description Takes a `params.filename` as input and performs various checks on it,
 * redirecting to different routes depending on whether the input is a valid address,
 * policy ID, or meets certain conditions. It also fetches data from an API and updates
 * the URL accordingly.
 *
 * @param {object} params - Expected to contain a property named `filename`.
 *
 * @returns {ReactNode} A JSX element containing a div with center-aligned text, an
 * h1 tag with the text "Loading...", and a CircularProgress component indicating
 * loading activity.
 */
export default function Search(params) {
    
    const router = useRouter();
    let search = params.filename  
    return;
    let ext;
    if (search) { 
        ext = String(search).substr(-4,4);
    }
    useEffect(() => { 
        // Handles search query navigation.

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
                // Processes data from an API and navigates to a wallet page.

                a.json().then((j) => { 
                    // Processes JSON data, navigates to wallet page.

                    if (j.length && j[0]?.address) { 
                        getWallet(getStakeFromAny(j[0].address)).then((w) => { 
                            // Navigates to a specific wallet page.

                            router.push({pathname:'/wallet/'+w.slug})    
                        })
                        
                    }
                });
            });
        }
        
    },[search])
    return <div style={{textAlign:'center', position:'absolute', left:'50%', transform:'translateX(-50%)'}}>

                <h1>Loading...</h1><CircularProgress /> 
                </div>
}