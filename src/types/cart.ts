// src/types/cart.ts
// Tipe data keranjang & cookie keranjang (lihat aturan cookie di CLAUDE.md).

// Satu item di keranjang. Hanya menyimpan data non-sensitif (ID produk, jumlah, harga).
export type CartItem = {
  productId: string
  quantity: number
  price: number
}

// Item keranjang yang sudah digabung dengan info produk (untuk tampilan halaman keranjang).
// Gabungan CartItem (dari cookie) + detail produk (nama, foto, harga coret) + status terpilih.
export type CartLineItem = {
  productId: string
  name: string
  imageUrl: string
  price: number // harga jual efektif (promo)
  originalPrice: number
  quantity: number
  selected: boolean
  badge?: string
}
