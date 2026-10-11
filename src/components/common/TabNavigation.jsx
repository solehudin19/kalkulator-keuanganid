import { NavLink } from 'react-router-dom'
import { useLang, useT } from '../../i18n/index.jsx'

const tabs = [['', 'KPR & Pinjaman'], ['/investasi', 'Investasi'], ['/pajak', 'Gaji & PPh 21']]

export default function TabNavigation({ className = '' }) {
  const lang = useLang()
  const t = useT()
  return (
    <nav aria-label={t('Jenis kalkulator')} className={`flex gap-1 overflow-x-auto ${className}`}>
      {tabs.map(([slug, label]) => (
        <NavLink key={slug} to={`/${lang}${slug}`} end={slug === ''}
          className={({ isActive }) => `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-brand-soft text-brand-dark' : 'text-slate-600 hover:bg-slate-100'}`}>
          {t(label)}
        </NavLink>
      ))}
    </nav>
  )
}
