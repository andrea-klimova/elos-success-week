export default function Header() {
  return (
    <header className="bg-elos-navy py-4 px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img src="/elos-success-week/elos-logo.jpg" alt="ELOS Technologies" className="h-10 brightness-0 invert" />
          <span className="text-white/40 text-xl font-light">×</span>
          <img src="/elos-success-week/redhat-logo.png" alt="Red Hat" className="h-8 brightness-0 invert" />
        </div>
        <a
          href="#kontakt"
          className="bg-elos-orange text-elos-dark font-semibold px-5 py-2 rounded-lg text-sm hover:bg-[#C88A10] transition-colors"
        >
          Získat nabídku
        </a>
      </div>
    </header>
  )
}
