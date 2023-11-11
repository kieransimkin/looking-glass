import db from "../utils/database"
export async function setLastMinted(date) { 
    
        await db.query(
        `
        UPDATE policy SET "lastMinted"=$1 WHERE encode("policyID",'hex')=$2::TEXT
        `,[new Date(date), this.policyID]);
    
}
export async function setLastMoved(date) { 
    await db.query(
        `
        UPDATE policy SET "lastMoved"=$1 WHERE encode("policyID",'hex')=$2::TEXT
        `,[new Date(date), this.policyID]);
}