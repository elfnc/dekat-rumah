"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
  slug: string
}

interface FilterSidebarProps {
  categories: Category[]
}

export function FilterSidebar({ categories }: FilterSidebarProps) {
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category")

  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Kategori
        </h3>
        <div className="flex flex-col space-y-1">
          {/* Opsi "Semua" */}
          <Button
            variant={!currentCategory ? "secondary" : "ghost"}
            className={cn("justify-start", !currentCategory && "bg-secondary font-semibold text-primary")}
            asChild
          >
            <Link href="/produk">Semua Produk</Link>
          </Button>

          {/* List Kategori DB */}
          {categories.map((cat) => {
            const isActive = currentCategory === cat.slug
            return (
              <Button
                key={cat.id}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "justify-start", 
                  isActive && "bg-secondary font-semibold text-primary"
                )}
                asChild
              >
                <Link href={`/produk?category=${cat.slug}`}>
                  {cat.name}
                </Link>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}