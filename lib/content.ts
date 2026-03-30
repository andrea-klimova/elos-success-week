import type { PageContent } from '@/types/content'

export const defaultContent: PageContent = {
  hero: {
    badge: "Časově omezená akce",
    date: "20.–24. dubna 2026",
    title: "ELOS",
    titleHighlight: "Success Week",
    subtitle: "Celý týden výjimečná sleva na kompletní Red Hat portfolio — licence i školení. Ve spolupráci s Red Hat.",
    discountNumber: "20%",
    discountLabel: "sleva na celé portfolio",
    discountSub: "RHEL · OpenShift · Ansible · školení · certifikace",
    ctaPrimary: "Získat nabídku",
    ctaSecondary: "Prohlédnout školení",
  },
  productsTitle: "Celé Red Hat portfolio se slevou 20 %",
  products: [
    { id: "rhlsc", name: "RHLS Course (RHLSC)", description: "Živé školení + 365 dní přístupu + 100h cloudových labů + zkouškový voucher v jednom balíčku.", featured: true, tag: "Nejžádanější" },
    { id: "ansible", name: "Ansible + školení AU294", description: "Ansible Automation Platform + kurzy a zkouška EX294 (RHCE certifikace) se slevou.", featured: true, tag: "Nejžádanější" },
    { id: "openshift", name: "Red Hat OpenShift", description: "Enterprise Kubernetes platforma — kontejnery, AI i virtualizace na jedné platformě.", featured: false },
    { id: "rhel", name: "RHEL", description: "Podnikový Linux se 10letou podporou a předvídatelným vývojem pro hybridní cloud.", featured: false },
  ],
  rhlscTitle: "Red Hat Learning Subscription Course",
  rhlscItems: [
    { id: "1", icon: "🎓", value: "1 kurz", label: "Živé online školení s certifikovaným lektorem" },
    { id: "2", icon: "📚", value: "365 dní", label: "Přístup ke studijním materiálům" },
    { id: "3", icon: "☁️", value: "100 hodin", label: "Cloudové laboratoře v reálném prostředí" },
    { id: "4", icon: "📋", value: "1 zkouška", label: "Voucher + 1 opakování zdarma" },
  ],
  sovereigntyTitle: "Digitální suverenita v cloudu",
  sovereigntyIntro: "Red Hat spustil nový modul Achieving Digital Sovereignty in the Cloud — dostupný v rámci RHLS. Čtyři pilíře, které vaše IT týmy potřebují znát:",
  sovereigntyPillars: [
    { id: "1", title: "Datová suverenita", description: "Kontrola nad sběrem a ukládáním dat" },
    { id: "2", title: "Technická suverenita", description: "Provoz bez závislosti na jednom poskytovateli" },
    { id: "3", title: "Operační suverenita", description: "Přehled a kontrola nad infrastrukturou" },
    { id: "4", title: "Záruční suverenita", description: "Nezávislé ověření integrity systémů" },
  ],
  sovereigntyCTATitle: "GDPR. NIS2. AI Act.",
  sovereigntyCTAText: "Regulatorní tlak roste. Vzdělávejte tým na tématech, která jsou dnes strategickou prioritou — se slevou 20 % v rámci Success Weeku.",
  contacts: [
    { name: "Štěpán Lohnickij", role: "Sales Manager", email: "stepan.lohnickij@elos.navy" },
    { name: "Daniel Kubenka", role: "Training Consultant", email: "daniel.kubenka@elos.navy" },
  ],
  footerAddress: "Americká 525/23, Vinohrady, Praha 2",
  footerEmail: "info@elostech.cz",
  footerPhone: "+420 222 241 238",
}
