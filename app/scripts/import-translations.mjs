// Converts translation batches into src/data/lang/<code>.js files.
// Batch format: "@code" then 28 lines (words line, sentences line for each
// lesson in curriculum order), items separated by "|". Blank lines and lines
// starting with "#" are ignored.
import { readFileSync, writeFileSync } from 'node:fs';
import { curriculum } from '../src/data/curriculum.js';
import { findLanguage } from '../src/data/languages.js';

const lessons = curriculum.flatMap((u) => u.lessons);
let failed = false;
for (const file of process.argv.slice(2)) {
  const blocks = readFileSync(file, 'utf8').split(/^@/m).slice(1);
  for (const block of blocks) {
    const [head, ...rest] = block.split('\n');
    const code = head.trim();
    const lines = rest.map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
    const lang = findLanguage(code);
    const problems = [];
    if (!lang) problems.push('unknown language code');
    if (lines.length !== lessons.length * 2) problems.push(`expected ${lessons.length * 2} lines, got ${lines.length}`);
    lessons.forEach((l, i) => {
      for (const [kind, line] of [['words', lines[i * 2]], ['sentences', lines[i * 2 + 1]]]) {
        const items = (line || '').split('|').map((x) => x.trim());
        if (items.length !== 5 || items.some((x) => !x)) problems.push(`${l.id} ${kind}: ${items.length} items`);
      }
      const words = (lines[i * 2] || '').split('|').map((x) => x.trim());
      if (new Set(words).size !== words.length) problems.push(`${l.id}: duplicate words`);
    });
    if (problems.length) {
      failed = true;
      console.error(`✗ ${code}: ${problems.join('; ')}`);
      continue;
    }
    let out = `// ${lang.name} (${lang.native})${lang.beta ? ' · beta: needs native-speaker review' : ''}\nexport default {\n`;
    lessons.forEach((l, i) => (out += `  ${l.id}: [${JSON.stringify(lines[i * 2])}, ${JSON.stringify(lines[i * 2 + 1])}],\n`));
    writeFileSync(`src/data/lang/${code}.js`, out + '};\n');
    console.log(`✓ ${code}`);
  }
}
process.exit(failed ? 1 : 0);
