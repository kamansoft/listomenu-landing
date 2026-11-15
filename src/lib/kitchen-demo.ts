export type KitchenCard = { id: string; source: number; item: number; column: number };

export function createKitchenCards(cards: string[][]): KitchenCard[] {
  return cards.flatMap((items, source) => items.map((_, item) => ({
    id: `${source}-${item}`, source, item, column: source,
  })));
}

export function moveKitchenCard(cards: KitchenCard[], id: string, target: number): KitchenCard[] {
  return cards.map(card => card.id === id && target >= 0 && target <= 2 && Math.abs(target - card.column) === 1
    ? { ...card, column: target } : card);
}

export const KITCHEN_DEMO_STEPS = [1, 2, 1, 0] as const;
export const PRODUCTION_DEMO_STEPS = [
  { product: "beef", quantity: 180 },
  { product: "chicken", quantity: 120 },
  { product: "cheese", quantity: 90 },
] as const;