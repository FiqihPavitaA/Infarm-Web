// src/components/product/BundleOffer.tsx
// Seksi rekomendasi paket kombo "Produk A + Produk B" — berupa kartu yang bisa diklik
// menuju halaman kombo, lengkap dengan info harga hemat. Server Component.

import Image from 'next/image'
import Link from 'next/link'
import type { BundleSuggestion } from '@/lib/data/dummy-product-details'
import { formatRupiah } from '@/lib/format'

// Menampilkan kartu kombo hemat yang clickable; menautkan ke halaman paket kombo.
export default function BundleOffer({ bundle }: { bundle: BundleSuggestion }) {
  const { primary, partner, bundlePrice, savings } = bundle

  return (
    <section className="bg-white px-4 py-4">
      <h2 className="mb-2 text-sm font-bold text-zinc-800">Beli Kombo Lebih Hemat</h2>

      {/* Seluruh kartu adalah satu tombol/link yang bisa diklik */}
      <Link
        href={`/produk/kombo/${primary.id}-${partner.id}`}
        className="flex items-center gap-3 rounded-xl border border-brand-light bg-brand-surface p-3 transition hover:brightness-95 active:scale-[0.99]"
      >
        {/* Foto Produk A + ikon plus + Foto Produk B */}
        <div className="flex shrink-0 items-center gap-1">
          <ComboThumb src={primary.imageUrl} alt={primary.name} />
          <span className="text-lg font-bold text-brand-primary">+</span>
          <ComboThumb src={partner.imageUrl} alt={partner.name} />
        </div>

        {/* Info harga hemat */}
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-xs text-zinc-600">
            Beli bareng <span className="font-semibold">{partner.name}</span>
          </p>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
            <span className="text-base font-bold text-red-500">{formatRupiah(bundlePrice)}</span>
            <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-bold text-red-500">
              Hemat {formatRupiah(savings)}
            </span>
          </div>
        </div>

        {/* Panah penanda dapat diklik */}
        <ChevronRightIcon className="shrink-0 text-zinc-400" />
      </Link>
    </section>
  )
}

// === Sub-komponen ===

// Thumbnail kecil 1 produk di dalam kartu kombo
function ComboThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-zinc-100 bg-white">
      {/* unoptimized: placeholder SVG sementara */}
      <Image src={src} alt={alt} fill unoptimized sizes="56px" className="object-cover" />
    </div>
  )
}

function ChevronRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
