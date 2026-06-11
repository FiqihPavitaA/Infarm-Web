// src/lib/data/dummy-orders.ts
// Dummy data pesanan untuk halaman Lacak Pesanan (/track).
// Tahapan status diselaraskan dengan status logistik Mengantar.
// TODO: ganti dengan query order Supabase + tracking real API Mengantar setelah OMS selesai.

// === Tahapan status (selaras Mengantar) ===
// pending      → Pending / Awaiting Payment
// processing   → Processing / Packed
// in_transit   → Picked Up / In Transit
// delivered    → Delivered
export type OrderStatusKey = 'pending' | 'processing' | 'in_transit' | 'delivered'

// Satu titik linimasa pelacakan. `events` pada order diurutkan TERBARU di indeks 0.
export type TrackingEvent = {
  status: OrderStatusKey
  title: string // judul status, mis. "Paket Telah Diterima (Selesai)"
  description: string // keterangan lokasi/posisi paket
  timestamp: string // jam & tanggal, mis. "14:32 · 10 Jun 2026"
}

export type DummyOrder = {
  orderNumber: string
  courier: string // nama ekspedisi, mis. "SiCepat"
  trackingNumber: string // no. resi, mis. "REG0123456"
  recipientName: string
  estimatedArrival: string // estimasi tiba, mis. "12 Jun 2026"
  events: TrackingEvent[] // riwayat status, terbaru di indeks 0
}

// === Daftar order dummy ===
export const DUMMY_ORDERS: DummyOrder[] = [
  {
    orderNumber: 'ORD-2026-00112',
    courier: 'SiCepat',
    trackingNumber: 'REG0123456',
    recipientName: 'Budi Santoso',
    estimatedArrival: '12 Jun 2026',
    events: [
      {
        status: 'in_transit',
        title: 'Paket Telah Diserahkan ke Kurir & Sedang Menuju Lokasi',
        description: 'Dalam perjalanan dari Hub Cibitung menuju Depok',
        timestamp: '08:15 · 11 Jun 2026',
      },
      {
        status: 'processing',
        title: 'Pesanan Diproses & Dikemas di Gudang Infarm',
        description: 'Paket selesai dikemas, menunggu penjemputan kurir',
        timestamp: '16:40 · 10 Jun 2026',
      },
      {
        status: 'pending',
        title: 'Pesanan Dibuat / Menunggu Pembayaran',
        description: 'Pembayaran terkonfirmasi, pesanan masuk antrean gudang',
        timestamp: '09:02 · 10 Jun 2026',
      },
    ],
  },
  {
    orderNumber: 'ORD-2026-00098',
    courier: 'JNE',
    trackingNumber: 'JNE8890021',
    recipientName: 'Siti Aminah',
    estimatedArrival: '09 Jun 2026',
    events: [
      {
        status: 'delivered',
        title: 'Paket Telah Diterima (Selesai)',
        description: 'Diterima oleh yang bersangkutan di Bandung',
        timestamp: '13:27 · 09 Jun 2026',
      },
      {
        status: 'in_transit',
        title: 'Paket Telah Diserahkan ke Kurir & Sedang Menuju Lokasi',
        description: 'Kurir sedang mengantar ke alamat tujuan',
        timestamp: '07:50 · 09 Jun 2026',
      },
      {
        status: 'processing',
        title: 'Pesanan Diproses & Dikemas di Gudang Infarm',
        description: 'Paket selesai dikemas di Gudang Infarm',
        timestamp: '15:10 · 07 Jun 2026',
      },
      {
        status: 'pending',
        title: 'Pesanan Dibuat / Menunggu Pembayaran',
        description: 'Pesanan dibuat dan pembayaran terkonfirmasi',
        timestamp: '11:33 · 07 Jun 2026',
      },
    ],
  },
]

// Mencari order berdasarkan nomor pesanan (tidak peka huruf besar/kecil & spasi).
// Mengembalikan undefined bila tidak ditemukan.
export function findOrderByNumber(orderNumber: string): DummyOrder | undefined {
  const normalized = orderNumber.trim().toUpperCase()
  return DUMMY_ORDERS.find((o) => o.orderNumber.toUpperCase() === normalized)
}
