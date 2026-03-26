import type { HeroContent } from '@/types/content'

interface Props {
  content: HeroContent
}

export default function HeroSection({ content }: Props) {
  return (
    <section className="bg-elos-navy text-white py-20 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="inline-block bg-elos-orange text-elos-dark text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
          {content.badge} | {content.date}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {content.title}{' '}
          <span className="text-elos-orange">{content.titleHighlight}</span>
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mb-10">
          {content.subtitle}
        </p>
        <div className="bg-white/10 rounded-2xl p-8 inline-block mb-10">
          <div className="text-7xl font-black text-elos-orange">{content.discountNumber}</div>
          <div className="text-xl font-semibold text-white mt-1">{content.discountLabel}</div>
          <div className="text-white/60 text-sm mt-1">{content.discountSub}</div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#kontakt"
            className="bg-elos-orange text-elos-dark font-bold px-8 py-4 rounded-xl text-base hover:bg-[#C88A10] transition-colors text-center"
          >
            {content.ctaPrimary}
          </a>
          <a
            href="#rhlsc"
            className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-white/10 transition-colors text-center"
          >
            {content.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  )
}
