import * as THREE from "three";

/*
 * The world behind the problem section: one road, and five small places along
 * it where a load goes wrong. Everything is drawn the same way, white shapes
 * with black edges, and the one thing going wrong at each place is amber.
 *
 * Nothing here is modelled in a 3D package. Every object is put together from
 * boxes, cylinders and rings, so the whole scene is this file and nothing has
 * to be downloaded besides the 3D library itself.
 *
 * The camera never stops moving: it glides along the road from place to place
 * and keeps turning around whichever one it is at. It draws only when asked
 * to, so it costs nothing while the page is still.
 */

const INK = 0x010304;
const WHITE = 0xffffff;
const PAPER = 0xf1f1ee;
const AMBER = 0xf5a300;
const ROAD = 0xe4e4df;

export const STATIONS = 5;

const edge = new THREE.LineBasicMaterial({ color: INK });
const fills = new Map<number, THREE.MeshBasicMaterial>();
function fill(color: number) {
  let m = fills.get(color);
  if (!m) {
    // Pushed back a hair so the edges drawn on top of a face do not flicker into it.
    m = new THREE.MeshBasicMaterial({
      color,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
    fills.set(color, m);
  }
  return m;
}

/* A shape with its edges inked. */
function inked(geo: THREE.BufferGeometry, color: number) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(geo, fill(color)));
  g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), edge));
  return g;
}

/* A box standing on the ground at (x, z), its base at height y. */
function box(w: number, h: number, d: number, x = 0, y = 0, z = 0, color = WHITE) {
  const g = inked(new THREE.BoxGeometry(w, h, d), color);
  g.position.set(x, y + h / 2, z);
  return g;
}

function drum(r: number, h: number, x = 0, y = 0, z = 0, color = WHITE) {
  const g = inked(new THREE.CylinderGeometry(r, r, h, 24), color);
  g.position.set(x, y + h / 2, z);
  return g;
}

/* The same "random" numbers every time, so the scene never changes between visits. */
function rnd(n: number) {
  const v = Math.sin(n * 12.9898) * 43758.5453;
  return v - Math.floor(v);
}

/* A pale disc on the ground, so each place reads as a place. */
function pad(r: number) {
  const m = new THREE.Mesh(new THREE.CircleGeometry(r, 48), fill(PAPER));
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.01;
  return m;
}

/* 1. Quoting: a desk, and an inbox that has spilled onto the floor. */
function quoteDesk() {
  const g = new THREE.Group();
  g.add(pad(6.4));
  g.add(box(5, 0.22, 2.4, 0, 1.5, 0));
  for (const [x, z] of [
    [-2.3, -1],
    [2.3, -1],
    [-2.3, 1],
    [2.3, 1],
  ])
    g.add(box(0.18, 1.5, 0.18, x, 0, z));
  g.add(box(0.5, 0.08, 0.4, -1.1, 1.72, -0.5));
  g.add(box(0.14, 0.5, 0.14, -1.1, 1.8, -0.5));
  g.add(box(2.2, 1.4, 0.1, -1.1, 2.3, -0.5));
  // The pile on the desk.
  for (let n = 0; n < 12; n++) {
    const e = box(0.95, 0.07, 0.62, 1.3 + (rnd(n) - 0.5) * 0.5, 1.72 + n * 0.075, 0.2);
    e.rotation.y = (rnd(n + 20) - 0.5) * 0.9;
    g.add(e);
  }
  // The one that mattered, on top.
  const erin = box(0.95, 0.07, 0.62, 1.35, 1.72 + 12 * 0.075, 0.2, AMBER);
  erin.rotation.y = 0.35;
  g.add(erin);
  // And the rest, on the floor.
  for (let n = 0; n < 16; n++) {
    const e = box(
      0.95,
      0.07,
      0.62,
      2.2 + rnd(n + 40) * 3,
      rnd(n + 90) * 0.15,
      1.6 + rnd(n + 60) * 2.6,
    );
    e.rotation.y = rnd(n + 80) * Math.PI;
    g.add(e);
  }
  return g;
}

/* 2. Covering: one posting, and a phone that will not stop ringing. */
function ringingPhone() {
  const g = new THREE.Group();
  g.add(pad(6.4));
  const phone = new THREE.Group();
  phone.add(box(2.3, 4.4, 0.3));
  phone.add(box(1.9, 3.6, 0.04, 0, 0.45, 0.17, PAPER));
  const badge = drum(0.42, 0.1, 0.75, 0, 0, AMBER);
  badge.rotation.x = Math.PI / 2;
  badge.position.set(0.75, 3.75, 0.24);
  phone.add(badge);
  phone.rotation.x = -0.2;
  phone.position.y = 0.2;
  g.add(phone);
  // It is ringing.
  for (let n = 0; n < 3; n++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3 + n * 0.9, 0.035, 6, 40, Math.PI / 2.6),
      fill(INK),
    );
    ring.position.set(0, 3.2, 0);
    ring.rotation.z = Math.PI / 2 - Math.PI / 5.2;
    g.add(ring);
    const other = ring.clone();
    other.rotation.y = Math.PI;
    g.add(other);
  }
  // The calls that were missed.
  for (let n = 0; n < 9; n++) {
    const a = (n / 9) * Math.PI * 2 + 0.4;
    const r = 3.6 + rnd(n + 5) * 1.6;
    const p = box(
      0.6,
      0.07,
      1.15,
      Math.cos(a) * r,
      0,
      Math.sin(a) * r,
      n % 4 === 0 ? AMBER : WHITE,
    );
    p.rotation.y = rnd(n + 30) * Math.PI;
    g.add(p);
  }
  return g;
}

