"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { IError } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeClosed, Mail } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { loginSchema } from "@/schema/auth.schema"

import { useLogin } from "@/hooks/auth/useLogin"

import Spin from "../shared/spin"
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

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })
  const { login, isLoggingIn } = useLogin()
  const router = useRouter()

  const handleSubmit: SubmitHandler<z.infer<typeof loginSchema>> = values => {
    login(values, {
      onError: error => {
        toast.error((error as unknown as IError).error.message)
      },

      onSuccess: () => {
        form.reset({
          email: "",
          password: "",
        })
        toast.success("User Authenticated")
        router.push("/dashboard")
      },
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name="email"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <div className="relative mt-1">
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="pr-10"
                    disabled={isLoggingIn}
                  />
                </FormControl>
                <Mail className="absolute right-2 top-1.5" />
              </div>
              <div className="mt-1">
                <FormMessage>{error?.message}</FormMessage>
              </div>
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
                    disabled={isLoggingIn}
                  />
                </FormControl>
                <div
                  className="absolute right-2 top-1.5"
                  onClick={() => setShowPassword(p => !p)}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </div>
              </div>
              <div className="mt-1">
                <FormMessage>{error?.message}</FormMessage>
              </div>
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <div className="space-y-1 text-sm">
            <Link
              className="font-medium text-accent hover:text-accent/80"
              href="/forgot-password"
            >
              Forgot your password?
            </Link>
            <br />
            <div>
              <span>Don&apos;t have an account? </span>
              <Link
                className="font-medium text-accent hover:text-accent/80"
                href="/signup"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>

        <Spin />
        <Button
          className="flex w-full items-center justify-center gap-2"
          type="submit"
          disabled={isLoggingIn}
        >
          <span>Log In</span>
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
