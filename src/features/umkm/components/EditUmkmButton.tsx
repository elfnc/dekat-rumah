"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil } from "lucide-react"
import { AdminUmkmForm } from "./AdminUmkmForm"
import { useState } from "react"

export function EditUmkmButton({ umkm, categories }: { umkm: any, categories: any[] }) {
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
          <DialogTitle>Edit UMKM</DialogTitle>
        </DialogHeader>
        {/* Pass initialData ke Form */}
        <AdminUmkmForm 
            categories={categories} 
            initialData={umkm} 
            onSuccess={() => setOpen(false)} // Tutup modal pas sukses
        />
      </DialogContent>
    </Dialog>
  )
}