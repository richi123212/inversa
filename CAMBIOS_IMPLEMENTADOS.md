# Cambios implementados

Implementación local en el repositorio; no se publicó ni se realizaron cobros.

## Resultado

Inicio con dos líneas de negocio, sección de actividad, perfil corporativo y cinco páginas legales desde el Markdown original. Navegación por rutas, metadatos y sitemap. Cotizador de 14 pasos con configuración central, requisitos automáticos, vista previa, guardado, PDF imprimible y cierre por WhatsApp. Se conserva el cotizador anterior tras VITE_LEGACY_QUOTER=true.

Chatbot apagado en producción y cargado bajo demanda para pruebas. Cookies con elección persistida y sin analítica anticipada. Checkout sin captura de tarjetas, funciones para Stripe y Mercado Pago, precios calculados en servidor y estados confirmados por webhook.

## Verificación

- npm run build: correcto, sin advertencias de tamaño de bundle.
- npm run lint: correcto; TypeScript y reglas locales de sintaxis/segregación de secretos.
- npm test: 9 pruebas correctas. Incluyen dependencias, IVA, mantenimiento separado, recargos, firmas, manipulación del precio, autorización del pedido, idempotencia y eventos tardíos.
- Navegador Chrome headless: flujo completo a 375, 768 y 1440 px; páginas legales, PDF pendiente, cotizador, restauración, consentimiento, impresión y checkout sin llaves. Sin errores JavaScript ni desbordamiento horizontal. Chatbot de producción no descarga su chunk; ?chatbot=test lo activa y conserva la sesión.
- QR decodificado con jsQR para textos con acentos y UTF-8. Las herramientas de prueba temporales no se agregaron a las dependencias del proyecto.
- Fuente legal comparada con el archivo entregado: idéntica.

## Configuración pendiente

Completar src/data/company.ts. Todos los siguientes campos conservan null:

- razonSocial
- rfc
- domicilioFiscal
- telefono
- whatsapp
- correoContacto
- correoPrivacidad
- correoFacturacion
- correoSoporte
- horario
- responsableDatos
- coberturaEnvios
- diasEntrega
- envioGratisDesde
- diasReembolso
- anticipoPct
- avancePct
- finalPct
- rondasAjustes
- diasRevision
- diasGarantiaSoftware
- diasAvisoMantenimiento
- fechaConstitucion
- representanteLegal
- equipoTecnico
- marcasComercializadas
- garantiasSoporte
- certificaciones
- transferencias
- enviosNacionales

Los tres elementos de company.casos también están en null.

Los datos de empresa alimentan el perfil, contacto, footer, canales de WhatsApp y los marcadores legales. El documento legal original conserva sus avisos de datos pendientes. Los marcadores genéricos se asocian por página y orden en LegalPage.tsx.

Precios y opciones: src/data/quoteConfig.ts. Editar price, days, monthly, surcharge, timeFactor y requires. Impuesto y vigencia están en el mismo archivo.

Subir public/docs/INVERSA_Perfil_Corporativo_2026.pdf para habilitar la descarga corporativa.

Configurar las variables de servidor de .env.example, las reglas de Firestore y los webhooks según README.md. PAYMENT_PROVIDER=none mantiene el botón deshabilitado. No se probaron transacciones contra cuentas reales: las pruebas de proveedores y webhook usaron servicios simulados. La colección de pagos checkout_orders es privada y distinta de pedidos del administrador anterior; el nuevo estado se consulta por el endpoint autenticado y en Firestore. La integración no reserva ni descuenta inventario ni calcula portes; confirma la política de envíos del catálogo antes de habilitar cobros.

VITE_QUOTE_ENDPOINT sigue sin configurar: Solicitar propuesta formal indica éxito de prueba. El contacto conserva el servicio de pedidos existente y distingue guardado local de recepción en Firestore. WhatsApp se oculta mientras company.whatsapp permanezca en null.

Reactivar chatbot: features.chatbot.enabled=true o VITE_CHATBOT_ENABLED=true y nuevo build. Probar sólo en una sesión: ?chatbot=test. Eliminar inversa.chatbot.test de sessionStorage para cancelar la activación de pruebas.

## Archivos creados o modificados

- .env.example
- .gitignore
- CAMBIOS_IMPLEMENTADOS.md
- README.md
- api/checkout.mjs
- api/orders.mjs
- api/webhooks/payments.mjs
- content/legal/INVERSA_legales.md
- firestore.rules
- index.html
- package.json
- public/docs/README.txt
- public/robots.txt
- public/sitemap.xml
- scripts/lint.mjs
- scripts/sitemap.mjs
- server/core.mjs
- server/providers.mjs
- src/App.tsx
- src/components/AboutInversaSection.tsx
- src/components/CartDrawer.tsx
- src/components/ContactSection.tsx
- src/components/CookieConsent.tsx
- src/components/CorporateAnnouncementBar.tsx
- src/components/Footer.tsx
- src/components/InversaChatbot.tsx
- src/components/Navbar.tsx
- src/components/PrivacyNotice.tsx
- src/components/Seo.tsx
- src/components/TrustSignalsBar.tsx
- src/components/WebInteractiveQuoter.tsx
- src/components/configurator/SaveQuoteModal.tsx
- src/components/quote/QuotePreview.tsx
- src/config/features.ts
- src/data/company.ts
- src/data/faqKnowledgeBase.ts
- src/data/quoteConfig.ts
- src/index.css
- src/pages/CatalogPage.tsx
- src/pages/CompanyPages.tsx
- src/pages/DevelopmentPage.tsx
- src/pages/LegalPage.tsx
- src/pages/LoginPage.tsx
- src/pages/PaymentReturnPage.tsx
- src/pages/QuoteWizard.tsx
- src/services/configuratorService.ts
- src/services/ordersService.ts
- src/services/quoteSubmission.ts
- src/types/index.ts
- src/utils/qr.ts
- tests/browser.mjs
- tests/core.test.mjs
- tests/payments.test.mjs
- tests/providers.test.mjs
- tests/qr-decode.mjs
- vercel.json
- vite.config.ts
