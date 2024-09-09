import { getMetadata, getSmartImports, hexToAscii } from "libcip54"
import { checkCacheItem, cacheItem } from "./redis.mjs";
import { getDataURL } from "./DataStore";
export const getTokenData = async function (token, throwOnCacheMiss=false) { 
    
    let tokenData = await checkCacheItem('getTokenData:'+token.unit);
    if (!tokenData) {
        if (throwOnCacheMiss) { 
            return null;
        }
        tokenData={id: token.unit, unit:token.unit, quantity: token.quantity, title:''};
        tokenData.metadata=await getMetadata(token.unit);
        tokenData.title = tokenData.metadata?.name;
        if (tokenData.metadata?.title) { 
            tokenData.title = tokenData.metadata?.title;
        }
        if (!tokenData.title || tokenData.title.length<1) { 
            tokenData.title=hexToAscii(token.unit.slice(56))
        }
        const thumbName = 'tokenThumb:'+token.unit+':500:dark';
        let thumbURL;
        if ((thumbURL = getDataURL(thumbName,'jpg'))) {
            tokenData.thumb = thumbURL;
            if (!(await checkCacheItem('policyProfile:'+token.unit.substring(0,56))) && token.unit.length>56) cacheItem('policyProfile:'+token.unit.substring(0,56), token.unit);
        } else { 
            tokenData.thumb = '/api/getTokenThumb?unit='+token.unit;
        }
        const tinyName = 'tokenThumb:'+token.unit+':64:dark';
        let tinyURL;
        if ((tinyURL = getDataURL(tinyName,'jpg'))) {
            tokenData.tiny = tinyURL;
        } else { 
            tokenData.tiny = '/api/getTokenThumb?unit='+token.unit+'&size=64';
        }
        
        tokenData.full = '/api/getTokenFull?unit='+token.unit;
        tokenData.video = '/api/getTokenVideo?unit='+token.unit;
        tokenData.files = token.metadata?.files;
        await cacheItem('getTokenData:'+token.unit,tokenData)
    }
    return tokenData;
}