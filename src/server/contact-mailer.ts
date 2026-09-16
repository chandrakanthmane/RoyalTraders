import nodemailer from 'nodemailer';

export interface ContactFormPayload {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\-\s]{7,20}$/;

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

const SITE_URL = 'https://royaltradersindia.in';
const FONT_STACK = "'Poppins', Arial, Helvetica, sans-serif";
const BRAND_PRIMARY = '#551b1c';
const BRAND_PRIMARY_LIGHT = '#904a49';
const BRAND_TEXT = '#1a1c1b';
const BRAND_TEXT_MUTED = '#534342';
const BRAND_OUTLINE_VARIANT = '#e3e2e0';

const SOCIAL_ICONS: Record<string, string> = {
  facebook:
    'M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z',
  twitter:
    'M16 3.539a6.56 6.56 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.286 3.286 0 0 0 1.017 4.383A3.28 3.28 0 0 1 .64 6.575v.041a3.286 3.286 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 0 13.476 9.32 9.32 0 0 0 5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.142-.003-.283-.01-.423A6.685 6.685 0 0 0 16 3.539z',
  linkedin:
    'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z',
};

const CERTIFICATE_BADGES: Array<{ alt: string; src: string }> = [
  { alt: 'RCS Certification', src: 'images/optimized/footer-cert-rcs.webp' },
  { alt: 'QRO Certification', src: 'images/optimized/footer-cert-qro.webp' },
  { alt: 'Royal Assessment Certification', src: 'images/optimized/footer-cert-royal-assessment.webp' },
  { alt: 'Make in India', src: 'images/optimized/footer-cert-make-in-india.webp' },
  { alt: 'Startup India', src: 'images/optimized/footer-cert-startup-india.webp' },
  { alt: 'MSME Registration', src: 'images/optimized/footer-cert-msme.webp' },
];

function socialIconCell(platform: 'facebook' | 'twitter' | 'linkedin'): string {
  return `
    <td style="padding-bottom:6px;">
      <a href="#" style="display:block;" aria-label="${platform}">
        <svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path fill="${BRAND_PRIMARY}" d="${SOCIAL_ICONS[platform]}"/>
        </svg>
      </a>
    </td>`;
}

function contactRow(iconPath: string, label: string, href: string): string {
  return `
    <tr>
      <td style="padding:0 0 10px;" valign="top">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-right:10px;" valign="middle">
              <svg width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                <path d="${iconPath}" stroke="${BRAND_PRIMARY}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </td>
            <td style="font-family:${FONT_STACK};font-size:13px;color:${BRAND_TEXT};" valign="middle">
              <a href="${href}" style="color:${BRAND_TEXT};text-decoration:none;">${label}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function buildSignatureHtml(): string {
  const mailIconPath = 'M3 5.5A1.5 1.5 0 0 1 4.5 4h11A1.5 1.5 0 0 1 17 5.5v9A1.5 1.5 0 0 1 15.5 16h-11A1.5 1.5 0 0 1 3 14.5v-9Zm.5 0L10 10.5l6.5-5';
  const linkIconPath = 'M8 12a3 3 0 0 1 0-4.24l2-2a3 3 0 0 1 4.24 4.24l-1 1M12 8a3 3 0 0 1 0 4.24l-2 2a3 3 0 0 1-4.24-4.24l1-1';
  const phoneIconPath = 'M4 3h3l1.5 4L6.5 8.5a11 11 0 0 0 5 5L13 11.5l4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A15 15 0 0 1 2.5 4.6 1.5 1.5 0 0 1 4 3Z';
  const pinIconPath = 'M10 18s6-5.686 6-10a6 6 0 1 0-12 0c0 4.314 6 10 6 10Zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z';

  const contactRowsHtml = [
    contactRow(mailIconPath, 'info@royaltradersindia.in', 'mailto:info@royaltradersindia.in'),
    contactRow(linkIconPath, 'www.royaltradersindia.in', SITE_URL),
    contactRow(phoneIconPath, '+91-9910598500', 'tel:+919910598500'),
    contactRow(pinIconPath, 'Ghaziabad, Uttar Pradesh, India', 'https://www.google.com/maps/search/?api=1&query=Ghaziabad%2C%20Uttar%20Pradesh%2C%20India'),
  ].join('');

  const badgesHtml = CERTIFICATE_BADGES.map(
    (badge) => `
      <td style="padding-right:14px;">
        <img src="${SITE_URL}/${badge.src}" width="46" height="28" alt="${escapeHtml(badge.alt)}" style="display:block;border:0;object-fit:contain;" />
      </td>`,
  ).join('');

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;border-top:1px solid ${BRAND_OUTLINE_VARIANT};">
      <tr>
        <td style="padding-top:24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td valign="top" width="44%" style="padding-right:20px;">
                <div style="font-family:${FONT_STACK};font-size:32px;font-weight:700;line-height:1;color:${BRAND_PRIMARY};">
                  R<span style="font-size:13px;font-weight:700;vertical-align:super;">T</span>
                </div>
                <p style="margin:12px 0 2px;font-family:${FONT_STACK};font-size:17px;font-weight:700;color:${BRAND_PRIMARY};">Royal Traders</p>
                <p style="margin:0 0 10px;font-family:${FONT_STACK};font-size:12px;color:${BRAND_TEXT_MUTED};">Print | Packaging | Security Solutions</p>
                <p style="margin:0;font-family:${FONT_STACK};font-size:11px;color:${BRAND_TEXT_MUTED};">
                  <strong style="color:${BRAND_TEXT};">GSTIN:</strong> 09ASGPB9379M1Z0
                </p>
              </td>
              <td width="1" style="background-color:${BRAND_OUTLINE_VARIANT};font-size:0;line-height:0;">&nbsp;</td>
              <td valign="top" style="padding-left:20px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td valign="top">
                      <table role="presentation" cellpadding="0" cellspacing="0">${contactRowsHtml}</table>
                    </td>
                    <td valign="top" align="right" style="padding-left:16px;">
                      <table role="presentation" cellpadding="0" cellspacing="0">${socialIconCell('facebook')}${socialIconCell('twitter')}${socialIconCell('linkedin')}</table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding-top:18px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="70%" height="3" style="background-color:${BRAND_PRIMARY_LIGHT};font-size:0;line-height:0;">&nbsp;</td>
              <td height="3" style="background-color:${BRAND_PRIMARY};font-size:0;line-height:0;">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding-top:16px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>${badgesHtml}</tr></table>
        </td>
      </tr>
    </table>`;
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
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
    </head>
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
                  ${buildSignatureHtml()}
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
