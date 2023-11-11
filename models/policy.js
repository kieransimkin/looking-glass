import db from "../utils/database"
export async function setLastMinted(date) { 
    
        await db.query(
        `
        UPDATE policy SET "lastMinted"=$1::timestamp WHERE stake=$2::TEXT
        `,[date, this.stake]);
    
}