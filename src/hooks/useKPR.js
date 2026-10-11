import { useMemo, useState } from 'react'
import { hitungKPR } from '../utils/formulas.js'

export default function useKPR() {
  const [f, setF] = useState({ harga: 500000000, dpMode: 'persen', dp: 20, bunga: 7.5, tenor: 15, tenorUnit: 'tahun', jenis: 'anuitas' })
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }))
  const dpRp = f.dpMode === 'persen' ? (f.harga * f.dp) / 100 : f.dp
  const bulan = f.tenorUnit === 'tahun' ? f.tenor * 12 : f.tenor
  const hasil = useMemo(
    () => hitungKPR({ harga: f.harga || 0, dp: dpRp || 0, bunga: f.bunga || 0, bulan: bulan || 1, jenis: f.jenis }),
    [f.harga, dpRp, f.bunga, bulan, f.jenis]
  )
  return { f, set, dpRp, bulan, hasil }
}
