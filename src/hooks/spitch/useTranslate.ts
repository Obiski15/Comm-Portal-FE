import { useMutation } from "@tanstack/react-query"

import { SpitchService } from "../../app/api/services/spitch.service"

export const useTranslate = () => {
  const {
    mutate: translate,
    isPending: isTranslating,
    error,
  } = useMutation({
    mutationKey: ["tts"],
    mutationFn: ({
      text,
      source,
      target,
    }: {
      text: string
      source: string
      target: string
    }) => new SpitchService().translate({ text, source, target }),
  })

  return { translate, isTranslating, error }
}
