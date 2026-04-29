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

const files = walk("src");

let changed = 0;
for (const f of files) {
  const before = readFileSync(f, "utf8");
  let after = before
    .replaceAll('weight="bold"', 'weight="duotone"')
    .replaceAll('weight="fill"', 'weight="duotone"')
    .replaceAll('weight="regular"', 'weight="duotone"')
    .replaceAll('weight={isActive ? "fill" : "regular"}', 'weight="duotone"');

  // Add weight="duotone" to icon JSX elements that don't already have a weight prop.
  after = after.replace(
    /<([A-Z][A-Za-z0-9]*Icon)([^>]*?)(\/?)>/g,
    (match, tag, attrs, selfClose) => {
      if (/\bweight=/.test(attrs)) return match;
      const a = attrs.replace(/\s+$/, "");
      return `<${tag}${a} weight="duotone" ${selfClose}>`;
    }
  );

  // Force every <FooIcon ...> usage to size={32}.
  after = after.replace(
    /<([A-Z][A-Za-z0-9]*Icon)([^>]*?)(\/?)>/g,
    (match, tag, attrs, selfClose) => {
      let a = attrs;
      // Replace existing size prop (string or expression form).
      a = a.replace(/\ssize=\{[^}]*\}/g, "");
      a = a.replace(/\ssize="[^"]*"/g, "");
      a = a.replace(/\s+$/, "");
      return `<${tag} size={28}${a} ${selfClose}>`;
    }
  );

  if (after !== before) {
    writeFileSync(f, after);
    changed++;
    console.log("updated:", f);
  }
}
console.log(`\n${changed} files updated.`);
