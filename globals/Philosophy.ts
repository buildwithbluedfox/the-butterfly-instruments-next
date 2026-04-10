import type { GlobalConfig } from 'payload';

export const Philosophy: GlobalConfig = {
	slug: 'philosophy',
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
