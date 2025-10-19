#!/usr/bin/env node
const fs = require('fs');
const p = 'package.json.restored';
const out = 'package.json';
if (!fs.existsSync(p)) {
  console.error('Restored file not found:', p);
  process.exit(2);
}
const buf = fs.readFileSync(p);
// search for first 0x7b '{' and last 0x7d '}' in raw bytes
let first = -1;
let last = -1;
for (let i = 0; i < buf.length; i++) {
  if (buf[i] === 0x7b) { first = i; break; }
}
for (let i = buf.length - 1; i >= 0; i--) {
  if (buf[i] === 0x7d) { last = i; break; }
}
if (first === -1 || last === -1 || last <= first) {
  console.error('Could not find JSON braces in restored file (byte scan)');
  process.exit(2);
}
const slice = buf.slice(first, last + 1);
const jsonText = slice.toString('utf8');
try {
  JSON.parse(jsonText);
} catch (e) {
  console.error('Extracted text is not valid JSON:', e.message);
  process.exit(2);
}
fs.writeFileSync(out, jsonText, { encoding: 'utf8' });
console.log('Wrote cleaned package.json (' + jsonText.length + ' bytes)');
