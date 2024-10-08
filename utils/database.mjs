import dotenv from 'dotenv';
dotenv.config()
import pgCon from 'pg';
import dbSyncClient from './dbsync.mjs'
import { validatePolicyID } from './Helpers.mjs';
let client = new pgCon.Pool({connectionString: process.env.DATABASE_URI});
import { isValidAddress, getStakeFromAny } from 'libcip54';
import * as walletMethods from "../models/wallet"
import * as policyMethods from "../models/policy"
import { getTokenHolders, init } from 'libcip54';
import pgClient from './dbsync.mjs'
import {getClient} from "./redis.mjs";

let redisClient;
import * as Api from "./Api"
import punycode from 'punycode'
// client.connect();
export default client;
export const dbinit = async() => { 
    redisClient = await getClient();
    init(process.env.NETWORK?.toLowerCase(), pgClient, process.env.IPFS_GATEWAY, process.env.ARWEAVE_GATEWAY, redisClient);
}
export const setPolicyAiTitle = async(policyID, title, slug) => { 
    await dbinit();
    return await client.query(
        `update policy set "name"=$1, "slug"=$2, "aiDefault"=true, "aiFailed"=false where encode("policyID",'hex')=$3`, [title, slug, policyID]
    )
}
export const setPolicyAiDesc = async(slug, desc) => { 
    await dbinit();
    return await client.query(
        `update policy set "description"=$1, "aiDefault"=true, "aiFailed"=false where "slug"=$2`, [desc, slug]
    )
}
export const setPolicyAiFailed = async(policy) => { 
    await dbinit();
    return await client.query(
        `update policy set "aiFailed"=true, "aiDefault"=false where encode("policyID",'hex')=$1`, [policy]
    )
}
export const setPolicyAssetCount = async (policy, count) => { 
    await dbinit();
    return await client.query(
        `update policy set "assetCount"=$1 WHERE encode("policyID",'hex')=$2`, [count, policy]
    )
}
export const setPolicyLastMoved = async (policy, date) => { 
    await dbinit();
    return await client.query(
        `update policy set "lastMoved"=$1 WHERE encode("policyID",'hex')=$2`, [new Date(date), policy]
    )
}

export const setPolicyProfileUnit = async (policy, profileUnit) => { 
    await dbinit();
    return await client.query(
        `update policy set "profileUnit"=$1 WHERE encode("policyID",'hex')=$2`, [profileUnit, policy]
    )
}
export const setWalletLastMoved = async (stake, date) => { 
    await dbinit();
    return await client.query(
        `update wallet set "lastMoved"=$1 WHERE stake=$2`, [new Date(date), stake]
    )
}

export const incrementPolicyTotalActivity = async (policy, activity) => { 
    await dbinit();
    return await client.query(
        `update policy set "totalActivity"="totalActivity"+$1 WHERE encode("policyID",'hex')=$2`, [activity, policy]
    )
}
export const incrementWalletTotalActivity = async (stake, activity) => { 
    await dbinit();
    return await client.query(
        `update wallet set "totalActivity"="totalActivity"+$1 WHERE stake=$2`, [activity, stake]
    )
}

