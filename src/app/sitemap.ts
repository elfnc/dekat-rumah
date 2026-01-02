import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://marketplace-gunung-putri.vercel.app' // Ganti dengan domain aslimu jika sudah beli

  // 1. Ambil Data UMKM & Produk dari Database
  const umkms = await prisma.umkm.findMany({
    select: { slug: true, updatedAt: true },
  })

  const products = await prisma.product.findMany({
    select: { slug: true, updatedAt: true },
  })

  // 2. Buat URL Statis (Halaman Utama)
  const staticRoutes = [
    '',
    '/produk',
    '/umkm',
    '/tentang',
    '/dukung',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // 3. Buat URL Dinamis (UMKM)
  const umkmRoutes = umkms.map((umkm) => ({
    url: `${baseUrl}/umkm/${umkm.slug}`,
    lastModified: umkm.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 4. Buat URL Dinamis (Produk)
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/produk/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Gabungkan semua
  return [...staticRoutes, ...umkmRoutes, ...productRoutes]
}