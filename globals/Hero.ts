import type { GlobalConfig } from 'payload';

export const Hero: GlobalConfig = {
	slug: 'hero',
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
			admin: {
				description: 'Text that appears highlighted/italic in the headline',
			},
		},
		{
			name: 'subheadline',
			type: 'textarea',
			required: true,
		},
		{
			name: 'ctaPrimary',
			type: 'text',
			required: true,
			defaultValue: 'Start a Project',
		},
		{
			name: 'ctaSecondary',
			type: 'text',
			required: true,
			defaultValue: 'View Our Work',
		},
	],
};
