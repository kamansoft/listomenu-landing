import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { BrandLockup } from "@/components/brand/logo";
import { useVisitorLocation } from "@/components/landing/VisitorLocation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "listo.menu — Pedidos e inventario para negocios de comida" },
      { name: "description", content: "Sistema de pedidos e inventario por receta para food trucks, areperas y kioscos. Order and inventory system for small food businesses." },
      { property: "og:title", content: "listo.menu — Pedidos e inventario para negocios de comida" },
      { property: "og:description", content: "Pedidos, inventario automático por receta y plan de producción para food trucks y kioscos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "alternate", hrefLang: "es", href: "/es" },
      { rel: "alternate", hrefLang: "en", href: "/en" },
    ],
  }),
  component: LanguageGate,
});

// Prerender a stable fallback, then choose the language using the visitor's country.
function LanguageGate() {
  const navigate = useNavigate();
  const { ready, preferredLanguage } = useVisitorLocation();
  useEffect(() => {
    if (ready) void navigate({ to: "/$lang", params: { lang: preferredLanguage }, replace: true });
  }, [navigate, ready, preferredLanguage]);
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-background p-4">
      <BrandLockup />
      <div className="flex gap-2">
        <Link to="/$lang" params={{ lang: "es" }} className="inline-flex min-h-11 items-center rounded-md bg-primary px-4 font-semibold text-primary-foreground">Español</Link>
        <Link to="/$lang" params={{ lang: "en" }} className="inline-flex min-h-11 items-center rounded-md border border-border bg-card px-4 font-semibold">English</Link>
      </div>
    </main>
  );
}
