import metadata from '../metadata.json';
import type { TeamMemberData, ServiceData, PortfolioData, TechStackData } from './types';

export type StructuredDataNode = Record<string, unknown>;

export interface BreadcrumbItem {
	name: string;
	path: string;
}

const SITE_LANGUAGE = 'en';
const DEFAULT_CATEGORY = typeof metadata.category === 'string' ? metadata.category : 'Software Development Agency';

export const DEFAULT_LOCALE = typeof metadata.locale === 'string' ? metadata.locale : 'en_US';
export const DEFAULT_THEME_COLOR = typeof metadata.themeColor === 'string' ? metadata.themeColor : '#131313';
export const DEFAULT_SOCIAL_IMAGE_ALT =
	typeof metadata.socialImage?.alt === 'string'
		? metadata.socialImage.alt
		: `${metadata.name} social preview`;
export const DEFAULT_SOCIAL_IMAGE_WIDTH =
	typeof metadata.socialImage?.width === 'number' ? metadata.socialImage.width : 1200;
export const DEFAULT_SOCIAL_IMAGE_HEIGHT =
	typeof metadata.socialImage?.height === 'number' ? metadata.socialImage.height : 630;
export const DEFAULT_SOCIAL_IMAGE_TYPE =
	typeof metadata.socialImage?.type === 'string' ? metadata.socialImage.type : 'image/svg+xml';

function uniqueStrings(values: string[]) {
	return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

export function truncateText(value: string, maxLength: number) {
	const normalized = value.replace(/\s+/g, ' ').trim();

	if (normalized.length <= maxLength) {
		return normalized;
	}

	const slice = normalized.slice(0, maxLength - 3);
	const lastSpace = slice.lastIndexOf(' ');
	return `${(lastSpace > 48 ? slice.slice(0, lastSpace) : slice).trim()}...`;
}

export function resolveSiteUrl(fallbackOrigin: string) {
	const preferredUrl = (process.env.APP_URL ?? '').trim() || fallbackOrigin;

	try {
		return new URL(preferredUrl).toString();
	} catch {
		return new URL(fallbackOrigin).toString();
	}
}

export function resolveAbsoluteUrl(value: string, siteUrl: string) {
	return new URL(value, siteUrl).toString();
}

export function getDefaultSeoKeywords(
	siteName: string,
	siteTagline: string,
	services: ServiceData[],
	techStack: TechStackData[]
) {
	const metadataKeywords = Array.isArray(metadata.keywords)
		? metadata.keywords.filter((keyword): keyword is string => typeof keyword === 'string')
		: [];
	const serviceKeywords = services.map((service) => service.title);
	const techKeywords = techStack.flatMap((item) => item.name.split('/').map((name) => name.trim()));

	return uniqueStrings([
		...metadataKeywords,
		siteName,
		siteTagline,
		DEFAULT_CATEGORY,
		...serviceKeywords,
		...techKeywords,
	]).slice(0, 18);
}

export function createSeoImageUrl(siteUrl: string, title: string, subtitle: string) {
	const searchParams = new URLSearchParams({
		title: truncateText(title, 72),
		subtitle: truncateText(subtitle, 150),
	});

	return new URL(`/og-image.svg?${searchParams.toString()}`, siteUrl).toString();
}

export function buildBreadcrumbStructuredData(siteUrl: string, items: BreadcrumbItem[]): StructuredDataNode {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: resolveAbsoluteUrl(item.path, siteUrl),
		})),
	};
}

export function buildHomeStructuredData(
	siteName: string,
	contactEmail: string,
	services: ServiceData[],
	portfolio: PortfolioData[],
	siteUrl: string,
	pageUrl: string,
	imageUrl: string,
): StructuredDataNode[] {
	const organizationId = `${siteUrl}#organization`;
	const logoUrl = resolveAbsoluteUrl('/favicon.svg', siteUrl);

	return [
		{
			'@context': 'https://schema.org',
			'@type': 'Organization',
			'@id': organizationId,
			name: siteName,
			description: truncateText(metadata.description, 160),
			url: siteUrl,
			email: contactEmail,
			logo: logoUrl,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'ProfessionalService',
			'@id': `${siteUrl}#service`,
			name: siteName,
			category: DEFAULT_CATEGORY,
			description: truncateText(metadata.description, 160),
			url: pageUrl,
			image: imageUrl,
			email: contactEmail,
			areaServed: 'Worldwide',
			availableLanguage: [SITE_LANGUAGE],
			makesOffer: services.map((service) => ({
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: service.title,
					description: truncateText(service.description, 180),
				},
			})),
			contactPoint: {
				'@type': 'ContactPoint',
				contactType: 'sales',
				email: contactEmail,
				availableLanguage: [SITE_LANGUAGE],
				areaServed: 'Worldwide',
			},
		},
		{
			'@context': 'https://schema.org',
			'@type': 'ItemList',
			name: 'Selected work',
			itemListElement: portfolio.map((project, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				item: {
					'@type': 'CreativeWork',
					name: project.title,
					description: truncateText(project.description, 180),
					keywords: project.tags.join(', '),
				},
			})),
		},
	];
}

export function buildProfileStructuredData(
	siteName: string,
	member: TeamMemberData,
	siteUrl: string,
	pageUrl: string,
): StructuredDataNode[] {
	const personId = `${pageUrl}#person`;
	const knowledgeAreas = [
		...member.specialties,
		...(member.skillGroups?.flatMap((group) => group.items) ?? []),
	].filter(Boolean);

	return [
		buildBreadcrumbStructuredData(siteUrl, [
			{ name: siteName, path: '/' },
			{ name: member.name, path: `/team/${member.slug}` },
		]),
		{
			'@context': 'https://schema.org',
			'@type': 'ProfilePage',
			'@id': `${pageUrl}#profile`,
			url: pageUrl,
			name: `${member.name} | ${siteName}`,
			description: truncateText(`${member.role}. ${member.bio}`, 180),
			isPartOf: { '@id': `${siteUrl}#website` },
			mainEntity: { '@id': personId },
		},
		{
			'@context': 'https://schema.org',
			'@type': 'Person',
			'@id': personId,
			name: member.name,
			jobTitle: member.role,
			description: truncateText(member.bio, 180),
			image: member.image,
			url: pageUrl,
			knowsAbout: knowledgeAreas,
			...(member.contact?.email ? { email: member.contact.email } : {}),
			...(member.contact?.phone ? { telephone: member.contact.phone } : {}),
			...(member.contact?.linkedinUrl ? { sameAs: [member.contact.linkedinUrl] } : {}),
			worksFor: {
				'@type': 'Organization',
				name: siteName,
			},
		},
	];
}
