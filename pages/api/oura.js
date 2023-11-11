import { getClient } from "../../utils/redis";
import { init } from "libcip54";
import pgClient from '../../utils/dbsync'
export default async function Browse(req, res) {
    const redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
   
    if (req.body.variant == 'Block') { 
        console.log(req.body);
    }
     
    if (req.body.variant == 'Mint') { 
        console.error(req.body);
    }
    if (req.body.variant == 'OutputAsset') { 
        console.log('Transaction sent Asset '+req.body.output_asset.policy+req.body.output_asset.asset+' to '+req.body.context.output_address);
    }
    if (req.body.variant == 'TxInput') { 
        console.log('Got input hash '+req.body.tx_input.tx_id+' index #'+req.body.tx_input.tx_id )
        
    
    }
    res.status(200).json({ok:'ok'});
}