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
  plans: {
    entrepreneur: { monthlyUsd: 10, monthlyCop: 30000, startingPrice: false, requiresCall: false },
    business: { monthlyUsd: 50, monthlyCop: 150000, startingPrice: false, requiresCall: false },
    enterprise: { monthlyUsd: 200, monthlyCop: 500000, startingPrice: true, requiresCall: true },
  },
} as const;

export type PlanKey = keyof typeof SITE_CONFIG.plans;
