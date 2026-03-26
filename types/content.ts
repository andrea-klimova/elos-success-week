export interface HeroContent {
  badge: string
  date: string
  title: string
  titleHighlight: string
  subtitle: string
  discountNumber: string
  discountLabel: string
  discountSub: string
  ctaPrimary: string
  ctaSecondary: string
}

export interface Product {
  id: string
  name: string
  description: string
  featured: boolean
  tag?: string
}

export interface RHLSCItem {
  id: string
  icon: string
  value: string
  label: string
}

export interface SovereigntyPillar {
  id: string
  title: string
  description: string
}

export interface ContactInfo {
  name: string
  role: string
  email: string
}

export interface PageContent {
  hero: HeroContent
  productsTitle: string
  products: Product[]
  rhlscTitle: string
  rhlscItems: RHLSCItem[]
  sovereigntyTitle: string
  sovereigntyIntro: string
  sovereigntyPillars: SovereigntyPillar[]
  sovereigntyCTATitle: string
  sovereigntyCTAText: string
  contacts: ContactInfo[]
  footerAddress: string
  footerEmail: string
  footerPhone: string
}
