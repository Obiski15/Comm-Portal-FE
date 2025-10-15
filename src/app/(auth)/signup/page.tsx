import { Metadata } from "next"

import Header from "@/components/auth/Header"
import SignupForm from "@/components/auth/signupFom"

export const metadata: Metadata = {
  title: "Signup",
}

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function SignupPage({ searchParams }: Props) {
  const token = (await searchParams).token

  return (
    <>
      <Header
        title="Create an account"
        description="Welcome! Let's get you started"
      />

      <SignupForm token={token} />
    </>
  )
}
