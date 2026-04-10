import path from 'path';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { TeamMembers } from './collections/TeamMembers';
import { Services } from './collections/Services';
import { Portfolio } from './collections/Portfolio';
import { Testimonials } from './collections/Testimonials';
import { TechStack } from './collections/TechStack';
import { ContactSubmissions } from './collections/ContactSubmissions';

import { SiteSettings } from './globals/SiteSettings';
import { Hero } from './globals/Hero';
import { About } from './globals/About';
import { Philosophy } from './globals/Philosophy';
import { ContactInfo } from './globals/ContactInfo';
import { Footer } from './globals/Footer';
import { TestimonialsSection } from './globals/TestimonialsSection';

export default buildConfig({
	editor: lexicalEditor(),
	collections: [
		Users,
		TeamMembers,
		Services,
		Portfolio,
		Testimonials,
		TechStack,
		ContactSubmissions,
	],
	globals: [
		SiteSettings,
		Hero,
		About,
		Philosophy,
		ContactInfo,
		Footer,
		TestimonialsSection,
	],
	secret: process.env.PAYLOAD_SECRET || 'CHANGE_ME_IN_PRODUCTION',
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || '',
		},
	}),
	sharp,
	typescript: {
		outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
	},
});
