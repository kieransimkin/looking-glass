import fs from 'fs';
import database from '../utils/database.js'
import dotenv from 'dotenv';
import * as formatter from '../utils/formatter.js';
import redis from '../utils/redis.js'
import syncClient from "../utils/dbsync.js";
import libcip from "libcip54"
import sharp from 'sharp';
import * as helpers from '../utils/Helpers.js';
import * as datastore from '../utils/DataStore.js'
dotenv.config()
async function doIt() {
    const redisClient = await redis.getClient();
    //console.log(syncClient.default.query);
    libcip.init('mainnet',syncClient.default, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient)
    const results = await database.default.query(`
    select distinct "policyID", encode("policyID",'hex') as policy, "totalActivity" from policy where "totalActivity"!=0 order by "totalActivity" desc
    `,[])
    let doneTokens = 0;
    let waiting = [];
    for (var row of results.rows) { 
        
        const policy = row.policy;
        
        let tokens = await redis.checkCacheItem('getTokensFromPolicy:'+policy);
        if (!tokens) {
            tokens = await libcip.getTokensFromPolicy(policy);
            
            await database.setPolicyAssetCount(policy, tokens.length)
            await redis.cacheItem('getTokensFromPolicy:'+policy,tokens)
            console.log('Saving cache for row: '+policy)
        }
       if (tokens.length>10000) { 
        continue;
       }
       
       const doPolicy = async (tokens) => {
        for (var token of tokens) { 
            doneTokens++;
            try { 
                const name = 'tokenThumb:'+token.unit+':500:dark';
            
                if (datastore.default.getDataURL(name,'jpg')) { 

                    console.log('Already got a thumb for unit '+token.unit);
                    continue;
                }
                
                let tokenData = await redis.checkCacheItem('getTokenData:'+token.unit);
                if (!tokenData) continue;
                
                
                let result;
                try { 
                    result = await libcip.getFile(token.unit, null, tokenData.metadata)
                } catch (e) { }
                if (!result?.buffer) continue;
                
                
                const img = sharp(Buffer.from(result.buffer));
                const imd = await img.metadata();
                let resizeOpts;
                if (imd.width>imd.height) { 
                resizeOpts = {width:500};
                } else { 
                resizeOpts = {height:500};
                }
                
                datastore.default.saveData(name,'jpg',await (img.resize(resizeOpts).flatten({background:'#040302'}).jpeg({quality: 70, progressive:true, force: true}).toBuffer()));
                
                
                } catch (e) { 
                    console.error(e);
                }
            }
            console.log('Done '+policy)
        }
        waiting.push(doPolicy(tokens));
        if (waiting.length>2999) { 
            console.log('3000 queued, now waiting')
            await Promise.all(waiting);
            waiting = [];
        }
 
    }
    await Promise.all(waiting);
    console.log("Done tokens: "+doneTokens)
    await helpers.default.sleep(120000) // two minutes
    console.log('Complete');
    process.exit(0);
    
    return;
    const json = JSON.parse(fileContents)
    
}
doIt();

