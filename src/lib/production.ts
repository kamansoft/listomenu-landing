export type Unit = "kg" | "L" | "u";
export interface RecipeLine { ingredient: string; qty: number; unit: Unit }
export interface DemoProduct { id: string; recipe: RecipeLine[] }

export const DEMO_PRODUCTS: DemoProduct[] = [
  { id: "reina", recipe: [
    { ingredient: "flour", qty: 0.12, unit: "kg" },
    { ingredient: "chicken", qty: 0.08, unit: "kg" },
    { ingredient: "avocado", qty: 0.05, unit: "kg" },
  ] },
  { id: "cheese", recipe: [
    { ingredient: "flour", qty: 0.12, unit: "kg" },
    { ingredient: "cheese", qty: 0.07, unit: "kg" },
  ] },
  { id: "empanada", recipe: [
    { ingredient: "flour", qty: 0.06, unit: "kg" },
    { ingredient: "beef", qty: 0.05, unit: "kg" },
    { ingredient: "oil", qty: 0.02, unit: "L" },
  ] },
];

/** Sum each ingredient across planned quantities: qty per unit × planned units. */
export function ingredientNeeds(products: DemoProduct[], plan: Record<string, number>) {
  const totals = new Map<string, { ingredient: string; qty: number; unit: Unit }>();
  for (const p of products) {
    const n = Math.max(0, plan[p.id] ?? 0);
    if (!n) continue;
    for (const l of p.recipe) {
      const cur = totals.get(l.ingredient) ?? { ingredient: l.ingredient, qty: 0, unit: l.unit };
      cur.qty = Math.round((cur.qty + l.qty * n) * 1000) / 1000;
      totals.set(l.ingredient, cur);
    }
  }
  return [...totals.values()];
}
