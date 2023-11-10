
import { getPolicy } from "../../utils/database";
import {getClient} from "../../utils/redis";
import pgClient from "../../utils/dbsync"
import { init } from "libcip54";

export default async function Browse(req, res) {
    const redisClient = await getClient();
  init(process.env.NETWORK?.toLowerCase(), pgClient,  process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    let {id} = req.query;
    let result = await getPolicy(id);
    if (result) { 
        res.status(200).json(result);
    } else { 
        res.status(404).json({'message':'File Not Found'})
    }
}
