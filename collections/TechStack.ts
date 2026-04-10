import type { CollectionConfig } from 'payload';

export const TechStack: CollectionConfig = {
	slug: 'tech-stack',
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name', 'category'],
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'description',
			type: 'textarea',
			required: true,
		},
		{
			name: 'category',
			type: 'select',
			required: true,
			options: [
				{ label: 'Frontend', value: 'Frontend' },
				{ label: 'Backend', value: 'Backend' },
				{ label: 'Database', value: 'Database' },
				{ label: 'Infrastructure', value: 'Infrastructure' },
			],
		},
		{
			name: 'sortOrder',
			type: 'number',
			defaultValue: 0,
		},
	],
};
