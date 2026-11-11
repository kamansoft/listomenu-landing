import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Boxes, ChefHat, ClipboardList, Layers, PackageCheck, Receipt, ShoppingBasket,
  Timer, TrendingUp, WifiOff, AlertTriangle, HelpCircle, Check, Mail, Truck, Store, UtensilsCrossed, Soup, Building2, PartyPopper,
} from "lucide-react";
import { BrandLockup, CheckO } from "@/components/brand/logo";
import { dict, type Lang } from "@/lib/i18n";
import { DEMO_PRODUCTS, ingredientNeeds } from "@/lib/production";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from "@/lib/contact";
import { EmailLink, WhatsAppIcon, WhatsAppLink } from "./ContactLinks";
import ordersImg from "@/assets/mockup-orders.jpg";
import inventoryImg from "@/assets/mockup-inventory.jpg";
import truckImg from "@/assets/foodtruck.jpg";

const wrap = "mx-auto w-full max-w-[1440px] gutter";
const btnPrimary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-display text-base font-bold text-primary-foreground shadow-panel transition hover:bg-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const btnGhost =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-3 font-semibold text-foreground transition hover:border-primary hover:text-primary";

const featureIcons = [Timer, ChefHat, Boxes, TrendingUp, Layers, WifiOff];
const stepIcons = [PackageCheck, ClipboardList, Receipt];
const whoIcons = [Truck, Store, UtensilsCrossed, Soup, Building2, PartyPopper];

