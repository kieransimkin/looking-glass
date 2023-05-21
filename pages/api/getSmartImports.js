import pgClient from '../../utils/dbsync.js';
import { getStakeFromAny } from '../../utils/CSL.js';
export default async function Browse(req, res) {
    //if (!pgClient.isC)
    //await pgClient.connect();
    const {metadata, walletAddr} = req.body;
    const featureTree = metadata?.uses;
    const ret = {libraries:[], css: [], tokens: {}, utxos: {}, transactions: {}, ownerAddr: walletAddr, fetchedAt: new Date()};
    if (featureTree?.libraries?.length>0) { 
        const librariesResult = await getLibraries(featureTree);
        ret.libraries=librariesResult.libraries;
        ret.css=librariesResult.css;
    }
    if (featureTree?.tokens?.length>0) { 
        ret.tokens = await getTokens(featureTree, walletAddr);
    }
    if (featureTree?.utxos?.length>0) { 
        ret.utxos = await getUTXOs(featureTree, walletAddr);
    }
    if (featureTree?.transactions?.length>0) { 
        ret.transactions = await getTransactions(featureTree, walletAddr);
    }
    if (featureTree?.mintTx) { 
        ret.mintTx='TODO';
    }
    if (featureTree?.files) { 
        ret.files=true;
    }

    res.status(200).json(ret);
    
}

async function getTransactions(featureTree, walletAddr) { 
    const ret = {};
    let transactions = featureTree.transactions;
    if (typeof transactions == "string") { 
        transactions = [transactions];
    }
    for (var c=0; c<transactions.length; c++) { 
        let stakeAddress = transactions[c];
        if (stakeAddress == 'own') {
            stakeAddress=walletAddr;
        }
        // Todo - detect full addresses rather than stake addresses and do a slightly different query for them
        stakeAddress = getStakeFromAny(stakeAddress);
        let txs = await pgClient.query(`
        SELECT 
        encode(tx.hash,'hex') AS hash, 
        tx.out_sum,
        tx.fee,
        tx.deposit,
        tx.size,
        tx.invalid_before,
        tx.invalid_hereafter,
        tx.script_size,
        block.block_no, 
        block.time,
        (
            SELECT json_agg(row_to_json(X))
            FROM (
                SELECT 
                    to2.index,
                    to2.address,
                    to2.address_has_script,
                    to2.value,
                    to2.data_hash, 
                    (
                        SELECT json_agg(row_to_json(X2)) FROM 
                            (
                                SELECT 
                                    matx2.quantity, 
                                    concat(encode(ma2.policy,'hex'), encode(ma2.name, 'hex')) AS unit
                                FROM ma_tx_out matx2 
                                    LEFT JOIN multi_asset ma2 ON (ma2.id=matx2.ident) 
                                WHERE matx2.tx_out_id=to2.id
                            ) AS X2
                    ) AS multiasset 
                FROM tx_out to2 WHERE tx_id=tx.id
            ) AS X
        ) AS outputs,
        (
            SELECT json_agg(row_to_json(X))
            FROM (
                SELECT 
                    to2.index,
                    to2.address,
                    to2.address_has_script,
                    to2.value,
                    to2.data_hash,
                    encode(tx2.hash, 'hex') AS hash,
                    (
                        SELECT json_agg(row_to_json(X2)) FROM 
                        (
                            SELECT
                                matx2.quantity, 
                                concat(encode(ma2.policy,'hex'), encode(ma2.name, 'hex')) AS unit
                            FROM ma_tx_out matx2
                                LEFT JOIN multi_asset ma2 ON (ma2.id=matx2.ident)
                            WHERE matx2.tx_out_id=to2.id
                        ) AS X2
                    ) AS multiasset 
                FROM tx_in 
                    LEFT JOIN tx_out to2 ON to2.tx_id=tx_in.tx_out_id AND to2.index=tx_in.tx_out_index 
                    LEFT JOIN tx tx2 ON tx2.id=to2.tx_id
                WHERE tx_in.tx_in_id=tx.id
            ) AS X
        ) AS inputs
    FROM tx
        
        JOIN tx_out         ON (tx.id = tx_out.tx_id)
        JOIN stake_address s1  ON (s1.id = tx_out.stake_address_id)
        
        JOIN block          ON (block.id = tx.block_id)
    WHERE valid_contract = 'true'
        AND (s1.view = $1::TEXT)
    GROUP BY tx.id, block.id
    ORDER BY tx.id DESC
    
    
    limit 20
        `,[stakeAddress]);
        
        ret[stakeAddress] = txs.rows
    }
    return ret;
}

