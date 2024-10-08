import { init, getAdaHandleFromAddress } from "libcip54"
import pgClient from "../../utils/dbsync.mjs";
import { checkCache } from "../../utils/redis.mjs";
import {getClient} from "../../utils/redis.mjs";

export default async function Browse(req, res) {
  const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    const {address} = req.query;
    let ret = await redisClient.get('cip54::getAdaHandleFromAddress:'+address);
  
    if (ret && ret.length>0 && JSON.parse(ret)!='') {
      res.status(200).json(JSON.parse(ret));
    } else if (ret) { 
      res.status(204).json(null);
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