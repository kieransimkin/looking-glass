
import { getWallet } from "../../utils/database.mjs";
import {getClient, incrementCacheItem} from "../../utils/redis";
import pgClient from "../../utils/dbsync"
import { init } from "libcip54";


export default async function Browse(req, res) {
    const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient,  process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    let {id} = req.query;
    let result = await getWallet(id);
    if (!result) {
        res.status(404).json({'message':'File Not Found'})
    }
    await incrementCacheItem('walletHits:'+result.stake);
    await incrementCacheItem('walletRecentHits:'+result.stake, 3600);
    await redisClient.lPush('lg:walletHitLog:'+result.stake, JSON.stringify(Date.now()))
    res.status(200).json(result);
    

}