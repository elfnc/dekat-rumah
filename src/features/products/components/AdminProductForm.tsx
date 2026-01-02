"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema, ProductFormValues } from "@/lib/schemas"
import { createProduct, updateProduct } from "../actions/ProductActions"
import { toast } from "sonner"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription
} from "@/components/ui/form"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { generateSlug } from "@/lib/utils"
import { Product } from "@prisma/client"
// 👇 1. Import ImageUpload
import { ImageUpload } from "@/components/shared/image-upload"

interface UmkmOption {
  id: string;
  name: string;
}

type ProductData = Omit<Product, "price"> & { price: any }

interface AdminProductFormProps {
  umkms: UmkmOption[]
  onSuccess?: () => void
  initialData?: ProductData | null
}

export function AdminProductForm({ umkms, onSuccess, initialData }: AdminProductFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      price: initialData ? Number(initialData.price) : 0,
      umkmId: initialData?.umkmId || "",
      imageUrl: initialData?.imageUrl || "",
      isActive: initialData?.isActive ?? true,
    }
  })

  async function onSubmit(data: ProductFormValues) {
    setIsLoading(true)
    let result;

    if (initialData) {
      result = await updateProduct(initialData.id, data)
    } else {
      result = await createProduct(data)
    }

    setIsLoading(false)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(initialData ? "Produk Diupdate" : "Produk Dibuat")
      if (!initialData) form.reset()
      if (onSuccess) onSuccess()
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value
    form.setValue("name", nameValue)
    // Update slug otomatis hanya jika mode create (opsional)
    // Atau biarkan selalu update tapi hati-hati menimpa slug custom
    if (!initialData) {
      const slug = generateSlug(nameValue) + "-" + Math.floor(Math.random() * 1000)
      form.setValue("slug", slug)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        {/* UMKM SELECT */}
        <FormField
          control={form.control}
          name="umkmId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pilih UMKM</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Cari UMKM..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {umkms.map((u) => (
                    <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* NAMA */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Produk</FormLabel>
              <FormControl>
                <Input placeholder="Nasi Uduk" {...field} onChange={handleNameChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          {/* SLUG */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug (Unik)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PRICE */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga (Rp)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="15000"
                    {...field}
                    value={field.value as number}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* DESKRIPSI */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea placeholder="Enak banget..." {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 👇 2. IMAGE UPLOAD SECTION */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto Produk</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value || ""}
                  onChange={(url) => field.onChange(url)}
                  disabled={isLoading}
                  label="Upload Foto Produk"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ACTIVE CHECKBOX */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Tampilkan Produk?
                </FormLabel>
                <FormDescription>
                  Uncheck jika stok habis.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Menyimpan..." : (initialData ? "Simpan Perubahan" : "Buat Produk Baru")}
        </Button>
      </form>
    </Form>
  )
}