import { getMetadata, getSmartImports } from "libcip54"
import { checkCacheItem, cacheItem } from "./redis";
import { getDataURL } from "./DataStore";
export const getTokenData = async function (token, throwOnCacheMiss=false) { 
    if (!(await checkCacheItem('policyProfile:'+token.unit.substring(0,56))) && token.unit.length>56) cacheItem('policyProfile:'+token.unit.substring(0,56), token.unit);
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
        
        const thumbName = 'tokenThumb:'+token.unit+':500:dark';
        let thumbURL;
        if ((thumbURL = getDataURL(thumbName,'jpg'))) {
            tokenData.thumb = thumbURL;
        } else { 
            tokenData.thumb = '/api/getTokenThumb?unit='+token.unit;
        }
        tokenData.tiny = '/api/getTokenThumb?unit='+token.unit+'&size=64';
        tokenData.full = '/api/getTokenFull?unit='+token.unit;
        tokenData.video = '/api/getTokenVideo?unit='+token.unit;
        tokenData.files = token.metadata?.files;
        await cacheItem('getTokenData:'+token.unit,tokenData)
    }
    return tokenData;
}