// src/components/product/StarRating.tsx
// Komponen bintang rating reusable (mendukung setengah bintang). Server Component, tanpa state.

// Menampilkan deretan bintang berdasarkan nilai rating (0–5), dengan ukuran yang bisa diatur.
export default function StarRating({
  rating,
  size = 16,
}: {
  rating: number
  size?: number
}) {
  return (
    <div className="flex items-center" aria-label={`Rating ${rating} dari 5`}>
      {Array.from({ length: 5 }, (_, i) => {
        // Hitung seberapa "penuh" bintang ke-i: 1 = penuh, 0.5 = setengah, 0 = kosong
        const fill = Math.max(0, Math.min(1, rating - i))
        return <Star key={i} fill={fill} size={size} />
      })}
    </div>
  )
}

// Satu bintang dengan tingkat isian (0–1) via overlay clip-path agar setengah bintang akurat
function Star({ fill, size }: { fill: number; size: number }) {
  return (
    <span className="relative inline-block" style={{ width: size, height: size }}>
      <StarSvg className="absolute inset-0 text-zinc-300" size={size} />
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${fill * 100}%` }}
      >
        <StarSvg className="text-amber-400" size={size} />
      </span>
    </span>
  )
}

function StarSvg({ className = '', size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  )
}
