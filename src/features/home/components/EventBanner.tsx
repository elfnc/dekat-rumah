import Link from "next/link"
import { CalendarDays, ArrowRight } from "lucide-react"

interface EventData {
  title: string
  description: string
  link: string
  isActive: boolean
}

export function EventBanner({ event }: { event?: EventData | null }) {
  // LOGIC: Auto hide kalau ga ada event atau event ga aktif
  if (!event || !event.isActive) return null

  return (
    <div className="bg-accent text-white overflow-hidden">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="bg-white/20 p-1.5 rounded-lg shrink-0">
             <CalendarDays className="h-5 w-5" />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:gap-2 min-w-0">
            <span className="font-bold whitespace-nowrap">{event.title}</span>
            <span className="hidden md:inline text-white/60">•</span>
            <span className="text-sm text-white/90 truncate">{event.description}</span>
          </div>
        </div>
        
        <Link href={event.link} className="shrink-0 text-sm font-semibold hover:underline flex items-center gap-1 whitespace-nowrap">
          Cek Detail <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}