

import {Buffer} from 'buffer';
import validator from 'validator';
const { isIn, isHexadecimal, isSlug } = validator.default;

export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
export function asciiToHex(str) {
  const arr1 = [];
  for (let n = 0, l = str.length; n < l; n++) {
    const hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
}
export function hexToAscii(str1) {
  const hex = str1.toString();
  let str = '';
  for (let n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

export function utf8ToHex(str) {
  const arr1 = [];
	for (const char of str) {
		const codepoint = char.codePointAt(0);

		if (codepoint < 128) {
			arr1.push(codepoint.toString(16));
			continue;
		}
		
		if (codepoint < 2048) {
			const num1 = 0b11000000 | (codepoint >> 6);
			const num2 = 0b10000000 | (codepoint & 0b111111);
			arr1.push(num1.toString(16), num2.toString(16));
      
			continue;
		}
		
		if (codepoint < 65536) {
			const num1 = 0b11100000 | (codepoint >> 12);
			const num2 = 0b10000000 | ((codepoint >> 6) & 0b111111);
			const num3 = 0b10000000 | (codepoint & 0b111111);
			
			arr1.push(num1.toString(16), num2.toString(16), num3.toString(16));
			continue;
		}
		
		const num1 = 0b11110000 | (codepoint >> 18);
		const num2 = 0b10000000 | ((codepoint >> 12) & 0b111111);
		const num3 = 0b10000000 | ((codepoint >> 6) & 0b111111);
		const num4 = 0b10000000 | (codepoint & 0b111111);
		
		arr1.push(num1.toString(16), num2.toString(16), num3.toString(16), num4.toString(16));
    
  
  }
  return arr1.join('');
}

// Policy IDs are always 56 characters hexadecimal string
const validatePolicyID = (val) => { 
  if (val.length!=56) return false;
  return isHexadecimal(val);
}
function unicodeToBase64(str) {
  // First we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1)
    })
  )
}
function base64ToUnicode(str) { 
 // Going backward: from byte-stream to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}
export function hexToUtf8(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
    const byte = parseInt(hex.substr(n,2),16);
    if (!(byte & 0b10000000)) {
			str+= String.fromCodePoint(byte);
			continue;
		}
		
		let codepoint, byteLen;
		
		if (byte >> 5 === 0b110) {
			codepoint = 0b11111 & byte;
			byteLen = 2;
		} else if (byte >> 4 === 0b1110) {
			codepoint = 0b1111 & byte;
			byteLen = 3;
		} else if (byte >> 3 === 0b11110) {
			codepoint = 0b111 & byte;
			byteLen = 4;
		} else {
			// this is invalid UTF-8 or we are in middle of a character
			throw new Error('found invalid UTF-8 byte ' + byte);
		}

		for (let j = 1; j < byteLen; j++) {
			const num = 0b00111111 & parseInt(hex.substr(n + j*2,2),16);
			const shift = 6 * (byteLen - j - 1);
			codepoint |= num << shift;
		}
		
		str+=String.fromCodePoint(codepoint)
    n+=(byteLen-1)*2;
	}
	return str;
 }
 function containsSpecialPolicy(policyList) { 
	if (policyList.includes('d3b65744dd067fd7103cc6a4019cc9cd5f8627b78174c05dc67a9ad6') || 
		policyList.includes('efd8e8b305af8e6d8086d7744bdb84759de0b9c98309048c7485aa2e') || 
		policyList.includes('e5a2bcc51466942a9db1da62471a1b682bde3abcebafee2c7fb1e378') ||
		policyList.includes('781ab7667c5a53956faa09ca2614c4220350f361841a0424448f2f30')) return true;
	return false;
 }
 function ucfirst(str) { 
	const words = str.split(" ");
	return words.map((word) => { 
    	return word[0].toUpperCase() + word.substring(1); 
	}).join(" ");
}
 async function getPOSTBody(req) { 
	// This whole function is a silly hack to parse the POST data from edge functions properly (assuming it is JSON encoded)
	const reader = req.body.getReader();
    let r='';
    let ret='';
	const decoder = new TextDecoder("utf-8");
    while (!(ret = await reader.read()).done) {
		const val = Array.isArray(ret.value) ? decoder.decode(ret.value, {stream: true}) : ret.value;
        r=r + val;   
    }
	r=JSON.parse(r);
	return r;
 }
 function ApiResponse(vars, status) { 
	return new Response(
        JSON.stringify(vars),
    {
      status: status,
      headers: {
        'content-type': 'application/json',
      },
    }
  )
 }
 function dataURItoString(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = decodeURIComponent(dataURI.split(',')[1]);
  
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
  
    // create a view into the buffer
    var ia = new Uint8Array(ab);
  
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    
    return new TextDecoder().decode(ia);
  
  }
const labelIsCIP68 = function(label) {
    if (!label) return false;
    return label == REFERENCE_TOKEN_LABEL || label == USER_TOKEN_LABEL;
}

const getFeatureTree = (f) => { 
  let featureTree = {};
  if (!f) return featureTree;
  for (var c=0; c<f.length; c++) { 
    if (f[c]?.renderer) { 
      // There can be only one renderer
      featureTree.renderer = f[c]?.renderer
    }
    if (f[c]?.mintTx) { 
      featureTree.mintTx = f[c]?.mintTx;
    }
    if (f[c]?.files) { 
      featureTree.files = f[c]?.files;
    }
    if (f[c]?.libraries) { 
      if (!featureTree?.libraries) { 
        featureTree.libraries=[];
      }
      featureTree.libraries.push(f[c].libraries);
    }
    if (f[c]?.tokens) { 
      if (!featureTree?.tokens) { 
        featureTree.tokens=[];
      }
      featureTree.tokens.push(f[c].tokens);
    }
    if (f[c]?.utxos) { 
      if (!featureTree?.utxos) { 
        featureTree.utxos=[];
      }
      featureTree.utxos.push(f[c].utxos);
    }
    if (f[c]?.transactions) { 
      if (!featureTree.transactions) { 
        featureTree.transactions=[];
      }
      featureTree.transactions.push(f[c].transactions);
    }
  }
  return featureTree;
}

export const REFERENCE_TOKEN_LABEL = 100;
export const USER_TOKEN_LABEL = 222;
export const CIP25_LABEL = 721;
export {
  getFeatureTree,
	labelIsCIP68,
	dataURItoString,
	ucfirst,
	ApiResponse,
	getPOSTBody,
	containsSpecialPolicy,
  unicodeToBase64,
  base64ToUnicode,
  validatePolicyID
}