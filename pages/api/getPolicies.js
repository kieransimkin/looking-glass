
import { getFeaturedPolicies, setPolicyAssetCount, countPolicies } from "../../utils/database.mjs";
import {getClient, checkCacheItem, incrementCacheItem } from "../../utils/redis.mjs";
import pgClient from "../../utils/dbsync.mjs"
import { init } from "libcip54";
import { getPolicies } from "../../utils/database.mjs";
import { getDataURL } from "../../utils/DataStore";
export default async function Browse(req, res) {
    const redisClient = await getClient();
  init(process.env.NETWORK?.toLowerCase(), pgClient,  process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
    let {sort,sortOrder, featuredOnly, page} = req.query;

    if (!page) page=0;
    page=parseInt(page);
    if (page<0) page = 0;
    const perPage = 10;
    const start = page*perPage;
    const end = (page+1)*perPage;
    const totalPolicies = await countPolicies();
    const totalPages = Math.ceil(totalPolicies/perPage);
    if (typeof featuredOnly == 'undefined' || featuredOnly==="false" || featuredOnly===false) { 
      featuredOnly=false;
    } else if (featuredOnly==="true" || featuredOnly===true) { 
      featuredOnly=true;
    }
    console.log(featuredOnly);
    let result = await getPolicies(sort,sortOrder, page, featuredOnly?true:false);

    for (const policy of result) { 
      let policyProfile = policy.profileUnit;
      policy.title = policy.name;
      if (!policyProfile) { 
        redisClient.publish('requestPolicyProfile',policy.policyID);
      } else { 
        let tokenData = await checkCacheItem('getTokenData:'+policyProfile);
      
        if (!tokenData) tokenData={unit:policyProfile};
        const thumbName = 'tokenThumb:'+tokenData.unit+':500:dark';
        let thumbURL;
        if ((thumbURL = getDataURL(thumbName,'jpg'))) {
            tokenData.thumb = thumbURL;
            policy.thumb = thumbURL;
        }   else { 
            tokenData.thumb = '/api/getTokenThumb?unit='+policyProfile;
            policy.thumb = '/api/getTokenThumb?unit='+policyProfile;
        }
        const tinyName = 'tokenThumb:'+tokenData.unit+':64:dark';
        let tinyURL;
        if ((tinyURL = getDataURL(tinyName,'jpg'))) {
          tokenData.tiny = tinyURL;
        }else { 
            tokenData.tiny = '/api/getTokenThumb?unit='+policyProfile+'&size=64';
        }
  
  
        
        policy.policyProfile=tokenData;
      }



      
      
    }
    res.status(200).json({policies:result, page, start, end, totalPages, perPage });
    
}
