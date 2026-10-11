import { useT } from '../../i18n/index.jsx'
import CurrencyInput from '../common/CurrencyInput.jsx'
import Field from '../common/Field.jsx'

export default function FormInvestasi({ f, set }) {
  const t = useT()
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <h1 className="text-xl font-extrabold text-slate-900">{t('Kalkulator Investasi')}</h1>
      <Field id="modal" label={t('Modal awal')}><CurrencyInput id="modal" value={f.modal} onChange={(v) => set('modal', v)} /></Field>
      <Field id="setoran" label={t('Setoran rutin per bulan')}><CurrencyInput id="setoran" value={f.setoran} onChange={(v) => set('setoran', v)} /></Field>
      <Field id="ret" label={t('Estimasi return: {v}% per tahun', { v: f.returnTahunan })}>
        <input id="ret" type="range" min="0" max="30" step="0.5" value={f.returnTahunan} onChange={(e) => set('returnTahunan', +e.target.value)} className="w-full" />
      </Field>
      <Field id="tahun" label={t('Lama investasi: {n} tahun', { n: f.tahun })}>
        <input id="tahun" type="range" min="1" max="40" step="1" value={f.tahun} onChange={(e) => set('tahun', +e.target.value)} className="w-full" />
      </Field>
    </form>
  )
}
