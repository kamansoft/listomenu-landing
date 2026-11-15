// Public site settings. Update each price, limit or contact detail here only.
export const SITE_CONFIG = {
  contact: {
    whatsapp: "+57 313 808 9642",
    email: "kamansoft@gmail.com",
  },
  company: {
    name: "kamansoft.com",
    url: "https://kamansoft.com",
  },
  // Demo account (not a plan): no time limit, limited capacity.
  demo: { users: 1, inventoryItems: 10, products: 2, recipes: 2 },
  // Fixed preloaded prices per currency: Colombia sees COP, everyone else USD.
  // Proposed values pending owner confirmation.
  plans: {
    entrepreneur: { monthlyUsd: 14.90, monthlyCop: 59900 },
    business: { monthlyUsd: 27.04, monthlyCop: 109900 },
    pro: { monthlyUsd: 45.30, monthlyCop: 179900 },
  },
} as const;

export type PlanKey = keyof typeof SITE_CONFIG.plans;
