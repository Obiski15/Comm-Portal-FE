import { Metadata } from "next"
import Link from "next/link"
import { Download } from "lucide-react"

import GradesTable from "@/components/students/grades/gradesTable"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Grades",
}

function page() {
  return (
    <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Grades</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View your academic performance across all subjects and
              assignments.
            </p>
          </div>

          <Button className="flex items-center gap-2">
            <Download />
            Export
          </Button>
        </div>

        <div className="w-full">
          <div className="border-b border-slate-200">
            <nav aria-label="Tabs" className="-mb-px flex space-x-8">
              <Link
                aria-current="page"
                className="whitespace-nowrap border-b-2 border-primary px-1 py-4 text-sm font-medium text-primary"
                href="#"
              >
                All Subjects
              </Link>
              {/* <Link
                className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-muted"
                href="#"
              >
                By Subject
              </Link> */}
            </nav>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-popover/50 shadow-sm">
          <GradesTable />
        </div>
      </div>
    </main>
  )
}

export default page
