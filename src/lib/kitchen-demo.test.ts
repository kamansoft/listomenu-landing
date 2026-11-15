import { describe, expect, it } from "vitest";
import { createKitchenCards, KITCHEN_DEMO_STEPS, moveKitchenCard } from "./kitchen-demo";

describe("kitchen card transitions", () => {
  const initial = createKitchenCards([["Order A", "Order B"], ["Order C"], ["Order D"]]);
  it("moves pending → preparation → ready", () => {
    const preparing = moveKitchenCard(initial, "0-0", 1);
    expect(preparing.find(card => card.id === "0-0")?.column).toBe(1);
    expect(moveKitchenCard(preparing, "0-0", 2).find(card => card.id === "0-0")?.column).toBe(2);
  });
  it("moves ready → preparation → pending", () => {
    const preparing = moveKitchenCard(initial, "2-0", 1);
    expect(preparing.find(card => card.id === "2-0")?.column).toBe(1);
    expect(moveKitchenCard(preparing, "2-0", 0).find(card => card.id === "2-0")?.column).toBe(0);
  });
  it("rejects skipped columns and out-of-range destinations", () => {
    expect(moveKitchenCard(initial, "0-0", 2)).toEqual(initial);
    expect(moveKitchenCard(initial, "0-0", -1)).toEqual(initial);
    expect(moveKitchenCard(initial, "2-0", 3)).toEqual(initial);
  });
  it("demo progresses and reverses in adjacent order without losing cards", () => {
    let cards = initial;
    const positions: number[] = [];
    for (const target of KITCHEN_DEMO_STEPS) {
      cards = moveKitchenCard(cards, "0-0", target);
      positions.push(cards.find(card => card.id === "0-0")?.column ?? -1);
    }
    expect(positions).toEqual([1, 2, 1, 0]);
    expect(cards).toEqual(initial);
  });
});