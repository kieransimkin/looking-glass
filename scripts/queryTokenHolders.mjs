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
import { cacheItem } from '../utils/redis.mjs';
import { getTokenHolders } from 'libcip54';
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

        client.subscribe('requestTokenHolders', (unit) => {
            try { 
                console.log(unit);
       
                // Todo - support paging
                getTokenHolders(unit,0).then((ret)=>{ 
                    if (ret) { 
                        cacheItem('getTokenHolders:'+unit,ret)
                        redisClient.publish('newTokenHolders',JSON.stringify({unit, holders:ret, request:'newTokenHolders'}));
                        console.log('Got token holders for '+unit);
                    }
                });
      
    
             
            } catch (e) { 
                console.log('Failed to get token holders for '+unit+' error was: '+e)
            }
        });
    
    return;    
}
doIt();

