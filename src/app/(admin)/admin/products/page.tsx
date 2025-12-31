import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Package } from "lucide-react"
import { StatusBadge } from "@/components/shared/status-badge"
import { AlertDeleteBtn } from "@/components/shared/alert-delete-btn"
import { deleteProduct } from "@/features/products/actions/ProductActions"
import { AdminSearch } from "@/components/shared/search"
import { AdminProductForm } from "@/features/products/components/AdminProductForm"
import { EditProductButton } from "@/features/products/components/EditProductButton"


export default async function AdminProductsPage({
    searchParams,
}: {
    searchParams: { q?: string }
}) {
    const query = searchParams.q || ""

    const products = await prisma.product.findMany({
        where: {
            name: { contains: query, mode: "insensitive" }
        },
        include: { umkm: true },
        orderBy: { createdAt: 'desc' }
    })

    const umkms = await prisma.umkm.findMany({ select: { id: true, name: true } })

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Kelola Produk</h1>
                    <p className="text-muted-foreground text-sm">Katalog barang dagangan warga.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="shadow-lg shadow-primary/20">
                            <Plus className="mr-2 h-4 w-4" /> Tambah Produk
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Tambah Produk Baru</DialogTitle>
                        </DialogHeader>
                        <AdminProductForm umkms={umkms} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* FILTER */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
                <AdminSearch placeholder="Cari nama produk..." />
            </div>

            {/* TABLE */}
            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-secondary/30">
                        <TableRow>
                            <TableHead className="w-16">Img</TableHead>
                            <TableHead>Nama Produk</TableHead>
                            <TableHead>Asal UMKM</TableHead>
                            <TableHead>Harga</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((p) => (
                            <TableRow key={p.id} className="hover:bg-secondary/10">
                                <TableCell>
                                    <Avatar className="h-10 w-10 border rounded-lg bg-white">
                                        <AvatarImage src={p.imageUrl || ""} className="object-cover" />
                                        <AvatarFallback className="rounded-lg"><Package className="h-5 w-5 text-muted-foreground" /></AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-medium text-foreground">
                                    {p.name}
                                    {/* Slug kecil dibawahnya biar admin tau */}
                                    <div className="text-[10px] text-muted-foreground font-normal">{p.slug}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm text-muted-foreground">{p.umkm.name}</div>
                                </TableCell>
                                <TableCell className="font-mono text-sm font-medium">
                                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(p.price))}
                                </TableCell>
                                <TableCell>
                                    <StatusBadge isActive={p.isActive} />
                                </TableCell>
                                <TableCell className="text-right whitespace-nowrap">
                                    {/* Tombol Edit */}
                                    <EditProductButton product={{
                                        ...p,
                                        price: Number(p.price)
                                    }} umkms={umkms} />

                                    {/* Tombol Delete */}
                                    <AlertDeleteBtn id={p.id} action={deleteProduct} label="Produk" />
                                </TableCell>
                            </TableRow>
                        ))}
                        {products.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center justify-center">
                                        <Package className="h-8 w-8 mb-2 opacity-20" />
                                        <p>Produk tidak ditemukan.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}