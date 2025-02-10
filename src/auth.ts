import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { compare } from "bcryptjs"
import { eq } from "drizzle-orm"
import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString()))
          .limit(1)

        if (user.length === 0) return null

        const isPasswordValid = await compare(
          credentials.password.toString(),
          user[0].password,
        )

        if (!isPasswordValid) return null

        return {
          id: user[0].id.toString(),
          email: user[0].email,
          name: user[0].fullName,
        } as User
      },
    }),
  ],
  pages: {
    signIn: "/sigin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
      }

      return session
    },
  },
})
