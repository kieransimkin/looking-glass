import { init, getTokenHolders } from "libcip54"
import pgClient from "../../utils/dbsync";
import {getClient} from "../../utils/redis";

export default async function Browse(req, res) {
  const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    const {unit, page} = req.query;
    

    const ret = await getTokenHolders(unit,page)

    res.status(200).json(ret);
}

export const config = {
    api: {
      responseLimit: false,
    },
  }