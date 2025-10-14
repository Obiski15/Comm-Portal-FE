import { UsersRound } from "lucide-react"

function NoRecipientToChat() {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <div className="text-,muted-foreground flex flex-col items-center justify-center gap-4 text-center">
        <UsersRound />
        <p className="max-w-[400px] text-sm">
          No chats found. You might need to be assigned to a class or group to
          chat with others.
        </p>
      </div>
    </div>
  )
}

export default NoRecipientToChat
