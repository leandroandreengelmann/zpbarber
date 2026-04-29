import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (p.endsWith(".tsx")) out.push(p);
  }
  return out;
}

const replacements = [
  // Headings -> DS display scale
  ["md:text-5xl", "md:text-display-lg"],
  ["md:text-4xl", "md:text-display-md"],
  ["md:text-3xl", "md:text-display-sm"],
  ["md:text-2xl", "md:text-display-xs"],
  ["text-5xl", "text-display-lg"],
  ["text-4xl", "text-display-md"],
  ["text-3xl", "text-display-sm"],
  ["text-2xl", "text-display-xs"],
  // Ad-hoc status accents -> DS semantic
  ['"text-emerald-600 dark:text-emerald-400"', '"text-success-primary"'],
  ['"text-blue-600 dark:text-blue-400"', '"text-brand-secondary"'],
  ['"text-orange-600 dark:text-orange-400"', '"text-warning-primary"'],
  ['"text-red-600 dark:text-red-400"', '"text-error-primary"'],
];

const files = walk("src");
let changed = 0;
for (const f of files) {
  const before = readFileSync(f, "utf8");
  let after = before;
  for (const [from, to] of replacements) after = after.replaceAll(from, to);
  if (after !== before) {
    writeFileSync(f, after);
    changed++;
    console.log("updated:", f);
  }
}
console.log(`\n${changed} files updated.`);
