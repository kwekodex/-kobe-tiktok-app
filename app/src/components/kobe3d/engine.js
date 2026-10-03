// 3D Baby Kobe. One shared WebGL renderer draws every on-screen Kobe and
// copies the frame into each instance's own 2D canvas, so any number of
// Kobes costs a single GPU context.
import * as THREE from 'three';

const W = 400;
const H = 440;

// ---------- colors (from Kobe's puppy photo) ----------
const C = {
  merle: '#c9d1db',
  dark: '#2c3139',
  mid: '#7f8995',
  light: '#e8edf2',
  white: '#fbfaf7',
  copper: '#cd8a54',
  smoke: '#9b7254',
  nose: '#1d2027',
  pink: '#f2a5b4',
  tongue: '#f07c8a',
  mouth: '#7a2230',
  blue: '#9cc8ea',
  amber: '#a47b3f',
  blush: '#f49aa3',
  tear: '#6cc3f5',
};

function seeded(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

// Merle coat: pale silver with dark and mid-grey blotches.
function merleTexture(seed, spots) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = C.merle;
  g.fillRect(0, 0, c.width, c.height);
  const rnd = seeded(seed);
  for (let i = 0; i < spots; i++) {
    g.fillStyle = rnd() < 0.55 ? C.dark : C.mid;
    g.globalAlpha = 0.85;
    g.beginPath();
    const x = rnd() * c.width;
    const y = 40 + rnd() * (c.height - 80);
    g.ellipse(x, y, 10 + rnd() * 26, 8 + rnd() * 18, rnd() * Math.PI, 0, Math.PI * 2);
    g.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function zTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  g.fillStyle = C.mid;
  g.font = '900 52px Nunito, system-ui, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('z', 32, 34);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const mat = (color, opts = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.62, metalness: 0, ...opts });

function blob(material, radius, [sx, sy, sz], [x, y, z], parent, segments = 32) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, Math.round(segments * 0.75)), material);
  m.scale.set(sx, sy, sz);
  m.position.set(x, y, z);
  m.castShadow = true;
  parent.add(m);
  return m;
}

function capsule(material, r, len, [x, y, z], parent) {
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 8, 20), material);
  m.position.set(x, y, z);
  m.castShadow = true;
  parent.add(m);
  return m;
}

