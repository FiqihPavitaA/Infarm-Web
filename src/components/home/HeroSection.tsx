// src/components/home/HeroSection.tsx
// Section 1 homepage: App Bar (navigasi atas), floating search, headline marketing, dan trust badges.
// Server Component — belum ada interaktivitas (search/menu masih placeholder visual). Responsive mobile → desktop.

import Image from 'next/image'
import Link from 'next/link'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

// Path gambar background hero. Taruh file di: public/images/hero-background.jpg
const HERO_IMAGE_PATH = '/images/hero-background.jpg'

// Menampilkan bagian hero teratas homepage: app bar fixed full-width, kolom pencarian,
// judul marketing, dan tiga trust badge. Menyesuaikan diri dari mobile hingga layar lebar.
export default function HeroSection() {
  // Cek ketersediaan file gambar hero agar tidak muncul broken image bila belum di-upload.
  // Jika file ada → tampilkan <Image> responsive; jika belum → fallback ke gradient.
  const heroImageExists = existsSync(join(process.cwd(), 'public', HERO_IMAGE_PATH))

  return (
    <section className="relative isolate flex min-h-[80vh] flex-col overflow-hidden">
      {/* === Background hero === */}
      {/* Fallback gradient — selalu ada di lapisan paling belakang (-z-20) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-b from-sky-200 via-sky-100 to-green-200"
      />
      {/* Gambar background responsive: `fill` + `object-cover` mengisi penuh section dan
          crop proporsional di semua ukuran layar (mobile/tablet/desktop). `object-center`
          mengatur titik fokus — ganti ke object-top/object-bottom bila perlu.
          Tampil otomatis begitu file public/images/hero-background.jpg tersedia. */}
      {heroImageExists && (
        <Image
          src={HERO_IMAGE_PATH}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
      )}
      {/* Overlay gelap tipis agar teks tetap kontras di atas gambar/gradient */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/10" />

      {/* === App Bar (fixed top, full-width) === */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#3BB346] text-white shadow-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Tombol menu (kiri) */}
          <button
            type="button"
            aria-label="Buka menu"
            className="rounded-md p-1 transition active:scale-95"
          >
            <HamburgerIcon />
          </button>

          {/* Logo (tengah) */}
          <Link href="/" className="text-2xl font-bold lowercase tracking-tight">
            infarm
          </Link>

          {/* Aksi (kanan): Search, Cart, Profile */}
          <nav className="flex items-center gap-3 sm:gap-4">
            <button type="button" aria-label="Cari" className="p-1 transition active:scale-95">
              <SearchIcon />
            </button>
            <Link href="/keranjang" aria-label="Keranjang" className="p-1">
              <CartIcon />
            </Link>
            <Link href="/akun" aria-label="Akun" className="p-1">
              <ProfileIcon />
            </Link>
          </nav>
        </div>
      </header>

      {/* === Konten hero === */}
      {/* pt besar memberi ruang untuk app bar fixed; konten dibatasi max-w-6xl agar rapi di layar lebar */}
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 pt-20 pb-12 sm:px-6 sm:pt-24 lg:px-8">
        {/* Floating search input */}
        <div className="flex max-w-xl items-center gap-2 rounded-full border border-white/60 bg-white/70 px-5 py-3 shadow-md backdrop-blur-sm">
          <input
            type="text"
            placeholder="Media tanam"
            aria-label="Cari produk"
            className="w-full bg-transparent text-base text-zinc-700 placeholder:text-zinc-500 focus:outline-none"
          />
          <SearchIcon className="shrink-0 text-zinc-600" />
        </div>

        {/* Marketing headline — warna hijau senada dengan header (#3BB346) */}
        <h1 className="mt-8 max-w-2xl font-sans text-4xl font-extrabold leading-tight tracking-tight text-[#3BB346] sm:text-5xl lg:text-6xl">
          Berkebun Jadi Mudah
          <br />
          Pasti Panen
        </h1>

        {/* Trust badges — vertikal di mobile, sejajar di layar lebih besar */}
        <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <TrustBadge highlight="3,4 Juta +" label="Pembeli Puas" />
          <TrustBadge highlight="4.9" label="Rating Produk" />
          <TrustBadge highlight="100%" label="Produk Original" />
        </ul>
      </div>
    </section>
  )
}

// === Sub-komponen ===

// Satu kotak trust badge semi-transparan dengan angka highlight (hijau) dan label di bawahnya
function TrustBadge({ highlight, label }: { highlight: string; label: string }) {
  return (
    <li className="rounded-xl bg-white/60 px-4 py-2 text-center shadow-sm backdrop-blur-sm sm:min-w-[150px]">
      <p className="text-2xl font-extrabold text-[#2e9c3a]">{highlight}</p>
      <p className="text-sm font-medium text-zinc-800">{label}</p>
    </li>
  )
}

// === Ikon inline (SVG) ===
// Memakai inline SVG agar tidak perlu menambah dependency icon library (lihat aturan CLAUDE.md).

function HamburgerIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function SearchIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function CartIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="21" r="1.5" />
      <circle cx="19" cy="21" r="1.5" />
      <path d="M2.5 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L23 7H6" />
    </svg>
  )
}

function ProfileIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}
