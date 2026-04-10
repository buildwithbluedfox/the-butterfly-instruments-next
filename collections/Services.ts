import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
	slug: 'services',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['serviceId', 'title', 'icon'],
	},
	fields: [
		{
			name: 'serviceId',
			type: 'text',
			required: true,
			admin: {
				description: 'Display ID shown on the card (e.g. "01")',
			},
		},
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		{
			name: 'description',
			type: 'textarea',
			required: true,
		},
		{
			name: 'icon',
			type: 'text',
			required: true,
			admin: {
				description: 'Lucide icon name (e.g. "Monitor", "Server", "Cloud")',
			},
		},
		{
			name: 'sortOrder',
			type: 'number',
			defaultValue: 0,
		},
	],
};
