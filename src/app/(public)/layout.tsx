import { PublicNavbar } from "@/components/layout/PublicNavbar"
import { COPY } from "@/lib/copywritting"
import Link from "next/link"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-secondary/30">
      <PublicNavbar />
      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-[#E6E3DF] bg-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-6">

            {/* 1. Brand & Tagline */}
            <div>
              <h4 className="font-bold text-lg text-[#1F3D2B] mb-2 tracking-tight">
                {COPY.FOOTER.BRAND}
              </h4>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                {COPY.FOOTER.TAGLINE}
              </p>
            </div>

            {/* 2. Navigation Links (Menu Bawah) */}
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-600">
              <Link href="/produk" className="hover:text-[#1F3D2B] transition-colors">
                Jajanan & Produk
              </Link>
              <Link href="/umkm" className="hover:text-[#1F3D2B] transition-colors">
                Direktori UMKM
              </Link>
              <Link href="/events" className="hover:text-[#1F3D2B] transition-colors">
                Kabar Warga
              </Link>
              {/* 👇 Link Baru */}
              <Link href="/tentang" className="hover:text-[#1F3D2B] transition-colors">
                Tentang Platform
              </Link>
            </nav>

            {/* 3. Call to Action (Support) */}
            <div>
              <Link
                href="/dukung"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#C56A4A] hover:text-[#a05236] transition-colors bg-[#C56A4A]/10 px-4 py-2 rounded-full hover:bg-[#C56A4A]/20"
              >
                <span>☕</span> Dukung Project Ini
              </Link>
            </div>

            {/* 4. Copyright */}
            <div className="pt-6 border-t border-gray-100 w-full text-center max-w-lg mx-auto">
              <p className="text-xs text-muted-foreground/60">
                &copy; {new Date().getFullYear()} Gunung Putri Marketplace. Dibuat dengan hati untuk ekonomi lokal.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}