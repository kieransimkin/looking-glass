import crypto from 'crypto';
import fs from 'fs';
import { RESPONSE_LIMIT_DEFAULT } from 'next/dist/server/api-utils';
import path from 'path'

const getDataLocation = (key, type) => { 
    const hash = crypto.createHash('sha512');
    hash.update(key);
    const digest = hash.digest('hex');
    return '/data/'+digest.substring(0,1)+'/'+digest.substring(1,2)+'/'+digest.substring(2,3)+'/'+digest.substring(3,4)+'/'+digest.substring(4,5)+'/'+digest.substring(5)+'.'+type;
}

export const getDataURL = (key, type) => { 
    const loc = getDataLocation(key,type);
    if (fs.existsSync(process.cwd()+loc)) { 
        return encodeURI(loc)
    } else { 
        return null;
    }
}

export const saveData = (key, type, data) => { 
    const loc = getDataLocation(key, type);
    writeFile(key,type,data);
    return encodeURI(loc);
}

export const saveSend = (key, type, data, res, contentType='image/jpg') => { 
    writeFile(key,type,data);
    res.setHeader('Content-type',contentType).status(200).send(data);

}

export const sendData = (key, type, res, contentType='image/jpg') => { 
    const loc = getDataLocation(key, type);
    const data = fs.readFileSync(process.cwd()+loc);
    res.setHeader('Content-type',contentType).status(200).send(data);
}

export const writeFile = (key, type, data) => { 
    const loc = getDataLocation(key,type);
    fs.mkdirSync(process.cwd()+path.dirname(loc),{recursive:true,mode:parseInt('0775',8)});
    fs.writeFileSync(process.cwd()+loc, data, {mode:parseInt('0664',8),flush:true});
}