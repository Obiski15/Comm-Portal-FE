import { ISignup } from "@/types"
import { useMutation } from "@tanstack/react-query"

import AuthService from "@/app/api/services/auth.service"

export const useSignup = () => {
  const {
    mutate: signup,
    isPending: isSigningUp,
    error,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: ISignup) => new AuthService().signup(data),
  })

  return { signup, isSigningUp, error }
}
