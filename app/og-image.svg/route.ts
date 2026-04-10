import { NextRequest } from 'next/server';
import metadata from '@/metadata.json';
import { truncateText } from '@/lib/seo';

function escapeXml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function splitLines(value: string, maxCharsPerLine: number, maxLines: number) {
	const words = value.split(/\s+/).filter(Boolean);
	const lines: string[] = [];
	let currentLine = '';

	for (const word of words) {
		const nextLine = currentLine ? `${currentLine} ${word}` : word;

		if (nextLine.length <= maxCharsPerLine || !currentLine) {
			currentLine = nextLine;
			continue;
		}

		lines.push(currentLine);
		currentLine = word;

		if (lines.length === maxLines - 1) {
			break;
		}
	}

	if (lines.length < maxLines && currentLine) {
		lines.push(currentLine);
	}

	return lines.slice(0, maxLines).map((line, index, array) => {
		if (index === array.length - 1) {
			return escapeXml(truncateText(line, maxCharsPerLine));
		}

		return escapeXml(line);
	});
}

export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const title = truncateText(url.searchParams.get('title') || metadata.name, 72);
	const subtitle = truncateText(url.searchParams.get('subtitle') || metadata.description, 150);
	const escapedName = escapeXml(metadata.name);
	const titleLines = splitLines(title, 22, 2);
	const subtitleLines = splitLines(subtitle, 52, 2);
	const titleMarkup = titleLines
		.map(
			(line, index) =>
				`<text x="72" y="${372 + index * 78}" fill="#ffffff" font-size="72" font-family="Georgia, Times New Roman, serif" font-weight="700">${line}</text>`
		)
		.join('');
	const subtitleStartY = 372 + titleLines.length * 78 + 10;
	const subtitleMarkup = subtitleLines
		.map(
			(line, index) =>
				`<text x="72" y="${subtitleStartY + index * 38}" fill="#d1d5db" font-size="32" font-family="Arial, Helvetica, sans-serif">${line}</text>`
		)
		.join('');
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)}</title>
  <desc id="desc">${escapeXml(subtitle)}</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#111827" />
      <stop offset="100%" stop-color="#1f2937" />
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f4d58d" />
      <stop offset="100%" stop-color="#f97316" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" rx="32" />
  <circle cx="1030" cy="120" r="92" fill="rgba(244,213,141,0.16)" />
  <circle cx="1160" cy="540" r="148" fill="rgba(249,115,22,0.18)" />
  <rect x="72" y="72" width="180" height="64" rx="32" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" />
  <text x="106" y="113" fill="#f4d58d" font-size="26" font-family="Arial, Helvetica, sans-serif" font-weight="700">BUTTERFLY</text>
  <path d="M106 176 C60 140, 24 200, 96 238 C48 234, 46 298, 112 298 C152 298, 180 266, 180 226 C180 192, 156 170, 106 176 Z" fill="url(#accent)" opacity="0.92" />
  <path d="M182 176 C228 140, 264 200, 192 238 C240 234, 242 298, 176 298 C136 298, 108 266, 108 226 C108 192, 132 170, 182 176 Z" fill="url(#accent)" opacity="0.72" />
  ${titleMarkup}
  ${subtitleMarkup}
  <text x="72" y="566" fill="#f8fafc" font-size="26" font-family="Arial, Helvetica, sans-serif">${escapedName}  /  Senior engineers. Production-ready systems.</text>
</svg>`;

	return new Response(svg, {
		headers: {
			'Content-Type': 'image/svg+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=3600',
		},
	});
}
