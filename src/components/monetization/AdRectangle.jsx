import { useT } from '../../i18n/index.jsx'
// Ruang iklan dipesan lewat min-height/min-width agar tidak ada layout shift (CLS).
// Ganti placeholder dengan <ins class="adsbygoogle" ...> setelah AdSense disetujui.
export default function AdRectangle() {
  const t = useT()
  return (
    <div className="my-4 flex justify-center">
      <div aria-label={t('Iklan')} className="flex min-h-[250px] w-full min-w-[300px] max-w-[336px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white text-xs text-slate-400">
        {t('Iklan')}
      </div>
    </div>
  )
}
