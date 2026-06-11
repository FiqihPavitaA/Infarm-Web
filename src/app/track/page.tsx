// src/app/track/page.tsx
// Halaman Lacak Pesanan (Order Tracking) untuk pembeli umum (guest checkout).
// Dua state berdasarkan query param `?order=`:
//   - Tanpa param        → form pencarian nomor pesanan
//   - Dengan param valid  → ringkasan paket + linimasa status
//   - Dengan param invalid → kartu peringatan + form pencarian
// Server Component: pencarian data dilakukan di server (lib/data/dummy-orders).

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import TrackSearchForm from '@/components/track/TrackSearchForm'
import TrackingTimeline from '@/components/track/TrackingTimeline'
import { findOrderByNumber } from '@/lib/data/dummy-orders'

export const metadata: Metadata = {
  title: 'Lacak Pesanan — infarm',
  description: 'Pantau status pengiriman pesanan Infarm Anda secara real-time.',
}

// searchParams berupa Promise di Next.js 16 (App Router)
type TrackPageProps = {
  searchParams: Promise<{ order?: string }>
}

export default async function TrackPage({ searchParams }: TrackPageProps) {
  const { order } = await searchParams
  const hasQuery = typeof order === 'string' && order.trim().length > 0
  // TODO: ganti dengan query order Supabase + tracking real Mengantar setelah OMS selesai.
  const found = hasQuery ? findOrderByNumber(order!) : undefined

  return (
    // pt-14 mengimbangi tinggi header yang fixed (h-14)
    <div className="flex min-h-screen flex-col bg-slate-50 pt-14 text-zinc-900">
      {/* Header lokal — warna & font sama dengan beranda, tanpa aksi search/cart/profile */}
      <header className="fixed inset-x-0 top-0 z-50 bg-brand-primary text-white shadow-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Tombol kembali ke beranda */}
            <Link
              href="/"
              aria-label="Kembali ke beranda"
              className="rounded-md p-1 transition active:scale-95"
            >
              <BackIcon />
            </Link>

            {/* Logo + nama brand */}
            <Link href="/" className="flex items-center gap-3 sm:gap-4">
              <Image
                src="/images/logo-infarm.png"
                alt="Logo Infarm"
                width={36}
                height={36}
                priority
                className="h-9 w-auto object-contain"
              />
              <span className="text-2xl font-bold tracking-tight">Infarm</span>
            </Link>
          </div>
        </div>
      </header>

      {/* === Konten utama === */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        {found ? (
          // ----- STATE DUA: hasil pelacakan -----
          <div className="space-y-5">
            {/* a. Ringkasan informasi paket */}
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Nomor Pesanan</p>
                  <p className="text-base font-bold text-gray-900">{found.orderNumber}</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  {statusLabel(found.events[0].status)}
                </span>
              </div>

              <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 border-t border-gray-100 pt-4 sm:grid-cols-2">
                <InfoRow label="Ekspedisi & No. Resi" value={`${found.courier} · ${found.trackingNumber}`} />
                <InfoRow label="Penerima" value={found.recipientName} />
                <InfoRow label="Estimasi Tiba" value={found.estimatedArrival} />
              </dl>
            </section>

            {/* b. Linimasa status pengiriman */}
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-sm font-bold text-gray-900">Riwayat Pengiriman</h2>
              <TrackingTimeline events={found.events} />
            </section>

            {/* Lacak pesanan lain */}
            <div className="text-center">
              <Link
                href="/track"
                className="text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700"
              >
                ← Lacak pesanan lain
              </Link>
            </div>
          </div>
        ) : (
          // ----- STATE SATU: form pencarian (+ error bila param tak ditemukan) -----
          <div className="flex min-h-[60vh] flex-col justify-center">
            {/* Kartu putih pembungkus seluruh form pencarian */}
            <div className="mx-auto w-full max-w-xl rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-10">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-800">Lacak Pesanan Anda</h1>
                <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                  Masukkan nomor pesanan Infarm untuk melihat status pengiriman kurir secara
                  real-time.
                </p>
              </div>

              {/* Kartu peringatan bila nomor pesanan tidak ditemukan */}
              {hasQuery && !found && (
                <div
                  role="alert"
                  className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
                >
                  <AlertIcon />
                  <span>
                    Nomor pesanan tidak ditemukan. Mohon periksa kembali kode unik yang tertera
                    pada nota belanja Anda.
                  </span>
                </div>
              )}

              <div className="mt-6">
                <TrackSearchForm defaultValue={hasQuery ? order : ''} />
              </div>

              <p className="mt-6 text-center text-xs text-gray-400">
                Nomor pesanan tertera pada email konfirmasi & nota belanja Anda.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// === Sub-komponen presentasional ===

// Pasangan label–nilai pada kartu ringkasan paket
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-gray-500">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-gray-900">{value}</dd>
    </div>
  )
}

// Label ringkas status terbaru untuk badge di kartu ringkasan
function statusLabel(status: string): string {
  switch (status) {
    case 'pending':
      return 'Menunggu Pembayaran'
    case 'processing':
      return 'Diproses'
    case 'in_transit':
      return 'Dalam Pengiriman'
    case 'delivered':
      return 'Selesai'
    default:
      return 'Status'
  }
}

// Ikon panah kembali di sisi kiri header
function BackIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

// Ikon peringatan pada kartu error
function AlertIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}
