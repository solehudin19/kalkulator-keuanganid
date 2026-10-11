// ===== KPR / Pinjaman =====
// jenis: 'flat' | 'efektif' (pokok tetap, bunga menurun) | 'anuitas' (cicilan tetap)
export function hitungKPR({ harga, dp, bunga, bulan, jenis }) {
  const pokok = Math.max(harga - dp, 0)
  const n = Math.max(Math.round(bulan), 1)
  const r = bunga / 100 / 12
  const pmt = r === 0 ? pokok / n : (pokok * r) / (1 - Math.pow(1 + r, -n))
  let saldo = pokok
  const rows = []
  for (let i = 1; i <= n; i++) {
    let p, b
    if (jenis === 'flat') { p = pokok / n; b = r * pokok }
    else if (jenis === 'efektif') { p = pokok / n; b = saldo * r }
    else { b = saldo * r; p = pmt - b }
    saldo = i === n ? 0 : Math.max(saldo - p, 0)
    rows.push({ periode: i, cicilan: p + b, pokok: p, bunga: b, sisa: saldo })
  }
  const totalBunga = rows.reduce((s, x) => s + x.bunga, 0)
  return { pokok, rows, cicilanAwal: rows[0].cicilan, cicilanAkhir: rows[n - 1].cicilan, totalBunga, totalBayar: pokok + totalBunga }
}

export function ringkasTahunan(rows) {
  const out = []
  rows.forEach((x) => {
    const t = Math.ceil(x.periode / 12)
    const cur = out[t - 1] ?? (out[t - 1] = { periode: t, cicilan: 0, pokok: 0, bunga: 0, sisa: 0 })
    cur.cicilan += x.cicilan; cur.pokok += x.pokok; cur.bunga += x.bunga; cur.sisa = x.sisa
  })
  return out
}

// ===== Investasi (bunga majemuk bulanan, setoran akhir bulan) =====
export function hitungInvestasi({ modal, setoran, returnTahunan, tahun }) {
  const rm = Math.pow(1 + returnTahunan / 100, 1 / 12) - 1
  let saldo = modal
  const rows = []
  for (let m = 1; m <= Math.round(tahun * 12); m++) {
    saldo = saldo * (1 + rm) + setoran
    if (m % 12 === 0) {
      const totalModal = modal + setoran * m
      rows.push({ periode: m / 12, totalModal, bunga: saldo - totalModal, saldo })
    }
  }
  const last = rows[rows.length - 1] ?? { totalModal: modal, bunga: 0, saldo: modal }
  return { rows, akhir: last.saldo, totalModal: last.totalModal, totalBunga: last.bunga }
}

// ===== Gaji & PPh 21 (estimasi, metode tahunan progresif) =====
export const PTKP = {
  'TK/0': 54e6, 'TK/1': 58.5e6, 'TK/2': 63e6, 'TK/3': 67.5e6,
  'K/0': 58.5e6, 'K/1': 63e6, 'K/2': 67.5e6, 'K/3': 72e6,
}
const BATAS_JP = 10547400 // batas upah JP, periksa pembaruan BPJS tiap tahun
const BATAS_KES = 12e6
const LAPISAN = [[60e6, 0.05], [250e6, 0.15], [500e6, 0.25], [5e9, 0.3], [Infinity, 0.35]]

function pajakProgresif(pkp) {
  let sisa = pkp, prev = 0, pajak = 0
  for (const [batas, tarif] of LAPISAN) {
    const bagian = Math.min(sisa, batas - prev)
    if (bagian <= 0) break
    pajak += bagian * tarif; sisa -= bagian; prev = batas
  }
  return pajak
}

export function hitungPPh21({ gaji, status, bpjsTK, bpjsKes }) {
  const jht = bpjsTK ? gaji * 0.02 : 0
  const jp = bpjsTK ? Math.min(gaji, BATAS_JP) * 0.01 : 0
  const kes = bpjsKes ? Math.min(gaji, BATAS_KES) * 0.01 : 0
  const biayaJabatan = Math.min(gaji * 0.05, 500000)
  const netoTahun = (gaji - biayaJabatan - jht - jp) * 12
  const pkp = Math.max(Math.floor((netoTahun - PTKP[status]) / 1000) * 1000, 0)
  const pphTahun = pajakProgresif(pkp)
  const pph = pphTahun / 12
  const thp = gaji - jht - jp - kes - pph
  const rincian = [
    { komponen: 'Gaji kotor', bulan: gaji, tahun: gaji * 12 },
    { komponen: 'BPJS JHT (2%)', bulan: -jht, tahun: -jht * 12 },
    { komponen: 'BPJS JP (1%)', bulan: -jp, tahun: -jp * 12 },
    { komponen: 'BPJS Kesehatan (1%)', bulan: -kes, tahun: -kes * 12 },
    { komponen: 'PPh 21', bulan: -pph, tahun: -pphTahun },
    { komponen: 'Gaji bersih (take home pay)', bulan: thp, tahun: thp * 12 },
  ]
  return { rincian, pkp, pph, pphTahun, thp, potongan: gaji - thp }
}
