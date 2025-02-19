"use server"

import { signIn } from "@/auth"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { hash } from "bcryptjs"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import ratelimit from "../rateLimit"
import { redirect } from "next/navigation"
import { workflowClient } from "../workflow"
import config from "../config"

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = params

  const ip = (await headers()).get("x-forwaded-for") || "127.0.0.1"
  const { success } = await ratelimit.limit(ip)

  if (!success) redirect("/too-fast")

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      return { success: false, error: result.error }
    }

    return { success: true }
  } catch (error) {
    console.error(error, " SignIn error")
    return { success: false, error: "SignIn error" }
  }
}

export const signUp = async (params: AuthCredentials) => {
  const { email, fullName, password, universityCard, universityId } = params

  const ip = (await headers()).get("x-forwaded-for") || "127.0.0.1"
  const { success } = await ratelimit.limit(ip)

  if (!success) redirect("/too-fast")

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" }
  }

  const hashPassword = await hash(password, 10)

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      password: hashPassword,
      universityCard,
    })

    await workflowClient.trigger({
      url: `${config.env.apiEndpoint}/api/workflow`,
      body: {
        email,
        fullName,
      },
    })

    await signInWithCredentials({ email, password })

    return { success: true }
  } catch (error) {
    console.error(error, " SignUp error")
    return { success: false, error: "SignUp error" }
  }
}
