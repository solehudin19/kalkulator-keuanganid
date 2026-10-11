import { NumericFormat } from 'react-number-format'
import { useLang } from '../../i18n/index.jsx'

const cls = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base font-semibold text-slate-900 focus:border-brand focus:ring-2 focus:ring-brand/30'

export default function CurrencyInput({ id, value, onChange, prefix = 'Rp ', suffix, decimals = false }) {
  const en = useLang() === 'en'
  return (
    <NumericFormat
      id={id} className={cls} inputMode="decimal" value={value} prefix={prefix} suffix={suffix}
      thousandSeparator={en ? ',' : '.'} decimalSeparator={en ? '.' : ','} decimalScale={decimals ? 2 : 0} allowNegative={false}
      onValueChange={(v) => onChange(v.floatValue ?? 0)}
    />
  )
}
