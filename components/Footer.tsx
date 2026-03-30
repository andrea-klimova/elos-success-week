interface Props {
  address: string
  email: string
  phone: string
}

export default function Footer({ address, email, phone }: Props) {
  return (
    <footer className="bg-elos-navy text-white py-10 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <img src="/elos-success-week/elos-logo.jpg" alt="ELOS Technologies" className="h-8 brightness-0 invert mb-4" />
            <p className="text-white/60 text-sm">{address}</p>
          </div>
          <div className="space-y-1">
            <p className="text-white/60 text-sm">📧 <a href={`mailto:${email}`} className="hover:text-elos-orange">{email}</a></p>
            <p className="text-white/60 text-sm">📞 <a href={`tel:${phone}`} className="hover:text-elos-orange">{phone}</a></p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-white/40 text-xs">
          © 2026 ELOS Technologies. ELOS Success Week je propagační akce. Red Hat je ochranná známka Red Hat, Inc.
        </div>
      </div>
    </footer>
  )
}
