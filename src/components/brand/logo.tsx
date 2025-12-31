export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-label="Gunung Putri Marketplace"
    >
      {/* Gunung (Primary Green) */}
      <path
        d="M50 20L10 90H90L50 20Z"
        fill="#1F3D2B"
        stroke="#1F3D2B"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Aksen Daun/Matahari (Terracotta) - Simbol Lokal/Hangat */}
      <circle cx="50" cy="55" r="12" fill="#F4F1EC" />
      <circle cx="50" cy="55" r="8" fill="#C56A4A" />
    </svg>
  )
}