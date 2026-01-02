import { createProduct, deleteProduct, updateProduct } from '@/features/products/actions/ProductActions'
import { prisma } from '@/lib/prisma'

// Mock prisma
jest.mock('@/lib/prisma', () => ({
    prisma: {
        product: {
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
        },
    },
}))

// Mock next/cache
jest.mock('next/cache', () => ({
    revalidatePath: jest.fn(),
}))

describe('ProductActions', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('createProduct', () => {
        it('should create product successfully with valid data', async () => {
            const mockData = {
                name: 'Produk Test',
                slug: 'produk-test',
                description: 'Desc',
                price: 15000,
                umkmId: 'umkm-1',
                imageUrl: 'http://img.com/a.jpg',
                isActive: true
            }

                ; (prisma.product.create as jest.Mock).mockResolvedValue(mockData)

            const result = await createProduct(mockData)

            expect(prisma.product.create).toHaveBeenCalledWith({
                data: mockData,
            })
            expect(result).toEqual({ success: true })
        })

        it('should return error if validation fails', async () => {
            // @ts-ignore
            const result = await createProduct({ name: '' })
            expect(prisma.product.create).not.toHaveBeenCalled()
            expect(result).toEqual({ error: 'Data invalid' })
        })

        it('should return error if price is too low', async () => {
            const mockData = {
                name: 'Produk Test',
                slug: 'produk-test',
                description: 'Desc',
                price: 50, // Invalid < 100
                umkmId: 'umkm-1',
            }
            // @ts-ignore
            const result = await createProduct(mockData)
            expect(prisma.product.create).not.toHaveBeenCalled()
            expect(result).toEqual({ error: 'Data invalid' })
        })

        it('should return error if database call fails', async () => {
            const mockData = {
                name: 'Produk Test',
                slug: 'produk-test',
                description: 'Desc',
                price: 15000,
                umkmId: 'umkm-1',
                imageUrl: 'http://img.com/a.jpg',
                isActive: true
            }

                ; (prisma.product.create as jest.Mock).mockRejectedValue(new Error('DB Error'))

            const result = await createProduct(mockData)
            expect(result).toEqual({ error: 'Gagal membuat produk' })
        })
    })

    describe('deleteProduct', () => {
        it('should delete product successfully', async () => {
            ; (prisma.product.delete as jest.Mock).mockResolvedValue({ id: '1' })

            const result = await deleteProduct('1')

            expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id: '1' } })
            expect(result).toEqual({ success: true })
        })
    })

    describe('updateProduct', () => {
        it('should update product successfully', async () => {
            const mockData = {
                name: 'Produk Update',
                slug: 'produk-update',
                description: 'Desc',
                price: 20000,
                umkmId: 'umkm-1',
                imageUrl: 'http://img.com/a.jpg',
                isActive: true
            }

                ; (prisma.product.update as jest.Mock).mockResolvedValue(mockData)

            const result = await updateProduct('1', mockData)

            expect(prisma.product.update).toHaveBeenCalledWith({
                where: { id: '1' },
                data: mockData,
            })
            expect(result).toEqual({ success: true })
        })
    })
})
