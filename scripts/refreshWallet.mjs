import fs from 'fs';
import database from '../utils/database.js'
import dotenv from 'dotenv';
import * as formatter from '../utils/formatter.js';
import redis from '../utils/redis.js'

import syncClient from "../utils/dbsync.js";
import libcip from "libcip54"
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
dotenv.config()
async function doIt() {
    const redisClient = await redis.getClient();
    //console.log(syncClient.default.query);
    libcip.init('mainnet',syncClient.default, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient)
    const results = await database.default.query(`
    select distinct "policyID", encode("policyID",'hex') as policy from policy
    `,[])
    const keys = await redisClient.keys("lg:refreshWallet:*");
    for (const key of keys) { 
        const stake = key.substr(17)
        const item = JSON.parse(await redisClient.get(key));
        if (item.timestamp<(Date.now()-600000)) { 
            let tokens = await redis.checkCacheItem('getTokensFromAddress:'+stake);
            if (!tokens) {   
                tokens = await libcip.getTokensFromAny(stake);
                console.log('Cached tokens for '+stake)
                await redis.cacheItem('getTokensFromAddress:'+stake,tokens)
            }
            const perPage = 10;
            const doPage = async (tokens, page=0) => { 
                
                
                const start = page*perPage;
                const end = (page+1)*perPage;
                tokens = tokens.slice(start, end);
                
                const promises = [];
                for (const token of tokens) { 
                    promises.push(formatter.default.getTokenData(token));
                }
                
                const result = await Promise.all(promises)
            }
            let page =0;
            const totalPages = Math.ceil(tokens.length/perPage);
            
            while (totalPages>page) {
                console.log('Page '+page+' of '+totalPages)
                await doPage(tokens, page);
                page++;
                //sleep(2000);
            }
            await redisClient.del(key);
            await sleep(2000)
        }
    }
    await sleep(120000) // two minutes
    console.log('Complete');
    process.exit(0);
    
}
doIt();
