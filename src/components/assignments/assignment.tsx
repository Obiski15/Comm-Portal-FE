"use client"

import NextLink from "next/link"
import { IError } from "@/types"
import { format } from "date-fns"
import { Calendar, ClipboardList, Download, Link } from "lucide-react"

import useAssignment from "@/hooks/assignment/useAssignment"

import NoAssignment from "../empty-states/no-assignment"
import Error from "../shared/ErrorComponent"
import LoadingAssignment from "../skeletons/loading-assignment"
import AssignmentDetailsDescription from "../students/assignments/assignment-details-description"
import SubmitAssignment from "./submit-assignment"

export default function Assignment({ assignmentId }: { assignmentId: string }) {
  const { assignment, isLoading, error } = useAssignment(assignmentId)

  return isLoading ? (
    <LoadingAssignment />
  ) : error ? (
    <div className="flex h-full items-center justify-center">
      <Error
        error={error.message ?? (error as unknown as IError).error.message}
      />
    </div>
  ) : !assignment?.data.assignment.length ? (
    <NoAssignment />
  ) : (
    <div className="w-full">
      <div className="space-y-6">
        <div className="rounded-lg bg-popover/50 p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-sm uppercase text-muted-foreground">
            <span>{assignment?.data.assignment?.[0]?.subject}</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight">
            {assignment?.data.assignment?.[0]?.title}
          </h1>
          <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar />
              <span>
                Due:{" "}
                {assignment?.data.assignment?.[0]?.dueDate &&
                  format(
                    new Date(assignment?.data.assignment?.[0]?.dueDate),
                    "yyyy-MM-dd"
                  )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link />
              <span>
                {assignment?.data.assignment?.[0]?.attachments?.length ?? 0}{" "}
                Attachment(s)
              </span>
            </div>
          </div>

          <AssignmentDetailsDescription assignmentId={assignmentId} />

          {!!assignment?.data.assignment?.[0]?.attachments?.length && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h2 className="mb-3 text-xl font-bold">Attachments</h2>
              {/* todo: map over attachments */}

              <div className="space-y-2">
                {assignment?.data.assignment?.[0]?.attachments?.map(
                  ({ fileName, url, fileType }) => (
                    <div
                      key={fileName}
                      className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-200 p-3 hover:bg-gray-100"
                    >
                      <div className="flex items-center justify-start gap-3">
                        <ClipboardList className="text-primary" />
                        <span className="font-medium text-popover">
                          {`${fileName}.${fileType}`}
                        </span>
                      </div>
                      <NextLink href={url} download>
                        <Download className="text-primary" />
                      </NextLink>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
        <div className="rounded-lg bg-popover/50 p-6 shadow-sm">
          {!assignment?.data.assignment?.[0]?.submissions?.length ? (
            <SubmitAssignment assignmentId={assignmentId} />
          ) : (
            // <>
            //   <h2 className="mb-4 text-xl font-bold">Teacher Feedback</h2>
            //   <div>
            //     <ListenTranslate
            //       description={
            //         assignment?.data.assignment?.[0]?.submissions?.[0]
            //           ?.feedback ?? ""
            //       }
            //     />
            //   </div>
            // </>

            "todo: your submission"
          )}
        </div>
      </div>
    </div>
  )
}
