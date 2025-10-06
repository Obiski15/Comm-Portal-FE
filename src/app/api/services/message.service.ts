import { IMessages, IRecipientsToChat, ISendMessage } from "@/types"

import BaseService from "./base.service"

export default class MessageService extends BaseService {
  constructor() {
    super("messages")
  }

  async sendMessage(id: string, data: ISendMessage) {
    const formdata = new FormData()

    Object.entries(data).map(([key, value]) => {
      if (value === undefined) return

      if (value instanceof FileList) {
        Array.from(value).map(v => formdata.append("image", v))
      } else {
        formdata.append(key, value as string)
      }
    })

    return await this.post<FormData, unknown>(`message/${id}`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  async getMessages(id: string) {
    return await this.get<IMessages>(`/message/${id}`)
  }

  async getChats() {
    return await this.get("/chats")
  }

  async getRecipientsToChat() {
    return await this.get<IRecipientsToChat>("/recipients")
  }
}
