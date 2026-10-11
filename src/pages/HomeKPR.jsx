import { useT } from '../i18n/index.jsx'
import { useState } from 'react'
import SplitScreen from '../components/layout/SplitScreen.jsx'
import FormKPR from '../components/calculators/FormKPR.jsx'
import SummaryCard from '../components/results/SummaryCard.jsx'
import AmortizationTable from '../components/results/AmortizationTable.jsx'
import AdRectangle from '../components/monetization/AdRectangle.jsx'
import Segmented from '../components/common/Segmented.jsx'
import Button from '../components/common/Button.jsx'
import useKPR from '../hooks/useKPR.js'
import { ringkasTahunan } from '../utils/formulas.js'
import { rupiah } from '../utils/formatters.js'
import { exportPDF } from '../utils/pdfExport.js'

const JENIS = { anuitas: 'Anuitas', efektif: 'Efektif', flat: 'Flat' }
const KOLOM = [
  { key: 'periode', label: 'Periode' },
  { key: 'cicilan', label: 'Cicilan', uang: true },
  { key: 'pokok', label: 'Pokok', uang: true },
  { key: 'bunga', label: 'Bunga', uang: true },
  { key: 'sisa', label: 'Sisa saldo', uang: true },
]

export default function HomeKPR() {
  const t = useT()
  const { f, set, dpRp, bulan, hasil } = useKPR()
  const [mode, setMode] = useState('tahunan')
  const rows = mode === 'tahunan' ? ringkasTahunan(hasil.rows) : hasil.rows
  const label = mode === 'tahunan' ? 'Tahun' : 'Bulan'
  const kolom = KOLOM.map((c) => (c.key === 'periode' ? { ...c, label } : c))
  const sama = hasil.cicilanAwal === hasil.cicilanAkhir

  const unduh = () => exportPDF({ t,
    judul: 'Simulasi KPR & Pinjaman',
    namaFile: 'simulasi-kpr',
    params: [
      ['Harga properti', rupiah(f.harga)], ['Uang muka', rupiah(dpRp)], ['Pokok pinjaman', rupiah(hasil.pokok)],
      ['Suku bunga', `${f.bunga}% ${t('per tahun')}`], ['Tenor', `${bulan} ${t('bulan')}`], ['Jenis bunga', JENIS[f.jenis]],
    ],
    ringkasan: [
      [sama ? 'Cicilan per bulan' : 'Cicilan bulan pertama', rupiah(hasil.cicilanAwal)],
      ['Total bunga', rupiah(hasil.totalBunga)], ['Total pembayaran', rupiah(hasil.totalBayar)],
    ],
    kolom: [label, 'Cicilan', 'Pokok', 'Bunga', 'Sisa saldo'],
    baris: rows.map((r) => [r.periode, rupiah(r.cicilan), rupiah(r.pokok), rupiah(r.bunga), rupiah(r.sisa)]),
  })

  return (
    <SplitScreen
      form={<FormKPR f={f} set={set} dpRp={dpRp} />}
      hasil={
        <>
          <SummaryCard
            judul={sama ? 'Cicilan per bulan' : 'Cicilan bulan pertama'}
            utama={rupiah(hasil.cicilanAwal)}
            item={[['Pokok pinjaman', rupiah(hasil.pokok)], ['Total bunga', rupiah(hasil.totalBunga)], ['Total pembayaran', rupiah(hasil.totalBayar)]]}
          />
          <AdRectangle />
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <Segmented label={t('Tampilan tabel')} value={mode} onChange={setMode} options={[['tahunan', 'Tahunan'], ['bulanan', 'Bulanan']]} />
            <Button onClick={unduh}>{t('Unduh rincian (PDF)')}</Button>
          </div>
          <AmortizationTable judul={t('Tabel amortisasi')} kolom={kolom} rows={rows} />
        </>
      }
    />
  )
}
