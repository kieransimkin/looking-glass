import fs from 'fs';
import database from '../utils/database.js'
import dotenv from 'dotenv';
import redis from '../utils/redis.js'
import syncClient from "../utils/dbsync.js";
import libcip from "libcip54"
dotenv.config()
async function doIt() {
    const redisClient = await redis.getClient();
    console.log(syncClient.default.query);
    libcip.init('mainnet',syncClient.default, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient)
    const results = await database.default.query(`
    select distinct "policyID", encode("policyID",'hex') as policy from policy
    `,[])
    for (var row of results.rows) { 
        console.log(row);
        const policy = row.policy;
        
        let tokens = await redis.checkCacheItem('getTokensFromPolicy:'+policy);
        if (!tokens) {
            tokens = await libcip.getTokensFromPolicy(policy);
            await redis.cacheItem('getTokensFromPolicy:'+policy,tokens)
            console.log('Saving cache for row: '+policy)
        }
        continue;
        const totalPages = Math.ceil(tokens.length/perPage);
        tokens = tokens.slice(start, end);
        
        const promises = [];
        for (const token of tokens) { 
            promises.push(getTokenData(token));
        }
        const result = await Promise.all(promises)
        console.log(results);
    }

    return;
    const json = JSON.parse(fileContents)
    for (var policy in json) { 
        console.log('Doing policy: '+policy)
        
        const existing = await database.getPolicy(policy);
        if (existing) {
            console.log("Existing policy: "+existing.policyID)
            try { 
            await database.default.query(`
            UPDATE policy SET name=$1::TEXT, slug=$2::TEXT WHERE encode("policyID",'hex')=$3::TEXT
            `,[json[policy].title, json[policy].slug, existing.policyID])
            } catch (e) { 
                console.log(e)
            }
            
            console.log('found');
        } else {
            console.log('not found');
        }
    }
}
doIt();