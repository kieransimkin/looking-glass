import dotenv from 'dotenv';
dotenv.config()
import pgCon from 'pg';
import dbSyncClient from './dbsync'
import { validatePolicyID } from './Helpers';
let client = new pgCon.Pool({connectionString: process.env.DATABASE_URI});
import { getStakeFromAny, validAddress } from 'libcip54';
import * as walletMethods from "../models/wallet"
import * as policyMethods from "../models/policy"
// client.connect();
export default client;


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
        wallet[method]=walletMethods[method].bind(wallet);
    
    }
    return wallet;
}
const bindPolicyMethods = (policy) => { 
    for (var method in policyMethods) { 
        policy[method]=policyMethods[method].bind(policy);
    
    }
    return policy;
}
export const getPolicyKeyList = async () => { 
    let list = await client.query(
        `select distinct encode("policyID",'hex') as "policyID" from policy`,[]
    );

    if (list && list.rows && list.rows.length) { 
        list = list.rows.map((d)=>d.policyID);
    } else { 
        list = [];
    }
    let list2 = await client.query( 
        `select distinct slug from policy where slug!=encode("policyID",'hex')`,[]
    );
    if (list2 && list2.rows && list2.rows.length) { 
        list2.array.forEach(element => {
            list.push(element.slug);
        });
    }
    
    return list;
}

export const getWalletKeyList = async () => { 
    let list = await client.query(
        `select distinct stake from wallet`,[]
    );
    if (list && list.rows && list.rows.length) { 
        list = list.rows.map((d)=>d.stake);
    } else { 
        list = [];
    }
    let list2 = await client.query(
        `select distinct slug from wallet where slug!=stake`,[]
    )
    if (list2 && list2.rows && list2.rows.length) { 
        list2.array.forEach(element=> {
            list.push(element.slug);
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
            "profileUnit"
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
            slug
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
             description
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
             description
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