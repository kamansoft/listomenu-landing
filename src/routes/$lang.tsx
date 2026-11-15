import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { dict, isLang } from "@/lib/i18n";
import { Landing } from "@/components/landing/Landing";
import { useVisitorLocation } from "@/components/landing/VisitorLocation";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => {
    const t = isLang(params.lang) ? dict[params.lang] : dict.es;
    return {
      meta: [
        { title: t.meta.title },
        { name: "description", content: t.meta.description },
        { property: "og:title", content: t.meta.title },
        { property: "og:description", content: t.meta.description },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: params.lang === "en" ? "en_US" : "es_CO" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "alternate", hrefLang: "es", href: "/es" },
        { rel: "alternate", hrefLang: "en", href: "/en" },
        { rel: "alternate", hrefLang: "x-default", href: "/es" },
      ],
    };
  },
  component: LangPage,
});

function LangPage() {
  const { lang } = Route.useParams();
  const navigate = useNavigate();
  const { ready, preferredLanguage } = useVisitorLocation();
  useEffect(() => {
    if (ready && lang !== preferredLanguage) {
      void navigate({ to: "/$lang", params: { lang: preferredLanguage }, replace: true });
    }
  }, [ready, lang, preferredLanguage, navigate]);
  return isLang(lang) ? <Landing lang={ready ? preferredLanguage : lang} /> : null;
}
