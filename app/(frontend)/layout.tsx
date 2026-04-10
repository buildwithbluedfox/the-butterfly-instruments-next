import '../globals.css';
import { getPayload } from '@/lib/payload';
import type { Metadata } from 'next';
import {
  DEFAULT_LOCALE,
  DEFAULT_THEME_COLOR,
  DEFAULT_SOCIAL_IMAGE_ALT,
  DEFAULT_SOCIAL_IMAGE_WIDTH,
  DEFAULT_SOCIAL_IMAGE_HEIGHT,
  DEFAULT_SOCIAL_IMAGE_TYPE,
  createSeoImageUrl,
  getDefaultSeoKeywords,
  resolveSiteUrl,
} from '@/lib/seo';
import metadata from '@/metadata.json';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload();

  // Fetch only what's needed for SEO
  const [siteSettings, servicesResult, techStackResult] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({ collection: 'services', limit: 100 }),
    payload.find({ collection: 'tech-stack', limit: 100 }),
  ]);

  const siteUrl = resolveSiteUrl(process.env.APP_URL || 'https://butterflyinstruments.com');
  const siteName = siteSettings.name || 'The Butterfly Instruments';
  const tagline = siteSettings.tagline || '';
  const title = `${siteName} — ${tagline}`;
  const description = metadata.description;
  const socialImageUrl = createSeoImageUrl(siteUrl, title, description);
  
  const servicesData = servicesResult.docs.map(s => ({ title: s.title, description: s.description, icon: '', id: '' }));
  const techStackData = techStackResult.docs.map(t => ({ name: t.name, description: '', category: '' }));
  
  const keywords = getDefaultSeoKeywords(siteName, tagline, servicesData as any, techStackData as any);

  return {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    metadataBase: new URL(siteUrl),
    applicationName: siteName,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    keywords: keywords.join(', '),
    formatDetection: {
      telephone: false,
      address: false,
      email: false,
    },
    referrer: 'strict-origin-when-cross-origin',
    icons: {
      icon: '/favicon.svg',
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: siteUrl,
      siteName: siteName,
      locale: DEFAULT_LOCALE,
      images: [
        {
          url: socialImageUrl,
          alt: DEFAULT_SOCIAL_IMAGE_ALT,
          width: DEFAULT_SOCIAL_IMAGE_WIDTH,
          height: DEFAULT_SOCIAL_IMAGE_HEIGHT,
          type: DEFAULT_SOCIAL_IMAGE_TYPE,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImageUrl],
    },
    other: {
      'theme-color': DEFAULT_THEME_COLOR,
    },
  };
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const payload = await getPayload();

  const siteSettings = await payload.findGlobal({ slug: 'site-settings' });
  const footer = await payload.findGlobal({ slug: 'footer' });

  const siteName = siteSettings.name || 'The Butterfly Instruments';
  const footerLinks = (footer.links || []).map((item: { value: string }) => item.value);
  const copyright = footer.copyright || '';

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-background selection:bg-primary-container selection:text-on-primary-fixed">
          <CustomCursor />
          <Navbar siteName={siteName} currentPath="/" />
          {children}
          <Footer siteName={siteName} copyright={copyright} links={footerLinks} />
        </div>
      </body>
    </html>
  );
}
