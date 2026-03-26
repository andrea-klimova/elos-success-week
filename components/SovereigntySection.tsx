import type { SovereigntyPillar } from '@/types/content'

interface Props {
  title: string
  intro: string
  pillars: SovereigntyPillar[]
  ctaTitle: string
  ctaText: string
}

export default function SovereigntySection({ title, intro, pillars, ctaTitle, ctaText }: Props) {
  return (
    <section className="py-16 px-6 md:px-10 bg-elos-navy text-white" id="suverenita">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-white/70 mb-10 max-w-3xl">{intro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-elos-orange mb-2">{pillar.title}</h3>
              <p className="text-white/70">{pillar.description}</p>
            </div>
          ))}
        </div>
        <div className="bg-elos-magenta rounded-2xl p-8">
          <h3 className="text-2xl font-black mb-3">{ctaTitle}</h3>
          <p className="text-white/80 mb-6">{ctaText}</p>
          <a
            href="#kontakt"
            className="bg-white text-elos-magenta font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors inline-block"
          >
            Získat nabídku se slevou
          </a>
        </div>
      </div>
    </section>
  )
}
