import { init, getAdaHandleFromAddress } from "libcip54"
import pgClient from "../../utils/dbsync.mjs";
import { checkCache } from "../../utils/redis.mjs";
import {getClient} from "../../utils/redis.mjs";

/**
 * @description Retrieves a user's Ada handle from Redis and returns it as JSON if
 * available. If not, it requests the handle through Redis publishing and responds
 * with a "Please wait" message until the handle is retrieved.
 *
 * @param {Request} req - Used to hold request data.
 *
 * @param {Response} res - Used to send HTTP responses back to the client.
 */
export default async function Browse(req, res) {
  const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    const {address} = req.query;
    let ret = await redisClient.get('cip54::getAdaHandleFromAddress:'+address);
    
    if (ret) {
      res.status(200).json(JSON.parse(ret));
    } else { 
      redisClient.publish('requestAdaHandle',address);
      res.status(425).send('Please wait');
    }
    
    //ret = await getAdaHandleFromAddress(address);

    
}

export const config = {
    api: {
      responseLimit: false,
    },
  }