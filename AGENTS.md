<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Landing site is fully static: every page is prerendered via `pages` in vite.config.ts (add new language/page paths there); no backend. Why: served as static HTML on Cloudflare.
- Languages live under `/$lang` (es|en) with all copy in `src/lib/i18n.ts`; brand lockup/tokens mirror the listomenu-gui app. Why: keep the site multilingual and visually coherent with the app.
- Resolve visitor localization in a shared client-effect provider using Cloudflare's CORS trace and fetch daily USD-to-COP rates from ExchangeRate-API only when conversion is needed; never invent a country or exchange rate. Why: preserve static prerendering and keep USD prices available without rate-service dependency.
- Keep public prices, contact details, and company links in `src/lib/site-config.ts`; translations reference stable plan keys and contact helpers derive the dialable number from its single display value. Why: each setting changes in one place across languages and links.
- Keep interactive landing examples in focused client components with a shared one-shot viewport demo hook; cancel timers on visitor interaction and skip autoplay for reduced motion. Why: demos teach through motion without overriding user input or changing static prerendering.
