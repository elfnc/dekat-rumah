import { Badge } from "@/components/ui/badge"

export function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <Badge 
      variant={isActive ? "default" : "secondary"} 
      className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
        isActive 
          ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-100" 
          : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-100"
      }`}
    >
      {isActive ? "Published" : "Draft"}
    </Badge>
  )
}