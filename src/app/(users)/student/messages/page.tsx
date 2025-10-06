import { Metadata } from "next"
import { MessageSquareText } from "lucide-react"

export const metadata: Metadata = {
  title: "Messages",
}

export default function StudentMessagesPage() {
  return (
    <div className="flex w-2/3 flex-col items-center justify-center rounded-2xl bg-card/50 p-6 text-center">
      <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-card/60">
        <MessageSquareText size={48} className="text-primary" />
      </div>
      <h3 className="mb-2 text-2xl font-bold">Your Messages</h3>
      <p className="max-w-sm text-muted-foreground">
        Select a conversation from the list on the left or start a new one to
        begin chatting.
      </p>
    </div>
  )
}
