import { NextResponse } from 'next/server';
import { getPayload } from '@/lib/payload';

function getString(value: unknown, maxLength: number) {
	return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function isValidEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
	let body: unknown;

	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
	}

	const payload = body as Record<string, unknown>;
	const name = getString(payload.name, 120);
	const email = getString(payload.email, 160).toLowerCase();
	const service = getString(payload.service, 120);
	const details = getString(payload.details, 4000);

	if (!name || !email || !service || !details) {
		return NextResponse.json({ error: 'All form fields are required.' }, { status: 400 });
	}

	if (!isValidEmail(email)) {
		return NextResponse.json({ error: 'Enter a valid work email address.' }, { status: 400 });
	}

	const payloadClient = await getPayload();

	await payloadClient.create({
		collection: 'contact-submissions',
		data: {
			name,
			email,
			service,
			details,
		},
	});

	return NextResponse.json({ success: true }, { status: 201 });
}
