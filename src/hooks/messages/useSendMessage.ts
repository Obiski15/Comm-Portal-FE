import { ISendMessage, MessageId } from "@/types"
import { useMutation } from "@tanstack/react-query"

import MessageService from "@/app/api/services/message.service"

export const useSendMessage = (id: MessageId) => {
  const {
    mutate: sendMessage,
    isPending: isSendingMessage,
    error,
  } = useMutation({
    mutationKey: ["message"],
    mutationFn: async (data: ISendMessage) =>
      await new MessageService().sendMessage(id, data),
  })

  return { sendMessage, isSendingMessage, error }
}
