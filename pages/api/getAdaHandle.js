import { init, getAdaHandleFromAddress } from "libcip54"
import pgClient from "../../utils/dbsync.mjs";
import {getClient} from "../../utils/redis.mjs";

export default async function Browse(req, res) {
  const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    const {address} = req.query;
    

    const ret = await getAdaHandleFromAddress(address);

    res.status(200).json(ret);
}

export const config = {
    api: {
      responseLimit: false,
    },
  }