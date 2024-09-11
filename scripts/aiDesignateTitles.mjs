import fs from 'fs';
import database, { getPolicy,mysteryPolicies, setPolicyAiTitle, setPolicyAssetCount } from '../utils/database.mjs'
import dotenv from 'dotenv';
import { checkCacheItem, cacheItem } from '../utils/redis.mjs';
import { default as formatter } from '../utils/formatter.js';
import fetch from 'node-fetch';
import slug from 'slug';
import { getTokensFromPolicy } from 'libcip54';
const getTokenData = (unit, throwOnCacheMiss, sparse) => formatter.getTokenData(unit,throwOnCacheMiss, sparse)
dotenv.config()
import {
    Document,
    HuggingFaceEmbedding,
    HuggingFaceEmbeddingModelType,
    Ollama,
    Settings,
    VectorStoreIndex,
    RouterQueryEngine,
    MetadataMode,
    SummaryIndex,
    serviceContextFromDefaults
  } from "llamaindex";


 const newFetch = async (input,init) => { 
    return await fetch(input, init);
 }
 Settings.chunkSize = 3072;
 const llm = new Ollama({
    model: "llama3.1:8b",
    config:{    "request_timeout": 1200},
        options: {   "request_timeout": 1200},a

  });  
  const embedModel = new HuggingFaceEmbedding({
    modelType: "Snowflake/snowflake-arctic-embed-s",
    quantized: false
  });
  const service_context = serviceContextFromDefaults({chunkSize:3072,  llm, embedModel});

  Settings.llm =llm;
  
  Settings.embedModel=embedModel;
  
  
  //Settings.chunkOverlap = 50;


  //const policyID = '1eaf3b3ffb75ff27c43c512c23c6450b307f138281efb1d690b84652'; 
  //const policyID = '7044e2678889f1a345a628d21f862895cc2ceb135a1d45417a84a2cd'; 
  
console.log('Doing AI playdough')
const numTokens = 3;
const start = async () => { 
    const mysteries = await mysteryPolicies();
    for (const policy of mysteries) { 
        try { 
            await doIt(policy.slug);
        } catch (e) { 
            console.log('Exception while trying to generate AI content');
            console.log(e);
        }
    }
}
start().then(()=>{ console.log('Main app ended')});
async function doIt(policyID) {
    let sampleSet=[];
    process.stdout.write('\nDoing policy '+policyID+': ');
    const policy = await getPolicy(policyID);
    let tokens = await checkCacheItem('getTokensFromPolicy:'+policy?.policyID);
    if (!tokens) {
        tokens = await getTokensFromPolicy(policy.policyID);
        await setPolicyAssetCount(policy.policyID, tokens.length);
        await cacheItem('getTokensFromPolicy:'+policy.policyID,tokens)
    }
    for (var c=0; c<numTokens; c++) { 
        sampleSet.push(await getTokenData(tokens[tokens.length * Math.random() | 0],true,true));
    }
    const docs = [];
    const mds = [];
    for (var c=0; c<numTokens; c++) { 
        var md={ text: JSON.stringify(sampleSet[c]), id_: sampleSet[c].unit, metadata:sampleSet[c].metadata }
        docs.push(new Document(md));
        mds.push(md);
    }
    
      // Split text and create embeddings. Store them in a VectorStoreIndex
      
    const index = await VectorStoreIndex.fromDocuments(docs,{serviceContext: service_context});
    const summaryIndex = await SummaryIndex.fromDocuments(docs,{serviceContext: service_context});
    index.summary='';
    summaryIndex.summary='';
    var titleQueryEngine = index.asQueryEngine();
    // Create a router query engine
    var descQueryEngine = summaryIndex.asQueryEngine();
    const queryEngine = RouterQueryEngine.fromDefaults({
        queryEngineTools: [
          {
            queryEngine: titleQueryEngine,
            description: "Useful for summarization questions",
          },
          {
            queryEngine: descQueryEngine,
            description: 'Good for generating descriptions'
          }
        ],
      });
  
      
  // Query the index
  
  
  
  const { response, sourceNodes } = await queryEngine.query({
    query: "Below you will find a JSON list of NFT metadata, each entry represents one NFT. Please identify the name of this NFT collection - if you're not sure, look for parts of the name that are consistent across each entry in the list. If the name ends with a number, and that number is differerent for each item; don't include it in your output - just give me the name that is common across all entries.\n\nWhen you have your answer, reply with the name ONLY, do not write a sentence, only write the name of the NFT collection. Please, I really need your help with this.\n\n"+JSON.stringify(mds),
  });
  try {
    if (response && response.length>0) { 
      await setPolicyAiTitle(policyID,response,slug(response));
      process.stdout.write(response);
    } else { 
      process.stdout.write('No title response received from AI')
    }
  } catch (e) { 
    console.log('Exception setting policy title');
    console.log(e);
  }
  /*
  

  const descResponse = await queryEngine.query({
    query: "Below you will find a JSON list of NFT metadata from an NFT project called \""+response+"\" - a random sampling of the "+tokens.length+" tokens which make up the collection, each entry represents one NFT on the Cardano blockchain - Please write a description of this project that would be suitable for use in the meta tags of an HTML page. Try to identify the theme of the project and highlight anything particularly unique or unusual about it, perhaps mention some traits from the metadata, particularly those which would be visually noticable. Try to write in a way that captures attention and makes you want to find out more - use a wide vocabulary.\n\nWhen you have your answer, reply with the description ONLY. Please, I really need your help with this.\n\n"+JSON.stringify(mds),
  });
  const descSourceNodes = descResponse.sourceNodes;
  console.log(descResponse.message.content);  
  //*/

  
  
  


    //console.log(sampleSet);
}

