import { Skeleton } from "../ui/skeleton"

function LoadingChats() {
  return (
    <div className="space-y-5 py-1">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="flex items-start justify-start gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-2 w-1/2" />
            <Skeleton className="h-5" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingChats
