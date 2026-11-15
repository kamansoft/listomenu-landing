import { useState } from "react";
import { ShoppingBasket } from "lucide-react";
import { CheckO } from "@/components/brand/logo";
import { useViewportDemo } from "@/hooks/use-viewport-demo";
import { PRODUCTION_DEMO_STEPS } from "@/lib/kitchen-demo";
import { DEMO_PRODUCTS, ingredientNeeds } from "@/lib/production";
import { dict, type Lang } from "@/lib/i18n";

function fmt(qty: number, unit: string, lang: Lang) {
  if (unit === "kg" && qty < 1) return `${Math.round(qty * 1000)} g`;
  return `${qty.toLocaleString(lang === "es" ? "es-CO" : "en-US", { maximumFractionDigits: 2 })} ${unit}`;
}

export function ProductionPlanner({ lang }: { lang: Lang }) {
  const t = dict[lang].plan;
  const [plan, setPlan] = useState<Record<string, number>>({ beef: 120, chicken: 80, cheese: 50 });
  const needs = ingredientNeeds(DEMO_PRODUCTS, plan);
  const demo = useViewportDemo(PRODUCTION_DEMO_STEPS.length, index => {
    const step = PRODUCTION_DEMO_STEPS[index];
    if (step) setPlan(current => ({ ...current, [step.product]: step.quantity }));
  });
  const highlighted = demo.activeStep === null ? null : PRODUCTION_DEMO_STEPS[demo.activeStep]?.product;
  const affected = highlighted ? ingredientNeeds(DEMO_PRODUCTS, { [highlighted]: 1 }).map(item => item.ingredient) : [];
  return (
    <div ref={demo.ref} onPointerDownCapture={demo.stop} onFocusCapture={demo.stop} className="grid gap-4 lg:grid-cols-2 lg:gap-8" data-testid="production-planner">
      <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4 sm:p-6">
        {DEMO_PRODUCTS.map(product => (
          <label key={product.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-border py-3 last:border-0">
            <span className="font-display text-lg font-bold">{t.products[product.id as keyof typeof t.products]}</span>
            <span className="flex items-center gap-2">
              <input type="number" min={0} max={9999} inputMode="numeric" value={plan[product.id] ?? 0}
                onChange={event => { demo.stop(); setPlan(current => ({ ...current, [product.id]: Math.max(0, Number(event.target.value) || 0) })); }}
                className={`h-11 w-24 rounded-md border bg-background px-3 text-right font-display text-lg font-bold transition-shadow focus:outline-none focus:ring-2 focus:ring-ring ${highlighted === product.id ? "border-primary ring-2 ring-ring ring-offset-2" : "border-input"}`} />
              <span className="text-sm text-muted-foreground">{t.units}</span>
            </span>
          </label>
        ))}
      </div>
      <div className="min-h-[560px] rounded-lg bg-card p-4 shadow-panel sm:p-6">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold"><ShoppingBasket className="size-5 text-primary" /> {t.list}</h3>
        {needs.length === 0 ? <p className="text-muted-foreground">{t.empty}</p> : (
          <ul className="flex flex-col">
            {needs.map(item => (
              <li key={item.ingredient} className={`flex items-center justify-between gap-4 border-b border-dashed border-border py-3 transition-colors last:border-0 ${affected.includes(item.ingredient) ? "bg-primary-surface" : ""}`}>
                <span className="flex items-center gap-2"><CheckO className="size-4 shrink-0 text-primary" /> {t.ingredients[item.ingredient as keyof typeof t.ingredients]}</span>
                <span key={item.qty} className="demo-total font-display text-lg font-extrabold tabular-nums">{fmt(item.qty, item.unit, lang)}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-sm text-muted-foreground">{t.note}</p>
      </div>
    </div>
  );
}