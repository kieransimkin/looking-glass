import fs from 'fs';
import * as database from '../utils/database.mjs'
import dotenv from 'dotenv';
import * as formatter from '../utils/formatter.js';
import * as redis from '../utils/redis.mjs'

import syncClient from "../utils/dbsync.js";
import libcip from "libcip54"
import * as helpers from '../utils/Helpers.mjs';
dotenv.config()
async function doIt() {
    const redisClient = await redis.getClient();
    //console.log(syncClient.default.query);
    libcip.init('mainnet',syncClient.default, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient)
    console.log('Doing policies');
    const keys = await redisClient.keys("lg:policyLastActive:*");
    console.log(database);
    for (const key of keys) { 
        const policyID = key.substr(20)
        const item = JSON.parse(await redisClient.get(key));
        const p = await database.getPolicy(policyID);
        await database.setPolicyLastMoved(policyID, item)
        await redisClient.del(key);
        console.log('Done '+policyID)
    }
    console.log('Doing wallets');
    const wkeys = await redisClient.keys("lg:walletLastActive:*");
    for (const key of wkeys) { 
        const stake = key.substr(20)
        const item = JSON.parse(await redisClient.get(key));
        const w = await database.getWallet(stake);
        await database.setWalletLastMoved(stake, item)
        await redisClient.del(key);
        console.log('Done '+stake);
    }
    const ckeys = await redisClient.keys("lg:policyCulmativeActive:*");
    for (const key of ckeys) { 
        const policyID = key.substr(25);
        const total = parseInt(await redisClient.get(key));
        const p = await database.getPolicy(policyID);
        await database.incrementPolicyTotalActivity(policyID, total);
        await redisClient.del(key);
        console.log('Activity for '+policyID+': '+total);
    }
    const wckeys = await redisClient.keys("lg:walletCulmativeActive:*");
    for (const key of wckeys) { 
        const stake = key.substr(25)
        const total = parseInt(await redisClient.get(key));
        const w = await database.getWallet(stake);
        await database.incrementWalletTotalActivity(stake,total)
        await redisClient.del(key);
        console.log('Activity for '+stake+': '+total);
    }
    const hkeys = await redisClient.keys("lg:policyHits:*");
    for (const key of hkeys) { 
        const policyID = key.substr(14);
        const total = parseInt(await redisClient.get(key));
        const w = await database.getPolicy(policyID);
        await database.incrementPolicyTotalHits(policyID, total);
        await redisClient.del(key);
        console.log('Hits for '+policyID+': '+total);
    }
    const whkeys = await redisClient.keys("lg:walletHits:*");
    for (const key of whkeys) { 
        const stake = key.substr(14);
        const total = parseInt(await redisClient.get(key));
        const w = await database.getWallet(stake);
        await database.incrementWalletTotalHits(stake, total);
        await redisClient.del(key);
        console.log('Hits for '+stake+': '+total);
    }
    console.log('Complete');
    await helpers.default.sleep(60000) // 1 min

    
    process.exit(0);
    
}
doIt();