// ---------- the model ----------
function buildKobe() {
  const M = {
    coat: mat('#ffffff', { map: merleTexture(7, 26) }),
    headCoat: mat('#ffffff', { map: merleTexture(42, 14) }),
    dark: mat(C.dark),
    mid: mat(C.mid),
    light: mat(C.light),
    white: mat(C.white),
    copper: mat(C.copper),
    smoke: mat(C.smoke),
    nose: mat(C.nose, { roughness: 0.25 }),
    pink: mat(C.pink),
    tongue: mat(C.tongue, { roughness: 0.4 }),
    mouth: mat(C.mouth),
    blue: mat(C.blue, { roughness: 0.2 }),
    amber: mat(C.amber, { roughness: 0.2 }),
    sclera: mat('#ffffff', { roughness: 0.25 }),
    shine: new THREE.MeshBasicMaterial({ color: '#ffffff' }),
    blush: mat(C.blush, { transparent: true, opacity: 0.55 }),
    tear: mat(C.tear, { roughness: 0.1, transparent: true, opacity: 0.9 }),
  };

  const root = new THREE.Group();

  // body
  const body = new THREE.Group();
  body.position.y = 0.72;
  root.add(body);
  blob(M.coat, 0.6, [1, 0.9, 0.86], [0, 0, 0], body);
  blob(M.white, 0.44, [0.95, 1.05, 0.7], [0, 0.04, 0.24], body); // chest fluff
  blob(M.coat, 0.3, [1, 0.8, 1.1], [-0.42, -0.4, -0.02], body); // haunches
  blob(M.coat, 0.3, [1, 0.8, 1.1], [0.42, -0.4, -0.02], body);

  // stubby front legs + paws
  const legs = new THREE.Group();
  root.add(legs);
  for (const x of [-0.19, 0.19]) {
    capsule(M.white, 0.12, 0.22, [x, 0.3, 0.32], legs);
    blob(M.white, 0.14, [1, 0.7, 1.25], [x, 0.1, 0.4], legs);
    blob(M.copper, 0.13, [1.02, 0.35, 1.02], [x, 0.42, 0.32], legs); // tan socks
  }

  // tail
  const tail = new THREE.Group();
  tail.position.set(0, 0.62, -0.5);
  root.add(tail);
  blob(M.coat, 0.17, [1, 1, 1.3], [0, 0.08, -0.08], tail);

  // head (pivot at the neck)
  const head = new THREE.Group();
  head.position.set(0, 1.18, 0.08);
  root.add(head);
  const skull = new THREE.Group();
  skull.position.y = 0.55;
  head.add(skull);
  blob(M.headCoat, 0.74, [1.08, 0.98, 0.94], [0, 0, 0], skull, 48);
  // blaze down the middle
  blob(M.light, 0.3, [0.36, 1.0, 0.42], [0, 0.08, 0.6], skull);
  // black eye patches on the outer sides
  blob(M.dark, 0.3, [1, 0.78, 0.45], [-0.36, 0.04, 0.55], skull).rotation.z = 0.25;
  blob(M.dark, 0.3, [1, 0.78, 0.45], [0.36, 0.04, 0.55], skull).rotation.z = -0.25;
  // tan brows and cheeks
  blob(M.copper, 0.13, [1.25, 0.6, 0.5], [-0.27, 0.33, 0.64], skull).rotation.z = -0.3;
  blob(M.copper, 0.13, [1.25, 0.6, 0.5], [0.27, 0.33, 0.64], skull).rotation.z = 0.3;
  blob(M.copper, 0.26, [1, 0.8, 0.55], [-0.5, -0.28, 0.42], skull);
  blob(M.smoke, 0.24, [1, 0.8, 0.55], [0.5, -0.28, 0.42], skull);
  // muzzle
  blob(M.white, 0.32, [1.15, 0.78, 0.9], [0, -0.3, 0.6], skull);
  blob(M.blush, 0.07, [1.4, 0.7, 0.4], [-0.25, -0.33, 0.78], skull);
  blob(M.blush, 0.07, [1.4, 0.7, 0.4], [0.25, -0.33, 0.78], skull);
  // nose with pink spots
  blob(M.nose, 0.1, [1.35, 0.85, 0.9], [0, -0.17, 0.88], skull);
  blob(M.pink, 0.038, [1.2, 0.9, 0.5], [-0.05, -0.15, 0.965], skull);
  blob(M.pink, 0.018, [1, 1, 0.5], [0.065, -0.14, 0.965], skull);

  // mouth: smile (two small curves) vs open mouth with tongue
  const smile = new THREE.Group();
  skull.add(smile);
  for (const s of [-1, 1]) {
    const arc = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.012, 8, 16, Math.PI * 0.9), M.dark);
    arc.position.set(s * 0.055, -0.33, 0.85);
    arc.rotation.z = Math.PI + (s < 0 ? 0.15 : -0.15);
    smile.add(arc);
  }
  const open = new THREE.Group();
  skull.add(open);
  blob(M.mouth, 0.11, [1.1, 0.75, 0.45], [0, -0.38, 0.82], open);
  const tongue = blob(M.tongue, 0.075, [1, 1.35, 0.5], [0, -0.48, 0.86], open);

  // eyes
  const eyes = [];
  for (const [x, iris] of [[-0.27, M.blue], [0.27, M.amber]]) {
    const eye = new THREE.Group();
    eye.position.set(x, 0.07, 0.66);
    skull.add(eye);
    blob(M.sclera, 0.135, [1, 1, 0.6], [0, 0, 0], eye);
    const pupilGroup = new THREE.Group();
    eye.add(pupilGroup);
    blob(iris, 0.1, [1, 1, 0.35], [0, 0, 0.065], pupilGroup);
    blob(M.nose, 0.058, [1, 1, 0.35], [0, 0, 0.09], pupilGroup);
    blob(M.shine, 0.03, [1, 1, 0.4], [0.035, 0.045, 0.105], pupilGroup, 12);
    blob(M.shine, 0.014, [1, 1, 0.4], [-0.03, -0.035, 0.105], pupilGroup, 10);
    eyes.push({ eye, pupils: pupilGroup });
  }

  // floppy ears, pivoting where they meet the head
  const ears = [];
  for (const s of [-1, 1]) {
    const pivot = new THREE.Group();
    pivot.position.set(s * 0.52, 0.5, 0);
    skull.add(pivot);
    const ear = blob(M.dark, 0.26, [0.75, 1.2, 0.32], [s * 0.18, -0.24, 0.04], pivot);
    ear.rotation.z = s * 0.35;
    blob(M.mid, 0.2, [0.5, 0.9, 0.2], [s * 0.2, -0.28, 0.1], pivot).rotation.z = s * 0.35;
    ears.push({ pivot, side: s });
  }

  // a tear for sad moments, and floating Zs for sleep
  const tear = blob(M.tear, 0.045, [1, 1.3, 0.8], [-0.33, -0.08, 0.75], skull, 14);
  const zMat = new THREE.SpriteMaterial({ map: zTexture(), transparent: true });
  const zs = [0, 1].map(() => {
    const z = new THREE.Sprite(zMat.clone());
    z.scale.set(0.3, 0.3, 0.3);
    root.add(z);
    return z;
  });

  return { root, body, head, skull, tail, eyes, ears, smile, open, tongue, tear, zs };
}

