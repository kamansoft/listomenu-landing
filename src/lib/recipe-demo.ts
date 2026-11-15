export const RECIPE_INVENTORY = [
  { id: "flour", unit: "g" }, { id: "cheese", unit: "g" },
  { id: "oil", unit: "ml" }, { id: "beef", unit: "g" },
  { id: "onion", unit: "g" }, { id: "garlic", unit: "g" },
  { id: "chicken", unit: "g" }, { id: "pepper", unit: "g" },
] as const;
export type InventoryId = typeof RECIPE_INVENTORY[number]["id"];
export type DraftIngredient = { ingredient: InventoryId; quantity: number };
export type SavedRecipe = { id: string; name: string; lines: DraftIngredient[] };
export type SavedProduct = { id: string; name: string; recipeId: string };

export function saveDemoRecipe(id: string, name: string, lines: DraftIngredient[]): SavedRecipe | null {
  if (!name.trim() || lines.length === 0 || lines.some(line => !Number.isFinite(line.quantity) || line.quantity <= 0)) return null;
  return { id, name: name.trim(), lines: lines.map(line => ({ ...line })) };
}

export function createDemoProduct(id: string, name: string, recipeId: string, recipes: SavedRecipe[]): SavedProduct | null {
  if (!name.trim() || !recipes.some(recipe => recipe.id === recipeId)) return null;
  return { id, name: name.trim(), recipeId };
}