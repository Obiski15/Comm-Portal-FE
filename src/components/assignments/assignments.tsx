"use client"

import Link from "next/link"
import { format } from "date-fns"

import useAssignments from "@/hooks/assignment/useAssignments"

function Assignments() {
  const { assignments, isLoading, error } = useAssignments()

  return isLoading ? (
    "todo: loading"
  ) : error ? (
    "todo: error"
  ) : (
    <>
      <div className="mb-6 border-b border-border/50">
        <div className="flex gap-8">
          <Link
            className="border-b-2 border-transparent py-3 font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-muted"
            href="#"
          >
            All
          </Link>
          <Link className="border-b-2 border-primary py-3 font-bold" href="#">
            Submitted
          </Link>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl bg-popover/50">
        <table className="w-full text-left">
          <thead className="bg-gray-900/40">
            <tr className="border-b border-border/50">
              <th className="p-4 text-sm font-semibold capitalize text-muted-foreground">
                Title
              </th>
              <th className="p-4 text-sm font-semibold text-muted-foreground">
                Due Date
              </th>
              <th className="p-4 text-sm font-semibold text-muted-foreground">
                Status
              </th>
              <th className="p-4 text-sm font-semibold text-muted-foreground"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-muted/50">
            {assignments?.data.assignments.map(
              ({ title, _id, dueDate, submissions }) => (
                <tr
                  key={_id}
                  className="border-b border-border/50 transition-colors hover:bg-primary/10"
                >
                  <td className="p-4 font-medium capitalize">{title}</td>
                  <td className="p-4 text-muted-foreground">
                    {format(new Date(dueDate), "yyyy-MM-dd")}
                  </td>
                  <td className="p-4">
                    <span className="rounded-full bg-[#122118] px-3 py-1 text-sm text-primary">
                      {!!submissions.length ? "Submitted" : "Pending"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      className="font-semibold text-primary hover:underline"
                      href={`/assignments/${_id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Assignments