export const incrementPolicyTotalHits = async (policy, hits) => { 
    await dbinit();
    return await client.query(
        `update policy set "totalHits"="totalHits"+$1 WHERE encode("policyID",'hex')=$2`, [hits, policy]
    )
}
export const incrementWalletTotalHits = async (stake, hits) => { 
    await dbinit();
    return await client.query(
        `update wallet set "totalHits"="totalHits"+$1 WHERE stake=$2`, [hits, stake]
    )
}
export const lastBlock = async() => { 
    let dbSyncResult = await dbSyncClient.query(
        `
       select "time" from block order by "time" desc limit 1
        `,
        []
    );
    return dbSyncResult.rows[0].time;
}
export const countPolicies = async () => { 
    let count = null;
    try { 
        count = await client.query(`
        select count(*) as "count" from policy where "notFeatured"=false
    `,[])
    } catch (e) { 
        console.log('Exception while doing countPolicies: '+e)
    }
    return count?.rows[0].count;
}
export const countFeaturedPolicies = async () => { 
    let count = null;
    try { 
        count = await client.query(`
        select count(*) as "count" from policy where "notFeatured"=false AND "isFeatured"=true
    `,[])
    } catch (e) { 
        console.log('Exception while doing countPolicies: '+e)
    }
    return count?.rows[0].count;
}
export const getFeaturedPolicies = async(sort, sortOrder, page=0) => { 
    return await getPolicies(sort, sortOrder, page, true);
}
export const getPolicies = async(sort, sortOrder='desc', page=0, featuredOnly=false) => { 
    await dbinit();
    if (!Array.isArray(sort)) sort = [sort];
    const sortOptions = [];
    const whereOptions = [];
    const perPage = 10;
    if (!sortOrder) sortOrder='desc';
    if (!page) page=0;
    const args = [];
    for (const s of sort) { 
        switch (s) { 
            case 'recentMint':
                sortOptions.push(`"lastMinted" ${sortOrder}`);
                //whereOptions.push(`"lastMinted" IS NOT NULL`);
                break;
            case 'totalActivity':
                sortOptions.push(`"totalActivity" ${sortOrder}`)
                break;
            case 'totalHits':
                sortOptions.push(`"totalHits" ${sortOrder}`)
                break;
            case 'recentlyActive':
                sortOptions.push(`"lastMoved" ${sortOrder}`)
                //whereOptions.push(`"lastMoved" IS NOT NULL`);
                break;
            case 'random':
                sortOptions.push(`random()`);
                break;
        }
    }
    if (sortOptions.length<1) { 
        sortOptions.push('random()');
    }
    let whereString = ' AND '+whereOptions.join(' AND ');
    if (!whereOptions.length) whereString='';
    if (featuredOnly) { 
        whereString=whereString+` AND "isFeatured"=true`;
    }
    const sortString = sortOptions.join(", ")
    let q,policies;
    try { 
        policies = await client.query(q=`
        select         
        encode("policyID",'hex') as "policyID",
        encode("policyID",'hex') as "id",
        name,
        slug,
        description,
        to_char("createdAt",'YYYY-MM-DD HH24:MI:SS') as "createdAt",
        "profileUnit",
        "isFeatured",
        to_char("lastMinted",'YYYY-MM-DD HH24:MI:SS') as "lastMinted",
        to_char("lastMoved",'YYYY-MM-DD HH24:MI:SS') as "lastMoved",
        "assetCount",
        "totalActivity",
        "totalHits" from policy where "notFeatured"=false ${whereString} ORDER BY ${sortString} LIMIT $1
        OFFSET $2 
    `,[perPage, perPage * page])
    } catch (e) { 
        console.log('Exception while doing getPolicies: '+e)
    }
    
    return policies.rows;
}
export const mysteryPolicies = async() => { 
    await dbinit();
    
    const perPage = 50;
    
    
    const policies = await client.query(`
        select slug from policy 
            where encode("policyID",'hex')=name 
            and name=slug 
            and "notFeatured"=false 
            AND "aiFailed"=false
            and description is null 
                ORDER BY random()
                LIMIT $1
    `,[perPage])
    return policies.rows;
}
export const indeterminantPolicies = async() => { 
    await dbinit();
    const perPage = 50;
    const policies = await client.query(`
        select slug from policy 
            where encode("policyID",'hex')!=name
            and "notFeatured"=false 
            AND "aiFailed"=false
            and description is null 
            
                ORDER BY random()
                LIMIT $1
    `,[perPage])
    return policies.rows;
}
export const getPolicy = async (key) => { 
    await dbinit();
    if (validatePolicyID(key)) { 
        return await getPolicyByID(key);
    } else {
        return await getPolicyBySlug(key);
    }
}

export const getWallet = async (key) => { 
    await dbinit();
    return new Promise((resolve, reject) => { 
        let stake;
        if (isValidAddress(key) && (stake=getStakeFromAny(key))) {
            getWalletByStake(stake).then((w)=>{ 
                resolve(w);
            })
        } else if (key && key.length && key.substring(0,1)=='$') { 
                const punycoded = punycode.toASCII(key.substr(1).trim());
                // Todo - redis cache this:
                getTokenHolders('f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'+Buffer.from(punycoded).toString('hex'),0).then((a)=> { 
                    if (a.length && a[0]?.stake) { 
                        resolve(getWalletByStake(a[0].stake))
                    }
                });
        } else {
            resolve(getWalletBySlug(key));
        }
    });
}
const bindWalletMethods = (wallet) => { 
    
    for (var method in walletMethods) { 
        if (typeof walletMethods[method]=='function') { 
            wallet[method]=walletMethods[method].bind(wallet);
        }
    }
    return wallet;
}
const bindPolicyMethods = (policy) => { 
    for (var method in policyMethods) { 
        if (typeof policyMethods[method]=='function') { 
            policy[method]=policyMethods[method].bind(policy);
        }
    
    }
    return policy;
}
export const getPolicyKeyList = async () => { 
    await dbinit();
    let list = await client.query(
        `select distinct slug from policy where slug!=encode("policyID",'hex') and "assetCount">0`,[]
    );

    if (list && list.rows && list.rows.length) { 
        list = list.rows.map((d)=>d.slug);
    } else { 
        list = [];
    }

    
    return list;
}

export const getWalletKeyList = async () => { 
    await dbinit();
    let list = await client.query(
        `select distinct slug from wallet where slug!=stake`,[]
    );
    if (list && list.rows && list.rows.length) { 
        list = list.rows.map((d)=>d.slug);
    } else { 
        list = [];
    }
    return list;
}


