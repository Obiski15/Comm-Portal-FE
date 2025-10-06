import { useQuery } from "@tanstack/react-query"

import UserService from "@/app/api/services/user.service"

export const useUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await new UserService().getUser(),
  })

  return { data, isLoading, error }
}