// ---------- poses ----------
const lerp = (a, b, k) => a + (b - a) * k;

function pose(rig, inst, t, dt) {
  const { mood } = inst;
  const mt = t - inst.moodSince;
  const s = inst.smooth;
  const k = Math.min(1, dt * 8);

  let hop = 0;
  let spin = 0;
  let headX = inst.look.y * 0.35;
  let headY = inst.look.x * 0.55;
  let headZ = Math.sin(t * 0.7) * 0.06;
  let wag = Math.sin(t * 9) * 0.45;
  let earRot = Math.sin(t * 2.2) * 0.06;
  let eyeOpen = 1;
  let pupilY = 0;
  let mouthOpen = false;
  let breathe = 1 + Math.sin(t * 2.4) * 0.018;

  // blink every few seconds
  const blinkPhase = (t + inst.seed * 3) % 4.2;
  if (blinkPhase < 0.13) eyeOpen = 0.1;

  if (mood === 'happy') {
    hop = Math.abs(Math.sin(t * 4.6)) * 0.22;
    wag = Math.sin(t * 26) * 0.6;
    earRot = Math.sin(t * 9.2) * 0.25;
    eyeOpen = 0.32;
    mouthOpen = true;
  } else if (mood === 'cheer') {
    hop = Math.abs(Math.sin(t * 3.4)) * 0.5;
    spin = mt < 1.1 ? (mt / 1.1) * Math.PI * 2 : Math.sin(t * 3) * 0.2;
    wag = Math.sin(t * 30) * 0.7;
    earRot = Math.sin(t * 7) * 0.35;
    eyeOpen = 0.3;
    mouthOpen = true;
  } else if (mood === 'sad') {
    headX = 0.32;
    headZ = -0.08;
    wag = 0;
    earRot = 0.45;
    pupilY = -0.025;
    breathe = 1 + Math.sin(t * 1.6) * 0.012;
  } else if (mood === 'think') {
    headZ = 0.3 + Math.sin(t * 2) * 0.04;
    headY += 0.15;
    pupilY = 0.03;
    wag = Math.sin(t * 4) * 0.25;
  } else if (mood === 'sleep') {
    headX = 0.38;
    headY = 0;
    headZ = 0.12;
    wag = 0;
    earRot = 0.3;
    eyeOpen = 0.06;
    breathe = 1 + Math.sin(t * 1.4) * 0.03;
  }

  // a little hop when tapped
  const boop = Math.max(0, 1 - (t - inst.boopAt) * 3);
  hop += Math.sin(boop * Math.PI) * 0.3;

  s.hop = lerp(s.hop, hop, mood === 'happy' || mood === 'cheer' || boop > 0 ? 1 : k);
  s.headX = lerp(s.headX, headX, k);
  s.headY = lerp(s.headY, headY, k);
  s.headZ = lerp(s.headZ, headZ, k);
  s.ear = lerp(s.ear, earRot, k);
  s.eye = eyeOpen < 0.2 ? eyeOpen : lerp(s.eye, eyeOpen, Math.min(1, dt * 14));
  s.pupilY = lerp(s.pupilY, pupilY, k);

  rig.root.position.y = s.hop;
  rig.root.rotation.y = spin + inst.look.x * 0.18 + (inst.yaw || 0);
  rig.body.scale.set(1 / Math.sqrt(breathe), breathe, 1);
  rig.head.rotation.set(s.headX, s.headY, s.headZ);
  rig.tail.rotation.set(0.3, 0, wag);
  for (const e of rig.ears) e.pivot.rotation.z = e.side * s.ear + Math.sin(t * 2.2 + e.side) * 0.03;
  for (const e of rig.eyes) {
    e.eye.scale.y = s.eye;
    e.pupils.position.set(inst.look.x * 0.025, s.pupilY + inst.look.y * -0.02, 0);
  }
  rig.smile.visible = !mouthOpen && mood !== 'sad';
  rig.open.visible = mouthOpen;
  rig.tongue.scale.y = 1.35 + Math.sin(t * 18) * 0.12;

  rig.tear.visible = mood === 'sad';
  if (rig.tear.visible) {
    const f = (mt * 0.7) % 1;
    rig.tear.position.y = -0.08 - f * 0.35;
    rig.tear.material.opacity = 1 - f;
  }
  rig.zs.forEach((z, i) => {
    z.visible = mood === 'sleep';
    if (!z.visible) return;
    const f = (t * 0.45 + i * 0.5) % 1;
    z.position.set(0.55 + f * 0.35, 2.3 + f * 0.6, 0.3);
    z.material.opacity = Math.sin(f * Math.PI);
  });
}

