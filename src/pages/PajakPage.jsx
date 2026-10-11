import { useT } from '../i18n/index.jsx'
import SplitScreen from '../components/layout/SplitScreen.jsx'
import FormPajak from '../components/calculators/FormPajak.jsx'
import SummaryCard from '../components/results/SummaryCard.jsx'
import AmortizationTable from '../components/results/AmortizationTable.jsx'
import AdRectangle from '../components/monetization/AdRectangle.jsx'
import Button from '../components/common/Button.jsx'
import usePajak from '../hooks/usePajak.js'
import { rupiah } from '../utils/formatters.js'
import { exportPDF } from '../utils/pdfExport.js'

const KOLOM = [
  { key: 'komponen', label: 'Komponen' },
  { key: 'bulan', label: 'Per bulan', uang: true },
  { key: 'tahun', label: 'Per tahun', uang: true },
]

export default function PajakPage() {
  const t = useT()
  const { f, set, hasil } = usePajak()
  const unduh = () => exportPDF({ t,
    judul: 'Simulasi Gaji Bersih & PPh 21',
    namaFile: 'simulasi-gaji-pph21',
    params: [['Gaji kotor per bulan', rupiah(f.gaji)], ['Status PTKP', f.status], ['BPJS Ketenagakerjaan', f.bpjsTK ? 'Ya' : 'Tidak'], ['BPJS Kesehatan', f.bpjsKes ? 'Ya' : 'Tidak']],
    ringkasan: [['Gaji bersih per bulan', rupiah(hasil.thp)], ['PPh 21 per bulan', rupiah(hasil.pph)], ['Total potongan per bulan', rupiah(hasil.potongan)]],
    kolom: ['Komponen', 'Per bulan', 'Per tahun'],
    baris: hasil.rincian.map((r) => [r.komponen, rupiah(r.bulan), rupiah(r.tahun)]),
  })
  return (
    <SplitScreen
      form={<FormPajak f={f} set={set} />}
      hasil={
        <>
          <SummaryCard judul={t('Gaji bersih per bulan (take home pay)')} utama={rupiah(hasil.thp)}
            item={[['PPh 21 per bulan', rupiah(hasil.pph)], ['Total potongan', rupiah(hasil.potongan)], ['PKP setahun', rupiah(hasil.pkp)]]} />
          <AdRectangle />
          <div className="mb-3 flex justify-end"><Button onClick={unduh}>{t('Unduh rincian (PDF)')}</Button></div>
          <AmortizationTable judul={t('Rincian gaji')} kolom={KOLOM} rows={hasil.rincian} />
          <p className="mt-3 text-xs text-slate-500">{t('Estimasi dengan metode tahunan progresif. Perhitungan resmi (tarif efektif bulanan) dapat sedikit berbeda.')}</p>
        </>
      }
    />
  )
}
