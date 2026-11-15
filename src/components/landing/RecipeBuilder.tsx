import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Boxes, Check, ChefHat, Plus, Save, Trash2, PackageCheck, Store, Wheat, Milk, Droplets, Beef, Soup } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import productImage from "@/assets/empanada-recipe.jpg";
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
  const [stage, setStage] = useState(0);
  const reduced = useReducedMotion();
  const [name, setName] = useState(t.example);
  const [lines, setLines] = useState<DraftIngredient[]>([]);
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [products, setProducts] = useState<SavedProduct[]>([]);
  const [productName, setProductName] = useState("");
  const [recipeId, setRecipeId] = useState("");
  const [error, setError] = useState("");
  const [productError, setProductError] = useState("");
  const nextId = useRef(0);
  const demo = useViewportDemo(8, step => {
    if (step < 3) { setStage(0); setLines(exampleLines.slice(0, step + 1).map(line => ({ ...line, quantity: 10 }))); }
    if (step === 3) setStage(1);
    if (step === 4) setLines(exampleLines.map(line => ({ ...line })));
    if (step === 5) {
      const recipe = saveDemoRecipe("example", t.example, exampleLines);
      if (recipe) { setRecipes([recipe]); setRecipeId(recipe.id); setProductName(t.exampleProduct); setStage(2); }
    }
    if (step === 6) setProducts([{ id: "example-product", name: t.exampleProduct, recipeId: "example" }]);
    if (step === 7) setStage(2);
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
    setStage(2);
    if (!productName) setProductName(name);
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
  const ingredientIcon = (id: InventoryId) => id === "flour" ? Wheat : id === "cheese" ? Milk : id === "oil" ? Droplets : id === "beef" || id === "chicken" ? Beef : Soup;
  const reset = () => { demo.stop(); setStage(0); setName(""); setLines([]); setProductName(""); setRecipeId(""); setError(""); setProductError(""); };
  const currentProduct = products.find(product => product.recipeId === recipeId);
  return (
    <section className="border-b border-border bg-primary-surface">
      <div className="gutter mx-auto max-w-[1440px] py-12 lg:py-16" data-testid="recipe-demo">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">{t.eyebrow}</p>
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{t.title}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{t.body}</p>
        </div>
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-panel" onPointerDownCapture={demo.stop} onFocusCapture={demo.stop}>
          <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground"><ChefHat className="size-5" /></span><div><p className="font-display font-extrabold">listo.menu</p><p className="text-xs text-muted-foreground">{t.eyebrow}</p></div></div>
            <Button variant="outline" className="min-h-11" onClick={reset}><Plus />{t.newRecipe}</Button>
          </div>
          <div ref={demo.ref} className="border-b border-border bg-muted/50 px-3 py-4 sm:px-6">
            <ol className="grid grid-cols-3 gap-2">
              {t.steps.map((label, index) => <li key={label}><Button variant="ghost" aria-current={stage === index ? "step" : undefined} disabled={index > stage} onClick={() => setStage(index)} className={`h-auto min-h-14 w-full justify-start gap-2 whitespace-normal px-2 text-left sm:px-3 ${stage === index ? "bg-primary-surface text-primary" : "text-muted-foreground"}`}><span className={`flex size-7 shrink-0 items-center justify-center rounded-full border ${stage >= index ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{stage > index ? <Check /> : index + 1}</span><span className="text-xs font-bold sm:text-sm">{label}</span></Button></li>)}
            </ol>
          </div>
          <div className="grid lg:grid-cols-[1.35fr_1fr]">
            <div className="min-w-0 p-4 sm:p-6" data-testid="recipe-workspace">
              <h3 className="mb-5 text-xl font-extrabold">{t.stageTitles[stage]}</h3>
              <div className="min-h-[330px]">
                <AnimatePresence mode="wait">
                  <motion.div key={stage} initial={reduced ? false : { opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduced ? 0 : -12 }} transition={{ duration: 0.25 }}>
                    {stage === 0 && <>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {RECIPE_INVENTORY.map(item => {
                          const included = lines.some(line => line.ingredient === item.id);
                          const Icon = ingredientIcon(item.id);
                          return <Button key={item.id} variant="outline" aria-label={`${included ? t.remove : t.add} ${ingredients[item.id]}`} aria-pressed={included} onClick={() => included ? setLines(current => current.filter(line => line.ingredient !== item.id)) : add(item.id)} className={`relative flex h-24 flex-col gap-2 whitespace-normal border px-2 ${included ? "border-primary bg-primary-surface text-primary" : "border-border bg-background"}`}><Icon className="size-6!" /><span className="text-sm font-bold">{ingredients[item.id]}</span>{included && <Check className="absolute right-2 top-2 size-3!" />}</Button>;
                        })}
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">{t.selected}: <span className="font-bold text-primary">{lines.length}</span></p>
                    </>}
                    {stage === 1 && <>
                      <label className="mb-3 flex flex-col gap-2 text-sm font-semibold">{t.name}<Input value={name} maxLength={80} onChange={event => setName(event.target.value)} className="h-11 bg-background" /></label>
                      {lines.map(line => { const Icon = ingredientIcon(line.ingredient); return <div key={line.ingredient} className={`flex items-center gap-3 border-b border-border py-3 ${demo.activeStep === 4 ? "bg-primary-surface" : ""}`}><Icon className="size-5 shrink-0 text-primary" /><span className="min-w-0 flex-1 text-sm font-semibold">{ingredients[line.ingredient]}</span><Input type="number" min="0" step="any" aria-label={`${t.quantity} ${ingredients[line.ingredient]}`} value={line.quantity} onChange={event => setLines(current => current.map(item => item.ingredient === line.ingredient ? { ...item, quantity: Number(event.target.value) } : item))} className="h-11 w-20 shrink-0 bg-background text-right tabular-nums" /><span className="w-5 text-xs text-muted-foreground">{unit(line.ingredient)}</span><Button variant="ghost" size="icon" className="size-11 shrink-0" aria-label={`${t.remove} ${ingredients[line.ingredient]}`} onClick={() => setLines(current => current.filter(item => item.ingredient !== line.ingredient))}><Trash2 /></Button></div>; })}
                      {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
                    </>}
                    {stage === 2 && <form onSubmit={event => { event.preventDefault(); create(); }} className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 rounded-md bg-success-surface p-3 text-success"><Check className="size-5 shrink-0" /><span className="text-sm font-bold">{t.saved}: {recipes.find(recipe => recipe.id === recipeId)?.name}</span></div>
                      <label className="flex flex-col gap-2 text-sm font-semibold">{t.productName}<Input value={productName} maxLength={80} onChange={event => setProductName(event.target.value)} className="h-11 bg-background" /></label>
                      <label className="flex flex-col gap-2 text-sm font-semibold">{t.linkedRecipe}<select value={recipeId} onChange={event => setRecipeId(event.target.value)} className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="">—</option>{recipes.map(recipe => <option key={recipe.id} value={recipe.id}>{recipe.name}</option>)}</select></label>
                      {productError && <p role="alert" className="text-sm text-destructive">{productError}</p>}
                      <Button type="submit" className="min-h-11 self-start"><PackageCheck />{t.create}</Button>
                    </form>}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                <Button variant="ghost" className="min-h-11" disabled={stage === 0} onClick={() => setStage(current => Math.max(0, current - 1))}><ArrowLeft />{t.back}</Button>
                {stage === 0 && <Button className="min-h-11" disabled={lines.length === 0} onClick={() => setStage(1)}>{t.next}<ArrowRight /></Button>}
                {stage === 1 && <Button className="min-h-11" onClick={save}><Save />{t.save}<ArrowRight /></Button>}
                {stage === 2 && currentProduct && <span className="flex items-center gap-2 text-sm font-bold text-success"><Check className="size-4" />{t.ready}</span>}
              </div>
            </div>
            <aside className="min-w-0 border-t border-border bg-muted/40 p-4 sm:p-6 lg:border-l lg:border-t-0">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground"><Store className="size-4" />{t.preview}</p>
              <div className="relative overflow-hidden rounded-md bg-background">
                <img src={productImage} alt={t.photo} width={1024} height={1024} loading="lazy" className="aspect-[2/1] w-full object-cover" />
                <span className={`absolute right-3 top-3 rounded-md px-2 py-1 text-xs font-bold ${currentProduct ? "bg-success-surface text-success" : "bg-card text-muted-foreground"}`}>{currentProduct ? t.ready : t.draft}</span>
              </div>
              <h3 className="mt-4 break-words text-xl font-extrabold">{productName || currentProduct?.name || name || t.exampleProduct}</h3>
              <p className="mt-2 text-xs font-semibold uppercase text-muted-foreground">{t.perUnit}</p>
              <ul className="mt-2 min-h-24" aria-live="polite">
                {lines.map(line => <motion.li key={line.ingredient} initial={reduced ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between gap-4 border-b border-border py-2 text-sm"><span>{ingredients[line.ingredient]}</span><strong className="tabular-nums text-primary">{line.quantity} {unit(line.ingredient)}</strong></motion.li>)}
                {lines.length === 0 && <li className="py-3 text-sm text-muted-foreground">{t.empty}</li>}
              </ul>
            </aside>
          </div>
          <div className="border-t border-border px-4 py-4 sm:px-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold"><Boxes className="size-4 text-primary" />{t.catalog} <span className="text-muted-foreground">({products.length})</span></h3>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-testid="created-products">
              {products.length === 0 && <li className="text-sm text-muted-foreground">{t.noProducts}</li>}
              {products.map(product => <li key={product.id} className="flex items-center gap-3 border-l-2 border-success py-2 pl-3"><PackageCheck className="size-5 shrink-0 text-success" /><div className="min-w-0 break-words"><p className="text-sm font-bold">{product.name}</p><p className="text-xs text-muted-foreground">{recipes.find(recipe => recipe.id === product.recipeId)?.name}</p></div></li>)}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{t.demo}</p>
      </div>
    </section>
  );
}
