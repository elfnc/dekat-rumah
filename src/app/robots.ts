import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://dekat-rumah.vercel.app'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/auth/'], // Jangan biar Google akses halaman Admin
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}