import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  validateConsentPayload,
  storeConsent,
  fetchCookieConfig,
} from '../src/server/consent-store.js';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  // GET -> dynamic banner config (text + categories + policy version)
  if (req.method === 'GET') {
    try {
      const config = await fetchCookieConfig();
      res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
      res.status(200).json({ ok: true, config });
    } catch (error) {
      console.error('Failed to load cookie config', error);
      res.status(502).json({ ok: false, error: 'Unable to load cookie config.' });
    }
    return;
  }

  // POST -> record a consent decision in the audit log
  if (req.method === 'POST') {
    const result = validateConsentPayload(req.body);
    if (!result.valid) {
      res.status(400).json({ ok: false, error: result.error });
      return;
    }

    try {
      await storeConsent(result.data);
      res.status(201).json({ ok: true });
    } catch (error) {
      console.error('Failed to store consent', error);
      res.status(502).json({ ok: false, error: 'Unable to store consent right now.' });
    }
    return;
  }

  res.setHeader('Allow', 'GET, POST');
  res.status(405).json({ ok: false, error: 'Method not allowed' });
}
