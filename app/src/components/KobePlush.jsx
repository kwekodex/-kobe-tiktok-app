// Plush Baby Kobe: a soft-toy take on the mascot (fuzzy edges, rounded
// shapes, beady eyes, rosy cheeks).
// mood: 'idle' | 'happy' | 'sad' | 'cheer' | 'think' | 'sleep'
import { useId } from 'react';
import './kobe-plush.css';

export default function KobePlush({ mood = 'idle', size = 200, className = '', onClick, title = 'Kobe the Aussie' }) {
  const uid = useId().replace(/:/g, '');
  const id = (n) => `${n}-${uid}`;
  const url = (n) => `url(#${id(n)})`;

  return (
    <svg className={`kplush mood-${mood} ${className}`} width={size} height={size * 1.1} viewBox="0 0 200 220" role="img" aria-label={title} onClick={onClick}>
      <defs>
        {/* fuzzy plush edges */}
        <filter id={id('fuzz')} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* soft-edged markings */}
        <filter id={id('soft')} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="4" result="d" />
          <feGaussianBlur in="d" stdDeviation="0.9" />
        </filter>
        <filter id={id('blur')}><feGaussianBlur stdDeviation="3" /></filter>
        {/* fine fur grain laid over the coat */}
        <filter id={id('grain')} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="1" seed="11" result="g" />
          <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>

        <radialGradient id={id('coat')} cx="38%" cy="30%" r="80%">
          <stop offset="0" stopColor="#eef2f6" />
          <stop offset="0.55" stopColor="#cfd7e0" />
          <stop offset="1" stopColor="#a9b4c1" />
        </radialGradient>
        <radialGradient id={id('cream')} cx="40%" cy="30%" r="80%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ece6dd" />
        </radialGradient>
        <radialGradient id={id('dark')} cx="40%" cy="30%" r="85%">
          <stop offset="0" stopColor="#5a626e" />
          <stop offset="1" stopColor="#2f353e" />
        </radialGradient>
        <radialGradient id={id('tan')} cx="40%" cy="35%" r="80%">
          <stop offset="0" stopColor="#ecb889" />
          <stop offset="1" stopColor="#c98a57" />
        </radialGradient>
      </defs>

      <ellipse cx="100" cy="210" rx="56" ry="7" fill="#000" opacity="0.1" filter={url('blur')} />

      <g className="kp-root">
        {/* body */}
        <g filter={url('fuzz')}>
          <ellipse cx="100" cy="170" rx="52" ry="40" fill={url('coat')} />
          <ellipse cx="62" cy="195" rx="19" ry="12" fill={url('coat')} />
          <ellipse cx="138" cy="195" rx="19" ry="12" fill={url('coat')} />
        </g>
        <g filter={url('soft')} opacity="0.75">
          <ellipse cx="66" cy="160" rx="10" ry="8" fill="#3d444e" />
          <ellipse cx="136" cy="178" rx="8" ry="7" fill="#7f8995" />
        </g>
        <ellipse cx="100" cy="168" rx="28" ry="30" fill={url('cream')} filter={url('fuzz')} />
        {/* paws */}
        <g filter={url('fuzz')}>
          <ellipse cx="84" cy="203" rx="13" ry="9" fill={url('cream')} />
          <ellipse cx="116" cy="203" rx="13" ry="9" fill={url('cream')} />
        </g>
        <rect x="70" y="140" width="60" height="70" fill="#000" filter={url('grain')} opacity="0" />

        {/* head */}
        <g className="kp-head">
          {/* floppy ears */}
          <g className="kp-ear kp-ear-l" filter={url('fuzz')}>
            <path d="M52 62 C28 60 20 92 30 116 C38 132 52 128 58 112 C62 96 64 78 52 62 Z" fill={url('dark')} />
          </g>
          <g className="kp-ear kp-ear-r" filter={url('fuzz')}>
            <path d="M148 62 C172 60 180 92 170 116 C162 132 148 128 142 112 C138 96 136 78 148 62 Z" fill={url('dark')} />
          </g>

          <ellipse cx="100" cy="94" rx="64" ry="56" fill={url('coat')} filter={url('fuzz')} />
          {/* merle patches on the crown */}
          <g filter={url('soft')} opacity="0.85">
            <ellipse cx="128" cy="52" rx="16" ry="9" fill="#3d444e" transform="rotate(20 128 52)" />
            <ellipse cx="74" cy="48" rx="6" ry="5" fill="#3d444e" />
            <ellipse cx="62" cy="62" rx="4" ry="3.5" fill="#7f8995" />
          </g>
          {/* pale blaze */}
          <ellipse cx="100" cy="74" rx="12" ry="34" fill="#f4f6f8" filter={url('soft')} />
          {/* black eye patches on the outer sides */}
          <g filter={url('soft')}>
            <ellipse cx="66" cy="92" rx="22" ry="17" fill="#2f353e" transform="rotate(12 66 92)" />
            <ellipse cx="134" cy="92" rx="22" ry="17" fill="#2f353e" transform="rotate(-12 134 92)" />
          </g>
          {/* tan brows and cheeks */}
          <g filter={url('soft')}>
            <ellipse cx="74" cy="72" rx="9" ry="5" fill={url('tan')} transform="rotate(-15 74 72)" />
            <ellipse cx="126" cy="72" rx="9" ry="5" fill={url('tan')} transform="rotate(15 126 72)" />
            <ellipse cx="54" cy="116" rx="14" ry="11" fill={url('tan')} />
            <ellipse cx="146" cy="116" rx="14" ry="11" fill="#b08466" />
          </g>
          {/* muzzle */}
          <ellipse cx="100" cy="118" rx="28" ry="20" fill={url('cream')} filter={url('fuzz')} />
          {/* rosy cheeks */}
          <g filter={url('blur')} opacity="0.7">
            <ellipse cx="74" cy="122" rx="9" ry="6" fill="#f6a3ad" />
            <ellipse cx="126" cy="122" rx="9" ry="6" fill="#f6a3ad" />
          </g>

          {/* beady eyes, with Kobe's blue and amber as thin rings */}
          <g className="kp-eyes">
            <circle cx="74" cy="94" r="7.5" fill="#9cc8ea" />
            <circle cx="126" cy="94" r="7.5" fill="#b8894a" />
            <circle cx="74" cy="94" r="5.8" fill="#1d2027" />
            <circle cx="126" cy="94" r="5.8" fill="#1d2027" />
            <circle cx="76" cy="91.5" r="1.8" fill="#fff" />
            <circle cx="128" cy="91.5" r="1.8" fill="#fff" />
          </g>
          <g className="kp-eyes-happy">
            <path d="M67 96 Q74 87 81 96" fill="none" stroke="#1d2027" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M119 96 Q126 87 133 96" fill="none" stroke="#1d2027" strokeWidth="3.4" strokeLinecap="round" />
          </g>
          <g className="kp-brows-sad">
            <path d="M64 80 L82 75" stroke="#e8edf2" strokeWidth="3" strokeLinecap="round" />
            <path d="M136 80 L118 75" stroke="#e8edf2" strokeWidth="3" strokeLinecap="round" />
          </g>
          <path className="kp-tear" d="M70 103 q-4 7 0 10 q4 -3 0 -10 z" fill="#7cc8f2" />
          <g className="kp-eyes-closed">
            <path d="M67 94 Q74 99 81 94" fill="none" stroke="#e8edf2" strokeWidth="3" strokeLinecap="round" />
            <path d="M119 94 Q126 99 133 94" fill="none" stroke="#e8edf2" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* nose with Kobe's pink spot */}
          <path d="M92 108 Q100 103 108 108 Q106 115 100 116 Q94 115 92 108 Z" fill="#26292f" />
          <ellipse cx="96.5" cy="108.5" rx="2.6" ry="1.8" fill="#f2a5b4" />
          <ellipse cx="103.5" cy="107" rx="1.6" ry="0.9" fill="#fff" opacity="0.5" />
          {/* small upward smile */}
          <path className="kp-smile" d="M93 121 Q100 127 107 121" fill="none" stroke="#4a3f45" strokeWidth="2.4" strokeLinecap="round" />
          <path className="kp-sad-mouth" d="M93 126 Q100 120 107 126" fill="none" stroke="#4a3f45" strokeWidth="2.4" strokeLinecap="round" />
          <g className="kp-open">
            <path d="M92 120 Q100 118 108 120 Q106 131 100 132 Q94 131 92 120 Z" fill="#8a3341" />
            <path d="M95 126 Q100 123 105 126 Q105 134 100 135 Q95 134 95 126 Z" fill="#f28a97" />
          </g>
        </g>
      </g>
      <g className="kp-sparkles">
        <path d="M26 64 l4 9 l9 4 l-9 4 l-4 9 l-4 -9 l-9 -4 l9 -4 z" fill="#ffd36b" />
        <path d="M172 98 l3 6 l6 3 l-6 3 l-3 6 l-3 -6 l-6 -3 l6 -3 z" fill="#ffd36b" />
        <path d="M164 34 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 z" fill="#ffa3b4" />
      </g>
      <g className="kp-zzz">
        <text x="150" y="40" fontSize="16" fontWeight="800" fill="#9aa4b0">z</text>
        <text x="163" y="25" fontSize="12" fontWeight="800" fill="#9aa4b0">z</text>
      </g>
    </svg>
  );
}
