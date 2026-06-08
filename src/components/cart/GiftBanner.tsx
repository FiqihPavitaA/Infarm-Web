// src/components/cart/GiftBanner.tsx
// Banner notifikasi hadiah dinamis. Menampilkan sisa belanja menuju hadiah gratis,
// atau ucapan selamat bila syarat sudah terpenuhi. Presentational (logika dihitung di parent).

import { formatRupiah } from '@/lib/format'

// Syarat minimal belanja (dari item tercentang) untuk dapat hadiah gratis
export const GIFT_THRESHOLD = 100000

// Menampilkan banner hadiah berdasarkan total belanja item yang dicentang.
export default function GiftBanner({ selectedTotal }: { selectedTotal: number }) {
  const remaining = GIFT_THRESHOLD - selectedTotal
  const qualified = remaining <= 0

  return (
    <div className="mx-3 mt-3 flex items-center gap-2 rounded-lg bg-brand-surface px-4 py-3 text-sm text-zinc-700">
      <GiftIcon className="shrink-0 text-brand-primary" />
      {qualified ? (
        <p>
          <span className="font-semibold">Selamat!</span> Anda berhak mendapatkan Hadiah Gratis
        </p>
      ) : (
        <p>
          Tambah <span className="font-semibold">{formatRupiah(remaining)}</span> untuk dapat Hadiah
          Gratis
        </p>
      )}
    </div>
  )
}

function GiftIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}
