import { init } from "libcip54"
import pgClient from "../../utils/dbsync.mjs";
import {getClient} from "../../utils/redis.mjs";

import { getMetadataStats } from "../../utils/database.mjs";
export default async function Browse(req, res) {
    const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    const stats = await getMetadataStats();
    
    res.status(200).json(stats);
}