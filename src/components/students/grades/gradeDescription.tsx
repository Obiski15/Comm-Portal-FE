"use client"

import { useEffect, useRef, useState } from "react"
import { Languages, Volume2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { base64ToArrayBuffer, playAudio } from "@/lib/utils"
import { useTranslate } from "@/hooks/spitch/useTranslate"
import { useTTs } from "@/hooks/spitch/useTTS"

const dummyDescripion =
  "Great effort, Emily! You showed a strong understanding of the core concepts. Focus on improving accuracy in calculations for future quizzes. You can use the practice problems in the textbook to hone your skills."

function GradeDescription() {
  const [description, setDescription] = useState(dummyDescripion)
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
    <section>
      <h2 className="mb-4 text-xl font-bold">Teacher Feedback</h2>
      <div className="rounded-lg border border-border/50 bg-popover/50 p-6">
        <Textarea
          ref={textAreaRef}
          value={description}
          className="no_scrollbar mb-4 max-h-[300px] resize-none p-0 text-justify leading-relaxed text-muted-foreground transition-all duration-150 focus-visible:ring-0"
          readOnly
        />
        <div className="flex items-center gap-4">
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
    </section>
  )
}

export default GradeDescription
