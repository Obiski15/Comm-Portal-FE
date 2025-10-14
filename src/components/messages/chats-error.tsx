"use client"

import { RotateCcw } from "lucide-react"

function ChatsError({ refetch }: { refetch: () => void }) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
        <p className="mb-4 text-sm text-gray-400">
          Could not load chats. Please try again.
        </p>
        <button
          onClick={refetch}
          className="flex h-10 items-center justify-center gap-2 rounded-full bg-gray-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-gray-600"
        >
          <RotateCcw />
          <span>Retry</span>
        </button>
      </div>
    </div>
  )
}

export default ChatsError
