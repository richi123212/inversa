import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import fs from "node:fs";
import ts from "typescript";
const compiled = ts.transpileModule(
  fs.readFileSync("src/utils/qr.ts", "utf8"),
  {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ES2020,
    },
  },
).outputText;
const { qrMatrix } = await import(
  "data:text/javascript;base64," + Buffer.from(compiled).toString("base64")
);
const require = createRequire(import.meta.url);
const decode = require(process.env.JSQR_MODULE);
for (const text of [
  "INVERSA",
  "Clínica Ejemplo",
  "Proyecto áéíóú ñ",
  "漢".repeat(40),
]) {
  const matrix = qrMatrix(text),
    scale = 6,
    size = (matrix.length + 8) * scale,
    rgba = new Uint8ClampedArray(size * size * 4).fill(255);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const row = Math.floor(y / scale) - 4,
        col = Math.floor(x / scale) - 4;
      if (matrix[row]?.[col]) {
        const offset = (y * size + x) * 4;
        rgba[offset] = rgba[offset + 1] = rgba[offset + 2] = 0;
      }
    }
  const result = decode(rgba, size, size);
  if (result?.data !== text) throw new Error("QR no decodifica: " + text);
  console.log("QR OK: " + text.slice(0, 24));
}
