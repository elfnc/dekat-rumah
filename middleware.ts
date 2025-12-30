import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Hanya boleh masuk kalau token ada (artinya sudah login)
      // Whitelist check sudah dilakukan di signIn callback, jadi disini cukup cek existensi
      return !!token
    },
  },
})

// Tentukan path mana yang diproteksi
export const config = {
  matcher: ["/admin/:path*"],
}