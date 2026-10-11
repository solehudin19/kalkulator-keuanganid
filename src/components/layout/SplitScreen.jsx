import Footer from './Footer.jsx'

// Desktop: kiri 40% form, kanan 60% hasil, tinggi 100vh. Mobile: form sticky di atas, hasil di bawah.
export default function SplitScreen({ form, hasil }) {
  return (
    <main className="md:flex md:min-h-0 md:flex-1">
      <aside className="sticky top-0 z-10 max-h-[45vh] overflow-y-auto border-b border-slate-200 bg-white p-4 md:static md:max-h-none md:w-2/5 md:border-b-0 md:border-r md:p-6">
        {form}
      </aside>
      <section className="bg-surface p-4 pb-24 md:w-3/5 md:overflow-y-auto md:p-6 md:pb-6">
        {hasil}
        <Footer />
      </section>
    </main>
  )
}
