import { init, getAdaHandleFromAddress } from "libcip54"
import pgClient from "../../utils/dbsync.mjs";
import { checkCache } from "../../utils/redis.mjs";
import {getClient} from "../../utils/redis.mjs";

/**
 * @description Retrieves a user's Ada Handle from Redis for the provided address,
 * and if it exists, returns the result as JSON. If not, it publishes a request to
 * Redis and sends a response asking the client to wait.
 *
 * @param {any} req - Used to receive HTTP request data.
 *
 * @param {Response} res - Used for sending HTTP responses to the client.
 */
export default async function Browse(req, res) {
  const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    const {address} = req.query;
    let ret = await redisClient.get('cip54::getAdaHandleFromAddress:'+address);
    
    if (ret) {
      res.status(200).json(JSON.parse(ret));
    } else { 
      redisClient.publish('requestAdaHandle',{address:JSON.stringify({address})});
      res.status(425).send('Please wait');
    }
    
    //ret = await getAdaHandleFromAddress(address);

    
}

export const config = {
    api: {
      responseLimit: false,
    },
  }