import type { CollectionConfig } from 'payload';

export const Testimonials: CollectionConfig = {
	slug: 'testimonials',
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name', 'projectName', 'rating', 'publishOnWebsite'],
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'businessEmail',
			type: 'email',
		},
		{
			name: 'linkedinUrl',
			type: 'text',
		},
		{
			name: 'jobTitle',
			type: 'text',
			required: true,
		},
		{
			name: 'projectName',
			type: 'text',
			required: true,
		},
		{
			name: 'overallSatisfaction',
			type: 'text',
		},
		{
			name: 'standoutStrengths',
			type: 'array',
			fields: [
				{ name: 'value', type: 'text', required: true },
			],
		},
		{
			name: 'testimonial',
			type: 'textarea',
			required: true,
		},
		{
			name: 'rating',
			type: 'number',
			required: true,
			min: 1,
			max: 5,
			defaultValue: 5,
		},
		{
			name: 'publishOnWebsite',
			type: 'checkbox',
			defaultValue: true,
		},
		{
			name: 'sortOrder',
			type: 'number',
			defaultValue: 0,
		},
	],
};
