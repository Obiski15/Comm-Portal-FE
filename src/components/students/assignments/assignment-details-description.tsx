"use client"

import ListenTranslate from "@/components/assignments/listen-translate"

import useAssignment from "@/hooks/assignment/useAssignment"

function AssignmentDetailsDescription({
  assignmentId,
}: {
  assignmentId: string
}) {
  const { assignment } = useAssignment(assignmentId)

  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="mb-3 text-xl font-bold">Description</h2>

      <ListenTranslate
        description={assignment?.data?.assignment[0]?.description ?? ""}
      />
    </div>
  )
}

export default AssignmentDetailsDescription
