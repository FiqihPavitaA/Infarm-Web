// src/components/product/RecentlyViewed.tsx
// Seksi "Kamu Sempat Lihat Ini" — daftar horizontal kartu produk yang baru dilihat. Server Component.

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types/product'
import { formatRupiah } from '@/lib/format'

// Menampilkan daftar produk yang baru dilihat dalam scroll horizontal.
export default function RecentlyViewed({ products }: { products: Product[] }) {
  if (products.length === 0) return null

  return (
    <section className="bg-white px-4 py-4">
      <h2 className="mb-3 text-sm font-bold text-zinc-800">Kamu Sempat Lihat Ini</h2>

      {/* Daftar horizontal yang bisa digeser */}
      <ul className="flex gap-3 overflow-x-auto scrollbar-hide">
        {products.map((product) => (
          <li key={product.id} className="w-32 shrink-0">
            <RecentCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}

// === Sub-komponen ===

// Kartu kecil 1 produk untuk daftar "baru dilihat"
function RecentCard({ product }: { product: Product }) {
  const { id, name, promoPrice, imageUrl } = product

  return (
    <Link
      href={`/produk/${id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-square w-full bg-zinc-50">
        {/* unoptimized: placeholder SVG sementara */}
        <Image
          src={imageUrl}
          alt={name}
          fill
          unoptimized
          sizes="128px"
          className="object-cover transition group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-2">
        <h3 className="line-clamp-2 text-xs leading-snug text-zinc-700">{name}</h3>
        <p className="mt-1 text-sm font-bold text-red-500">{formatRupiah(promoPrice)}</p>
      </div>
    </Link>
  )
}
