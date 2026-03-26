'use client'
import { useState, useEffect } from 'react'
import { defaultContent } from '@/lib/content'
import type { PageContent } from '@/types/content'
import Header from '@/components/Header'
import CountdownBanner from '@/components/CountdownBanner'
import HeroSection from '@/components/HeroSection'
import ProductsSection from '@/components/ProductsSection'
import RHLSCSection from '@/components/RHLSCSection'
import SovereigntySection from '@/components/SovereigntySection'
import ContactForm from '@/components/ContactForm'
import ContactCards from '@/components/ContactCards'
import Footer from '@/components/Footer'

export default function Page() {
  const [content, setContent] = useState<PageContent>(defaultContent)

  useEffect(() => {
    const saved = localStorage.getItem('elos-success-week-content')
    if (saved) {
      try { setContent(JSON.parse(saved)) } catch { setContent(defaultContent) }
    }
  }, [])

  return (
    <main>
      <Header />
      <CountdownBanner targetDate="2026-04-24T23:59:59" />
      <HeroSection content={content.hero} />
      <ProductsSection title={content.productsTitle} products={content.products} />
      <RHLSCSection title={content.rhlscTitle} items={content.rhlscItems} />
      <SovereigntySection
        title={content.sovereigntyTitle}
        intro={content.sovereigntyIntro}
        pillars={content.sovereigntyPillars}
        ctaTitle={content.sovereigntyCTATitle}
        ctaText={content.sovereigntyCTAText}
      />
      <ContactForm />
      <ContactCards contacts={content.contacts} />
      <Footer address={content.footerAddress} email={content.footerEmail} phone={content.footerPhone} />
    </main>
  )
}
