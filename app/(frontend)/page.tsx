import { getPayload } from '@/lib/payload';
import Hero from '@/components/Hero';
import OriginStory from '@/components/OriginStory';
import Services from '@/components/Services';
import SelectedWorks from '@/components/SelectedWorks';
import Testimonials from '@/components/Testimonials';
import InternalInstruments from '@/components/InternalInstruments';
import Artisans from '@/components/Artisans';
import Philosophy from '@/components/Philosophy';
import Contact from '@/components/Contact';

import { buildHomeStructuredData, resolveSiteUrl } from '@/lib/seo';

export default async function HomePage() {
  const payload = await getPayload();

  // Fetch all globals in parallel
  const [hero, about, philosophy, contactInfo, testimonialsSection, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: 'hero' }),
    payload.findGlobal({ slug: 'about' }),
    payload.findGlobal({ slug: 'philosophy' }),
    payload.findGlobal({ slug: 'contact-info' }),
    payload.findGlobal({ slug: 'testimonials-section' }),
    payload.findGlobal({ slug: 'site-settings' }),
  ]);

  // Fetch all collections in parallel
  const [servicesResult, portfolioResult, testimonialsResult, techStackResult, teamResult] = await Promise.all([
    payload.find({ collection: 'services', sort: 'sortOrder', limit: 100 }),
    payload.find({ collection: 'portfolio', sort: 'sortOrder', limit: 100 }),
    payload.find({ collection: 'testimonials', where: { publishOnWebsite: { equals: true } }, sort: 'sortOrder', limit: 100 }),
    payload.find({ collection: 'tech-stack', sort: 'sortOrder', limit: 100 }),
    payload.find({ collection: 'team-members', sort: 'sortOrder', limit: 100 }),
  ]);

  // Transform data to match component props
  const heroData = {
    headline: hero.headline || '',
    highlightedText: hero.highlightedText || '',
    subheadline: hero.subheadline || '',
    ctaPrimary: hero.ctaPrimary || 'Start a Project',
    ctaSecondary: hero.ctaSecondary || 'View Our Work',
  };

  const aboutData = {
    label: about.label || '',
    title: about.title || '',
    highlightedTitle: about.highlightedTitle || '',
    description: about.description || '',
  };

  const servicesData = servicesResult.docs.map((s) => ({
    id: s.serviceId || '',
    title: s.title || '',
    description: s.description || '',
    icon: s.icon || 'Code',
  }));

  const portfolioData = portfolioResult.docs.map((p) => ({
    title: p.title || '',
    client: p.client || '',
    description: p.description || '',
    tags: (p.tags || []).map((t: { value: string }) => t.value),
    image: p.image || '',
  }));

  const testimonialsData = {
    headline: testimonialsSection.headline || '',
    highlightedText: testimonialsSection.highlightedText || '',
    description: testimonialsSection.description || '',
    items: testimonialsResult.docs.map((t) => ({
      name: t.name || '',
      linkedinUrl: t.linkedinUrl || '',
      jobTitle: t.jobTitle || '',
      projectName: t.projectName || '',
      overallSatisfaction: t.overallSatisfaction || '',
      standoutStrengths: (t.standoutStrengths || []).map((s: { value: string }) => s.value),
      testimonial: t.testimonial || '',
      rating: t.rating || 5,
    })),
  };

  const techStackData = techStackResult.docs.map((t) => ({
    name: t.name || '',
    description: t.description || '',
    category: t.category || '',
  }));

  const teamData = teamResult.docs.map((m) => ({
    slug: m.slug || '',
    name: m.name || '',
    role: m.role || '',
    quote: m.quote || '',
    image: m.image || '',
    bio: m.bio || '',
    specialties: (m.specialties || []).map((s: { value: string }) => s.value),
  }));

  const philosophyData = {
    headline: philosophy.headline || '',
    highlightedText: philosophy.highlightedText || '',
    description: philosophy.description || '',
  };

  const contactData = {
    headline: contactInfo.headline || '',
    highlightedText: contactInfo.highlightedText || '',
    description: contactInfo.description || '',
    email: contactInfo.email || '',
    location: contactInfo.location || '',
    services: (contactInfo.services || []).map((s: { value: string }) => s.value),
  };

  const siteUrl = resolveSiteUrl(process.env.APP_URL || 'https://butterflyinstruments.com');
  const homeStructuredData = buildHomeStructuredData(
    siteSettings.name || 'The Butterfly Instruments',
    contactInfo.email || '',
    servicesData as any,
    portfolioData as any,
    siteUrl,
    siteUrl,
    new URL('/og-image.svg', siteUrl).toString()
  );

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      />
      <Hero hero={heroData} />
      <OriginStory about={aboutData} />
      <Services services={servicesData} />
      <SelectedWorks portfolio={portfolioData} />
      <Testimonials testimonials={testimonialsData} />
      <InternalInstruments techStack={techStackData} />
      <Artisans team={teamData} />
      <Philosophy philosophy={philosophyData} />
      <Contact contact={contactData} />
    </main>
  );
}
