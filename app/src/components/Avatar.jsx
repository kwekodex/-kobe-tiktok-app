// Player avatars: original animal friends drawn in the same style as Kobe
// (thick outline, round head, big shiny eyes, rosy cheeks).
import './avatar.css';

const OUT = '#2a2f38';
const S = { stroke: OUT, strokeWidth: 3, strokeLinejoin: 'round' };

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

// Big shiny eyes, shared by every animal.
function Eyes({ y = 62, gap = 15, r = 9, iris = '#2a2f38' }) {
  return (
    <g className="av-eyes">
      {[-gap, gap].map((dx) => (
        <g key={dx}>
          <circle cx={60 + dx} cy={y} r={r} fill={iris} />
          <circle cx={60 + dx + r * 0.35} cy={y - r * 0.38} r={r * 0.36} fill="#fff" />
          <circle cx={60 + dx - r * 0.3} cy={y + r * 0.35} r={r * 0.16} fill="#fff" />
        </g>
      ))}
    </g>
  );
}

const Blush = ({ y = 76, gap = 25, color = '#f49aa3' }) => (
  <g opacity="0.75">
    <ellipse cx={60 - gap} cy={y} rx="7" ry="4.5" fill={color} />
    <ellipse cx={60 + gap} cy={y} rx="7" ry="4.5" fill={color} />
  </g>
);

const Smile = ({ y = 80, w = 6 }) => (
  <path d={`M60 ${y - 4} Q60 ${y + 2} ${60 - w} ${y + 3} M60 ${y - 4} Q60 ${y + 2} ${60 + w} ${y + 3}`} fill="none" stroke={OUT} strokeWidth="2.6" strokeLinecap="round" />
);

const Head = ({ fill, rx = 40, ry = 36, cy = 64 }) => <ellipse cx="60" cy={cy} rx={rx} ry={ry} fill={fill} {...S} />;

