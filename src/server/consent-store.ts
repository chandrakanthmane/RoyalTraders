const SUPABASE_URL = process.env['SUPABASE_URL'];
const SUPABASE_KEY = process.env['SUPABASE_KEY'] ?? process.env['SUPABASE_SERVICE_ROLE_KEY'];

const STATUSES = ['accepted', 'rejected', 'partial'] as const;
type ConsentStatus = (typeof STATUSES)[number];

export interface ConsentPayload {
  visitorId: string;
  status: ConsentStatus;
  categories: Record<string, boolean>;
  policyVersion: string;
  userAgent?: string;
  pageUrl?: string;
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function validateConsentPayload(
  body: unknown
): { valid: true; data: ConsentPayload } | { valid: false; error: string } {
  if (typeof body !== 'object' || body === null) {
    return { valid: false, error: 'Invalid request body.' };
  }

  const { visitorId, status, categories, policyVersion, userAgent, pageUrl } = body as Record<
    string,
    unknown
  >;

  if (typeof visitorId !== 'string' || !UUID_PATTERN.test(visitorId)) {
    return { valid: false, error: 'Invalid visitor id.' };
  }
  if (typeof status !== 'string' || !STATUSES.includes(status as ConsentStatus)) {
    return { valid: false, error: 'Invalid status.' };
  }
  if (typeof categories !== 'object' || categories === null || Array.isArray(categories)) {
    return { valid: false, error: 'Invalid categories.' };
  }

  const normalizedCategories: Record<string, boolean> = {};
  for (const [key, value] of Object.entries(categories)) {
    if (typeof value !== 'boolean') {
      return { valid: false, error: 'Invalid category value.' };
    }
    normalizedCategories[key] = value;
  }

  if (typeof policyVersion !== 'string' || policyVersion.length === 0 || policyVersion.length > 40) {
    return { valid: false, error: 'Invalid policy version.' };
  }

  return {
    valid: true,
    data: {
      visitorId,
      status: status as ConsentStatus,
      categories: normalizedCategories,
      policyVersion,
      userAgent: typeof userAgent === 'string' ? userAgent.slice(0, 400) : undefined,
      pageUrl: typeof pageUrl === 'string' ? pageUrl.slice(0, 300) : undefined,
    },
  };
}

function assertConfigured(): void {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('SUPABASE_URL / SUPABASE_KEY env vars are not set.');
  }
}

export async function storeConsent(record: ConsentPayload): Promise<void> {
  assertConfigured();

  const res = await fetch(`${SUPABASE_URL}/rest/v1/cookie_consents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_KEY as string,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      visitor_id: record.visitorId,
      status: record.status,
      categories: record.categories,
      policy_version: record.policyVersion,
      user_agent: record.userAgent ?? null,
      page_url: record.pageUrl ?? null,
    }),
  });

  if (!res.ok) {
    throw new Error(`Supabase insert failed: ${res.status} ${await res.text()}`);
  }
}

export async function fetchCookieConfig(): Promise<unknown> {
  assertConfigured();

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/cookie_config?id=eq.active&select=policy_version,banner,categories`,
    {
      headers: {
        apikey: SUPABASE_KEY as string,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Supabase config fetch failed: ${res.status} ${await res.text()}`);
  }

  const rows = (await res.json()) as unknown[];
  return rows[0] ?? null;
}
