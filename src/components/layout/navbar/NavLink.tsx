"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/produk", label: "Jajanan & Produk" },
  { href: "/umkm", label: "Direktori UMKM" },
  { href: "/events", label: "Info Warga" }, // Ganti Label biar lebih 'lokal'
  { href: "/tentang", label: "Tentang" },
]

export function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center gap-6 lg:gap-8", className)}>
      {NAV_LINKS.map((link) => {
        // Logic Active State yang lebih akurat
        // Jika link "/", hanya aktif jika pathname benar-benar "/"
        // Jika link lain, aktif jika pathname diawali link tersebut
        const isActive = link.href === "/"
          ? pathname === "/"
          : pathname.startsWith(link.href)

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative text-sm font-medium transition-all duration-200",
              isActive
                ? "text-[#1F3D2B] font-semibold"
                : "text-muted-foreground hover:text-[#1F3D2B]"
            )}
          >
            {link.label}

            {/* Active Indicator (Dot) */}
            {isActive && (
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#C56A4A] rounded-full" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}