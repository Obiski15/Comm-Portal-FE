import { Metadata } from "next"

import Header from "@/components/auth/Header"
import SignupForm from "@/components/auth/signupFom"

export const metadata: Metadata = {
  title: "Signup",
}

function page() {
  return (
    <>
      <Header
        title="Create an account"
        description="Welcome! Let's get you started"
      />

      <SignupForm />
    </>
  )
}

export default page