async function getTokens(featureTree, walletAddr) { 
    const ret = {};
    let tokens = featureTree.tokens;
    if (typeof tokens == "string") { 
        tokens = [tokens];
    }
    for (var c=0; c<tokens.length; c++) { 
        let stakeAddress = tokens[c];
        if (stakeAddress == 'own') {
            stakeAddress=walletAddr;
        }
        // Todo - detect full addresses rather than stake addresses and do a slightly different query for them
        stakeAddress = getStakeFromAny(stakeAddress);
        let assets = await pgClient.query(`
        SELECT 
            concat(encode(multi_asset.policy, 'hex'), encode(multi_asset.name, 'hex')) AS unit, 
            sum(ma_tx_out.quantity) as quantity
        FROM multi_asset 
            JOIN ma_tx_out      ON (ma_tx_out.ident = multi_asset.id) 
            JOIN tx_out         ON (tx_out.id = ma_tx_out.tx_out_id)
            JOIN utxo_view      ON (utxo_view.id = ma_tx_out.tx_out_id) 
            JOIN stake_address  ON (stake_address.id = utxo_view.stake_address_id)
            JOIN tx             ON (tx.id = utxo_view.tx_id)
        WHERE (stake_address.view = $1::TEXT)
                AND tx.valid_contract = 'true'
        GROUP BY concat(encode(multi_asset.policy, 'hex'), encode(multi_asset.name, 'hex')) 
        `, [stakeAddress]);
        ret[stakeAddress]=assets.rows;
        
    }
    return ret;
}
async function getUTXOs(featureTree, walletAddr) { 
    const ret = {};
    let utxos = featureTree.utxos;
    if (typeof utxos == "string") { 
        utxos = [utxos];
    }
    for (var c=0; c<utxos.length; c++) { 
        let stakeAddress = utxos[c];
        if (stakeAddress == 'own') {
            stakeAddress=walletAddr;
        }
        // Todo - detect full addresses rather than stake addresses and do a slightly different query for them
        stakeAddress = getStakeFromAny(stakeAddress);
        let utres = await pgClient.query(`
        SELECT 
            encode(tx.hash,'hex') as txHash, 
            tx_out."index", 
            tx_out.address, 
            tx_out.value,
		    (
                SELECT json_agg(row_to_json(X2)) FROM 
                (
                    SELECT
                        matx2.quantity, 
                        concat(encode(ma2.policy,'hex'), encode(ma2.name, 'hex')) AS unit
                    FROM ma_tx_out matx2
                        LEFT JOIN multi_asset ma2 ON (ma2.id=matx2.ident)
                    WHERE matx2.tx_out_id=tx_out.id
                ) AS X2
            ) AS multiasset,
            CASE WHEN d1.value IS NOT NULL THEN d1.value WHEN d2.value IS NOT NULL THEN d2.value ELSE NULL END datum
        FROM utxo_view
          JOIN tx_out         ON (tx_out.id = utxo_view.id)
          JOIN stake_address  ON (stake_address.id = utxo_view.stake_address_id)
          JOIN tx             ON (tx.id = utxo_view.tx_id)
          LEFT JOIN datum d1  ON (d1.hash = tx_out.data_hash AND d1.tx_id = tx.id)
          LEFT JOIN datum d2  ON (d2.id = tx_out.inline_datum_id)
            WHERE (stake_address.view = $1::TEXT)
                AND tx.valid_contract = 'true'`, [stakeAddress]);
            
        ret[stakeAddress]=utres.rows;
        
    }
    return ret;
}
async function getLibraries(featureTree) { 
    const ret = {libraries: [], css: []};
    for (var c=0; c<featureTree.libraries.length; c++ ) { 
        const result = await fetch('https://api.cdnjs.com/libraries/'+featureTree.libraries[c].name+'/'+featureTree.libraries[c].version+'?fields=name,version,files');
        const json = await result.json();
        const files = json.files;
        const name = featureTree.libraries[c].name;
        for (var d=0; d<files.length; d++) { 
            if (    !files[d].includes(".min.") ||  // skip file if it doesn't include .min
                    (name=='three.js' && files[d].includes('.module.')) || 
                    (name=='phaser' && files[d].includes('-ie9')) || 
                    (name=='phaser' && files[d].includes('.esm.')) || 
                    (name=='phaser' && files[d].includes('arcade-physics'))

                    ) { // for three.js don't load the module version
                continue;
            }
            const url = 'https://cdnjs.cloudflare.com/ajax/libs/'+featureTree.libraries[c].name+'/'+featureTree.libraries[c].version+'/'+files[d];
            const fresult = await fetch(url)
            let blob = await fresult.blob();
            const ab = await blob.arrayBuffer();
            var ia = new Uint8Array(ab);
            var tresult = new TextDecoder().decode(ia);
            const mType = blob.type.split(';')[0];
            const librarySrc='data:'+mType+','+encodeURIComponent(tresult);
            if (mType.toLowerCase()=='application/javascript') { 
                ret.libraries.push(librarySrc);
            } else if (mType.toLowerCase()=='text/css') { 
                ret.css.push(librarySrc);
            }
            
        }
        
    }
    return ret;
}
export const config = {
    api: {
      responseLimit: false,
    },
  }