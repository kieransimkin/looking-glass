import { getTokens, getUTXOs, getTransactions, getLibraries, getMintTx } from '../../utils/queries.js';
export default async function Browse(req, res) {
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
        ret.mintTx='un-minted';
    }
    if (featureTree?.files) { 
        ret.files=true;
    }
    res.status(200).json(ret);
}

export const config = {
    api: {
      responseLimit: false,
    },
  }