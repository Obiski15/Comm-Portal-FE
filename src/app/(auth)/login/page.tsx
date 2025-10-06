import { Metadata } from "next"

import Header from "@/components/auth/Header"
import LoginForm from "@/components/auth/loginForm"

export const metadata: Metadata = {
  title: "Login",
}

export default function LoginPage() {
  return (
    <>
      <Header
        title="Sign in to your account"
        description="Welcome back! Please enter your details."
      />

      <LoginForm />
    </>
  )
}
