// Player avatars: original plush animal friends in the same soft-toy style as
// Kobe (fuzzy edges, gentle shading, beady eyes, rosy cheeks).
import { useId } from 'react';
import './avatar.css';

export const AVATARS = [
  { id: 'cat', name: 'Miso', animal: 'cat' },
  { id: 'fox', name: 'Rusty', animal: 'fox' },
  { id: 'panda', name: 'Bao', animal: 'panda' },
  { id: 'koala', name: 'Gumnut', animal: 'koala' },
  { id: 'bunny', name: 'Clover', animal: 'bunny' },
  { id: 'penguin', name: 'Pip', animal: 'penguin' },
  { id: 'lion', name: 'Sunny', animal: 'lion' },
  { id: 'frog', name: 'Lily', animal: 'frog' },
  { id: 'bear', name: 'Toffee', animal: 'bear' },
  { id: 'hamster', name: 'Mochi', animal: 'hamster' },
];

export const avatarInfo = (id) => AVATARS.find((a) => a.id === id) || AVATARS[0];

// Lighten/darken a hex colour for plush shading.
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c) => Math.max(0, Math.min(255, Math.round(c + (amt > 0 ? (255 - c) * amt : c * amt))));
  const r = f(n >> 16), g = f((n >> 8) & 255), b = f(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// Each animal: a list of parts drawn back to front. A part is
// { s: 'e'|'c'|'p', ...geometry, c: colour, soft?: true (blurred marking), plain?: true (no fuzz) }
const ART = {
  cat: {
    parts: [
      { s: 'p', d: 'M24 54 L28 14 L54 34 Z', c: '#f0a45c' },
      { s: 'p', d: 'M96 54 L92 14 L66 34 Z', c: '#f0a45c' },
      { s: 'p', d: 'M31 42 L33 25 L45 34 Z', c: '#f6b8b0', soft: true },
      { s: 'p', d: 'M89 42 L87 25 L75 34 Z', c: '#f6b8b0', soft: true },
      { s: 'e', cx: 60, cy: 66, rx: 41, ry: 37, c: '#f0a45c' },
      { s: 'e', cx: 60, cy: 36, rx: 9, ry: 4, c: '#c9762f', soft: true },
      { s: 'e', cx: 60, cy: 45, rx: 6, ry: 3, c: '#c9762f', soft: true },
      { s: 'e', cx: 60, cy: 82, rx: 19, ry: 13, c: '#fff4e6' },
    ],
    eyes: { y: 64, gap: 15 },
    nose: { y: 76, c: '#e8838f' },
  },
  fox: {
    parts: [
      { s: 'p', d: 'M22 56 L26 12 L54 36 Z', c: '#e57a3d' },
      { s: 'p', d: 'M98 56 L94 12 L66 36 Z', c: '#e57a3d' },
      { s: 'p', d: 'M26 13 L31 30 L40 23 Z', c: '#3a3133', soft: true },
      { s: 'p', d: 'M94 13 L89 30 L80 23 Z', c: '#3a3133', soft: true },
      { s: 'e', cx: 60, cy: 66, rx: 42, ry: 37, c: '#e57a3d' },
      { s: 'p', d: 'M20 68 Q40 72 60 98 Q80 72 100 68 Q98 98 60 102 Q22 98 20 68 Z', c: '#fff7ee' },
    ],
    eyes: { y: 64, gap: 16 },
    nose: { y: 80, c: '#2e2a2c' },
  },
  panda: {
    parts: [
      { s: 'c', cx: 27, cy: 34, r: 14, c: '#33373f' },
      { s: 'c', cx: 93, cy: 34, r: 14, c: '#33373f' },
      { s: 'e', cx: 60, cy: 66, rx: 42, ry: 37, c: '#fbfaf7' },
      { s: 'e', cx: 44, cy: 65, rx: 12, ry: 15, c: '#33373f', rot: 25, soft: true },
      { s: 'e', cx: 76, cy: 65, rx: 12, ry: 15, c: '#33373f', rot: -25, soft: true },
    ],
    eyes: { y: 63, gap: 15, light: true },
    nose: { y: 79, c: '#2e2a2c' },
  },
  koala: {
    parts: [
      { s: 'c', cx: 23, cy: 46, r: 19, c: '#a2abb5' },
      { s: 'c', cx: 97, cy: 46, r: 19, c: '#a2abb5' },
      { s: 'c', cx: 24, cy: 47, r: 11, c: '#ece7e1', soft: true },
      { s: 'c', cx: 96, cy: 47, r: 11, c: '#ece7e1', soft: true },
      { s: 'e', cx: 60, cy: 66, rx: 41, ry: 37, c: '#a2abb5' },
      { s: 'e', cx: 60, cy: 80, rx: 9, ry: 12, c: '#3b4049', plain: true },
    ],
    eyes: { y: 62, gap: 18 },
  },
  bunny: {
    parts: [
      { s: 'e', cx: 44, cy: 24, rx: 10, ry: 27, c: '#f3e9d8' },
      { s: 'e', cx: 76, cy: 24, rx: 10, ry: 27, c: '#f3e9d8' },
      { s: 'e', cx: 44, cy: 26, rx: 5, ry: 18, c: '#f6b8b0', soft: true },
      { s: 'e', cx: 76, cy: 26, rx: 5, ry: 18, c: '#f6b8b0', soft: true },
      { s: 'e', cx: 60, cy: 70, rx: 41, ry: 35, c: '#f3e9d8' },
      { s: 'e', cx: 60, cy: 84, rx: 17, ry: 11, c: '#fffaf2' },
    ],
    eyes: { y: 66, gap: 15 },
    nose: { y: 78, c: '#e8838f' },
  },
  penguin: {
    parts: [
      { s: 'e', cx: 60, cy: 66, rx: 43, ry: 39, c: '#323844' },
      { s: 'p', d: 'M60 48 C46 32 22 44 26 66 C28 84 44 98 60 98 C76 98 92 84 94 66 C98 44 74 32 60 48 Z', c: '#fbfaf7' },
      { s: 'p', d: 'M51 76 Q60 72 69 76 Q60 89 51 76 Z', c: '#f2a63a', plain: true },
    ],
    eyes: { y: 64, gap: 15 },
  },
  lion: {
    parts: [
      ...Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return { s: 'c', cx: 60 + Math.cos(a) * 41, cy: 66 + Math.sin(a) * 39, r: 15, c: '#c97d35' };
      }),
      { s: 'c', cx: 31, cy: 38, r: 10, c: '#efc160' },
      { s: 'c', cx: 89, cy: 38, r: 10, c: '#efc160' },
      { s: 'e', cx: 60, cy: 66, rx: 36, ry: 33, c: '#efc160' },
      { s: 'e', cx: 60, cy: 82, rx: 16, ry: 11, c: '#fff4dc' },
    ],
    eyes: { y: 63, gap: 14 },
    nose: { y: 76, c: '#7a4a24' },
  },
  frog: {
    parts: [
      { s: 'c', cx: 40, cy: 42, r: 17, c: '#82c46f' },
      { s: 'c', cx: 80, cy: 42, r: 17, c: '#82c46f' },
      { s: 'e', cx: 60, cy: 70, rx: 43, ry: 33, c: '#82c46f' },
      { s: 'e', cx: 60, cy: 86, rx: 24, ry: 9, c: '#d9efc8', soft: true },
    ],
    eyes: { y: 42, gap: 20, big: true },
    smile: { y: 80, w: 15 },
  },
  bear: {
    parts: [
      { s: 'c', cx: 27, cy: 34, r: 14, c: '#a8713f' },
      { s: 'c', cx: 93, cy: 34, r: 14, c: '#a8713f' },
      { s: 'c', cx: 27, cy: 34, r: 7, c: '#dcae7e', soft: true },
      { s: 'c', cx: 93, cy: 34, r: 7, c: '#dcae7e', soft: true },
      { s: 'e', cx: 60, cy: 66, rx: 41, ry: 37, c: '#a8713f' },
      { s: 'e', cx: 60, cy: 82, rx: 18, ry: 13, c: '#ecceaa' },
    ],
    eyes: { y: 63, gap: 15 },
    nose: { y: 77, c: '#2e2a2c' },
  },
  hamster: {
    parts: [
      { s: 'c', cx: 32, cy: 38, r: 10, c: '#f0c48d' },
      { s: 'c', cx: 88, cy: 38, r: 10, c: '#f0c48d' },
      { s: 'c', cx: 32, cy: 38, r: 5, c: '#f6b8b0', soft: true },
      { s: 'c', cx: 88, cy: 38, r: 5, c: '#f6b8b0', soft: true },
      { s: 'e', cx: 60, cy: 66, rx: 43, ry: 37, c: '#f0c48d' },
      { s: 'e', cx: 60, cy: 48, rx: 3, ry: 9, c: '#d79e63', soft: true },
      { s: 'e', cx: 38, cy: 82, rx: 16, ry: 12, c: '#fff8ef' },
      { s: 'e', cx: 82, cy: 82, rx: 16, ry: 12, c: '#fff8ef' },
    ],
    eyes: { y: 64, gap: 16 },
    nose: { y: 76, c: '#e8838f' },
  },
};

