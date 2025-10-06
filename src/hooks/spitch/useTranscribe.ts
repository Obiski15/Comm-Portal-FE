import { useMutation } from "@tanstack/react-query"

import { SpitchService } from "../../app/api/services/spitch.service"

export const useTranscribe = () => {
  const {
    mutate,
    isPending: isLoading,
    data,
  } = useMutation({
    mutationKey: ["tts"],
    mutationFn: ({ language }: { language: string }) =>
      new SpitchService().transcribe({ language, audio: new ArrayBuffer() }),
  })

  return { mutate, isLoading, data }
}
