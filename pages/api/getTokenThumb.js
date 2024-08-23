import axios from "axios";
import * as libcip54 from "libcip54"
import pgClient from "../../utils/dbsync.mjs";
import {getClient} from "../../utils/redis.mjs";
import { getDataURL, saveData, sendData, saveSend } from "../../utils/DataStore";
import { getCachedTokenThumb } from '../../utils/Helpers.mjs'
import sharp from 'sharp';

/**
 * @description Generates a thumbnail of an image based on query parameters unit,
 * size, and mode. It fetches metadata, resizes the image according to the specified
 * size and mode, and returns it as a response in the requested format (jpg or png).
 *
 * @param {any} req - The request object received by an HTTP server.
 *
 * @param {Response} res - Used to send data back to the client.
 *
 * @returns {Promise<void>} Resolved when the operation is completed successfully and
 * rejected if an error occurs.
 */
export default async function Browse(req, res) {
  let {unit, size, mode} = req.query;

  const redisClient = await getClient();
  
  libcip54.init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);

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
