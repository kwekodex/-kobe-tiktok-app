// Baby Kobe the Aussie puppy: an animated SVG mascot.
// mood: 'idle' | 'happy' | 'sad' | 'cheer' | 'think' | 'sleep'
import './kobe.css';

const OUTLINE = '#2a2f38';
// Colors sampled from baby Kobe's photo: pale silver merle, black eye
// patches, tan eyebrows/cheeks, white muzzle and chest.
const MERLE = '#c9d1db';
const MERLE_DARK = '#2c3139';
const MERLE_MID = '#7f8995';
const MERLE_LIGHT = '#e3e8ee';
const COPPER = '#cd8a54';
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
        <circle cx="130" cy="176" r="5" fill={MERLE_MID} />
        <circle cx="70" cy="182" r="4" fill={MERLE_MID} />
        <path d="M70 160 Q100 148 130 160 Q132 196 100 206 Q68 196 70 160 Z" fill={WHITE} />

        {/* stubby paws */}
        <g className="k-legs">
          <rect x="80" y="188" width="17" height="21" rx="8.5" fill={WHITE} stroke={OUTLINE} strokeWidth="3" />
          <rect x="103" y="188" width="17" height="21" rx="8.5" fill={WHITE} stroke={OUTLINE} strokeWidth="3" />
          <path d="M86 206 v-4 M91 206 v-4 M109 206 v-4 M114 206 v-4" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* big puppy head */}
        <g className="k-head">
          <g className="k-ear k-ear-l">
            <path d="M54 58 Q22 60 24 100 Q28 128 46 122 Q58 100 66 70 Z" fill={MERLE_DARK} stroke={OUTLINE} strokeWidth="3" strokeLinejoin="round" />
            <path d="M34 78 Q30 98 34 112" fill="none" stroke={MERLE_MID} strokeWidth="5" strokeLinecap="round" />
            <circle cx="44" cy="74" r="3.5" fill={MERLE_MID} />
          </g>
          <g className="k-ear k-ear-r">
            <path d="M146 58 Q178 60 176 100 Q172 128 154 122 Q142 100 134 70 Z" fill={MERLE_DARK} stroke={OUTLINE} strokeWidth="3" strokeLinejoin="round" />
            <path d="M166 78 Q170 98 166 112" fill="none" stroke={MERLE_MID} strokeWidth="5" strokeLinecap="round" />
            <circle cx="156" cy="72" r="3.5" fill={MERLE_MID} />
          </g>

          <path d="M100 32 C150 32 166 64 164 96 C162 132 136 146 100 146 C64 146 38 132 36 96 C34 64 50 32 100 32 Z" fill={MERLE} stroke={OUTLINE} strokeWidth="3" />
          {/* merle spots on the crown */}
          <path d="M116 36 Q138 34 154 54 Q144 58 136 50 Q128 54 120 46 Z" fill={MERLE_DARK} />
          <circle cx="78" cy="42" r="5" fill={MERLE_DARK} />
          <circle cx="66" cy="54" r="3.5" fill={MERLE_MID} />
          <circle cx="140" cy="62" r="3" fill={MERLE_MID} />

          {/* tan eyebrows: Kobe's big copper brow marks */}
          <path d="M56 70 Q66 52 90 58 Q92 66 84 70 Q70 66 56 70 Z" fill={COPPER} />
          <path d="M144 70 Q134 52 110 58 Q108 66 116 70 Q130 66 144 70 Z" fill={COPPER} />

          {/* black eye patches */}
          <path d="M44 82 Q50 68 70 70 Q84 72 88 82 Q90 98 78 106 Q58 110 46 98 Z" fill={MERLE_DARK} />
          <path d="M156 82 Q150 68 130 70 Q116 72 112 82 Q110 98 122 106 Q142 110 154 98 Z" fill={MERLE_DARK} />

          {/* pale blaze between the eyes */}
          <path d="M88 36 Q100 32 112 36 Q110 70 114 100 Q100 104 86 100 Q90 70 88 36 Z" fill={MERLE_LIGHT} />

          {/* cheeks: big tan patch on his right, tan-and-smoke on his left */}
          <path d="M42 96 Q46 120 72 132 Q82 124 76 110 Q60 110 48 100 Z" fill={COPPER} />
          <path d="M158 96 Q154 120 128 132 Q118 124 124 110 Q140 110 152 100 Z" fill="#9b7254" />
          <path d="M150 104 Q146 116 134 122" fill="none" stroke={COPPER} strokeWidth="5" strokeLinecap="round" />

          {/* white muzzle */}
          <ellipse cx="100" cy="116" rx="27" ry="18" fill={WHITE} stroke={OUTLINE} strokeWidth="2.5" />
          {/* rosy puppy blush */}
          <ellipse cx="80" cy="122" rx="6" ry="3.5" fill="#f49aa3" opacity="0.6" />
          <ellipse cx="120" cy="122" rx="6" ry="3.5" fill="#f49aa3" opacity="0.6" />
          <g className="k-brows" />
          <g className="k-brows-sad">
            <path d="M64 70 L84 63" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M136 70 L116 63" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
          </g>

          {/* big shiny eyes: icy blue and amber, like Kobe */}
          <g className="k-eyes-open">
            <circle cx="76" cy="88" r="15" fill="#fff" stroke={OUTLINE} strokeWidth="2.5" />
            <circle cx="124" cy="88" r="15" fill="#fff" stroke={OUTLINE} strokeWidth="2.5" />
            <g className="k-pupils">
              <circle cx="77" cy="89" r="11.5" fill="#9cc8ea" stroke="#5f93bf" strokeWidth="1.5" />
              <circle cx="123" cy="89" r="11.5" fill="#a47b3f" stroke="#6b4c22" strokeWidth="1.5" />
              <circle cx="77" cy="89" r="7" fill="#15181d" />
              <circle cx="123" cy="89" r="7" fill="#15181d" />
              <circle cx="81" cy="84" r="4" fill="#fff" />
              <circle cx="127" cy="84" r="4" fill="#fff" />
              <circle cx="73" cy="93" r="2" fill="#fff" />
              <circle cx="119" cy="93" r="2" fill="#fff" />
            </g>
          </g>
          <g className="k-eyes-happy">
            <path d="M62 94 Q76 72 90 94 Q76 84 62 94 Z" fill="#fff" stroke={OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M110 94 Q124 72 138 94 Q124 84 110 94 Z" fill="#fff" stroke={OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
          </g>
          <g className="k-eyes-closed">
            <path d="M64 90 Q76 97 88 90" fill="none" stroke={MERLE_LIGHT} strokeWidth="4" strokeLinecap="round" />
            <path d="M112 90 Q124 97 136 90" fill="none" stroke={MERLE_LIGHT} strokeWidth="4" strokeLinecap="round" />
          </g>
          <g className="k-tear">
            <path d="M66 104 q-4 8 0 11 q4 -3 0 -11 z" fill="#6cc3f5" />
          </g>

          {/* nose with Kobe's pink spots + mouth */}
          <path d="M92 106 Q100 101 108 106 Q106 113 100 114 Q94 113 92 106 Z" fill="#1d2027" />
          <path d="M93 106 Q96 103 100 105 Q100 110 96 111 Q93 110 93 106 Z" fill="#f2a5b4" />
          <circle cx="105.5" cy="106" r="1.8" fill="#f2a5b4" />
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
            <text x="150" y="34" fontSize="18" fontWeight="900" fill={MERLE_MID}>z</text>
            <text x="164" y="18" fontSize="14" fontWeight="900" fill={MERLE_MID}>z</text>
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
