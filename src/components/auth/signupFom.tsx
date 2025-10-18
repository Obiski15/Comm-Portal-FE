"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { IError } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeClosed } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { signupSchema } from "@/schema/auth.schema"

import { useSignup } from "@/hooks/auth/useSignup"

import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Spinner } from "../ui/spinner"

function SignupForm({ token }: { token?: string }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  })
  const { signup, isSigningUp } = useSignup()
  const router = useRouter()

  const handleSubmit: SubmitHandler<z.infer<typeof signupSchema>> = values => {
    signup(
      { ...values, token },
      {
        onError: error => {
          toast.error((error as unknown as IError).error.message)
        },

        onSuccess: () => {
          toast.success(
            "Account Created Successfully.\nRedirecting to login..."
          )
          router.push("/login")
          form.reset({
            fullName: "",
            password: "",
            confirmPassword: "",
          })
        },
      }
    )
  }

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name="fullName"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <div className="relative mt-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. John Doe"
                    className="pr-10"
                    disabled={isSigningUp}
                  />
                </FormControl>
              </div>
              <FormMessage>{error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative mt-1">
                <FormControl>
                  <Input
                    {...field}
                    type={!showPassword ? "password" : "text"}
                    autoComplete="password"
                    placeholder="******"
                    className="pr-10"
                    disabled={isSigningUp}
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-2 top-1.5"
                  onClick={() => setShowPassword(p => !p)}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
              <FormMessage>{error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <div className="relative mt-1">
                <FormControl>
                  <Input
                    {...field}
                    type={!showConfirmPassword ? "password" : "text"}
                    autoComplete="password"
                    placeholder="******"
                    className="pr-10"
                    disabled={isSigningUp}
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-2 top-1.5"
                  onClick={() => setShowConfirmPassword(p => !p)}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
              <FormMessage>{error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span>Already have an account? </span>
            <Link
              className="font-medium text-accent hover:text-accent/80"
              href="/login"
            >
              Login
            </Link>
          </div>
        </div>

        <Button
          className="flex w-full items-center justify-center gap-2"
          type="submit"
          disabled={isSigningUp}
        >
          {isSigningUp && <Spinner />} <span>Sign Up</span>
        </Button>
      </form>
    </Form>
  )
}

export default SignupForm
