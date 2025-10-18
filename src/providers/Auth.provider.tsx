"use client"

import { createContext, ReactNode, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { IError, User } from "@/types"

import Loading from "@/components/shared/loading"

import { useUser } from "@/hooks/user/useUser"
import { useSocket } from "@/hooks/useSocket"

interface IAuth {
  user: User | null
}

const AuthProviderContext = createContext<IAuth>({
  user: null,
})

function AuthProvider({ children }: { children: ReactNode }) {
  const { connectSocket, disconnectSocket } = useSocket()
  const { data, isLoading, error } = useUser()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const user = data?.data.user

    if (error || (!isLoading && !user)) {
      disconnectSocket()

      // check error status code and redirect or throw new error based on that
      const err = error as unknown as IError

      if (`${err.statusCode}`.startsWith("5"))
        throw new Error(err.error?.message)

      router.push("/login")
    }

    if (user) {
      // connect socket
      connectSocket({ userId: user?._id })
    }
  }, [error, data])

  if (isLoading) return <Loading />

  if (!data?.data?.user || !(pathname.split("/")[1] === data?.data?.user?.role))
    return

  return (
    <AuthProviderContext.Provider value={{ user: data!.data.user }}>
      {children}
    </AuthProviderContext.Provider>
  )
}

export default AuthProvider
