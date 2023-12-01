import axios from "axios";
import * as libcip54 from "libcip54"
import pgClient from "../../utils/dbsync.mjs";
import {getClient} from "../../utils/redis.mjs";

export default async function Browse(req, res) {
  const redisClient = await getClient();
  libcip54.init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
  let {metadata, unit, id} = req.body;
  const result = await libcip54.getFile(unit,id,metadata)
  const blob = new Blob([result.buffer], { type: result.mediaType });
  result.src = await libcip54.getDataURLFromBlob(blob);
  delete result.buffer;
  res.status(200).json(result);
  
  
}
