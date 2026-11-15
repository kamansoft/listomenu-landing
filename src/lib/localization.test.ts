import { describe, expect, it } from "vitest";
import { countryCurrency, countryLanguage, formatPlanPrice, parseCountryTrace } from "./localization";

describe("visitor country rules", () => {
  it("always selects Spanish for Colombia", () => expect(countryLanguage("CO")).toBe("es"));
  it("uses COP only for Colombia", () => expect(countryCurrency("CO")).toBe("COP"));
  it.each(["VE", "PE", "MX", "ES", "AR", "GQ", "PR"])("selects Spanish for %s", (country) => {
    expect(countryLanguage(country)).toBe("es");
  });
  it.each(["US", "BR", "GB", "FR", "SE"])("selects English for %s", (country) => {
    expect(countryLanguage(country)).toBe("en");
  });
  it.each(["VE", "PE", "ES", "US", "BR"])("uses USD outside Colombia: %s", (country) => {
    expect(countryCurrency(country)).toBe("USD");
  });
  it("does not assume an unknown visitor is Colombian", () => expect(countryCurrency(null)).toBeNull());
  it("reads the country without retaining IP details", () => {
    expect(parseCountryTrace("fl=123\nloc=CO\ntls=TLSv1.3\n")).toBe("CO");
    expect(parseCountryTrace("loc=XX\n")).toBeNull();
  });
});

describe("fixed plan prices", () => {
  const plan = { monthlyUsd: 14.90, monthlyCop: 59900 };
  it("shows the preloaded COP price for Colombia", () => {
    expect(formatPlanPrice(plan, "COP", "es").replace(/\D/g, "")).toBe("59900");
  });
  it("shows the preloaded USD price elsewhere", () => {
    expect(Number(formatPlanPrice(plan, "USD", "en").replace(/[^0-9.]/g, ""))).toBe(14.90);
  });
});