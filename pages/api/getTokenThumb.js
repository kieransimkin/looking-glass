import axios from "axios";
import * as libcip54 from "libcip54"
import pgClient from "../../utils/dbsync.mjs";
import {getClient} from "../../utils/redis.mjs";
import { getDataURL, saveData, sendData, saveSend } from "../../utils/DataStore";
import { getCachedTokenThumb } from '../../utils/Helpers.mjs'
import sharp from 'sharp';

/**
 * @description Retrieves and serves a thumbnail image for a given unit based on query
 * parameters such as size, mode (dark/light/transparent), and utilizes Redis, IPFS,
 * and Arweave gateways to fetch the image data. If the image is not available, it
 * publishes a request to Redis to retrieve it.
 *
 * @param {object} req - An HTTP request object.
 *
 * @param {http.IncomingMessage} res - Used to send HTTP response back to client.
 *
 * @returns {void | (Buffer | string)} Either a response object containing an image
 * buffer or sends a failed response with status code 425.
 */
export default async function Browse(req, res) {
  let {unit, size, mode} = req.query;

  const redisClient = await getClient();
  
  libcip54.init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
  libcip54.setGetTimeout(2000);
  if (!size || size==0) { 
    size=500;
  } else { 
    size=parseInt(size);
  }
  if (!mode || (mode!='dark' && mode!='light' && mode!='transparent')) { 
    mode='dark';
  }
  const name = 'tokenThumb:'+unit+':'+size+':'+mode;
  
  if (getDataURL(name,mode=='transparent'?'png':'jpg')) { 
    return sendData(name, mode=='transparent'?'png':'jpg', res, mode=='transparent'?'image/png':'image/jpg');
  }
  
  const metadata = await libcip54.getMetadata(unit);
  let result;
  try { 
    result = await libcip54.getFile(unit, null, metadata);
  } catch (e) { 
    res.status(425).send('Failed')
    return;
  }
  if (!result) {
    redisClient.publish('requestThumb',{unit,size,mode});
    console.log('published redis error');
    res.status(425).send('Failed')
    return;
  }
  const img = sharp(Buffer.from(result.buffer));
  const imd = await img.metadata();
  let resizeOpts;
  if (imd.width>imd.height) { 
    resizeOpts = {width:size};
  } else { 
    resizeOpts = {height:size};
  }
  if (mode!='transparent') { 
        return saveSend(name,'jpg',await (img.resize(resizeOpts).flatten({background:mode=='dark'?'#040302':'#ffffff'}).jpeg({quality: 70, progressive:true, force: true}).toBuffer()),res, 'image/jpg');
      } else { 
    
        return saveSend(name,'png',await (img.resize(resizeOpts).png({progressive:true, compressionLevel: 9, palette: true, quality:70, effort: 10, force: true}).toBuffer()),res,'image/png');
        //return res.end();
  }
}
