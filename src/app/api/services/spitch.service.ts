import {
  ITranscribeRequest,
  ITranscribeResponse,
  ITranslateRequest,
  ITranslateResponse,
  ITTSRequest,
  ITTSResponse,
} from "@/types"

import BaseService from "./base.service"

export class SpitchService extends BaseService {
  constructor() {
    super("spitch")
  }

  async translate({ source, target, text }: ITranslateRequest) {
    return await this.post<ITranslateRequest, ITranslateResponse>(
      "/translate",
      { source, target, text }
    )
  }

  async transcribe({ language, audio }: ITranscribeRequest) {
    return await this.post<ITranscribeRequest, ITranscribeResponse>(
      "/transcribe",
      { language, audio }
    )
  }

  async generateSpeech({ text, language }: ITTSRequest) {
    return await this.post<ITTSRequest, ITTSResponse>("/text-speech", {
      text,
      language,
    })
  }
}
