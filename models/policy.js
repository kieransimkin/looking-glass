import db from "../utils/database"
export async function setLastMinted(date) { 
    
        await db.query(
        `
        UPDATE policy SET "lastMinted"=$1::timestamp WHERE "policyID"=$2::TEXT
        `,[date, this.policyID]);
    
}
export async function setLastMoved(date) { 
    await db.query(
        `
        UPDATE policy SET "lastMoved"=$1::timestamp WHERE "policyID"=$2::TEXT
        `,[date, this.policyID]);
}