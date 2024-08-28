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
 * @description Initializes a Redis client, sets up event listeners, and subscribes
 * to a specific topic (`requestAdaHandle`). When messages are received, it parses
 * JSON data, retrieves an ADA handle from an address using the `libcip` library, and
 * publishes the result back to Redis.
 */
async function doIt() {
    
    const redisClient = await redis.getClient();
    libcip.init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    const client = redisClient.duplicate();
    
    libcip.setGetTimeout(200000000);
    
    
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
        console.log('Redis ready');

        client.subscribe('requestAdaHandle', (message) => {
            // Processes new Ada handles.
            try { 
                message=JSON.parse(message);
                libcip.getAdaHandleFromAddress(address).then((handle) => { 
                    // Handles and logs new Ada handle.
                    if (handle) { 
                        redisClient.publish('newAdaHandle',JSON.stringify({address: message.address, handle: handle}));
                        console.log('got new ada handle: '+handle)
                    }
                })
             
            } catch (e) { 
                console.log('Failed to get ada handle for address: '+message.address+', error was: '+e)
            }
        });
    
    return;    
}
doIt();

