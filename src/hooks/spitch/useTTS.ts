import { useMutation } from "@tanstack/react-query"

import { SpitchService } from "../../app/api/services/spitch.service"

export const useTTs = () => {
  const {
    mutate,
    isPending: isLoading,
    data,
  } = useMutation({
    mutationKey: ["tts"],
    mutationFn: ({ text, language }: { text: string; language: string }) =>
      new SpitchService().generateSpeech({ text, language }),
  })

  return { mutate, isLoading, data }
}
