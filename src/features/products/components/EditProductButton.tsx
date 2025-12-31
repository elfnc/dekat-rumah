"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil } from "lucide-react"
import { AdminProductForm } from "./AdminProductForm"
import { useState } from "react"

export function EditProductButton({ product, umkms }: { product: any, umkms: any[] }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Produk</DialogTitle>
        </DialogHeader>
        <AdminProductForm 
            umkms={umkms} 
            initialData={product} 
            onSuccess={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  )
}