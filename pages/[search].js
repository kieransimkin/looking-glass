

import { useRouter } from "next/router";
import { useEffect } from "react";
import { getData} from '../utils/Api'
import { CircularProgress } from "@material-ui/core";
import punycode from 'punycode'
import { validatePolicyID, asciiToHex } from "../utils/Helpers.mjs";
import { isValidAddress, getStakeFromAny } from "libcip54";
import { getWallet } from "../utils/database.mjs";

// Generates `/posts/1` and `/posts/2`
/**
 * @description Concatenates a provided `relativePath` with the directory name
 * (`__dirname`) using the `path.join()` method from the `path` module, returning an
 * absolute path as a string.
 *
 * @param {string} relativePath - Used to construct a full path.
 *
 * @returns {string} A complete absolute path derived from the current working directory
 * (`__dirname`) and the provided relative path, separated by a delimiter specified
 * in the operating system.
 */
function calcPath(relativePath) {
    const path = require('path');
    return path.join(__dirname, relativePath);
  }

/**
 * @description Reads a file from the server-side and redirects the request to different
 * routes based on the file name. If the file is not found, it returns an empty props
 * object with the original filename.
 *
 * @param {object} context - Used to access server-side request information.
 *
 * @returns {object} Either a redirect with a destination URL property or an object
 * containing props with filename as a key.
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
        
    if (isValidAddress(filename)) { 
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
 * @description Retrieves a search query from its parameters, extracts file extensions
 * and performs various checks to determine whether the query is a valid wallet
 * address, policy ID or an Ethereum token holder's address. It then navigates the
 * user to the corresponding page accordingly.
 *
 * @param {object} params - Used to pass data for searching.
 *
 * @returns {ReactNode} A JSX element containing an h1 element and a CircularProgress
 * component.
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
        // Handles search bar input validation and redirects user accordingly.

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
                // Processes JSON data and navigates to a wallet page based on the address.

                a.json().then((j) => { 
                    // Handles JSON data and navigates to a wallet page.

                    if (j.length && j[0]?.address) { 
                        getWallet(getStakeFromAny(j[0].address)).then((w) => { 
                            // Navigates to a new route.

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