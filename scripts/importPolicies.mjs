import fs from 'fs';
import database from '../utils/database.js'
import dotenv from 'dotenv';
dotenv.config()
async function doIt() {
const fileContents = await fs.readFileSync(process.cwd()+'/data/policyIDs.json')
    console.log(fileContents);
    const json = JSON.parse(fileContents)
    for (var policy in json) { 
        console.log(policy);
        const existing = await database.getPolicy(policy);
        if (existing) {
            console.log('found');
        } else {
            console.log('not found');
        }
    }
}
doIt();
