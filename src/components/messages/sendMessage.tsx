"use client"

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react"
import Image from "next/image"
import { Message, MessageId } from "@/types"
import {
  AudioLines,
  Languages,
  Image as LucideImage,
  Mic,
  Send,
  X,
} from "lucide-react"

import { useMessages } from "@/hooks/messages/useMessages"
import { useSendMessage } from "@/hooks/messages/useSendMessage"
import { useTranslate } from "@/hooks/spitch/useTranslate"
import { useUser } from "@/hooks/user/useUser"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"

function SendMessage({
  messageId,
  setChatMessages,
}: {
  messageId: MessageId
  setChatMessages: Dispatch<SetStateAction<Message[] | undefined>>
}) {
  const [images, setImages] = useState<FileList | undefined>(undefined)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const imageRef = useRef<HTMLInputElement | null>(null)
  const [language, setLanguage] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const { isLoadingMessages } = useMessages(messageId)
  const { data: user } = useUser()

  const { translate, isTranslating } = useTranslate()
  const { sendMessage } = useSendMessage(messageId)

  const handleLanguageChange = (value: string) => {
    const [source, target] = value.split("-")
    setLanguage(value)
    setMessage(target)

    translate({ source, target, text: message })
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const previews = Array.from(files).map(file => URL.createObjectURL(file))
      setImages(files)
      setPreviewImages(previews)
    }
  }

  const handleSendMessage = useCallback(() => {
    if (!message && !images) return

    setChatMessages(prev => {
      const data = {
        _id: `id-${Date.now()}`,
        sender: user?.data.user?._id,
        content: message,
        images: previewImages,
      }
      return [...(prev ?? []), data]
    })
    sendMessage({ content: message, images })

    // clear input and images
    setImages(undefined)
    setPreviewImages([])
    setMessage("")
  }, [message, images, previewImages])

  const handleRemoveImage = (imageIndex: number) => {
    // remove preview
    setPreviewImages(prev => {
      return prev.filter((_, i) => i !== imageIndex)
    })

    // remove from file list
    setImages(prev => {
      if (!prev) return prev

      const dataTransfer = new DataTransfer()

      Array.from(prev).map((file, i) => {
        if (i !== imageIndex) {
          dataTransfer.items.add(file)
        }
      })

      return dataTransfer.files
    })
  }

  return (
    <div>
      <div className="no_scrollbar flex items-start justify-start gap-1 overflow-x-scroll">
        {previewImages.map((image, i) => (
          <div key={i} className="relative aspect-square size-20">
            <Image
              src={image}
              alt="preview-image"
              fill
              key={i}
              className="object-cover"
            />
            <button
              onClick={() => handleRemoveImage(i)}
              className="absolute right-0.5 top-0.5 cursor-pointer rounded-full"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-auto border-t border-border pt-4">
        <div className="flex items-center justify-between gap-2">
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Select
              onValueChange={handleLanguageChange}
              defaultValue={language}
            >
              <SelectTrigger className="w-fit border-none bg-transparent p-0 focus:ring-transparent [&>svg]:hidden">
                <div className="flex items-center gap-1 rounded-full bg-blue-500/20 p-2 text-blue-400">
                  <Languages />
                  <SelectValue placeholder="Translate Text?" />
                </div>
                <SelectContent>
                  <SelectItem value="en-yo">English to Yoruba</SelectItem>
                  <SelectItem value="en-ig">English to Igbo</SelectItem>
                  <SelectItem value="e-ha">English to Hausa</SelectItem>
                </SelectContent>
              </SelectTrigger>
            </Select>

            <div className="flex items-center gap-1 rounded-full bg-green-500/20 p-2 text-green-400">
              <AudioLines />
              <span>Speech-to-Text Active</span>
            </div>
          </div>

          <button
            disabled={isLoadingMessages}
            onClick={() => {
              imageRef.current?.click()
            }}
          >
            <LucideImage className="size-5" />
          </button>
        </div>

        <div className="relative">
          <Textarea
            value={message}
            onChange={e => {
              setMessage(e.target.value)
            }}
            className="no_scrollbar h-24 resize-none rounded-2xl bg-popover/60 p-4 pr-32 text-gray-300"
            placeholder="Type your message..."
            disabled={isTranslating || isLoadingMessages}
          />

          <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
            <button
              disabled={isLoadingMessages}
              className="rounded-full bg-muted p-3 transition-colors hover:bg-gray-600"
            >
              <Mic />
            </button>

            <button
              onClick={handleSendMessage}
              disabled={isLoadingMessages}
              className="rounded-full bg-primary p-3 text-gray-900 transition-opacity hover:opacity-90"
            >
              <Send />
            </button>

            <input
              ref={imageRef}
              onChange={handleImageChange}
              hidden
              type="file"
              accept="image/*"
              multiple
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendMessage
