"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Message, MessageId } from "@/types"
import { Phone, Video } from "lucide-react"

import { cn } from "@/lib/utils"
import { useMessages } from "@/hooks/messages/useMessages"
import { useUser } from "@/hooks/user/useUser"
import { useSocket } from "@/hooks/useSocket"

import SendMessage from "./sendMessage"

function Messages({ messageId }: { messageId: MessageId }) {
  const [chatMessages, setChatMessages] = useState<Message[] | undefined>(
    undefined
  )
  const { messages, isLoadingMessages, error } = useMessages(messageId)
  const [isUserActive, setIsUserActive] = useState<boolean>(false)
  const chatsContainerRef = useRef<HTMLDivElement | null>(null)
  const { data: user } = useUser()
  const { socket } = useSocket()
  const router = useRouter()

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") {
        router.push("/student/messages")
      }
    }

    document.addEventListener("keydown", handler)

    return () => document.removeEventListener("keydown", handler)
  }, [router])

  useEffect(() => {
    if (!socket) return

    socket?.on("newMessage", (newMessage: Message) => {
      setChatMessages(prev => {
        if (prev) {
          // todo: if senderId === messageId
          return [...prev, newMessage]
        }
      })
    })

    socket?.on("activeUsers", (activeUsers: Array<string>) => {
      setIsUserActive(activeUsers.includes(messageId.split("-")[1]))
    })

    return () => {
      socket?.off("activeUsers")
      socket?.off("newMessage")
    }
  }, [socket, messageId])

  useEffect(() => {
    setChatMessages(messages?.data.messages)
  }, [messages])

  useEffect(() => {
    if (chatMessages) {
      chatsContainerRef.current?.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      })
    }
  }, [chatMessages])

  return error ? (
    "todo: error"
  ) : (
    <div className="flex w-2/3 flex-col rounded-2xl bg-card p-6">
      <div className="mb-6 flex items-center gap-4 border-b border-border pb-4">
        <div className="relative aspect-square size-14 overflow-hidden rounded-full bg-cover bg-center bg-no-repeat">
          <Image
            src={messages?.data.recipientInfo.image ?? "/images/no-profile.jpg"}
            alt={messages?.data.recipientInfo.name ?? "user"}
            className="object-cover"
            fill
          />
        </div>
        <div>
          <h3 className="text-xl font-bold">
            {isLoadingMessages
              ? "todo: Loading.."
              : messages?.data.recipientInfo.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isUserActive ? "Active now" : "Offline"}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button className="rounded-full p-2 transition-colors hover:bg-muted">
            <Phone />
          </button>
          <button className="rounded-full p-2 transition-colors hover:bg-muted">
            <Video />
          </button>
        </div>
      </div>

      {isLoadingMessages ? (
        "todo: Loading..."
      ) : (
        <div
          ref={chatsContainerRef}
          className="-mr-4 mb-6 max-h-[300px] flex-1 space-y-6 overflow-y-scroll pr-4"
        >
          {!chatMessages?.length
            ? "todo: No Chat history"
            : chatMessages?.map(({ sender, content }, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-3",
                    sender === user?.data.user?._id
                      ? "justify-end"
                      : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-lg whitespace-pre-line rounded-3xl",
                      sender === user?.data.user?._id
                        ? "rounded-br-lg bg-primary p-4 text-gray-900"
                        : "rounded-bl-lg bg-muted p-4"
                    )}
                  >
                    <p>{content}</p>
                  </div>
                </div>
              ))}
        </div>
      )}
      <SendMessage messageId={messageId} setChatMessages={setChatMessages} />
    </div>
  )
}

export default Messages
