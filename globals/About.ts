import type { GlobalConfig } from 'payload';

export const About: GlobalConfig = {
	slug: 'about',
	fields: [
		{
			name: 'label',
			type: 'text',
			required: true,
			defaultValue: 'Origin Story',
		},
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		{
			name: 'highlightedTitle',
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
