import { useMemo, useState } from 'react'
import { hitungInvestasi } from '../utils/formulas.js'

export default function useInvestasi() {
  const [f, setF] = useState({ modal: 10000000, setoran: 1000000, returnTahunan: 10, tahun: 10 })
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }))
  const hasil = useMemo(
    () => hitungInvestasi({ modal: f.modal || 0, setoran: f.setoran || 0, returnTahunan: f.returnTahunan || 0, tahun: f.tahun || 1 }),
    [f]
  )
  return { f, set, hasil }
}
