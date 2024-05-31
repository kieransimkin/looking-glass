

import { useRouter } from "next/router";
import { useEffect } from "react";
import { getData} from '../utils/Api'
import { CircularProgress } from "@material-ui/core";
import punycode from 'punycode'
import { validatePolicyID, asciiToHex } from "../utils/Helpers.mjs";
import { validAddress as validAddressS } from "../utils/CSL"
import { validAddress as validAddressB } from "../utils/CSLBrowser"
import { getWallet } from "../utils/database.mjs";
import { getStakeFromAny } from "../utils/CSLBrowser";
// Generates `/posts/1` and `/posts/2`
/**
 * @description Joins two string paths using the `__dirname` object and returns the
 * result.
 * 
 * @param { string } relativePath - path to be resolved relative to the current
 * directory, and the `calcPath()` function returns the resolved path by joining the
 * current directory with the relative path.
 * 
 * @returns { string } a full file path based on the given relative path.
 */
function calcPath(relativePath) {
    const path = require('path');
    return path.join(__dirname, relativePath);
  }

/**
 * @description Reads a file located at a specific path, validates its contents based
 * on various criteria, and redirects to different URLs based on the file's content.
 * It also sets properties for further processing.
 * 
 * @param { unknown, as there is no information provided about its possible values
 * or structure within the function implementation. } context - search query of the
 * user and provides the file name to be read through the `fs` module.
 * 
 * 		- `query`: An object containing the search query provided in the URL.
 * 		- `params`: An object containing any query string parameters.
 * 		- `pathname`: The current URL path.
 * 		- `search`: The search query provided in the URL.
 * 		- `hash`: The value of the hash part of the URL.
 * 		- `href`: The full URL of the current page, including protocol, host, and path.
 * 
 * 	Inside the function, the following code is executed:
 * 
 * 		- `fs.readFileSync(calcPath('../../../public/'+filename))`: Reads the file at
 * the specified path synchronously.
 * 		- `data.toString()`: Converts the file contents to a string.
 * 		- `console.log('TODO need to add static file serving')`: Logs a message indicating
 * that static file serving needs to be implemented.
 * 		- `if ((data=fs.readFileSync(calcPath('../../../public/'+filename)))) { ... }`:
 * Executes the code inside the `if` block if the file exists at the specified path.
 * 		- `if (validAddressS(filename)) { ... }`: Executes the code inside the `if` block
 * if the file address is valid.
 * 		- `if (validatePolicyID(filename)) { ... }`: Executes the code inside the `if`
 * block if the file policy ID is valid.
 * 		- `if (filename.substring(0,1)=='$') { ... }`: Executes the code inside the `if`
 * block if the first character of the filename is a dollar sign.
 * 
 * 	Finally, an object with a single property `props` containing the `filename` value
 * is returned.
 * 
 * @returns { object } a set of props that include the file name.
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
 * @description Uses router hooks to navigate to relevant pages based on search query
 * parameters, including policy IDs and token holders' addresses. It fetches data
 * from API endpoints and updates the user interface with loading indicators.
 * 
 * @param { object } params - filename that initiates the search process and is used
 * to extract the file's extension, which is then used to determine the appropriate
 * route to push the user to.
 * 
 * @returns { HTMLDivElement } a loading indicator and a message indicating that the
 * function is busy fetching data.
 * 
 * 		- `div`: A div element with absolute positioning, left alignment, and transform
 * to center the content.
 * 		- `h1`: An h1 heading with the text "Loading...".
 * 		- `<CircularProgress>`: An instance of the CircularProgress component, which is
 * a React component for showing a loading spinner.
 * 
 * 	The properties of the output are:
 * 
 * 		- The div element has a style property of `textAlign: 'center'` and `position:
 * 'absolute'`, indicating that the content should be aligned in the center of its
 * parent element and positioned relative to the viewport.
 * 		- The div element also has a left property of `-50%`, which positions the content
 * 50% to the left of its parent element.
 * 		- The transform property is set to `translateX(-50%)`, which further positions
 * the content 50% to the right of its own width.
 * 		- The h1 heading has the text "Loading...".
 * 		- The `<CircularProgress>` component is an instance of the CircularProgress
 * component, which is a React component for showing a loading spinner.
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
                a.json().then((j) => { 
                    if (j.length && j[0]?.address) { 
                        getWallet(getStakeFromAny(j[0].address)).then((w) => { 
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