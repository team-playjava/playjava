import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import Discord from "next-auth/providers/discord"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Discord],
  callbacks: {
    async session({ session, token }) {
      (session as any).userData = session.user;
      return session;
    }
  }
})