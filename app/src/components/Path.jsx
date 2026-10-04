import { useState } from 'react';
import { useCourse } from '../lib/courses.js';
import { useStore, courseCompleted } from '../lib/store.jsx';
import Flag from './Flag.jsx';
import Avatar from './Avatar.jsx';
import Kobe from './Kobe.jsx';
import { sfx } from '../lib/sound.js';

const OFFSETS = [0, 44, 70, 44, 0, -44, -70, -44];

export default function Path({ onStart }) {
  const { state } = useStore();
  const course = useCourse();
  const { allLessons } = course;
  const completed = courseCompleted(state);
  const [open, setOpen] = useState(null);
  const currentIndex = allLessons.findIndex((l) => !completed[l.id]);
  const noHearts = state.hearts <= 0;

  return (
    <div className="path" onClick={() => setOpen(null)}>
      <div className="course-head"><Flag lang={course} size="lg" /><div><h1>{course.name}</h1><span className="muted">{course.native}{course.beta ? " · Beta" : ""}</span></div></div>
      {course.units.map((unit, ui) => (
        <section key={unit.id} className="unit">
          <div className="unit-banner" style={{ background: unit.color }}>
            <div>
              <div className="unit-eyebrow">Unit {ui + 1}</div>
              <h2>{unit.title}</h2>
              <p>{unit.description}</p>
            </div>
          </div>
          <div className="unit-nodes">
            {unit.lessons.map((lesson, li) => {
              const gi = allLessons.findIndex((l) => l.id === lesson.id);
              const done = !!completed[lesson.id];
              const current = gi === currentIndex;
              const locked = !done && !current;
              const offset = OFFSETS[(gi) % OFFSETS.length];
              return (
                <div key={lesson.id} className="node-wrap" style={{ transform: `translateX(${offset}px)` }}>
                  {current && (
                    <div className="start-tag">
                      <Avatar id={state.user.avatar} size={28} mood="happy" />
                      <span>START</span>
                    </div>
                  )}
                  <button
                    className={`node ${done ? 'done' : ''} ${current ? 'current' : ''} ${locked ? 'locked' : ''}`}
                    style={{ '--unit': unit.color }}
                    onClick={(e) => { e.stopPropagation(); sfx.tap(); setOpen(open === lesson.id ? null : lesson.id); }}
                    aria-label={`${lesson.title}${locked ? ' (locked)' : ''}`}
                  >
                    <span>{locked ? '🔒' : done ? '⭐' : lesson.icon}</span>
                  </button>
                  {current && li % 2 === 0 && (
                    <div className="path-kobe" style={{ left: offset > 0 ? -150 : 90 }}>
                      <Kobe mood="idle" size={100} />
                    </div>
                  )}
                  {open === lesson.id && (
                    <div className="node-pop" style={{ '--unit': locked ? '#c8c8c8' : unit.color }} onClick={(e) => e.stopPropagation()}>
                      <strong>{lesson.title}</strong>
                      {locked ? (
                        <p>Complete all levels above to unlock this!</p>
                      ) : (
                        <>
                          <p>Lesson {li + 1} of {unit.lessons.length}{done ? ` · completed ×${completed[lesson.id]}` : ''}</p>
                          <button className="btn btn-white btn-wide" disabled={noHearts} onClick={() => onStart(lesson.id)}>
                            {noHearts ? 'No hearts left' : done ? 'Practice +5 XP' : 'Start +10 XP'}
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
      <div className="path-end">
        <Kobe mood={currentIndex === -1 ? 'cheer' : 'sleep'} size={110} />
        <p>{currentIndex === -1 ? 'You finished the course! More units coming soon.' : 'More units coming soon!'}</p>
      </div>
    </div>
  );
}
