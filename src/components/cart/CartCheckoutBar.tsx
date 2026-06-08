// src/components/cart/CartCheckoutBar.tsx
// Bilah aksi bawah (sticky): checkbox "Pilih Semua" + jumlah item, total harga dinamis,
// dan tombol "Checkout (X)" yang nonaktif bila tidak ada item tercentang. Presentational.

import { formatRupiah } from '@/lib/format'

// Menampilkan bilah checkout bawah dengan pilih-semua, total, dan tombol checkout.
export default function CartCheckoutBar({
  allSelected,
  selectedCount,
  selectedTotal,
  onToggleSelectAll,
  onCheckout,
}: {
  allSelected: boolean
  selectedCount: number
  selectedTotal: number
  onToggleSelectAll: () => void
  onCheckout: () => void
}) {
  const disabled = selectedCount === 0

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        {/* Kiri: Pilih Semua */}
        <label className="flex shrink-0 items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onToggleSelectAll}
            aria-label="Pilih semua"
            className="h-5 w-5 accent-brand-primary"
          />
          <span>Item ({selectedCount})</span>
        </label>

        {/* Tengah: Total dinamis */}
        <div className="ml-auto text-right">
          <p className="text-xs text-zinc-500">Total</p>
          <p className="text-base font-bold text-zinc-900">{formatRupiah(selectedTotal)}</p>
        </div>

        {/* Kanan: Tombol checkout (mati bila tidak ada item tercentang) */}
        <button
          type="button"
          onClick={onCheckout}
          disabled={disabled}
          className="shrink-0 rounded-xl bg-brand-primary px-6 py-3 text-base font-bold text-white shadow-sm transition hover:brightness-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500"
        >
          Checkout ({selectedCount})
        </button>
      </div>
    </div>
  )
}
