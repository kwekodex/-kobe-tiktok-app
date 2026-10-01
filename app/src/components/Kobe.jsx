// Baby Kobe the Aussie puppy: an animated SVG mascot.
// mood: 'idle' | 'happy' | 'sad' | 'cheer' | 'think' | 'sleep'
import './kobe.css';

const OUTLINE = '#2a2f38';
const MERLE = '#8e9bad';
const MERLE_DARK = '#3d4654';
const MERLE_LIGHT = '#b8c3d0';
const COPPER = '#d07a3c';
const WHITE = '#fbfaf7';

export default function Kobe({ mood = 'idle', size = 160, className = '', onClick, title = 'Kobe the Aussie' }) {
  return (
    <svg
      className={`kobe mood-${mood} ${className}`}
      width={size}
      height={size * 1.1}
      viewBox="0 0 200 220"
      role="img"
      aria-label={title}
      onClick={onClick}
    >
      <ellipse className="k-shadow" cx="100" cy="212" rx="50" ry="6" fill="#000" opacity="0.12" />
      <g className="k-root">
        {/* tiny fluffy tail */}
        <g className="k-tail">
          <path d="M130 184 q20 -16 24 -4 q2 9 -20 13 z" fill={MERLE} stroke={OUTLINE} strokeWidth="3" strokeLinejoin="round" />
        </g>

        {/* chubby little body */}
        <ellipse cx="68" cy="198" rx="18" ry="12" fill={MERLE} stroke={OUTLINE} strokeWidth="3" />
        <ellipse cx="132" cy="198" rx="18" ry="12" fill={MERLE} stroke={OUTLINE} strokeWidth="3" />
        <ellipse cx="100" cy="180" rx="40" ry="30" fill={MERLE} stroke={OUTLINE} strokeWidth="3" />
        <circle cx="126" cy="172" r="6" fill={MERLE_DARK} opacity="0.85" />
        <ellipse cx="100" cy="178" rx="21" ry="22" fill={WHITE} />

        {/* stubby paws */}
        <g className="k-legs">
          <rect x="80" y="188" width="17" height="21" rx="8.5" fill={WHITE} stroke={OUTLINE} strokeWidth="3" />
          <rect x="103" y="188" width="17" height="21" rx="8.5" fill={WHITE} stroke={OUTLINE} strokeWidth="3" />
          <path d="M86 206 v-4 M91 206 v-4 M109 206 v-4 M114 206 v-4" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* big puppy head */}
        <g className="k-head">
          <g className="k-ear k-ear-l">
            <path d="M54 60 Q22 62 24 102 Q28 128 46 122 Q58 100 66 72 Z" fill={MERLE_DARK} stroke={OUTLINE} strokeWidth="3" strokeLinejoin="round" />
            <path d="M50 74 Q34 80 36 104 Q40 114 46 110 Q52 94 56 78 Z" fill="#e8a7a0" opacity="0.8" />
          </g>
          <g className="k-ear k-ear-r">
            <path d="M146 60 Q178 62 176 102 Q172 128 154 122 Q142 100 134 72 Z" fill={MERLE} stroke={OUTLINE} strokeWidth="3" strokeLinejoin="round" />
            <path d="M150 74 Q166 80 164 104 Q160 114 154 110 Q148 94 144 78 Z" fill="#e8a7a0" opacity="0.8" />
            <circle cx="164" cy="90" r="4" fill={MERLE_DARK} />
          </g>

          <path d="M100 32 C150 32 166 64 164 96 C162 132 136 146 100 146 C64 146 38 132 36 96 C34 64 50 32 100 32 Z" fill={MERLE} stroke={OUTLINE} strokeWidth="3" />
          {/* fluffy head tuft */}
          <path d="M88 36 Q90 18 100 28 Q108 14 112 36 Z" fill={MERLE} stroke={OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M86 40 L114 40" stroke={MERLE} strokeWidth="5" />
          {/* merle patches */}
          <path d="M50 74 q6 -32 36 -36 q-4 20 -12 40 q-16 8 -24 -4 z" fill={MERLE_DARK} />
          <circle cx="136" cy="56" r="8" fill={MERLE_DARK} />
          <circle cx="150" cy="76" r="5" fill={MERLE_DARK} />
          <circle cx="126" cy="44" r="4" fill={MERLE_LIGHT} />

          {/* white blaze + muzzle */}
          <path d="M97 50 Q100 46 103 50 L108 76 Q100 80 92 76 Z" fill={WHITE} />
          <ellipse cx="62" cy="110" rx="10" ry="7" fill={COPPER} />
          <ellipse cx="138" cy="110" rx="10" ry="7" fill={COPPER} />
          <ellipse cx="100" cy="116" rx="27" ry="18" fill={WHITE} stroke={OUTLINE} strokeWidth="2.5" />
          {/* rosy puppy blush */}
          <ellipse cx="58" cy="116" rx="9" ry="5" fill="#f49aa3" opacity="0.7" />
          <ellipse cx="142" cy="116" rx="9" ry="5" fill="#f49aa3" opacity="0.7" />
          <g className="k-brows">
            <ellipse cx="74" cy="64" rx="6" ry="4" fill={COPPER} />
            <ellipse cx="126" cy="64" rx="6" ry="4" fill={COPPER} />
          </g>
          <g className="k-brows-sad">
            <path d="M64 70 L84 63" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M136 70 L116 63" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
          </g>

          {/* big shiny eyes: one blue, one brown, like Kobe */}
          <g className="k-eyes-open">
            <circle cx="76" cy="88" r="16" fill="#fff" stroke={OUTLINE} strokeWidth="2.5" />
            <circle cx="124" cy="88" r="16" fill="#fff" stroke={OUTLINE} strokeWidth="2.5" />
            <g className="k-pupils">
              <circle cx="77" cy="89" r="12" fill="#4aa8e8" />
              <circle cx="123" cy="89" r="12" fill="#7a4a24" />
              <circle cx="77" cy="89" r="7" fill="#15181d" />
              <circle cx="123" cy="89" r="7" fill="#15181d" />
              <circle cx="81" cy="84" r="4" fill="#fff" />
              <circle cx="127" cy="84" r="4" fill="#fff" />
              <circle cx="73" cy="93" r="2" fill="#fff" />
              <circle cx="119" cy="93" r="2" fill="#fff" />
            </g>
          </g>
          <g className="k-eyes-happy">
            <path d="M63 92 Q76 76 89 92" fill="none" stroke={OUTLINE} strokeWidth="4.5" strokeLinecap="round" />
            <path d="M111 92 Q124 76 137 92" fill="none" stroke={OUTLINE} strokeWidth="4.5" strokeLinecap="round" />
          </g>
          <g className="k-eyes-closed">
            <path d="M64 90 Q76 97 88 90" fill="none" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M112 90 Q124 97 136 90" fill="none" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
          </g>
          <g className="k-tear">
            <path d="M66 104 q-4 8 0 11 q4 -3 0 -11 z" fill="#6cc3f5" />
          </g>

          {/* little nose + mouth */}
          <path d="M92 106 Q100 101 108 106 Q106 113 100 114 Q94 113 92 106 Z" fill="#1d2027" />
          <ellipse cx="97" cy="105" rx="2.5" ry="1.3" fill="#fff" opacity="0.6" />
          <g className="k-mouth-smile">
            <path d="M100 114 Q100 121 92 122 M100 114 Q100 121 108 122" fill="none" stroke={OUTLINE} strokeWidth="2.8" strokeLinecap="round" />
          </g>
          <g className="k-mouth-open">
            <path d="M88 118 Q100 116 112 118 Q110 132 100 133 Q90 132 88 118 Z" fill="#7a2230" stroke={OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
            <path className="k-tongue" d="M93 125 Q100 121 107 125 Q108 138 100 140 Q92 138 93 125 Z" fill="#f07c8a" stroke={OUTLINE} strokeWidth="2" />
          </g>
          <g className="k-mouth-sad">
            <path d="M91 125 Q100 118 109 125" fill="none" stroke={OUTLINE} strokeWidth="2.8" strokeLinecap="round" />
          </g>
          <g className="k-zzz">
            <text x="150" y="34" fontSize="18" fontWeight="900" fill="#8e9bad">z</text>
            <text x="164" y="18" fontSize="14" fontWeight="900" fill="#8e9bad">z</text>
          </g>
        </g>
      </g>
      <g className="k-sparkles">
        <path d="M26 60 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 z" fill="#ffc83d" />
        <path d="M172 96 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 z" fill="#ffc83d" />
        <path d="M166 30 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 z" fill="#ff8fa3" />
      </g>
    </svg>
  );
}
