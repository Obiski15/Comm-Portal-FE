import { IError } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import AssignmentService from "@/app/api/services/assignment.service"

export const useEditAssignment = (assignmentId: string) => {
  const queryClient = useQueryClient()

  const {
    mutate: editAssignment,
    isPending: isEditing,
    error,
  } = useMutation({
    mutationKey: ["editAssignment"],
    mutationFn: async () =>
      await new AssignmentService().editAssignment({ assignmentId }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assignment"],
      })

      toast.success("Assignment Updated")
    },

    onError: error => toast.error((error as unknown as IError).error.message),
  })

  return { editAssignment, isEditing, error }
}
