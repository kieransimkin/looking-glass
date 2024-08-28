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
    libcip.init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient,'cip54:',86400);
    const client = redisClient.duplicate();
    
    libcip.setGetTimeout(200000000);
    
    
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
        console.log('Redis ready');

        client.subscribe('requestAdaHandle', (address) => {
            try { 
                console.log(address);
                libcip.getAdaHandleFromAddress(address,true).then((handle) => { 
                    if (handle && handle.length > 0) { 
                        redisClient.publish('newAdaHandle',JSON.stringify({address, handle, request:'newAdaHandle'}));
                        console.log('got new ada handle: '+handle)
                    } else { 
                        redisClient.publish('newAdaHandle',JSON.stringify({address, handle: '', request:'newAdaHandle'}));
                    }
                })
             
            } catch (e) { 
                console.log('Failed to get ada handle for address: '+address+', error was: '+e)
            }
        });
    
    return;    
}
doIt();

