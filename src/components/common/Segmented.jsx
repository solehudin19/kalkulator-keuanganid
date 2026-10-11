import { useT } from '../../i18n/index.jsx'
export default function Segmented({ value, onChange, options, label }) {
  const t = useT()
  return (
    <div role="group" aria-label={t(label)} className="inline-flex rounded-lg bg-slate-100 p-1">
      {options.map(([v, text]) => (
        <button key={v} type="button" onClick={() => onChange(v)} aria-pressed={value === v}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${value === v ? 'bg-white text-brand-dark shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
          {t(text)}
        </button>
      ))}
    </div>
  )
}
