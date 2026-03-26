'use client'
import { useState, useEffect } from 'react'
import { defaultContent } from '@/lib/content'
import type { PageContent, Product, RHLSCItem, SovereigntyPillar, ContactInfo } from '@/types/content'

type Section = 'hero' | 'produkty' | 'rhlsc' | 'suverenita' | 'kontakty' | 'footer'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeSection, setActiveSection] = useState<Section>('hero')
  const [content, setContent] = useState<PageContent>(defaultContent)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const session = sessionStorage.getItem('elos-admin-auth')
    if (session === 'true') setAuthed(true)
    const stored = localStorage.getItem('elos-success-week-content')
    if (stored) {
      try { setContent(JSON.parse(stored)) } catch { /* ignore */ }
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const correctPw = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    if (password === correctPw) {
      sessionStorage.setItem('elos-admin-auth', 'true')
      setAuthed(true)
    } else {
      setLoginError('Nesprávné heslo')
    }
  }

  const handleSave = () => {
    localStorage.setItem('elos-success-week-content', JSON.stringify(content))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    if (confirm('Opravdu chcete obnovit výchozí obsah? Všechny změny budou ztraceny.')) {
      localStorage.removeItem('elos-success-week-content')
      setContent(defaultContent)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('elos-admin-auth')
    setAuthed(false)
  }

  // --- Product helpers ---
  const updateProduct = (index: number, field: keyof Product, value: string | boolean) => {
    const updated = content.products.map((p, i) => i === index ? { ...p, [field]: value } : p)
    setContent(c => ({ ...c, products: updated }))
  }
  const removeProduct = (index: number) => {
    setContent(c => ({ ...c, products: c.products.filter((_, i) => i !== index) }))
  }
  const addProduct = () => {
    setContent(c => ({
      ...c,
      products: [...c.products, { id: Date.now().toString(), name: '', description: '', featured: false }],
    }))
  }

  // --- RHLSC helpers ---
  const updateRHLSC = (index: number, field: keyof RHLSCItem, value: string) => {
    const updated = content.rhlscItems.map((item, i) => i === index ? { ...item, [field]: value } : item)
    setContent(c => ({ ...c, rhlscItems: updated }))
  }
  const removeRHLSC = (index: number) => {
    setContent(c => ({ ...c, rhlscItems: c.rhlscItems.filter((_, i) => i !== index) }))
  }
  const addRHLSC = () => {
    setContent(c => ({
      ...c,
      rhlscItems: [...c.rhlscItems, { id: Date.now().toString(), icon: '📌', value: '', label: '' }],
    }))
  }

  // --- Sovereignty helpers ---
  const updatePillar = (index: number, field: keyof SovereigntyPillar, value: string) => {
    const updated = content.sovereigntyPillars.map((p, i) => i === index ? { ...p, [field]: value } : p)
    setContent(c => ({ ...c, sovereigntyPillars: updated }))
  }
  const removePillar = (index: number) => {
    setContent(c => ({ ...c, sovereigntyPillars: c.sovereigntyPillars.filter((_, i) => i !== index) }))
  }
  const addPillar = () => {
    setContent(c => ({
      ...c,
      sovereigntyPillars: [...c.sovereigntyPillars, { id: Date.now().toString(), title: '', description: '' }],
    }))
  }

  // --- Contact helpers ---
  const updateContact = (index: number, field: keyof ContactInfo, value: string) => {
    const updated = content.contacts.map((c, i) => i === index ? { ...c, [field]: value } : c)
    setContent(c => ({ ...c, contacts: updated }))
  }
  const removeContact = (index: number) => {
    setContent(c => ({ ...c, contacts: c.contacts.filter((_, i) => i !== index) }))
  }
  const addContact = () => {
    setContent(c => ({
      ...c,
      contacts: [...c.contacts, { name: '', role: '', email: '' }],
    }))
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-elos-light flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 border border-elos-border w-full max-w-sm shadow-lg">
          <div className="text-center mb-6">
            <div className="text-3xl mb-2">🔧</div>
            <h1 className="text-2xl font-bold text-elos-navy">ELOS Admin</h1>
            <p className="text-elos-gray text-sm mt-1">Success Week Editor</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-elos-dark mb-1">Heslo</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-elos-border rounded-lg px-4 py-3 focus:outline-none focus:border-elos-navy"
                placeholder="Zadejte heslo"
              />
              {loginError && <p className="text-red-500 text-xs mt-1">{loginError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-elos-navy text-white font-bold py-3 rounded-xl hover:bg-[#142e63] transition-colors"
            >
              Přihlásit se
            </button>
          </form>
        </div>
      </div>
    )
  }

  const navItems: { id: Section; label: string }[] = [
    { id: 'hero', label: 'Hero' },
    { id: 'produkty', label: 'Produkty' },
    { id: 'rhlsc', label: 'RHLSC' },
    { id: 'suverenita', label: 'Suverenita' },
    { id: 'kontakty', label: 'Kontakty' },
    { id: 'footer', label: 'Footer' },
  ]

  return (
    <div className="min-h-screen bg-elos-light">
      {/* Admin Header */}
      <header className="bg-elos-navy text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-lg font-bold">🔧 ELOS Admin — Success Week</h1>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              saved ? 'bg-elos-green text-white' : 'bg-elos-orange text-elos-dark hover:bg-[#C88A10]'
            }`}
          >
            {saved ? '✓ Uloženo' : '💾 Uložit'}
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors"
          >
            ↗ Náhled
          </a>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors"
          >
            Odhlásit
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-48 bg-white border-r border-elos-border min-h-[calc(100vh-64px)] p-4 flex flex-col">
          <nav className="space-y-1 flex-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-elos-navy text-white'
                    : 'text-elos-dark hover:bg-elos-light'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            onClick={handleReset}
            className="w-full mt-4 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
          >
            ↺ Reset
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-8 max-w-3xl">

          {/* HERO SECTION */}
          {activeSection === 'hero' && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-elos-navy mb-6">Hero sekce</h2>
              {([
                ['badge', 'Badge text'],
                ['date', 'Datum'],
                ['title', 'Nadpis (část 1)'],
                ['titleHighlight', 'Nadpis (zvýrazněná část)'],
                ['subtitle', 'Podnadpis'],
                ['discountNumber', 'Číslo slevy (např. 15%)'],
                ['discountLabel', 'Popis slevy'],
                ['discountSub', 'Produkty v slevě'],
                ['ctaPrimary', 'Primární CTA tlačítko'],
                ['ctaSecondary', 'Sekundární CTA tlačítko'],
              ] as [keyof typeof content.hero, string][]).map(([field, label]) => (
                <div key={field}>
                  <label className="block text-sm font-semibold text-elos-dark mb-1">{label}</label>
                  <input
                    className="w-full border border-elos-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-elos-navy text-sm"
                    value={content.hero[field]}
                    onChange={e => setContent(c => ({ ...c, hero: { ...c.hero, [field]: e.target.value } }))}
                  />
                </div>
              ))}
            </div>
          )}

          {/* PRODUCTS SECTION */}
          {activeSection === 'produkty' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-elos-navy">Produkty</h2>
                <button
                  onClick={addProduct}
                  className="bg-elos-navy text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#142e63] transition-colors"
                >
                  + Přidat produkt
                </button>
              </div>
              <div>
                <label className="block text-sm font-semibold text-elos-dark mb-1">Nadpis sekce</label>
                <input
                  className="w-full border border-elos-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-elos-navy text-sm mb-6"
                  value={content.productsTitle}
                  onChange={e => setContent(c => ({ ...c, productsTitle: e.target.value }))}
                />
              </div>
              {content.products.map((product, index) => (
                <div key={product.id} className="bg-white rounded-xl p-5 border border-elos-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-elos-navy">Produkt {index + 1}</span>
                    <button
                      onClick={() => removeProduct(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Odebrat
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-elos-gray mb-1">Název</label>
                      <input
                        className="w-full border border-elos-border rounded-lg px-3 py-2 focus:outline-none focus:border-elos-navy text-sm"
                        value={product.name}
                        onChange={e => updateProduct(index, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-elos-gray mb-1">Popis</label>
                      <textarea
                        rows={2}
                        className="w-full border border-elos-border rounded-lg px-3 py-2 focus:outline-none focus:border-elos-navy text-sm resize-none"
                        value={product.description}
                        onChange={e => updateProduct(index, 'description', e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={product.featured}
                          onChange={e => updateProduct(index, 'featured', e.target.checked)}
                          className="w-4 h-4 accent-elos-navy"
                        />
                        <span className="text-sm text-elos-dark">Doporučený</span>
                      </label>
                      {product.featured && (
                        <div className="flex-1">
                          <input
                            placeholder="Tag (např. Nejžádanější)"
                            className="w-full border border-elos-border rounded-lg px-3 py-2 focus:outline-none focus:border-elos-navy text-sm"
                            value={product.tag || ''}
                            onChange={e => updateProduct(index, 'tag', e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* RHLSC SECTION */}
          {activeSection === 'rhlsc' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-elos-navy">RHLSC položky</h2>
                <button
                  onClick={addRHLSC}
                  className="bg-elos-navy text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#142e63] transition-colors"
                >
                  + Přidat položku
                </button>
              </div>
              <div>
                <label className="block text-sm font-semibold text-elos-dark mb-1">Nadpis sekce</label>
                <input
                  className="w-full border border-elos-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-elos-navy text-sm mb-6"
                  value={content.rhlscTitle}
                  onChange={e => setContent(c => ({ ...c, rhlscTitle: e.target.value }))}
                />
              </div>
              {content.rhlscItems.map((item, index) => (
                <div key={item.id} className="bg-white rounded-xl p-5 border border-elos-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-elos-navy">Položka {index + 1}</span>
                    <button
                      onClick={() => removeRHLSC(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Odebrat
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-elos-gray mb-1">Ikona (emoji)</label>
                      <input
                        className="w-full border border-elos-border rounded-lg px-3 py-2 focus:outline-none focus:border-elos-navy text-sm"
                        value={item.icon}
                        onChange={e => updateRHLSC(index, 'icon', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-elos-gray mb-1">Hodnota</label>
                      <input
                        className="w-full border border-elos-border rounded-lg px-3 py-2 focus:outline-none focus:border-elos-navy text-sm"
                        value={item.value}
                        onChange={e => updateRHLSC(index, 'value', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-elos-gray mb-1">Popis</label>
                      <input
                        className="w-full border border-elos-border rounded-lg px-3 py-2 focus:outline-none focus:border-elos-navy text-sm"
                        value={item.label}
                        onChange={e => updateRHLSC(index, 'label', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SOVEREIGNTY SECTION */}
          {activeSection === 'suverenita' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-elos-navy">Suverenita</h2>
                <button
                  onClick={addPillar}
                  className="bg-elos-navy text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#142e63] transition-colors"
                >
                  + Přidat pilíř
                </button>
              </div>
              <div>
                <label className="block text-sm font-semibold text-elos-dark mb-1">Nadpis sekce</label>
                <input
                  className="w-full border border-elos-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-elos-navy text-sm"
                  value={content.sovereigntyTitle}
                  onChange={e => setContent(c => ({ ...c, sovereigntyTitle: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-elos-dark mb-1">Úvod</label>
                <textarea
                  rows={3}
                  className="w-full border border-elos-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-elos-navy text-sm resize-none"
                  value={content.sovereigntyIntro}
                  onChange={e => setContent(c => ({ ...c, sovereigntyIntro: e.target.value }))}
                />
              </div>
              <h3 className="text-sm font-bold text-elos-navy mt-4">Pilíře</h3>
              {content.sovereigntyPillars.map((pillar, index) => (
                <div key={pillar.id} className="bg-white rounded-xl p-5 border border-elos-border">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-elos-navy">Pilíř {index + 1}</span>
                    <button
                      onClick={() => removePillar(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Odebrat
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-elos-gray mb-1">Název</label>
                      <input
                        className="w-full border border-elos-border rounded-lg px-3 py-2 focus:outline-none focus:border-elos-navy text-sm"
                        value={pillar.title}
                        onChange={e => updatePillar(index, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-elos-gray mb-1">Popis</label>
                      <input
                        className="w-full border border-elos-border rounded-lg px-3 py-2 focus:outline-none focus:border-elos-navy text-sm"
                        value={pillar.description}
                        onChange={e => updatePillar(index, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-white rounded-xl p-5 border border-elos-border mt-4">
                <h3 className="text-sm font-bold text-elos-navy mb-3">CTA blok</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-elos-gray mb-1">CTA nadpis</label>
                    <input
                      className="w-full border border-elos-border rounded-lg px-3 py-2 focus:outline-none focus:border-elos-navy text-sm"
                      value={content.sovereigntyCTATitle}
                      onChange={e => setContent(c => ({ ...c, sovereigntyCTATitle: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-elos-gray mb-1">CTA text</label>
                    <textarea
                      rows={3}
                      className="w-full border border-elos-border rounded-lg px-3 py-2 focus:outline-none focus:border-elos-navy text-sm resize-none"
                      value={content.sovereigntyCTAText}
                      onChange={e => setContent(c => ({ ...c, sovereigntyCTAText: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTACTS SECTION */}
          {activeSection === 'kontakty' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-elos-navy">Kontakty</h2>
                <button
                  onClick={addContact}
                  className="bg-elos-navy text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#142e63] transition-colors"
                >
                  + Přidat kontakt
                </button>
              </div>
              {content.contacts.map((contact, index) => (
                <div key={index} className="bg-white rounded-xl p-5 border border-elos-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-elos-navy">Kontakt {index + 1}</span>
                    <button
                      onClick={() => removeContact(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Odebrat
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-elos-gray mb-1">Jméno</label>
                      <input
                        className="w-full border border-elos-border rounded-lg px-3 py-2 focus:outline-none focus:border-elos-navy text-sm"
                        value={contact.name}
                        onChange={e => updateContact(index, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-elos-gray mb-1">Role</label>
                      <input
                        className="w-full border border-elos-border rounded-lg px-3 py-2 focus:outline-none focus:border-elos-navy text-sm"
                        value={contact.role}
                        onChange={e => updateContact(index, 'role', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-elos-gray mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full border border-elos-border rounded-lg px-3 py-2 focus:outline-none focus:border-elos-navy text-sm"
                        value={contact.email}
                        onChange={e => updateContact(index, 'email', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FOOTER SECTION */}
          {activeSection === 'footer' && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-elos-navy mb-6">Footer</h2>
              <div>
                <label className="block text-sm font-semibold text-elos-dark mb-1">Adresa</label>
                <input
                  className="w-full border border-elos-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-elos-navy text-sm"
                  value={content.footerAddress}
                  onChange={e => setContent(c => ({ ...c, footerAddress: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-elos-dark mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-elos-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-elos-navy text-sm"
                  value={content.footerEmail}
                  onChange={e => setContent(c => ({ ...c, footerEmail: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-elos-dark mb-1">Telefon</label>
                <input
                  className="w-full border border-elos-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-elos-navy text-sm"
                  value={content.footerPhone}
                  onChange={e => setContent(c => ({ ...c, footerPhone: e.target.value }))}
                />
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
