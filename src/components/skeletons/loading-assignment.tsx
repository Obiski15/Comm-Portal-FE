import { Skeleton } from "../ui/skeleton"

function LoadingAssignment() {
  return (
    <div className="w-full flex-1 space-y-5">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-44" />

      <div className="flex items-start justify-between gap-4">
        <Skeleton className="h-32 flex-1" />
        <Skeleton className="h-32 flex-1" />
        <Skeleton className="h-32 flex-1" />
        <Skeleton className="h-32 flex-1" />
      </div>

      <Skeleton className="h-20" />
    </div>
  )
}

export default LoadingAssignment
