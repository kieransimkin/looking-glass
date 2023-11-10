const fs = require('fs');
const database = require('../utils/database')
async function doIt() {
const fileContents = await fs.readFileSync(process.cwd()+'/../data/policyIDs.json')
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
