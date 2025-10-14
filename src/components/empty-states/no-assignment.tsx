import Link from "next/link"
import { Search } from "lucide-react"

function NoAssignment() {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <Search className="text-primary" size={48} />
        <div className="flex max-w-[480px] flex-col items-center gap-2">
          <p className="font-display max-w-[480px] text-center text-2xl font-bold leading-tight tracking-[-0.015em] text-white">
            Assignment Not Found
          </p>
          <p className="font-display max-w-[480px] text-center text-base font-normal leading-normal text-[#9abcb0]">
            The assignment you are looking for could not be found. It might have
            been moved, deleted, or the link you followed was incorrect.
          </p>
        </div>

        <div className="flex w-full justify-center">
          <div className="flex w-full max-w-[480px] flex-col justify-center gap-3 px-4 py-3 sm:flex-row">
            {/* <Button
              onClick={() => router.push("/assignments")}
              className="h-12 font-bold tracking-[0.015em]"
            >
              Go to Assignments List
            </Button>

            <Button
              onClick={() => router.push("/dashboard")}
              variant="secondary"
              className="h-12 font-bold tracking-[0.015em]"
            >
              Go to Dashboard
            </Button> */}

            <Link
              href="/assignments"
              className="flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-background transition-transform hover:scale-105 sm:w-auto"
            >
              Go to Assignments List
            </Link>

            <Link
              href="/dashboard"
              className="flex h-12 w-full items-center justify-center rounded-full px-6 text-sm font-bold text-foreground/60 transition-colors hover:bg-foreground/5 sm:w-auto"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoAssignment
