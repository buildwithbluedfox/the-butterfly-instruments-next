import { resolveSiteUrl } from '@/lib/seo';

export async function GET() {
	const siteUrl = resolveSiteUrl(process.env.APP_URL || 'https://butterflyinstruments.com');
	const body = [
		'User-agent: *',
		'Allow: /',
		'Disallow: /admin',
		'Disallow: /api/',
		'',
		`Host: ${new URL(siteUrl).origin}`,
		`Sitemap: ${new URL('/sitemap.xml', siteUrl).toString()}`,
	].join('\n');

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
}
