import { ILogin } from "@/types"
import { useMutation } from "@tanstack/react-query"

import AuthService from "@/app/api/services/auth.service"

export const useLogin = () => {
  const {
    mutate: login,
    isPending: isLoggingIn,
    error,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: ILogin) => await new AuthService().login(data),
  })

  return { login, isLoggingIn, error }
}
