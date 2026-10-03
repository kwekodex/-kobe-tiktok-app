# KobeLingo 🐾

A Duolingo-style language learning app starring Kobe the Aussie (an animated SVG mascot).
Teaches **100 languages** from English, each with the same 4 units and 14 lessons. 40 of them are marked *Beta*: their translations especially need review by native speakers.

## Features
- **Learning path:** units with zig-zag lesson nodes that unlock in order
- **Exercises:** speaking (speech recognition, with "Can't speak now"), picture multiple choice, translate with word tiles (both directions), listen and tap (text-to-speech, with a slow 🐢 option), type the translation, and match pairs
- **Mistakes:** wrong answers return at the end of the lesson; answers are accent- and punctuation-tolerant
- **Game loop:** XP, daily goal, streaks (with streak freezes), hearts (1 refills every 30 min), gems, combo messages
- **Practice hub:** spaced review weighted toward items you got wrong; costs no hearts and earns one back
- **Leagues:** weekly leaderboard; practice-buddy bots fill it out until there are enough real users
- **Shop, profile, weekly XP chart, achievements**
- **Voices:** pick any of your device's voices for each language, set speed and pitch, and preview it
- **Studio voices:** with a cloud voice service configured on the server, every supported language gets several male and female voices (see below)
- **3D Kobe:** a three.js model with the same moods; turns his head toward your finger and hops when tapped. Falls back to the flat drawing on devices without 3D
- **Every writing system:** right-to-left scripts (Arabic, Hebrew, Persian, Urdu, Yiddish, Pashto), languages without spaces (Chinese, Japanese, Thai, Lao, Khmer, Burmese), and non-Latin scripts. Learners always type in English.
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

## Studio voices (optional)
Set one of these when running the server (`npm start`):
- `GOOGLE_TTS_KEY` — Google Cloud Text-to-Speech API key (Vietnamese: 4+ voices, male and female)
- `AZURE_SPEECH_KEY` + `AZURE_SPEECH_REGION` — Azure AI Speech (widest language coverage)
- `TTS_PROVIDER=mock` — fake voices for local testing

Audio is cached on disk, so each sentence is only paid for once per voice. Keys stay on the server and are never sent to the browser.
The static GitHub Pages build has no server, so it uses device voices only.

## Deploy (GitHub Pages)
`.github/workflows/pages.yml` builds the app on every push to `main` and publishes:
- `/` the existing policy page and TikTok verification file
- `/learn/` KobeLingo (static, `VITE_API=off`: progress stays on the device, leagues use practice buddies)

One-time setup: repo **Settings → Pages → Source: GitHub Actions**.

## Structure
```
src/data/curriculum.js    the shared lessons (English + emoji)
src/data/languages.js     the 100 courses: names, flags, voice tags, writing direction
src/data/lang/<code>.js   translations, loaded only when that course is opened
src/lib/courses.js        pairs the curriculum with a language
src/lib/exercises.js      lesson/practice session builder
src/lib/store.jsx         progress, XP, streak, hearts (reducer + localStorage + API sync)
src/components/Kobe.jsx   animated mascot (+ kobe.css)
src/components/Lesson.jsx lesson runner (check → feedback → retry queue → results)
server/index.js           Express API: users, progress sync, leaderboard, course
server/db.js              JSON-file DB (swap for Postgres/Supabase in production)
```

## Adding a language
1. Add it to `src/data/languages.js` (code, names, flag, voice tag, and `rtl`/`nospace` if needed).
2. Write a batch file: `@code`, then 28 lines (for each lesson in order: 5 words, then 5 sentences, separated by `|`).
3. Run `node scripts/import-translations.mjs batch.txt`. It checks every lesson is complete and writes `src/data/lang/<code>.js`.

## Adding content
Lessons live in `src/data/curriculum.js` (English words with an emoji, and English sentences with optional
`enAlt` alternatives). Add the lesson there, then add its translations to each language file.

## Roadmap
- Real auth (email / Google / Apple sign-in) and a Postgres database
- Mobile apps (React Native / Expo) sharing `course.js` and `exercises.js`
- Recorded audio, more courses
- League promotion/demotion, friends, push notifications for streak reminders
