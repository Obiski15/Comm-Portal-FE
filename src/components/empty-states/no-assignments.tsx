import { GraduationCap } from "lucide-react"

function NoAssignments() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <GraduationCap size={48} className="text-primary" />
        </div>
        <h1 className="mb-2 text-2xl font-bold">No Assignments Yet</h1>
        <p className="mb-6 max-w-[480px] text-muted-foreground">
          It looks like there are no assignments available at the moment. Check
          back later.
        </p>
      </div>
    </div>
  )
}

export default NoAssignments
