"use client"

import Link from "next/link"
import { Search } from "lucide-react"

import { useChats } from "@/hooks/messages/useChats"

import LoadingChats from "../skeletons/loading-chats"
import { Input } from "../ui/input"
import ChatsError from "./chats-error"

function Sidebar() {
  const { isLoadingChats, error, refetch } = useChats()

  return (
    <div className="flex w-1/3 flex-col rounded-2xl bg-card p-6">
      <div className="mb-6">
        <div className="flex border-b border-border">
          <button className="flex-1 border-b-2 border-primary py-3 text-center font-semibold">
            Direct
          </button>
          <button className="hover: flex-1 py-3 text-center text-muted-foreground transition-colors">
            Group
          </button>
          <button className="hover: flex-1 py-3 text-center text-muted-foreground transition-colors">
            Announcements
          </button>
        </div>
      </div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3" />
        <Input
          className="h-12 w-full rounded-full bg-popover/60 pl-12 pr-4 text-gray-300"
          placeholder="Search messages"
        />
      </div>

      <div className="-mr-3 flex-1 overflow-y-auto">
        {isLoadingChats ? (
          <LoadingChats />
        ) : error ? (
          <ChatsError refetch={refetch} />
        ) : (
          <div className="space-y-2">
            {Array.from({ length: 3 }, (_, i) => (
              <Link
                key={i}
                className="flex items-center gap-4 rounded-xl bg-popover/80 p-3"
                href={`/messages/${"user-68ce1b5550c15b73d3506bdc"}`}
              >
                <div className="aspect-square size-14 rounded-full bg-cover bg-center bg-no-repeat"></div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <p className="font-bold">Emily Carter</p>
                    <p className="text-xs text-muted-foreground">2:45 PM</p>
                  </div>
                  <p className="line-clamp-1 text-sm text-gray-300">
                    Hi, how are you doing? Hi,
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
