import { init, getUniquePoliciesFromStake } from "libcip54"
import pgClient from "../../utils/dbsync.mjs";
import {getClient, checkCacheItem, cacheItem} from "../../utils/redis.mjs";
export default async function Browse(req, res) {
    const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    let {address} = req.query;
    
    let policies = await checkCacheItem('getUniquePoliciesFromStake:'+address);
    if (!policies) {
        policies = await getUniquePoliciesFromStake(address);
        await cacheItem('getUniquePoliciesFromStake:'+address,policies)
    }
    res.status(200).json(policies);
}