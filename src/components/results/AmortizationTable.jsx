import { useT } from '../../i18n/index.jsx'
import { rupiah } from '../../utils/formatters.js'

// kolom: [{ key, label, uang?: boolean }]
export default function AmortizationTable({ kolom, rows, judul }) {
  const t = useT()
  return (
    <div className="rounded-2xl bg-white ring-1 ring-slate-200">
      {judul && <h2 className="px-4 pt-4 text-sm font-bold text-slate-800">{t(judul)}</h2>}
      <div className="max-h-[420px] overflow-auto p-2">
        <table className="w-full min-w-[480px] text-right text-sm">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-slate-200 text-xs text-slate-500">
              {kolom.map((c, i) => <th key={c.key} scope="col" className={`px-3 py-2 font-semibold ${i === 0 ? 'text-left' : ''}`}>{t(c.label)}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} className="border-b border-slate-50 odd:bg-surface/60">
                {kolom.map((c, i) => (
                  <td key={c.key} className={`px-3 py-1.5 ${i === 0 ? 'text-left font-medium' : ''}`}>{c.uang ? rupiah(r[c.key]) : t(r[c.key])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
