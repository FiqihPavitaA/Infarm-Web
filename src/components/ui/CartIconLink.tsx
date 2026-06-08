'use client'

// src/components/ui/CartIconLink.tsx
// Ikon keranjang di header dengan badge jumlah item yang REAKTIF terhadap cookie keranjang.
// Badge dibaca via useSyncExternalStore (sumber: cookie) dan ikon "pop" saat menerima CART_BUMP_EVENT.
// id="cart-anchor" dipakai animasi fly-to-cart (StickyBuyBar) untuk menghitung titik akhir.

import Link from 'next/link'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { subscribeCart, getCartCount, CART_BUMP_EVENT } from '@/lib/cart-client'

// Menampilkan ikon keranjang + badge merah (jumlah total item di cookie). Badge tersembunyi bila 0.
export default function CartIconLink() {
  // Jumlah total item di keranjang (primitif number → aman jadi snapshot tanpa cache khusus).
  // Snapshot server selalu 0 agar tidak mismatch saat hidrasi.
  const count = useSyncExternalStore(subscribeCart, getCartCount, () => 0)

  // Status animasi "pop" sesaat saat barang baru masuk
  const [bump, setBump] = useState(false)

  // Dengarkan event bump (dikirim saat animasi terbang menyentuh ikon)
  useEffect(() => {
    function handleBump() {
      setBump(true)
      window.setTimeout(() => setBump(false), 450) // selaras durasi keyframe cart-bump
    }
    window.addEventListener(CART_BUMP_EVENT, handleBump)
    return () => window.removeEventListener(CART_BUMP_EVENT, handleBump)
  }, [])

  return (
    <Link id="cart-anchor" href="/keranjang" aria-label="Keranjang" className="relative p-1">
      <span className={`inline-block ${bump ? 'animate-cart-bump' : ''}`}>
        <CartIcon />
      </span>

      {/* Badge jumlah — hanya tampil bila ada item */}
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  )
}

function CartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="21" r="1.5" />
      <circle cx="19" cy="21" r="1.5" />
      <path d="M2.5 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L23 7H6" />
    </svg>
  )
}
