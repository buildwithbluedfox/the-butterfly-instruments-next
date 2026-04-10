import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getPayload } from '@/lib/payload';
import { buildProfileStructuredData, resolveSiteUrl } from '@/lib/seo';
import Profile from '@/components/Profile';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload();

  const result = await payload.find({
    collection: 'team-members',
    where: { slug: { equals: slug } },
    limit: 1,
  });

  const member = result.docs[0];

  if (!member) {
    return { title: 'Not Found' };
  }

  const siteSettings = await payload.findGlobal({ slug: 'site-settings' });
  const profileTitle = `${member.name} | ${member.role} | ${siteSettings.name}`;
  const profileDescription = `${member.role}. ${member.bio}`.slice(0, 160);

  const siteUrl = resolveSiteUrl(process.env.APP_URL || 'https://butterflyinstruments.com');
  const profileUrl = new URL(`/team/${member.slug}`, siteUrl).toString();

  // Transform data for SEO
  const memberData = {
    slug: member.slug || '',
    name: member.name || '',
    role: member.role || '',
    quote: member.quote || '',
    image: member.image || '',
    bio: member.bio || '',
    specialties: (member.specialties || []).map((s: { value: string }) => s.value),
    contact: member.contact ? {
      email: member.contact.email || undefined,
      phone: member.contact.phone || undefined,
      linkedinLabel: member.contact.linkedinLabel || undefined,
      linkedinUrl: member.contact.linkedinUrl || undefined,
    } : undefined,
    skillGroups: [
      ...(member.skillGroups || []).map((g: { label: string; items?: { value: string }[] | null }) => ({
        label: g.label,
        items: (g.items || []).map((i) => i.value),
      })),
      ...Object.entries(
        (member.relatedTechStack || []).reduce((acc: any, t: any) => {
          if (typeof t === 'object' && t !== null) {
            const cat = t.category || 'General';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(t.name);
          }
          return acc;
        }, {})
      ).map(([label, items]) => ({
        label,
        items: items as string[],
      }))
    ],
  };

  const profileStructuredData = buildProfileStructuredData(
    siteSettings.name || 'The Butterfly Instruments',
    memberData as any,
    siteUrl,
    profileUrl
  );

  return {
    title: profileTitle,
    description: profileDescription,
    alternates: {
      canonical: `/team/${member.slug}`,
    },
    openGraph: {
      type: 'profile',
      title: profileTitle,
      description: profileDescription,
      images: member.image ? [{ url: member.image, alt: `${member.name} portrait` }] : [],
    },
    other: {
      'script:ld+json': JSON.stringify(profileStructuredData),
    },
  };
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params;
  const payload = await getPayload();

  const result = await payload.find({
    collection: 'team-members',
    where: { slug: { equals: slug } },
    limit: 1,
  });

  const member = result.docs[0];

  if (!member) {
    redirect('/');
  }

  // Transform Payload data shape to match the Profile component props
  const memberData = {
    slug: member.slug || '',
    name: member.name || '',
    role: member.role || '',
    quote: member.quote || '',
    image: member.image || '',
    bio: member.bio || '',
    specialties: (member.specialties || []).map((s: { value: string }) => s.value),
    contact: member.contact ? {
      email: member.contact.email || undefined,
      phone: member.contact.phone || undefined,
      linkedinLabel: member.contact.linkedinLabel || undefined,
      linkedinUrl: member.contact.linkedinUrl || undefined,
    } : undefined,
    experience: [
      ...(member.experience || []).map((e: {
        title: string;
        organization: string;
        period: string;
        duration?: string | null;
        highlights?: { value: string }[] | null;
      }) => ({
        title: e.title,
        organization: e.organization,
        period: e.period,
        duration: e.duration || undefined,
        highlights: (e.highlights || []).map((h) => h.value),
      })),
      ...(member.relatedPortfolio || []).map((p: any) => {
        if (typeof p !== 'object' || p === null) return null;
        return {
          title: p.title,
          organization: p.client || 'Project',
          period: 'Portfolio Work',
          highlights: p.description ? [p.description] : [],
        };
      }).filter(Boolean)
    ],
    skillGroups: [
      ...(member.skillGroups || []).map((g: {
        label: string;
        items?: { value: string }[] | null;
      }) => ({
        label: g.label,
        items: (g.items || []).map((i) => i.value),
      })),
      ...Object.entries(
        (member.relatedTechStack || []).reduce((acc: any, t: any) => {
          if (typeof t === 'object' && t !== null) {
            const cat = t.category || 'General';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(t.name);
          }
          return acc;
        }, {})
      ).map(([label, items]) => ({
        label,
        items: items as string[],
      }))
    ],
  };

  return <Profile member={memberData} />;
}
