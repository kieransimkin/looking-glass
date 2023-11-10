const fs = require('fs');
import fs from 'fs';
import { getPolicy } from '../utils/database';

async function doIt() {
const fileContents = await fs.readFileSync(process.cwd()+'/../data/policyIDs.json')
    console.log(fileContents);
    const json = JSON.parse(fileContents)
    for (var policy in json) { 
        console.log(policy);
        const existing = await getPolicy(policy);
        if (existing) {
            console.log('found');
        } else {
            console.log('not found');
        }
    }
}
doIt();
