import type { RHLSCItem } from '@/types/content'

interface Props {
  title: string
  items: RHLSCItem[]
}

export default function RHLSCSection({ title, items }: Props) {
  return (
    <section className="py-16 px-6 md:px-10 bg-elos-light" id="rhlsc">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-elos-navy text-center mb-10">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-6 text-center border border-elos-border">
              <div className="text-4xl mb-3">{item.icon}</div>
              <div className="text-2xl font-black text-elos-navy mb-1">{item.value}</div>
              <div className="text-sm text-elos-gray">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
