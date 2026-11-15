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
1. **Oferta "Prueba gratis 14 dias, sin tarjeta, te lo configuramos por WhatsApp"** como boton principal en hero, precios y cierre. Mensaje de WhatsApp prellenado con negocio, ciudad y tipo, para calificar al lead.
2. **Hero reescrito** con los diferenciadores: "Sabe que comprar para tu feria y vende aunque se caiga el internet". Franja de confianza debajo: "Sin tarjeta · Cancela cuando quieras · Hecho en Colombia por kamansoft".
3. **Precios fijos y redondos en pesos para Colombia** (ej. 59.900 / 109.900 / 179.900, a confirmar) guardados en la configuracion central; USD para el resto. Quitar "de referencia" y el estado de carga. Linea "Todo incluido: pantalla de cocina y recetas sin costo extra". Opcion de descuento anual (a confirmar).
4. **Tabla comparativa breve** "listo.menu vs. lo tipico" (cocina incluida, sin internet, lista de compras para eventos) sin nombrar marcas.
5. **Nuevas preguntas frecuentes**: factura electronica DIAN (respuesta honesta segun lo que hace la app), cierre de caja, pagos Nequi/tarjeta, que pasa al terminar la prueba, cuanto tarda empezar.
6. **Seccion de confianza**: quien esta detras (kamansoft), garantia de acompanamiento y espacio para testimonios cuando existan (no inventaremos testimonios).
7. **Boton flotante de WhatsApp** siempre visible en movil y escritorio, y CTA tras cada demo interactiva ("¿Quieres esto con tus recetas? Pruebalo gratis").
8. **Medicion**: etiqueta en cada enlace de WhatsApp segun la seccion (hero, precios-plan, cocina, final) dentro del mensaje, para saber que seccion genera conversaciones.
9. Reemplazar el correo provisional por el real.

## Fuera del sitio (despues de publicar)
- Publicar con dominio propio listo.menu.
- Perfil en ComparaSoftware y Capterra Colombia.
- Visitar ferias navidenas de Bogota (diciembre) y contactar Los Santos Food Trucks (Cali) y ASO Food Trucks Bogota (actividad sin verificar).
- Primeros 10 clientes por contacto directo, con mensajes que preparo.
- Guardar este plan en Archivos (marketing/plan.md).

## Necesito de ti
- ¿Ofreces prueba gratis? ¿Cuantos dias?
- Precios fijos en pesos y si hay descuento anual.
- ¿La app emite factura electronica DIAN? ¿Acepta Nequi?
- Correo real de contacto.
Si no respondes, uso 14 dias, precios a confirmar marcados como provisionales, y la FAQ DIAN dira "consultanos".

## Detalles tecnicos
- Copy en src/lib/i18n.ts (es/en); precios COP fijos y dias de prueba en src/lib/site-config.ts; formatPlanPrice usa COP fijo para CO sin tasa.
- Nuevo componente flotante reutilizando WhatsAppLink; parametro de origen en msg.
- Actualizar tests de localizacion y site-config.
