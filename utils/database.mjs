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
export const getFeaturedPolicies = async(sort, sortOrder, page=0, featuredOnly=true) => { 
    await dbinit();
    if (!Array.isArray(sort)) sort = [sort];
    const sortOptions = [];
    const whereOptions = [];
    const perPage = 10;
    const args = [];
    for (const s of sort) { 
        switch (s) { 
            case 'recentMint':
                sortOptions.push(`"lastMinted" ${sortOrder}`);
                whereOptions.push(`"lastMinted" IS NOT NULL`);
                break;
            case 'totalActivity':
                sortOptions.push(`"totalActivity" ${sortOrder}`)
                break;
            case 'totalHits':
                sortOptions.push(`"totalHits" ${sortOrder}`)
                break;
            case 'recentlyActive':
                sortOptions.push(`"lastMoved" ${sortOrder}`)
                whereOptions.push(`"lastMoved" IS NOT NULL`);
                break;
            case 'random':
                sortOptions.push(`random()`);
                break;
        }
    }
    let whereString = ' AND '+whereOptions.join(' AND ');
    if (!whereOptions.length) whereString='';
    if (featuredOnly) { 
        whereString=whereString+` AND "isFeatured"=true`;
    }
    const sortString = sortOptions.join(", ")
    const policies = await client.query(`
        select         
        encode("policyID",'hex') as "policyID",
        encode("policyID",'hex') as "id",
        name,
        slug,
        description,
        to_char("createdAt",'YYYY-MM-DD HH24:MI:SS') as "createdAt",
        "isFeatured",
        to_char("lastMinted",'YYYY-MM-DD HH24:MI:SS') as "lastMinted",
        to_char("lastMoved",'YYYY-MM-DD HH24:MI:SS') as "lastMoved",
        "assetCount",
        "totalActivity",
        "totalHits" from policy where "assetCount">100 and "notFeatured"=false ${whereString} ORDER BY ${sortString} LIMIT $1
        OFFSET $2 
    `,[perPage, perPage * page])
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