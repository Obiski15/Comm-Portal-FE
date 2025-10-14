import { Skeleton } from "../ui/skeleton"

function LoadingAssignments() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-start gap-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-32" />
      </div>

      <div className="space-y-5">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    </div>
  )
}

export default LoadingAssignments
