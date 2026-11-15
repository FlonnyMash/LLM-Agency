"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fmt, getDict, type Locale } from "@/lib/i18n";
import { HIT_MAX_T, HIT_MIN_T, PLAYER_T, drawScene, project, tOf, type Item, type Pop, type Scene, type Shape, type Spark } from "@/lib/runner";

export type { Shape };

export type GameProps = {
  locale: Locale;
  brand: string;
  color: string;
  shape: Shape;
  seconds?: number;
  /** Compact preview without the leaderboard (used beside the configurator). */
  compact?: boolean;
};

type Score = { name: string; score: number; t: number };

const STORE = "wf-adv-scores";

function readScores(): Score[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function writeScores(list: Score[]) {
  try {
    localStorage.setItem(STORE, JSON.stringify(list.slice(0, 50)));
  } catch {
    /* storage may be blocked; the game still works */
  }
}

const nowMs = () => Date.now();

const Arrow = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="19" height="21" viewBox="0 0 19 21" aria-hidden="true" style={dir === "right" ? { transform: "scaleX(-1)" } : undefined}>
    <path d="M13.5 2.5 5 10.5l8.5 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** A branded three-lane runner: collect the glowing tokens, avoid the grey blocks. */
export function Game({ locale, brand, color, shape, seconds = 30, compact = false }: GameProps) {
  const g = getDict(locale).game;
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);
  const tickRef = useRef<(now: number) => void>(() => {});
  const live = useRef({
    w: 320, h: 420, target: 1, laneX: 1, items: [] as Item[], sparks: [] as Spark[], pops: [] as Pop[],
    score: 0, streak: 0, shake: 0, flash: 0, left: seconds, last: 0, spawn: 0, lastLane: 1, run: false, clock: 0, swipe: null as number | null,
  });
  const look = useRef({ brand, color, shape });
  const [phase, setPhase] = useState<"idle" | "run" | "end">("idle");
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [board, setBoard] = useState<Score[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    look.current = { brand, color, shape };
  }, [brand, color, shape]);

  const draw = useCallback(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    const s = live.current;
    const scene: Scene = {
      items: s.items, laneX: s.laneX, flash: s.flash, shake: s.shake, clock: s.clock,
      roadSpeed: s.run ? 0.55 : 0.12, timeFrac: s.run ? s.left / seconds : null, sparks: s.sparks, pops: s.pops,
    };
    drawScene(ctx, s.w, s.h, scene, look.current);
  }, [seconds]);

  const resize = useCallback(() => {
    const el = wrap.current;
    const c = canvas.current;
    if (!el || !c) return;
    const w = Math.max(240, el.clientWidth);
    const h = compact ? Math.round(w * 1.15) : Math.round(Math.min(w * 1.3, 580));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;
    c.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
    live.current.w = w;
    live.current.h = h;
    draw();
  }, [compact, draw]);

  useEffect(() => {
    resize();
    const ro = new ResizeObserver(resize);
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [resize]);

  // idle: the road keeps moving slowly behind the start panel
  useEffect(() => {
    if (phase === "run") return;
    let id = 0;
    let last = performance.now();
    const loop = (now: number) => {
      live.current.clock += (now - last) / 1000;
      last = now;
      draw();
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [phase, draw]);

  useEffect(
    () => () => {
      live.current.run = false;
      cancelAnimationFrame(raf.current);
    },
    [],
  );

  const moveLane = useCallback((dir: number) => {
    const s = live.current;
    s.target = Math.min(2, Math.max(0, s.target + dir));
  }, []);

  const tick = useCallback(
    (now: number) => {
      const s = live.current;
      if (!s.run) return;
      const dt = Math.min(0.05, (now - s.last) / 1000 || 0);
      s.last = now;
      s.clock += dt;
      s.left -= dt;
      s.shake = Math.max(0, s.shake - dt * 3);
      s.flash = Math.max(0, s.flash - dt * 4);
      s.laneX += (s.target - s.laneX) * Math.min(1, dt * 14);
      const elapsed = seconds - s.left;
      const speed = 0.36 + elapsed * 0.011;
      s.spawn -= dt;
      if (s.spawn <= 0) {
        s.spawn = Math.max(0.26, 0.52 - elapsed * 0.008);
        const lane = Math.random() < 0.6 ? s.lastLane : Math.floor(Math.random() * 3);
        s.lastLane = lane;
        s.items = [...s.items, { lane, p: 0.02, good: Math.random() > 0.28, a: Math.random() * 6 }];
      }
      const next: Item[] = [];
      let sparks = s.sparks;
      let pops = s.pops;
      for (const prev of s.items) {
        const it = { ...prev, p: prev.p + speed * dt };
        const t = tOf(it.p);
        if (t >= HIT_MIN_T && t <= HIT_MAX_T && Math.abs(it.lane - s.laneX) < 0.55) {
          const at = project(s.w, s.h, it.lane, PLAYER_T);
          if (it.good) {
            s.streak += 1;
            const mult = 1 + Math.min(2, Math.floor(s.streak / 5));
            s.score += mult;
            s.flash = 1;
            pops = [...pops, { x: at.x, y: at.y - 34, life: 0.7, text: `+${mult}`, good: true }];
            sparks = [
              ...sparks,
              ...Array.from({ length: 10 }, () => ({
                x: at.x, y: at.y, vx: (Math.random() - 0.5) * 280, vy: -60 - Math.random() * 220, life: 0.7 + Math.random() * 0.3, size: 3 + Math.random() * 4, round: Math.random() > 0.5,
              })),
            ];
          } else {
            s.streak = 0;
            s.score = Math.max(0, s.score - 2);
            s.shake = 1;
            pops = [...pops, { x: at.x, y: at.y - 34, life: 0.7, text: "-2", good: false }];
          }
          continue;
        }
        if (it.p < 1.08) next.push(it);
        else if (it.good) s.streak = 0;
      }
      s.items = next;
      s.sparks = sparks.map((p) => ({ ...p, x: p.x + p.vx * dt, y: p.y + p.vy * dt, vy: p.vy + 520 * dt, life: p.life - dt * 1.5 })).filter((p) => p.life > 0);
      s.pops = pops.map((p) => ({ ...p, y: p.y - 40 * dt, life: p.life - dt })).filter((p) => p.life > 0);
      setScore((old) => (old === s.score ? old : s.score));
      draw();
      if (s.left <= 0) {
        s.run = false;
        setPhase("end");
        setBoard(readScores());
        return;
      }
      raf.current = requestAnimationFrame((t) => tickRef.current(t));
    },
    [draw, seconds],
  );

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  const start = useCallback(() => {
    const s = live.current;
    s.items = [];
    s.sparks = [];
    s.pops = [];
    s.score = 0;
    s.streak = 0;
    s.shake = 0;
    s.flash = 0;
    s.left = seconds;
    s.spawn = 0.3;
    s.target = 1;
    s.laneX = 1;
    s.lastLane = 1;
    s.last = performance.now();
    s.run = true;
    setScore(0);
    setSaved(false);
    setPhase("run");
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame((t) => tickRef.current(t));
    canvas.current?.focus({ preventScroll: true });
  }, [seconds]);

  // keyboard works while running, wherever the focus is
  useEffect(() => {
    if (phase !== "run") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") moveLane(-1);
      else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") moveLane(1);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, moveLane]);

  const save = () => {
    const entry: Score = { name: (name.trim() || g.player).slice(0, 16), score: live.current.score, t: nowMs() };
    const list = [...readScores(), entry].sort((a, b) => b.score - a.score);
    writeScores(list);
    setBoard(list);
    setSaved(true);
  };

  const rank = board.findIndex((b) => b.score <= score && b.t > 0) + 1;

  return (
    <div className="wf-game" ref={wrap} style={{ ["--gc" as string]: color }}>
      <canvas
        ref={canvas}
        className="wf-game__canvas"
        tabIndex={0}
        role="application"
        aria-label={fmt(g.ariaCanvas, { brand: brand || g.defaultBrand })}
        onPointerDown={(e) => {
          live.current.swipe = e.clientX;
        }}
        onPointerUp={(e) => {
          const s = live.current;
          if (!s.run || s.swipe === null) return;
          const dx = e.clientX - s.swipe;
          s.swipe = null;
          if (Math.abs(dx) > 28) moveLane(dx > 0 ? 1 : -1);
          else {
            const r = e.currentTarget.getBoundingClientRect();
            moveLane(e.clientX < r.left + r.width / 2 ? -1 : 1);
          }
        }}
      />
      {phase === "run" && (
        <>
          <div className="wf-game__pill" aria-hidden="true">
            <i />
            <b>{score}</b>
          </div>
          <p className="wf-game__brand" aria-hidden="true">{brand || g.defaultBrand}</p>
          <div className="wf-keypad" role="group" aria-label={g.controlsLabel}>
            <button type="button" className="wf-key" aria-label={g.left} onPointerDown={(e) => { e.preventDefault(); moveLane(-1); }}>
              <Arrow dir="left" />
            </button>
            <button type="button" className="wf-key" aria-label={g.right} onPointerDown={(e) => { e.preventDefault(); moveLane(1); }}>
              <Arrow dir="right" />
            </button>
          </div>
        </>
      )}
      {phase !== "run" && (
        <div className="wf-game__panel" role="group" aria-label={g.status}>
          {phase === "idle" && (
            <>
              <p className="wf-game__kicker">{g.kicker}</p>
              <p className="wf-game__title">{brand || g.defaultBrand}</p>
              <p className="wf-game__text">{fmt(g.idleText, { seconds })}</p>
              <button type="button" className="wf-cta" onClick={start}>
                {g.start}
              </button>
              <p className="wf-game__note">{g.controls}</p>
            </>
          )}
          {phase === "end" && (
            <>
              <p className="wf-game__kicker">{g.over}</p>
              <p className="wf-game__title">{fmt(g.points, { n: score })}</p>
              {!compact && (
                <>
                  {!saved ? (
                    <form
                      className="wf-game__save"
                      onSubmit={(e) => {
                        e.preventDefault();
                        save();
                      }}
                    >
                      <label htmlFor="wf-player">{g.saveLabel}</label>
                      <div>
                        <input id="wf-player" value={name} maxLength={16} onChange={(e) => setName(e.target.value)} autoComplete="nickname" />
                        <button type="submit" className="wf-cta wf-cta--ghost">
                          {g.save}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p className="wf-game__text">{fmt(g.rank, { n: rank || 1 })}</p>
                      <ol className="wf-game__board">
                        {board.slice(0, 5).map((b, i) => (
                          <li key={`${b.t}-${i}`}>
                            <span>
                              {i + 1}. {b.name}
                            </span>
                            <b>{b.score}</b>
                          </li>
                        ))}
                      </ol>
                    </>
                  )}
                  <p className="wf-game__note">{g.localNote}</p>
                </>
              )}
              <button type="button" className="wf-cta" onClick={start}>
                {g.again}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
