"use client"

import { createContext, ReactNode, useCallback, useState } from "react"
import { io, Socket } from "socket.io-client"

interface ISocketContext {
  connectSocket: (data: { userId: string }) => void
  disconnectSocket: () => void
  socket: Socket | null
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const SocketProviderContext = createContext<ISocketContext>({
  connectSocket: () => {},
  disconnectSocket: () => {},
  socket: null,
})

function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)

  const connectSocket = useCallback(
    ({ userId }: { userId: string }) => {
      if (socket?.connected) return

      const s = io(baseUrl, {
        query: {
          userId,
          transports: ["websocket"],
        },
      })

      setSocket(s.connect())
    },
    [socket]
  )

  const disconnectSocket = useCallback(() => {
    if (socket?.connected) {
      socket.disconnect()
    }
  }, [socket])

  return (
    <SocketProviderContext.Provider
      value={{ connectSocket, disconnectSocket, socket }}
    >
      {children}
    </SocketProviderContext.Provider>
  )
}

export default SocketProvider
