import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import AdBannerSticky from './components/monetization/AdBannerSticky.jsx'
import HomeKPR from './pages/HomeKPR.jsx'
import { LANGS, LangProvider, detectLang } from './i18n/index.jsx'
import { META } from './i18n/meta.js'

const InvestasiPage = lazy(() => import('./pages/InvestasiPage.jsx'))
const PajakPage = lazy(() => import('./pages/PajakPage.jsx'))

function LangShell() {
  const { lang } = useParams()
  const { pathname } = useLocation()
  useEffect(() => {
    const m = META[lang]?.[pathname.split('/')[2] || 'home']
    if (!m) return
    document.documentElement.lang = lang
    document.title = m.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.desc)
  }, [lang, pathname])
  if (!LANGS[lang]) return <Navigate to={`/${detectLang()}`} replace />
  return (
    <LangProvider lang={lang}>
      <div className="flex min-h-full flex-col md:h-screen">
        <Header />
        <Suspense fallback={<div className="flex-1" />}><Outlet /></Suspense>
        <AdBannerSticky />
      </div>
    </LangProvider>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/:lang" element={<LangShell />}>
        <Route index element={<HomeKPR />} />
        <Route path="investasi" element={<InvestasiPage />} />
        <Route path="pajak" element={<PajakPage />} />
      </Route>
      <Route path="*" element={<Navigate to={`/${detectLang()}`} replace />} />
    </Routes>
  )
}
