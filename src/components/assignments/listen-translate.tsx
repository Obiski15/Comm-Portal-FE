"use client"

import { useEffect, useRef, useState } from "react"
import { Languages, Volume2 } from "lucide-react"

import { base64ToArrayBuffer, playAudio } from "@/lib/utils"
import { useTranslate } from "@/hooks/spitch/useTranslate"
import { useTTs } from "@/hooks/spitch/useTTS"

import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"

function ListenTranslate({ description }: { description: string }) {
  const textAreaRef = useRef<null | HTMLTextAreaElement>(null)
  const { mutate: tts, isLoading: processingTTS } = useTTs()
  const { translate, isTranslating } = useTranslate()
  const [value, setValue] = useState(description)

  useEffect(() => {
    const textArea = textAreaRef.current

    if (textArea) {
      textArea.style.height = `${textArea!.scrollHeight}px`
    }
  }, [description])

  return (
    <>
      <Textarea
        ref={textAreaRef}
        value={value}
        className="no_scrollbar mb-4 max-h-[300px] resize-none border-none p-0 text-justify leading-relaxed text-muted-foreground transition-all duration-150 focus-visible:ring-0 focus-visible:ring-transparent"
        readOnly
      />
      <div className="flex gap-2">
        <Button
          className="flex items-center gap-2"
          variant="primary"
          onClick={() => {
            tts(
              { text: description, language: "en" },
              {
                onSuccess: data => {
                  playAudio(base64ToArrayBuffer(data.data.base64))
                },
              }
            )
          }}
          disabled={processingTTS}
        >
          <Volume2 />
          <span>Listen</span>
        </Button>
        <Button
          className="flex items-center gap-2"
          variant="primary"
          onClick={() => {
            translate(
              { text: description, source: "en", target: "ha" },
              {
                onSuccess: data => {
                  setValue(data.data.text)
                },
              }
            )
          }}
          disabled={isTranslating}
        >
          <Languages />
          <span>Translate</span>
        </Button>
      </div>{" "}
    </>
  )
}

export default ListenTranslate
