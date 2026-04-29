const fs = require('fs');
const src = 'C:/Users/leand/.claude/projects/D--projetos2026-barberramos/a3db4b8a-ad1e-4402-854c-08ace2f9f1f8/tool-results/mcp-supabase-generate_typescript_types-1777468545592.txt';
const dst = 'D:/projetos2026/barberramos/src/lib/database.types.ts';
let raw = fs.readFileSync(src, 'utf8');
let arr = JSON.parse(raw);
let inner = arr[0].text;
try { inner = JSON.parse(inner).types; } catch (e) {}
fs.writeFileSync(dst, inner);
console.log('OK', inner.length);
