import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/lib/i18n";
import { countryLanguage, parseCountryTrace } from "@/lib/localization";

type VisitorLocation = {
  country: string | null;
  ready: boolean;
  languageOverride: Lang | null;
  chooseLanguage: (lang: Lang) => void;
};

const VisitorContext = createContext<VisitorLocation>({
  country: null, ready: false, languageOverride: null, chooseLanguage: () => {},
});

export function VisitorLocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Omit<VisitorLocation, "chooseLanguage" | "languageOverride">>({
    country: null, ready: false,
  });
  const [languageOverride, setLanguageOverride] = useState<Lang | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function detect() {
      let country: string | null = null;
      try {
        const response = await fetch("https://www.cloudflare.com/cdn-cgi/trace", {
          credentials: "omit", signal: AbortSignal.any([controller.signal, AbortSignal.timeout(6000)]),
        });
        if (!response.ok) throw new Error("Country detection unavailable");
        country = parseCountryTrace(await response.text());
      } catch {
        // Unknown country must not be assumed to be Colombia or priced in COP.
      }
      if (controller.signal.aborted) return;
      setLocation({ country, ready: true });
    }
    void detect();
    return () => controller.abort();
  }, []);

  return <VisitorContext.Provider value={{ ...location, languageOverride, chooseLanguage: setLanguageOverride }}>{children}</VisitorContext.Provider>;
}

export function useVisitorLocation() {
  const location = useContext(VisitorContext);
  return {
    ...location,
    preferredLanguage: location.country === "CO" ? "es" as const : location.languageOverride ?? countryLanguage(location.country),
  };
}