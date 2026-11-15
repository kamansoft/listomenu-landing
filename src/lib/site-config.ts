// Public site settings. Update each price or contact detail here only.
export const SITE_CONFIG = {
  contact: {
    whatsapp: "+57 313 808 9642",
    // Placeholder until the real address is provided.
    email: "hola@listo.menu",
  },
  company: {
    name: "kamansoft.com",
    url: "https://kamansoft.com",
  },
  // Reference prices retained from the previous USD display; not final prices.
  plans: {
    entrepreneur: { monthlyUsd: 14.90 },
    business: { monthlyUsd: 27.04 },
    pro: { monthlyUsd: 45.30 },
  },
} as const;