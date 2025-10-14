import { useQuery } from "@tanstack/react-query"

import MessageService from "@/app/api/services/message.service"

export const useRecipientsToChat = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["recipientsToChat"],
    queryFn: async () => await new MessageService().getRecipientsToChat(),
  })

  return { data, isLoading, error, refetch }
}
