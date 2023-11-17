import http from 'http';
import { Server } from "socket.io";
import cors from 'cors';
import * as websocket from '../utils/websocket'
const httpServer = http.createServer();

const io = new Server(httpServer, {
    cors: {
        origin: '*',
    }
});

io.on("connection", websocket.default.onConnection);
const PORT = process.env.SOCKET_PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});