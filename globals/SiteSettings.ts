import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
	slug: 'site-settings',
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
			defaultValue: 'The Butterfly Instruments',
		},
		{
			name: 'tagline',
			type: 'text',
			required: true,
		},
	],
};
