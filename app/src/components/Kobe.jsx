// Baby Kobe. Shows the 3D model when the device supports it (and the
// learner hasn't turned it off), with the flat SVG while 3D loads or as a fallback.
import { useEffect, useRef, useState } from 'react';
import Kobe2D from './Kobe2D.jsx';
import { useStore } from '../lib/store.jsx';

let enginePromise;
const loadEngine = () => (enginePromise ??= import('./kobe3d/engine.js'));

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function Kobe3D({ mood, size, className, onClick, title, fallback }) {
  const canvasRef = useRef(null);
  const instRef = useRef(null);
  const engineRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    loadEngine()
      .then((mod) => {
        if (!alive || !canvasRef.current) return;
        if (!mod.webglAvailable()) { setFailed(true); return; }
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        canvasRef.current.width = Math.round(size * dpr);
        canvasRef.current.height = Math.round(size * 1.1 * dpr);
        engineRef.current = mod.getEngine();
        instRef.current = engineRef.current.add(canvasRef.current, mood);
        setReady(true);
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
      if (instRef.current) engineRef.current.remove(instRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  useEffect(() => {
    if (instRef.current) engineRef.current.setMood(instRef.current, mood);
  }, [mood, ready]);

  if (failed) return fallback;

  return (
    <span className={`kobe3d ${className}`} style={{ width: size, height: size * 1.1 }}>
      {!ready && <span className="kobe3d-placeholder">{fallback}</span>}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={title}
        style={{ width: size, height: size * 1.1, opacity: ready ? 1 : 0 }}
        onClick={(e) => {
          if (instRef.current) engineRef.current.boop(instRef.current);
          onClick?.(e);
        }}
      />
    </span>
  );
}

export default function Kobe({ mood = 'idle', size = 160, className = '', onClick, title = 'Kobe the Aussie' }) {
  const { state } = useStore();
  const fallback = <Kobe2D mood={mood} size={size} className={className} onClick={onClick} title={title} />;
  if (!state.kobe3d || prefersReducedMotion()) return fallback;
  return <Kobe3D mood={mood} size={size} className={className} onClick={onClick} title={title} fallback={fallback} />;
}
