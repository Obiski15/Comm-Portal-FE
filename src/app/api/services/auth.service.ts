import { ILogin, ISignup, User } from "@/types"

import BaseService from "./base.service"

export default class AuthService extends BaseService {
  constructor() {
    super("auth")
  }

  async login({ email, password }: ILogin) {
    return await this.post<ILogin, { data: { user: User } }>("/login", {
      email,
      password,
    })
  }

  async signup({ fullName, confirmPassword, password, token }: ISignup) {
    return await this.post<Omit<ISignup, "token">, { data: { user: User } }>(
      `/signup?token=${token}`,
      {
        fullName,
        confirmPassword,
        password,
      }
    )
  }
}
