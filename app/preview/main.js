// Standalone 3D Kobe preview: mood buttons, drag to turn him around.
import { getEngine, webglAvailable } from '../src/components/kobe3d/engine.js';

const MOODS = [
  ['idle', 'Waiting'], ['happy', 'Right answer'], ['sad', 'Wrong answer'],
  ['cheer', 'Lesson done'], ['think', 'Thinking'], ['sleep', 'Sleeping'],
];
const canvas = document.getElementById('kobe');
const status = document.getElementById('status');

if (!webglAvailable()) {
  status.textContent = "This device can't show 3D, so the app would show the flat Kobe here.";
} else {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const size = () => {
    const w = canvas.clientWidth;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(w * 1.1 * dpr);
  };
  size();
  window.addEventListener('resize', size);
  const engine = getEngine();
  const inst = engine.add(canvas, 'idle');

  const bar = document.getElementById('moods');
  for (const [mood, label] of MOODS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'mood' + (mood === 'idle' ? ' on' : '');
    b.textContent = label;
    b.addEventListener('click', () => {
      engine.setMood(inst, mood);
      bar.querySelectorAll('.mood').forEach((x) => x.classList.toggle('on', x === b));
      document.getElementById('flat').dataset.mood = mood;
      window.dispatchEvent(new CustomEvent('mood', { detail: mood }));
    });
    bar.append(b);
  }

  // drag to spin him around
  let yaw = 0, dragging = false, lastX = 0;
  canvas.addEventListener('pointerdown', (e) => { dragging = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    yaw += (e.clientX - lastX) * 0.012;
    lastX = e.clientX;
    engine.setYaw(inst, yaw);
  });
  const end = () => { dragging = false; };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  document.getElementById('reset').addEventListener('click', () => { yaw = 0; engine.setYaw(inst, 0); });
  canvas.addEventListener('click', () => engine.boop(inst));
}
