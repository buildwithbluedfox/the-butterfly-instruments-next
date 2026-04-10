import type { GlobalConfig } from 'payload';

export const Footer: GlobalConfig = {
	slug: 'footer',
	fields: [
		{
			name: 'links',
			type: 'array',
			fields: [
				{
					name: 'value',
					type: 'text',
					required: true,
				},
			],
		},
		{
			name: 'copyright',
			type: 'text',
			required: true,
		},
	],
};
