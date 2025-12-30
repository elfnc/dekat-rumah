// src/lib/auth.ts
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma" // Pastikan kamu punya file ini (export prisma client)

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // Gunakan JWT biar ringan, gak hit DB tiap request
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // 🛡️ SECURITY GATE
      // Hanya izinkan email yang terdaftar di environment variable ADMIN_EMAILS
      const allowedEmails = process.env.ADMIN_EMAILS?.split(",") || []
      
      if (user.email && allowedEmails.includes(user.email)) {
        return true // Boleh masuk
      }
      
      console.log(`🚫 Unauthorized login attempt: ${user.email}`)
      return false // Tolak
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        // Masukkan ID user ke session biar gampang dipanggil
        // @ts-ignore
        session.user.id = token.sub
      }
      return session
    }
  },
  pages: {
    signIn: "/login", // Custom login page
    error: "/login",   // Kalau error (misal ditolak), balik ke login
  }
}