import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import TabNavigation from '../common/TabNavigation.jsx'
import LanguageSwitcher from '../common/LanguageSwitcher.jsx'
import ThemeToggle from '../common/ThemeToggle.jsx'
import { useLang } from '../../i18n/index.jsx'

export default function Header() {
  const lang = useLang()
  return (
    <header className="flex shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-slate-200 bg-white px-4 py-2">
      <Link to={`/${lang}`} className="flex items-center gap-2">
        <img src={logo} alt="" width="32" height="32" />
        <span className="text-lg font-extrabold tracking-tight text-slate-900">Kalkulator<span className="text-brand">Keuangan</span>.id</span>
      </Link>
      <TabNavigation className="order-last w-full md:order-none md:w-auto" />
      <div className="flex items-center gap-2"><LanguageSwitcher /><ThemeToggle /></div>
    </header>
  )
}
