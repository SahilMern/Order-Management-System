import { io } from 'socket.io-client'
import { backendUrl } from '../helper/BackendUrl'

const socket = io(`${backendUrl}`, {
  withCredentials: true,
  autoConnect: true
})

export default socket;