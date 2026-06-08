'use client'

// src/components/product/ProductImageSlider.tsx
// Slider foto produk (maks 9) dengan geser horizontal (scroll-snap) + indikator bulat (dots).
// Client Component karena memantau posisi scroll untuk menandai foto yang sedang aktif.

import Image from 'next/image'
import { useRef, useState } from 'react'

// Menampilkan galeri foto yang bisa digeser; dot bawah menandai & memilih foto aktif.
export default function ProductImageSlider({
  images,
  alt,
}: {
  images: string[]
  alt: string
}) {
  // Batasi maksimal 9 foto sesuai kebutuhan
  const photos = images.slice(0, 9)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Hitung foto aktif dari posisi scroll (lebar 1 slide = lebar kontainer)
  function handleScroll() {
    const track = trackRef.current
    if (!track) return
    const index = Math.round(track.scrollLeft / track.clientWidth)
    if (index !== activeIndex) setActiveIndex(index)
  }

  // Geser track ke foto tertentu saat dot diklik
  function goTo(index: number) {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="relative w-full bg-white">
      {/* === Track foto (scroll-snap horizontal) === */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex aspect-square w-full snap-x snap-mandatory overflow-x-auto scrollbar-hide"
      >
        {photos.map((src, i) => (
          <div key={i} className="relative aspect-square w-full shrink-0 snap-center bg-zinc-50">
            {/* unoptimized: imageUrl masih SVG placeholder; hapus saat memakai foto raster asli */}
            <Image
              src={src}
              alt={`${alt} — foto ${i + 1}`}
              fill
              unoptimized
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* === Penanda nomor foto (mis. 1/5) === */}
      <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white">
        {activeIndex + 1}/{photos.length}
      </span>

      {/* === Indikator dots === */}
      {photos.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ke foto ${i + 1}`}
              aria-current={i === activeIndex}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex ? 'w-5 bg-brand-primary' : 'w-2 bg-white/80 shadow'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
