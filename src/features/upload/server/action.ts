"use server"

import { v2 as cloudinary } from "cloudinary"

// Konfigurasi Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadToCloudinary(formData: FormData) {
    const file = formData.get("file") as File

    if (!file) {
        return { error: "No file provided" }
    }

    try {
        // 1. Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // 2. Upload via Stream (karena Cloudinary SDK butuh ini buat server-side upload dari buffer)
        const result = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: "marketplace-gp", // Ganti nama folder sesukamu
                    resource_type: "image",
                    transformation: [
                        { quality: "auto", fetch_format: "auto" }, // Auto optimasi
                        { width: 800, crop: "limit" } // Resize biar gak kegedean
                    ]
                },
                (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                }
            ).end(buffer)
        })

        return { url: result.secure_url }

    } catch (error) {
        console.error("Upload error:", error)
        return { error: "Gagal upload gambar" }
    }
}