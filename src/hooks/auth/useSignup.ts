import { ISignup } from "@/types"
import { useMutation } from "@tanstack/react-query"

import AuthService from "@/app/api/services/auth.service"

export const useSignup = () => {
  const {
    mutate: signup,
    isPending: isSigningUp,
    error,
  } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: ISignup) => await new AuthService().signup(data),
  })

  return { signup, isSigningUp, error }
}