const ART = {
  cat: () => (
    <>
      <path d="M26 50 L30 16 L52 34 Z" fill="#f2a65a" {...S} />
      <path d="M94 50 L90 16 L68 34 Z" fill="#f2a65a" {...S} />
      <path d="M32 40 L33 25 L44 34 Z" fill="#f5b8b0" />
      <path d="M88 40 L87 25 L76 34 Z" fill="#f5b8b0" />
      <Head fill="#f2a65a" />
      <path d="M52 32 q8 6 16 0 M54 40 q6 4 12 0" fill="none" stroke="#c9742e" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="60" cy="80" rx="18" ry="12" fill="#fff4e6" />
      <Eyes iris="#3b6e3a" />
      <Blush />
      <path d="M56 72 h8 l-4 5 z" fill="#e8838f" stroke={OUT} strokeWidth="1.8" strokeLinejoin="round" />
      <Smile y={81} />
      <path d="M22 74 h14 M22 82 l14 -3 M98 74 h-14 M98 82 l-14 -3" stroke={OUT} strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  fox: () => (
    <>
      <path d="M24 52 L28 12 L54 36 Z" fill="#e8743b" {...S} />
      <path d="M96 52 L92 12 L66 36 Z" fill="#e8743b" {...S} />
      <path d="M28 12 L33 28 L40 22 Z M92 12 L87 28 L80 22 Z" fill={OUT} />
      <Head fill="#e8743b" />
      <path d="M22 66 Q40 70 60 96 Q80 70 98 66 Q96 96 60 100 Q24 96 22 66 Z" fill="#fff8ef" />
      <Eyes iris="#6b3b1d" />
      <Blush y={78} />
      <ellipse cx="60" cy="78" rx="5.5" ry="4" fill={OUT} />
      <Smile y={86} w={5} />
    </>
  ),
  panda: () => (
    <>
      <circle cx="28" cy="34" r="14" fill={OUT} />
      <circle cx="92" cy="34" r="14" fill={OUT} />
      <Head fill="#fbfaf7" />
      <ellipse cx="44" cy="63" rx="12" ry="15" fill={OUT} transform="rotate(25 44 63)" />
      <ellipse cx="76" cy="63" rx="12" ry="15" fill={OUT} transform="rotate(-25 76 63)" />
      <Eyes r={6.5} gap={15} iris="#111" />
      <g className="av-eyes">
        <circle cx="47" cy="60" r="2.3" fill="#fff" />
        <circle cx="77" cy="60" r="2.3" fill="#fff" />
      </g>
      <Blush y={80} gap={27} />
      <ellipse cx="60" cy="77" rx="6" ry="4.2" fill={OUT} />
      <Smile y={85} w={5} />
    </>
  ),
  koala: () => (
    <>
      <circle cx="24" cy="44" r="18" fill="#9aa3ad" {...S} />
      <circle cx="96" cy="44" r="18" fill="#9aa3ad" {...S} />
      <circle cx="25" cy="45" r="10" fill="#e8e2dc" />
      <circle cx="95" cy="45" r="10" fill="#e8e2dc" />
      <Head fill="#9aa3ad" />
      <Eyes r={7.5} gap={17} iris="#2a2f38" />
      <Blush y={80} gap={28} />
      <ellipse cx="60" cy="76" rx="9" ry="12" fill="#3a3f48" stroke={OUT} strokeWidth="2" />
      <ellipse cx="57" cy="71" rx="2.5" ry="3.5" fill="#fff" opacity="0.5" />
      <path d="M54 92 q6 4 12 0" fill="none" stroke={OUT} strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),
  bunny: () => (
    <>
      <g className="av-ears">
        <ellipse cx="44" cy="22" rx="10" ry="26" fill="#f4ead8" {...S} />
        <ellipse cx="76" cy="22" rx="10" ry="26" fill="#f4ead8" {...S} />
        <ellipse cx="44" cy="24" rx="5" ry="18" fill="#f5b8b0" />
        <ellipse cx="76" cy="24" rx="5" ry="18" fill="#f5b8b0" />
      </g>
      <Head fill="#f4ead8" cy={68} ry={34} />
      <Eyes y={64} iris="#6b4a2b" />
      <Blush y={78} />
      <path d="M56 73 h8 l-4 4 z" fill="#e8838f" stroke={OUT} strokeWidth="1.8" strokeLinejoin="round" />
      <Smile y={82} w={5} />
      <rect x="56" y="84" width="8" height="7" rx="1.5" fill="#fff" stroke={OUT} strokeWidth="1.8" />
      <path d="M60 84 v7" stroke={OUT} strokeWidth="1.4" />
    </>
  ),
  penguin: () => (
    <>
      <Head fill="#2f3542" rx={42} ry={38} />
      <path d="M60 46 C46 30 22 42 26 64 C28 82 44 96 60 96 C76 96 92 82 94 64 C98 42 74 30 60 46 Z" fill="#fbfaf7" />
      <Eyes y={62} iris="#1d2027" />
      <Blush y={76} />
      <path d="M50 74 Q60 70 70 74 Q60 88 50 74 Z" fill="#f2a63a" stroke={OUT} strokeWidth="2.4" strokeLinejoin="round" />
    </>
  ),
  lion: () => (
    <>
      <g fill="#c7782f" {...S}>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <circle key={i} cx={60 + Math.cos(a) * 42} cy={64 + Math.sin(a) * 40} r="14" />;
        })}
      </g>
      <circle cx="30" cy="36" r="10" fill="#f0c05a" {...S} />
      <circle cx="90" cy="36" r="10" fill="#f0c05a" {...S} />
      <Head fill="#f0c05a" rx={36} ry={33} />
      <ellipse cx="60" cy="80" rx="16" ry="11" fill="#fff4dc" />
      <Eyes iris="#6b3b1d" gap={14} r={8} />
      <Blush y={77} gap={24} />
      <path d="M55 72 h10 l-5 6 z" fill="#7a4a24" stroke={OUT} strokeWidth="1.8" strokeLinejoin="round" />
      <Smile y={83} />
    </>
  ),
  frog: () => (
    <>
      <circle cx="40" cy="40" r="17" fill="#7cc46a" {...S} />
      <circle cx="80" cy="40" r="17" fill="#7cc46a" {...S} />
      <Head fill="#7cc46a" cy={68} ry={32} rx={42} />
      <g className="av-eyes">
        <circle cx="40" cy="40" r="10" fill="#fff" />
        <circle cx="80" cy="40" r="10" fill="#fff" />
        <circle cx="41" cy="41" r="6.5" fill={OUT} />
        <circle cx="81" cy="41" r="6.5" fill={OUT} />
        <circle cx="43" cy="38" r="2.3" fill="#fff" />
        <circle cx="83" cy="38" r="2.3" fill="#fff" />
      </g>
      <Blush y={74} gap={27} />
      <path d="M38 76 Q60 96 82 76" fill="none" stroke={OUT} strokeWidth="3" strokeLinecap="round" />
      <circle cx="54" cy="66" r="1.8" fill={OUT} />
      <circle cx="66" cy="66" r="1.8" fill={OUT} />
    </>
  ),
  bear: () => (
    <>
      <circle cx="28" cy="34" r="14" fill="#a8703f" {...S} />
      <circle cx="92" cy="34" r="14" fill="#a8703f" {...S} />
      <circle cx="28" cy="34" r="7" fill="#d9a877" />
      <circle cx="92" cy="34" r="7" fill="#d9a877" />
      <Head fill="#a8703f" />
      <ellipse cx="60" cy="80" rx="17" ry="13" fill="#e8c9a3" />
      <Eyes iris="#2a2f38" r={8} />
      <Blush y={76} gap={27} />
      <ellipse cx="60" cy="75" rx="6.5" ry="4.5" fill={OUT} />
      <Smile y={84} w={5} />
    </>
  ),
  hamster: () => (
    <>
      <circle cx="32" cy="36" r="10" fill="#f1c48c" {...S} />
      <circle cx="88" cy="36" r="10" fill="#f1c48c" {...S} />
      <circle cx="32" cy="36" r="5" fill="#f5b8b0" />
      <circle cx="88" cy="36" r="5" fill="#f5b8b0" />
      <Head fill="#f1c48c" rx={42} ry={36} />
      <path d="M60 40 v14" stroke="#d9a066" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="38" cy="80" rx="15" ry="12" fill="#fff8ef" />
      <ellipse cx="82" cy="80" rx="15" ry="12" fill="#fff8ef" />
      <Eyes iris="#2a2f38" r={8} gap={16} />
      <Blush y={78} gap={26} />
      <ellipse cx="60" cy="74" rx="3.5" ry="2.6" fill="#e8838f" />
      <Smile y={80} w={4} />
    </>
  ),
};

export default function Avatar({ id, size = 48, className = '', animate = false, title }) {
  const info = avatarInfo(id);
  const Art = ART[info.id];
  return (
    <svg
      className={`avatar-art ${animate ? 'av-animate' : ''} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label={title || `${info.name} the ${info.animal}`}
    >
      <g className="av-body">
        <Art />
      </g>
    </svg>
  );
}
