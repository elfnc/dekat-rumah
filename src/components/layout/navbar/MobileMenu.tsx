"use client"

import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Store } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { useState } from "react"
import { getWhatsAppLink } from "@/lib/utils"
import { COPY } from "@/lib/copywritting"
import { NAV_LINKS } from "./NavLink" // Import dari file sebelah
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden -ml-2 text-[#1C1C1C]" aria-label="Buka Menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[300px] flex flex-col p-0">
        {/* Header Mobile Menu */}
        <SheetHeader className="p-6 border-b border-border/40 bg-[#F4F1EC]/50">
          <SheetTitle className="flex items-center gap-3">
            <div className="h-10 w-10 bg-white border border-[#1F3D2B]/10 rounded-xl flex items-center justify-center shadow-sm">
              <Logo className="h-6 w-6" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">UMKM Gunung Putri</span>
              <span className="text-lg font-bold text-[#1F3D2B]">DekatRumah<span className="text-[#C56A4A]">.</span></span>
            </div>
          </SheetTitle>
        </SheetHeader>

        {/* Links Container */}
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#1F3D2B]/10 text-[#1F3D2B]"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Footer / CTA Mobile */}
        <div className="p-4 border-t border-border/40 bg-gray-50/50">
          <div className="bg-[#1F3D2B] rounded-xl p-4 text-center space-y-3">
            <div className="text-white/90 text-sm font-medium">
              Punya usaha di rumah?
            </div>
            <Button className="w-full bg-white text-[#1F3D2B] hover:bg-white/90 font-bold" asChild>
              <Link href={getWhatsAppLink(COPY.WA_TEMPLATE.REGISTER)} target="_blank">
                <Store className="mr-2 h-4 w-4" />
                Daftarkan Usaha
              </Link>
            </Button>
          </div>
        </div>

      </SheetContent>
    </Sheet>
  )
}