import { ImageResponse } from "next/og"

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "transparent",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* SVG ICON ONLY */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 4L4 26C3.6 26.8 4.2 27.8 5.1 27.8H26.9C27.8 27.8 28.4 26.8 28 26L16 4Z"
            fill="#1F3D2B"
          />
          <circle cx="16" cy="18" r="3" fill="#C56A4A" />
        </svg>
      </div>
    ),
    { ...size }
  )
}