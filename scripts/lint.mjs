import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
const files = [];
function walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) walk(file);
    else if (/\.(tsx?|mjs)$/.test(file)) files.push(file);
  }
}
for (const dir of ["src", "server", "api", "scripts"]) walk(dir);
let issues = 0;
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const tree = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx")
      ? ts.ScriptKind.TSX
      : file.endsWith(".mjs")
        ? ts.ScriptKind.JS
        : ts.ScriptKind.TS,
  );
  for (const d of tree.parseDiagnostics) {
    console.error(
      file + ": " + ts.flattenDiagnosticMessageText(d.messageText, " "),
    );
    issues++;
  }
  function visit(node) {
    if (
      node.kind === ts.SyntaxKind.DebuggerStatement ||
      (ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "eval")
    ) {
      console.error(file + ": debugger/eval no permitido");
      issues++;
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  if (
    file.startsWith("src") &&
    /import\.meta\.env\.(?:VITE_)?(?:STRIPE_SECRET_KEY|MP_ACCESS_TOKEN|FIREBASE_PRIVATE_KEY)/.test(
      text,
    )
  ) {
    console.error(file + ": secreto de servidor expuesto");
    issues++;
  }
}
if (issues) process.exit(1);
console.log(
  "Lint: " +
    files.length +
    " archivos revisados (sintaxis, debugger/eval y separación de secretos), además del chequeo TypeScript.",
);
