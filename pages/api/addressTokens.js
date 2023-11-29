import { init, getTokensFromAny } from "libcip54"
import pgClient from "../../utils/dbsync";
import {getClient, checkCacheItem, cacheItem} from "../../utils/redis";
import { getTokenData } from "../../utils/formatter";
import { getWallet } from "../../utils/database.mjs";
import { getDataURL } from "../../utils/DataStore";
export default async function Browse(req, res) {
    const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    let {address, page} = req.query;
    

    if (!page) page=0;
    page=parseInt(page);
    if (page<0) page = 0;
    const perPage = 10;
    const start = page*perPage;
    const end = (page+1)*perPage;
    let uncached = false;
    let tokens = await checkCacheItem('getTokensFromAddress:'+address);
    if (!tokens) {
        uncached=true;
        tokens = await getTokensFromAny(address);
        await cacheItem('getTokensFromAddress:'+address,tokens)
    }
    const wallet = await getWallet(address);
    
    const totalPages = Math.ceil(tokens.length/perPage);
    const presliced = tokens;
    tokens = tokens.slice(start, end);
    
    const promises = [];
    for (const token of tokens) {
        const tD = getTokenData(token)
        promises.push(tD);
    }
    
    const result = await Promise.all(promises)
    if (process.env.NODE_ENV=='production') { 
        for (const r of result) { 
            const thumbName = 'tokenThumb:'+r.unit+':500:dark';
            let thumbURL;
            if ((thumbURL = getDataURL(thumbName,'jpg'))) {
                r.thumb = thumbURL;
            }
        }
    }
    if (!wallet.profileUnit && uncached) { 
        wallet.setProfileUnit(presliced);
    }
    res.status(200).json({tokens:result, page, start, end, totalPages, perPage });
}