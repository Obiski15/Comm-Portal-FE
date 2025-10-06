import { MessageId } from "@/types"

import Messages from "@/components/messages/Messages"

interface IProps {
  params: Promise<{ [key: string]: string }>
}

async function Message({ params }: IProps) {
  const { message } = await params

  return <Messages messageId={message as MessageId} />
}

export default Message
