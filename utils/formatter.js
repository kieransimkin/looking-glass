import { getMetadata, getSmartImports } from "libcip54"
import { checkCacheItem, cacheItem } from "./redis";
export const getTokenData = async function (token) { 
    let tokenData = await checkCacheItem('getTokenData:'+token.unit);
    if (!tokenData) {
        tokenData={unit:token.unit, quantity: token.quantity, title:''};
        tokenData.metadata=await getMetadata(token.unit);
        tokenData.title = tokenData.metadata?.name;
        if (tokenData.metadata?.title) { 
            tokenData.title = tokenData.metadata?.title;
        }
        tokenData.thumb = '/api/getTokenThumb?unit='+token.unit;
        tokenData.tiny = '/api/getTokenThumb?unit='+token.unit+'&size=64';
        tokenData.full = '/api/getTokenFull?unit='+token.unit;
        tokenData.video = '/api/getTokenVideo?unit='+token.unit;
        tokenData.files = token.metadata?.files;
        await cacheItem('getTokenData:'+token.unit,tokenData)
    }
    return tokenData;
}