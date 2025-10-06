"use client"

import { useEffect, useRef, useState } from "react"
import { Languages, Volume2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { base64ToArrayBuffer, playAudio } from "@/lib/utils"
import { useTranslate } from "@/hooks/spitch/useTranslate"
import { useTTs } from "@/hooks/spitch/useTTS"

const dummyDescription = "my name is obi"

function AssignmentDetailsDescription() {
  const [description, setDescription] = useState(dummyDescription)
  const textAreaRef = useRef<null | HTMLTextAreaElement>(null)
  const { translate, isTranslating } = useTranslate()
  const { mutate: tts, isLoading: processingTTS } = useTTs()

  useEffect(() => {
    const textArea = textAreaRef.current

    if (textArea) {
      textArea!.style.height = `${textArea!.scrollHeight}px`
    }
  }, [description])

  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="mb-3 text-xl font-bold">Description</h2>
      <Textarea
        ref={textAreaRef}
        value={description}
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
                  setDescription(data.data.text)
                },
              }
            )
          }}
          disabled={isTranslating}
        >
          <Languages />
          <span>Translate</span>
        </Button>
      </div>
    </div>
  )
}

export default AssignmentDetailsDescription
