import Image from "next/image"

export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    // Wrapper div relative untuk menghandle ukuran dari prop className
    <div className={`relative ${className}`}>
      <Image
        src="/logo.svg"
        alt="Logo DekatRumah"
        fill // Agar otomatis ngisi wrapper div
        className="object-contain" // Agar logo tidak gepeng
        priority // Loading prioritas karena ini LCP (Largest Contentful Paint)
      />
    </div>
  )
}