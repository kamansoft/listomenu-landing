import { describe, expect, it } from "vitest";
import { createDemoProduct, saveDemoRecipe, type DraftIngredient } from "./recipe-demo";

describe("temporary recipe and product creation", () => {
  it("saves a recipe with several inventory ingredients and their quantities", () => {
    expect(saveDemoRecipe("r1", " Empanada ", [{ ingredient: "flour", quantity: 36 }, { ingredient: "cheese", quantity: 40 }])).toEqual({ id: "r1", name: "Empanada", lines: [{ ingredient: "flour", quantity: 36 }, { ingredient: "cheese", quantity: 40 }] });
  });
  it("retains the saved quantities independently of later draft edits", () => {
    const draft: DraftIngredient[] = [{ ingredient: "cheese", quantity: 40 }];
    const saved = saveDemoRecipe("r1", "Queso", draft);
    const first = draft[0];
    if (!first) throw new Error("Expected a draft ingredient");
    first.quantity = 90;
    expect(saved?.lines[0]?.quantity).toBe(40);
  });
  it("creates a product linked to an existing saved recipe", () => {
    const recipe = saveDemoRecipe("r1", "Queso", [{ ingredient: "cheese", quantity: 40 }]);
    expect(createDemoProduct("p1", "Empanada", "r1", recipe ? [recipe] : [])).toEqual({ id: "p1", name: "Empanada", recipeId: "r1" });
    expect(createDemoProduct("p2", "Empanada", "missing", [])).toBeNull();
  });
  it("rejects incomplete recipes and nonpositive quantities", () => {
    expect(saveDemoRecipe("r1", "", [{ ingredient: "flour", quantity: 10 }])).toBeNull();
    expect(saveDemoRecipe("r1", "Masa", [])).toBeNull();
    expect(saveDemoRecipe("r1", "Masa", [{ ingredient: "flour", quantity: 0 }])).toBeNull();
    expect(saveDemoRecipe("r1", "Masa", [{ ingredient: "flour", quantity: -1 }])).toBeNull();
  });
});