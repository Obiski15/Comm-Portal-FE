"use client"

import { useState } from "react"
import Link from "next/link"
import { IError } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeClosed, Mail } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  })
  const { signup, isSigningUp } = useSignup()

  const handleSubmit: SubmitHandler<z.infer<typeof signupSchema>> = values => {
    signup(values, {
      onError: error => {
        toast.error((error as unknown as IError).error.message)
      },

      onSuccess: () => {
        toast.success("Account Created Successfully")
        form.reset({
          email: "",
          password: "",
          confirm_password: "",
          role: undefined,
        })
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
                    disabled={isSigningUp}
                  />
                </FormControl>
                <Mail className="absolute right-2 top-1.5" />
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
                <div
                  className="absolute right-2 top-1.5"
                  onClick={() => setShowPassword(p => !p)}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </div>
              </div>
              <FormMessage>{error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="confirm_password"
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
                <div
                  className="absolute right-2 top-1.5"
                  onClick={() => setShowConfirmPassword(p => !p)}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </div>
              </div>
              <FormMessage>{error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="role"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                </SelectContent>
              </Select>
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

        <Button className="w-full" type="submit" disabled={isSigningUp}>
          Sign Up
        </Button>
      </form>
    </Form>
  )
}

export default SignupForm
