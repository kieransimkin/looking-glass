import dotenv from 'dotenv';
dotenv.config()
import {createClient} from 'redis';
let client = null;
export const getClient = async() => { 
    if (!client) { 
        client = await createClient({url: process.env.REDIS_URI})
        .on('error', err => console.log('Redis Client Error', err, process.env.REDIS_URI));
        if (client?.connect && typeof client?.connect == "function" ) { 
            await client.connect();
        }
        
    }
    return client;
}


export const checkCacheItem = async(name) => { 
    await getClient();
    let cache = await client.get('lg:'+name);
    if (!cache) return null;
    cache = JSON.parse(cache);
    return cache;
}

export const cacheItem = async(name, data, ttl=null) => { 
    await getClient();
    if (ttl) { 
        await client.setEx('lg:'+name, ttl ? ttl : 1800, JSON.stringify(data));
    } else { 
        await client.set('lg:'+name, JSON.stringify(data))
    }
}

export const checkCache = async (req, res) => {
    if (req.method != "GET") console.error('checkCache called from non-GET method');
    if (req.headers['x-plutus-recache']) return { cached: false };

    await getClient();
    let cache = await client.get(req.originalUrl);
    if (!cache) return { cached: false };

    cache = JSON.parse(cache);
    cache.cached = true;
    const code = cache.code || 200;
    delete cache.code;
    res.setHeader('X-Plutus-Cache', true).status(code).send(cache)
    return { cached: true, cache }
}

export const cacheResponse = async (req, res, data, options = {}) => {
    if (req.method != "GET") console.error('cacheResponse called from non-GET method');

    await getClient();
    let returnData = {
        success: options.success == false ? false : true,
        data: data,
        code: options.code || 200
    }
    if (options.meta) returnData.meta = options.meta
    await client.setEx(req.originalUrl, options.ttl ? parseInt(options.ttl) : 1800, JSON.stringify(returnData))
    delete returnData.code;
    return res.status(options.code || 200).send(returnData)
}