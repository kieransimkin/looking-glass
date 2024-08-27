import axios from "axios";
import * as libcip54 from "libcip54"
import pgClient from "./dbsync.mjs";
import {getClient} from "./redis.mjs";
import { getDataURL, saveData, sendData, saveSend } from "./DataStore";
import { getCachedTokenThumb } from './Helpers.mjs'
import sharp from 'sharp';

/**
 * @description Generates a thumbnail for an image unit based on provided parameters
 * (unit, size, and mode). It retrieves metadata from the specified unit, checks if
 * a previously generated thumbnail exists, and then resizes the image to the desired
 * size while applying a background color according to the specified mode.
 *
 * @param {string} unit - Used to identify a specific unit.
 *
 * @param {number|string} size - 500 by default.
 *
 * @param {string | 'dark' | 'light' | 'transparent'} mode - Used to determine the
 * image format based on its value.
 *
 * @returns {boolean | Buffer} Either a false value indicating that the thumbnail
 * generation failed or a buffer containing the generated thumbnail image.
 */
export const generate = async (unit,size,mode) => {
    console.log('Generate called'+unit+size+mode);
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
      const img = sharp(Buffer.from(result.buffer));
      const imd = await img.metadata();
      let resizeOpts;
      if (imd.width>imd.height) { 
        resizeOpts = {width:size};
      } else { 
        resizeOpts = {height:size};
      }
      if (mode!='transparent') { 
            
            return saveData(name,'jpg',await (img.resize(resizeOpts).flatten({background:mode=='dark'?'#040302':'#ffffff'}).jpeg({quality: 70, progressive:true, force: true}).toBuffer()));
          } else { 
        
            return saveData(name,'png',await (img.resize(resizeOpts).png({progressive:true, compressionLevel: 9, palette: true, quality:70, effort: 10, force: true}).toBuffer()),res,'image/png');
            //return res.end();
      }
}

