// Pronunciation guides in Latin letters for scripts that can be romanized by rule.
// The output is a learner's reading aid, not a strict transliteration standard.

// ---------- Korean (Revised Romanization, with the common sound changes) ----------
const K_INIT = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'];
const K_VOW = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'];
// Final consonant at the end of a syllable…
const K_FIN = ['', 'k', 'k', 'k', 'n', 'n', 'n', 't', 'l', 'k', 'm', 'l', 'l', 'l', 'p', 'l', 'm', 'p', 'p', 't', 't', 'ng', 't', 't', 'k', 't', 'p', 't'];
// …and how it sounds when it carries over to a following vowel (liaison).
const K_LINK = ['', 'g', 'kk', 'ks', 'n', 'nj', 'n', 'd', 'r', 'lg', 'lm', 'lb', 'ls', 'lt', 'lp', 'r', 'm', 'b', 'ps', 's', 'ss', 'ng', 'j', 'ch', 'k', 't', 'p', ''];

function romanizeHangul(text) {
  const chars = [...text];
  const syl = chars.map((c) => {
    const n = c.codePointAt(0) - 0xac00;
    return n >= 0 && n < 11172 ? { i: Math.floor(n / 588), v: Math.floor((n % 588) / 28), f: n % 28 } : null;
  });
  let out = '';
  chars.forEach((c, k) => {
    const s = syl[k];
    if (!s) { out += c; return; }
    const prev = syl[k - 1];
    const next = syl[k + 1];
    let init = K_INIT[s.i];
    // Initial ㄹ after ㄹ or ㄴ is read "l"; after other finals it becomes "n".
    if (s.i === 5 && prev) init = prev.f === 8 || prev.f === 4 ? 'l' : prev.f ? 'n' : 'r';
    let fin = K_FIN[s.f];
    if (s.f && next) {
      if (next.i === 11) fin = K_LINK[s.f]; // final moves onto the next vowel
      else if (next.i === 2 || next.i === 6) fin = { k: 'ng', t: 'n', p: 'm' }[fin] || fin; // nasalisation before ㄴ/ㅁ
      else if (next.i === 5 && s.f === 4) fin = 'l'; // ㄴ + ㄹ → ll
      else if (s.f === 27 && [0, 3, 12, 18].includes(next.i)) fin = ''; // ㅎ merges into the next consonant
    }
    // A carried-over final already supplies the next syllable's initial sound.
    if (prev && prev.f && s.i === 11) init = '';
    // ㅎ final before ㄱ/ㄷ/ㅈ aspirates them.
    if (prev && prev.f === 27) init = { 0: 'k', 3: 't', 12: 'ch' }[s.i] ?? init;
    out += init + K_VOW[s.v] + fin;
  });
  return out;
}

// ---------- Cyrillic ----------
const CYRL = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n',
  о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '',
  э: 'e', ю: 'yu', я: 'ya', і: 'i', ї: 'yi', є: 'ye', ґ: 'g', ў: 'w', қ: 'q', ғ: 'gh', ң: 'ng', ө: 'ö', ү: 'ü', ұ: 'u', һ: 'h',
  ә: 'ä', ҳ: 'h', ҷ: 'j', ӣ: 'ī', ӯ: 'ū', ҡ: 'q', ҙ: 'z', ҫ: 's', ј: 'j', љ: 'lj', њ: 'nj', ћ: 'ć', ђ: 'đ', џ: 'dž', ѓ: 'gj',
  ќ: 'kj', ѕ: 'dz', ӑ: 'ă', ӗ: 'ĕ', ӳ: 'ü', җ: 'zh',
};
const CYRL_LANG = {
  uk: { г: 'h', и: 'y', щ: 'shch' },
  bg: { щ: 'sht', ъ: 'ă' },
  be: { г: 'h' },
  mn: { е: 'ye', ү: 'ü', ө: 'ö' },
  sr: { х: 'h', ц: 'c', ч: 'č', ш: 'š', ж: 'ž' },
  mk: { х: 'h', ц: 'c', ч: 'č', ш: 'š', ж: 'ž' },
};

