import { Button } from "@/components/ui/button"
import { Coffee } from "lucide-react"
import Link from "next/link"
import { COPY } from "@/lib/copywritting" // Import

export function SupportSection() {
  return (
    <section className="py-12 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="inline-flex items-center justify-center p-3 bg-[#F4F1EC] rounded-full mb-4">
            <Coffee className="h-6 w-6 text-[#C56A4A]" />
        </div>
        <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-line">
          {COPY.SUPPORT.TEXT}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
             <Button variant="outline" size="sm" className="rounded-full border-[#E6E3DF] hover:bg-[#F4F1EC] hover:text-[#C56A4A]" asChild>
                <Link href="https://trakteer.id/..." target="_blank">
                    {COPY.SUPPORT.BTN_TRAKTEER}
                </Link>
             </Button>
             <Button variant="outline" size="sm" className="rounded-full border-[#E6E3DF] hover:bg-[#F4F1EC] hover:text-[#C56A4A]" asChild>
                <Link href="https://saweria.co/..." target="_blank">
                    {COPY.SUPPORT.BTN_SAWERIA}
                </Link>
             </Button>
        </div>
      </div>
    </section>
  )
}