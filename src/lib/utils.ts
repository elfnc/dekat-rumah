// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Ganti spasi dengan dash
    .replace(/[^\w\-]+/g, '') // Hapus karakter non-word
    .replace(/\-\-+/g, '-')   // Ganti multiple dash dengan single dash
    .replace(/^-+/, '')       // Trim dash di depan
    .replace(/-+$/, '')       // Trim dash di belakang
}