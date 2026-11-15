import { Link } from "@tanstack/react-router";
import {
  Boxes, ChefHat, ClipboardList, Layers, PackageCheck, Receipt, ShoppingBasket,
  Timer, TrendingUp, WifiOff, AlertTriangle, HelpCircle, Check, Mail, Phone, Truck, Store, UtensilsCrossed, Soup, Building2, PartyPopper,
} from "lucide-react";
import { BrandLockup, CheckO } from "@/components/brand/logo";
import { dict, type Lang } from "@/lib/i18n";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, withSource } from "@/lib/contact";
import { EmailLink, WhatsAppIcon, WhatsAppLink } from "./ContactLinks";
import { useVisitorLocation } from "./VisitorLocation";
import { countryCurrency, formatPlanPrice } from "@/lib/localization";
import { ShieldCheck, X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { KitchenBoard } from "./KitchenBoard";
import { ProductionPlanner } from "./ProductionPlanner";
import { RecipeBuilder } from "./RecipeBuilder";
import { useViewportDemo } from "@/hooks/use-viewport-demo";
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
        <RecipeBuilder lang={lang} />
        <TryCta lang={lang} source="recetas" />
        <Features lang={lang} />
        <Kitchen lang={lang} />
        <TryCta lang={lang} source="cocina" />
        <ProductionPlan lang={lang} />
        <Who lang={lang} />
        <Simple lang={lang} />
        <Pricing lang={lang} />
        <Trust lang={lang} />
        <Faq lang={lang} />
        <Final lang={lang} />
      </main>
      <footer className="border-t border-border bg-card">
        <div className={`${wrap} flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center`}>
          <div className="flex flex-col gap-2">
            <BrandLockup />
            <p className="text-sm text-muted-foreground">{t.footer.productBy} <a href={SITE_CONFIG.company.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">{SITE_CONFIG.company.name}</a></p>
          </div>
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
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}

function Header({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const { country, chooseLanguage } = useVisitorLocation();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 pt-[env(safe-area-inset-top)] backdrop-blur">
      <div className={`${wrap} flex items-center justify-between gap-4 py-3`}>
        <Link to="/$lang" params={{ lang }} aria-label="listo.menu">
          <BrandLockup />
        </Link>
        <nav className="flex items-center gap-2">
          {country !== "CO" && <Link to="/$lang" params={{ lang: t.nav.langCode }} onClick={() => chooseLanguage(t.nav.langCode)} hrefLang={t.nav.langCode} className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-muted-foreground hover:text-primary">
            {t.nav.lang}
          </Link>}
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
            <WhatsAppLink message={withSource(m.default, m.ref, "hero")} className={`${btnPrimary} text-lg`}>
              <WhatsAppIcon className="size-5" /> {t.cta}
            </WhatsAppLink>
            <EmailLink subject={m.subject} body={m.body} className={btnGhost}>
              <Mail className="size-4" /> {t.email}
            </EmailLink>
          </div>
          <p className="text-sm text-muted-foreground">{t.note}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-foreground">
            {t.trust.map((x) => <li key={x} className="inline-flex items-center gap-1"><Check className="size-4 text-success" /> {x}</li>)}
          </ul>
        </div>
        <div className="relative">
          <img src={ordersImg} alt={dict[lang].alt.orders} width={1536} height={1024} className="w-full rounded-2xl shadow-lift" />
          <div className="absolute -bottom-6 left-4 hidden items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-panel sm:flex">
            <span className="flex size-10 items-center justify-center rounded-lg bg-success-surface text-success"><Check className="size-5" /></span>
            <div className="text-sm">
              <p className="font-display font-bold">−40 g {dict[lang].plan.ingredients.beef}</p>
              <p className="text-muted-foreground">−1 g {dict[lang].plan.ingredients.garlic}</p>
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

function ProductionPlan({ lang }: { lang: Lang }) {
  const t = dict[lang].plan;
  return (
    <section className="bg-primary-surface">
      <div className={`${wrap} py-12 lg:py-20`}>
        <SectionTitle eyebrow={t.eyebrow} title={t.title} sub={t.body} />
        <ProductionPlanner lang={lang} />
      </div>
    </section>
  );
}

function Who({ lang }: { lang: Lang }) {
  const t = dict[lang].who;
  const demo = useViewportDemo(t.items.length, () => {});
  return (
    <section className={`${wrap} grid gap-8 py-12 lg:grid-cols-2 lg:items-center lg:py-20`}>
      <img src={truckImg} alt={dict[lang].alt.truck} loading="lazy" width={1280} height={896} className="w-full rounded-2xl object-cover shadow-panel" />
      <div ref={demo.ref} data-testid="business-types">
        <SectionTitle title={t.title} />
        <ul className="business-types grid grid-cols-1 gap-3 sm:grid-cols-2">
          {t.items.map((w, i) => {
            const Icon = whoIcons[i] ?? Check;
            return (
              <li key={w} data-business-index={i} data-highlighted={demo.activeStep === i} className={`business-type flex min-h-11 items-center gap-3 rounded-lg border bg-card px-4 py-3 font-semibold ${demo.activeStep === i ? "business-type-active border-primary" : "border-border"}`}>
                <Icon className="size-5 shrink-0 text-primary" /> {w}
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
  const { country, ready } = useVisitorLocation();
  // Unknown country falls back to USD; never assume Colombia.
  const currency = ready ? countryCurrency(country) ?? "USD" : null;
  const demo = SITE_CONFIG.demo;
  return (
    <section className="border-y border-border bg-card">
      <div className={`${wrap} py-12 lg:py-20`}>
        <SectionTitle title={t.title} sub={t.sub} />
        <div className="grid gap-4 md:grid-cols-3">
          {t.plans.map((p, i) => {
            const featured = i === 1;
            const plan = SITE_CONFIG.plans[p.key as keyof typeof SITE_CONFIG.plans];
            const price = currency ? formatPlanPrice(plan, currency, lang) : null;
            return (
              <div key={p.id} className={`relative flex flex-col gap-4 rounded-2xl border p-6 ${featured ? "border-primary bg-primary-surface shadow-lift" : "border-border bg-background"}`}>
                {featured && <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{t.popular}</span>}
                <h3 className="text-2xl font-extrabold">{p.id}</h3>
                <p className="text-muted-foreground">{p.d}</p>
                <div className="min-h-20" aria-live="polite">
                  <p className="min-h-6 text-sm font-semibold text-muted-foreground">{plan.startingPrice ? t.from : "\u00a0"}</p>
                  <p className="flex flex-wrap items-baseline gap-x-1"><span className="font-display text-3xl font-extrabold">{price ?? t.loading}</span>{price && <span className="text-muted-foreground">{t.perMonth}</span>}</p>
                </div>
                <ul className="flex flex-1 flex-col gap-2">
                  {p.f.map((f) => (
                    <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success" /> {f}</li>
                  ))}
                </ul>
                {plan.requiresCall && <p className="text-sm text-muted-foreground">{t.callNote}</p>}
                <WhatsAppLink message={withSource(plan.requiresCall ? m.enterprise : m.plan(p.id), m.ref, `precios-${p.key}`)} className={featured ? btnPrimary : btnGhost}>
                  {plan.requiresCall ? <Phone className="size-5" /> : <WhatsAppIcon className="size-5" />} {plan.requiresCall ? t.scheduleCall : t.choose}
                </WhatsAppLink>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-dashed border-primary bg-primary-surface p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-extrabold">{t.demoTitle}</h3>
            <p className="mt-1 text-muted-foreground">{t.demoBody(demo.users, demo.inventoryItems, demo.products, demo.recipes)}</p>
          </div>
          <WhatsAppLink message={withSource(m.default, m.ref, "precios-demo")} className={btnPrimary}>
            <WhatsAppIcon className="size-5" /> {t.demoCta}
          </WhatsAppLink>
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
          <WhatsAppLink message={withSource(m.default, m.ref, "final")} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-card px-5 py-3 font-display text-lg font-bold text-primary transition hover:bg-primary-surface">
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

function Kitchen({ lang }: { lang: Lang }) {
  const t = dict[lang].kitchen;
  return (
    <section className={`${wrap} pb-12 lg:pb-20`}>
      <SectionTitle eyebrow={t.eyebrow} title={t.title} sub={t.body} />
      <KitchenBoard lang={lang} />
    </section>
  );
}

function TryCta({ lang, source }: { lang: Lang; source: string }) {
  const t = dict[lang].tryCta;
  const m = dict[lang].msg;
  return (
    <div className={`${wrap} pb-12`}>
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-xl font-bold">{t.title}</p>
        <WhatsAppLink message={withSource(m.default, m.ref, source)} className={btnPrimary}>
          <WhatsAppIcon className="size-5" /> {t.cta}
        </WhatsAppLink>
      </div>
    </div>
  );
}

function Simple({ lang }: { lang: Lang }) {
  const t = dict[lang].simple;
  return (
    <section className={`${wrap} pb-12 lg:pb-20`}>
      <SectionTitle eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[520px] text-left">
          <thead>
            <tr className="border-b border-border">
              {t.head.map((h, i) => <th key={i} scope="col" className={`p-4 font-display font-bold ${i === 1 ? "bg-primary-surface text-primary" : ""}`}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {t.rows.map(([label, ours, usual]) => (
              <tr key={label} className="border-b border-border last:border-0">
                <th scope="row" className="p-4 font-semibold">{label}</th>
                <td className="bg-primary-surface p-4 font-semibold text-primary"><span className="inline-flex items-center gap-2"><Check className="size-4 text-success" /> {ours}</span></td>
                <td className="p-4 text-muted-foreground"><span className="inline-flex items-center gap-2"><X className="size-4" /> {usual}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Trust({ lang }: { lang: Lang }) {
  const t = dict[lang].trust;
  return (
    <section className={`${wrap} py-12 lg:py-16`}>
      <div className="grid gap-6 rounded-2xl border border-border bg-card p-6 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:p-8">
        <span className="flex size-12 items-center justify-center rounded-lg bg-primary-surface text-primary"><ShieldCheck className="size-6" /></span>
        <div>
          <h2 className="text-2xl font-extrabold">{t.title}</h2>
          <p className="mt-1 text-muted-foreground">{t.body} <a href={SITE_CONFIG.company.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">{SITE_CONFIG.company.name}</a></p>
        </div>
        <ul className="flex flex-col gap-2">
          {t.items.map((x) => <li key={x} className="flex items-center gap-2 font-semibold"><Check className="size-4 text-success" /> {x}</li>)}
        </ul>
      </div>
    </section>
  );
}

function FloatingWhatsApp({ lang }: { lang: Lang }) {
  const m = dict[lang].msg;
  return (
    <WhatsAppLink message={withSource(m.default, m.ref, "flotante")} className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 inline-flex min-h-14 items-center gap-2 rounded-full bg-primary px-4 font-display font-bold text-primary-foreground shadow-lift transition hover:bg-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <WhatsAppIcon className="size-6" />
      <span className="hidden sm:inline">{dict[lang].floating}</span>
      <span className="sr-only sm:hidden">{dict[lang].floating}</span>
    </WhatsAppLink>
  );
}
