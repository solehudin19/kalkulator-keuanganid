import { useMemo, useState } from 'react'
import { hitungPPh21 } from '../utils/formulas.js'

export default function usePajak() {
  const [f, setF] = useState({ gaji: 10000000, status: 'TK/0', bpjsTK: true, bpjsKes: true })
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }))
  const hasil = useMemo(() => hitungPPh21({ ...f, gaji: f.gaji || 0 }), [f])
  return { f, set, hasil }
}
