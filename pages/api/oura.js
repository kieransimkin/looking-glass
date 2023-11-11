import { getClient, clearCacheItem } from "../../utils/redis";
import { init } from "libcip54";
import pgClient from '../../utils/dbsync'
export default async function Browse(req, res) {
    const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
   
    if (req.body.variant == 'Block') { 
        console.log(req.body);
    }
     
    if (req.body.variant == 'Mint') { 
        console.log('Token minted: '+req.body.mint.policy+req.body.mint.asset+' quantity: '+req.body.mint.quantity)
        console.error(req.body);
        await clearCacheItem('getTokensFromPolicy:'+req.body.mint.policy)
    }
    if (req.body.variant == 'OutputAsset') { 
        console.log('Transaction sent Asset '+req.body.output_asset.policy+req.body.output_asset.asset+' to '+req.body.context.output_address);
        console.log(req.body);
    }
    if (req.body.variant == 'TxInput') { 
        //console.log('Got input hash '+req.body.tx_input.tx_id+' index #'+req.body.tx_input.index )
        
    
    }
    res.status(200).json({ok:'ok'});
}