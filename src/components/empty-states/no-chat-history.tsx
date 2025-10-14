import { MessageSquareText } from "lucide-react"

function NotChatHistory() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MessageSquareText />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">No Chat History</h1>
          <p className="max-w-[400px] text-sm text-gray-300">
            It looks like this conversation is just getting started. Be the
            first to send a message and get the ball rolling!
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotChatHistory
