import { getClient, clearCacheItem, cacheItem } from "../../utils/redis";
import { getStakeFromAny, init } from "libcip54";
import { getWallet, getPolicy } from "../../utils/database";

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
        await getPolicy(req.body.mint.policy);
        await clearCacheItem('getTokensFromPolicy:'+req.body.mint.policy);
        await clearCacheItem('getTokenData:'+req.body.mint.policy+req.body.mint.asset);
        console.log('getTokensFromPolicy:'+req.body.mint.policy)
        console.log('getTokenData:'+req.body.mint.policy+req.body.mint.asset)
        const rClient = await getClient();
        rClient.publish('mint',JSON.stringify(req.body));

    }
    if (req.body.variant == 'OutputAsset') { 
        console.log('Transaction sent Asset '+req.body.output_asset.policy+req.body.output_asset.asset+' to '+req.body.context.output_address);
        let outputAddress = req.body.context.output_address;
        outputAddress = getStakeFromAny(outputAddress);
        await getWallet(outputAddress);
        await getPolicy(req.body.output_asset.policy);
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