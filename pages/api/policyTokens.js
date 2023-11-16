import { init, getTokensFromPolicy } from "libcip54"
import pgClient from "../../utils/dbsync";
import {getClient, checkCacheItem, cacheItem} from "../../utils/redis";
import { getTokenData } from "../../utils/formatter";
import { setPolicyAssetCount } from "../../utils/database";
import { getDataURL } from "../../utils/DataStore";
export default async function Browse(req, res) {
    const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    let {policy, page, cachedOnly} = req.query;

    if (!page) page=0;
    page=parseInt(page);
    if (page<0) page = 0;
    const perPage = 10;
    const start = page*perPage;
    const end = (page+1)*perPage;

    let tokens = await checkCacheItem('getTokensFromPolicy:'+policy);
    if (!tokens) {
        if (cachedOnly) return res.status(425).json({message:'Not cached yet'});
        tokens = await getTokensFromPolicy(policy);
        await setPolicyAssetCount(policy, tokens.length);
        await cacheItem('getTokensFromPolicy:'+policy,tokens)
    }
    const totalPages = Math.ceil(tokens.length/perPage);
    tokens = tokens.slice(start, end);
    
    const promises = [];
    for (const token of tokens) { 
        promises.push(getTokenData(token));
    }
    const result = await Promise.all(promises)
    for (const r of result) { 
        const thumbName = 'tokenThumb:'+r.unit+':500:dark';
        let thumbURL;
        if ((thumbURL = getDataURL(thumbName,'jpg'))) {
            r.thumb = thumbURL;
        }
    }
    res.status(200).json({tokens:result, page, start, end, totalPages, perPage });
}