import { init, getTokenHolders } from "libcip54"
import pgClient from "../../utils/dbsync.mjs";
import {getClient} from "../../utils/redis.mjs";
import { checkCacheItem, cacheItem } from "../../utils/redis.mjs";
export default async function Browse(req, res) {
  const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    const {unit, page} = req.query;
    
    let ret = await checkCacheItem('getTokenHolders:'+unit);
    if (!ret) { 
      ret = await getTokenHolders(unit,page);
      await cacheItem('getTokenHolders:'+unit,ret)
    }

    res.status(200).json(ret);
}

export const config = {
    api: {
      responseLimit: false,
    },
  }