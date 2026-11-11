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
  it("expands the shredded-beef filling into beef, onion and garlic", () => {
    // 100 beef empanadas × 0.05 kg filling = 5 kg filling → 4 kg beef, 0.1 kg garlic
    const needs = ingredientNeeds(DEMO_PRODUCTS, { beef: 100 });
    expect(needs.find((n) => n.ingredient === "beef")?.qty).toBe(4);
    expect(needs.find((n) => n.ingredient === "garlic")?.qty).toBe(0.1);
  });
  it("sums dough flour across all empanadas", () => {
    // (10 + 10) × 0.06 kg dough × 0.6 kg flour = 0.72 kg
    const needs = ingredientNeeds(DEMO_PRODUCTS, { beef: 10, cheese: 10 });
    expect(needs.find((n) => n.ingredient === "flour")?.qty).toBe(0.72);
    expect(needs.find((n) => n.ingredient === "chicken")).toBeUndefined();
  });
});
