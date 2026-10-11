export default function Button({ children, variant = 'primary', className = '', ...p }) {
  const v = variant === 'primary'
    ? 'bg-brand text-[#ffffff] hover:bg-brand-dark'
    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
  return (
    <button type="button" {...p}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60 ${v} ${className}`}>
      {children}
    </button>
  )
}
