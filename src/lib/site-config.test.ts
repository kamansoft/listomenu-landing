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