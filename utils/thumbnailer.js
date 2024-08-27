import axios from "axios";
import * as libcip54 from "libcip54"
import pgClient from "./dbsync.mjs";
import {getClient} from "./redis.mjs";
import { getDataURL, saveData, sendData, saveSend } from "./DataStore";
import { getCachedTokenThumb } from './Helpers.mjs'
import sharp from 'sharp';

export const generate = async (unit,size,mode) => {
    console.log('Generate called for token: '+unit+' '+size+' '+mode);
    const redisClient = getClient();
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
        return false;
      }
      
      const metadata = await libcip54.getMetadata(unit);
      let result;
      try { 
        
        result = await libcip54.getFile(unit, null, metadata);
      } catch (e) { 
        console.log('Error getting thumb for unit: '+unit);
        
        
        return;
      }
      if (!result) {
        return false;
        
      
      }
      let img;
      try { 
        img = sharp(Buffer.from(result.buffer));
      } catch (e) { 
        console.log('Exception while parsing image: '+e);
        return null;
      }
      const imd = await img.metadata();
      let resizeOpts;
      if (imd.width>imd.height) { 
        resizeOpts = {width:size};
      } else { 
        resizeOpts = {height:size};
      }
      try { 
        if (mode!='transparent') { 
              
              return saveData(name,'jpg',await (img.resize(resizeOpts).flatten({background:mode=='dark'?'#040302':'#ffffff'}).jpeg({quality: 70, progressive:true, force: true}).toBuffer()));
            } else { 
          
              return saveData(name,'png',await (img.resize(resizeOpts).png({progressive:true, compressionLevel: 9, palette: true, quality:70, effort: 10, force: true}).toBuffer()),res,'image/png');
              //return res.end();
        }
      } catch (e) { 
        console.log('Exception while generating image: '+e);
        return null;

      }
}

