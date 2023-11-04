import { init, getSmartImports } from "libcip54"
import pgClient from "../../utils/dbsync";
import {getClient} from "../../utils/redis";

export default async function Browse(req, res) {
  const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    const {metadata, walletAddr, unit} = req.body;
    const featureTree = metadata?.uses;

    const ret = await getSmartImports(featureTree, metadata, walletAddr, unit);

    res.status(200).json(ret);
}

export const config = {
    api: {
      responseLimit: false,
    },
  }