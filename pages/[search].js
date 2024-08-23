

import { useRouter } from "next/router";
import { useEffect } from "react";
import { getData} from '../utils/Api'
import { CircularProgress } from "@material-ui/core";
import punycode from 'punycode'
import { validatePolicyID, asciiToHex } from "../utils/Helpers.mjs";
import { validAddress as validAddressS } from "../utils/CSL"
import { validAddress as validAddressB } from "../utils/CSLBrowser.js.old"
import { getWallet } from "../utils/database.mjs";
import { getStakeFromAny } from "../utils/CSLBrowser.js.old";
// Generates `/posts/1` and `/posts/2`
/**
 * @description Joins a provided relative path with the current working directory's
 * absolute path to form an absolute path. It utilizes Node.js's built-in `path`
 * module and `__dirname` variable, which returns the directory name of the current
 * module.
 *
 * @param {string} relativePath - Intended to be used as a relative path.
 *
 * @returns {string} A full path to a file or directory, obtained by joining the
 * current working directory (`__dirname`) with the provided relative path using the
 * `path.join()` method.
 */
function calcPath(relativePath) {
    const path = require('path');
    return path.join(__dirname, relativePath);
  }

/**
 * @description Handles server-side rendering for a React application, processing
 * query parameters to determine whether to serve a static file or redirect to a
 * specific URL based on the input string's format and contents.
 *
 * @param {object} context - Passed from Next.js.
 *
 * @returns {Promise<Record<string, any>>} Either an object with a "redirect" property
 * that contains a destination URL, or an object with a "props" property containing
 * a filename.
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
        
    if (validAddressS(filename)) { 
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
 * @description Handles search input, validating and processing it to redirect the
 * user to corresponding wallet or policy pages. It also fetches token holders' data
 * and updates the route accordingly.
 *
 * @param {any} params - Expected to contain filename data.
 *
 * @returns {ReactNode} A JSX element: `<div> ... </div>` containing an h1 tag and a
 * CircularProgress component.
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
        // Processes search queries.

        if (!search) return;     
        console.log(validAddressB(search));
        if (validAddressB(search)) { 
            console.log('got here');
            router.push({pathname:'/wallet/'+search})
        } else if (validatePolicyID(search))  { 
            router.push({pathname:'/policy/'+search})
        } else if (search.substring(0,1)=='$') { 
            const punycoded = punycode.toASCII(search.substr(1).trim());
            getData('/getTokenHolders?unit=f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'+Buffer.from(punycoded).toString('hex')).then((a)=>{
                // Retrieves wallet information.

                a.json().then((j) => { 
                    // Processes JSON data to redirect to wallet page.

                    if (j.length && j[0]?.address) { 
                        getWallet(getStakeFromAny(j[0].address)).then((w) => { 
                            // Pushes route.

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