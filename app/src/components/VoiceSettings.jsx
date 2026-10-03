import { useEffect, useState } from 'react';
import { useStore } from '../lib/store.jsx';
import { useCourse } from '../lib/courses.js';
import { voicesFor, onVoicesChanged, speak } from '../lib/speech.js';

const RATES = [
  { value: 0.75, label: 'Slow' },
  { value: 1, label: 'Normal' },
  { value: 1.2, label: 'Fast' },
];

// Lets the learner choose which of the device's voices reads the course.
export default function VoiceSettings() {
  const { state, dispatch } = useStore();
  const course = useCourse();
  const [voices, setVoices] = useState(() => voicesFor(course.tts));

  useEffect(() => {
    const refresh = () => setVoices(voicesFor(course.tts));
    refresh();
    return onVoicesChanged(refresh);
  }, [course.tts]);

  const current = state.voices[course.code] || voices[0]?.voiceURI || '';
  const sample = course.allLessons[0]?.sentences[0]?.t;
  const preview = (voiceURI) => speak(sample, { voiceURI, lang: course.tts, rate: state.speechRate });

  return (
    <div className="voice-settings">
      <h3>Kobe's voice for {course.name}</h3>
      {voices.length ? (
        <>
          <div className="voice-list" role="radiogroup" aria-label="Voice">
            {voices.map((v) => (
              <label key={v.voiceURI} className={`voice ${current === v.voiceURI ? 'on' : ''}`}>
                <input
                  type="radio"
                  name="voice"
                  id={`voice-${v.voiceURI}`}
                  checked={current === v.voiceURI}
                  onChange={() => { dispatch({ type: 'setVoice', course: course.code, voiceURI: v.voiceURI }); preview(v.voiceURI); }}
                />
                <span className="voice-name">{v.name.replace(/\s*\(.*\)$/, '')}</span>
                <span className="muted voice-lang">{v.lang}{v.localService ? '' : ' · online'}</span>
              </label>
            ))}
          </div>
          <div className="rate-row" role="radiogroup" aria-label="Speaking speed">
            {RATES.map((r) => (
              <button
                key={r.value}
                className={`chip ${state.speechRate === r.value ? 'on' : ''}`}
                onClick={() => dispatch({ type: 'setRate', rate: r.value })}
              >{r.label}</button>
            ))}
            <button className="btn btn-secondary" onClick={() => preview(current)}>🔊 Preview</button>
          </div>
        </>
      ) : (
        <p className="muted">
          This device doesn't have a {course.name} voice yet. You can add one in your phone's settings
          (iPhone: Settings → Accessibility → Spoken Content → Voices. Android: Settings → Text-to-speech).
          Lessons still work without sound.
        </p>
      )}
    </div>
  );
}
