import { useT } from '../../i18n/index.jsx'
export default function SummaryCard({ judul, utama, item }) {
  const t = useT()
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <p className="text-sm font-medium text-slate-500">{t(judul)}</p>
      <p className="mt-1 break-words text-3xl font-extrabold text-brand-dark md:text-4xl">{utama}</p>
      <dl className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3">
        {item.map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs text-slate-500">{t(k)}</dt>
            <dd className="text-sm font-bold text-slate-900">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
