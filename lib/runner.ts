export type Shape = "quadrat" | "kreis" | "raute";

export type Item = { lane: number; p: number; good: boolean; a: number };
export type Spark = { x: number; y: number; vx: number; vy: number; life: number; size: number; round: boolean };
export type Pop = { x: number; y: number; life: number; text: string; good: boolean };

export type Scene = {
  items: Item[];
  laneX: number;
  flash: number;
  shake: number;
  clock: number;
  roadSpeed: number;
  timeFrac: number | null;
  sparks: Spark[];
  pops: Pop[];
};

export type Look = { color: string; brand: string; shape: Shape };

/** Depth p (0 at the horizon, 1 at the viewer) to screen fraction t. */
export const T_POW = 1.6;
export const tOf = (p: number) => Math.pow(Math.max(0, p), T_POW);
export const PLAYER_T = 0.82;
export const HIT_MIN_T = 0.74;
export const HIT_MAX_T = 0.9;

const HORIZON = 0.2;

export function project(W: number, H: number, lane: number, t: number) {
  const hz = H * HORIZON;
  const spread = W * (0.035 + 0.255 * t);
  return { x: W / 2 + (lane - 1) * spread, y: hz + (H - hz) * t };
}

export function channels(hex: string) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, "$&$&") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgba(hex: string, a: number) {
  const [r, g, b] = channels(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function shade(hex: string, amount: number) {
  const mix = (c: number) => Math.round(amount >= 0 ? c + (255 - c) * amount : c * (1 + amount));
  const [r, g, b] = channels(hex);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

function tokenPath(ctx: CanvasRenderingContext2D, shape: Shape, r: number) {
  ctx.beginPath();
  if (shape === "kreis") ctx.arc(0, 0, r, 0, Math.PI * 2);
  else if (shape === "raute") {
    ctx.moveTo(0, -r * 1.18);
    ctx.lineTo(r * 1.08, 0);
    ctx.lineTo(0, r * 1.18);
    ctx.lineTo(-r * 1.08, 0);
    ctx.closePath();
  } else ctx.roundRect(-r, -r, r * 2, r * 2, r * 0.3);
}

/** Draws the lane-runner scene: horizon glow, three lanes in perspective, items, player, effects. */
export function drawScene(ctx: CanvasRenderingContext2D, W: number, H: number, sc: Scene, look: Look) {
  const { color: col, brand, shape } = look;
  const hz = H * HORIZON;

  ctx.save();
  if (sc.shake > 0) ctx.translate((Math.random() - 0.5) * 9 * sc.shake, (Math.random() - 0.5) * 9 * sc.shake);

  // ground
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#09090c");
  bg.addColorStop(1, "#121217");
  ctx.fillStyle = bg;
  ctx.fillRect(-12, -12, W + 24, H + 24);
  const glow = ctx.createRadialGradient(W / 2, hz, 4, W / 2, hz, H * 0.7);
  glow.addColorStop(0, rgba(col, 0.3 + sc.flash * 0.22));
  glow.addColorStop(1, rgba(col, 0));
  ctx.fillStyle = glow;
  ctx.fillRect(-12, -12, W + 24, H + 24);

  // brand name on the horizon
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.font = `800 ${Math.min(W * 0.2, 84)}px system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText((brand || "Marke").slice(0, 14), W / 2, hz - 8);

  // road
  const e0 = project(W, H, -0.5, 0);
  const e1 = project(W, H, 2.5, 0);
  const f0 = project(W, H, -0.5, 1);
  const f1 = project(W, H, 2.5, 1);
  const road = ctx.createLinearGradient(0, hz, 0, H);
  road.addColorStop(0, "rgba(255,255,255,0)");
  road.addColorStop(1, "rgba(255,255,255,0.05)");
  ctx.fillStyle = road;
  ctx.beginPath();
  ctx.moveTo(e0.x, e0.y);
  ctx.lineTo(e1.x, e1.y);
  ctx.lineTo(f1.x, f1.y);
  ctx.lineTo(f0.x, f0.y);
  ctx.closePath();
  ctx.fill();
  ctx.lineWidth = 1.5;
  for (const lane of [-0.5, 0.5, 1.5, 2.5]) {
    const a = project(W, H, lane, 0);
    const b = project(W, H, lane, 1);
    const g = ctx.createLinearGradient(0, hz, 0, H);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(1, lane === -0.5 || lane === 2.5 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.16)");
    ctx.strokeStyle = g;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  for (let k = 0; k < 9; k++) {
    const p = (k / 9 + sc.clock * sc.roadSpeed) % 1;
    const t = tOf(p);
    const l = project(W, H, -0.5, t);
    const r = project(W, H, 2.5, t);
    ctx.strokeStyle = `rgba(255,255,255,${0.02 + t * 0.09})`;
    ctx.beginPath();
    ctx.moveTo(l.x, l.y);
    ctx.lineTo(r.x, r.y);
    ctx.stroke();
  }

  // items, far to near
  const items = [...sc.items].sort((a, b) => a.p - b.p);
  for (const it of items) {
    const t = tOf(it.p);
    if (t <= 0.004 || it.p > 1.06) continue;
    const { x, y } = project(W, H, it.lane, t);
    const r = 7 + 30 * t;
    const alpha = Math.min(1, t / 0.07) * (it.p > 1 ? Math.max(0, 1 - (it.p - 1) / 0.06) : 1);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "rgba(0,0,0,0.38)";
    ctx.beginPath();
    ctx.ellipse(x, y + r * 1.05, r * 0.95, r * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.translate(x, y);
    if (it.good) {
      ctx.rotate(Math.sin(sc.clock * 2.2 + it.a) * 0.14);
      ctx.shadowColor = rgba(col, 0.8);
      ctx.shadowBlur = 8 + 18 * t;
      const g = ctx.createLinearGradient(-r, -r, r, r);
      g.addColorStop(0, shade(col, 0.4));
      g.addColorStop(1, shade(col, -0.22));
      ctx.fillStyle = g;
      tokenPath(ctx, shape, r);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,0.32)";
      ctx.beginPath();
      ctx.arc(-r * 0.34, -r * 0.4, r * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(10,10,12,0.78)";
      ctx.font = `800 ${Math.round(r * 0.95)}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText((brand || "M").trim().charAt(0).toUpperCase() || "M", 0, r * 0.06);
      ctx.textBaseline = "alphabetic";
    } else {
      ctx.shadowColor = "rgba(255, 90, 90, 0.5)";
      ctx.shadowBlur = 8 + 8 * t;
      ctx.fillStyle = "#26262e";
      ctx.beginPath();
      ctx.roundRect(-r, -r * 0.9, r * 2, r * 1.8, r * 0.25);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "#ff6b6b";
      ctx.lineWidth = Math.max(2, r * 0.14);
      ctx.beginPath();
      ctx.moveTo(-r * 0.45, -r * 0.42);
      ctx.lineTo(r * 0.45, r * 0.42);
      ctx.moveTo(r * 0.45, -r * 0.42);
      ctx.lineTo(-r * 0.45, r * 0.42);
      ctx.stroke();
    }
    ctx.restore();
  }

  // player
  const pp = project(W, H, sc.laneX, PLAYER_T);
  const pr = 24 + W * 0.012;
  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.beginPath();
  ctx.ellipse(pp.x, pp.y + pr * 1.1, pr * 1.1, pr * 0.34, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.save();
  ctx.translate(pp.x, pp.y);
  ctx.shadowColor = rgba(col, 0.95);
  ctx.shadowBlur = 22 + sc.flash * 26;
  ctx.fillStyle = rgba(col, 0.2);
  ctx.beginPath();
  ctx.arc(0, 0, pr, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = shade(col, 0.25);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.fillStyle = shade(col, 0.55);
  ctx.beginPath();
  ctx.arc(0, 0, pr * 0.28, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // effects
  for (const s of sc.sparks) {
    ctx.globalAlpha = Math.max(0, s.life);
    ctx.fillStyle = col;
    if (s.round) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else ctx.fillRect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
  }
  ctx.globalAlpha = 1;
  ctx.textAlign = "center";
  ctx.font = "700 17px system-ui, sans-serif";
  for (const p of sc.pops) {
    ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.6));
    ctx.fillStyle = p.good ? shade(col, 0.4) : "#ff6b6b";
    ctx.fillText(p.text, p.x, p.y);
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  if (sc.timeFrac !== null) {
    ctx.fillStyle = "rgba(255,255,255,0.09)";
    ctx.fillRect(0, 0, W, 4);
    ctx.fillStyle = col;
    ctx.fillRect(0, 0, W * Math.max(0, sc.timeFrac), 4);
  }
}