export const getWalletByStake = async (stake) => { 
    await dbinit();
    
    let wallet = await client.query(
        `
        SELECT 
            stake,
            name, 
            slug,
            bio,
            "profileUnit",
            "createdAt",
            "lastMoved",
            "totalActivity",
            "totalHits"
        FROM wallet
        WHERE stake=$1::TEXT
          LIMIT 1;
        `,
        [stake],
      );
      
      if (!wallet?.rows || wallet?.rows.length<1) { 
        const foundStake = getStakeFromAny(stake);
        if (!foundStake) { 
            return null;
        } else { 
            let result = await client.query(
                `
                INSERT INTO wallet (stake, name, slug) VALUES($1::TEXT,$2::TEXT,$3::TEXT)
                `
            ,[foundStake,foundStake,foundStake])
            if (result.rowCount!=1) { 
                return null;
            } else { 
                return await getWalletByStake(foundStake);
            }
        }
      } else {

        return bindWalletMethods(wallet.rows[0]);
      }
}
export const getWalletBySlug = async (slug) => { 
    await dbinit();
    let wallet = await client.query(
        `
        SELECT 
            stake,
            name, 
            slug,
            bio,
            "profileUnit",
            "createdAt",
            "lastMoved",
            "totalActivity",
            "totalHits"
        FROM wallet
        WHERE slug=$1::TEXT
          LIMIT 1;
        `,
        [slug],
      );
      if (!wallet?.rows || wallet?.rows.length<1) { 
        return null;
      } else { 
        return bindWalletMethods(wallet.rows[0]);
      }
}
export const getPolicyByID = async (policyID) => { 
    await dbinit();
    let policy = await client.query(
        `
        SELECT 
             encode("policyID",'hex') as "policyID",
             name,
             slug,
             description,
             "createdAt",
             "profileUnit",
             "isFeatured",
             "lastMinted",
             "lastMoved",
             "assetCount",
             "totalActivity",
             "totalHits"
        FROM policy
        WHERE encode("policyID",'hex')=$1::TEXT
          LIMIT 1;
        `,
        [policyID],
      );
      if (!policy?.rows || policy?.rows.length<1) { 
        let dbSyncResult = await dbSyncClient.query(
            `
            SELECT * FROM multi_asset WHERE encode(policy,'hex')=$1::TEXT
            LIMIT 1
            `,
            [policyID]
        )
        
        if (validatePolicyID(policyID) || (dbSyncResult?.rows && dbSyncResult?.rows.length)) { 
            let result = await client.query(
                `
                INSERT INTO policy ("policyID", name, slug) VALUES(decode($1::TEXT,'hex'),$2::TEXT,$3::TEXT)
                `
            ,[policyID,policyID,policyID])
            if (result.rowCount!=1) { 
                throw new Error('Failed to create new policy');
                return null;
            } else { 
                return await getPolicyByID(policyID);
            }
        } else { 
            throw new Error('Invalid Policy ID')
            return null;   
        }
      } else { 
        return bindPolicyMethods(policy.rows[0]);
      }
}
export const getPolicyBySlug = async (slug) => { 
    await dbinit();

    let policy = await client.query(
        `
        SELECT 
             encode("policyID",'hex') as "policyID",
             name,
             slug,
             description,
             "createdAt",
             "profileUnit",
             "isFeatured",
             "lastMinted",
             "lastMoved",
             "assetCount",
             "totalActivity",
             "totalHits"
        FROM policy
        WHERE slug=$1::TEXT
          LIMIT 1;
        `,
        [slug],
      );
      if (!policy?.rows || policy?.rows.length<1) { 
        return null;
      } else { 
        return bindPolicyMethods(policy.rows[0]);
      }
}
export const getRandomPolicy = async () => { 
    await dbinit();

    let policy = await client.query(
        `
        SELECT 
             encode("policyID",'hex') as "policyID",
             name,
             slug,
             description,
             "createdAt",
             "profileUnit",
             "isFeatured",
             "lastMinted",
             "lastMoved",
             "assetCount",
             "totalActivity",
             "totalHits"
        FROM policy
        WHERE encode("policyID",'hex')!=name AND encode("policyID",'hex')!="slug" AND "notFeatured"=false AND "assetCount">10
        ORDER BY random()
          LIMIT 1;
        `,
        [
        ],
      );
      if (!policy?.rows || policy?.rows.length<1) { 
        return null;
      } else { 
        return bindPolicyMethods(policy.rows[0]);
      }
}
export const getMetadataStats = async () => { 
await dbinit();
let result = await client.query(
    `
    select *, 
        ("withName"::float / "totalName"::float) * 100 as namedPercent, 
        ("failed"::float / "totalName"::float) * 100 as failedPercent,
        ("withDescription"::float / "totalDescription"::float) * 100 as describedPercent 
            from (select *, 
                ("withName"::int + "noName"::int) as "totalName", 
                ("withDescription"::int + "noDescription"::int) as "totalDescription"
                    from (select count(*) as "withName" from policy where "name"!=encode("policyID",'hex')) as "withName",
                        (select count(*) as "withDescription" from policy where "description" is not null) as "withDescription", 
                        (select count(*) as "failed" from policy where "aiFailed"=true) as "failed",
                        (select count(*) as "noName" from policy where "name"=encode("policyID",'hex')) as "noName", 
                        (select count(*) as "noDescription" from policy where "description" is null) as "noDescription") as numberedResults 
    `,[]);

    return result?.rows;
}
