import { Metadata } from "next"
import { PaginationControl } from "@/components/ui/pagination-control"
import { Separator } from "@/components/ui/separator"
import { getCategories, getProducts } from "@/features/products/server/getProduct"
import { FilterSidebar } from "@/features/products/components/FilterSidebar"
import { ProductCard } from "@/features/products/components/ProductCard"

// Metadata Dinamis (Bagus buat SEO: "Jual Kuliner Gunung Putri")
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { category?: string }
}): Promise<Metadata> {
  const categoryName = searchParams.category 
    ? searchParams.category.charAt(0).toUpperCase() + searchParams.category.slice(1) 
    : "Terlengkap"
    
  return {
    title: `Jual Produk ${categoryName} - Marketplace Gunung Putri`,
    description: "Cari produk lokal UMKM Gunung Putri. Makanan, Jasa, dan Kerajinan.",
  }
}

export default async function ProductListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; search?: string }>
}) {
  // Await dulu
  const params = await searchParams
  
  // Baru pakai
  const currentPage = Number(params.page) || 1
  const currentCategory = params.category
  const searchQuery = params.search

  // Fetch Data Paralel (Categories & Products)
  const [categories, { products, metadata }] = await Promise.all([
    getCategories(),
    getProducts({ 
      page: currentPage, 
      category: currentCategory, 
      search: searchQuery 
    })
  ])

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 min-h-screen">
      
      {/* HEADER PAGE */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Katalog Warga</h1>
        <p className="text-muted-foreground mt-2">
            {metadata.totalCount} produk ditemukan {currentCategory && `di kategori ${currentCategory}`}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR FILTER (Desktop: Sticky, Mobile: Top) */}
        <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-24">
                 <FilterSidebar categories={categories} />
            </div>
        </aside>
        
        <Separator className="md:hidden" />

        {/* PRODUCT GRID AREA */}
        <main className="flex-1">
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    price={Number(product.price)}
                    imageUrl={product.imageUrl}
                    umkmName={product.umkm.name}
                    category={product.umkm.category.name}
                  />
                ))}
              </div>

              {/* PAGINATION */}
              <PaginationControl 
                currentPage={currentPage}
                totalPages={metadata.totalPages}
                hasNextPage={metadata.hasNextPage}
              />
            </>
          ) : (
            // EMPTY STATE
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-xl bg-secondary/20">
              <div className="bg-secondary p-4 rounded-full mb-4">
                 <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Produk tidak ditemukan</h3>
              <p className="text-muted-foreground max-w-xs mx-auto mt-2">
                Coba ganti kategori atau cari kata kunci lain ya.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}