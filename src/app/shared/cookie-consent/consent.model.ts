export interface CookieCategory {
  key: string;
  label: string;
  description: string;
  required: boolean;
  defaultEnabled: boolean;
}

export interface CookieConfig {
  policyVersion: string;
  banner: {
    title: string;
    body: string;
    acceptLabel: string;
    rejectLabel: string;
    manageLabel: string;
  };
  categories: CookieCategory[];
}

export type ConsentStatus = 'accepted' | 'rejected' | 'partial';

export interface StoredConsent {
  status: ConsentStatus;
  categories: Record<string, boolean>;
  policyVersion: string;
  updatedAt: string;
}

/** Shape returned by GET /api/consent (Supabase column names). */
export interface CookieConfigResponse {
  ok: boolean;
  config: {
    policy_version: string;
    banner: CookieConfig['banner'];
    categories: CookieConfig['categories'];
  } | null;
}

/** Used when the API / Supabase is unreachable — the banner must always work. */
export const FALLBACK_CONFIG: CookieConfig = {
  policyVersion: 'fallback',
  banner: {
    title: 'We value your privacy',
    body: 'We use cookies to run essential site features, understand how visitors use our site, and improve our content. Choose to accept all, reject non-essential cookies, or manage your preferences.',
    acceptLabel: 'Accept all',
    rejectLabel: 'Reject all',
    manageLabel: 'Manage preferences',
  },
  categories: [
    {
      key: 'necessary',
      label: 'Necessary',
      description:
        'Required for core site functionality such as navigation and security. These cannot be disabled.',
      required: true,
      defaultEnabled: true,
    },
    {
      key: 'analytics',
      label: 'Analytics',
      description:
        'Helps us understand how visitors interact with our site so we can improve it.',
      required: false,
      defaultEnabled: true,
    },
    {
      key: 'marketing',
      label: 'Marketing',
      description:
        'Used to deliver relevant offers and measure the effectiveness of our campaigns.',
      required: false,
      defaultEnabled: true,
    },
  ],
};
