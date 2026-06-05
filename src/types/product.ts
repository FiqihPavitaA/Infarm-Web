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
