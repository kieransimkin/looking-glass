import { Server } from 'socket.io'
import { onConnection } from '../../utils/websocket'

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server, {pingInterval: 3000})
    res.socket.server.io = io

    io.on('connection', onConnection);
  }
  res.end()
}

export default SocketHandler