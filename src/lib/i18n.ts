export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

const es = {
  meta: {
    title: "listo.menu — Comandas, cocina, inventario y compras para negocios de comida",
    description: "Lleva la comanda, organiza la cocina en un tablero, descuenta inventario por receta y sabe qué comprar para tus ventas y eventos. Para food trucks, empanaderías y kioscos.",
  },
  nav: { whatsapp: "Hablar por WhatsApp", lang: "English", langCode: "en" as Lang },
  hero: {
    eyebrow: "Para food trucks, empanaderías y kioscos",
    title: "De la comanda a la cocina, y sabiendo qué comprar",
    body: "Lleva tus órdenes de venta, mándalas a un tablero de cocina y deja que listo.menu descuente del inventario cada ingrediente usado. Y lo más importante: planifica tus ventas y eventos sabiendo exactamente qué y cuánto comprar.",
    cta: "Quiero una demo por WhatsApp",
    email: "¿Prefieres correo? Escríbenos",
    note: "Respuesta el mismo día · Sin compromiso",
  },
  pains: {
    title: "¿Te suena familiar?",
    items: [
      { t: "Se acabó el relleno en plena hora pico", d: "Nadie sabía cuánta carne mechada quedaba hasta que fue tarde." },
      { t: "Compras “a ojo” para el evento", d: "Una feria el sábado y no sabes cuánta carne, harina o queso comprar. O sobra, o falta." },
      { t: "No sabes cuánto ganas por plato", d: "El precio sube, el costo cambia y la cuenta no cuadra." },
    ],
  },
  how: {
    title: "Cómo funciona",
    steps: [
      { t: "Registra tus insumos", d: "Harina, carne, pollo, queso, ajo, empaques: todo lo que usas es inventario." },
      { t: "Une cada producto a su receta", d: "Una empanada de carne mechada lleva 60 g de masa y 50 g de relleno. Y el relleno tiene su propia receta: carne, cebolla, pimentón y ajo." },
      { t: "Toma la comanda y cocina", d: "Cada orden llega al tablero de cocina y descuenta automáticamente lo consumido. Ves tu stock real en todo momento." },
    ],
  },
  features: {
    title: "Todo lo que tu negocio necesita para servir sin parar",
    items: [
      { t: "Comandas en segundos", d: "Lleva las órdenes de venta con cambios por unidad: sin cebolla, extra queso, para llevar." },
      { t: "Cocina en tablero (kanban)", d: "Cada ítem de la orden es una tarjeta que avanza: pendiente, en preparación, listo." },
      { t: "Inventario automático", d: "El stock se descuenta por receta con cada venta o preparación, con lotes y fechas." },
      { t: "Costo y ganancia por plato", d: "La receta calcula el costo; tú ves precio, ganancia y margen." },
      { t: "Recetas dentro de recetas", d: "Rellenos, salsas y masas son preparaciones con su propia receta. Combos también." },
      { t: "Funciona sin internet", d: "Si se cae la conexión, los pedidos se guardan y se sincronizan al volver." },
    ],
  },
  kitchen: {
    eyebrow: "Cocina",
    title: "Tu cocina en un tablero, ítem por ítem",
    body: "Cada orden se divide en sus ítems y cada uno avanza por columnas. La cocina ve trabajo, no combos.",
    cols: ["Pendiente", "En preparación", "Listo"],
    cards: [["#14 · 2× Empanada de carne mechada", "#15 · 1× Empanada de queso"], ["#13 · 3× Empanada de pollo · sin cebolla"], ["#12 · 1× Empanada de carne mechada"]],
  },
  plan: {
    eyebrow: "Plan de producción · Lo más importante",
    title: "Planifica tus ventas y eventos: sabe qué comprar y cuánto",
    body: "¿Feria el sábado o la semana de quincena? Ingresa cuántas empanadas planeas vender y listo.menu recorre tus recetas —incluido el relleno— y te da la lista exacta de compras. Pruébalo:",
    products: { beef: "Empanada de carne mechada", chicken: "Empanada de pollo", cheese: "Empanada de queso" },
    ingredients: { flour: "Harina", oil: "Aceite", beef: "Carne de res", onion: "Cebolla", pepper: "Pimentón", garlic: "Ajo", chicken: "Pollo", cheese: "Queso" },
    note: "Incluye la masa y los rellenos: la carne mechada lleva carne, cebolla, pimentón y ajo.",
    units: "unidades",
    list: "Lista de compras",
    empty: "Agrega cantidades para ver tu lista.",
  },
  who: {
    title: "Hecho para negocios de comida pequeños y rápidos",
    items: ["Food trucks", "Empanaderías y kioscos", "Comida callejera", "Restaurantes pequeños", "Cocinas ocultas", "Ferias y eventos"],
  },
  pricing: {
    title: "Planes simples, sin sorpresas",
    sub: "Precios mensuales de referencia. Escríbenos y te ayudamos a elegir.",
    perMonth: "/mes",
    popular: "Más elegido",
    choose: "Elegir por WhatsApp",
    plans: [
      { id: "Emprendedor", price: "$49.000 COP", d: "Para arrancar con un punto de venta.", f: ["3 dispositivos y 3 usuarios", "3 roles: mesero (crea órdenes), cocinero y administrador", "Comandas e inventario por receta", "Pantalla de cocina"] },
      { id: "Negocio", price: "$89.000 COP", d: "Para el negocio que ya no para.", f: ["Todo lo de Emprendedor", "10 dispositivos y 10 usuarios", "Plan de producción y lista de compras"] },
      { id: "Pro", price: "$149.000 COP", d: "Para equipos con más movimiento.", f: ["Todo lo de Negocio", "Dispositivos y usuarios ilimitados", "Roles y permisos de equipo a medida", "Auditoría", "Instalación de un pequeño servidor en tu local: funciona 100% sin internet", "Configuración de impresora tickera para órdenes y cocina (impresoras se cobran aparte)"] },
    ],
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      { q: "¿Necesito comprar equipos especiales?", a: "No. Funciona en el celular, tablet o computador que ya tienes, desde el navegador." },
      { q: "¿Qué pasa si se va el internet?", a: "Sigues tomando pedidos. Se guardan en el dispositivo y se sincronizan cuando vuelve la conexión." },
      { q: "¿Puedo vender aunque el stock esté en cero?", a: "Sí. listo.menu te avisa, deja vender y luego ajustas el inventario." },
      { q: "¿Sirve para planear un evento o feria?", a: "Sí. Ingresas cuánto esperas vender y obtienes la lista de ingredientes a comprar, según tus recetas." },
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
  alt: { orders: "Pantalla de toma de pedidos de listo.menu", inventory: "Inventario de ingredientes en listo.menu", truck: "Dueña de un puesto de empanadas usando una tablet en una feria" },
};

export type Dict = typeof es;

const en: Dict = {
  meta: {
    title: "listo.menu — Orders, kitchen board, inventory and purchasing for food businesses",
    description: "Take orders, run the kitchen on a board, deduct inventory by recipe and know what to buy for your sales and events. For food trucks, empanada stands and kiosks.",
  },
  nav: { whatsapp: "Chat on WhatsApp", lang: "Español", langCode: "es" },
  hero: {
    eyebrow: "For food trucks, empanada stands and kiosks",
    title: "From order ticket to kitchen, knowing what to buy",
    body: "Take sales orders, send them to a kitchen board and let listo.menu deduct every ingredient used from inventory. Most importantly: plan your sales and events knowing exactly what and how much to buy.",
    cta: "Get a demo on WhatsApp",
    email: "Prefer email? Write to us",
    note: "Same-day reply · No commitment",
  },
  pains: {
    title: "Sound familiar?",
    items: [
      { t: "Out of filling at rush hour", d: "Nobody knew how much shredded beef was left until it was too late." },
      { t: "Guessing purchases for an event", d: "A fair on Saturday and no idea how much beef, flour or cheese to buy." },
      { t: "No idea what each dish earns", d: "Prices rise, costs change and the numbers never add up." },
    ],
  },
  how: {
    title: "How it works",
    steps: [
      { t: "Add your supplies", d: "Flour, beef, chicken, cheese, garlic, packaging: everything you use is inventory." },
      { t: "Link each product to a recipe", d: "A shredded-beef empanada uses 60 g dough and 50 g filling. The filling has its own recipe: beef, onion, pepper and garlic." },
      { t: "Take the order and cook", d: "Each order lands on the kitchen board and deducts what was used. Your real stock, always." },
    ],
  },
  features: {
    title: "Everything your business needs to keep serving",
    items: [
      { t: "Orders in seconds", d: "Take sales orders with per-unit changes: no onion, extra cheese, to go." },
      { t: "Kitchen kanban board", d: "Each order item is a card that moves: to do, cooking, ready." },
      { t: "Automatic inventory", d: "Stock is deducted by recipe on every sale or prep, with dated batches." },
      { t: "Cost and profit per dish", d: "Recipes compute cost; you see price, profit and margin." },
      { t: "Recipes inside recipes", d: "Fillings, sauces and doughs are preparations with their own recipe. Combos too." },
      { t: "Works offline", d: "If the connection drops, orders are saved and synced when it's back." },
    ],
  },
  kitchen: {
    eyebrow: "Kitchen",
    title: "Your kitchen on a board, item by item",
    body: "Each order splits into its items and each one moves across columns. The kitchen sees work, not combos.",
    cols: ["To do", "Cooking", "Ready"],
    cards: [["#14 · 2× Shredded-beef empanada", "#15 · 1× Cheese empanada"], ["#13 · 3× Chicken empanada · no onion"], ["#12 · 1× Shredded-beef empanada"]],
  },
  plan: {
    eyebrow: "Production plan · The most important part",
    title: "Plan your sales and events: know what and how much to buy",
    body: "A fair on Saturday or a busy payday week? Enter how many empanadas you expect to sell and listo.menu walks your recipes — fillings included — to give you the exact shopping list. Try it:",
    products: { beef: "Shredded-beef empanada", chicken: "Chicken empanada", cheese: "Cheese empanada" },
    ingredients: { flour: "Flour", oil: "Oil", beef: "Beef", onion: "Onion", pepper: "Bell pepper", garlic: "Garlic", chicken: "Chicken", cheese: "Cheese" },
    note: "Includes dough and fillings: shredded beef needs beef, onion, pepper and garlic.",
    units: "units",
    list: "Shopping list",
    empty: "Add quantities to see your list.",
  },
  who: {
    title: "Built for small, fast food businesses",
    items: ["Food trucks", "Empanada stands & kiosks", "Street food", "Small restaurants", "Ghost kitchens", "Fairs & events"],
  },
  pricing: {
    title: "Simple plans, no surprises",
    sub: "Reference monthly prices. Message us and we'll help you choose.",
    perMonth: "/mo",
    popular: "Most popular",
    choose: "Choose on WhatsApp",
    plans: [
      { id: "Starter", price: "$49,000 COP", d: "To get going with one point of sale.", f: ["3 devices and 3 users", "3 roles: waiter (creates orders), cook and restaurant admin", "Orders and recipe-based inventory", "Kitchen screen"] },
      { id: "Business", price: "$89,000 COP", d: "For the business that never stops.", f: ["Everything in Starter", "10 devices and 10 users", "Production plan and shopping list"] },
      { id: "Pro", price: "$149,000 COP", d: "For busier teams.", f: ["Everything in Business", "Unlimited devices and users", "Custom team roles & permissions", "Audit log", "Small on-site server installed at your business: works 100% without internet", "Ticket printer setup for orders and kitchen (printers sold separately)"] },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      { q: "Do I need special hardware?", a: "No. It runs in the browser on the phone, tablet or computer you already have." },
      { q: "What if the internet goes down?", a: "Keep taking orders. They're stored on the device and synced when you're back online." },
      { q: "Can I sell when stock is at zero?", a: "Yes. listo.menu warns you, lets the sale through, and you reconcile later." },
      { q: "Can I use it to plan an event or fair?", a: "Yes. Enter how much you expect to sell and get the ingredient shopping list from your recipes." },
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
  alt: { orders: "listo.menu order-taking screen", inventory: "Ingredient inventory in listo.menu", truck: "Empanada stand owner using a tablet at a street fair" },
};

export const dict: Record<Lang, Dict> = { es, en };
