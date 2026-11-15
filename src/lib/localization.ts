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

export function convertCopToUsd(cop: number, usdPerCop: number): number {
  if (!Number.isFinite(usdPerCop) || usdPerCop <= 0) throw new Error("Invalid exchange rate");
  return Math.round(cop * usdPerCop * 100) / 100;
}

export function formatPlanPrice(cop: number, currency: "COP" | "USD", lang: Lang, usdPerCop?: number): string | null {
  if (currency === "USD" && (!usdPerCop || !Number.isFinite(usdPerCop) || usdPerCop <= 0)) return null;
  const amount = currency === "COP" ? cop : convertCopToUsd(cop, usdPerCop ?? 0);
  return `${new Intl.NumberFormat(lang === "es" ? "es-CO" : "en-US", {
    style: "currency", currency, currencyDisplay: "narrowSymbol",
    minimumFractionDigits: currency === "COP" ? 0 : 2,
    maximumFractionDigits: currency === "COP" ? 0 : 2,
  }).format(amount)} ${currency}`;
}