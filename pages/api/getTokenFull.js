import axios from "axios";
import * as libcip54 from "libcip54"
import pgClient from "../../utils/dbsync.mjs";
import {getClient} from "../../utils/redis.mjs";
import { getDataURL, saveData } from "../../utils/DataStore";
import sharp from 'sharp';

export default async function Browse(req, res) {
  let {unit} = req.query;

  const redisClient = await getClient();
  libcip54.init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);

  const metadata = await libcip54.getMetadata(unit);
  const result = await libcip54.getFile(unit, null, metadata)
  console.log(result);
  res.setHeader('Content-type',result.mediaType);
  res.send(Buffer.from(result.buffer));
  res.status(200);
}
