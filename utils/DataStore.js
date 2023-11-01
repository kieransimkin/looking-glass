import crypto from 'crypto';
import fs from 'fs';
import path from 'path'
const getDataLocation = (key, type) => { 
    const hash = crypto.createHash('sha512');
    hash.update(key+'.'+type);
    const digest = hash.digest('hex');
    return '/data/'+digest.substring(0,1)+'/'+digest.substring(1,2)+'/'+digest.substring(2,3)+'/'+digest.substring(3,4)+'/'+digest+'.'+type;
}

export const getDataURL = (key, type) => { 
    const loc = getDataLocation(key,type);
    if (fs.existsSync(process.cwd()+'/public'+loc)) { 
        return encodeURI(loc)
    } else { 
        return null;
    }
}
export const saveData = (key, type, data) => { 
    const loc = getDataLocation(key,type);
    fs.mkdirSync(process.cwd()+'/public/'+path.dirname(loc),{recursive:true});
    fs.writeFileSync(process.cwd()+'/public'+loc, data, {mode:755,flush:true});
    return encodeURI(loc);
}