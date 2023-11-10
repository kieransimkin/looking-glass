const fs = require('fs');
async function doIt() {
const fileContents = await fs.readFileSync(process.cwd()+'/../data/policyIDs.json')
    console.log(fileContents);
    const json = JSON.parse(fileContents)
    for (var policy in json) { 
        console.log(policy);
    }
}
doIt();
