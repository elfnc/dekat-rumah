"use client"

import Link from "next/link"
import { Logo } from "@/components/brand/logo"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, Search } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function PublicNavbar() {
  const navLinks = [
    { name: "Produk", href: "/produk" },
    { name: "UMKM", href: "/umkm" },
    { name: "Event", href: "#event" }, // Anchor link ke section event
    { name: "Tentang", href: "/tentang" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E6E3DF] h-[72px]">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        
        {/* LEFT: Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden -ml-2">
                <Menu className="h-6 w-6 text-[#1C1C1C]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
               <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="text-lg font-medium">
                      {link.name}
                    </Link>
                  ))}
                  <Button className="w-full bg-[#1F3D2B]">Daftarkan UMKM</Button>
               </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-10 w-10" />
            <span className="hidden sm:inline-block font-bold text-xl tracking-tight text-[#1F3D2B]">
              Gunung Putri<span className="text-[#C56A4A]">.</span>
            </span>
          </Link>
        </div>

        {/* CENTER: Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-[#1C1C1C] hover:text-[#1F3D2B] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3">
            {/* CTA Navbar (Desktop & Mobile Visible but small) */}
            <Button 
                size="sm" 
                className="bg-[#1F3D2B] hover:bg-[#1F3D2B]/90 text-white rounded-lg px-4 font-medium"
                asChild
            >
                <Link href="/daftar-umkm">Daftarkan UMKM</Link>
            </Button>

            {/* Cart Icon */}
            <Button variant="ghost" size="icon" className="relative text-[#1C1C1C]">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#C56A4A] ring-2 ring-white" />
            </Button>
        </div>
      </div>
    </header>
  )
}