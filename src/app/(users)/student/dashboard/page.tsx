import { Metadata } from "next"
import Link from "next/link"
import { Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default function StudentPage() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              Welcome back, Emily! Here&apos;s an overview of your academic
              progress and upcoming tasks.
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold">Upcoming Assignments</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-border/50 bg-popover/50">
              <table className="w-full">
                <thead className="bg-gray-900/40">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Assignment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted/50">
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      Math Worksheet 3
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                      2024-04-15
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-yellow-600/20 px-2.5 py-0.5 text-xs font-medium text-yellow-400">
                        Pending
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <a
                        className="text-primary hover:text-primary/80"
                        href="#"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      History Essay Outline
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                      2024-04-18
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-blue-600/20 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                        In Progress
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <a
                        className="text-primary hover:text-primary/80"
                        href="#"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      Science Project Proposal
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                      2024-04-22
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-red-600/20 px-2.5 py-0.5 text-xs font-medium text-red-400">
                        Not Started
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <a
                        className="text-primary hover:text-primary/80"
                        href="#"
                      >
                        Start
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h2 className="mt-8 text-xl font-bold">Recent Grades</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-border/50 bg-popover/50">
              <table className="w-full">
                <thead className="bg-gray-900/40">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Assignment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Feedback
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted/50">
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      Mathematics
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                      Worksheet 2
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">92%</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <Link
                        className="text-primary hover:text-primary/80"
                        href="/student/grades/1"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold">Messages</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-popover/50 p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Mail />
                </div>
                <div>
                  <p className="font-medium">New Math Assignment</p>
                  <p className="text-sm text-muted-foreground">
                    From: Mr. Davison
                  </p>
                  <p className="mt-1 text-xs text-gray-500">2024-04-10</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-popover/50 p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Mail />
                </div>
                <div>
                  <p className="font-medium">History Essay Feedback</p>
                  <p className="text-sm text-muted-foreground">
                    From: Mrs. Gable
                  </p>
                  <p className="mt-1 text-xs text-gray-500">2024-04-08</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-popover/50 p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Mail />
                </div>
                <div>
                  <p className="font-medium">Science Project Update</p>
                  <p className="text-sm text-muted-foreground">
                    From: Dr. Anya
                  </p>
                  <p className="mt-1 text-xs text-gray-500">2024-04-05</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
