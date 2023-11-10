async function doIt() { 
const fileContents = await FileSystem.readFileSync(process.cwd()+'/data/policyIDs.json')
    console.log(fileContents);
}
doIt();