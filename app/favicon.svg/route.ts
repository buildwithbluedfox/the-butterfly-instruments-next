export async function GET() {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="The Butterfly Instruments favicon">
  <rect width="64" height="64" rx="14" fill="#131313" />
  <path d="M22 18 C11 12, 7 25, 18 32 C10 34, 12 47, 24 47 C31 47, 36 41, 36 34 C36 27, 31 21, 22 18 Z" fill="#f4d58d" />
  <path d="M42 18 C53 12, 57 25, 46 32 C54 34, 52 47, 40 47 C33 47, 28 41, 28 34 C28 27, 33 21, 42 18 Z" fill="#f97316" />
</svg>`;

	return new Response(svg, {
		headers: {
			'Content-Type': 'image/svg+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
}
