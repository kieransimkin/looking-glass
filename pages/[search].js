

import { useRouter } from "next/router";
import { useEffect } from "react";
import { getData} from '../utils/Api'
import { CircularProgress } from "@material-ui/core";
import punycode from 'punycode'
import { validatePolicyID, asciiToHex } from "../utils/Helpers.mjs";
import { validAddress, getStakeFromAny } from "libcip54";
import { getWallet } from "../utils/database.mjs";

// Generates `/posts/1` and `/posts/2`
/**
 * @description Concatenates a provided `relativePath` with the current working
 * directory (`__dirname`) to form an absolute file path using the `path.join` method
 * from the `path` module.
 *
 * @param {string} relativePath - Used as part of constructing an absolute file path.
 *
 * @returns {string} A fully qualified path name resulting from joining the directory
 * name obtained through the `__dirname` variable with the provided relative path.
 */
function calcPath(relativePath) {
    const path = require('path');
    return path.join(__dirname, relativePath);
  }

/**
 * @description Handles server-side rendering for a Next.js application. It redirects
 * requests based on query parameters, checks file existence and validity, and serves
 * static files or redirects to other pages accordingly.
 *
 * @param {object} context - Used to access server-side request context.
 *
 * @returns {any} Either an object containing a property named "redirect" with
 * destination as a string, or an object with a single property named "props".
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
        
    if (validAddress(filename)) { 
        console.log('valid address');
        return {
            redirect: {
                destination: '/wallet/'+filename
            }
        }
    } else if (validatePolicyID(filename)) { 
        return {
            redirect: { 
                destination: '/policy/'+filename
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
 * @description Checks if a search query has been provided, and based on its format,
 * redirects the user to either a wallet page, policy page, or retrieves data from
 * an API and navigates to a corresponding wallet page.
 *
 * @param {object} params - Expected to contain the filename as a property.
 *
 * @returns {JSX.Element} A React element that wraps a div containing an h1 tag and
 * a circular progress indicator.
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
        // Executes when search state changes.

        if (!search) return;     
        console.log(validAddress(search));
        if (validAddress(search)) { 
            console.log('got here');
            router.push({pathname:'/wallet/'+search})
        } else if (validatePolicyID(search))  { 
            router.push({pathname:'/policy/'+search})
        } else if (search.substring(0,1)=='$') { 
            const punycoded = punycode.toASCII(search.substr(1).trim());
            getData('/getTokenHolders?unit=f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'+Buffer.from(punycoded).toString('hex')).then((a)=>{
                // Parses JSON data and navigates to a wallet page if an address exists.

                a.json().then((j) => { 
                    // Processes JSON data to navigate to wallet page.

                    if (j.length && j[0]?.address) { 
                        getWallet(getStakeFromAny(j[0].address)).then((w) => { 
                            // Pushes a route to the router.

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