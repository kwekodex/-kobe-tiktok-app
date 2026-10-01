import { useState } from 'react';
import Kobe from './Kobe.jsx';
import { useStore } from '../lib/store.jsx';
import { api } from '../lib/api.js';
import { sfx } from '../lib/sound.js';

const GOALS = [
  { xp: 10, label: 'Casual', note: '5 min / day' },
  { xp: 20, label: 'Regular', note: '10 min / day' },
  { xp: 30, label: 'Serious', note: '15 min / day' },
  { xp: 50, label: 'Intense', note: '20 min / day' },
];
const AVATARS = ['🐶', '🐱', '🦊', '🐼', '🐨', '🐸', '🦁', '🐰'];

export default function Onboarding() {
  const { dispatch } = useStore();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🐶');
  const [goal, setGoal] = useState(20);
  const [busy, setBusy] = useState(false);

  const lines = [
    "G'day! I'm Kobe. Let's learn Spanish together!",
    'What should I call you?',
    "How much do you want to practice each day? I'll keep you on track!",
  ];

  async function finish() {
    setBusy(true);
    const remote = await api.createUser(name.trim(), avatar);
    const user = remote
      ? { ...remote, online: true }
      : { id: crypto.randomUUID(), name: name.trim(), avatar, joinedAt: new Date().toISOString(), online: false };
    dispatch({ type: 'signup', user, dailyGoal: goal });
  }

  return (
    <div className="onboarding">
      <div className="onboarding-card">
        <div className="speech-row">
          <Kobe mood={step === 0 ? 'happy' : 'think'} size={130} onClick={sfx.bark} />
          <div className="bubble bubble-left">{lines[step]}</div>
        </div>

        {step === 0 && (
          <div className="onboarding-body">
            <h1 className="brand">Kobe<span>Lingo</span></h1>
            <p className="muted">The free, fun way to learn a language, with a very good dog.</p>
            <button className="btn btn-primary btn-wide" onClick={() => setStep(1)}>Get started</button>
          </div>
        )}

        {step === 1 && (
          <form className="onboarding-body" onSubmit={(e) => { e.preventDefault(); if (name.trim()) setStep(2); }}>
            <input className="input" autoFocus maxLength={30} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <div className="avatar-row">
              {AVATARS.map((a) => (
                <button type="button" key={a} className={`avatar-pick ${a === avatar ? 'on' : ''}`} onClick={() => setAvatar(a)}>{a}</button>
              ))}
            </div>
            <button className="btn btn-primary btn-wide" disabled={!name.trim()}>Continue</button>
          </form>
        )}

        {step === 2 && (
          <div className="onboarding-body">
            <div className="goal-list">
              {GOALS.map((g) => (
                <button key={g.xp} className={`goal ${goal === g.xp ? 'on' : ''}`} onClick={() => setGoal(g.xp)}>
                  <strong>{g.label}</strong><span>{g.note}</span>
                </button>
              ))}
            </div>
            <button className="btn btn-primary btn-wide" disabled={busy} onClick={finish}>Start learning</button>
          </div>
        )}
      </div>
    </div>
  );
}
