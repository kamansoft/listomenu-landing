import type { Lang } from "./i18n";

const SPANISH_COUNTRIES = new Set([
  "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "ES", "GQ",
  "GT", "HN", "MX", "NI", "PA", "PE", "PR", "PY", "SV", "UY", "VE",
]);

export function countryLanguage(country: string | null): Lang {
  if (!country) return "es";
  return SPANISH_COUNTRIES.has(country.toUpperCase()) ? "es" : "en";
}

export function countryCurrency(country: string | null): "COP" | "USD" | null {
  if (!country) return null;
  return country.toUpperCase() === "CO" ? "COP" : "USD";
}

export function parseCountryTrace(trace: string): string | null {
  const country = /^loc=([A-Z]{2})$/m.exec(trace)?.[1];
  return country && country !== "XX" ? country : null;
}

export function convertUsdToCop(usd: number, copPerUsd: number): number {
  if (!Number.isFinite(copPerUsd) || copPerUsd <= 0) throw new Error("Invalid exchange rate");
  return Math.round(usd * copPerUsd);
}

export function formatPlanPrice(usd: number, currency: "COP" | "USD", lang: Lang, copPerUsd?: number): string | null {
  if (currency === "COP" && (!copPerUsd || !Number.isFinite(copPerUsd) || copPerUsd <= 0)) return null;
  const amount = currency === "USD" ? usd : convertUsdToCop(usd, copPerUsd ?? 0);
  return `${new Intl.NumberFormat(lang === "es" ? "es-CO" : "en-US", {
    style: "currency", currency, currencyDisplay: "narrowSymbol",
    minimumFractionDigits: currency === "COP" ? 0 : 2,
    maximumFractionDigits: currency === "COP" ? 0 : 2,
  }).format(amount)} ${currency}`;
}