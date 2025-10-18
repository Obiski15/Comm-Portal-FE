"use client"

import Image from "next/image"
import Link from "next/link"
import { Plus, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { useRecipientsToChat } from "@/hooks/messages/useRecipientsToChat"

import NoRecipientToChat from "../empty-states/no-recipients-to-chat"
import LoadingChats from "../skeletons/loading-chats"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import ChatsError from "./chats-error"

function NewMessage() {
  const { data: recipients, isLoading, error, refetch } = useRecipientsToChat()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex h-12 items-center justify-center gap-2 rounded-full px-6 font-bold">
          <Plus size={24} className="flex-shrink-0 font-bold" />
          <span>New Message</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="border-2">
        <div className="flex w-full flex-col">
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl font-bold">
              New Message
            </DialogTitle>
            <DialogDescription className="hidden">
              New Message
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col">
            <div className={cn("py-4", !isLoading && "border-b border-border")}>
              <div className="relative">
                <Search className="absolute left-2 top-2" />
                <Input
                  className="h-10 w-full rounded-full pl-12 pr-4"
                  placeholder="Search users or groups"
                />
              </div>
            </div>

            {isLoading ? (
              <LoadingChats />
            ) : error ? (
              <ChatsError refetch={refetch} />
            ) : !recipients?.data?.recipients ? (
              <NoRecipientToChat />
            ) : (
              <div className="no_scrollbar max-h-[300px] flex-1 overflow-y-scroll">
                <div className="space-y-1">
                  <div className="space-y-1">
                    <div className="mt-2 py-2 text-sm font-semibold text-muted-foreground">
                      Groups
                    </div>
                    <Link
                      className="flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-border/60"
                      href="#"
                    >
                      <div className="relative aspect-square size-10 overflow-hidden rounded-full">
                        <Image
                          src="/images/no-profile.jpg"
                          alt="profile"
                          className="object-cover"
                          fill
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">ClassName 7A Parents</p>
                        <p className="text-xs text-muted-foreground">
                          32 Members
                        </p>
                      </div>
                    </Link>
                  </div>

                  <div className="space-y-1">
                    <div className="mt-2 py-2 text-sm font-semibold text-muted-foreground">
                      Others
                    </div>
                    {recipients.data.recipients.map(
                      ({ _id, full_name, image, role }) => (
                        <Link
                          key={_id}
                          className="flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-border/60"
                          href="#"
                        >
                          <div className="relative aspect-square size-10 overflow-hidden rounded-full">
                            <Image
                              src={image ?? "/images/no-profile.jpg"}
                              alt="profile"
                              className="object-cover"
                              fill
                            />
                          </div>
                          <div className="flex-1 capitalize">
                            <p className="font-medium">{full_name}</p>
                            <p className="text-xs text-muted-foreground">
                              {role}
                            </p>
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NewMessage
