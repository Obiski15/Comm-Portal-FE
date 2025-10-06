import { useContext } from "react"

import { SocketProviderContext } from "@/providers/Socket.provider"

export const useSocket = () => {
  const socketContext = useContext(SocketProviderContext)

  if (!socketContext)
    throw new Error(
      "You are trying to access socket's context outside its provider"
    )

  return socketContext
}
