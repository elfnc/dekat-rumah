import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'DekatRumah — UMKM Gunung Putri',
        short_name: 'DekatRumah',
        description: 'Direktori usaha dan jajanan warga Gunung Putri',
        start_url: '/',
        display: 'standalone',
        background_color: '#F4F1EC',
        theme_color: '#1F3D2B',
        icons: [
            {
                src: '/web-app-manifest-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/web-app-manifest-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}