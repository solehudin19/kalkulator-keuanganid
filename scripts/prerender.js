// Setelah build: buat dist/{id,en}/{,investasi,pajak}/index.html dengan <html lang>, title, description, canonical, dan hreflang per bahasa.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { META, SITE } from '../src/i18n/meta.js'

const base = readFileSync('dist/index.html', 'utf8')
const pages = [['home', ''], ['investasi', 'investasi'], ['pajak', 'pajak']]
for (const lang of Object.keys(META)) {
  for (const [key, slug] of pages) {
    const m = META[lang][key]
    const url = (l) => `${SITE}/${l}${slug ? '/' + slug : ''}`
    const alt = Object.keys(META).map((l) => `<link rel="alternate" hreflang="${l}" href="${url(l)}" />`).join('') + `<link rel="alternate" hreflang="x-default" href="${url('en')}" />`
    const html = base
      .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${m.title}</title>`)
      .replace(/(<meta name="description" content=")[^"]*"/, `$1${m.desc}"`)
      .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url(lang)}" />${alt}`)
    const dir = `dist/${lang}${slug ? '/' + slug : ''}`
    mkdirSync(dir, { recursive: true })
    writeFileSync(`${dir}/index.html`, html)
  }
}
