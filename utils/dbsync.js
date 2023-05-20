import dotenv from 'dotenv';
dotenv.config()
import pgCon from 'pg';

let client = new pgCon.Client({connectionString: process.env.DBSYNC_URI});
client.connect();
export default client;
