import { MessageId } from "@/types"
import { useQuery } from "@tanstack/react-query"

import MessageService from "@/app/api/services/message.service"

export const useMessages = (id: MessageId) => {
  const {
    data: messages,
    isLoading: isLoadingMessages,
    error,
    refetch,
  } = useQuery({
    queryKey: ["messages", id],
    queryFn: async () => await new MessageService().getMessages(id),

    enabled: !!id,
  })

  return { messages, isLoadingMessages, error, refetch }
}
