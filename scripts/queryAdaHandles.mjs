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
/**
 * @description Connects to a Redis client, sets up event listeners and timeouts,
 * then subscribes to a 'requestAdaHandle' channel. When an address is received, it
 * retrieves an ADA handle from the IPFS gateway and publishes the result on a
 * 'newAdaHandle' channel if successful.
 */
async function doIt() {
    
    const redisClient = await redis.getClient();
    libcip.init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    const client = redisClient.duplicate();
    
    libcip.setGetTimeout(200000000);
    
    
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
        console.log('Redis ready');

        client.subscribe('requestAdaHandle', (address) => {
            // Subscribes and processes Ada handles from requests.
            try { 
                console.log(address);
                libcip.getAdaHandleFromAddress(address).then((handle) => { 
                    // Publishes new Ada Handle to Redis and logs it.
                    if (handle) { 
                        redisClient.publish('newAdaHandle',JSON.stringify({address, handle}));
                        console.log('got new ada handle: '+handle)
                    }
                })
             
            } catch (e) { 
                console.log('Failed to get ada handle for address: '+address+', error was: '+e)
            }
        });
    
    return;    
}
doIt();

