import { ILogin, ISignup } from "@/types"

import BaseService from "./base.service"

export default class AuthService extends BaseService {
  constructor() {
    super("auth")
  }

  async login({ email, password }: ILogin) {
    return await this.post("/login", { email, password })
  }

  async signup({ email, password }: ISignup) {
    return await this.post("/signup", { email, password })
  }
}
