import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden rounded-xl border bg-card">
      {/* Image Placeholder */}
      <Skeleton className="aspect-square w-full bg-secondary/50" />
      
      {/* Content Placeholder */}
      <div className="p-4 space-y-3">
        {/* UMKM Name */}
        <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-20" />
        </div>
        
        {/* Title Lines */}
        <div className="space-y-1.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Price */}
        <Skeleton className="h-6 w-1/3 mt-2" />
        
        {/* Button */}
        <Skeleton className="h-9 w-full rounded-lg mt-2" />
      </div>
    </Card>
  )
}