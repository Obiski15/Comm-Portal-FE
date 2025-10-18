import { useRouter } from "next/navigation"
import { IError } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import AuthService from "@/app/api/services/auth.service"

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const {
    mutate: logout,
    isPending: isLoggingOut,
    error,
  } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => await new AuthService().logout(),

    onError: error => {
      toast.error(
        (error as unknown as IError).error.message || "Error logging out"
      )
    },

    onSuccess: () => {
      toast.success("Logged out successfully")
      router.push("/login")
      queryClient.clear()
    },
  })

  return { logout, isLoggingOut, error }
}
