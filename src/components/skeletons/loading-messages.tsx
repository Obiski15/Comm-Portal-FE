import { cn } from "@/lib/utils"

import { Skeleton } from "../ui/skeleton"

function LoadingMessages() {
  return (
    <div className="space-y-5 py-1">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i}>
          <Skeleton
            className={cn(
              "h-24 max-w-lg rounded-3xl",
              i % 2 === 0 ? "rounded-br-lg" : "rounded-bl-lg"
            )}
          />
        </div>
      ))}
    </div>
  )
}

export default LoadingMessages
