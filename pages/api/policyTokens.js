import { init, getTokensFromPolicy } from "libcip54"
import pgClient from "../../utils/dbsync";
import {getClient, checkCacheItem, cacheItem} from "../../utils/redis";
import { getTokenData } from "../../utils/formatter";
export default async function Browse(req, res) {
    const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    let {policy, page} = req.query;
    

    if (!page) page=0;
    page=parseInt(page);
    if (page<0) page = 0;
    const perPage = 20;
    const start = page*perPage;
    const end = (page+1)*perPage;

    let tokens = await checkCacheItem('getTokensFromPolicy:'+policy);
    if (!tokens) {
        tokens = await getTokensFromPolicy(policy);
        await cacheItem('getTokensFromPolicy:'+policy,tokens)
        console.log('New cache');
    } else { 
        console.log('cached');
    }
    tokens = tokens.slice(start, end);
    
    const promises = [];
    for (const token of tokens) { 
        promises.push(getTokenData(token));
    }
    const result = await Promise.all(promises)
    res.status(200).json({tokens:result, page, start, end });
}