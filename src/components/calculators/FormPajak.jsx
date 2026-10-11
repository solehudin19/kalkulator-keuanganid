import { useT } from '../../i18n/index.jsx'
import { angka } from '../../utils/formatters.js'
import CurrencyInput from '../common/CurrencyInput.jsx'
import Field from '../common/Field.jsx'
import { PTKP } from '../../utils/formulas.js'

export default function FormPajak({ f, set }) {
  const t = useT()
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <h1 className="text-xl font-extrabold text-slate-900">{t('Kalkulator Gaji & PPh 21')}</h1>
      <Field id="gaji" label={t('Gaji kotor per bulan')}><CurrencyInput id="gaji" value={f.gaji} onChange={(v) => set('gaji', v)} /></Field>
      <Field id="status" label={t('Status PTKP')}>
        <select id="status" value={f.status} onChange={(e) => set('status', e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base font-semibold focus:border-brand focus:ring-2 focus:ring-brand/30">
          {Object.entries(PTKP).map(([k, v]) => <option key={k} value={k}>{k} (Rp {angka(v)} / {t('tahun')})</option>)}
        </select>
      </Field>
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-slate-600">{t('Potongan BPJS')}</legend>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.bpjsTK} onChange={(e) => set('bpjsTK', e.target.checked)} className="accent-brand" /> {t('Ketenagakerjaan (JHT 2% + JP 1%)')}</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.bpjsKes} onChange={(e) => set('bpjsKes', e.target.checked)} className="accent-brand" /> {t('Kesehatan (1%)')}</label>
      </fieldset>
    </form>
  )
}
