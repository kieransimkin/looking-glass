import axios from "axios";
import * as libcip54 from "libcip54"
import pgClient from "../../utils/dbsync";
import {getClient} from "../../utils/redis";
import { getDataURL, saveData } from "../../utils/DataStore";
import sharp from 'sharp';

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
  let dataUrl;
  if ((dataUrl = getDataURL(name,mode=='transparent'?'png':'jpg'))) { 
    res.writeHead(302,{'Location':dataUrl});
    return res.end();
  }
  
  const metadata = await libcip54.getMetadata(unit);
  const result = await libcip54.getFile(unit, null, metadata)
  const img = sharp(Buffer.from(result.buffer));
  const imd = await img.metadata();
  let resizeOpts;
  if (imd.width>imd.height) { 
    resizeOpts = {width:size};
  } else { 
    resizeOpts = {height:size};
  }
  if (mode!='transparent') { 
    res.writeHead(302,{'Location':saveData(name,'jpg',await (img.resize(resizeOpts).flatten({background:mode=='dark'?'#000000':'#ffffff'}).jpeg({quality: 70, progressive:true, force: true}).toBuffer()))});
  } else { 
    res.writeHead(302,{'Location':saveData(name,'png',await (img.resize(resizeOpts).png({progressive:true, compressionLevel: 9, palette: true, quality:70, effort: 10, force: true}).toBuffer()))});
  }
  return res.end();
}
