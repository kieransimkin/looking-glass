import axios from "axios";
import * as libcip54 from "libcip54"
import pgClient from "./dbsync.mjs";
import {getClient} from "./redis.mjs";
import { getDataURL, saveData, sendData, saveSend } from "./DataStore";
import { getCachedTokenThumb } from './Helpers.mjs'
import sharp from 'sharp';

/**
 * @description Generates a thumbnail for a given unit, size, and mode from a Redis
 * database and saves it as a JPEG or PNG file to a data URL. It handles errors and
 * exceptions while retrieving metadata, parsing images, resizing, and saving the files.
 *
 * @param {string} unit - Referred to as a token.
 *
 * @param {number|string} size - Used to set the image size for resizing.
 *
 * @param {string | 'dark' | 'light' | 'transparent'} mode - Used to specify the image
 * mode for generation.
 *
 * @returns {boolean | null | Buffer} Either `false`, a null value, or a buffer
 * containing the generated image data, depending on whether an error occurred during
 * execution or not.
 */
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
        img = sharp(Buffer.from(result.buffer), {failOn:'none'});
      } catch (e) { 
        console.log('Exception while parsing image: '+e);
        return null;
      }
      let imd;
      try { 
        imd = await img.metadata();
      } catch (e) { 
        console.log('Exception while getting image metadata: '+e);
        return null;
      }
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

