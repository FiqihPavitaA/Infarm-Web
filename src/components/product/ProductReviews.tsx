'use client'

// src/components/product/ProductReviews.tsx
// Seksi ulasan produk: skor kepuasan ringkas, filter kategori, dan daftar komentar pembeli.
// Client Component karena filter kategori memakai state interaktif.

import Image from 'next/image'
import { useMemo, useState } from 'react'
import type { ProductReview } from '@/types/product'
import StarRating from '@/components/product/StarRating'

// Menampilkan ringkasan rating + filter kategori + daftar ulasan yang bisa difilter.
export default function ProductReviews({
  rating,
  reviewCount,
  reviews,
}: {
  rating: number
  reviewCount: number
  reviews: ProductReview[]
}) {
  // Kategori filter dibangun dinamis dari data ulasan, diawali "Semua"
  const categories = useMemo(() => {
    const unique = Array.from(new Set(reviews.map((r) => r.category)))
    return ['Semua', ...unique]
  }, [reviews])

  const [activeCategory, setActiveCategory] = useState('Semua')

  // Saring ulasan sesuai kategori aktif
  const visibleReviews =
    activeCategory === 'Semua'
      ? reviews
      : reviews.filter((r) => r.category === activeCategory)

  return (
    <section className="bg-white px-4 py-4">
      <h2 className="mb-3 text-sm font-bold text-zinc-800">Ulasan Pembeli</h2>

      {/* === Skor kepuasan ringkas === */}
      <div className="flex items-center gap-4 rounded-xl bg-brand-surface p-4">
        <div className="text-center">
          <p className="text-3xl font-extrabold text-zinc-800">{rating.toFixed(1)}</p>
          <p className="text-xs text-zinc-500">dari 5</p>
        </div>
        <div>
          <StarRating rating={rating} size={18} />
          <p className="mt-1 text-xs text-zinc-500">{reviewCount} ulasan terverifikasi</p>
        </div>
      </div>

      {/* === Filter kategori ulasan === */}
      <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition ${
              cat === activeCategory
                ? 'border-brand-primary bg-brand-primary text-white'
                : 'border-zinc-200 bg-white text-zinc-600 hover:border-brand-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* === Daftar ulasan === */}
      <ul className="mt-4 divide-y divide-zinc-100">
        {visibleReviews.map((review) => (
          <li key={review.id} className="py-4 first:pt-0">
            <ReviewItem review={review} />
          </li>
        ))}
        {visibleReviews.length === 0 && (
          <li className="py-6 text-center text-sm text-zinc-400">
            Belum ada ulasan untuk kategori ini.
          </li>
        )}
      </ul>
    </section>
  )
}

// === Sub-komponen ===

// Satu baris ulasan: avatar inisial, nama, tanggal, bintang, komentar, dan foto (opsional)
function ReviewItem({ review }: { review: ProductReview }) {
  const { authorName, rating, date, comment, imageUrls } = review

  return (
    <div>
      <div className="flex items-center gap-2">
        {/* Avatar inisial */}
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-light text-sm font-bold text-white">
          {authorName.charAt(0)}
        </span>
        <div>
          <p className="text-sm font-semibold text-zinc-800">{authorName}</p>
          <p className="text-xs text-zinc-400">{formatReviewDate(date)}</p>
        </div>
      </div>

      <div className="mt-2">
        <StarRating rating={rating} size={14} />
      </div>

      <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{comment}</p>

      {/* Foto ulasan (opsional) */}
      {imageUrls && imageUrls.length > 0 && (
        <div className="mt-2 flex gap-2">
          {imageUrls.map((src, i) => (
            <div
              key={i}
              className="relative h-16 w-16 overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50"
            >
              {/* unoptimized: placeholder SVG sementara */}
              <Image src={src} alt={`Foto ulasan ${i + 1}`} fill unoptimized sizes="64px" className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Memformat tanggal ISO menjadi format Indonesia, mis. '2026-05-28' -> '28 Mei 2026'
function formatReviewDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}
