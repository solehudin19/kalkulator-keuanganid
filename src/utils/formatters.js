let nf = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 })
let loc = 'id-ID'
export function setLocale(lang) {
  loc = lang === 'en' ? 'en-US' : 'id-ID'
  nf = new Intl.NumberFormat(loc, { maximumFractionDigits: 0 })
}
export const angka = (n) => nf.format(Math.round(Number.isFinite(n) ? n : 0))
export const rupiah = (n) => `${n < 0 ? '-' : ''}Rp ${angka(Math.abs(n))}`
export const tanggalPanjang = (d = new Date()) => d.toLocaleDateString(loc, { day: 'numeric', month: 'long', year: 'numeric' })
