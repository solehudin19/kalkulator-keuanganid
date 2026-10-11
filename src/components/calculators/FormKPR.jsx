import { useT } from '../../i18n/index.jsx'
import { angka } from '../../utils/formatters.js'
import CurrencyInput from '../common/CurrencyInput.jsx'
import Field from '../common/Field.jsx'
import Segmented from '../common/Segmented.jsx'

export default function FormKPR({ f, set, dpRp }) {
  const t = useT()
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <h1 className="text-xl font-extrabold text-slate-900">{t('Kalkulator KPR & Pinjaman')}</h1>
      <Field id="harga" label={t('Harga properti / plafon')}>
        <CurrencyInput id="harga" value={f.harga} onChange={(v) => set('harga', v)} />
      </Field>
      <Field id="dp" label={t('Uang muka')} hint={f.dpMode === 'persen' ? t('Setara Rp {v}', { v: angka(dpRp) }) : undefined}>
        <div className="flex gap-2">
          <div className="flex-1">
            {f.dpMode === 'persen'
              ? <CurrencyInput id="dp" value={f.dp} prefix="" suffix="%" decimals onChange={(v) => set('dp', Math.min(v, 100))} />
              : <CurrencyInput id="dp" value={f.dp} onChange={(v) => set('dp', v)} />}
          </div>
          <Segmented label={t('Satuan uang muka')} value={f.dpMode} onChange={(m) => { set('dpMode', m); set('dp', m === 'persen' ? 20 : dpRp) }} options={[['persen', '%'], ['rp', 'Rp']]} />
        </div>
      </Field>
      <Field id="bunga" label={t('Suku bunga: {v}% per tahun', { v: f.bunga })}>
        <input id="bunga" type="range" min="0" max="25" step="0.1" value={f.bunga} onChange={(e) => set('bunga', +e.target.value)} className="w-full" />
      </Field>
      <Field id="tenor" label={t('Tenor')}>
        <div className="flex gap-2">
          <input id="tenor" type="number" min="1" max={f.tenorUnit === 'tahun' ? 40 : 480} value={f.tenor}
            onChange={(e) => set('tenor', Math.max(+e.target.value, 1))}
            className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 px-3 py-2.5 text-base font-semibold focus:border-brand focus:ring-2 focus:ring-brand/30" />
          <Segmented label={t('Satuan tenor')} value={f.tenorUnit} onChange={(u) => { set('tenorUnit', u); set('tenor', u === 'tahun' ? Math.max(Math.round(f.tenor / 12), 1) : f.tenor * 12) }} options={[['tahun', 'Tahun'], ['bulan', 'Bulan']]} />
        </div>
      </Field>
      <Field id="jenis" label={t('Jenis bunga')}>
        <select id="jenis" value={f.jenis} onChange={(e) => set('jenis', e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base font-semibold focus:border-brand focus:ring-2 focus:ring-brand/30">
          <option value="anuitas">{t('Anuitas (cicilan tetap)')}</option>
          <option value="efektif">{t('Efektif (bunga menurun)')}</option>
          <option value="flat">{t('Flat')}</option>
        </select>
      </Field>
    </form>
  )
}
