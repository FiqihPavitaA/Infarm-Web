// src/components/cart/ProtectionInfo.tsx
// Baris informasi perlindungan: "Pembayaran aman" & "Perlindungan privasi". Presentational.

// Menampilkan dua jaminan perlindungan dengan ikon, dipisah garis vertikal.
export default function ProtectionInfo() {
  return (
    <div className="mt-2 flex items-center justify-around bg-white py-4 text-xs text-zinc-500">
      <div className="flex items-center gap-1.5">
        <CardIcon />
        <span>Pembayaran aman</span>
      </div>
      <span className="h-6 w-px bg-zinc-200" />
      <div className="flex items-center gap-1.5">
        <ShieldIcon />
        <span>Perlindungan privasi</span>
      </div>
    </div>
  )
}

function CardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
