import { init, getTokensFromAny } from "libcip54"
import pgClient from "../../utils/dbsync";
import {getClient, checkCacheItem, cacheItem} from "../../utils/redis";
import { getTokenData } from "../../utils/formatter";
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

    let tokens = await checkCacheItem('getTokensFromAddress:'+address);
    if (!tokens) {
        tokens = await getTokensFromAny(address);
        await cacheItem('getTokensFromAddress:'+address,tokens)
    }
    
    const totalPages = Math.ceil(tokens.length/perPage);
    tokens = tokens.slice(start, end);
    
    const promises = [];
    for (const token of tokens) { 
        promises.push(getTokenData(token));
    }
    const result = await Promise.all(promises)
    res.status(200).json({tokens:result, page, start, end, totalPages, perPage });
}