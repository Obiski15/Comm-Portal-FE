"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"

import { forgotPasswordSchema } from "@/schema/auth.schema"

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

function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const handleSubmit: SubmitHandler<
    z.infer<typeof forgotPasswordSchema>
  > = values => {
    console.log(values)
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

        <Button
          className="w-full"
          type="submit"
          // disabled={isLoggingIn}
        >
          Send Email
        </Button>
      </form>
    </Form>
  )
}

export default ForgotPasswordForm
