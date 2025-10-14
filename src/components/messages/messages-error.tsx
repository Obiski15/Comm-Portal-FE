"use client"

import { MessageId } from "@/types"
import { Info, RotateCcw } from "lucide-react"

import { useMessages } from "@/hooks/messages/useMessages"

function MessagesError({ messageId }: { messageId: MessageId }) {
  const { refetch } = useMessages(messageId)

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <Info />
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-xl font-bold text-foreground">
            Chat Messages Failed to Load
          </h1>
          <p className="max-w-[300px] text-sm text-gray-300">
            We couldn&apos;t retrieve your past chat messages right now. Please
            try again!
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto">
          <button
            onClick={() => refetch()}
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-5 text-sm font-bold leading-normal tracking-[0.015em] text-white"
          >
            <RotateCcw /> <span className="truncate"> Retry</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessagesError
