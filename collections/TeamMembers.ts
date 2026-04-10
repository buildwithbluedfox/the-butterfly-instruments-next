import type { CollectionConfig } from 'payload';

export const TeamMembers: CollectionConfig = {
	slug: 'team-members',
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name', 'role', 'slug'],
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'slug',
			type: 'text',
			required: true,
			unique: true,
			admin: {
				description: 'URL-friendly identifier (e.g. "john-doe")',
			},
		},
		{
			name: 'role',
			type: 'text',
			required: true,
		},
		{
			name: 'quote',
			type: 'textarea',
		},
		{
			name: 'image',
			type: 'text',
			admin: {
				description: 'Image URL (external or local path)',
			},
		},
		{
			name: 'bio',
			type: 'textarea',
			required: true,
		},
		{
			name: 'specialties',
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
			name: 'contact',
			type: 'group',
			fields: [
				{ name: 'email', type: 'email' },
				{ name: 'phone', type: 'text' },
				{ name: 'linkedinLabel', type: 'text' },
				{ name: 'linkedinUrl', type: 'text' },
			],
		},
		{
			name: 'experience',
			type: 'array',
			admin: { hidden: true },
			fields: [
				{ name: 'title', type: 'text', required: true },
				{ name: 'organization', type: 'text', required: true },
				{ name: 'period', type: 'text', required: true },
				{ name: 'duration', type: 'text' },
				{
					name: 'highlights',
					type: 'array',
					fields: [
						{ name: 'value', type: 'text', required: true },
					],
				},
			],
		},
		{
			name: 'skillGroups',
			type: 'array',
			admin: { hidden: true },
			fields: [
				{ name: 'label', type: 'text', required: true },
				{
					name: 'items',
					type: 'array',
					fields: [
						{ name: 'value', type: 'text', required: true },
					],
				},
			],
		},
		{
			name: 'sortOrder',
			type: 'number',
			defaultValue: 0,
			admin: {
				description: 'Lower numbers appear first',
			},
		},
		{
			name: 'relatedPortfolio',
			type: 'relationship',
			relationTo: 'portfolio',
			hasMany: true,
			admin: {
				description: 'Select portfolio projects built by this team member',
			},
		},
		{
			name: 'relatedTechStack',
			type: 'relationship',
			relationTo: 'tech-stack',
			hasMany: true,
			admin: {
				description: 'Select tech stack items this team member uses',
			},
		},
	],
};
