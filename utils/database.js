import dotenv from 'dotenv';
dotenv.config()
import pgCon from 'pg';
import dbSyncClient from './dbsync'
import { validatePolicyID } from './Helpers';
let client = new pgCon.Pool({connectionString: process.env.DATABASE_URI});
import { validAddress } from 'libcip54';
import { getStakeFromAny } from './CSL';
import * as walletMethods from "../models/wallet"
import * as policyMethods from "../models/policy"
// client.connect();
export default client;

export const setPolicyAssetCount = async (policy, count) => { 
    return await client.query(
        `update policy set "assetCount"=$1 WHERE encode("policyID",'hex')=$2`, [count, policy]
    )
}
export const setPolicyLastMoved = async (policy, date) => { 
    return await client.query(
        `update policy set "lastMoved"=$1 WHERE encode("policyID",'hex')=$2`, [new Date(date), policy]
    )
}

export const setWalletLastMoved = async (stake, date) => { 
    return await client.query(
        `update wallet set "lastMoved"=$1 WHERE stake=$2`, [new Date(date), stake]
    )
}

export const incrementPolicyTotalActivity = async (policy, activity) => { 
    return await client.query(
        `update policy set "totalActivity"="totalActivity"+$1 WHERE encode("policyID",'hex')=$2`, [activity, policy]
    )
}
export const incrementWalletTotalActivity = async (stake, activity) => { 
    return await client.query(
        `update wallet set "totalActivity"="totalActivity"+$1 WHERE stake=$2`, [activity, stake]
    )
}

export const incrementPolicyTotalHits = async (policy, hits) => { 
    return await client.query(
        `update policy set "totalHits"="totalHits"+$1 WHERE encode("policyID",'hex')=$2`, [hits, policy]
    )
}
export const incrementWalletTotalHits = async (stake, hits) => { 
    return await client.query(
        `update wallet set "totalHits"="totalHits"+$1 WHERE stake=$2`, [hits, stake]
    )
}
export const getFeaturedPolicies = async(sort, sortOrder, page=0) => { 
    if (Array.isArray(sort)) sort = [sort];
    const sortOptions = [];
    const perPage = 10;
    const args = [];
    for (const s of sort) { 
        switch (s) { 
            case 'recentMint':
                sortOptions.push(`"lastMint" ${sortOrder}`)
                break;
            case 'totalActivity':
                sortOptions.push(`"totalActivity" ${sortOrder}`)
                break;
            case 'totalHits':
                sortOptions.push(`"totalHits" ${sortOrder}`)
                break;
            case 'recentlyActive':
                sortOptions.push(`"lastMoved" ${sortOrder}`)
                break;
        }
    }
    const sortString = sortOptions.join(", ")
    const policies = await client.query(`
        select * from policy where assetCount>100 ORDER BY ${sortString} LIMIT $1
        OFFSET $2 
    `,[perPage, perPage * page])
}
export const getPolicy = async (key) => { 
    if (validatePolicyID(key)) { 
        return await getPolicyByID(key);
    } else {
        return await getPolicyBySlug(key);
    }
}

export const getWallet = async (key) => { 
    let stake;
    if (validAddress(key) && (stake=getStakeFromAny(key))) {
        return await getWalletByStake(stake);
    } else {
        return await getWalletBySlug(key);
    }
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
    let list = await client.query(
        `select distinct slug from policy where slug!=encode("policyID",'hex')`,[]
    );

    if (list && list.rows && list.rows.length) { 
        list = list.rows.map((d)=>d.slug);
    } else { 
        list = [];
    }
    let list2 = await client.query( 
        `select distinct encode("policyID",'hex') as "policyID" from policy where encode("policyID",'hex')=slug`,[]
    );
    if (list2 && list2.rows && list2.rows.length) { 
        list2.rows.forEach(element => {
            list.push(element.policyID);
        });
    }
    
    return list;
}

export const getWalletKeyList = async () => { 
    let list = await client.query(
        `select distinct slug from wallet where slug!=stake`,[]
    );
    if (list && list.rows && list.rows.length) { 
        list = list.rows.map((d)=>d.slug);
    } else { 
        list = [];
    }
    let list2 = await client.query(
        `select distinct stake from wallet where stake=slug`,[]
    )
    if (list2 && list2.rows && list2.rows.length) { 
        list2.rows.forEach(element=> {
            list.push(element.stake);
        });
    }
    return list;
}


export const getWalletByStake = async (stake) => { 
    
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
        
        if (dbSyncResult?.rows && dbSyncResult?.rows.length) { 
            let result = await client.query(
                `
                INSERT INTO policy ("policyID", name, slug) VALUES(decode($1::TEXT,'hex'),$2::TEXT,$3::TEXT)
                `
            ,[policyID,policyID,policyID])
            if (result.rowCount!=1) { 
                return null;
            } else { 
                return await getPolicyByID(policyID);
            }
        } else { 
            return null;   
        }
      } else { 
        return bindPolicyMethods(policy.rows[0]);
      }
}
export const getPolicyBySlug = async (slug) => { 

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