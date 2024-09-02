import crypto from 'crypto';
import fs from 'fs';
import { RESPONSE_LIMIT_DEFAULT } from 'next/dist/server/api-utils';
import path from 'path'

/**
 * @description Hashes a given key using SHA-512 and returns a URL path for data
 * storage based on the resulting hash, with each directory level taken from consecutive
 * pairs of characters in the hash digest.
 *
 * @param {string} key - Used to generate a unique path for data storage.
 *
 * @param {string} type - Used to specify file extension.
 *
 * @returns {string} A URL path to a file location formatted as `/data/.../.ext`,
 * where `...` are hexadecimal characters and `.ext` is the provided file extension.
 */
const getDataLocation = (key, type) => { 
    const hash = crypto.createHash('sha512');
    hash.update(key);
    const digest = hash.digest('hex');
    return '/data/'+digest.substring(0,1)+'/'+digest.substring(1,2)+'/'+digest.substring(2,3)+'/'+digest.substring(3,4)+'/'+digest.substring(4,5)+'/'+digest.substring(5)+'.'+type;
}

/**
 * @description Checks for existence of a file at a specified location, determined
 * by the `getDataLocation` function, and returns its encoded URI if found, or `null`
 * otherwise. The location is typically a path relative to the current working directory.
 *
 * @param {string} key - Used to identify data locations.
 *
 * @param {string} type - Unspecified.
 *
 * @returns {string | null} Encoded URI of a file path if it exists, otherwise it
 * returns null.
 */
export const getDataURL = (key, type) => { 
    const loc = getDataLocation(key,type);
    if (fs.existsSync(process.cwd()+loc)) { 
        return encodeURI(loc)
    } else { 
        return null;
    }
}

/**
 * @description Writes specified data to a file based on provided key and type, then
 * returns the location where the data is stored as an encoded URI string. The actual
 * write operation is handled by another function `writeFile`.
 *
 * @param {string} key - Used to identify data for storage.
 *
 * @param {string} type - Not used anywhere directly, suggesting it could be for
 * categorization or identification purposes.
 *
 * @param {any} data - Required to be passed for saving data.
 *
 * @returns {string} Encoded location of the saved data in URI format.
 */
export const saveData = (key, type, data) => { 
    const loc = getDataLocation(key, type);
    writeFile(key,type,data);
    return encodeURI(loc);
}

/**
 * @description Writes a file to disk using `writeFile`, then sets the HTTP response
 * headers and status, sending the data back as a response to the client.
 *
 * @param {string} key - Used to identify data storage location.
 *
 * @param {string} type - Used as an argument for the `writeFile` function.
 *
 * @param {Buffer} data - Used to send data as response.
 *
 * @param {object} res - Used to send HTTP responses.
 *
 * @param {string} contentType - Used to specify the data format sent with the response.
 */
export const saveSend = (key, type, data, res, contentType='image/jpg') => { 
    writeFile(key,type,data);
    res.setHeader('Content-type',contentType).status(200).send(data);

}

/**
 * @description Sends data from a file to a response object, setting headers and
 * status code according to specified parameters. It reads the file from a location
 * determined by the `getDataLocation` function, based on given key and type.
 *
 * @param {string} key - Used for identifying data locations.
 *
 * @param {string} type - Not used in the code. It's likely a leftover or a placeholder.
 *
 * @param {http.ServerResponse} res - Used to send HTTP response data to the client.
 *
 * @param {string} contentType - Used to set the media type of response data.
 *
 * @param {number} status - Used to set HTTP response status code.
 */
export const sendData = (key, type, res, contentType='image/jpg', status=200) => { 
    const loc = getDataLocation(key, type);
    const data = fs.readFileSync(process.cwd()+loc);
    res.setHeader('Content-type',contentType).status(status).send(data);
}

/**
 * @description Synchronously writes data to a file at a specific location on disk,
 * creating any necessary directories and setting their permissions accordingly. It
 * utilizes the `fs` module for file system operations.
 *
 * @param {string} key - Used to identify a file location.
 *
 * @param {string} type - Used to identify file location.
 *
 * @param {string} data - Intended to hold file content.
 */
export const writeFile = (key, type, data) => { 
    const loc = getDataLocation(key,type);
    fs.mkdirSync(process.cwd()+path.dirname(loc),{recursive:true,mode:parseInt('0775',8)});
    fs.writeFileSync(process.cwd()+loc, data, {mode:parseInt('0664',8),flush:true});
}