// Tiny synthesized sound effects (no audio files needed).
let ctx;
function tone(freq, start, dur, type = 'sine', gain = 0.12) {
  ctx ??= new (window.AudioContext || window.webkitAudioContext)();
  const t = ctx.currentTime + start;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

let enabled = true;
export const setSoundEnabled = (v) => (enabled = v);

export const sfx = {
  correct() { if (!enabled) return; tone(660, 0, 0.12, 'triangle'); tone(990, 0.09, 0.22, 'triangle'); },
  wrong() { if (!enabled) return; tone(220, 0, 0.16, 'square', 0.06); tone(165, 0.12, 0.25, 'square', 0.06); },
  tap() { if (!enabled) return; tone(520, 0, 0.05, 'sine', 0.05); },
  complete() { if (!enabled) return; [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.3, 'triangle')); },
  bark() { if (!enabled) return; tone(380, 0, 0.08, 'sawtooth', 0.05); tone(300, 0.06, 0.1, 'sawtooth', 0.04); },
};