export function Landing({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <div className="min-h-dvh bg-background pb-[env(safe-area-inset-bottom)]">
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <Pains lang={lang} />
        <How lang={lang} />
        <Features lang={lang} />
        <ProductionPlan lang={lang} />
        <Who lang={lang} />
        <Pricing lang={lang} />
        <Faq lang={lang} />
        <Final lang={lang} />
      </main>
      <footer className="border-t border-border bg-card">
        <div className={`${wrap} flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center`}>
          <BrandLockup />
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <WhatsAppLink message={t.msg.default} className="inline-flex min-h-11 items-center gap-2 hover:text-primary">
              <WhatsAppIcon className="size-4" /> {WHATSAPP_DISPLAY}
            </WhatsAppLink>
            <EmailLink subject={t.msg.subject} body={t.msg.body} className="inline-flex min-h-11 items-center gap-2 hover:text-primary">
              <Mail className="size-4" /> {CONTACT_EMAIL}
            </EmailLink>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} listo.menu. {t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}

function Header({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 pt-[env(safe-area-inset-top)] backdrop-blur">
      <div className={`${wrap} flex items-center justify-between gap-4 py-3`}>
        <Link to="/$lang" params={{ lang }} aria-label="listo.menu">
          <BrandLockup />
        </Link>
        <nav className="flex items-center gap-2">
          <Link to="/$lang" params={{ lang: t.nav.langCode }} hrefLang={t.nav.langCode} className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-muted-foreground hover:text-primary">
            {t.nav.lang}
          </Link>
          <WhatsAppLink message={t.msg.default} className={`${btnPrimary} px-3 sm:px-5`}>
            <WhatsAppIcon className="size-5" />
            <span className="hidden sm:inline">{t.nav.whatsapp}</span>
            <span className="sr-only sm:hidden">{t.nav.whatsapp}</span>
          </WhatsAppLink>
        </nav>
      </div>
    </header>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const t = dict[lang].hero;
  const m = dict[lang].msg;
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[640px] rounded-full bg-primary-surface blur-3xl" />
      <div className={`${wrap} relative grid items-center gap-8 py-12 lg:grid-cols-[1fr_1.1fr] lg:gap-8 lg:py-20`}>
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-surface px-3 py-1 text-sm font-semibold text-primary">
            <CheckO className="size-4" /> {t.eyebrow}
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">{t.title}</h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">{t.body}</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <WhatsAppLink message={m.default} className={`${btnPrimary} text-lg`}>
              <WhatsAppIcon className="size-5" /> {t.cta}
            </WhatsAppLink>
            <EmailLink subject={m.subject} body={m.body} className={btnGhost}>
              <Mail className="size-4" /> {t.email}
            </EmailLink>
          </div>
          <p className="text-sm text-muted-foreground">{t.note}</p>
        </div>
        <div className="relative">
          <img src={ordersImg} alt={dict[lang].alt.orders} width={1536} height={1024} className="w-full rounded-2xl shadow-lift" />
          <div className="absolute -bottom-6 left-4 hidden items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-panel sm:flex">
            <span className="flex size-10 items-center justify-center rounded-lg bg-success-surface text-success"><Check className="size-5" /></span>
            <div className="text-sm">
              <p className="font-display font-bold">−120 g {dict[lang].plan.ingredients.flour}</p>
              <p className="text-muted-foreground">−80 g {dict[lang].plan.ingredients.chicken}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="mb-8 flex max-w-3xl flex-col gap-2">
      {eyebrow && <span className="text-sm font-bold uppercase tracking-wider text-primary">{eyebrow}</span>}
      <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{title}</h2>
      {sub && <p className="text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Pains({ lang }: { lang: Lang }) {
  const t = dict[lang].pains;
  return (
    <section className={`${wrap} py-12 lg:py-16`}>
      <SectionTitle title={t.title} />
      <div className="grid gap-4 md:grid-cols-3">
        {t.items.map((p) => (
          <div key={p.t} className="flex gap-4 rounded-xl border border-border bg-card p-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-warning-surface text-warning"><AlertTriangle className="size-5" /></span>
            <div>
              <h3 className="text-lg font-bold">{p.t}</h3>
              <p className="mt-1 text-muted-foreground">{p.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function How({ lang }: { lang: Lang }) {
  const t = dict[lang].how;
  return (
    <section className="bg-primary-deep text-primary-foreground">
      <div className={`${wrap} grid gap-8 py-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-20`}>
        <div>
          <h2 className="mb-8 text-3xl font-extrabold sm:text-4xl">{t.title}</h2>
          <ol className="flex flex-col gap-6">
            {t.steps.map((s, i) => {
              const Icon = stepIcons[i] ?? Check;
              return (
                <li key={s.t} className="flex gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary font-display text-lg font-extrabold">{i + 1}</span>
                  <div>
                    <h3 className="flex items-center gap-2 text-xl font-bold"><Icon className="size-5 opacity-80" /> {s.t}</h3>
                    <p className="mt-1 opacity-80">{s.d}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <img src={inventoryImg} alt={dict[lang].alt.inventory} loading="lazy" width={1280} height={896} className="w-full rounded-2xl shadow-lift" />
      </div>
    </section>
  );
}

function Features({ lang }: { lang: Lang }) {
  const t = dict[lang].features;
  return (
    <section className={`${wrap} py-12 lg:py-20`}>
      <SectionTitle title={t.title} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.items.map((f, i) => {
          const Icon = featureIcons[i] ?? Check;
          return (
            <div key={f.t} className="rounded-xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-panel">
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary-surface text-primary"><Icon className="size-5" /></span>
              <h3 className="mt-4 text-lg font-bold">{f.t}</h3>
              <p className="mt-1 text-muted-foreground">{f.d}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function fmt(qty: number, unit: string, lang: Lang) {
  if (unit === "kg" && qty < 1) return `${Math.round(qty * 1000)} g`;
  return `${qty.toLocaleString(lang === "es" ? "es-CO" : "en-US", { maximumFractionDigits: 2 })} ${unit}`;
}

function ProductionPlan({ lang }: { lang: Lang }) {
  const t = dict[lang].plan;
  const [plan, setPlan] = useState<Record<string, number>>({ reina: 40, cheese: 25, empanada: 30 });
  const needs = ingredientNeeds(DEMO_PRODUCTS, plan);
  return (
    <section className="bg-primary-surface">
      <div className={`${wrap} py-12 lg:py-20`}>
        <SectionTitle eyebrow={t.eyebrow} title={t.title} sub={t.body} />
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 sm:p-6">
            {DEMO_PRODUCTS.map((p) => (
              <label key={p.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-border py-3 last:border-0">
                <span className="font-display text-lg font-bold">{t.products[p.id as keyof typeof t.products]}</span>
                <span className="flex items-center gap-2">
                  <input
                    type="number" min={0} max={9999} inputMode="numeric"
                    value={plan[p.id] ?? 0}
                    onChange={(e) => setPlan({ ...plan, [p.id]: Math.max(0, Number(e.target.value) || 0) })}
                    className="h-11 w-24 rounded-md border border-input bg-background px-3 text-right font-display text-lg font-bold focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <span className="text-sm text-muted-foreground">{t.units}</span>
                </span>
              </label>
            ))}
          </div>
          <div className="rounded-xl bg-card p-4 shadow-panel sm:p-6">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold"><ShoppingBasket className="size-5 text-primary" /> {t.list}</h3>
            {needs.length === 0 ? (
              <p className="text-muted-foreground">{t.empty}</p>
            ) : (
              <ul className="flex flex-col">
                {needs.map((n) => (
                  <li key={n.ingredient} className="flex items-center justify-between gap-4 border-b border-dashed border-border py-3 last:border-0">
                    <span className="flex items-center gap-2"><CheckO className="size-4 text-primary" /> {t.ingredients[n.ingredient as keyof typeof t.ingredients]}</span>
                    <span className="font-display text-lg font-extrabold tabular-nums">{fmt(n.qty, n.unit, lang)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Who({ lang }: { lang: Lang }) {
  const t = dict[lang].who;
  return (
    <section className={`${wrap} grid gap-8 py-12 lg:grid-cols-2 lg:items-center lg:py-20`}>
      <img src={truckImg} alt={dict[lang].alt.truck} loading="lazy" width={1280} height={896} className="w-full rounded-2xl object-cover shadow-panel" />
      <div>
        <SectionTitle title={t.title} />
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {t.items.map((w, i) => {
            const Icon = whoIcons[i] ?? Check;
            return (
              <li key={w} className="flex min-h-11 items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 font-semibold">
                <Icon className="size-5 text-primary" /> {w}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Pricing({ lang }: { lang: Lang }) {
  const t = dict[lang].pricing;
  const m = dict[lang].msg;
  return (
    <section className="border-y border-border bg-card">
      <div className={`${wrap} py-12 lg:py-20`}>
        <SectionTitle title={t.title} sub={t.sub} />
        <div className="grid gap-4 md:grid-cols-3">
          {t.plans.map((p, i) => {
            const featured = i === 1;
            return (
              <div key={p.id} className={`relative flex flex-col gap-4 rounded-2xl border p-6 ${featured ? "border-primary bg-primary-surface shadow-lift" : "border-border bg-background"}`}>
                {featured && <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{t.popular}</span>}
                <h3 className="text-2xl font-extrabold">{p.id}</h3>
                <p className="text-muted-foreground">{p.d}</p>
                <p><span className="font-display text-3xl font-extrabold">{p.price}</span><span className="text-muted-foreground">{t.perMonth}</span></p>
                <ul className="flex flex-1 flex-col gap-2">
                  {p.f.map((f) => (
                    <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success" /> {f}</li>
                  ))}
                </ul>
                <WhatsAppLink message={m.plan(p.id)} className={featured ? btnPrimary : btnGhost}>
                  <WhatsAppIcon className="size-5" /> {t.choose}
                </WhatsAppLink>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Faq({ lang }: { lang: Lang }) {
  const t = dict[lang].faq;
  return (
    <section className={`${wrap} py-12 lg:py-20`}>
      <SectionTitle title={t.title} />
      <div className="grid gap-2 lg:grid-cols-2 lg:gap-4">
        {t.items.map((f) => (
          <details key={f.q} className="group rounded-xl border border-border bg-card p-4 open:shadow-panel">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 font-display text-lg font-bold">
              <HelpCircle className="size-5 shrink-0 text-primary" /> {f.q}
            </summary>
            <p className="mt-2 pl-8 text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Final({ lang }: { lang: Lang }) {
  const t = dict[lang].final;
  const m = dict[lang].msg;
  return (
    <section className={`${wrap} pb-12 lg:pb-20`}>
      <div className="flex flex-col items-start gap-6 rounded-3xl bg-primary p-8 text-primary-foreground shadow-lift lg:flex-row lg:items-center lg:justify-between lg:p-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{t.title}</h2>
          <p className="mt-2 text-lg opacity-90">{t.body}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <WhatsAppLink message={m.default} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-card px-5 py-3 font-display text-lg font-bold text-primary transition hover:bg-primary-surface">
            <WhatsAppIcon className="size-5" /> {t.cta}
          </WhatsAppLink>
          <EmailLink subject={m.subject} body={m.body} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-primary-foreground/40 px-5 py-3 font-semibold transition hover:bg-primary-deep">
            <Mail className="size-4" /> {t.email}
          </EmailLink>
        </div>
      </div>
    </section>
  );
}
