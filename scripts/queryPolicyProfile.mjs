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
import { cacheItem,checkCacheItem } from '../utils/redis.mjs';
import { getTokenHolders, getTokensFromPolicy } from 'libcip54';
const getTokenData = (unit, throwOnCacheMiss, sparse) => formatter.getTokenData(unit,throwOnCacheMiss, sparse)
const generate=thumbnailer.generate;
dotenv.config()


let donePolicies=0;
async function doIt() {
    
    const redisClient = await redis.getClient();
    redisClient.on('error', (err) => console.log('Redis Client Error : ', err));
    libcip.init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
 
    
    
    
    libcip.setGetTimeout(200000000);
       const client = redisClient.duplicate();
       client.on('error', (err) => console.log('Redis subclient Client Error', err));
       await client.connect();
    async function chooseOne(tokens) { 
        for (var c=0; c<tokens.length;c++) { 
            if (c>100) return null;
            if (tokens[c].unit.length>56) { 
                const tokenData = await getTokenData(tokens[c]);
                if (tokenData?.metadata?.image) { 
                    return tokenData;
                    
                }
            }
        }
        return null;
    }
    async function setProfile(policy, tokens) {
        
        const token = await chooseOne(tokens);
        
        if (!token) { 
            return;
        }
        console.log('Chose token: '+token.unit);
        await database.setPolicyProfileUnit(policy, token.unit);
        await cacheItem('policyProfile:'+policy, token.unit);
        
        redisClient.publish('newPolicyProfile',JSON.stringify({request:'newPolicyProfile',policy,token}));
        
    }
    
    
    

        console.log('Redis ready');

        client.subscribe('requestPolicyProfile', (policy) => {
            if (!policy) return;
            
            checkCacheItem('getTokensFromPolicy:'+policy).then((tokens)=>{
                if (!tokens) {
                    console.log('Looking up token list from dbsync');
                    
                    getTokensFromPolicy(policy).then((dbtokens)=> { 
                        cacheItem('getTokensFromPolicy:'+policy,dbtokens);
                        database.setPolicyAssetCount(policy, dbtokens.length);
                        setProfile(policy, dbtokens);
                    });
                    
                } else { 
                    setProfile(policy,tokens);
                }
            });
            
        });
    
    return;    
}
await doIt();

