
import db from "../utils/database.mjs"
export async function setProfileUnit(options) { 
    
    let choice = options[0];
    let c=1;
    // Todo - better default profile pic selection
    while (parseInt(choice.quantity)!=1) {         
        choice = options[c];
        if (!choice) break;
    }
    
    if (choice) { 
        await db.query(
        `
        UPDATE wallet SET "profileUnit"=$1::TEXT WHERE stake=$2::TEXT
        `,[options[0].unit, this.stake]);
    }
}