// src/lib/format.ts
// Helper format angka/teks yang dipakai di seluruh project.

// Memformat angka menjadi string Rupiah, mis. 100000 -> "Rp100.000"
export function formatRupiah(value: number): string {
  return `Rp${value.toLocaleString('id-ID')}`
}
