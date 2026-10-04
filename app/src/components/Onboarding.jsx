import { useState } from 'react';
import Kobe from './Kobe.jsx';
import Avatar, { AVATARS, avatarInfo } from './Avatar.jsx';
import { useStore } from '../lib/store.jsx';
import { api } from '../lib/api.js';
import { sfx } from '../lib/sound.js';
import LanguageGrid from './LanguageGrid.jsx';

const GOALS = [
  { xp: 10, label: 'Casual', note: '5 min a day', icon: '🌱' },
  { xp: 20, label: 'Regular', note: '10 min a day', icon: '🌿' },
  { xp: 30, label: 'Serious', note: '15 min a day', icon: '🌳' },
  { xp: 50, label: 'Intense', note: '20 min a day', icon: '🔥' },
];
const STEPS = ['welcome', 'native', 'language', 'name', 'avatar', 'goal'];

export default function Onboarding() {
  const { dispatch } = useStore();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [goal, setGoal] = useState(20);
  const [course, setCourse] = useState(null);
  const [native, setNative] = useState(null);
  const [busy, setBusy] = useState(false);
  const buddy = avatar ? avatarInfo(avatar) : null;
  const first = name.trim().split(' ')[0];

  const lines = {
    welcome: "G'day! I'm Kobe. Let's learn a new language together!",
    native: 'First, which language do you speak? I\'ll show you what words mean in it.',
    language: 'Which language do you want to learn?',
    name: 'What should I call you?',
    avatar: `Nice to meet you, ${first}! Pick a buddy to be you in the app.`,
    goal: "How much do you want to practise each day? I'll help you stick to it!",
  };
  const key = STEPS[step];

  async function finish() {
    setBusy(true);
    const remote = await api.createUser(name.trim(), avatar);
    const user = remote
      ? { ...remote, avatar, online: true }
      : { id: crypto.randomUUID(), name: name.trim(), avatar, joinedAt: new Date().toISOString(), online: false };
    dispatch({ type: 'signup', user, dailyGoal: goal, course, native });
  }

  return (
    <div className="onboarding">
      <div className="onboarding-card">
        {step > 0 && (
          <div className="ob-top">
            <button className="icon-btn" aria-label="Back" onClick={() => setStep(step - 1)}>←</button>
            <div className="progress small"><div className="progress-fill" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} /></div>
            <span className="ob-count muted">{step}/{STEPS.length - 1}</span>
          </div>
        )}

        <div className="speech-row">
          <Kobe mood={key === 'welcome' ? 'happy' : key === 'avatar' && buddy ? 'happy' : 'think'} size={step === 0 ? 150 : 110} onClick={sfx.bark} />
          <div className="bubble bubble-left">{lines[key]}</div>
        </div>

        {key === 'welcome' && (
          <div className="onboarding-body">
            <h1 className="brand">Kobe<span>Lingo</span></h1>
            <p className="muted">Learn a language with a very good dog. Five minutes a day is all it takes.</p>
            <button className="btn btn-primary btn-wide" onClick={() => setStep(1)}>Get started</button>
          </div>
        )}

        {key === 'native' && (
          <div className="onboarding-body">
            <LanguageGrid withEnglish selected={native} onPick={(code) => { setNative(code); if (course === code) setCourse(null); setStep(2); }} />
          </div>
        )}

        {key === 'language' && (
          <div className="onboarding-body">
            <LanguageGrid exclude={native} selected={course} onPick={(code) => { setCourse(code); setStep(3); }} />
          </div>
        )}

        {key === 'name' && (
          <form className="onboarding-body" onSubmit={(e) => { e.preventDefault(); if (name.trim()) setStep(4); }}>
            <input id="ob-name" className="input input-big" autoFocus maxLength={30} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <button className="btn btn-primary btn-wide" disabled={!name.trim()}>Continue</button>
          </form>
        )}

        {key === 'avatar' && (
          <div className="onboarding-body">
            <div className={`buddy-stage ${buddy ? 'picked' : ''}`}>
              {buddy ? (
                <>
                  <Avatar key={buddy.id} id={buddy.id} size={120} full animate className="buddy-pop" />
                  <div className="buddy-hello"><strong>Hi, I'm {buddy.name}!</strong><span className="muted">I'll be you on the leaderboard.</span></div>
                </>
              ) : (
                <span className="muted">Tap an animal below</span>
              )}
            </div>
            <div className="buddy-grid" role="radiogroup" aria-label="Choose your avatar">
              {AVATARS.map((a) => (
                <button
                  type="button"
                  key={a.id}
                  role="radio"
                  aria-checked={avatar === a.id}
                  className={`buddy ${avatar === a.id ? 'on' : ''}`}
                  onClick={() => { sfx.tap(); setAvatar(a.id); }}
                >
                  <Avatar id={a.id} size={62} full animate={avatar === a.id} />
                  <span>{a.name}</span>
                </button>
              ))}
            </div>
            <button className="btn btn-primary btn-wide" disabled={!avatar} onClick={() => setStep(5)}>
              {buddy ? `Continue as ${buddy.name}` : 'Choose a buddy'}
            </button>
          </div>
        )}

        {key === 'goal' && (
          <div className="onboarding-body">
            <div className="goal-list">
              {GOALS.map((g) => (
                <button key={g.xp} className={`goal ${goal === g.xp ? 'on' : ''}`} onClick={() => setGoal(g.xp)}>
                  <span className="goal-icon" aria-hidden="true">{g.icon}</span>
                  <strong>{g.label}</strong>
                  <span>{g.note}</span>
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
