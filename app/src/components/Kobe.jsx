// Kobe the Aussie: an animated SVG mascot.
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
      <ellipse className="k-shadow" cx="100" cy="212" rx="58" ry="7" fill="#000" opacity="0.12" />
      <g className="k-root">
        {/* fluffy tail nub */}
        <g className="k-tail">
          <path d="M140 168 q26 -18 30 -6 q4 10 -22 22 z" fill={MERLE} stroke={OUTLINE} strokeWidth="3" strokeLinejoin="round" />
          <path d="M158 160 q8 -2 10 4" fill="none" stroke={WHITE} strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* haunches + body */}
        <ellipse cx="60" cy="186" rx="24" ry="20" fill={MERLE} stroke={OUTLINE} strokeWidth="3" />
        <ellipse cx="140" cy="186" rx="24" ry="20" fill={MERLE} stroke={OUTLINE} strokeWidth="3" />
        <path d="M58 200 q-4 -70 42 -78 q46 8 42 78 z" fill={MERLE} stroke={OUTLINE} strokeWidth="3" strokeLinejoin="round" />
        <circle cx="70" cy="160" r="9" fill={MERLE_DARK} opacity="0.85" />
        <circle cx="133" cy="172" r="7" fill={MERLE_DARK} opacity="0.85" />
        <circle cx="126" cy="150" r="5" fill={MERLE_LIGHT} />

        {/* white chest ruff */}
        <path
          d="M74 132 q8 10 4 18 q10 -4 10 6 q8 -6 12 2 q4 -8 12 -2 q0 -10 10 -6 q-4 -8 4 -18 q-4 50 -26 66 q-22 -16 -26 -66 z"
          fill={WHITE}
          stroke={OUTLINE}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* front legs */}
        <g className="k-legs">
          <rect x="76" y="168" width="20" height="40" rx="10" fill={WHITE} stroke={OUTLINE} strokeWidth="3" />
          <rect x="104" y="168" width="20" height="40" rx="10" fill={WHITE} stroke={OUTLINE} strokeWidth="3" />
          <path d="M82 204 v-6 M90 204 v-6 M110 204 v-6 M118 204 v-6" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
          <path d="M80 176 q8 -4 14 0" fill="none" stroke={COPPER} strokeWidth="4" strokeLinecap="round" />
          <path d="M106 176 q8 -4 14 0" fill="none" stroke={COPPER} strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* head */}
        <g className="k-head">
          <g className="k-ear k-ear-l">
            <path d="M56 72 Q38 46 44 26 Q64 26 88 46 Z" fill={MERLE_DARK} stroke={OUTLINE} strokeWidth="3" strokeLinejoin="round" />
            <path d="M58 62 Q48 46 50 36 Q62 38 76 48 Z" fill="#e8a7a0" />
            <path className="k-ear-tip" d="M44 26 Q28 28 22 50 Q36 48 54 34 Z" fill={MERLE_DARK} stroke={OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
          </g>
          <g className="k-ear k-ear-r">
            <path d="M144 72 Q162 46 156 26 Q136 26 112 46 Z" fill={MERLE} stroke={OUTLINE} strokeWidth="3" strokeLinejoin="round" />
            <path d="M142 62 Q152 46 150 36 Q138 38 124 48 Z" fill="#e8a7a0" />
            <path className="k-ear-tip" d="M156 26 Q172 28 178 50 Q164 48 146 34 Z" fill={MERLE} stroke={OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="160" cy="40" r="4" fill={MERLE_DARK} />
          </g>

          <path d="M100 36 C138 36 154 62 152 88 C150 112 132 124 100 124 C68 124 50 112 48 88 C46 62 62 36 100 36 Z" fill={MERLE} stroke={OUTLINE} strokeWidth="3" />
          {/* merle patches */}
          <path d="M60 60 q10 -22 32 -20 q-6 14 -14 30 q-12 4 -18 -10 z" fill={MERLE_DARK} />
          <circle cx="132" cy="56" r="8" fill={MERLE_DARK} />
          <circle cx="142" cy="74" r="5" fill={MERLE_DARK} />
          <circle cx="124" cy="46" r="4" fill={MERLE_LIGHT} />
          <circle cx="70" cy="88" r="4" fill={MERLE_LIGHT} />

          {/* white blaze + muzzle */}
          <path d="M95 38 Q100 35 105 38 L108 70 Q100 74 92 70 Z" fill={WHITE} />
          <ellipse cx="100" cy="104" rx="30" ry="21" fill={WHITE} stroke={OUTLINE} strokeWidth="2.5" />
          {/* copper cheeks + brow dots */}
          <ellipse cx="68" cy="102" rx="11" ry="8" fill={COPPER} opacity="0.95" />
          <ellipse cx="132" cy="102" rx="11" ry="8" fill={COPPER} opacity="0.95" />
          <g className="k-brows">
            <ellipse cx="78" cy="58" rx="6" ry="4" fill={COPPER} />
            <ellipse cx="122" cy="58" rx="6" ry="4" fill={COPPER} />
          </g>
          <g className="k-brows-sad">
            <path d="M70 62 L88 56" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M130 62 L112 56" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
          </g>

          {/* eyes: Kobe has one blue eye and one brown eye */}
          <g className="k-eyes-open">
            <circle cx="80" cy="76" r="12" fill="#fff" stroke={OUTLINE} strokeWidth="2.5" />
            <circle cx="120" cy="76" r="12" fill="#fff" stroke={OUTLINE} strokeWidth="2.5" />
            <g className="k-pupils">
              <circle cx="81" cy="77" r="7.5" fill="#4aa8e8" />
              <circle cx="121" cy="77" r="7.5" fill="#7a4a24" />
              <circle cx="81" cy="77" r="4" fill="#15181d" />
              <circle cx="121" cy="77" r="4" fill="#15181d" />
              <circle cx="84" cy="73.5" r="2.4" fill="#fff" />
              <circle cx="124" cy="73.5" r="2.4" fill="#fff" />
            </g>
          </g>
          <g className="k-eyes-happy">
            <path d="M69 80 Q80 66 91 80" fill="none" stroke={OUTLINE} strokeWidth="4" strokeLinecap="round" />
            <path d="M109 80 Q120 66 131 80" fill="none" stroke={OUTLINE} strokeWidth="4" strokeLinecap="round" />
          </g>
          <g className="k-eyes-closed">
            <path d="M70 78 Q80 84 90 78" fill="none" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M110 78 Q120 84 130 78" fill="none" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
          </g>
          <g className="k-tear">
            <path d="M74 90 q-4 8 0 11 q4 -3 0 -11 z" fill="#6cc3f5" />
          </g>

          {/* nose + mouth */}
          <path d="M90 94 Q100 88 110 94 Q108 104 100 106 Q92 104 90 94 Z" fill="#1d2027" />
          <ellipse cx="96" cy="94" rx="3" ry="1.6" fill="#fff" opacity="0.6" />
          <g className="k-mouth-smile">
            <path d="M100 106 Q100 114 90 115 M100 106 Q100 114 110 115" fill="none" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
          </g>
          <g className="k-mouth-open">
            <path d="M86 110 Q100 108 114 110 Q112 126 100 127 Q88 126 86 110 Z" fill="#7a2230" stroke={OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
            <path className="k-tongue" d="M92 118 Q100 114 108 118 Q109 132 100 134 Q91 132 92 118 Z" fill="#f07c8a" stroke={OUTLINE} strokeWidth="2" />
            <path d="M100 119 v9" stroke="#c95565" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <g className="k-mouth-sad">
            <path d="M90 116 Q100 108 110 116" fill="none" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
          </g>
          <g className="k-zzz">
            <text x="146" y="40" fontSize="18" fontWeight="900" fill="#8e9bad">z</text>
            <text x="160" y="24" fontSize="14" fontWeight="900" fill="#8e9bad">z</text>
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
