import { useLocation, useNavigate } from 'react-router-dom'
import { LANGS, useLang, useT } from '../../i18n/index.jsx'

export default function LanguageSwitcher() {
  const lang = useLang()
  const t = useT()
  const nav = useNavigate()
  const { pathname, search } = useLocation()
  const change = (e) => {
    const l = e.target.value
    try { localStorage.setItem('lang', l) } catch { /* abaikan */ }
    nav(pathname.replace(/^\/[^/]+/, `/${l}`) + search)
  }
  return (
    <select aria-label={t('Bahasa')} value={lang} onChange={change}
      className="rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm font-medium text-slate-700">
      {Object.entries(LANGS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
    </select>
  )
}
