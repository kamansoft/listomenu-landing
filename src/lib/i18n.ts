export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

const es = {
  meta: {
    title: "listo.menu — Pedidos, inventario y recetas para food trucks y kioscos",
    description: "Toma pedidos rápido, descuenta inventario automáticamente por receta y planifica tus compras. Hecho para food trucks, arepas y kioscos.",
  },
  nav: { whatsapp: "Hablar por WhatsApp", lang: "English", langCode: "en" as Lang },
  hero: {
    eyebrow: "Para food trucks, areperas y kioscos",
    title: "Tus pedidos, tu inventario y tus recetas en un solo lugar",
    body: "Vende, y listo.menu descuenta del inventario cada ingrediente que usaste. Sabe cuánto te queda, cuánto te cuesta cada plato y qué comprar mañana.",
    cta: "Quiero una demo por WhatsApp",
    email: "¿Prefieres correo? Escríbenos",
    note: "Respuesta el mismo día · Sin compromiso",
  },
  pains: {
    title: "¿Te suena familiar?",
    items: [
      { t: "Se acabó el queso en plena hora pico", d: "Nadie sabía cuánto quedaba hasta que fue tarde." },
      { t: "Compras “a ojo”", d: "Unos días sobra y se pierde; otros días falta y dejas de vender." },
      { t: "No sabes cuánto ganas por plato", d: "El precio sube, el costo cambia y la cuenta no cuadra." },
    ],
  },
  how: {
    title: "Cómo funciona",
    steps: [
      { t: "Registra tus insumos", d: "Harina, queso, pollo, salsas, empaques: todo lo que usas es inventario." },
      { t: "Une cada producto a su receta", d: "Una arepa reina pepiada usa 120 g de harina, 80 g de pollo, 50 g de aguacate." },
      { t: "Vende y olvídate", d: "Cada pedido descuenta automáticamente lo consumido. Ves tu stock real en todo momento." },
    ],
  },
  features: {
    title: "Todo lo que tu negocio necesita para servir sin parar",
    items: [
      { t: "Pedidos en segundos", d: "Pantalla rápida de toma de pedidos con cambios por unidad: sin cebolla, extra queso." },
      { t: "Pantalla de cocina", d: "La cocina ve cada plato a preparar, incluso los que vienen dentro de un combo." },
      { t: "Inventario automático", d: "El stock se descuenta por receta con cada venta o preparación, con lotes y fechas." },
      { t: "Costo y ganancia por plato", d: "La receta calcula el costo; tú ves precio, ganancia y margen." },
      { t: "Combos sin enredos", d: "Un combo es un producto hecho de otros productos. Cambia lo que quieras dentro." },
      { t: "Funciona sin internet", d: "Si se cae la conexión, los pedidos se guardan y se sincronizan al volver." },
    ],
  },
  plan: {
    eyebrow: "Plan de producción",
    title: "Dinos cuánto vas a vender y te decimos qué comprar",
    body: "Ingresa cuántas unidades planeas preparar y listo.menu calcula, con tus recetas, la cantidad exacta de ingredientes que necesitas. Pruébalo:",
    products: { reina: "Arepa reina pepiada", cheese: "Arepa de queso", empanada: "Empanada de carne" },
    ingredients: { flour: "Harina de maíz", chicken: "Pollo", avocado: "Aguacate", cheese: "Queso", beef: "Carne molida", oil: "Aceite" },
    units: "unidades",
    list: "Lista de compras",
    empty: "Agrega cantidades para ver tu lista.",
  },
  who: {
    title: "Hecho para negocios de comida pequeños y rápidos",
    items: ["Food trucks", "Areperas y kioscos", "Comida callejera", "Restaurantes pequeños", "Cocinas ocultas", "Ferias y eventos"],
  },
  pricing: {
    title: "Planes simples, sin sorpresas",
    sub: "Precios mensuales de referencia. Escríbenos y te ayudamos a elegir.",
    perMonth: "/mes",
    popular: "Más elegido",
    choose: "Elegir por WhatsApp",
    plans: [
      { id: "Emprendedor", price: "$49.000 COP", d: "Para arrancar con un punto de venta.", f: ["Toma de pedidos", "Inventario por receta", "1 dispositivo"] },
      { id: "Negocio", price: "$89.000 COP", d: "Para el negocio que ya no para.", f: ["Todo lo de Emprendedor", "Pantalla de cocina", "Plan de producción", "Hasta 4 dispositivos"] },
      { id: "Pro", price: "$149.000 COP", d: "Para equipos con más movimiento.", f: ["Todo lo de Negocio", "Roles y permisos de equipo", "Auditoría", "Dispositivos ilimitados"] },
    ],
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      { q: "¿Necesito comprar equipos especiales?", a: "No. Funciona en el celular, tablet o computador que ya tienes, desde el navegador." },
      { q: "¿Qué pasa si se va el internet?", a: "Sigues tomando pedidos. Se guardan en el dispositivo y se sincronizan cuando vuelve la conexión." },
      { q: "¿Puedo vender aunque el stock esté en cero?", a: "Sí. listo.menu te avisa, deja vender y luego ajustas el inventario." },
      { q: "¿Me ayudan a cargar mis recetas?", a: "Sí, te acompañamos en la configuración inicial por WhatsApp." },
    ],
  },
  final: { title: "¿Listo para dejar de adivinar?", body: "Cuéntanos de tu negocio y te mostramos listo.menu en 15 minutos.", cta: "Escríbenos por WhatsApp", email: "Enviar un correo" },
  footer: { rights: "Todos los derechos reservados." },
  msg: {
    default: "Hola, quiero conocer listo.menu para mi negocio de comida.",
    plan: (p: string) => `Hola, me interesa el plan ${p} de listo.menu.`,
    subject: "Quiero conocer listo.menu",
    body: "Hola, tengo un negocio de comida y quiero conocer listo.menu.\n\nNombre del negocio:\nCiudad:\nTipo de negocio:",
  },
  alt: { orders: "Pantalla de toma de pedidos de listo.menu", inventory: "Inventario de ingredientes en listo.menu", truck: "Dueño de un food truck de arepas usando una tablet" },
};

