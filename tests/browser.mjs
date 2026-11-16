import { pathToFileURL } from "node:url";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE
    ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href
    : "playwright"
);
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.CHROME_PATH ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
await fs.mkdir("test-results", { recursive: true });
const failures = [];
for (const width of [375, 768, 1440]) {
  const context = await browser.newContext({
    viewport: { width, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors = [],
    requests = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => requests.push(r.url()));
  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname !== "127.0.0.1") return route.abort();
    if (url.pathname === "/api/checkout")
      return route.fulfill({ json: { enabled: false } });
    if (url.pathname.startsWith("/docs/"))
      return route.fulfill({ status: 404, body: "No PDF" });
    return route.continue();
  });
  async function noOverflow(label) {
    const dims = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      viewport: innerWidth,
    }));
    assert(
      dims.scroll <= dims.viewport + 1,
      label + " tiene desbordamiento: " + JSON.stringify(dims),
    );
  }
  async function choose(text) {
    await page
      .locator("label.option-card")
      .filter({ has: page.locator("strong", { hasText: text }) })
      .first()
      .click();
  }
  async function next() {
    await page
      .getByRole("button", { name: "Continuar →", exact: true })
      .click();
  }
  try {
    await page.goto("http://127.0.0.1:4173/");
    await page.getByRole("heading", { level: 1 }).waitFor();
    await noOverflow("home");
    assert.equal(await page.getByRole("heading", { level: 1 }).count(), 1);
    assert.equal(await page.getByTitle("Abrir Asistente Inversa").count(), 0);
    assert(
      !requests.some((url) => url.includes("InversaChatbot-")),
      "Chatbot JS no debe descargarse en producción",
    );
    await page.screenshot({
      path: "test-results/home-" + width + ".png",
      fullPage: true,
    });
    await page.goto("http://127.0.0.1:4173/perfil-corporativo");
    await page.getByRole("button", { name: "PDF próximamente" }).waitFor();
    await noOverflow("perfil");
    for (const route of [
      "/aviso-de-privacidad",
      "/terminos-y-condiciones",
      "/tienda/terminos-de-venta",
      "/tienda/devoluciones-y-garantias",
      "/desarrollo/terminos-de-servicio",
    ]) {
      await page.goto("http://127.0.0.1:4173" + route);
      await page
        .getByRole("button", {
          name: "Imprimir o guardar esta página legal como PDF",
        })
        .waitFor();
      await noOverflow(route);
      assert.equal(await page.getByRole("heading", { level: 1 }).count(), 1);
    }
    await page.screenshot({
      path: "test-results/legal-" + width + ".png",
      fullPage: true,
    });
    await page.goto("http://127.0.0.1:4173/cotizador");
    await page
      .getByRole("heading", { name: "¿Qué vamos a construir?" })
      .waitFor();
    assert(
      await page
        .getByRole("button", { name: "Continuar →", exact: true })
        .isDisabled(),
    );
    await choose("Sistema administrativo");
    await next();
    await choose("Salud");
    await next();
    await page
      .getByLabel("Nombre del proyecto (opcional)")
      .fill("Clínica Ejemplo");
    await next();
    await choose("Tech oscuro");
    const priceBefore = await page.locator(".quote-bottom strong").textContent();
    for (const [id,label] of [["split","Texto e imagen"],["centered","Portada centrada"],["editorial","Imagen primero"],["sidebar","Menú lateral"]]) {
      await page.locator(".presentation-card").filter({hasText:label}).click();
      assert(await page.locator("input[name=presentation][value="+id+"]").isChecked());
      assert.equal(await page.locator(".mock-site.layout-"+id).count(),1);
      assert.equal(await page.locator(".quote-bottom strong").textContent(),priceBefore);
      await noOverflow("presentación "+id);
    }
    if(width===375) await page.getByRole("button",{name:"Ver mi página"}).click();
    await page.screenshot({path:"test-results/presentation-"+width+".png",fullPage:true});
    if(width===375) await page.getByRole("button",{name:"Cerrar vista previa"}).click();
    await next();
    await choose("Nosotros");
    await choose("Contacto");
    await next();
    await choose("Formularios con AJAX");
    await next();
    await choose("Tablas DataTable");
    assert(
      await page
        .locator("label.option-card")
        .filter({ hasText: "Base de datos MySQL" })
        .locator("input")
        .isChecked(),
    );
    await choose("Exportar a Excel");
    await next();
    await choose("Roles y permisos");
    await choose("Bitácora");
    assert(
      await page
        .locator("label.option-card")
        .filter({ hasText: "Usuarios con login" })
        .locator("input")
        .isChecked(),
    );
    await next();
    for (const text of [
      "PDFs personalizados",
      "Words personalizados",
      "Generador de códigos QR",
    ])
      await choose(text);
    await next();
    for (const text of [
      "Gráficas/dashboards",
      "Calendario/agenda",
      "Alertas personalizadas",
      "Correos personalizados",
      "Chatbot de respuestas predefinidas",
    ])
      await choose(text);
    await next();
    await choose("Modo oscuro");
    await choose("Panel de personalización");
    await next();
    await choose("Express");
    await next();
    await choose("Plus");
    await next();
    await page
      .getByRole("heading", { name: "Tu proyecto empieza aquí." })
      .waitFor();
    await noOverflow("resumen");
    if (width === 375) {
      await page.getByRole("button", { name: "Ver mi página" }).click();
      await page.getByRole("button", { name: "Cerrar vista previa" }).click();
    }
    await page.reload();
    await page
      .getByRole("button", { name: "Continuar cotización", exact: true })
      .click();
    await page
      .getByRole("heading", { name: "Tu proyecto empieza aquí." })
      .waitFor();
    await page.getByLabel("Nombre", { exact: true }).fill("Cliente de prueba");
    await page
      .locator("form")
      .getByLabel("Correo", { exact: true })
      .fill("prueba@example.com");
    await page.getByLabel("WhatsApp", { exact: true }).fill("5512345678");
    assert(
      await page
        .getByRole("button", { name: "Solicitar propuesta formal" })
        .isDisabled(),
    );
    await page.getByLabel("Acepto el").check();
    await page.screenshot({
      path: "test-results/quote-" + width + ".png",
      fullPage: true,
    });
    assert.equal(await page.getByRole("button",{name:"Descargar propuesta PDF"}).count(),0);
    assert(await page.locator(".summary-category").filter({hasText:"Presentación de la página"}).textContent().then(text=>text.includes("Menú lateral")));
    await page
      .getByRole("button", { name: "Solicitar propuesta formal" })
      .click();
    await page
      .getByRole("heading", { name: "Propuesta preparada en modo de prueba" })
      .waitFor();
    // Inyectar únicamente un producto de prueba local; no se consulta ni modifica el catálogo remoto.
    await page.evaluate(() =>
      localStorage.setItem(
        "inversa_cart_items_v1",
        JSON.stringify([
          {
            producto: {
              id: "test-product",
              titulo: "Equipo de prueba",
              precio: 1000,
              stock: 2,
              tipo: "hardware",
            },
            cantidad: 1,
          },
        ]),
      ),
    );
    await page.goto("http://127.0.0.1:4173/tienda");
    await page.getByRole("button", { name: /Abrir carrito/ }).click();
    await page
      .getByRole("button", { name: "Continuar →", exact: true })
      .click();
    await page.getByLabel("Nombre", { exact: true }).fill("Cliente de prueba");
    await page
      .locator("form")
      .getByLabel("Correo", { exact: true })
      .fill("prueba@example.com");
    await page.getByLabel("Teléfono / WhatsApp").fill("5512345678");
    await page
      .getByLabel("Dirección de envío")
      .fill("Calle de prueba 123, Centro, 06000, Ciudad de México");
    await page.getByLabel("Acepto el").check();
    await page
      .getByRole("button", { name: "Confirmar datos", exact: true })
      .click();
    assert(
      await page
        .getByRole("button", { name: "Pagos en línea próximamente" })
        .isDisabled(),
    );
    assert.equal(
      await page
        .locator('input[placeholder*="4500"],input[type=password]')
        .count(),
      0,
    );
    await noOverflow("checkout");
    await page.screenshot({
      path: "test-results/checkout-" + width + ".png",
      fullPage: true,
    });
    assert.deepEqual(errors, []);
    console.log(
      "OK " +
        width +
        "px: home, perfil, 5 legales, 14 pasos, dependencias, restauración, privacidad, acomodos sin recargo, envío simulado y checkout sin llaves.",
    );
  } catch (error) {
    failures.push(width + ": " + error.message);
    await page.screenshot({
      path: "test-results/failure-" + width + ".png",
      fullPage: true,
    });
    console.error(failures.at(-1));
  }
  await context.close();
}
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("http://127.0.0.1:4173/?chatbot=test");
await page.getByTitle("Abrir Asistente Inversa").click();
await page.getByText("BETA / En pruebas", { exact: true }).waitFor();
await page.reload();
await page.getByTitle("Abrir Asistente Inversa").waitFor();
assert(await page.getByTitle("Abrir Asistente Inversa").isVisible());
await context.close();
await browser.close();
if (failures.length) throw new Error(failures.join("\n"));
