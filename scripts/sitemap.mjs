import fs from "node:fs";
const routes = [
  "/",
  "/tienda",
  "/desarrollo",
  "/contacto",
  "/perfil-corporativo",
  "/cotizador",
  ...Array.from(
    fs
      .readFileSync("content/legal/INVERSA_legales.md", "utf8")
      .matchAll(/<!-- ruta: (.*?) -->/g),
    (m) => m[1],
  ),
];
fs.mkdirSync("public", { recursive: true });
fs.writeFileSync(
  "public/sitemap.xml",
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    routes
      .map(
        (route) =>
          "<url><loc>https://www.inversati.com" + route + "</loc></url>",
      )
      .join("") +
    "</urlset>",
);
