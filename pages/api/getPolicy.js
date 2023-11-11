
import { getPolicy, setPolicyAssetCount } from "../../utils/database";
import {getClient, checkCacheItem, incrementCacheItem } from "../../utils/redis";
import pgClient from "../../utils/dbsync"
import { init } from "libcip54";

export default async function Browse(req, res) {
    const redisClient = await getClient();
  init(process.env.NETWORK?.toLowerCase(), pgClient,  process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    let {id} = req.query;
    let result = await getPolicy(id);
    if (!result) return res.status(404).json({'message':'File Not Found'});

    incrementCacheItem('policyHits:'+result.policyID);
    incrementCacheItem('policyRecentHits:'+result.policyID, 3600);
    
    if (!result.assetCount) { 
        let tokens = await checkCacheItem('getTokensFromPolicy:'+result.policyID);
        if (tokens) {
            await setPolicyAssetCount(result.policyID, tokens.length);
        }
    }   
    
    res.status(200).json(result);
    
}
