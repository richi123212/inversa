# INVERSA — Tecnología en movimiento

Sitio existente en React 18, TypeScript, React Router, Vite y Tailwind. Conserva catálogo y administración Firebase. Las tecnologías PHP, JavaScript, Bootstrap, HTML, AJAX y MySQL mostradas en las propuestas corresponden al stack de los proyectos de los clientes.

## Desarrollo y comprobaciones

- Instalar: npm ci
- Desarrollo: npm run dev
- Producción: npm run build
- Vista previa: npm run preview
- Análisis estático: npm run lint (TypeScript y reglas locales de sintaxis, debugger/eval y separación de secretos; sin dependencias adicionales).
- Pruebas de cálculo y seguridad de pagos: npm test
- Navegador: tests/browser.mjs, con Playwright disponible y PLAYWRIGHT_MODULE apuntando a su index.mjs si no se encuentra en node_modules. CHROME_PATH permite elegir el ejecutable. Recorre 375, 768 y 1440 px, sin enviar datos a servicios externos; genera evidencias en test-results/.

Vite y su preview sirven el frontend. Para ejecutar también los endpoints locales usa un entorno Node de Vercel (vercel dev); los endpoints están en api/*.mjs y api/webhooks/payments.mjs. Un servidor estático por sí solo no procesa pagos.

## Rutas

Inicio /, /tienda, /desarrollo, /cotizador, /perfil-corporativo, /contacto, /login y /admin.
Legales: /aviso-de-privacidad, /terminos-y-condiciones, /tienda/terminos-de-venta, /tienda/devoluciones-y-garantias y /desarrollo/terminos-de-servicio.
Retornos de pago: /pago/exito, /pago/error y /pago/pendiente. Una URL de retorno nunca cambia el estado del pago.
El sitemap se genera desde las rutas públicas y los comentarios del Markdown al ejecutar el build.

## Datos de empresa y textos legales

Edita únicamente src/data/company.ts para nombre, misión, visión, valores, proceso, cobertura, contactos y datos institucionales. Los null aparecen como Información pendiente; WhatsApp se oculta hasta completar company.whatsapp con código de país. No se usan números de ejemplo como destinatarios.

Campos que siguen en null:
razonSocial, rfc, domicilioFiscal, telefono, whatsapp, correoContacto, correoPrivacidad, correoFacturacion, correoSoporte, horario, responsableDatos, coberturaEnvios, diasEntrega, envioGratisDesde, diasReembolso, anticipoPct, avancePct, finalPct, rondasAjustes, diasRevision, diasGarantiaSoftware, diasAvisoMantenimiento, fechaConstitucion, representanteLegal, equipoTecnico, marcasComercializadas, garantiasSoporte, certificaciones, transferencias, enviosNacionales.
Los tres elementos de company.casos también están pendientes.

content/legal/INVERSA_legales.md es la única fuente de los cinco documentos legales, copiada sin reescritura del archivo proporcionado. Las secciones ## y los comentarios ruta definen páginas; ### define el índice. LegalPage convierte el subconjunto de Markdown usado por el documento en elementos React (sin ejecutar HTML). Su mapa asocia cada marcador con company.ts; los marcadores sin etiqueta se resuelven por página y orden. Si agregas o reordenas marcadores genéricos, actualiza genericFields en LegalPage.tsx. Un null conserva el marcador original y lo destaca con aviso ámbar.
El PDF corporativo se debe subir como public/docs/INVERSA_Perfil_Corporativo_2026.pdf. Sin archivo servido como application/pdf el botón indica PDF próximamente.

## Cotizador

src/data/quoteConfig.ts contiene los 14 pasos, opciones, íconos, descripciones, precios, días, dependencias requires, paletas, stack, IVA y vigencia. Cambia price y days para ajustar las referencias; monthly se cobra por separado; surcharge y timeFactor controlan la entrega. El cálculo suma base y opciones, aplica recargo, después IVA 16%, y redondea días hacia arriba. No suma mantenimiento al total.

El avance se conserva en localStorage con la clave inversa.quote.v1 (sin datos del cliente). Al recargar se ofrece restaurar o reiniciar. Enter avanza y Escape regresa; los requisitos de MySQL y usuarios se agregan automáticamente, y al desmarcarlos se quitan sus dependientes.
La propuesta se obtiene con la impresión del navegador: Descargar propuesta PDF abre Imprimir / Guardar como PDF. Incluye logotipo, folio, fecha, datos del cliente, selección, precios, IVA, vigencia y leyenda. El QR de la maqueta codifica el nombre en UTF-8; el nombre se limita a 40 caracteres.

El envío está desacoplado en src/services/quoteSubmission.ts. Sin VITE_QUOTE_ENDPOINT devuelve éxito de prueba claramente identificado. Para un envío real configura un endpoint que admita el payload y responda 2xx; no existe un endpoint previo compatible con el nuevo esquema. El contacto conserva el servicio existente createOrder; distingue entre registro en Firestore y guardado local de respaldo. Las propuestas no se transmiten silenciosamente al crear la estimación.

El cotizador anterior conserva todos sus archivos y sólo está disponible en /legacy/cotizador con VITE_LEGACY_QUOTER=true y un nuevo build.

## Chatbot y cookies

src/config/features.ts mantiene chatbot: { enabled: false, testMode: true }.
Producción: apagado por defecto, sin montar widget ni importar su JS/FAQ.
Pruebas: ?chatbot=test activa la sesión (sessionStorage inversa.chatbot.test). Para apagar esa sesión elimina esa clave o cierra la pestaña. En desarrollo está activo. El encabezado muestra BETA / En pruebas.
Reactivar globalmente: enabled: true o VITE_CHATBOT_ENABLED=true y reconstruir.

Las cookies ofrecen Aceptar o Solo necesarias y conservan la elección en inversa.cookies. No hay ningún script de analítica cargado. Una futura integración debe leer esta preferencia antes de importar su SDK; el evento inversa:consent comunica cambios. El banner se mantiene en el flujo del documento y no tapa botones.

## Pagos externos: configurar primero en prueba

No hay campos de tarjeta, titular, vencimiento, CVV ni mensualidades en el checkout. Stripe Checkout y Mercado Pago Checkout Pro alojan la captura. La interfaz PaymentProvider y sus implementaciones están en server/providers.mjs; no se agregaron SDKs.

Variables del servidor, detalladas en .env.example:
- PAYMENT_PROVIDER=none | stripe | mercadopago. none es el valor inicial.
- PAYMENT_TEST_MODE=true para usar sandbox_init_point en Mercado Pago. Stripe usa llaves sk_test_.
- APP_URL: origen HTTPS público del entorno, sin barra final.
- FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY: cuenta de servicio con permisos de Firestore. La clave puede usar saltos escapados \n.
- STRIPE_SECRET_KEY y STRIPE_WEBHOOK_SECRET, o MP_ACCESS_TOKEN y MP_WEBHOOK_SECRET.
Nunca dar prefijo VITE_ a secretos. Las variables VITE_FIREBASE_* del navegador son configuración pública distinta.

Flujo:
1. GET /api/checkout informa disponibilidad. Sin proveedor, credenciales, URL o secreto de webhook, el pago está deshabilitado.
2. POST /api/orders recibe IDs, cantidades, contacto, dirección y consentimiento; ignora precios del navegador. Consulta productos activos y stock en Firestore productos, calcula centavos en servidor y crea checkout_orders. No usa el catálogo local de demostración para cobrar.
3. Regresa folio y un token aleatorio por pedido, conservado en sessionStorage. En Firestore sólo se guarda el hash.
4. POST /api/checkout exige folio y Authorization: Bearer <token>, vuelve a validar el catálogo y crea la sesión externa con referencias e idempotencia. Si cambiaron precios se exige crear un pedido nuevo.
5. POST /api/webhooks/payments valida firma, tiempo, monto, moneda y referencia, y actualiza paymentStatus: pagado, rechazado o pendiente con control de concurrencia. Un pago confirmado no se degrada con eventos tardíos. GET /api/orders?folio=... permite consultar sólo con el token del pedido.

Configura el webhook HTTPS /api/webhooks/payments en el dashboard del proveedor:
- Stripe: checkout.session.completed, checkout.session.async_payment_succeeded, checkout.session.async_payment_failed y checkout.session.expired. Usa el secreto del endpoint correcto.
- Mercado Pago: eventos payment; se valida x-signature y x-request-id y se consulta /v1/payments/{id} para obtener el estado autorizado.
- Mantener el cuerpo original para Stripe: el endpoint deshabilita bodyParser.
- Los retornos consultan el servidor y muestran pendiente mientras no exista confirmación por webhook.

Publica y revisa firestore.rules antes de habilitar cobros: checkout_orders debe estar bloqueada a clientes web; el servidor accede mediante IAM. No combines esta regla con otra regla global permisiva, ya que Firestore concede acceso si cualquiera coincide. Las escrituras administrativas de productos/categorías requieren un usuario Firebase con claim admin=true; el login de demostración previo no concede permisos de backend.
La colección checkout_orders es independiente de la colección pedidos del administrador anterior; los pagos nuevos no aparecen en ese listado anterior. Se consultan en Firestore y mediante el endpoint autenticado. No se altera la autorización previa del administrador.

Antes de producción: verifica en el entorno de prueba un pago aprobado, fallido, pendiente, evento duplicado y firma inválida; confirma precios, stock y condiciones de envío del catálogo real. El total cobra las partidas del catálogo (precios finales con IVA); no se añade envío ni se inventa una tarifa. Confirma que esa política corresponde a los productos publicados.
Después cambia a las credenciales de producción, el secreto del webhook de producción, PAYMENT_TEST_MODE=false para Mercado Pago y APP_URL del dominio real. Despliega el frontend y las funciones en Vercel. Conserva PAYMENT_PROVIDER=none hasta completar esta configuración. No se realizaron cobros ni se configuraron cuentas del proveedor durante esta implementación.

Referencias de integración:
- https://docs.stripe.com/api/checkout/sessions/create
- https://docs.stripe.com/events/manage-webhook-endpoints
- https://www.mercadopago.com.mx/developers/en/docs/checkout-pro-orders/resources/notifications/webhooks

## Archivos principales

Datos: src/data/company.ts, src/data/quoteConfig.ts, src/config/features.ts.
Páginas nuevas: src/pages/CompanyPages.tsx, DevelopmentPage.tsx, LegalPage.tsx, QuoteWizard.tsx y PaymentReturnPage.tsx.
Componentes nuevos: CookieConsent.tsx, PrivacyNotice.tsx, Seo.tsx y quote/QuotePreview.tsx; QR en src/utils/qr.ts.
Integración: App.tsx, Navbar.tsx, Footer.tsx, ContactSection.tsx, CartDrawer.tsx, CatalogPage.tsx, LoginPage.tsx, InversaChatbot.tsx y faqKnowledgeBase.ts; canales y cobertura de componentes anteriores unificados.
Servidor: server/core.mjs, server/providers.mjs, api/orders.mjs, api/checkout.mjs, api/webhooks/payments.mjs y firestore.rules.
Contenido, despliegue y validación: content/legal/INVERSA_legales.md, public/docs/, public/sitemap.xml, public/robots.txt, .env.example, vercel.json, vite.config.ts, index.html, src/index.css, scripts/sitemap.mjs, scripts/lint.mjs, tests/ y package.json.
