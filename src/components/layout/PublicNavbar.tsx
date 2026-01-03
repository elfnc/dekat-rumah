"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { COPY } from "@/lib/copywritting";
import { MobileMenu } from "./navbar/MobileMenu";
import { Logo } from "../brand/logo";
import { NavLinks } from "./navbar/NavLink";
import { getWhatsAppLink } from "@/lib/utils";

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-[#E6E3DF]">
      <div className="container mx-auto h-18 px-4 md:px-6 flex items-center justify-between">

        {/* LEFT SECTION: Brand & Nav */}
        <div className="flex items-center gap-4 md:gap-8">

          {/* Mobile Hamburger */}
          <MobileMenu />

          {/* BRAND LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo Box */}
            <div className="h-10 w-10 bg-white border border-[#1F3D2B]/10 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all group-hover:scale-105">
              <Logo className="h-6 w-6" />
            </div>

            {/* Text Identity */}
            <div className="flex flex-col justify-center -space-y-0.5">
              <span className="text-lg font-extrabold text-[#1F3D2B] tracking-tight leading-none group-hover:text-[#152b1e] transition-colors">
                DekatRumah<span className="text-[#C56A4A]">.</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavLinks className="hidden md:flex ml-4" />
        </div>

        {/* RIGHT SECTION: Actions */}
        <div className="flex items-center gap-3">

          {/* Button Daftar */}
          <Button
            className="hidden sm:flex bg-[#1F3D2B] hover:bg-[#152b1e] text-white rounded-full font-semibold text-xs md:text-sm px-5 h-10 shadow-lg shadow-[#1F3D2B]/10 transition-all hover:scale-105"
            asChild
          >
            <Link href={getWhatsAppLink(COPY.WA_TEMPLATE.REGISTER)} target="_blank">
              Daftarkan Usaha
            </Link>
          </Button>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative p-2.5 rounded-full hover:bg-secondary transition-colors group"
            aria-label="Keranjang Belanja"
          >
            <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-[#1C1C1C] group-hover:text-[#1F3D2B] transition-colors" />
            {/* Badge Indicator */}
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#C56A4A] ring-2 ring-white animate-pulse" />
          </Link>

        </div>
      </div>
    </header>
  )
}