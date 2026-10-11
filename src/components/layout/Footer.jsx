import { useT } from '../../i18n/index.jsx'

export default function Footer() {
  const t = useT()
  return (
    <footer className="mt-8 border-t border-slate-200 px-1 pt-4 text-xs leading-relaxed text-slate-500">
      <p>{t('Hasil simulasi bersifat estimasi dan bukan nasihat keuangan. Ketentuan bank dan pajak dapat berbeda dari perhitungan di sini.')}</p>
      <p className="mt-1">© {new Date().getFullYear()} KalkulatorKeuangan.id. {t('Semua perhitungan berjalan di perangkat Anda, tanpa data dikirim ke server.')}</p>
    </footer>
  )
}