export type Dict = typeof es;

const en: Dict = {
  meta: {
    title: "listo.menu — Orders, inventory and recipes for food trucks and kiosks",
    description: "Take orders fast, deduct inventory automatically by recipe and plan your purchases. Built for food trucks, arepa stands and kiosks.",
  },
  nav: { whatsapp: "Chat on WhatsApp", lang: "Español", langCode: "es" },
  hero: {
    eyebrow: "For food trucks, arepa stands and kiosks",
    title: "Your orders, stock and recipes in one place",
    body: "Sell, and listo.menu deducts every ingredient you used from inventory. Know what's left, what each dish costs and what to buy tomorrow.",
    cta: "Get a demo on WhatsApp",
    email: "Prefer email? Write to us",
    note: "Same-day reply · No commitment",
  },
  pains: {
    title: "Sound familiar?",
    items: [
      { t: "Out of cheese at rush hour", d: "Nobody knew how much was left until it was too late." },
      { t: "Buying by gut feeling", d: "Some days it goes to waste; other days you run out and lose sales." },
      { t: "No idea what each dish earns", d: "Prices rise, costs change and the numbers never add up." },
    ],
  },
  how: {
    title: "How it works",
    steps: [
      { t: "Add your supplies", d: "Flour, cheese, chicken, sauces, packaging: everything you use is inventory." },
      { t: "Link each product to a recipe", d: "A chicken-avocado arepa uses 120 g flour, 80 g chicken, 50 g avocado." },
      { t: "Sell and relax", d: "Each order automatically deducts what was used. Your real stock, always." },
    ],
  },
  features: {
    title: "Everything your business needs to keep serving",
    items: [
      { t: "Orders in seconds", d: "A fast order screen with per-unit changes: no onion, extra cheese." },
      { t: "Kitchen screen", d: "The kitchen sees every dish to prepare, even those inside a combo." },
      { t: "Automatic inventory", d: "Stock is deducted by recipe on every sale or prep, with dated batches." },
      { t: "Cost and profit per dish", d: "Recipes compute cost; you see price, profit and margin." },
      { t: "Combos made simple", d: "A combo is a product made of other products. Change anything inside." },
      { t: "Works offline", d: "If the connection drops, orders are saved and synced when it's back." },
    ],
  },
  plan: {
    eyebrow: "Production plan",
    title: "Tell us what you'll sell, we'll tell you what to buy",
    body: "Enter how many units you plan to make and listo.menu uses your recipes to calculate the exact ingredients you need. Try it:",
    products: { reina: "Chicken-avocado arepa", cheese: "Cheese arepa", empanada: "Beef empanada" },
    ingredients: { flour: "Corn flour", chicken: "Chicken", avocado: "Avocado", cheese: "Cheese", beef: "Ground beef", oil: "Oil" },
    units: "units",
    list: "Shopping list",
    empty: "Add quantities to see your list.",
  },
  who: {
    title: "Built for small, fast food businesses",
    items: ["Food trucks", "Arepa stands & kiosks", "Street food", "Small restaurants", "Ghost kitchens", "Fairs & events"],
  },
  pricing: {
    title: "Simple plans, no surprises",
    sub: "Reference monthly prices. Message us and we'll help you choose.",
    perMonth: "/mo",
    popular: "Most popular",
    choose: "Choose on WhatsApp",
    plans: [
      { id: "Starter", price: "$49,000 COP", d: "To get going with one point of sale.", f: ["Order taking", "Recipe-based inventory", "1 device"] },
      { id: "Business", price: "$89,000 COP", d: "For the business that never stops.", f: ["Everything in Starter", "Kitchen screen", "Production plan", "Up to 4 devices"] },
      { id: "Pro", price: "$149,000 COP", d: "For busier teams.", f: ["Everything in Business", "Team roles & permissions", "Audit log", "Unlimited devices"] },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      { q: "Do I need special hardware?", a: "No. It runs in the browser on the phone, tablet or computer you already have." },
      { q: "What if the internet goes down?", a: "Keep taking orders. They're stored on the device and synced when you're back online." },
      { q: "Can I sell when stock is at zero?", a: "Yes. listo.menu warns you, lets the sale through, and you reconcile later." },
      { q: "Will you help me load my recipes?", a: "Yes, we guide your initial setup over WhatsApp." },
    ],
  },
  final: { title: "Ready to stop guessing?", body: "Tell us about your business and we'll show you listo.menu in 15 minutes.", cta: "Message us on WhatsApp", email: "Send an email" },
  footer: { rights: "All rights reserved." },
  msg: {
    default: "Hi, I'd like to learn about listo.menu for my food business.",
    plan: (p: string) => `Hi, I'm interested in the listo.menu ${p} plan.`,
    subject: "I'd like to learn about listo.menu",
    body: "Hi, I run a food business and I'd like to learn about listo.menu.\n\nBusiness name:\nCity:\nType of business:",
  },
  alt: { orders: "listo.menu order-taking screen", inventory: "Ingredient inventory in listo.menu", truck: "Arepa food truck owner using a tablet" },
};

export const dict: Record<Lang, Dict> = { es, en };
