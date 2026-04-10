import type { CollectionConfig } from 'payload';

export const Portfolio: CollectionConfig = {
	slug: 'portfolio',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'client'],
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		{
			name: 'client',
			type: 'text',
			required: true,
		},
		{
			name: 'description',
			type: 'textarea',
			required: true,
		},
		{
			name: 'tags',
			type: 'array',
			fields: [
				{ name: 'value', type: 'text', required: true },
			],
		},
		{
			name: 'image',
			type: 'text',
			admin: {
				description: 'Image URL for the project',
			},
		},
		{
			name: 'sortOrder',
			type: 'number',
			defaultValue: 0,
		},
	],
};
