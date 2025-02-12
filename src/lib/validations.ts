import { z } from "zod"

const passwordSchema = z.string().superRefine((password, ctx) => {
  let message = ""
  if (password.length < 8) {
    message += "Password must be at least 8 characters long."
  }
  if (password.length > 20) {
    message += "Password must be no more than 20 characters long."
  }
  if (!/[A-Z]/.test(password)) {
    message += "Password must contain at least one uppercase letter."
  }
  if (!/[a-z]/.test(password)) {
    message += "Password must contain at least one lowercase letter."
  }
  if (!/[0-9]/.test(password)) {
    message += "Password must contain at least one number."
  }
  if (!/[!@#$%^&*]/.test(password)) {
    message +=
      "Password must contain at least one special character (!@#$%^&*)."
  }
  if (message.length > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: message,
    })
  }
})

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
  password: passwordSchema,
})

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const bookSCHEMA = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(1000),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  rating: z.coerce.number().min(2).max(5),
  totalCopies: z.coerce.number().int().positive().lte(10000),
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10),
})
