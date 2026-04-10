import type { GlobalConfig } from 'payload';

export const TestimonialsSection: GlobalConfig = {
	slug: 'testimonials-section',
	fields: [
		{
			name: 'headline',
			type: 'text',
			required: true,
		},
		{
			name: 'highlightedText',
			type: 'text',
			required: true,
		},
		{
			name: 'description',
			type: 'textarea',
			required: true,
		},
	],
};
