import type { ContactFormPayload } from './contact-mailer.js';

const SUPABASE_URL = process.env['SUPABASE_URL'];
const SUPABASE_KEY = process.env['SUPABASE_KEY'] ?? process.env['SUPABASE_SERVICE_ROLE_KEY'];

function assertConfigured(): void {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('SUPABASE_URL / SUPABASE_KEY env vars are not set.');
  }
}

export async function storeContactSubmission(record: ContactFormPayload): Promise<void> {
  assertConfigured();

  const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_KEY as string,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      name: record.name,
      phone: record.phone,
      email: record.email,
      message: record.message || null,
    }),
  });

  if (!res.ok) {
    throw new Error(`Supabase insert failed: ${res.status} ${await res.text()}`);
  }
}
