import { init, getSmartImports } from "libcip54"
import pgClient from "../../utils/dbsync";
import {getClient} from "../../utils/redis.mjs";
import { checkCacheItem, cacheItem } from "../../utils/redis.mjs";
export default async function Browse(req, res) {
  const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    const {metadata, walletAddr, unit} = req.body;
    const featureTree = metadata?.uses;
    let imports = await checkCacheItem('getSmartImports:'+unit);
    if (!imports) {
        imports = await getSmartImports(featureTree, metadata, walletAddr, unit);    
        await cacheItem('getSmartImports:'+unit,imports)
    }
    
    res.status(200).json(imports);
}

export const config = {
    api: {
      responseLimit: false,
    },
  }