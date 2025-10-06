import { IError } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import AssignmentService from "@/app/api/services/assignment.service"

export const useDeleteAssignment = (assignmentId: string) => {
  const queryClient = useQueryClient()

  const {
    mutate: deleteAssignment,
    isPending: isDeletingAssignment,
    error,
  } = useMutation({
    mutationKey: ["deleteAssignment", assignmentId],
    mutationFn: async () =>
      await new AssignmentService().deleteAssignment(assignmentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assignments"],
      })
    },

    onError: error => toast.error((error as unknown as IError).error.message),
  })

  return { isDeletingAssignment, deleteAssignment, error }
}
