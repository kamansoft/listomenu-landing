import { describe, expect, it, vi } from "vitest";

describe("centralized contact configuration", () => {
  it("updates phone display, mobile/desktop links and email from one configuration", async () => {
    vi.resetModules();
    vi.doMock("./site-config", () => ({ SITE_CONFIG: {
      contact: { whatsapp: "+1 202 555 0100", email: "changed@example.com" },
    } }));
    try {
      const contact = await import("./contact");
      expect(contact.WHATSAPP_DISPLAY).toBe("+1 202 555 0100");
      expect(contact.whatsappUrl("Hi", true)).toBe("https://wa.me/12025550100?text=Hi");
      expect(contact.whatsappUrl("Hi", false)).toBe("https://web.whatsapp.com/send?phone=12025550100&text=Hi");
      expect(contact.CONTACT_EMAIL).toBe("changed@example.com");
      expect(contact.mailtoUrl("Hello", "Test")).toBe("mailto:changed@example.com?subject=Hello&body=Test");
    } finally {
      vi.doUnmock("./site-config");
      vi.resetModules();
    }
  });
});
describe("offer configuration", () => {
  it("sets Emprendedor to 30,000 COP and 10 USD monthly", async () => {
    const { SITE_CONFIG } = await import("./site-config");
    expect(SITE_CONFIG.plans.entrepreneur.monthlyCop).toBe(30000);
    expect(SITE_CONFIG.plans.entrepreneur.monthlyUsd).toBe(10);
  });
  it("sets Negocio to 150,000 COP and 50 USD monthly", async () => {
    const { SITE_CONFIG } = await import("./site-config");
    expect(SITE_CONFIG.plans.business.monthlyCop).toBe(150000);
    expect(SITE_CONFIG.plans.business.monthlyUsd).toBe(50);
  });
  it("sets Enterprise starting prices to 500,000 COP and 200 USD monthly", async () => {
    const { SITE_CONFIG } = await import("./site-config");
    expect(SITE_CONFIG.plans.enterprise.monthlyCop).toBe(500000);
    expect(SITE_CONFIG.plans.enterprise.monthlyUsd).toBe(200);
    expect(SITE_CONFIG.plans.enterprise.startingPrice).toBe(true);
    expect(SITE_CONFIG.plans.entrepreneur.startingPrice).toBe(false);
    expect(SITE_CONFIG.plans.business.startingPrice).toBe(false);
  });
  it("requires a call for Enterprise only and removes Pro", async () => {
    const { SITE_CONFIG } = await import("./site-config");
    expect(SITE_CONFIG.plans.enterprise.requiresCall).toBe(true);
    expect(SITE_CONFIG.plans.entrepreneur.requiresCall).toBe(false);
    expect(SITE_CONFIG.plans.business.requiresCall).toBe(false);
    expect(Object.keys(SITE_CONFIG.plans)).toEqual(["entrepreneur", "business", "enterprise"]);
  });
  it("defines demo limits: 1 user, 10 inventory items, 2 products, 2 recipes", async () => {
    const { SITE_CONFIG } = await import("./site-config");
    expect(SITE_CONFIG.demo).toEqual({ users: 1, inventoryItems: 10, products: 2, recipes: 2 });
  });
  it("uses the real contact email", async () => {
    const { SITE_CONFIG } = await import("./site-config");
    expect(SITE_CONFIG.contact.email).toBe("kamansoft@gmail.com");
  });
  it("tags WhatsApp messages with their section", async () => {
    const { withSource } = await import("./contact");
    expect(withSource("Hola", "Ref", "hero")).toBe("Hola\n\n(Ref: hero)");
  });
});
