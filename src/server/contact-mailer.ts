import nodemailer from 'nodemailer';

export interface ContactFormPayload {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\-\s]{7,15}$/;

export function validateContactPayload(body: unknown): { valid: true; data: ContactFormPayload } | { valid: false; error: string } {
  if (typeof body !== 'object' || body === null) {
    return { valid: false, error: 'Invalid request body.' };
  }

  const { name, phone, email, message } = body as Record<string, unknown>;

  if (typeof name !== 'string' || name.trim().length < 2) {
    return { valid: false, error: 'Please enter a valid name.' };
  }
  if (typeof phone !== 'string' || !PHONE_PATTERN.test(phone.trim())) {
    return { valid: false, error: 'Please enter a valid phone number.' };
  }
  if (typeof email !== 'string' || !EMAIL_PATTERN.test(email.trim())) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  if (message !== undefined && typeof message !== 'string') {
    return { valid: false, error: 'Invalid message.' };
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      message: typeof message === 'string' ? message.trim() : '',
    },
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildContactEmailHtml(data: ContactFormPayload): string {
  const rows: Array<[string, string]> = [
    ['Name', data.name],
    ['Phone', data.phone],
    ['Email', data.email],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e3e2e0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#867372;width:120px;vertical-align:top;">${label}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e3e2e0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1a1c1b;vertical-align:top;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('');

  const messageHtml = data.message
    ? `<p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1a1c1b;white-space:pre-wrap;">${escapeHtml(data.message)}</p>`
    : `<p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#867372;font-style:italic;">No message provided.</p>`;

  return `
  <!doctype html>
  <html lang="en">
    <body style="margin:0;padding:0;background-color:#faf9f7;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf9f7;padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background-color:#ffffff;">
              <tr>
                <td style="background-color:#551b1c;padding:28px 32px;">
                  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#ffb3b1;">Royal Traders</p>
                  <h1 style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;color:#ffffff;">New Enquiry Received</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:32px;">
                  <p style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#534342;">
                    You've received a new message from the "Get in Touch" form on royaltradersindia.in.
                  </p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    ${rowsHtml}
                  </table>
                  <div style="margin-top:20px;">
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#867372;">Message</p>
                    ${messageHtml}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 32px;background-color:#f4f3f1;">
                  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#867372;">
                    This email was sent automatically from the contact form on royaltradersindia.in.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

let transporter: nodemailer.Transporter | undefined;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    const port = Number(process.env['SMTP_PORT'] ?? 587);
    transporter = nodemailer.createTransport({
      host: process.env['SMTP_HOST'],
      port,
      secure: port === 465,
      auth: {
        user: process.env['SMTP_USER'],
        pass: process.env['SMTP_PASS'],
      },
    });
  }
  return transporter;
}

export async function sendContactEmail(data: ContactFormPayload): Promise<void> {
  const mailTo = process.env['CONTACT_MAIL_TO'] || 'info@royaltradersindia.in';
  const mailFrom = process.env['SMTP_FROM'] || process.env['SMTP_USER'] || mailTo;

  await getTransporter().sendMail({
    from: `"Royal Traders Website" <${mailFrom}>`,
    to: mailTo,
    replyTo: `"${data.name}" <${data.email}>`,
    subject: `New enquiry from ${data.name} — Royal Traders website`,
    html: buildContactEmailHtml(data),
  });
}
