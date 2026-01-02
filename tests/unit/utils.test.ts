import { formatRupiah, generateSlug, getWhatsAppLink } from '@/lib/utils'

describe('Utils', () => {
    describe('formatRupiah', () => {
        it('should format number to IDR currency', () => {
            expect(formatRupiah(10000)).toContain('Rp')
            expect(formatRupiah(10000)).toContain('10.000')
        })
    })

    describe('generateSlug', () => {
        it('should slugify text', () => {
            expect(generateSlug('Halo Dunia')).toBe('halo-dunia')
            expect(generateSlug('Tes   Spasi')).toBe('tes-spasi')
            expect(generateSlug('Tes@#$Karakter')).toBe('teskarakter')
        })
    })

    describe('getWhatsAppLink', () => {
        it('should generate valid WA link', () => {
            const link = getWhatsAppLink('Halo', '08123456789')
            expect(link).toBe('https://wa.me/628123456789?text=Halo')
        })

        it('should handle number without 0 prefix', () => {
            const link = getWhatsAppLink('Halo', '628123456789')
            expect(link).toBe('https://wa.me/628123456789?text=Halo')
        })
    })
})
