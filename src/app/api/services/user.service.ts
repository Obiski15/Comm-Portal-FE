import { IUser } from "@/types"

import BaseService from "./base.service"

export default class UserService extends BaseService {
  constructor() {
    super("user")
  }

  async getUser() {
    return await this.get<IUser>("/")
  }

  async updateUser(data: unknown) {
    return await this.post("/", data)
  }
}