// ---------- Greek ----------
const GREEK_PAIRS = [['ου', 'ou'], ['αι', 'e'], ['ει', 'i'], ['οι', 'i'], ['υι', 'i'], ['αυ', 'av'], ['ευ', 'ev'], ['μπ', 'b'], ['ντ', 'd'], ['γκ', 'g'], ['γγ', 'ng'], ['τσ', 'ts'], ['τζ', 'tz']];
const GREEK = {
  α: 'a', β: 'v', γ: 'g', δ: 'd', ε: 'e', ζ: 'z', η: 'i', θ: 'th', ι: 'i', κ: 'k', λ: 'l', μ: 'm', ν: 'n', ξ: 'x', ο: 'o',
  π: 'p', ρ: 'r', σ: 's', ς: 's', τ: 't', υ: 'y', φ: 'f', χ: 'ch', ψ: 'ps', ω: 'o',
};

// ---------- Armenian ----------
const ARMENIAN = {
  ա: 'a', բ: 'b', գ: 'g', դ: 'd', ե: 'e', զ: 'z', է: 'e', ը: 'ə', թ: 't', ժ: 'zh', ի: 'i', լ: 'l', խ: 'kh', ծ: 'ts', կ: 'k',
  հ: 'h', ձ: 'dz', ղ: 'gh', ճ: 'ch', մ: 'm', յ: 'y', ն: 'n', շ: 'sh', ո: 'o', չ: 'ch', պ: 'p', ջ: 'j', ռ: 'r', ս: 's', վ: 'v',
  տ: 't', ր: 'r', ց: 'ts', ւ: 'v', փ: 'p', ք: 'k', և: 'ev', օ: 'o', ֆ: 'f',
};

// ---------- Georgian ----------
const GEORGIAN = {
  ა: 'a', ბ: 'b', გ: 'g', დ: 'd', ე: 'e', ვ: 'v', ზ: 'z', თ: 't', ი: 'i', კ: "k'", ლ: 'l', მ: 'm', ნ: 'n', ო: 'o', პ: "p'",
  ჟ: 'zh', რ: 'r', ს: 's', ტ: "t'", უ: 'u', ფ: 'p', ქ: 'k', ღ: 'gh', ყ: "q'", შ: 'sh', ჩ: 'ch', ც: 'ts', ძ: 'dz', წ: "ts'",
  ჭ: "ch'", ხ: 'kh', ჯ: 'j', ჰ: 'h',
};

function byTable(text, table, pairs = []) {
  let s = text.toLowerCase().normalize('NFD').replace(/[́̈]/g, '').normalize('NFC');
  for (const [a, b] of pairs) s = s.split(a).join(b);
  return [...s].map((c) => table[c] ?? c).join('');
}

function romanizeArmenian(text) {
  // ու is the vowel "u"; ե and ո start with a y/v sound at the beginning of a word.
  const s = text.toLowerCase().replace(/ու/g, 'u').replace(/(^|[^\p{L}])ե/gu, '$1ye').replace(/(^|[^\p{L}])ո/gu, '$1vo');
  return byTable(s, ARMENIAN);
}

// ---------- Indian scripts (they share the Devanagari layout, offset per script) ----------
const BRAHMIC = { hi: 0x900, mr: 0x900, ne: 0x900, bn: 0x980, pa: 0xa00, gu: 0xa80, ta: 0xb80, te: 0xc00, kn: 0xc80, ml: 0xd00 };
const SCHWA_DROP = new Set(['hi', 'mr', 'ne', 'pa', 'gu', 'bn']);
const M_AT_END = new Set(['te', 'kn', 'ml']);
const B_VOW = { 0x05: 'a', 0x06: 'aa', 0x07: 'i', 0x08: 'ee', 0x09: 'u', 0x0a: 'oo', 0x0b: 'ri', 0x0d: 'e', 0x0e: 'e', 0x0f: 'e', 0x10: 'ai', 0x11: 'o', 0x12: 'o', 0x13: 'o', 0x14: 'au' };
const B_CONS = {
  0x15: 'k', 0x16: 'kh', 0x17: 'g', 0x18: 'gh', 0x19: 'ng', 0x1a: 'ch', 0x1b: 'chh', 0x1c: 'j', 0x1d: 'jh', 0x1e: 'ny',
  0x1f: 't', 0x20: 'th', 0x21: 'd', 0x22: 'dh', 0x23: 'n', 0x24: 't', 0x25: 'th', 0x26: 'd', 0x27: 'dh', 0x28: 'n', 0x29: 'n',
  0x2a: 'p', 0x2b: 'ph', 0x2c: 'b', 0x2d: 'bh', 0x2e: 'm', 0x2f: 'y', 0x30: 'r', 0x31: 'r', 0x32: 'l', 0x33: 'l', 0x34: 'zh',
  0x35: 'v', 0x36: 'sh', 0x37: 'sh', 0x38: 's', 0x39: 'h', 0x58: 'q', 0x59: 'kh', 0x5a: 'gh', 0x5b: 'z', 0x5c: 'r', 0x5d: 'rh',
  0x5e: 'f', 0x5f: 'y',
};
const B_SIGN = { 0x3e: 'aa', 0x3f: 'i', 0x40: 'ee', 0x41: 'u', 0x42: 'oo', 0x43: 'ri', 0x45: 'e', 0x46: 'e', 0x47: 'e', 0x48: 'ai', 0x49: 'o', 0x4a: 'o', 0x4b: 'o', 0x4c: 'au', 0x57: 'au' };
const NUKTA = { k: 'q', kh: 'kh', g: 'gh', j: 'z', ph: 'f', d: 'r', dh: 'rh' };
// Malayalam chillu letters and Bengali khanda ta: consonants with no vowel.
const B_EXTRA = { 0xd7a: 'n', 0xd7b: 'n', 0xd7c: 'r', 0xd7d: 'l', 0xd7e: 'l', 0xd7f: 'k', 0x9ce: 't', 0xd54: 'm', 0xd55: 'y', 0xd56: 'l' };

