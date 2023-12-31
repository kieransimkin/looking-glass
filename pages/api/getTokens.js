

import { getTokensFromStake, getStakeFromAny, init } from "libcip54";
import pgClient from "../../utils/dbsync.mjs";
import {getClient} from "../../utils/redis.mjs";

export default async function Browse(req, res) {
  const redisClient = await getClient();
  init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
  let {which, page} = req.body;
  let result={};
  which = getStakeFromAny(which);
  result.tokens = await getTokensFromStake(which,page);
  result.fetchedAt = new Date();
  res.status(200).json(result);
}
