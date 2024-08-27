import dotenv from 'dotenv';
import {default as formatter} from '../utils/formatter';
import * as redis from '../utils/redis.mjs'
import * as syncClient from "../utils/dbsync.mjs";
import * as libcip from "libcip54"
import * as helpers from '../utils/Helpers.mjs';
dotenv.config()
async function doIt() {
	
    const redisClient = await redis.getClient();
    libcip.init('mainnet',syncClient.default, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient)

    const keys = await redisClient.keys("lg:refreshWallet:*");
    console.log("Found "+keys.length+" wallets in need of refresh");
    for (const key of keys) { 
        const stake = key.substr(17)
        const item = JSON.parse(await redisClient.get(key));
        await helpers.sleep(50);
        if (item.timestamp<(Date.now()-600000)) { 
            let tokens = await redis.checkCacheItem('getTokensFromAddress:'+stake);
            if (!tokens) {   
                try { 
                tokens = await libcip.getTokensFromAny(stake);
                    console.log('Cached tokens for '+stake)
                    await redis.cacheItem('getTokensFromAddress:'+stake,tokens)
                } catch (e) { 
                    continue;
                }
            }
            const perPage = 10;
            const doPage = async (tokens, page=0) => { 
                
                
                const start = page*perPage;
                const end = (page+1)*perPage;
                tokens = tokens.slice(start, end);
                
                const promises = [];
                for (const token of tokens) { 
                    promises.push(formatter.getTokenData(token));
                }
                
                const result = await Promise.all(promises)
                console.log(result);
            }
            let page =0;
            const totalPages = Math.ceil(tokens.length/perPage);
            
            while (totalPages>page) {
                console.log('Page '+page+' of '+totalPages+" for stake: "+stake)
                await doPage(tokens, page);
                page++;
                //sleep(2000);
                
            }
            console.log('Removing key: '+key);
            await redisClient.del(key);
            
        }
    }
    await helpers.sleep(120000) // two minutes
    console.log('Complete');
    process.exit(0);
    
}
doIt();
