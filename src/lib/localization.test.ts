import { describe, expect, it } from "vitest";
import { countryCurrency, countryLanguage, convertCopToUsd, formatPlanPrice, parseCountryTrace } from "./localization";

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

describe("COP to USD conversion", () => {
  it("converts COP to USD rather than relabeling COP amounts", () => {
    expect(convertCopToUsd(49000, 0.00025)).toBe(12.25);
    expect(convertCopToUsd(89000, 0.00025)).toBe(22.25);
    expect(convertCopToUsd(149000, 0.00025)).toBe(37.25);
  });
  it("rounds USD to cents", () => expect(convertCopToUsd(49000, 0.000304)).toBe(14.9));
  it("keeps the Colombian base amount unchanged", () => {
    const displayed = formatPlanPrice(49000, "COP", "es");
    expect(Number(displayed?.replace(/[^0-9]/g, ""))).toBe(49000);
  });
  it("never shows COP in place of an unavailable USD conversion", () => expect(formatPlanPrice(49000, "USD", "en")).toBeNull());
  it("rejects invalid rates", () => expect(() => convertCopToUsd(49000, 0)).toThrow());
});