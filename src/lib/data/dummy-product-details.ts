// src/lib/data/dummy-product-details.ts
// Dummy data & helper untuk Halaman Detail Produk (galeri foto, rating, deskripsi, ulasan,
// rekomendasi kombo, dan produk "baru dilihat"). Sementara, sampai OMS + Supabase siap.
// TODO: ganti seluruh fungsi di file ini dengan query Supabase setelah OMS selesai.

import type { Product, ProductDetail, ProductReview } from '@/types/product'
import { dummyProducts } from '@/lib/data/dummy-products'

const PLACEHOLDER_IMAGE = '/images/product-placeholder.svg'

// === Galeri Foto ===

// Membuat array foto produk tiruan (maks 9). Sementara memakai placeholder yang sama.
// TODO: ganti dengan daftar foto asli dari Supabase Storage.
function buildGallery(count = 5): string[] {
  const total = Math.min(Math.max(count, 1), 9)
  return Array.from({ length: total }, () => PLACEHOLDER_IMAGE)
}

// === Ulasan ===

// Daftar ulasan tiruan dengan variasi rating, kategori filter, tanggal, dan foto ulasan.
const DUMMY_REVIEWS: ProductReview[] = [
  {
    id: 'rev-001',
    authorName: 'Siti Rahmawati',
    rating: 5,
    date: '2026-05-28',
    comment:
      'Tanaman cabai saya jadi lebih subur dan daunnya hijau merata. Pengiriman cepat, packing rapi. Pasti repeat order!',
    category: 'Kualitas',
    imageUrls: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
  },
  {
    id: 'rev-002',
    authorName: 'Budi Santoso',
    rating: 5,
    date: '2026-05-20',
    comment: 'Barang sesuai deskripsi, harga jauh lebih murah dari toko sebelah. Recommended.',
    category: 'Harga',
  },
  {
    id: 'rev-003',
    authorName: 'Dewi Lestari',
    rating: 4,
    date: '2026-05-12',
    comment:
      'Produk bagus, hasil terlihat setelah 2 minggu pemakaian. Bintang 4 karena kurir agak lama sampai.',
    category: 'Pengiriman',
    imageUrls: [PLACEHOLDER_IMAGE],
  },
  {
    id: 'rev-004',
    authorName: 'Agus Pratama',
    rating: 5,
    date: '2026-04-30',
    comment: 'Sudah langganan dari dulu, kualitas konsisten. Tanah jadi gembur.',
    category: 'Kualitas',
  },
  {
    id: 'rev-005',
    authorName: 'Maya Anggraini',
    rating: 5,
    date: '2026-04-18',
    comment: 'Packing aman pakai bubble wrap, tidak ada yang bocor. Mantap!',
    category: 'Pengiriman',
  },
]

// === Detail Produk ===

// Mengambil detail lengkap satu produk berdasarkan id, atau null bila tidak ditemukan.
// TODO: ganti dengan query Supabase (join foto, rating agregat, ulasan) setelah OMS selesai.
export function getProductDetail(id: string): ProductDetail | null {
  const base = dummyProducts.find((p) => p.id === id)
  if (!base) return null

  return {
    ...base,
    images: buildGallery(5),
    rating: 5.0,
    reviewCount: 145,
    description:
      'Produk original infarm yang diformulasikan khusus untuk hasil maksimal. ' +
      'Aman digunakan untuk berbagai jenis tanaman, baik di pot maupun lahan terbuka. ' +
      'Membantu menyuburkan tanah, memperkuat akar, dan mempercepat pertumbuhan tanaman.\n\n' +
      'Spesifikasi:\n' +
      '• Berat bersih: 500 gram\n' +
      '• Komposisi: bahan organik pilihan, ramah lingkungan\n' +
      '• Cara pakai: larutkan sesuai dosis pada kemasan, aplikasikan 1–2 minggu sekali\n' +
      '• Penyimpanan: simpan di tempat sejuk dan kering, jauh dari sinar matahari langsung',
    reviews: DUMMY_REVIEWS,
  }
}

// === Rekomendasi Kombo ===

// Hasil rekomendasi paket kombo "Produk A + Produk B" beserta perhitungan hematnya.
export type BundleSuggestion = {
  primary: Product
  partner: Product
  bundlePrice: number // harga paket setelah hemat
  savings: number // total rupiah yang dihemat dibanding beli terpisah
}

// Menyusun rekomendasi kombo untuk sebuah produk: pasangkan dengan produk lain,
// lalu beri diskon kombo tambahan ~10% dari total harga promo keduanya.
export function getBundleSuggestion(product: Product): BundleSuggestion | null {
  const partner = dummyProducts.find((p) => p.id !== product.id)
  if (!partner) return null

  const comboBase = product.promoPrice + partner.promoPrice
  const bundlePrice = Math.round((comboBase * 0.9) / 1000) * 1000 // diskon kombo 10%, dibulatkan ribuan
  const originalCombo = product.originalPrice + partner.originalPrice

  return {
    primary: product,
    partner,
    bundlePrice,
    savings: originalCombo - bundlePrice,
  }
}

// === Produk "Baru Dilihat" ===

// Mengembalikan 2–3 produk tiruan sebagai simulasi riwayat "baru dilihat" (kecuali produk saat ini).
// TODO: ganti dengan riwayat asli dari cookie/localStorage setelah fitur tracking dibuat.
export function getRecentlyViewed(currentId: string, limit = 3): Product[] {
  return dummyProducts.filter((p) => p.id !== currentId).slice(0, limit)
}
