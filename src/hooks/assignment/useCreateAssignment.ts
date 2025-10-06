import { ICreateAssignment, IError } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import AssignmentService from "@/app/api/services/assignment.service"

const useCreateAssignment = () => {
  const queryClient = useQueryClient()

  const {
    data,
    isPending: isCreatingAssignment,
    error,
  } = useMutation({
    mutationKey: ["createAssignment"],
    mutationFn: async (data: ICreateAssignment) =>
      await new AssignmentService().createAssignment(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assignments"],
      })
      toast.success("Assignment Created")
    },
    onError: error => toast.error((error as unknown as IError).error.message),
  })

  return { data, isCreatingAssignment, error }
}

export default useCreateAssignment
