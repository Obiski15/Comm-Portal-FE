"use client"

import { LogOut } from "lucide-react"

import { useLogout } from "@/hooks/auth/useLogout"

function Logout() {
  const { logout, isLoggingOut } = useLogout()

  return (
    <button
      disabled={isLoggingOut}
      className="flex w-full items-center gap-3 rounded-full px-3 py-2.5 text-muted-foreground transition-colors hover:bg-muted/50"
      onClick={() => logout()}
    >
      <LogOut />
      <p className="text-sm font-medium">Logout</p>
    </button>
  )
}

export default Logout
