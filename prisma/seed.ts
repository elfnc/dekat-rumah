import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper untuk membuat slug
const createSlug = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') + '-' + Math.floor(Math.random() * 1000)
}

// Helper untuk placehold.co image
const getPlaceholder = (text: string, color = '1F3D2B') => {
  const encodedText = encodeURIComponent(text)
  return `https://placehold.co/600x400/${color}/FFFFFF/png?text=${encodedText}`
}

async function main() {
  console.log('🌱 Start seeding...')

  // 1. CLEANUP (Optional: Hapus data lama biar bersih)
  await prisma.product.deleteMany()
  await prisma.umkm.deleteMany()
  await prisma.event.deleteMany()
  await prisma.category.deleteMany()

  // ------------------------------------------------
  // 2. SEED CATEGORIES
  // ------------------------------------------------
  const categoriesData = [
    { name: 'Kuliner', slug: 'kuliner' },
    { name: 'Fashion', slug: 'fashion' },
    { name: 'Jasa', slug: 'jasa' },
    { name: 'Kerajinan', slug: 'kerajinan' },
    { name: 'Pertanian & Peternakan', slug: 'pertanian-peternakan' },
  ]

  const categories = []
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat })
    categories.push(created)
  }
  console.log(`✅ Created ${categories.length} categories`)

  // ------------------------------------------------
  // 3. SEED EVENTS (20 Items)
  // ------------------------------------------------
  const eventsData = [
    {
      title: "Bazar UMKM Gunung Putri Merdeka",
      excerpt: "Rayakan kemerdekaan dengan belanja produk lokal asli warga.",
      content: "<p>Ayo meriahkan bazar tahunan kita! Akan ada 50 stand UMKM, panggung gembira, dan doorprize sepeda listrik.</p><ul><li>Tanggal: 17 Agustus 2026</li><li>Lokasi: Lapangan Kecamatan</li></ul>",
      startDate: new Date('2026-08-17T08:00:00Z'),
      location: "Lapangan Kecamatan Gunung Putri"
    },
    {
      title: "Senam Sehat Lansia RW 05",
      excerpt: "Jaga kesehatan jantung bersama instruktur profesional.",
      content: "<p>Kegiatan rutin setiap minggu pagi. Gratis untuk seluruh warga di atas 50 tahun. Disediakan bubur kacang hijau gratis setelah senam.</p>",
      startDate: new Date('2026-02-10T06:30:00Z'),
      location: "Balai Warga RW 05"
    },
    {
      title: "Pengajian Akbar Menyambut Ramadhan",
      excerpt: "Bersihkan hati menyambut bulan suci bersama Ustadz kondang.",
      content: "<p>Mari hadiri pengajian akbar. Tema: 'Sucikan Hati, Eratkan Silaturahmi'. Jangan lupa membawa peralatan sholat sendiri.</p>",
      startDate: new Date('2026-03-05T19:30:00Z'),
      location: "Masjid Al-Ikhlas"
    },
    {
      title: "Vaksinasi Rabies Kucing & Anjing Gratis",
      excerpt: "Program Dinas Peternakan untuk hewan peliharaan sehat.",
      content: "<p>Bawa hewan peliharaan Anda (Kucing/Anjing) untuk divaksin rabies gratis. Syarat: Hewan dalam keadaan sehat dan usia minimal 6 bulan.</p>",
      startDate: new Date('2026-04-12T09:00:00Z'),
      location: "Puskesmas Gunung Putri"
    },
    {
      title: "Pelatihan Digital Marketing untuk Pemula",
      excerpt: "Belajar jualan online lewat TikTok dan Shopee.",
      content: "<p>Khusus pemuda karang taruna dan ibu-ibu PKK. Kita akan belajar cara foto produk dan bikin caption yang menjual.</p>",
      startDate: new Date('2026-05-20T13:00:00Z'),
      location: "Aula Desa"
    },
    {
      title: "Festival Layang-Layang Cikeas",
      excerpt: "Lomba layangan hias dan aduan tingkat kecamatan.",
      content: "<p>Saksikan langit Cikeas penuh warna! Hadiah total jutaan rupiah. Pendaftaran Rp 20.000 per tim.</p>",
      startDate: new Date('2026-07-15T15:00:00Z'),
      location: "Lapangan Bola Cikeas"
    },
    {
      title: "Kerja Bakti Bersih Sungai Cileungsi",
      excerpt: "Aksi nyata peduli lingkungan mencegah banjir.",
      content: "<p>Wajib bagi bapak-bapak setiap RT mengirimkan 5 perwakilan. Bawa cangkul dan karung masing-masing.</p>",
      startDate: new Date('2026-01-25T07:00:00Z'),
      location: "Bantaran Sungai RW 02"
    },
    {
      title: "Posyandu Balita & Cek Stunting",
      excerpt: "Pantau tumbuh kembang anak demi masa depan cerah.",
      content: "<p>Penimbangan berat badan, ukur tinggi, dan pemberian Vitamin A. Ada pembagian makanan tambahan (PMT) puding susu.</p>",
      startDate: new Date('2026-02-15T08:00:00Z'),
      location: "Posyandu Melati"
    },
    {
      title: "Donor Darah PMI",
      excerpt: "Setetes darahmu, nyawa bagi sesama.",
      content: "<p>Kerjasama Karang Taruna dengan PMI Kab. Bogor. Target 100 kantong darah. Disediakan snack dan souvenir.</p>",
      startDate: new Date('2026-03-20T09:00:00Z'),
      location: "Kantor Desa"
    },
    {
      title: "Lomba Tumpeng HUT RI",
      excerpt: "Adu kreasi tumpeng antar RT se-Desa.",
      content: "<p>Kriteria penilaian: Rasa, Kebersihan, dan Kreativitas hiasan. Tumpeng akan dimakan bersama saat malam tirakatan.</p>",
      startDate: new Date('2026-08-16T10:00:00Z'),
      location: "Halaman Kantor Desa"
    },
    {
      title: "Pasar Murah Sembako",
      excerpt: "Minyak goreng dan beras harga subsidi pemerintah.",
      content: "<p>Paket Sembako (Beras 5kg, Minyak 2L, Gula 1kg) hanya Rp 50.000. Wajib bawa KTP asli domisili setempat.</p>",
      startDate: new Date('2026-04-01T08:00:00Z'),
      location: "Lapangan Parkir Pasar"
    },
    {
      title: "Nonton Bareng Timnas vs Jepang",
      excerpt: "Dukung Garuda di Kualifikasi Piala Dunia!",
      content: "<p>Nobar layar tancap di lapangan. Disediakan kopi dan kacang rebus gratis. Pakai baju merah!</p>",
      startDate: new Date('2026-06-10T19:00:00Z'),
      location: "Lapangan Voli RW 07"
    },
    {
      title: "Workshop Ecoprint Ibu PKK",
      excerpt: "Membuat motif kain alami dari daun-daunan sekitar.",
      content: "<p>Pelatihan membuat kerajinan bernilai jual tinggi. Peserta harap membawa kain putih polos (katun).</p>",
      startDate: new Date('2026-05-05T09:00:00Z'),
      location: "Sekretariat PKK"
    },
    {
      title: "Penyuluhan Bahaya Demam Berdarah",
      excerpt: "Waspada musim hujan, ayo 3M Plus.",
      content: "<p>Sosialisasi pencegahan DBD dan pembagian bubuk Abate gratis ke setiap rumah.</p>",
      startDate: new Date('2026-01-10T16:00:00Z'),
      location: "Balai RW 03"
    },
    {
      title: "Turnamen Catur Warga",
      excerpt: "Asah otak sambil ngopi di pos ronda.",
      content: "<p>Sistem gugur. Juara 1 dapat Kambing, Juara 2 dapat Kipas Angin. Pendaftaran gratis.</p>",
      startDate: new Date('2026-09-01T20:00:00Z'),
      location: "Pos Ronda Utama"
    },
    {
      title: "Santunan Anak Yatim",
      excerpt: "Berbagi kebahagiaan di bulan Muharram.",
      content: "<p>Acara doa bersama dan pemberian santunan pendidikan untuk 50 anak yatim piatu di lingkungan desa.</p>",
      startDate: new Date('2026-07-20T16:00:00Z'),
      location: "Masjid Jami"
    },
    {
      title: "Jalan Sehat Keluarga",
      excerpt: "Minggu pagi ceria, badan sehat hati gembira.",
      content: "<p>Rute: Kantor Desa - Perumahan Griya - Kembali ke Kantor Desa (3KM). Doorprize Kulkas 2 Pintu!</p>",
      startDate: new Date('2026-08-25T06:00:00Z'),
      location: "Start: Kantor Desa"
    },
    {
      title: "Pelatihan Pembuatan Kompos",
      excerpt: "Ubah sampah rumah tangga jadi pupuk berguna.",
      content: "<p>Mengurangi sampah ke TPA dengan metode maggot dan komposter sederhana. Narasumber dari Dinas Lingkungan Hidup.</p>",
      startDate: new Date('2026-02-28T09:00:00Z'),
      location: "Bank Sampah Mandiri"
    },
    {
      title: "Festival Musik Akustik Pemuda",
      excerpt: "Wadah kreativitas anak band lokal.",
      content: "<p>Tampilkan lagu ciptaan sendiri atau cover lagu populer. Juara favorit ditentukan voting penonton.</p>",
      startDate: new Date('2026-10-28T19:00:00Z'),
      location: "Coffee Shop Pojok"
    },
    {
      title: "Rapat Musrenbang Desa",
      excerpt: "Tentukan arah pembangunan desa tahun depan.",
      content: "<p>Musyawarah Perencanaan Pembangunan. Perwakilan warga silakan sampaikan aspirasi jalan rusak atau lampu mati di sini.</p>",
      startDate: new Date('2026-01-15T09:00:00Z'),
      location: "Aula Kantor Desa"
    }
  ]

  for (const event of eventsData) {
    await prisma.event.create({
      data: {
        ...event,
        slug: createSlug(event.title),
        imageUrl: getPlaceholder(event.title, 'C56A4A'), // Warna accent
        isActive: true,
      }
    })
  }
  console.log(`✅ Created 20 Events`)

  // ------------------------------------------------
  // 4. SEED UMKM & PRODUCTS (20 UMKM)
  // ------------------------------------------------

  // Mapping Kategori ID untuk dipakai di bawah
  const katKuliner = categories.find(c => c.slug === 'kuliner')?.id
  const katJasa = categories.find(c => c.slug === 'jasa')?.id
  const katFashion = categories.find(c => c.slug === 'fashion')?.id

  const umkmList = [
    // --- KULINER ---
    {
      name: "Seblak Ceker Bledag", catId: katKuliner, desc: "Seblak pedas level mampus, topping melimpah.", products: [
        { name: "Seblak Komplit Spesial", price: 15000 }, { name: "Ceker Mercon", price: 12000 }
      ]
    },
    {
      name: "Warung Nasi Bu Sri", catId: katKuliner, desc: "Masakan rumahan, rasa bintang lima harga kaki lima.", products: [
        { name: "Nasi Rames Rendang", price: 20000 }, { name: "Sayur Asem", price: 5000 }, { name: "Ikan Mas Goreng", price: 12000 }
      ]
    },
    {
      name: "Martabak Manis Bangka 88", catId: katKuliner, desc: "Martabak tebal, wisman asli, topping tumpah.", products: [
        { name: "Martabak Coklat Keju", price: 35000 }, { name: "Martabak Spesial Jagung", price: 30000 }
      ]
    },
    {
      name: "Kopi Susu Tetangga Sebelah", catId: katKuliner, desc: "Kopi gula aren kekinian tempat nongkrong asik.", products: [
        { name: "Es Kopi Susu Gula Aren", price: 18000 }, { name: "Croffle Original", price: 15000 }
      ]
    },
    {
      name: "Sate Madura Cak Dul", catId: katKuliner, desc: "Sate ayam empuk dengan bumbu kacang kental.", products: [
        { name: "Sate Ayam 10 Tusuk", price: 25000 }, { name: "Sate Kambing", price: 35000 }
      ]
    },
    {
      name: "Bakso Beranak Mas Yono", catId: katKuliner, desc: "Bakso super besar isinya bakso kecil dan telur.", products: [
        { name: "Bakso Beranak Jumbo", price: 25000 }, { name: "Mie Ayam Ceker", price: 15000 }
      ]
    },
    {
      name: "Keripik Pisang Aneka Rasa", catId: katKuliner, desc: "Oleh-oleh khas, renyah dan gurih.", products: [
        { name: "Keripik Pisang Coklat", price: 15000 }, { name: "Keripik Pisang Balado", price: 15000 }
      ]
    },
    {
      name: "Pempek Palembang Cek Ani", catId: katKuliner, desc: "Cuko kental asli gula batok Linggau.", products: [
        { name: "Kapal Selam", price: 18000 }, { name: "Lenjer Besar", price: 15000 }
      ]
    },

    // --- JASA ---
    {
      name: "Laundry Kinclong Express", catId: katJasa, desc: "Cuci setrika selesai dalam 4 jam. Wangi tahan lama.", products: [
        { name: "Cuci Komplit 1kg", price: 7000 }, { name: "Cuci Bedcover", price: 25000 }
      ]
    },
    {
      name: "Bengkel Motor Mas Tono", catId: katJasa, desc: "Servis motor segala merk, ganti oli, tune up.", products: [
        { name: "Servis Ringan", price: 45000 }, { name: "Ganti Oli Matic", price: 55000 }
      ]
    },
    {
      name: "Pangkas Rambut Garut", catId: katJasa, desc: "Potongan rapi, pijat kepala gratis.", products: [
        { name: "Potong Dewasa", price: 20000 }, { name: "Potong Anak", price: 15000 }
      ]
    },
    {
      name: "Servis AC Dingin Pol", catId: katJasa, desc: "Cuci AC, tambah freon, bongkar pasang.", products: [
        { name: "Cuci AC Split", price: 75000 }, { name: "Isi Freon R32", price: 150000 }
      ]
    },
    {
      name: "Jahit Permak Bu Dewi", catId: katJasa, desc: "Permak jeans, potong celana, pasang resleting.", products: [
        { name: "Potong Celana", price: 15000 }, { name: "Ganti Resleting Jaket", price: 25000 }
      ]
    },
    {
      name: "Cuci Steam Motor Salju", catId: katJasa, desc: "Cuci motor bersih sampai ke sela-sela mesin.", products: [
        { name: "Cuci Steam Motor", price: 15000 }, { name: "Semir Ban", price: 5000 }
      ]
    },

    // --- FASHION ---
    {
      name: "Distro Kaos Gunung Putri", catId: katFashion, desc: "Kaos sablon desain lokal kualitas distro.", products: [
        { name: "T-Shirt Logo GP", price: 85000 }, { name: "Hoodie Polos", price: 120000 }
      ]
    },
    {
      name: "Toko Jilbab Syari", catId: katFashion, desc: "Jilbab berbagai model, bahan adem tidak menerawang.", products: [
        { name: "Jilbab Pashmina", price: 35000 }, { name: "Bergo Instan", price: 45000 }
      ]
    },
    {
      name: "Sepatu Cibaduyut Asli", catId: katFashion, desc: "Sepatu kulit asli buatan tangan pengrajin.", products: [
        { name: "Pantofel Pria Kulit", price: 250000 }, { name: "Sandal Kulit Wanita", price: 150000 }
      ]
    },
    {
      name: "Batik Tulis Khas Bogor", catId: katFashion, desc: "Motif kujang dan hujan, bahan katun primisima.", products: [
        { name: "Kemeja Batik Pria", price: 150000 }, { name: "Kain Batik 2 Meter", price: 120000 }
      ]
    },

    // --- LAINNYA ---
    {
      name: "Toko Sembako Murah Rejeki", catId: categories.find(c => c.slug === 'pertanian-peternakan')?.id, desc: "Sedia beras, telur, minyak goreng harga grosir.", products: [
        { name: "Beras Pandan Wangi 5kg", price: 70000 }, { name: "Telur Ayam 1kg", price: 28000 }
      ]
    },
    {
      name: "Tanaman Hias Pak Asep", catId: categories.find(c => c.slug === 'pertanian-peternakan')?.id, desc: "Jual aglonema, monstera, dan pupuk organik.", products: [
        { name: "Monstera Deliciosa", price: 75000 }, { name: "Pupuk Kandang Karung", price: 15000 }
      ]
    },
  ]

  for (const umkm of umkmList) {
    if (!umkm.catId) continue; // Skip if category not found

    await prisma.umkm.create({
      data: {
        name: umkm.name,
        slug: createSlug(umkm.name),
        description: umkm.desc,
        address: "Jl. Raya Gunung Putri No. " + Math.floor(Math.random() * 100),
        phone: "628" + Math.floor(1000000000 + Math.random() * 9000000000).toString(),
        imageUrl: getPlaceholder(umkm.name, '1F3D2B'),
        isActive: true,
        categoryId: umkm.catId,
        products: {
          create: umkm.products.map(prod => ({
            name: prod.name,
            slug: createSlug(prod.name),
            description: `Deskripsi singkat untuk ${prod.name}. Kualitas terjamin.`,
            price: prod.price, // Prisma will handle number -> Decimal conversion
            imageUrl: getPlaceholder(prod.name, '333333'),
            isActive: true
          }))
        }
      }
    })
  }
  console.log(`✅ Created 20 UMKMs with Products`)

  console.log('🌱 Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })