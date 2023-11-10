import { Server } from 'Socket.IO'
import { onConnection } from '../../utils/websocket'

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', onConnection);
  }
  res.end()
}

export default SocketHandler