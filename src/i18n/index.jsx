import { createContext, useCallback, useContext } from 'react'
import en from './en.js'
import { setLocale } from '../utils/formatters.js'

export const LANGS = { id: 'Indonesia', en: 'English' }

// Urutan: pilihan tersimpan -> bahasa utama browser -> Inggris.
export function detectLang() {
  try { const s = localStorage.getItem('lang'); if (LANGS[s]) return s } catch { /* abaikan */ }
  const l = (navigator.languages?.[0] || navigator.language || 'en').toLowerCase()
  return /^(id|in)(-|$)/.test(l) ? 'id' : 'en'
}

const Ctx = createContext('id')
export function LangProvider({ lang, children }) {
  setLocale(lang)
  return <Ctx.Provider value={lang}>{children}</Ctx.Provider>
}
export const useLang = () => useContext(Ctx)

export function useT() {
  const lang = useContext(Ctx)
  return useCallback((s, v) => {
    if (typeof s !== 'string') return s
    let out = lang === 'en' ? en[s] ?? s : s
    if (v) for (const k in v) out = out.replace(`{${k}}`, v[k])
    return out
  }, [lang])
}
