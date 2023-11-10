import fs from 'fs';
import database from '../utils/database.js'
import dotenv from 'dotenv';
dotenv.config()
async function doIt() {
const fileContents = await fs.readFileSync(process.cwd()+'/data/policyIDs.json')
    
    const json = JSON.parse(fileContents)
    for (var policy in json) { 
        console.log('Doing policy: '+policy)
        
        const existing = await database.getPolicy(policy);
        if (existing) {
            console.log("Existing policy: "+existing.policyID)
            try { 
            await database.default.query(`
            UPDATE policy SET name=$1::TEXT, slug=$2::TEXT WHERE encode("policyID",'hex')=$3::TEXT
            `,[json[policy].title, json[policy].slug, existing.policyID])
            } catch (e) { 
                console.log(e)
            }
            
            console.log('found');
        } else {
            console.log('not found');
        }
    }
}
doIt();
