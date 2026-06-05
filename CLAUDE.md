# Project: Ecommerce & OMS – ikfarv.id

## Overview
Platform ecommerce dan Order Management System (OMS) untuk ikfarv.id.
Dibangun dengan Next.js sebagai fullstack framework, Supabase sebagai database,
Vercel untuk deployment, Xendit (payment) dan Mengantar (logistik) sebagai third-party API.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router) — bukan Pages Router
  > Catatan: project di-scaffold dengan Next.js 16 (latest per Juni 2026). Next 16 punya breaking changes vs versi training model — lihat `AGENTS.md` dan `node_modules/next/dist/docs/` sebelum menulis kode yang menyentuh API Next.
- **Language**: TypeScript (strict mode)
- **Frontend**: React 19, Vite (tooling), Vue.js (jika ada komponen terpisah)
- **Backend**: Next.js API Routes + Server Actions
- **Database & Auth**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Payment Gateway**: Xendit
- **Logistik / Pengiriman**: Mengantar
- **Deployment**: Vercel
- **Version Control**: GitHub
- **Package Manager**: npm (gunakan npm, bukan yarn atau pnpm kecuali diminta)

**Jangan tambahkan library berikut tanpa diminta:**
- Redux atau state library global lain (gunakan Zustand atau React Context)
- styled-components, Emotion (gunakan Tailwind CSS)
- Axios (gunakan native `fetch` dengan wrapper di `lib/fetcher.ts`)
- Material UI, Ant Design, Chakra UI

---

## Bash Commands

```bash
npm run dev          # Jalankan dev server Next.js
npm run build        # Build production
npm run start        # Jalankan production server lokal
npm run typecheck    # TypeScript type check
npm run lint         # ESLint
npm run test         # Run tests
```

---

## Project Structure

```
/
├── app/                    # Next.js App Router
│   ├── (store)/            # Route group: halaman publik ecommerce
│   ├── (admin)/            # Route group: dashboard admin & OMS
│   ├── api/                # API Routes (webhook Xendit, Mengantar, dll)
│   └── layout.tsx
├── components/             # UI components (React)
├── lib/
│   ├── supabase/           # Supabase client (server & browser)
│   ├── xendit/             # Xendit SDK wrapper
│   ├── mengantar/          # Mengantar API wrapper
│   └── fetcher.ts          # Native fetch wrapper (gunakan ini, bukan Axios)
├── types/                  # TypeScript type definitions & generated Supabase types
├── supabase/
│   ├── migrations/         # SQL migrations
│   └── functions/          # Edge Functions
├── docs/                   # Dokumentasi arsitektur & rencana fitur
└── CLAUDE.md
```

---

## Code Style

- Gunakan **ES modules** (`import/export`), bukan CommonJS (`require`)
- Destructure imports: `import { createClient } from '@supabase/supabase-js'`
- **TypeScript strict mode** — hindari `any`, gunakan type eksplisit
- Nama file: `kebab-case.ts`, komponen: `PascalCase.tsx`
- Fungsi & variabel: `camelCase`; konstanta global: `UPPER_SNAKE_CASE`
- Indentasi: 2 spasi
- Gunakan **Server Components** by default; tambahkan `'use client'` hanya jika benar-benar perlu

---

## Komentar Kode

Tulis komentar untuk memudahkan maintenance. Ikuti aturan berikut:

- **Setiap file** — tambahkan komentar singkat di baris pertama yang menjelaskan tujuan file tersebut
  ```ts
  // lib/xendit/create-invoice.ts
  // Membuat invoice pembayaran baru via Xendit API
  ```

- **Setiap fungsi/komponen yang di-export** — jelaskan apa yang dilakukan, bukan bagaimana caranya
  ```ts
  // Menghitung total harga order termasuk diskon dan ongkir
  export function calculateOrderTotal(items: OrderItem[], shipping: number): number {}
  ```

- **Logic yang tidak langsung jelas** — beri komentar kenapa, bukan apa
  ```ts
  // Xendit memerlukan amount dalam satuan rupiah (integer), bukan desimal
  const amount = Math.round(price * 100)
  ```

- **Setiap section dalam file panjang** — gunakan komentar sebagai pemisah
  ```ts
  // === Validasi Input ===
  // === Kalkulasi Harga ===
  // === Integrasi Xendit ===
  ```

- **Jangan** tulis komentar yang redundan atau hanya mengulang nama fungsinya
  ```ts
  // JANGAN: Mengambil user (sudah jelas dari nama fungsi getUser())
  // BOLEH: Mengambil user beserta role-nya untuk keperluan middleware auth
  ```

---

## Supabase Conventions

- Supabase **server client** untuk Server Components & API Routes: `lib/supabase/server.ts`
- Supabase **browser client** untuk Client Components: `lib/supabase/browser.ts`
- Row Level Security (RLS) **wajib aktif** di semua tabel
- Semua perubahan skema via **migration file** di `supabase/migrations/`
- Jangan edit schema langsung via dashboard tanpa membuat migration
- Regenerate types setelah migrasi: `supabase gen types typescript --local > types/supabase.ts`

---

## Third-Party API

### Xendit (Payment Gateway)
- Semua logika pembayaran di `lib/xendit/`
- Webhook diterima di `app/api/webhooks/xendit/route.ts`
- Verifikasi webhook signature sebelum memproses event apapun
- **Jangan expose** Xendit secret key di frontend

### Mengantar (Logistik)
- Semua logika pengiriman di `lib/mengantar/`
- Kalkulasi ongkos kirim dan tracking order via API Mengantar

---

## Domain: Ecommerce & OMS

Modul utama:
- [ ] Katalog produk (CRUD, kategori, varian, stok)
- [ ] Keranjang & checkout
- [ ] Integrasi Xendit (pembayaran)
- [ ] Integrasi Mengantar (pengiriman & tracking)
- [ ] Manajemen order / OMS (status, fulfillment, retur)
- [ ] Autentikasi pelanggan & admin (Supabase Auth)
- [ ] Dashboard admin
- [ ] Manajemen inventori

Referensi arsitektur lengkap: @docs/architecture.md

---

## Git & GitHub Workflow

- Branch naming: `feat/nama-fitur`, `fix/nama-bug`, `chore/nama-task`
- Commit format (Conventional Commits):
  - `feat: tambah integrasi Xendit checkout`
  - `fix: perbaiki kalkulasi ongkir Mengantar`
- Jangan push langsung ke `main` — gunakan PR, squash merge

---

## Deployment (Vercel)

- Preview deploy otomatis dari setiap PR; production dari branch `main`
- Environment variables di Vercel dashboard (jangan di-commit)

Env variables yang dibutuhkan:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY      # server-only
XENDIT_SECRET_KEY              # server-only
XENDIT_WEBHOOK_TOKEN           # server-only
MENGANTAR_API_KEY              # server-only
```

---

## Security Rules

- **Jangan expose** `SUPABASE_SERVICE_ROLE_KEY`, `XENDIT_SECRET_KEY`, atau `MENGANTAR_API_KEY` di frontend
- Semua logic sensitif (pricing, stock update, payment) harus di Server Components, API Routes, atau Edge Functions
- Validasi input di sisi server, bukan hanya frontend
- Verifikasi webhook signature Xendit sebelum memproses event apapun