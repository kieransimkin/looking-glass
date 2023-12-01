
import { getMetadata, init } from "libcip54"
import pgClient from "../../utils/dbsync"
import {getClient} from "../../utils/redis.mjs"

export default async function Browse(req, res) {
  const redisClient = await getClient();
  init(process.env.NETWORK?.toLowerCase(), pgClient,  process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
  const {unit}=req.body;
  
  const metadata = await getMetadata(unit);
  res.status(200).json(metadata);
}
