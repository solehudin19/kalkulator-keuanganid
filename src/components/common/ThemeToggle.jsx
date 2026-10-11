import { useState } from 'react'
import { useT } from '../../i18n/index.jsx'

export default function ThemeToggle() {
  const t = useT()
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const toggle = () => {
    const n = !dark
    setDark(n)
    document.documentElement.classList.toggle('dark', n)
    try { localStorage.setItem('theme', n ? 'dark' : 'light') } catch { /* abaikan */ }
  }
  return (
    <button type="button" onClick={toggle} aria-label={t(dark ? 'Mode terang' : 'Mode gelap')}
      className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-base text-slate-600 hover:bg-slate-100">
      {dark ? '☀️' : '🌙'}
    </button>
  )
}
