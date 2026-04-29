const fs = require("fs");
const src = process.argv[2];
if (!src) {
  console.error("Usage: node scripts/extract-types.js <input-file>");
  process.exit(1);
}
const dst = "D:/projetos2026/barberramos/src/lib/database.types.ts";
const a = JSON.parse(fs.readFileSync(src, "utf8"));
const wrapped = JSON.parse(a[0].text);
fs.writeFileSync(dst, wrapped.types);
console.log("OK", wrapped.types.length, "bytes");