// ---------- shared engine ----------
let engine = null;

function createEngine() {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(W, H, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, W / H, 0.1, 50);
  camera.position.set(0, 1.6, 7.4);
  camera.lookAt(0, 1.18, 0);

  scene.add(new THREE.HemisphereLight('#ffffff', '#b7a48f', 1.6));
  const key = new THREE.DirectionalLight('#ffffff', 2.2);
  key.position.set(0.8, 6, 2.5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -2;
  key.shadow.camera.right = 2;
  key.shadow.camera.top = 3;
  key.shadow.camera.bottom = -1;
  key.shadow.radius = 6;
  scene.add(key);
  const rim = new THREE.DirectionalLight('#ffe2c4', 0.8);
  rim.position.set(-3, 2, -3);
  scene.add(rim);

  // soft contact shadow on an invisible floor
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.ShadowMaterial({ opacity: 0.18 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const rig = buildKobe();
  scene.add(rig.root);

  const instances = new Set();
  let raf = 0;
  let last = performance.now();

  function frame(now) {
    const t = now / 1000;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    for (const inst of instances) {
      if (!inst.visible) continue;
      pose(rig, inst, t, dt);
      renderer.render(scene, camera);
      const { ctx, canvas } = inst;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(renderer.domElement, 0, 0, canvas.width, canvas.height);
    }
    raf = instances.size ? requestAnimationFrame(frame) : 0;
  }

  function onPointer(e) {
    for (const inst of instances) {
      const r = inst.canvas.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.35;
      inst.look.x = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      inst.look.y = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
    }
  }
  window.addEventListener('pointermove', onPointer, { passive: true });

  return {
    add(canvas, mood) {
      const inst = {
        canvas,
        ctx: canvas.getContext('2d'),
        mood,
        moodSince: performance.now() / 1000,
        boopAt: -10,
        seed: Math.random(),
        visible: true,
        look: { x: 0, y: 0 },
        smooth: { hop: 0, headX: 0, headY: 0, headZ: 0, ear: 0, eye: 1, pupilY: 0 },
      };
      instances.add(inst);
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
      return inst;
    },
    remove(inst) {
      instances.delete(inst);
    },
    setMood(inst, mood) {
      if (inst.mood !== mood) {
        inst.mood = mood;
        inst.moodSince = performance.now() / 1000;
      }
    },
    setYaw(inst, yaw) {
      inst.yaw = yaw;
    },
    boop(inst) {
      inst.boopAt = performance.now() / 1000;
    },
  };
}

export function getEngine() {
  engine ??= createEngine();
  return engine;
}

export function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}
