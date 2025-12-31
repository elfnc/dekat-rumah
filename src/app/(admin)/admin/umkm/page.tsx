import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Store, MapPin } from "lucide-react"
import { AdminUmkmForm } from "@/features/umkm/components/AdminUmkmForm"
import { AdminSearch } from "@/components/shared/search"
import { StatusBadge } from "@/components/shared/status-badge"
import { AlertDeleteBtn } from "@/components/shared/alert-delete-btn"
import { deleteUmkm } from "@/features/umkm/actions/UmkmActions"
import { EditUmkmButton } from "@/features/umkm/components/EditUmkmButton"


export default async function AdminUmkmPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const params = await searchParams
  const query = params.q || ""

  // Fetch dengan Search Filter
  const umkms = await prisma.umkm.findMany({
    where: {
      name: { contains: query, mode: "insensitive" }
    },
    include: {
      category: true,
      _count: { select: { products: true } }
    },
    orderBy: { createdAt: 'desc' }
  })

  const categories = await prisma.category.findMany()

  return (
    <div className="space-y-6">
      {/* HEADER: Title + Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kelola UMKM</h1>
          <p className="text-muted-foreground text-sm">Daftar mitra warung dan jasa lokal.</p>
        </div>
        <div className="flex items-center gap-2">
          {/* ADD BUTTON */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="shadow-lg shadow-primary/20">
                <Plus className="mr-2 h-4 w-4" /> Tambah UMKM
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tambah UMKM Baru</DialogTitle>
              </DialogHeader>
              <AdminUmkmForm categories={categories} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <AdminSearch placeholder="Cari nama UMKM..." />
        {/* Bisa tambah filter kategori dropdown disini nanti */}
      </div>

      {/* TABLE */}
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow>
              <TableHead className="w-20">Logo</TableHead>
              <TableHead>Nama & Lokasi</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="text-center">Produk</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {umkms.map((umkm) => (
              <TableRow key={umkm.id} className="hover:bg-secondary/10">
                <TableCell>
                  <Avatar className="h-10 w-10 border bg-white">
                    <AvatarImage src={umkm.imageUrl || ""} className="object-cover" />
                    <AvatarFallback className="text-muted-foreground"><Store className="h-5 w-5" /></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-base text-foreground">{umkm.name}</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                    <MapPin className="h-3 w-3 mr-1" />
                    {umkm.address ? umkm.address.slice(0, 30) + "..." : "-"}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-secondary text-xs font-medium text-secondary-foreground">
                    {umkm.category.name}
                  </span>
                </TableCell>
                <TableCell className="text-center font-mono text-sm">
                  {umkm._count.products}
                </TableCell>
                <TableCell>
                  <StatusBadge isActive={umkm.isActive} />
                </TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  {/* Tombol Edit */}
                  <EditUmkmButton umkm={umkm} categories={categories} />

                  {/* Tombol Delete */}
                  <AlertDeleteBtn id={umkm.id} action={deleteUmkm} label="UMKM" />
                </TableCell>
              </TableRow>
            ))}
            {umkms.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center">
                    <Store className="h-8 w-8 mb-2 opacity-20" />
                    <p>Data tidak ditemukan.</p>
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