import { getClient } from "../../utils/redis";
import { init } from "libcip54";
import pgClient from '../../utils/dbsync'
export default async function Browse(req, res) {
    const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    console.error(req.body);
    res.status(200).json({ok:'ok'});
}