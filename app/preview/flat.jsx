import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import Kobe2D from '../src/components/Kobe2D.jsx';

function Flat() {
  const [mood, setMood] = useState('idle');
  useEffect(() => {
    const on = (e) => setMood(e.detail);
    window.addEventListener('mood', on);
    return () => window.removeEventListener('mood', on);
  }, []);
  return <Kobe2D mood={mood} size={150} />;
}
createRoot(document.getElementById('flat')).render(<Flat />);
