"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ImagePlus, X, Loader2 } from "lucide-react"
import Image from "next/image"
import { uploadToCloudinary } from "@/features/upload/server/action"
import { toast } from "sonner" // Asumsi kamu pake sonner, kalau enggak ganti alert biasa

interface ImageUploadProps {
    value: string // URL gambar
    onChange: (value: string) => void
    disabled?: boolean
    label?: string
}

export function ImageUpload({ value, onChange, disabled, label = "Upload Gambar" }: ImageUploadProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validasi sederhana (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("File terlalu besar (Maks 5MB)")
            return
        }

        setIsLoading(true)

        try {
            const formData = new FormData()
            formData.set("file", file)

            const res = await uploadToCloudinary(formData)

            if (res.error) {
                alert(res.error)
            } else if (res.url) {
                onChange(res.url) // Update state parent dengan URL baru
                toast.success("Gambar berhasil diupload")
            }
        } catch (error) {
            console.error(error)
            alert("Terjadi kesalahan saat upload")
        } finally {
            setIsLoading(false)
        }
    }

    const handleRemove = () => {
        onChange("") // Kosongkan URL
    }

    return (
        <div className="space-y-4 w-full">
            {/* PREVIEW AREA */}
            {value ? (
                <div className="relative aspect-video w-full max-w-sm rounded-lg overflow-hidden border border-border bg-secondary/20">
                    <Image
                        src={value}
                        alt="Upload"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={handleRemove}
                            disabled={disabled}
                            className="h-8 w-8"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                // UPLOAD BUTTON AREA
                <div className="flex items-center justify-center w-full max-w-sm">
                    <label className={`
                flex flex-col items-center justify-center w-full h-40 
                border-2 border-dashed rounded-lg cursor-pointer 
                bg-gray-50 hover:bg-gray-100 transition-colors
                ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {isLoading ? (
                                <Loader2 className="h-8 w-8 text-muted-foreground animate-spin mb-2" />
                            ) : (
                                <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                            )}
                            <p className="text-sm text-muted-foreground">
                                {isLoading ? "Sedang mengupload..." : label}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">PNG, JPG (Max 5MB)</p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={disabled || isLoading}
                        />
                    </label>
                </div>
            )}
        </div>
    )
}