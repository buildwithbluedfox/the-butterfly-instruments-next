import { NextRequest } from 'next/server';

function slugToInitials(slug: string) {
	return slug
		.split('-')
		.filter(Boolean)
		.slice(0, 3)
		.map((segment) => segment.charAt(0).toUpperCase())
		.join('');
}

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> }
) {
	const { slug } = await params;
	const initials = slugToInitials(slug || 'team');
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000" role="img" aria-label="${initials} portrait placeholder">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1f2937" />
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f4d58d" />
      <stop offset="100%" stop-color="#f97316" />
    </linearGradient>
  </defs>
  <rect width="800" height="1000" rx="48" fill="url(#bg)" />
  <circle cx="640" cy="180" r="120" fill="rgba(249,115,22,0.16)" />
  <circle cx="170" cy="860" r="160" fill="rgba(244,213,141,0.12)" />
  <circle cx="400" cy="330" r="170" fill="rgba(255,255,255,0.07)" />
  <circle cx="400" cy="300" r="110" fill="rgba(255,255,255,0.12)" />
  <path d="M225 700c28-138 116-206 175-206s147 68 175 206" fill="rgba(255,255,255,0.12)" />
  <text x="400" y="860" text-anchor="middle" fill="url(#accent)" font-size="152" font-family="Georgia, Times New Roman, serif" font-weight="700">${initials}</text>
</svg>`;

	return new Response(svg, {
		headers: {
			'Content-Type': 'image/svg+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
}