/* 3. Paperwork: the certificate went into the spam bin with everything else. */
function spamBin() {
  const g = new THREE.Group();
  g.add(pad(6.4));
  const w = 3.2;
  const h = 2.4;
  g.add(box(w, 0.12, w));
  g.add(box(w, h, 0.12, 0, 0, -w / 2));
  g.add(box(w, h, 0.12, 0, 0, w / 2));
  g.add(box(0.12, h, w, -w / 2, 0, 0));
  g.add(box(0.12, h, w, w / 2, 0, 0));
  // Papers falling in, and some that missed.
  for (let n = 0; n < 14; n++) {
    const inside = n < 9;
    const s = box(
      1.0,
      0.02,
      1.3,
      inside ? (rnd(n) - 0.5) * 1.6 : 2.6 + rnd(n) * 2.4,
      inside ? 1.2 + n * 0.42 : 0.02,
      inside ? (rnd(n + 7) - 0.5) * 1.6 : (rnd(n + 3) - 0.5) * 5,
      PAPER,
    );
    s.rotation.set(
      inside ? (rnd(n + 11) - 0.5) * 1.2 : 0,
      rnd(n + 13) * Math.PI,
      inside ? (rnd(n + 17) - 0.5) * 1.2 : 0,
    );
    g.add(s);
  }
  // The certificate of insurance, half in.
  const coi = box(1.0, 0.03, 1.3, 0.2, 2.3, 0.1, AMBER);
  coi.rotation.set(0.9, 0.5, 0.3);
  g.add(coi);
  return g;
}

/* 4. Pickup: nobody asked what it weighed, and the truck that came cannot take it. */
function loadingDock() {
  const g = new THREE.Group();
  g.add(pad(7));
  g.add(box(6.4, 3.6, 4, -1.4, 0, -3.2));
  g.add(box(2.4, 2.5, 0.1, -1.4, 0, -1.16, PAPER));
  g.add(box(6.4, 0.7, 1.6, -1.4, 0, -0.4));
  // The scale, with the trailer on it.
  g.add(box(6.2, 0.14, 3, 1.6, 0, 3));
  g.add(box(5.2, 0.28, 2.2, 1.6, 0.85, 3));
  for (const x of [-0.4, 0.5, 3.2]) {
    for (const z of [2.05, 3.95]) {
      const wheel = drum(0.42, 0.3, 0, 0, 0, PAPER);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(x + 1.6 - 1.4, 0.42, z);
      g.add(wheel);
    }
  }
  // The load: bigger than anyone said.
  g.add(box(3, 2.7, 2.1, 1.3, 1.13, 3, AMBER));
  return g;
}

/* 5. Getting paid: an invoice past its date that nobody followed up. */
function unpaidInvoice() {
  const g = new THREE.Group();
  g.add(pad(6.4));
  const sheet = new THREE.Group();
  sheet.add(box(3.2, 4.3, 0.08));
  for (let n = 0; n < 6; n++)
    sheet.add(box(n === 0 ? 1.4 : 2.4, 0.07, 0.02, n === 0 ? -0.5 : 0, 3.5 - n * 0.42, 0.06, INK));
  const stamp = drum(0.62, 0.06, 0, 0, 0, AMBER);
  stamp.rotation.x = Math.PI / 2;
  stamp.position.set(0.75, 0.85, 0.09);
  sheet.add(stamp);
  sheet.rotation.x = -0.24;
  sheet.position.y = 0.15;
  g.add(sheet);
  // A calendar, weeks deep.
  for (let n = 0; n < 7; n++)
    g.add(box(1.5, 0.1, 1.5, 3.2, n * 0.11, 1.4, n === 6 ? WHITE : PAPER));
  g.add(box(1.5, 0.34, 0.1, 3.2, 0.78, 0.7, INK));
  // Envelopes that came back unopened.
  for (let n = 0; n < 6; n++) {
    const e = box(0.95, 0.07, 0.62, -3 - rnd(n) * 1.6, 0, 1 + rnd(n + 4) * 2.4);
    e.rotation.y = rnd(n + 8) * Math.PI;
    g.add(e);
  }
  return g;
}

