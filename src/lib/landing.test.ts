import { describe, expect, it } from "vitest";
import { whatsappUrl, isMobileUserAgent } from "./contact";
import { DEMO_PRODUCTS, ingredientNeeds } from "./production";

describe("whatsapp link", () => {
  it("desktop uses WhatsApp Web with the number and message", () => {
    expect(whatsappUrl("Hola listo", false)).toBe("https://web.whatsapp.com/send?phone=573138089642&text=Hola%20listo");
  });
  it("mobile uses wa.me", () => {
    expect(whatsappUrl("Hi", true)).toBe("https://wa.me/573138089642?text=Hi");
  });
  it("detects phones", () => {
    expect(isMobileUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)")).toBe(true);
    expect(isMobileUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)")).toBe(false);
  });
});

describe("production plan", () => {
  it("multiplies recipe amounts by planned units and sums shared ingredients", () => {
    const needs = ingredientNeeds(DEMO_PRODUCTS, { reina: 10, cheese: 5, empanada: 0 });
    expect(needs.find((n) => n.ingredient === "flour")?.qty).toBe(1.8);
    expect(needs.find((n) => n.ingredient === "cheese")?.qty).toBe(0.35);
    expect(needs.find((n) => n.ingredient === "beef")).toBeUndefined();
  });
});
