'use client'
import { useState } from 'react'

const ZAJMY = [
  'RHEL licence',
  'OpenShift',
  'Ansible Automation Platform',
  'Red Hat Learning Subscription Course (RHLSC)',
  'Školení a certifikace',
  'Jiné',
]

export default function ContactForm() {
  const [form, setForm] = useState({
    jmeno: '', email: '', spolecnost: '', telefon: '', zprava: '',
    zajem: [] as string[],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.jmeno) e.jmeno = 'Povinné pole'
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Neplatný email'
    if (!form.spolecnost) e.spolecnost = 'Povinné pole'
    if (form.zajem.length === 0) e.zajem = 'Vyberte alespoň jednu možnost'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSending(true)
    const id = process.env.NEXT_PUBLIC_FORMSPREE_ID
    try {
      await fetch(`https://formspree.io/f/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSubmitted(true)
    } catch {
      alert('Chyba při odesílání. Zkuste to prosím znovu.')
    } finally {
      setSending(false)
    }
  }

  const toggleZajem = (item: string) => {
    setForm(f => ({
      ...f,
      zajem: f.zajem.includes(item) ? f.zajem.filter(z => z !== item) : [...f.zajem, item],
    }))
  }

  if (submitted) {
    return (
      <section className="py-16 px-6 md:px-10 bg-elos-light" id="kontakt">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-elos-navy mb-2">Děkujeme!</h2>
          <p className="text-elos-gray">Ozveme se vám do 24 hodin.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-6 md:px-10 bg-elos-light" id="kontakt">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-elos-navy text-center mb-2">Získat nabídku</h2>
        <p className="text-elos-gray text-center mb-8">Vyplňte formulář a ozveme se vám do 24 hodin.</p>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-elos-border space-y-5">
          <div>
            <label className="block text-sm font-semibold text-elos-dark mb-1">Jméno a příjmení *</label>
            <input
              className="w-full border border-elos-border rounded-lg px-4 py-3 focus:outline-none focus:border-elos-navy"
              value={form.jmeno}
              onChange={e => setForm(f => ({ ...f, jmeno: e.target.value }))}
            />
            {errors.jmeno && <p className="text-red-500 text-xs mt-1">{errors.jmeno}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-elos-dark mb-1">Pracovní email *</label>
            <input
              type="email"
              className="w-full border border-elos-border rounded-lg px-4 py-3 focus:outline-none focus:border-elos-navy"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-elos-dark mb-1">Společnost *</label>
            <input
              className="w-full border border-elos-border rounded-lg px-4 py-3 focus:outline-none focus:border-elos-navy"
              value={form.spolecnost}
              onChange={e => setForm(f => ({ ...f, spolecnost: e.target.value }))}
            />
            {errors.spolecnost && <p className="text-red-500 text-xs mt-1">{errors.spolecnost}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-elos-dark mb-1">Telefon</label>
            <input
              className="w-full border border-elos-border rounded-lg px-4 py-3 focus:outline-none focus:border-elos-navy"
              value={form.telefon}
              onChange={e => setForm(f => ({ ...f, telefon: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-elos-dark mb-2">Mám zájem o *</label>
            <div className="space-y-2">
              {ZAJMY.map(item => (
                <label key={item} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.zajem.includes(item)}
                    onChange={() => toggleZajem(item)}
                    className="w-4 h-4 accent-elos-navy"
                  />
                  <span className="text-sm text-elos-dark">{item}</span>
                </label>
              ))}
            </div>
            {errors.zajem && <p className="text-red-500 text-xs mt-1">{errors.zajem}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-elos-dark mb-1">Zpráva</label>
            <textarea
              rows={4}
              className="w-full border border-elos-border rounded-lg px-4 py-3 focus:outline-none focus:border-elos-navy resize-none"
              value={form.zprava}
              onChange={e => setForm(f => ({ ...f, zprava: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-elos-navy text-white font-bold py-4 rounded-xl hover:bg-[#142e63] transition-colors disabled:opacity-50"
          >
            {sending ? 'Odesílám...' : 'Odeslat poptávku'}
          </button>
        </form>
      </div>
    </section>
  )
}
