/**
 * Shared TypeScript types for frontend components.
 * These describe the shape of data passed from server components
 * to client components, independent of the CMS/database layer.
 */

export interface HeroData {
	headline: string;
	highlightedText: string;
	subheadline: string;
	ctaPrimary: string;
	ctaSecondary: string;
}

export interface AboutData {
	label: string;
	title: string;
	highlightedTitle: string;
	description: string;
}

export interface ServiceData {
	id: string;
	title: string;
	description: string;
	icon: string;
}

export interface PortfolioData {
	title: string;
	client: string;
	description: string;
	tags: string[];
	image: string;
}

export interface TestimonialItemData {
	name: string;
	linkedinUrl: string;
	jobTitle: string;
	projectName: string;
	overallSatisfaction: string;
	standoutStrengths: string[];
	testimonial: string;
	rating: number;
}

export interface TestimonialsData {
	headline: string;
	highlightedText: string;
	description: string;
	items: TestimonialItemData[];
}

export interface TechStackData {
	name: string;
	description: string;
	category: string;
}

export interface TeamMemberData {
	slug: string;
	name: string;
	role: string;
	quote: string;
	image: string;
	bio: string;
	specialties: string[];
	contact?: {
		email?: string;
		phone?: string;
		linkedinLabel?: string;
		linkedinUrl?: string;
	};
	experience?: Array<{
		title: string;
		organization: string;
		period: string;
		duration?: string;
		highlights: string[];
	}>;
	skillGroups?: Array<{
		label: string;
		items: string[];
	}>;
}

export interface PhilosophyData {
	headline: string;
	highlightedText: string;
	description: string;
}

export interface ContactData {
	headline: string;
	highlightedText: string;
	description: string;
	email: string;
	location: string;
	services: string[];
}
