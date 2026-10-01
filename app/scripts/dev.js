// Runs the API server and the Vite dev server side by side.
import { spawn } from 'node:child_process';

const procs = [
  spawn('node', ['--watch', 'server/index.js'], { stdio: 'inherit' }),
  spawn('npx', ['vite'], { stdio: 'inherit' }),
];
const stop = () => procs.forEach((p) => p.kill());
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
procs.forEach((p) => p.on('exit', stop));
