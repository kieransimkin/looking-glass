import dotenv from 'dotenv';
dotenv.config()
import {createClient} from 'redis';
let client = null;
export const getClient = async() => { 
    if (!client) { 
        client = await createClient({socket:{port: 6379, host:'kieran.gleeze.com'}})
        .on('error', err => console.log('Redis Client Error', err, process.env.REDIS_URI))
        .connect();
    }
    return client;
}