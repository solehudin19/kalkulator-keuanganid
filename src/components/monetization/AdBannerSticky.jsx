import { useT } from '../../i18n/index.jsx'
// Hanya tampil di mobile, menempel di bawah layar dengan tinggi tetap.
export default function AdBannerSticky() {
  const t = useT()
  return (
    <div aria-label={t('Iklan')} className="fixed inset-x-0 bottom-0 z-20 flex h-[56px] min-h-[56px] items-center justify-center border-t border-slate-200 bg-white text-xs text-slate-400 md:hidden">
      {t('Iklan')}
    </div>
  )
}
