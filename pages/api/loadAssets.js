
import { TransactionUnspentOutput } from "@emurgo/cardano-serialization-lib-nodejs";
import { Buffer } from 'buffer';

export default function Browse(req, res) {
  
  let tokens = {};
  let ada=0;
  const setTokenAmount = (policyID, token, amount) => { 
    let tpolicy=null;
    if (tokens.hasOwnProperty(policyID)) { 
        tpolicy=tokens[policyID];
    } else { 
        tpolicy=tokens[policyID]={};
    }
    if (tpolicy.hasOwnProperty(token)) { 
        tpolicy[token]+=parseInt(amount);
    } else { 
        tpolicy[token]=parseInt(amount);
    }
  }
  for (var c=0; c<req.body.utxos.length; c++) { 
     var output = JSON.parse(TransactionUnspentOutput.from_bytes( Buffer.from(req.body.utxos[c], 'hex')).output().to_json());
     ada+=parseInt(output.amount.coin);
     if (output.amount.multiasset) { 
        var policies = Object.keys(output.amount.multiasset);
        
        for (var d=0; d<policies.length; d++) { 
            
            var tassets=Object.keys(output.amount.multiasset[policies[d]]);
            var tpolicy = output.amount.multiasset[policies[d]];
            
            for (var e=0; e<tassets.length; e++) { 
                setTokenAmount(policies[d],tassets[e],tpolicy[tassets[e]]);
            }
        }
     }
  }
  res.status(200).json({lovelace: ada, tokens: tokens});
  //res.status(200).json(Object.keys(req.query));
}
