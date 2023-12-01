
import { getFeaturedPolicies, setPolicyAssetCount } from "../../utils/database.mjs";
import {getClient, checkCacheItem, incrementCacheItem } from "../../utils/redis.mjs";
import pgClient from "../../utils/dbsync.mjs"
import { init } from "libcip54";

export default async function Browse(req, res) {
    const redisClient = await getClient();
  init(process.env.NETWORK?.toLowerCase(), pgClient,  process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    let {sort,sortOrder, showAll, page} = req.query;
    if (!page) { 
      page=0;
    }
    
    if (typeof showAll == 'undefined' || showAll==="false") { 
      showAll=false;
    }
    console.log(showAll);
    let result = await getFeaturedPolicies(sort,sortOrder, page, showAll?false:true);

    for (const policy of result) { 
      const policyProfile = await checkCacheItem('policyProfile:'+policy.policyID);
      const tokenData = await checkCacheItem('getTokenData:'+policyProfile);
      policy.policyProfile=tokenData;
    }
    


    res.status(200).json(result);
    
}
