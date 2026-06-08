'use client'

// src/components/product/FlyToCart.tsx
// Partikel animasi "terbang ke keranjang". Sebuah bulatan hijau yang melengkung dari titik awal
// (tombol) menuju titik akhir (ikon keranjang). Memakai Web Animations API native — tanpa library.
// Di-render lewat portal ke <body> agar bebas dari clipping/stacking context induk.

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

// Koordinat (viewport) titik awal & akhir lintasan
export type FlyPoint = { x: number; y: number }

// Menjalankan satu animasi terbang melengkung, lalu memanggil onComplete saat tiba.
export default function FlyToCart({
  start,
  end,
  onComplete,
}: {
  start: FlyPoint
  end: FlyPoint
  onComplete: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  // Simpan onComplete di ref agar perubahan identitasnya (parent re-render) tidak
  // membatalkan/mengulang animasi yang sedang berjalan — efek cukup bergantung pada start/end.
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Selisih posisi awal→akhir (lintasan dihitung relatif terhadap titik awal)
    const dx = end.x - start.x
    const dy = end.y - start.y

    // 3 keyframe membentuk busur "tuing": titik tengah diangkat lebih tinggi dari kedua ujung
    // (dy - 80) agar objek melambung ke atas dulu sebelum meluncur ke ikon keranjang.
    const animation = el.animate(
      [
        { transform: 'translate(-50%, -50%) translate(0px, 0px) scale(1)', opacity: 1 },
        {
          transform: `translate(-50%, -50%) translate(${dx * 0.5}px, ${dy - 80}px) scale(1.15)`,
          opacity: 1,
          offset: 0.55,
        },
        {
          transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px) scale(0.2)`,
          opacity: 0.4,
        },
      ],
      {
        duration: 700,
        // Sedikit overshoot di awal + meluncur cepat di akhir ("syuutt")
        easing: 'cubic-bezier(0.45, -0.25, 0.7, 1)',
        fill: 'forwards',
      },
    )

    animation.onfinish = () => onCompleteRef.current()
    return () => animation.cancel()
  }, [start, end])

  return createPortal(
    <div
      ref={ref}
      aria-hidden
      // Posisi awal dipasang via left/top; pergerakan via transform (lebih hemat: tak memicu layout)
      style={{ position: 'fixed', left: start.x, top: start.y, zIndex: 100 }}
      className="pointer-events-none h-5 w-5 rounded-full bg-brand-primary shadow-lg ring-2 ring-white"
    />,
    document.body,
  )
}
