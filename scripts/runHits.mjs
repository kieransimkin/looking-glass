import fs from 'fs';
import database from '../utils/database.js'
import dotenv from 'dotenv';
import * as formatter from '../utils/formatter.js';
import redis from '../utils/redis.js'

import syncClient from "../utils/dbsync.js";
import libcip from "libcip54"
import * as helpers from '../utils/Helpers.js';
dotenv.config()
async function doIt() {
    const redisClient = await redis.getClient();
    //console.log(syncClient.default.query);
    libcip.init('mainnet',syncClient.default, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient)
    
    const keys = await redisClient.keys("lg:policyLastActive:*");
    for (const key of keys) { 
        const policyID = key.substr(20)
        const item = JSON.parse(await redisClient.get(key));
        const p = await database.getPolicy(policyID);
        await database.setPolicyLastMoved(policyID, item)
        await redisClient.del(key);
    }
    await helpers.default.sleep(120000) // two minutes
    console.log('Complete');
    process.exit(0);
    
}
doIt();
