import db from "../utils/database.mjs"
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
export async function setAiFailed() { 
        await db.query(
            `
            UPDATE policy SET "aiFailed"=true, "aiDefault"=false WHERE encode("policyID",'hex')=$1::TEXT
            `,[this.policyID]);
    }

export async function setProfileUnit(unit) { 
        await db.query(
                `
                UPDATE policy SET "aiFailed"=true, "aiDefault"=false WHERE encode("policyID",'hex')=$1::TEXT
                `,[this.policyID]);
}