import * as z from "zod"

export const signupSchema = z
  .object({
    fullName: z.string().nonempty("Full name is required"),
    password: z
      .string({ error: "Password is required" })
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string({ error: "Password is required" })
      .nonempty("Please confirm your password")
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

export const loginSchema = z.object({
  email: z.email("Enter a valid email address").nonempty("Email is required"),
  password: z
    .string({ error: "Password is required" })
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters long"),
})

export const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid email address").nonempty("Email is required"),
})
