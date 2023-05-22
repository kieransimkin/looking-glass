import pgClient from '../utils/dbsync.js';
import { fromUnit, toUnit } from 'lucid-cardano';
import { labelIsCIP68, REFERENCE_TOKEN_LABEL } from '../utils/Helpers';
import { validAddress, getStakeFromAny } from "./CSL";

export async function getTransactions(featureTree, walletAddr) { 
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

export async function getTokens(featureTree, walletAddr) { 
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
export async function getUTXOs(featureTree, walletAddr) { 
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
export async function getLibraries(featureTree) { 
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
export const getMetadata = async (unit) => { 
    if (!unit || unit.length<1) return null;
    const { label, name, policyId, assetName} = fromUnit(unit)
    let metadata=null;
    if (!labelIsCIP68(label)) {
      const mintTx=await getMintTx(unit);
      let nftMetadata = mintTx.metadata.filter((m) => m.key==721)[0].json;
      const policyMetadata = nftMetadata[policyId];
      if (policyMetadata[Buffer.from(assetName,'hex').toString()]) { 
        metadata=policyMetadata[Buffer.from(assetName,'hex').toString()];
      } else if (policyMetadata[assetName]) { 
        metadata=policyMetadata[assetName];
      } else { 
        metadata=null;
      }    
    } else { 
      metadata = await getCIP68Metadata(toUnit(policyId,name,REFERENCE_TOKEN_LABEL));
    }
    return metadata;
}
export const getMintTx = async (unit) => { 
    let mintTx = await pgClient.query(`
    SELECT 
        encode(tx.hash, 'hex') as txHash,
        (
            SELECT json_agg(row_to_json(X2)) FROM 
            (
                SELECT
                    key,
                    json
                FROM tx_metadata
                WHERE tx_metadata.tx_id=tx.id
            ) AS X2
        ) AS metadata
    FROM multi_asset 
        JOIN ma_tx_mint      ON (ma_tx_mint.ident = multi_asset.id) 
        JOIN tx             ON (tx.id = ma_tx_mint.tx_id)
    WHERE  ma_tx_mint.quantity>0 AND
            tx.valid_contract = 'true' AND
            policy = decode($1::TEXT, 'hex') AND
            name = decode($2::TEXT, 'hex')
    ORDER BY tx.id desc LIMIT 1
    `, [unit.substring(0,56), unit.substring(56)]);
    return mintTx.rows[0];
}
export const getCIP68Metadata = async (unit) => { 
    
    // Try normal datum first
    let datum = await pgClient.query(`
    SELECT           
        CASE WHEN d1.value IS NOT NULL THEN d1.value WHEN d2.value IS NOT NULL THEN d2.value ELSE NULL END datum
    FROM multi_asset
        JOIN ma_tx_out      ON (ma_tx_out.ident = multi_asset.id)
        JOIN tx_out         ON (tx_out.id = ma_tx_out.tx_out_id)
        JOIN tx             ON (tx.id = tx_out.tx_id)
        JOIN utxo_view      ON (utxo_view.id = ma_tx_out.tx_out_id) 
        LEFT JOIN datum d1  ON (d1.hash = tx_out.data_hash AND d1.tx_id = tx.id)
        LEFT JOIN datum d2  ON (d2.id = tx_out.inline_datum_id)
    WHERE valid_contract = 'true'
        AND policy = decode($1::TEXT, 'hex')
        AND name = decode($2::TEXT, 'hex')
        LIMIT 1
    `, [unit.substring(0,56), unit.substring(56)]);
        
    datum = datum?.rows[0]?.datum;

    if (!datum) return null;

    const parseCborJsonList = function(list) { 
        const ret = [];
        for (const item of list) { 
            let value = null;
            if (item.map) {
                value = parseCborJsonMap(item.map);
            } else if (item.bytes) { 
                value = Buffer.from(item.bytes, 'hex').toString();
            } else if (item.list) { 
                value = parseCborJsonList(item.list);
            }
            ret.push(value);
        }
        return ret;
    }
    
    const parseCborJsonMap = function(map) { 
        const ret = {};
        for (const field of map) { 
            let value = null;
            if (field.v.bytes) { 
                value = Buffer.from(field.v.bytes,'hex').toString();
            } else if (field.v.list) { 
                value = parseCborJsonList(field.v.list);
            } else if (field.v.map) { 
                value = parseCborJsonMap(field.v.map);
            }
            ret[Buffer.from(field.k.bytes, 'hex').toString()] = value;
        }
        return ret;
    }
    
    const metadata = {};
    for (const field of datum.fields[0].map) { 
        let value = '';
        if (field.v.bytes) { 
            value = Buffer.from(field.v.bytes,'hex').toString();
        } else if (field.v.list) { 
            value = parseCborJsonList(field.v.list);
        } else if (field.v.map) { 
            value = parseCborJsonMap(field.v.map);
        }
        metadata[Buffer.from(field.k.bytes,'hex').toString()] = value;
    }

    return metadata;
}

