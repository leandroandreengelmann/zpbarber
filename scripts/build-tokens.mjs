import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DOCS = resolve(ROOT, "docs");
const OUT = resolve(ROOT, "src/styles/tokens.css");

const read = (f) => JSON.parse(readFileSync(resolve(DOCS, f), "utf8"));

const primitives = read("1.md");
const darkSemantic = read("2.md");
const lightSemantic = read("3.md");
const radius = read("4.md");
const spacing = read("5.md");
const widths = read("6.md");
const container = read("7.md");
const typography = read("8.md");

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/\s*\(\d+\)\s*$/, "")
    .replace(/[\s_/]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const flatten = (obj, path = []) => {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    if (k === "$extensions") continue;
    if (v && typeof v === "object" && "$value" in v) {
      out.push({ path: [...path, k], type: v.$type, value: v.$value });
    } else if (v && typeof v === "object") {
      out.push(...flatten(v, [...path, k]));
    }
  }
  return out;
};

const colorToCss = (val) => {
  if (typeof val === "object" && val.hex) {
    if (val.alpha != null && val.alpha < 1) {
      const [r, g, b] = val.components.map((c) => Math.round(c * 255));
      return `rgb(${r} ${g} ${b} / ${val.alpha.toFixed(2)})`;
    }
    return val.hex.toLowerCase();
  }
  return String(val);
};

const SEMANTIC_GROUP_PREFIX = {
  text: "text",
  border: "border",
  foreground: "fg",
  background: "bg",
};

const dedupePath = (parts) => {
  const out = [];
  for (const p of parts) {
    const last = out[out.length - 1];
    if (last && p.startsWith(last + "-")) {
      out[out.length - 1] = p;
      continue;
    }
    const semantic = SEMANTIC_GROUP_PREFIX[p];
    const next = parts[parts.indexOf(p) + 1];
    if (semantic && next && next.startsWith(semantic + "-")) continue;
    out.push(p);
  }
  return out;
};

const aliasToVar = (aliasStr) => {
  const m = aliasStr.match(/^\{Colors\.([^}]+)\}$/);
  if (!m) return null;
  const parts = m[1].split(".").map(slug).filter(Boolean);
  const full = dedupePath(["color", ...parts]).join("-");
  return `var(--${full})`;
};

const fmt = (entry) => {
  const name = dedupePath(entry.path.map(slug).filter(Boolean)).join("-");
  if (entry.type === "color") {
    if (typeof entry.value === "string") {
      const v = aliasToVar(entry.value);
      if (v) return [name, v];
    }
    return [name, colorToCss(entry.value)];
  }
  if (entry.type === "number") {
    if (name.startsWith("radius") && entry.value === 9999) return [name, "9999px"];
    return [name, `${entry.value}px`];
  }
  return [name, String(entry.value)];
};

const renderBlock = (selector, entries, prefix = "") => {
  const lines = [`${selector} {`];
  for (const e of entries) {
    const [name, value] = fmt(e);
    lines.push(`  --${prefix}${name}: ${value};`);
  }
  lines.push("}", "");
  return lines.join("\n");
};

const primitivesFlat = flatten(primitives.Colors).map((e) => ({
  ...e,
  path: ["color", ...e.path],
}));

const darkFlat = flatten(darkSemantic.Colors).map((e) => ({
  ...e,
  path: ["color", ...e.path],
}));

const lightFlat = flatten(lightSemantic.Colors).map((e) => ({
  ...e,
  path: ["color", ...e.path],
}));

const radiusFlat = flatten(radius);
const spacingFlat = flatten(spacing);
const widthsFlat = flatten(widths);
const containerFlat = flatten(container);

const typoFlat = [];
for (const [group, items] of Object.entries(typography)) {
  if (group === "$extensions") continue;
  for (const [k, v] of Object.entries(items)) {
    if (!v || typeof v !== "object" || !("$value" in v)) continue;
    let prefix;
    if (group === "Font family") prefix = [];
    else if (group === "Font weight") prefix = ["font-weight"];
    else if (group === "Font size") prefix = ["font-size"];
    else if (group === "Line height") prefix = ["line-height"];
    else prefix = [slug(group)];
    typoFlat.push({ path: [...prefix, k], type: v.$type, value: v.$value });
  }
}

const fontWeightMap = {
  Regular: "400",
  "Regular italic": "400",
  Medium: "500",
  "Medium italic": "500",
  Semibold: "600",
  "Semibold italic": "600",
  Bold: "700",
  "Bold italic": "700",
};

const renderTypo = (entries) => {
  const lines = ["@layer base {", "  :root {"];
  for (const e of entries) {
    const name = e.path.map(slug).filter(Boolean).join("-");
    let value;
    if (e.type === "string") {
      if (fontWeightMap[e.value]) value = fontWeightMap[e.value];
      else value = `"${e.value}", ui-sans-serif, system-ui, sans-serif`;
    } else if (e.type === "number") {
      value = `${e.value}px`;
    } else value = String(e.value);
    lines.push(`    --${name}: ${value};`);
  }
  lines.push("  }", "}", "");
  return lines.join("\n");
};

const header = `/* Auto-generated from docs/*.md by scripts/build-tokens.mjs.
   Do not edit by hand — re-run \`node scripts/build-tokens.mjs\`. */
`;

const out = [
  header,
  renderBlock(":root", [
    ...primitivesFlat,
    ...radiusFlat,
    ...spacingFlat,
    ...widthsFlat,
    ...containerFlat,
    ...typoFlat.filter((e) => e.type === "number"),
  ]),
  renderBlock(":root", typoFlat.filter((e) => e.type === "string")),
  "/* Light mode semantic colors */",
  renderBlock(":root", lightFlat),
  "/* Dark mode semantic colors */",
  renderBlock(".dark", darkFlat),
].join("\n");

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, out, "utf8");
console.log(
  `Wrote ${OUT}\n  primitives:${primitivesFlat.length} light:${lightFlat.length} dark:${darkFlat.length} radius:${radiusFlat.length} spacing:${spacingFlat.length} widths:${widthsFlat.length} container:${containerFlat.length} typo:${typoFlat.length}`
);
