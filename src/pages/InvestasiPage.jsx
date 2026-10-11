import { useT } from '../i18n/index.jsx'
import SplitScreen from '../components/layout/SplitScreen.jsx'
import FormInvestasi from '../components/calculators/FormInvestasi.jsx'
import SummaryCard from '../components/results/SummaryCard.jsx'
import AmortizationTable from '../components/results/AmortizationTable.jsx'
import AdRectangle from '../components/monetization/AdRectangle.jsx'
import Button from '../components/common/Button.jsx'
import useInvestasi from '../hooks/useInvestasi.js'
import { rupiah } from '../utils/formatters.js'
import { exportPDF } from '../utils/pdfExport.js'

const KOLOM = [
  { key: 'periode', label: 'Tahun' },
  { key: 'totalModal', label: 'Total modal', uang: true },
  { key: 'bunga', label: 'Hasil bunga', uang: true },
  { key: 'saldo', label: 'Saldo', uang: true },
]

export default function InvestasiPage() {
  const t = useT()
  const { f, set, hasil } = useInvestasi()
  const unduh = () => exportPDF({ t,
    judul: 'Simulasi Investasi (Bunga Majemuk)',
    namaFile: 'simulasi-investasi',
    params: [['Modal awal', rupiah(f.modal)], ['Setoran bulanan', rupiah(f.setoran)], ['Return per tahun', `${f.returnTahunan}%`], ['Lama investasi', `${f.tahun} ${t('tahun')}`]],
    ringkasan: [['Nilai akhir', rupiah(hasil.akhir)], ['Total modal', rupiah(hasil.totalModal)], ['Total hasil bunga', rupiah(hasil.totalBunga)]],
    kolom: ['Tahun', 'Total modal', 'Hasil bunga', 'Saldo'],
    baris: hasil.rows.map((r) => [r.periode, rupiah(r.totalModal), rupiah(r.bunga), rupiah(r.saldo)]),
  })
  return (
    <SplitScreen
      form={<FormInvestasi f={f} set={set} />}
      hasil={
        <>
          <SummaryCard judul={t('Nilai investasi setelah {n} tahun', { n: f.tahun })} utama={rupiah(hasil.akhir)}
            item={[['Total modal', rupiah(hasil.totalModal)], ['Hasil bunga', rupiah(hasil.totalBunga)], ['Return per tahun', `${f.returnTahunan}%`]]} />
          <AdRectangle />
          <div className="mb-3 flex justify-end"><Button onClick={unduh}>{t('Unduh rincian (PDF)')}</Button></div>
          <AmortizationTable judul={t('Pertumbuhan per tahun')} kolom={KOLOM} rows={hasil.rows} />
        </>
      }
    />
  )
}
