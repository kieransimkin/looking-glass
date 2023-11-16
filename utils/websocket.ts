import cookie from "cookie"

import { createClient } from 'redis';


let usersConnected=0;
setInterval(() => { 
    console.log(usersConnected + ' web socket users currently connected');
}, 60000);

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
    const disconnect = () => { 
        console.log('Websocket disconnect id# '+socket.id);
        usersConnected--;
        socket.disconnect(0);
        socket.conn.close();
        client.unsubscribe();
        client.quit();
    }
    const hangup = () => { 
        socket.disconnect();
    }
    socket.on('disconnect', disconnect);
    client.on('error', (err: any) => console.log('Redis Client Error', err));
    client.on('ready', () => {
        console.log('Websocket connection id# '+socket.id);

        client.subscribe('block', (message: any) => {
            message = JSON.parse(message);
            socket.emit('block', message);
        });
        client.subscribe('mint', (message: any) => { 
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

