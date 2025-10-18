"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserRole } from "@/types"
import { Settings } from "lucide-react"

import { USER_SIDEBAR } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useUser } from "@/hooks/user/useUser"

import Logout from "../auth/Logout"
import { Skeleton } from "../ui/skeleton"

export default function Sidebar() {
  const { data: user, isLoading, error } = useUser()

  const pathname = usePathname()

  return (
    <div className="w-80 flex-shrink-0 border-r border-border/50 bg-background">
      <div className="flex h-full flex-col p-4">
        {isLoading || error ? (
          <div className="flex items-center justify-start gap-3">
            <Skeleton className="size-10 rounded-full" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-1/4" />
              <Skeleton className="h-3" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-2">
            <div className="relative aspect-square size-10 overflow-hidden rounded-full">
              <Image
                className="object-cover"
                src={user?.data.user?.image ?? "/images/no-profile.jpg"}
                alt={user?.data.user?.full_name ?? "user"}
                fill
              />
            </div>
            <h1 className="text-base font-medium leading-normal">
              {user?.data.user?.full_name ?? "User"}
            </h1>
          </div>
        )}
        <div className="mt-8 flex flex-col gap-2">
          {USER_SIDEBAR[user?.data.user?.role as UserRole].map(
            ({ Icon, name, path: route }, i) => (
              <Link
                key={i}
                className={cn(
                  "flex items-center gap-3 rounded-full px-3 py-2.5 transition-colors",
                  pathname.startsWith(route)
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-muted/50 hover:text-muted-foreground"
                )}
                href={route}
              >
                <Icon />
                <p className="text-sm font-medium capitalize">{name}</p>
              </Link>
            )
          )}
        </div>
        <div className="mt-auto">
          <Link
            className="hover: flex items-center gap-3 rounded-full px-3 py-2.5 text-muted-foreground transition-colors hover:bg-muted/50"
            href="#"
          >
            <Settings />
            <p className="text-sm font-medium">Settings</p>
          </Link>
          <Logout />
        </div>
      </div>
    </div>
  )
}
