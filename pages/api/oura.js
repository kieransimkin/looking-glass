import { getClient, clearCacheItem, cacheItem, incrementCacheItem } from "../../utils/redis";
import { getStakeFromAny, init } from "libcip54";
import { getWallet, getPolicy } from "../../utils/database.mjs";

import pgClient from '../../utils/dbsync'
export default async function Browse(req, res) {
    const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
   
    if (req.body.variant == 'Block') { 
        const rClient = await getClient();
        rClient.publish('block',JSON.stringify(req.body));
        console.log(req.body);
    }
     
    if (req.body.variant == 'Mint') { 
        console.log('Token minted: '+req.body.mint.policy+req.body.mint.asset+' quantity: '+req.body.mint.quantity)
        console.error(req.body);
        const policy = await getPolicy(req.body.mint.policy);
        await policy.setLastMinted(Date.now());
        await clearCacheItem('getTokensFromPolicy:'+req.body.mint.policy);
        await clearCacheItem('getTokenData:'+req.body.mint.policy+req.body.mint.asset);
        await cacheItem('refreshTransaction:'+req.body.context.tx_hash,{message: req.body, timestamp: Date.now()})
        await cacheItem('refreshToken:'+req.body.mint.policy+req.body.mint.asset,{message: req.body, timestamp: Date.now()})
        await incrementCacheItem('policyActive:'+req.body.mint.policy);
        await incrementCacheItem('policyCulmativeActive:'+req.body.mint.policy, 3600);
        await redisClient.lPush('lg:policyActiveLog:'+req.body.mint.policy, JSON.stringify(Date.now()))
        const rClient = await getClient();
        rClient.publish('mint',JSON.stringify(req.body));

    }
    if (req.body.variant == 'OutputAsset') { 
        let outputAddress = req.body.context.output_address;
        outputAddress = getStakeFromAny(outputAddress);
        await getWallet(outputAddress);
        await getPolicy(req.body.output_asset.policy); // Todo get rid of these once we've populated the database a bit more
        await incrementCacheItem('walletActive:'+outputAddress, 3600);
        await incrementCacheItem('policyActive:'+req.body.output_asset.policy, 3600);
        await incrementCacheItem('walletCulmativeActive:'+outputAddress);
        await incrementCacheItem('policyCulmativeActive:'+req.body.output_asset.policy);
        await redisClient.lPush('lg:policyActiveLog:'+req.body.output_asset.policy, JSON.stringify(Date.now()))
        await redisClient.lPush('lg:walletActiveLog:'+outputAddress, JSON.stringify(Date.now()))
        await cacheItem('policyLastActive:'+req.body.output_asset.policy,Date.now());
        await cacheItem('walletLastActive:'+outputAddress,Date.now());
        await clearCacheItem('getTokensFromAddress:'+outputAddress);
        await clearCacheItem('getTokenHolders:'+req.body.output_asset.policy+req.body.output_asset.asset);
        await clearCacheItem('getTokenData:'+req.body.output_asset.policy+req.body.output_asset.asset);
        await cacheItem('refreshTransactionInputs:'+req.body.context.tx_hash,{message: req.body, timestamp: Date.now()})
        await cacheItem('refreshWallet:'+outputAddress,{message: req.body, timestamp: Date.now()})
    }
    if (req.body.variant == 'TxInput') { 
        //console.log('Got input hash '+req.body.tx_input.tx_id+' index #'+req.body.tx_input.index )
        
    
    }
    res.status(200).json({ok:'ok'});
}