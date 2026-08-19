import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendContactEmail, validateContactPayload } from '../src/server/contact-mailer.js';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const result = validateContactPayload(req.body);
  if (!result.valid) {
    res.status(400).json({ ok: false, error: result.error });
    return;
  }

  try {
    await sendContactEmail(result.data);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to send contact email', error);
    res.status(502).json({ ok: false, error: 'Unable to send your message right now. Please try again later.' });
  }
}
