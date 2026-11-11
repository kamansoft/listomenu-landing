# listo.menu sales landing page

A static, multilingual landing page that sells listo.menu subscriptions to small food businesses (food trucks, arepa kiosks, street food stands) and sends visitors to a WhatsApp chat (WhatsApp Web on desktop) or email.

## Look and feel (matched to the listo.menu app)
- Same logo: the receipt-with-check icon plus the two-line "Listo / .menu" wordmark (with the check-o), as one 44px-tall lockup, copied from the app.
- Same fonts (Urbanist for headings, Epilogue for text) and the app's teal colors on a soft off-white background.
- App spacing rules: 4px rhythm, 32/24/16px page margins, content max 1440px, buttons at least 44px tall, respects phone safe areas.

## Languages
- Spanish at `/es/...`, English at `/en/...`; `/` redirects to Spanish (or the browser's language). Language switch in the header. Each language page has its own title and description for search engines.

## Page sections (one funnel page per language)
1. Header: logo, language switch, "Talk on WhatsApp" button.
2. Hero: "Your orders, stock and recipes in one place" for food trucks and kiosks; main WhatsApp button + "Prefer email?" link; app mockup.
3. Pain points: guessing stock, running out mid-service, not knowing real cost per dish.
4. How it works (3 steps): create ingredients, link each product to a recipe, sell — stock is discounted automatically.
5. Features: fast order taking, kitchen screen, automatic inventory discount, recipes with cost and profit, combos, works offline.
6. Production plan: enter how many products you plan to make/sell and get the shopping list of ingredients needed (with a small interactive demo calculator using sample arepa recipes).
7. Who it's for: food trucks, arepa kiosks, street food, small restaurants.
8. Pricing: plan cards — placeholder plans and prices until you send the real ones, each with a WhatsApp button that pre-fills the chosen plan.
9. FAQ.
10. Final call to action + footer with WhatsApp and email.

## Contact flow
- WhatsApp: +57 313 808 9642. Desktop opens WhatsApp Web, phones open the WhatsApp app, with a pre-written message in the visitor's language (and plan name when chosen).
- Email: a simple "mailto" link with a pre-filled subject. You need to give me the email address — I'll use a placeholder until then.

## Images
- Generated app mockups (order screen, inventory, recipe, production plan) in the app's style, easy to swap for real screenshots later.

## Pending from you
- Real plans and prices.
- Contact email.

## Technical details
- Static site on Vite + React (TanStack Start template already in project), prerendered so every page is plain HTML suitable for Cloudflare Workers/Pages; no backend, no database.
- Routes: `src/routes/index.tsx` (language redirect), `src/routes/$lang.tsx` (validated `es|en`, with head() per language, hreflang links). Copy in a typed `i18n` dictionary file.
- Brand components (`LogoMark`, `CheckO`, `Wordmark`) and design tokens copied from the listomenu-gui project into `src/components/brand` and `src/styles.css`; fonts loaded via link in `__root.tsx`.
- Small tests for the WhatsApp link builder (number, web vs app URL, prefilled message) and the production-plan quantity calculation.
