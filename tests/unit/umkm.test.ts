import { createUmkm, deleteUmkm, updateUmkm } from '@/features/umkm/actions/UmkmActions'
import { prisma } from '@/lib/prisma'

// Mock prisma
jest.mock('@/lib/prisma', () => ({
    prisma: {
        umkm: {
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

describe('UmkmActions', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('createUmkm', () => {
        it('should create umkm successfully with valid data', async () => {
            const mockData = {
                name: 'Warung Test',
                slug: 'warung-test',
                description: 'Test description',
                address: 'Test address',
                phone: '628123456789',
                categoryId: 'cat-1',
                isActive: true,
                imageUrl: 'http://example.com/image.jpg',
            }

                ; (prisma.umkm.create as jest.Mock).mockResolvedValue(mockData)

            const result = await createUmkm(mockData)

            expect(prisma.umkm.create).toHaveBeenCalledWith({
                data: mockData,
            })
            expect(result).toEqual({ success: true })
        })

        it('should return error if data is invalid (zod validation)', async () => {
            // @ts-ignore - testing invalid data
            const result = await createUmkm({ name: '' })
            expect(prisma.umkm.create).not.toHaveBeenCalled()
            expect(result).toEqual({ error: 'Data tidak valid' })
        })

        it('should return error if database call fails', async () => {
            const mockData = {
                name: 'Warung Test',
                slug: 'warung-test',
                description: 'Test description',
                address: 'Test address',
                phone: '628123456789',
                categoryId: 'cat-1',
                isActive: true,
                imageUrl: 'http://example.com/image.jpg',
            }

                ; (prisma.umkm.create as jest.Mock).mockRejectedValue(new Error('DB Error'))

            const result = await createUmkm(mockData)
            expect(result).toEqual({ error: 'Gagal menyimpan. Cek apakah slug sudah dipakai?' })
        })
    })

    describe('deleteUmkm', () => {
        it('should delete umkm successfully', async () => {
            ; (prisma.umkm.delete as jest.Mock).mockResolvedValue({ id: '1' })

            const result = await deleteUmkm('1')

            expect(prisma.umkm.delete).toHaveBeenCalledWith({ where: { id: '1' } })
            expect(result).toEqual({ success: true })
        })

        it('should return error if delete fails', async () => {
            ; (prisma.umkm.delete as jest.Mock).mockRejectedValue(new Error('DB Error'))

            const result = await deleteUmkm('1')
            expect(result).toEqual({ error: 'Gagal menghapus UMKM' })
        })
    })

    describe('updateUmkm', () => {
        it('should update umkm successfully', async () => {
            const mockData = {
                name: 'Warung Update',
                slug: 'warung-update',
                description: 'Update desc',
                address: 'Update addr',
                phone: '628123456789',
                categoryId: 'cat-1',
                isActive: true,
                imageUrl: 'http://example.com/image.jpg',
            }

                ; (prisma.umkm.update as jest.Mock).mockResolvedValue(mockData)

            const result = await updateUmkm('1', mockData)

            expect(prisma.umkm.update).toHaveBeenCalledWith({
                where: { id: '1' },
                data: mockData,
            })
            expect(result).toEqual({ success: true })
        })
    })
})
