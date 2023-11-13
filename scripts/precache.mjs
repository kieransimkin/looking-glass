import fs from 'fs';
import database from '../utils/database.js'
import dotenv from 'dotenv';
import * as formatter from '../utils/formatter';
import redis from '../utils/redis.js'
import syncClient from "../utils/dbsync.js";
import libcip from "libcip54"
import * as helpers from '../utils/Helpers.js';
dotenv.config()
async function doIt() {
    const redisClient = await redis.getClient();
    //console.log(syncClient.default.query);
    libcip.init('mainnet',syncClient.default, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient)
    const results = await database.default.query(`
    
    select distinct "policyID", encode("policyID",'hex') as policy, "totalActivity" from policy where "totalActivity"!=0 order by "totalActivity" desc
    `,[])
    for (var row of results.rows) { 
        
        const policy = row.policy;
        
        let tokens = await redis.checkCacheItem('getTokensFromPolicy:'+policy);
        if (!tokens) {
            tokens = await libcip.getTokensFromPolicy(policy);
            await database.setPolicyAssetCount(policy, tokens.length)
            await redis.cacheItem('getTokensFromPolicy:'+policy,tokens)
            console.log('Saving cache for row: '+policy)
        }
        let page = 0;
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
        const totalPages = Math.ceil(tokens.length/perPage);
        while (totalPages>page) {
            console.log('Page '+page+' of '+totalPages)
            await doPage(tokens, page);
            page++;
            if (page>100) break;
            
            //sleep(2000);
        }
        
        console.log('Done '+policy)
    }
    await helpers.default.sleep(120000) // two minutes
    console.log('Complete');
    process.exit(0);
    
    return;
    const json = JSON.parse(fileContents)
    
}
doIt();

