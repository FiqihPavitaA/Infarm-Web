// src/types/product.ts
// Tipe data produk untuk digunakan di seluruh project (katalog, kartu produk, dll)

export type Product = {
  id: string
  name: string
  originalPrice: number
  promoPrice: number
  imageUrl: string
  badge?: string
}

// Satu ulasan pembeli untuk halaman detail produk
export type ProductReview = {
  id: string
  authorName: string
  rating: number // 1–5
  date: string // ISO date, mis. '2026-05-20'
  comment: string
  category: string // kategori filter ulasan, mis. 'Kualitas' | 'Pengiriman'
  imageUrls?: string[] // foto ulasan (opsional)
}

// Produk lengkap untuk Halaman Detail Produk — memperluas Product dengan galeri foto,
// rating agregat, deskripsi, dan daftar ulasan. promoPrice = harga jual efektif (setelah diskon).
export type ProductDetail = Product & {
  images: string[] // galeri foto produk (maksimal 9, dipakai slider)
  rating: number // rata-rata rating, mis. 5.0
  reviewCount: number // jumlah ulasan
  description: string // penjelasan / spesifikasi detail produk
  reviews: ProductReview[]
}
