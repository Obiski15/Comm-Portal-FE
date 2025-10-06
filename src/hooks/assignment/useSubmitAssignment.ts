import { IError, ISubmitAssignment } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import AssignmentService from "@/app/api/services/assignment.service"

const useSubmitAssignment = () => {
  const queryClient = useQueryClient()

  const {
    mutate: submitAssignment,
    isPending: isSubmitting,
    error,
  } = useMutation({
    mutationKey: ["assignments"],
    mutationFn: async (data: ISubmitAssignment) =>
      await new AssignmentService().submitAssignment(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignment", "assignments"] })
      toast.success("Assignment Recorded")
    },

    onError: error => toast.error((error as unknown as IError).error.message),
  })

  return { submitAssignment, isSubmitting, error }
}

export default useSubmitAssignment
