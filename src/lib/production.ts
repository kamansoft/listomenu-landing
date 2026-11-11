export type Unit = "kg" | "L" | "u";
/** A recipe line uses a raw ingredient or another preparation (sub-recipe), e.g. a filling. */
export interface RecipeLine { ingredient: string; qty: number; unit: Unit }
export interface DemoProduct { id: string; recipe: RecipeLine[] }

/** Preparations: recipe per 1 kg of result. */
export const PREPARATIONS: Record<string, RecipeLine[]> = {
  dough: [
    { ingredient: "flour", qty: 0.6, unit: "kg" },
    { ingredient: "oil", qty: 0.05, unit: "L" },
  ],
  shreddedBeef: [
    { ingredient: "beef", qty: 0.8, unit: "kg" },
    { ingredient: "onion", qty: 0.15, unit: "kg" },
    { ingredient: "pepper", qty: 0.1, unit: "kg" },
    { ingredient: "garlic", qty: 0.02, unit: "kg" },
  ],
  shreddedChicken: [
    { ingredient: "chicken", qty: 0.85, unit: "kg" },
    { ingredient: "onion", qty: 0.12, unit: "kg" },
    { ingredient: "garlic", qty: 0.02, unit: "kg" },
  ],
};

export const DEMO_PRODUCTS: DemoProduct[] = [
  { id: "beef", recipe: [
    { ingredient: "dough", qty: 0.06, unit: "kg" },
    { ingredient: "shreddedBeef", qty: 0.05, unit: "kg" },
  ] },
  { id: "chicken", recipe: [
    { ingredient: "dough", qty: 0.06, unit: "kg" },
    { ingredient: "shreddedChicken", qty: 0.05, unit: "kg" },
  ] },
  { id: "cheese", recipe: [
    { ingredient: "dough", qty: 0.06, unit: "kg" },
    { ingredient: "cheese", qty: 0.04, unit: "kg" },
  ] },
];

const round = (n: number) => Math.round(n * 1000) / 1000;

/** Expand recipes (including sub-recipes) into raw ingredient totals for planned units. */
export function ingredientNeeds(
  products: DemoProduct[],
  plan: Record<string, number>,
  preps: Record<string, RecipeLine[]> = PREPARATIONS,
) {
  const totals = new Map<string, { ingredient: string; qty: number; unit: Unit }>();
  const add = (line: RecipeLine, factor: number) => {
    const sub = preps[line.ingredient];
    if (sub) {
      for (const s of sub) add(s, factor * line.qty);
      return;
    }
    const cur = totals.get(line.ingredient) ?? { ingredient: line.ingredient, qty: 0, unit: line.unit };
    cur.qty += line.qty * factor;
    totals.set(line.ingredient, cur);
  };
  for (const p of products) {
    const n = Math.max(0, plan[p.id] ?? 0);
    if (n) for (const l of p.recipe) add(l, n);
  }
  return [...totals.values()].map((t) => ({ ...t, qty: round(t.qty) }));
}
