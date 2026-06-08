// src/components/product/ProductDescription.tsx
// Seksi deskripsi / spesifikasi produk. Server Component.
// Mempertahankan baris baru dari teks deskripsi (whitespace-pre-line).

// Menampilkan teks deskripsi detail produk dengan format multi-baris.
export default function ProductDescription({ description }: { description: string }) {
  return (
    <section className="bg-white px-4 py-4">
      <h2 className="mb-2 text-sm font-bold text-zinc-800">Deskripsi Produk</h2>
      <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-600">{description}</p>
    </section>
  )
}
