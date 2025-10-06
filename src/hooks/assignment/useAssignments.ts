import { useQuery } from "@tanstack/react-query"

import AssignmentService from "@/app/api/services/assignment.service"

const useAssignments = () => {
  const {
    data: assignments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => await new AssignmentService().getAssignments(),
  })

  return { assignments, isLoading, error }
}

export default useAssignments
