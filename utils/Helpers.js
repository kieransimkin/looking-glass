
var Buffer = require('buffer/').Buffer;

function hexToAscii(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
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
export {
	ucfirst,
	ApiResponse,
    hexToAscii,
	getPOSTBody,
	containsSpecialPolicy
}