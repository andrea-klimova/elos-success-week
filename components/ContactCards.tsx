import type { ContactInfo } from '@/types/content'

interface Props {
  contacts: ContactInfo[]
}

export default function ContactCards({ contacts }: Props) {
  return (
    <section className="py-12 px-6 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-elos-navy text-center mb-8">Kontaktujte nás přímo</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {contacts.map((contact) => (
            <div key={contact.email} className="bg-elos-light rounded-xl p-6 border border-elos-border text-center flex-1 max-w-sm">
              <div className="w-14 h-14 bg-elos-navy rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                {contact.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <h3 className="font-bold text-elos-navy text-lg">{contact.name}</h3>
              <p className="text-elos-gray text-sm mb-3">{contact.role}</p>
              <a href={`mailto:${contact.email}`} className="text-elos-cyan text-sm hover:underline">
                {contact.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
