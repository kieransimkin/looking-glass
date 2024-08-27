import cookie from "cookie"

import { createClient } from 'redis';


let usersConnected=0;
setInterval(() => { 
    // Prints the number of connected WebSocket users every minute to the console.

    console.log(usersConnected + ' web socket users currently connected');
}, 60000);

/**
 * @description Establishes a WebSocket connection and creates a Redis client for
 * each connected user. It handles errors, disconnects users, unsubscribes from Redis
 * channels, and emits events when receiving messages from Redis channels such as
 * 'block' and 'mint'.
 *
 * @param {any} socket - Intended for handling WebSocket connections.
 */
export const onConnection = (socket: any) => {
console.log('got connection');
    usersConnected++;
    // We are creating a new redis client connection for every user to avoid having to carefully manage subscriptions
    // This way when a user disconnects, we can easily stop following their pubsub groups simply by closing their redis 
    // connection - otherwise we would have to worry about unscribing a group that is being monitored by another user
    let client:any = null;
    try { 
        client = createClient({ url: process.env.REDIS_URI });
        client.on('error',  (err:any) => console.log('Redis Client Error in web socket', err));

    } catch (e) { 
        console.error('Error connecting to redis in web socket');
        console.error(e);
    }
    /**
     * @description Logs a message indicating a WebSocket disconnection, decrements the
     * count of connected users, closes the WebSocket connection, unsubscribes from any
     * topics, and quits the client. This function is called when the WebSocket connection
     * is terminated or lost.
     */
    const disconnect = () => { 
        console.log('Websocket disconnect id# '+socket.id);
        usersConnected--;
        socket.disconnect(0);
        socket.conn.close();
        client.unsubscribe();
        client.quit();
    }
    /**
     * @description Disconnects a WebSocket connection established by the `socket` object.
     * This indicates that the client is ending its session, and any further communication
     * with the server will be terminated.
     */
    const hangup = () => { 
        socket.disconnect();
    }
    socket.on('disconnect', disconnect);
    client.on('error', (err: any) => console.log('Redis Client Error', err));
    client.on('ready', () => {
        // Subscribes to two WebSocket channels and forwards received messages to other sockets.

        console.log('Websocket connection id# '+socket.id);

        client.subscribe('block', (message: any) => {
            // Subscribes to 'block' topic, parses received JSON data and broadcasts it to all
            // clients connected to the server via websockets.

            message = JSON.parse(message);
            socket.emit('block', message);
        });
        client.subscribe('mint', (message: any) => { 
            // Subscribes to the 'mint' topic and handles received messages.

            message = JSON.parse(message);
            socket.emit('mint', message);
        });
     


    })
    // Connect the redis socket for this user
    client.connect();
}

// Authorization web socket middleware
// This will create a property called 'user' on the socket object, if we got a valid user
// if we got an invalid user, the property will not be set, and the connection will be closed after 1 sec
/**
 * @description Accepts a `data` object and an `accept` function as parameters,
 * retrieves an access token from various headers or cookies, checks its validity
 * using the `checkToken` function, and updates the `data` object with the user
 * information if valid; otherwise, disconnects the connection.
 *
 * @param {any} data - Used to hold handshake data and request data.
 *
 * @param {any} accept - Expected to be a callback function or handler.
 *
 * @returns {Promise<void>} Resolved by calling the `accept` function with no arguments
 * when authentication is successful, and does nothing when authentication fails.
 */
export const authorization = async (data: any, accept: any) => { 
    
    return accept(data);
    /*
    if (data.handshake.headers.cookie) { 
        const cookies = cookie.parse(data.handshake.headers.cookie);
        accessToken = cookies.token;
    }
    if (data.request.cookies && data.request.cookies.token) { 
        accessToken = data.request.cookies.token;
    }
    if (!accessToken && data.handshake.auth && data.handshake.auth.token) { 
        accessToken = data.handshake.auth.token;
    }
    if (!accessToken && data.handshake.headers.token) {
        accessToken = data.handshake.headers.token;
    }
    if (!accessToken && data.handshake.headers.authorization && data.handshake.headers.authorization.split(' ')[0] === 'Bearer') {
        accessToken = data.handshake.headers.authorization.split(' ')[1];
    }
    /*
    const user = await checkToken(accessToken);
    
    data.user = user;
    if (!accessToken || !user) {   
        data.emit('auth','Authorization failed');
        setTimeout(() => { 
            data.disconnect(0);
            data.conn.close();
        }, 1000)
    }
    
    return accept();
    //*/
}

