
import { getFeaturedPolicies, setPolicyAssetCount } from "../../utils/database";
import {getClient, checkCacheItem, incrementCacheItem } from "../../utils/redis";
import pgClient from "../../utils/dbsync"
import { init } from "libcip54";

export default async function Browse(req, res) {
    const redisClient = await getClient();
  init(process.env.NETWORK?.toLowerCase(), pgClient,  process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    let {sort,sortOrder} = req.query;
    let result = await getFeaturedPolicies(sort,sortOrder);
    


    res.status(200).json(result);
    
}
