import { useRef, useState } from "react";
import { Boxes, Check, ChefHat, Plus, Save, Trash2, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useViewportDemo } from "@/hooks/use-viewport-demo";
import { dict, type Lang } from "@/lib/i18n";
import { createDemoProduct, RECIPE_INVENTORY, saveDemoRecipe, type DraftIngredient, type InventoryId, type SavedProduct, type SavedRecipe } from "@/lib/recipe-demo";

const exampleLines: DraftIngredient[] = [
  { ingredient: "flour", quantity: 36 }, { ingredient: "cheese", quantity: 40 }, { ingredient: "oil", quantity: 3 },
];

export function RecipeBuilder({ lang }: { lang: Lang }) {
  const t = dict[lang].recipeDemo;
  const ingredients = dict[lang].plan.ingredients;
  const [name, setName] = useState("");
  const [lines, setLines] = useState<DraftIngredient[]>([]);
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [products, setProducts] = useState<SavedProduct[]>([]);
  const [productName, setProductName] = useState("");
  const [recipeId, setRecipeId] = useState("");
  const [error, setError] = useState("");
  const [productError, setProductError] = useState("");
  const nextId = useRef(0);
  const demo = useViewportDemo(6, step => {
    if (step === 0) setName(t.example);
    if (step >= 1 && step <= 3) setLines(exampleLines.slice(0, step));
    if (step === 4) {
      const recipe = saveDemoRecipe("example", t.example, exampleLines);
      if (recipe) { setRecipes([recipe]); setRecipeId(recipe.id); setProductName(t.exampleProduct); }
    }
    if (step === 5) setProducts([{ id: "example-product", name: t.exampleProduct, recipeId: "example" }]);
  });
  const add = (ingredient: InventoryId) => {
    demo.stop();
    setLines(current => current.some(line => line.ingredient === ingredient) ? current : [...current, { ingredient, quantity: 10 }]);
    setError("");
  };
  const save = () => {
    demo.stop();
    const recipe = saveDemoRecipe(`recipe-${nextId.current++}`, name, lines);
    if (!recipe) { setError(t.invalid); return; }
    setRecipes(current => [...current, recipe]);
    setRecipeId(recipe.id);
    setError("");
  };
  const create = () => {
    demo.stop();
    const product = createDemoProduct(`product-${nextId.current++}`, productName, recipeId, recipes);
    if (!product) { setProductError(t.invalidProduct); return; }
    setProducts(current => [...current, product]);
    setProductName("");
    setProductError("");
  };
  const unit = (id: InventoryId) => RECIPE_INVENTORY.find(item => item.id === id)?.unit;
  const active = (step: number) => demo.activeStep === step ? "ring-2 ring-ring ring-offset-2" : "";
  return (
    <section className="border-b border-border bg-primary-surface">
      <div className="gutter mx-auto max-w-[1440px] py-12 lg:py-16" data-testid="recipe-demo" onPointerDownCapture={demo.stop} onFocusCapture={demo.stop}>
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">{t.eyebrow}</p>
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{t.title}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{t.body}</p>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[0.75fr_1.25fr_1fr]">
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold"><Boxes className="size-5 text-primary" />{t.inventory}</h3>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {RECIPE_INVENTORY.map(item => {
                const added = lines.some(line => line.ingredient === item.id);
                return <Button key={item.id} variant="outline" disabled={added} onClick={() => add(item.id)} aria-label={`${t.add} ${ingredients[item.id]}`} className="h-auto min-h-11 justify-between gap-2 whitespace-normal bg-card px-3 py-3 text-left">
                  <span>{ingredients[item.id]} <span className="text-xs text-muted-foreground">{item.unit}</span></span>{added ? <Check /> : <Plus />}
                </Button>;
              })}
            </div>
          </div>
          <div ref={demo.ref} className="rounded-lg border border-border bg-card p-4 sm:p-5">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold"><ChefHat className="size-5 text-primary" />{t.recipe}</h3>
            <form onSubmit={event => { event.preventDefault(); save(); }}>
              <label className="flex flex-col gap-2 text-sm font-semibold">{t.name}<Input value={name} maxLength={80} onChange={event => setName(event.target.value)} className={`h-11 bg-background ${active(0)}`} /></label>
              <div className="my-4 min-h-[204px]">
                {lines.length === 0 ? <p className="py-8 text-sm text-muted-foreground">{t.empty}</p> : lines.map((line, index) => (
                  <div key={line.ingredient} className={`flex items-center gap-2 border-b border-border py-3 ${demo.activeStep === index + 1 ? "bg-primary-surface" : ""}`}>
                    <span className="min-w-0 flex-1 text-sm font-semibold">{ingredients[line.ingredient]}</span>
                    <Input type="number" min="0" step="any" aria-label={`${t.quantity} ${ingredients[line.ingredient]}`} value={line.quantity} onChange={event => { const quantity = Number(event.target.value); setLines(current => current.map(item => item.ingredient === line.ingredient ? { ...item, quantity } : item)); }} className="h-11 w-20 shrink-0 bg-background text-right tabular-nums" />
                    <span className="w-5 text-xs text-muted-foreground">{unit(line.ingredient)}</span>
                    <Button type="button" variant="ghost" size="icon" className="size-11 shrink-0 text-muted-foreground" aria-label={`${t.remove} ${ingredients[line.ingredient]}`} title={`${t.remove} ${ingredients[line.ingredient]}`} onClick={() => setLines(current => current.filter(item => item.ingredient !== line.ingredient))}><Trash2 /></Button>
                  </div>
                ))}
              </div>
              {error && <p role="alert" className="mb-3 text-sm text-destructive">{error}</p>}
              <div className="flex flex-wrap gap-2">
                <Button type="submit" className={`min-h-11 ${active(4)}`}><Save />{t.save}</Button>
                <Button type="button" variant="ghost" className="min-h-11" onClick={() => { setName(""); setLines([]); setError(""); }}><Plus />{t.newRecipe}</Button>
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="mb-3 text-xl font-bold">{t.saved}</h3>
              <ul className="flex flex-col gap-2" data-testid="saved-recipes">
                {recipes.length === 0 && <li className="text-sm text-muted-foreground">{t.noRecipes}</li>}
                {recipes.map(recipe => <li key={recipe.id} className="rounded-lg border border-border bg-card p-3">
                  <p className="flex items-start gap-2 font-bold"><Check className="mt-1 size-4 shrink-0 text-success" />{recipe.name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{recipe.lines.map(line => `${line.quantity} ${unit(line.ingredient)} ${ingredients[line.ingredient]}`).join(" · ")}</p>
                </li>)}
              </ul>
            </div>
            <form onSubmit={event => { event.preventDefault(); create(); }} className="flex flex-col gap-3 border-t border-border pt-4">
              <label className="flex flex-col gap-2 text-sm font-semibold">{t.productName}<Input value={productName} maxLength={80} onChange={event => setProductName(event.target.value)} className="h-11 bg-card" /></label>
              <label className="flex flex-col gap-2 text-sm font-semibold">{t.linkedRecipe}<select value={recipeId} onChange={event => setRecipeId(event.target.value)} className="h-11 w-full min-w-0 rounded-md border border-input bg-card px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="">—</option>{recipes.map(recipe => <option key={recipe.id} value={recipe.id}>{recipe.name}</option>)}</select></label>
              {productError && <p role="alert" className="text-sm text-destructive">{productError}</p>}
              <Button type="submit" className={`min-h-11 self-start ${active(5)}`}><PackageCheck />{t.create}</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-5">
          <h3 className="mb-3 text-xl font-bold">{t.products}</h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-testid="created-products">
            {products.length === 0 && <li className="text-sm text-muted-foreground">{t.noProducts}</li>}
            {products.map(product => <li key={product.id} className="flex items-start gap-3 rounded-lg border border-success/30 bg-card p-4"><PackageCheck className="mt-1 size-5 shrink-0 text-success" /><div className="min-w-0 break-words"><p className="font-bold">{product.name}</p><p className="mt-1 text-sm text-muted-foreground">{recipes.find(recipe => recipe.id === product.recipeId)?.name}</p></div></li>)}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">{t.demo}</p>
        </div>
      </div>
    </section>
  );
}