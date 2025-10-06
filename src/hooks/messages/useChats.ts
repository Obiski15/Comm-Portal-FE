import { useQuery } from "@tanstack/react-query"

import MessageService from "@/app/api/services/message.service"

export const useChats = () => {
  const {
    data: chats,
    isLoading: isLoadingChats,
    error,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => await new MessageService().getChats(),
  })

  return { chats, isLoadingChats, error }
}