function romanizeBrahmic(text, code) {
  const base = BRAHMIC[code];
  const out = [];
  let pending = false; // last consonant still has its inherent "a"
  let double = false; // Gurmukhi addak doubles the next consonant
  const flush = (endOfWord) => {
    if (pending && !(endOfWord && SCHWA_DROP.has(code))) out.push('a');
    pending = false;
  };
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (B_EXTRA[cp]) { flush(); out.push(B_EXTRA[cp]); continue; }
    const o = cp - base;
    if (o < 0 || o >= 0x80) { flush(true); out.push(ch); continue; }
    if (B_CONS[o]) {
      flush();
      const c = B_CONS[o];
      out.push(double ? c[0] + c : c);
      double = false;
      pending = true;
    } else if (B_VOW[o]) { flush(); out.push(B_VOW[o]); }
    else if (B_SIGN[o]) { pending = false; out.push(B_SIGN[o]); }
    else if (o === 0x4d) pending = false; // virama: no vowel
    else if (o === 0x3c) { const last = out.pop(); out.push(NUKTA[last] ?? last); } // nukta
    else if (o === 0x02 || o === 0x01 || o === 0x70) { flush(); out.push('ṁ'); } // nasal signs (anusvara, bindu, tippi)
    else if (o === 0x03) { flush(); out.push('h'); }
    else if (o === 0x71) { flush(); double = true; }
    else if (o >= 0x66 && o <= 0x6f) { flush(true); out.push(String(o - 0x66)); }
    else if (o === 0x64 || o === 0x65) { flush(true); out.push('.'); }
  }
  flush(true);
  // Nasal signs sound like "m" before p/b/m (and at the end of a word in the south), else "n".
  const endM = M_AT_END.has(code);
  return out.join('').replace(/ṁ/g, (_, i, str) => {
    const after = str[i + 1];
    return /[pbm]/.test(after || '') || (endM && (!after || !/\p{L}/u.test(after))) ? 'm' : 'n';
  });
}

const SCRIPTS = {
  ko: romanizeHangul,
  el: (t) => byTable(t, GREEK, GREEK_PAIRS),
  hy: romanizeArmenian,
  ka: (t) => byTable(t, GEORGIAN),
};
for (const code of ['ru', 'uk', 'be', 'bg', 'mk', 'sr', 'kk', 'ky', 'mn', 'tg', 'tt']) {
  SCRIPTS[code] = (t) => byTable(t, { ...CYRL, ...CYRL_LANG[code] });
}
for (const code of Object.keys(BRAHMIC)) SCRIPTS[code] = (t) => romanizeBrahmic(t, code);

export const canRomanize = (code) => !!SCRIPTS[code];

export function romanize(text, code) {
  const fn = SCRIPTS[code];
  // Nothing to add for text that is already in Latin letters (e.g. English).
  if (!fn || !text || !/[^\P{L}\p{Script=Latin}]/u.test(text)) return '';
  return fn(text).replace(/\s+/g, ' ').trim();
}
