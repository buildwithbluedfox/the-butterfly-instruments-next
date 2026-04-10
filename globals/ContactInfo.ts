import type { GlobalConfig } from 'payload';

export const ContactInfo: GlobalConfig = {
	slug: 'contact-info',
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
		{
			name: 'email',
			type: 'email',
			required: true,
		},
		{
			name: 'location',
			type: 'text',
			required: true,
		},
		{
			name: 'services',
			type: 'array',
			fields: [
				{
					name: 'value',
					type: 'text',
					required: true,
				},
			],
			admin: {
				description: 'Services shown in the contact form dropdown',
			},
		},
	],
};
