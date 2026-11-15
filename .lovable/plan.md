# Embudo de ventas listo.menu: mas mensajes por WhatsApp

## Lo que encontramos
- Todos los botones llevan a "demo por WhatsApp", pero la competencia (Fudo, Alegra, Comanda, POS Colombia) ofrece prueba gratis sin tarjeta. Pedir una demo da mas pereza que "probar gratis".
- No hay prueba social (testimonios, numeros, fundador). El correo sigue siendo provisional (hola@listo.menu).
- Precios "de referencia", que cambian con el dolar y muestran "Consultando precio..." al cargar. La competencia muestra precios fijos y redondos en pesos.
- Lo unico que nadie mas ofrece: lista de compras para ferias/eventos y funcionamiento 100% sin internet. Hoy aparecen a mitad de pagina, y el plan de produccion solo esta desde "Negocio".
- Nunca se menciona factura electronica DIAN, cierre de caja ni pagos con Nequi: son las primeras dudas del comprador colombiano.
- Ventaja de precio: Emprendedor ya incluye recetas y pantalla de cocina; Fudo cobra la cocina aparte (+38.900).

Segmentos: 1) food trucks y puestos de feria (duda: internet); 2) empanaderias/kioscos (duda: cuanto gano por plato y que comprar); 3) pequenos restaurantes (duda: DIAN y costos ocultos).

## Cambios en el sitio (en orden de impacto)
Las demos interactivas (recetas, cocina, plan de produccion, tipos de negocio) no se modifican: son la pre-demo y prueban el diferenciador "simple, sin pantallas llenas de controles". Solo se agrega texto y un boton junto a ellas.

1. **Oferta "Plan gratis para siempre, sin tarjeta"** (sin limite de tiempo, limitado en usuarios, productos y recetas; limites exactos en la configuracion central, a confirmar) como boton principal en hero, precios y cierre. Mensaje de WhatsApp prellenado con negocio, ciudad y tipo, para calificar al lead.
2. **Hero reescrito** con los diferenciadores: "Sabe que comprar para tu feria y vende aunque se caiga el internet". Franja de confianza debajo: "Sin tarjeta · Cancela cuando quieras · Hecho en Colombia por kamansoft".
3. **Precios fijos precargados**: cada plan tiene un precio COP y un precio USD en la configuracion central. Colombia ve COP, el resto USD. Se elimina el conversor de moneda y la consulta de tasa. Se agrega una tarjeta "Gratis" antes de Emprendedor. Quitar "de referencia" y "Consultando precio". Mensaje de simplicidad en hero y comparativa: "Lo que ves arriba es la app real: pocas pantallas, sin capacitaciones". Linea "Todo incluido: pantalla de cocina y recetas sin costo extra". Opcion de descuento anual (a confirmar).
4. **Tabla comparativa breve** "listo.menu vs. lo tipico" (interfaz simple para locales pequenos y medianos, cocina incluida, sin internet, lista de compras para eventos) sin nombrar marcas.
5. **Nuevas preguntas frecuentes**: "¿Emite factura electronica DIAN?" (No; listo.menu lleva operacion, inventario y compras), "¿Cobra pagos o Nequi?" (No es pasarela; pronto podras registrar como te pagaron: efectivo, bancos, Nequi, y cuadrar cajas), limites del plan gratis, cuanto tarda empezar.
6. **Seccion de confianza**: quien esta detras (kamansoft), garantia de acompanamiento y espacio para testimonios cuando existan (no inventaremos testimonios).
7. **Boton flotante de WhatsApp** siempre visible en movil y escritorio, y CTA tras cada demo interactiva ("¿Quieres esto con tus recetas? Pruebalo gratis").
8. **Medicion**: etiqueta en cada enlace de WhatsApp segun la seccion (hero, precios-plan, cocina, final) dentro del mensaje, para saber que seccion genera conversaciones.
9. Correo de contacto: kamansoft@gmail.com.
10. **Documento del modulo de pagos** en Archivos (pagos-cajas.md): cajas como entidades que reciben y envian dinero (efectivo, bancos, Nequi, etc.), registrar en cada orden que y como se pago (pagos mixtos, parciales, propinas, vueltos), movimientos entre cajas, apertura/cierre y cuadre, reportes por caja y metodo, futuras funciones (conciliacion, gastos, cuentas por cobrar, exportes). Sin pasarela de pago: solo registrar y consolidar.

## Fuera del sitio (despues de publicar)
- Publicar con dominio propio listo.menu.
- Perfil en ComparaSoftware y Capterra Colombia.
- Visitar ferias navidenas de Bogota (diciembre) y contactar Los Santos Food Trucks (Cali) y ASO Food Trucks Bogota (actividad sin verificar).
- Primeros 10 clientes por contacto directo, con mensajes que preparo.
- Guardar este plan en Archivos (marketing/plan.md).

## Necesito de ti
- Precio COP y USD de cada plan (si no, propongo 59.900/109.900/179.900 COP y mantengo 14.90/27.04/45.30 USD, marcados para confirmar).
- Limites del plan gratis (si no, propongo 1 usuario, 10 productos, 10 recetas).
- Descuento anual: no lo incluyo salvo que me digas.

## Detalles tecnicos
- Copy en src/lib/i18n.ts (es/en); precios COP fijos y dias de prueba en src/lib/site-config.ts; se eliminan la consulta a ExchangeRate-API y convertUsdToCop; formatPlanPrice elige el precio fijo segun pais.
- Nuevo componente flotante reutilizando WhatsAppLink; parametro de origen en msg.
- Actualizar tests de localizacion y site-config.
