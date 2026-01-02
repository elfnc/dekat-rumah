import { createEvent, deleteEvent, toggleEventStatus } from '@/features/events/server/action'
import { prisma } from '@/lib/prisma'

// Mock prisma
jest.mock('@/lib/prisma', () => ({
    prisma: {
        event: {
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
        },
    },
}))

// Mock next/cache & navigation
jest.mock('next/cache', () => ({
    revalidatePath: jest.fn(),
}))
jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}))

describe('EventActions', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('createEvent', () => {
        it('should create event successfully', async () => {
            const formData = new FormData()
            formData.append('title', 'Event Seru')
            formData.append('content', 'Isi event')
            formData.append('startDate', '2025-01-01')

                // Mock implementation used inside createEvent
                ; (prisma.event.create as jest.Mock).mockResolvedValue({})

            await createEvent(formData)

            expect(prisma.event.create).toHaveBeenCalled()
        })

        it('should return error if data invalid', async () => {
            const formData = new FormData()
            // Missing title

            const result = await createEvent(formData)
            expect(result).toEqual({ error: 'Data tidak valid' })
        })
    })

    describe('deleteEvent', () => {
        it('should delete event successfully', async () => {
            ; (prisma.event.delete as jest.Mock).mockResolvedValue({})
            await deleteEvent('1')
            expect(prisma.event.delete).toHaveBeenCalledWith({ where: { id: '1' } })
        })
    })

    describe('toggleEventStatus', () => {
        it('should toggle status', async () => {
            ; (prisma.event.update as jest.Mock).mockResolvedValue({})
            await toggleEventStatus('1', true)
            expect(prisma.event.update).toHaveBeenCalledWith({
                where: { id: '1' },
                data: { isActive: false },
            })
        })
    })
})
