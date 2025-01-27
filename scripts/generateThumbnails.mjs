import fs from 'fs';
import * as database from '../utils/database.mjs'
import dotenv from 'dotenv';
import * as formatter from '../utils/formatter.js';
import * as redis from '../utils/redis.mjs'
import * as syncClient from "../utils/dbsync.mjs";
import * as libcip from "libcip54"
import sharp from 'sharp';
import pgClient from "../utils/dbsync.mjs";
import * as helpers from '../utils/Helpers.mjs';
import {default as datastore} from '../utils/DataStore.js'
import thumbnailer from '../utils/thumbnailer.js';
const generate=thumbnailer.generate;
dotenv.config()
let donePolicies=0;
async function doIt() {
    
    const redisClient = await redis.getClient();
    libcip.init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    const client = redisClient.duplicate();
    
    libcip.setGetTimeout(200000000);
    
    
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
        console.log('Redis ready');

        client.subscribe('requestThumb', (message) => {
            try { 
                message=JSON.parse(message);
                
                generate(message.unit,message.size,message.mode).then((res) => { 
                    if (res) { 
                        redisClient.publish('newThumb',JSON.stringify({unit: message.unit,size: message.size,mode: message.mode,url:res, originalUrl: message.url}));
                        console.log('got new image: '+res)
                    }
                    
                });
            } catch (e) { 
                console.log('Failed to generate image for '+message.unit+', got error: '+e)
            }
        });
    
    return;
    //console.log(syncClient.default.query);
    libcip.default.init('mainnet',syncClient.default, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient)
    const results = await database.default.query(`
    select distinct "policyID", encode("policyID",'hex') as policy, "totalActivity", "isFeatured", random() from policy where "totalActivity"!=0 order by "isFeatured" desc, random() 
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
        console.log('Doing a policy');
        
        for (var token of tokens) { 
            doneTokens++;
            try { 
                const name = 'tokenThumb:'+token.unit+':500:dark';
            
                if (datastore.getDataURL(name,'jpg')) { 

                    console.log('Already got a thumb for unit '+token.unit);
                    continue;
                }
                
                let tokenData = await redis.checkCacheItem('getTokenData:'+token.unit);
                if (!tokenData) {
                    //console.log('Skipping a token because we don\'t have cache on it');
                    continue;
                } 
                
                
                let result;
                try { 
                    result = await libcip.getFile(token.unit, null, tokenData.metadata)
                } catch (e) { }
                if (!result?.buffer) {
                    console.log('Skipping a token because I failed to get a file for it: '+token.unit);
                    continue;
                }
                
                
                const img = sharp(Buffer.from(result.buffer));
                const imd = await img.metadata();
                let resizeOpts;
                if (imd.width>imd.height) { 
                resizeOpts = {width:500};
                } else { 
                resizeOpts = {height:500};
                }
                
                datastore.saveData(name,'jpg',await (img.resize(resizeOpts).flatten({background:'#040302'}).jpeg({quality: 70, progressive:true, force: true}).toBuffer()));
                
                console.log("File saved: "+name+'.jpg')
                } catch (e) { 
                    console.error(e);
                }
            }
            donePolicies++;
            console.log('Done '+policy)
        }
        waiting.push(doPolicy(tokens));
        
    
        while (waiting.length-donePolicies>60) { 
            console.log((waiting.length-donePolicies)+' queued, now waiting')
        
            await helpers.sleep(60000);
        }
 
    }
    await Promise.all(waiting);
    console.log("Done tokens: "+doneTokens)
    await helpers.sleep(120000) // two minutes
    console.log('Complete');
    process.exit(0);
    
    return;
    const json = JSON.parse(fileContents)
    
}
doIt();

