import dotenv from 'dotenv';
dotenv.config()
import {createClient} from 'redis';

let client = createClient({url: process.env.REDIS_URI});
client.connect();
export default client;

