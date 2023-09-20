import dotenv from 'dotenv';
dotenv.config()
import {createClient} from 'redis';
let client = null;
export const getClient = async() => { 
    if (!client) { 
        client = await createClient({url: process.env.KV_URL})
        .on('error', err => console.log('Redis Client Error', err, process.env.KV_URL))
        .connect();
    }
    return client;
}