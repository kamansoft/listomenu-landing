import { describe, expect, it } from "vitest";
import { countryCurrency, countryLanguage, convertUsdToCop, formatPlanPrice, parseCountryTrace } from "./localization";

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

describe("USD to COP conversion", () => {
  it("converts USD base prices to Colombian pesos", () => {
    expect(convertUsdToCop(14.90, 4000)).toBe(59600);
    expect(convertUsdToCop(27.04, 4000)).toBe(108160);
    expect(convertUsdToCop(45.30, 4000)).toBe(181200);
  });
  it("rounds COP to whole pesos", () => expect(convertUsdToCop(14.90, 3285.261046)).toBe(48950));
  it("keeps USD available unchanged without an exchange rate", () => {
    const displayed = formatPlanPrice(14.90, "USD", "en");
    expect(Number(displayed?.replace(/[^0-9.]/g, ""))).toBe(14.90);
  });
  it("never relabels USD when the COP rate is unavailable", () => expect(formatPlanPrice(14.90, "COP", "es")).toBeNull());
  it("rejects invalid rates", () => expect(() => convertUsdToCop(14.90, 0)).toThrow());
});