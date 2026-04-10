import type { CollectionConfig } from 'payload';

export const ContactSubmissions: CollectionConfig = {
	slug: 'contact-submissions',
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name', 'email', 'service', 'createdAt', 'archivedAt'],
	},
	access: {
		create: () => true,
		read: ({ req }) => Boolean(req.user),
		update: ({ req }) => Boolean(req.user),
		delete: ({ req }) => Boolean(req.user),
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'email',
			type: 'email',
			required: true,
		},
		{
			name: 'service',
			type: 'text',
			required: true,
		},
		{
			name: 'details',
			type: 'textarea',
			required: true,
		},
		{
			name: 'archivedAt',
			type: 'date',
			admin: {
				description: 'Set to archive this submission',
			},
		},
	],
};
