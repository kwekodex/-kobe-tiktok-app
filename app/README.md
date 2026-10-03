# KobeLingo 🐾

A Duolingo-style language learning app starring Kobe the Aussie (an animated SVG mascot).
Currently teaches **Spanish for English speakers**: 4 units, 14 lessons.

## Features
- **Learning path:** units with zig-zag lesson nodes that unlock in order
- **Exercises:** speaking (speech recognition, with "Can't speak now"), picture multiple choice, translate with word tiles (both directions), listen and tap (text-to-speech, with a slow 🐢 option), type the translation, and match pairs
- **Mistakes:** wrong answers return at the end of the lesson; answers are accent- and punctuation-tolerant
- **Game loop:** XP, daily goal, streaks (with streak freezes), hearts (1 refills every 30 min), gems, combo messages
- **Practice hub:** spaced review weighted toward items you got wrong; costs no hearts and earns one back
- **Leagues:** weekly leaderboard; practice-buddy bots fill it out until there are enough real users
- **Shop, profile, weekly XP chart, achievements**
- **Kobe's moods:** idle, happy, sad, cheer, think, sleep. He reacts to every answer.
- **Offline-first:** progress lives in localStorage and syncs to the API when it's reachable
- **Installable (PWA):** "Add to Home Screen" on iPhone/Android, works offline after first visit

## Run it
```bash
cd app
npm install
npm run dev          # API on :3001 + Vite on :5173 (open http://localhost:5173)
```
Production:
```bash
npm run build && npm start   # serves the app + API on :3001
```

## Deploy (GitHub Pages)
`.github/workflows/pages.yml` builds the app on every push to `main` and publishes:
- `/` the existing policy page and TikTok verification file
- `/learn/` KobeLingo (static, `VITE_API=off`: progress stays on the device, leagues use practice buddies)

One-time setup: repo **Settings → Pages → Source: GitHub Actions**.

## Structure
```
src/data/course.js        course content (words + sentences); exercises are generated from it
src/lib/exercises.js      lesson/practice session builder
src/lib/store.jsx         progress, XP, streak, hearts (reducer + localStorage + API sync)
src/components/Kobe.jsx   animated mascot (+ kobe.css)
src/components/Lesson.jsx lesson runner (check → feedback → retry queue → results)
server/index.js           Express API: users, progress sync, leaderboard, course
server/db.js              JSON-file DB (swap for Postgres/Supabase in production)
```

## Adding content
Add a lesson to `src/data/course.js` with 5 `words` (each needs `es`, `en`, `emoji`) and 5 `sentences`
(with optional `enAlt`/`esAlt` accepted alternatives). The new lesson is added to the path automatically.

## Roadmap
- Real auth (email / Google / Apple sign-in) and a Postgres database
- Mobile apps (React Native / Expo) sharing `course.js` and `exercises.js`
- Recorded audio, more courses
- League promotion/demotion, friends, push notifications for streak reminders