export default function Avatar({ id, size = 48, className = '', animate = false, title }) {
  const info = avatarInfo(id);
  const art = ART[info.id];
  const uid = useId().replace(/:/g, '');
  const ref = (n) => `${n}-${uid}`;
  const colours = [...new Set(art.parts.filter((p) => !p.soft && !p.plain).map((p) => p.c))];
  const grad = (c) => `url(#${ref('g' + c.slice(1))})`;

  const shape = (p, i) => {
    const fill = p.soft || p.plain ? p.c : grad(p.c);
    const filter = p.soft ? `url(#${ref('soft')})` : p.plain ? undefined : `url(#${ref('fuzz')})`;
    const common = { fill, filter };
    if (p.s === 'c') return <circle key={i} {...common} cx={p.cx} cy={p.cy} r={p.r} />;
    if (p.s === 'p') return <path key={i} {...common} d={p.d} />;
    return <ellipse key={i} {...common} cx={p.cx} cy={p.cy} rx={p.rx} ry={p.ry} transform={p.rot ? `rotate(${p.rot} ${p.cx} ${p.cy})` : undefined} />;
  };

  const { y, gap, light, big } = art.eyes;
  const r = big ? 6.5 : 5;

  return (
    <svg
      className={`avatar-art ${animate ? 'av-animate' : ''} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label={title || `${info.name} the ${info.animal}`}
    >
      <defs>
        <filter id={ref('fuzz')} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={ref('soft')} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3" result="d" />
          <feGaussianBlur in="d" stdDeviation="0.8" />
        </filter>
        <filter id={ref('blur')}><feGaussianBlur stdDeviation="2.2" /></filter>
        {colours.map((c) => (
          <radialGradient key={c} id={ref('g' + c.slice(1))} cx="38%" cy="30%" r="80%">
            <stop offset="0" stopColor={shade(c, 0.35)} />
            <stop offset="0.6" stopColor={c} />
            <stop offset="1" stopColor={shade(c, -0.18)} />
          </radialGradient>
        ))}
      </defs>
      <g className="av-body">
        {art.parts.map(shape)}
        {/* rosy cheeks */}
        <g filter={`url(#${ref('blur')})`} opacity="0.7">
          <ellipse cx={60 - gap - 9} cy={big ? 74 : y + 13} rx="7" ry="4.5" fill="#f6a3ad" />
          <ellipse cx={60 + gap + 9} cy={big ? 74 : y + 13} rx="7" ry="4.5" fill="#f6a3ad" />
        </g>
        {/* beady eyes */}
        <g className="av-eyes">
          {[-gap, gap].map((dx) => (
            <g key={dx}>
              {big && <circle cx={60 + dx} cy={y} r={r + 4} fill="#fffdf8" />}
              <circle cx={60 + dx} cy={y} r={r} fill={light ? '#111' : '#1d2027'} />
              <circle cx={60 + dx + r * 0.35} cy={y - r * 0.38} r={r * 0.34} fill="#fff" />
            </g>
          ))}
        </g>
        {art.nose && (
          <ellipse cx="60" cy={art.nose.y} rx="4.2" ry="3" fill={art.nose.c} />
        )}
        {art.smile ? (
          <path d={`M${60 - art.smile.w} ${art.smile.y} Q60 ${art.smile.y + 10} ${60 + art.smile.w} ${art.smile.y}`} fill="none" stroke="#3b4a36" strokeWidth="2.4" strokeLinecap="round" />
        ) : (
          <path d={`M55 ${(art.nose?.y ?? 78) + 5} Q60 ${(art.nose?.y ?? 78) + 9} 65 ${(art.nose?.y ?? 78) + 5}`} fill="none" stroke="#4a3f45" strokeWidth="2.2" strokeLinecap="round" />
        )}
      </g>
    </svg>
  );
}
