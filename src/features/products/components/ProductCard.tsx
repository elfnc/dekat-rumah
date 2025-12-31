import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Store, Plus, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  imageUrl?: string | null
  umkmName: string
  category: string
  className?: string
}

export function ProductCard({
  name,
  slug,
  price,
  imageUrl,
  umkmName,
  category,
  className
}: ProductCardProps) {
  
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price)

  return (
    <Card className={cn(
      "group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50", 
      className
    )}>
      {/* 1. CLICKABLE AREA (Link ke Detail) */}
      <Link href={`/produk/${slug}`} className="flex-1">
        
        {/* IMAGE SECTION */}
        <div className="relative aspect-square overflow-hidden bg-secondary/20">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground bg-secondary/30">
              <PackageIcon className="h-10 w-10 opacity-20" />
            </div>
          )}

          {/* OVERLAY BADGE (Glassmorphism) */}
          <div className="absolute left-2 top-2 z-10">
            <Badge 
              variant="secondary" 
              className="bg-white/80 backdrop-blur-md text-primary font-medium text-[10px] px-2 shadow-sm border-white/20"
            >
              {category}
            </Badge>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="flex flex-col p-4 gap-1">
          {/* UMKM Name (Micro Text) */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <Store className="h-3 w-3" />
            <span className="truncate max-w-[150px]">{umkmName}</span>
          </div>

          {/* Product Name */}
          <h3 className="line-clamp-2 text-sm font-semibold text-foreground leading-snug min-h-[2.5rem] group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Price */}
          <div className="mt-2 text-lg font-bold text-primary tracking-tight">
            {formattedPrice}
          </div>
        </div>
      </Link>

      {/* FOOTER ACTION (Add to Cart) */}
      <div className="p-4 pt-0 mt-auto">
        <Button 
            variant="outline" 
            className="w-full gap-2 rounded-lg border-primary/20 hover:bg-primary hover:text-white hover:border-primary transition-all group/btn"
            size="sm"
            // Nanti disini kita pasang onClick handler untuk Add to Cart
            asChild
        >
           <Link href={`/produk/${slug}`}>
              <Plus className="h-4 w-4 group-hover/btn:rotate-90 transition-transform" />
              <span>Tambah</span>
           </Link>
        </Button>
      </div>
    </Card>
  )
}

function PackageIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22v-10" />
      </svg>
    )
  }