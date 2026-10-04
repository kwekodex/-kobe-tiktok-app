import { useEffect, useState } from 'react';
import { useStore } from '../lib/store.jsx';
import { useCourse } from '../lib/courses.js';
import { api } from '../lib/api.js';
import { voicesFor, onVoicesChanged, speak, STUDIO } from '../lib/speech.js';

const RATES = [
  { value: 0.75, label: 'Slow' },
  { value: 1, label: 'Normal' },
  { value: 1.2, label: 'Fast' },
];
const PITCHES = [
  { value: 0.8, label: 'Deeper' },
  { value: 1, label: 'Normal' },
  { value: 1.25, label: 'Higher' },
];
const GENDER = { female: '♀ Female', male: '♂ Male', neutral: 'Neutral' };

// Lets the learner choose who reads the course: studio voices from the server
// (male and female) or the voices built into this device.
export default function VoiceSettings() {
  const { state, dispatch } = useStore();
  const course = useCourse();
  const [device, setDevice] = useState(() => voicesFor(course.tts));
  const [studio, setStudio] = useState({ loading: true, enabled: false, voices: [] });

  useEffect(() => {
    const refresh = () => setDevice(voicesFor(course.tts));
    refresh();
    return onVoicesChanged(refresh);
  }, [course.tts]);

  useEffect(() => {
    let alive = true;
    setStudio({ loading: true, enabled: false, voices: [] });
    api.ttsVoices(course.tts).then((res) => alive && setStudio({ loading: false, enabled: !!res?.enabled, voices: res?.voices || [] }));
    return () => { alive = false; };
  }, [course.tts]);

  const options = [
    ...studio.voices.map((v) => ({ id: STUDIO + v.id, name: v.label || v.id, detail: `${GENDER[v.gender]} · studio`, studio: true })),
    ...device.map((v) => ({ id: v.voiceURI, name: v.name.replace(/\s*\(.*\)$/, ''), detail: `${v.lang} · this device${v.localService ? '' : ' · online'}` })),
  ];
  const current = state.voices[course.code] || options[0]?.id || '';
  const usingStudio = current.startsWith(STUDIO);
  const sample = course.allLessons[0]?.sentences[0]?.t;
  const preview = (voiceURI) => speak(sample, { voiceURI, lang: course.tts, rate: state.speechRate, pitch: state.speechPitch });

  return (
    <div className="voice-settings">
      <h3>Kobe's voice for {course.name}</h3>
      {options.length ? (
        <>
          <div className="voice-list" role="radiogroup" aria-label="Voice">
            {options.map((v) => (
              <label key={v.id} className={`voice ${current === v.id ? 'on' : ''}`}>
                <input
                  type="radio"
                  name="voice"
                  id={`voice-${v.id}`}
                  checked={current === v.id}
                  onChange={() => { dispatch({ type: 'setVoice', course: course.code, voiceURI: v.id }); preview(v.id); }}
                />
                <span className="voice-name">{v.name}</span>
                <span className={`muted voice-lang ${v.studio ? 'studio' : ''}`}>{v.detail}</span>
              </label>
            ))}
          </div>
          <div className="rate-row" role="radiogroup" aria-label="Speaking speed">
            <span className="muted row-label">Speed</span>
            {RATES.map((r) => (
              <button key={r.value} className={`chip ${state.speechRate === r.value ? 'on' : ''}`} onClick={() => dispatch({ type: 'setRate', rate: r.value })}>{r.label}</button>
            ))}
          </div>
          {!usingStudio && (
            <div className="rate-row" role="radiogroup" aria-label="Voice pitch">
              <span className="muted row-label">Pitch</span>
              {PITCHES.map((r) => (
                <button key={r.value} className={`chip ${state.speechPitch === r.value ? 'on' : ''}`} onClick={() => dispatch({ type: 'setPitch', pitch: r.value })}>{r.label}</button>
              ))}
            </div>
          )}
          <button className="btn btn-secondary preview-btn" onClick={() => preview(current)}>🔊 Preview</button>
        </>
      ) : (
        <p className="muted">
          This device doesn't have a {course.name} voice yet. You can add one in your phone's settings
          (iPhone: Settings → Accessibility → Spoken Content → Voices. Android: Settings → Text-to-speech).
          Lessons still work without sound.
        </p>
      )}
      {!studio.loading && !studio.enabled && (
        <p className="muted small-note">
          Want more voices, male and female? Studio voices turn on when KobeLingo runs with its server and a voice service.
          Your phone may also offer extra voices to download in its settings.
        </p>
      )}
    </div>
  );
}
