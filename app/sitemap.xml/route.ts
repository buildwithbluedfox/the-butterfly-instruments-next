import { resolveSiteUrl } from '@/lib/seo';
import { getPayload } from '@/lib/payload';

function escapeXml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export async function GET() {
	const siteUrl = resolveSiteUrl(process.env.APP_URL || 'https://butterflyinstruments.com');
	const payload = await getPayload();

	const teamResult = await payload.find({
		collection: 'team-members',
		sort: 'sortOrder',
		limit: 100,
	});

	const lastModified = new Date().toISOString();
	const routes = [
		{ path: '/', changefreq: 'weekly', priority: '1.0' },
		...teamResult.docs.map((member) => ({
			path: `/team/${member.slug}`,
			changefreq: 'monthly',
			priority: '0.7',
		})),
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
			.map(
				(route) => `  <url>
    <loc>${escapeXml(new URL(route.path, siteUrl).toString())}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
			)
			.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
}
