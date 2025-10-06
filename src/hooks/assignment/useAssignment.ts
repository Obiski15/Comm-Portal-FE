import { useQuery } from "@tanstack/react-query"

import AssignmentService from "@/app/api/services/assignment.service"

const useAssignment = (assignmentId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["assignment", assignmentId],
    queryFn: async () =>
      await new AssignmentService().getAssignment(assignmentId),
  })

  return { data, isLoading, error }
}

export default useAssignment
