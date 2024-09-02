import axios from "axios";
import * as libcip54 from "libcip54"
import pgClient from "../../utils/dbsync.mjs";
import {getClient} from "../../utils/redis.mjs";
import { getDataURL, saveData, sendData, saveSend } from "../../utils/DataStore";
import { getCachedTokenThumb } from '../../utils/Helpers.mjs'
import sharp from 'sharp';

/**
 * @description Handles HTTP requests for token thumbnails by checking query parameters,
 * initializing external clients and APIs, and either returning a cached thumbnail
 * or requesting it from an IPFS/Gateway service.
 *
 * @param {any} req - An object representing the HTTP request sent to the server.
 *
 * @param {Response} res - Used to send HTTP responses.
 *
 * @returns {void | undefined} 301 redirect with the location set to a thumbnail URL
 * when thumbUrl is truthy, and an empty string ('Failed') otherwise in case of error.
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
  let thumbUrl;
  if ((thumbUrl = getDataURL(name,mode=='transparent'?'png':'jpg'))) { 
    res.status(301).setHeader('location',thumbUrl);
    return sendData(name, mode=='transparent'?'png':'jpg', res, mode=='transparent'?'image/png':'image/jpg', 301);
  } else { 
    redisClient.publish('requestThumb',JSON.stringify({unit,size,mode, url: req.url}));
    res.status(425).send('Failed')
    return;
  }
  /*
  
  const metadata = await libcip54.getMetadata(unit);
  let result;
  try { 
    
    result = await libcip54.getFile(unit, null, metadata);
  } catch (e) { 
    
    redisClient.publish('requestThumb',JSON.stringify({unit,size,mode, url: req.url}));
    res.status(425).send('Failed')
    
    return;
  }
  if (!result) {
    redisClient.publish('requestThumb',JSON.stringify({unit,size,mode, url: req.url}));
    
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
        */
}
