import { Metadata } from "next"

import ForgotPasswordForm from "@/components/auth/forgotPasswordForm"
import Header from "@/components/auth/Header"

export const metadata: Metadata = {
  title: "Forgot-Password",
}

function ForgotPassword() {
  return (
    <>
      <Header
        title="Lookup your profile"
        description="Enter the email address linked to your account."
      />

      <ForgotPasswordForm />
    </>
  )
}

export default ForgotPassword