function truck() {
  const g = new THREE.Group();
  g.add(box(3.4, 1.9, 1.7, -0.6, 0.55, 0));
  g.add(box(1.3, 1.5, 1.6, 1.85, 0.55, 0, AMBER));
  g.add(box(0.9, 0.5, 1.2, 1.9, 1.35, 0, PAPER));
  for (const x of [-1.7, -0.7, 1.8]) {
    for (const z of [-0.78, 0.78]) {
      const wheel = drum(0.42, 0.26, 0, 0, 0, INK);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(x, 0.42, z);
      g.add(wheel);
    }
  }
  return g;
}

const smoother = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

export type ProblemScene = {
  /** Where along the journey the camera is, from 0 (first place) to 1 (last). */
  setProgress: (p: number) => void;
  resize: () => void;
  dispose: () => void;
};

export function createProblemScene(canvas: HTMLCanvasElement): ProblemScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.5, 400);

  // The road, and the places beside it, alternating sides.
  const along = [-26, 0, 26, 52, 78, 104, 130];
  const sway = [5, 0, 5, -4, 4, -3, 4];
  const road = new THREE.CatmullRomCurve3(along.map((x, n) => new THREE.Vector3(x, 0, sway[n])));
  const N = 320;
  const pts = road.getSpacedPoints(N);
  const left: THREE.Vector3[] = [];
  const right: THREE.Vector3[] = [];
  const strip: number[] = [];
  const index: number[] = [];
  pts.forEach((p, n) => {
    const t = road.getTangentAt(n / N);
    const side = new THREE.Vector3(-t.z, 0, t.x).multiplyScalar(1.5);
    const a = p.clone().add(side);
    const b = p.clone().sub(side);
    left.push(a.clone().setY(0.03));
    right.push(b.clone().setY(0.03));
    strip.push(a.x, 0.02, a.z, b.x, 0.02, b.z);
    if (n < N) index.push(n * 2, n * 2 + 1, n * 2 + 2, n * 2 + 1, n * 2 + 3, n * 2 + 2);
  });
  const tarmac = new THREE.BufferGeometry();
  tarmac.setAttribute("position", new THREE.Float32BufferAttribute(strip, 3));
  tarmac.setIndex(index);
  scene.add(
    new THREE.Mesh(tarmac, new THREE.MeshBasicMaterial({ color: ROAD, side: THREE.DoubleSide })),
  );
  scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(left), edge));
  scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(right), edge));
  const centre = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(pts.map((p) => p.clone().setY(0.04))),
    new THREE.LineDashedMaterial({ color: INK, dashSize: 1.1, gapSize: 1.3 }),
  );
  centre.computeLineDistances();
  scene.add(centre);

  const builders = [quoteDesk, ringingPhone, spamBin, loadingDock, unpaidInvoice];
  const focus: THREE.Vector3[] = [];
  const stops: number[] = [];
  builders.forEach((build, n) => {
    const u = (n + 1) / (along.length - 1);
    const at = road.getPointAt(u);
    const t = road.getTangentAt(u);
    const side = new THREE.Vector3(-t.z, 0, t.x).multiplyScalar(n % 2 === 0 ? -9 : 9);
    const place = build();
    place.position.copy(at).add(side);
    place.rotation.y = n * 0.9;
    scene.add(place);
    // The camera looks between the place and the road, so the truck stays in the picture.
    focus.push(place.position.clone().lerp(at, 0.3).setY(1.2));
    stops.push(u);
  });

  const lorry = truck();
  lorry.scale.setScalar(0.85);
  scene.add(lorry);

  let w = 0;
  let h = 0;
  let last = 0;

  const draw = (p: number) => {
    last = p;
    const s = Math.min(STATIONS - 1 - 1e-6, Math.max(0, p) * (STATIONS - 1));
    const i = Math.floor(s);
    // Eased, so the camera slows into each place and out of it again.
    const f = smoother(s - i);
    const look = focus[i].clone().lerp(focus[i + 1], f);
    // It keeps turning the whole way, and pulls back a little between places.
    const angle = 0.9 + p * Math.PI * 1.15;
    const reach = 31 + Math.sin(f * Math.PI) * 10;
    camera.position.set(
      look.x + Math.cos(angle) * reach,
      17 + Math.sin(f * Math.PI) * 5,
      look.z + Math.sin(angle) * reach,
    );
    camera.lookAt(look);

    const u = stops[i] + (stops[i + 1] - stops[i]) * f;
    const here = road.getPointAt(u);
    const ahead = road.getPointAt(Math.min(1, u + 0.004));
    lorry.position.copy(here);
    lorry.rotation.y = Math.atan2(-(ahead.z - here.z), ahead.x - here.x);
    renderer.render(scene, camera);
  };

  const resize = () => {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // The picture has its own part of the stage, beside the words or above them, so nothing needs shifting.
    camera.fov = w > 620 ? 30 : 40;
    camera.updateProjectionMatrix();
    draw(last);
  };

  resize();

  return {
    setProgress: draw,
    resize,
    dispose: () => {
      scene.traverse((o) => {
        const g = (o as THREE.Mesh).geometry;
        if (g) g.dispose();
      });
      fills.forEach((m) => m.dispose());
      fills.clear();
      renderer.dispose();
    },
  };
}
