"use client";

import { useEffect, useRef } from "react";
import { getDict, type Locale } from "@/lib/i18n";
import { PLAYER_T, drawScene, project, type Item, type Pop, type Scene } from "@/lib/runner";

/**
 * Signature move: the page plays the brand runner by itself while the visitor scrolls.
 * Scroll progress of the surrounding act (--sc-p) drives the lane switches, the approaching
 * tokens and the score. The scene is stateless: scrolling back rewinds it.
 */
const GOOD_LANES = [1, 2, 0, 1, 2, 2, 0, 1, 0, 2];
const START = 0.1;
const STEP = 0.07;
const DUR = 0.2;
const HIT = 0.88;
const BAD_STARTS = [0.16, 0.36, 0.58];

const smooth = (t: number) => t * t * (3 - 2 * t);
const collectAt = (i: number) => START + i * STEP + DUR * HIT;

function laneAt(P: number) {
  const first = collectAt(0);
  const last = collectAt(GOOD_LANES.length - 1);
  if (P <= first) return GOOD_LANES[0];
  if (P >= last) return GOOD_LANES[GOOD_LANES.length - 1];
  for (let i = 0; i < GOOD_LANES.length - 1; i++) {
    const a = collectAt(i);
    const b = collectAt(i + 1);
    if (P >= a && P < b) {
      const k = (P - a) / (b - a);
      return GOOD_LANES[i] + (GOOD_LANES[i + 1] - GOOD_LANES[i]) * smooth(Math.min(1, Math.max(0, (k - 0.25) / 0.6)));
    }
  }
  return GOOD_LANES[0];
}

const BADS = BAD_STARTS.map((s, i) => {
  const at = Math.round(laneAt(s + DUR * HIT));
  return { s, lane: (at + 1 + (i % 2)) % 3 };
});

export function ScrollGame({ locale }: { locale: Locale }) {
  const brandName = getDict(locale).game.defaultBrand;
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const score = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const c = canvas.current;
    const act = el?.closest<HTMLElement>("[data-sc-act]");
    if (!el || !c || !act) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let last = -1;
    let alive = true;
    let W = 320;
    let H = 420;

    const resize = () => {
      W = Math.max(200, el.clientWidth);
      H = Math.max(200, el.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
      c.style.width = `${W}px`;
      c.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      last = -1;
    };

    const paint = (P: number) => {
      const items: Item[] = [];
      let caught = 0;
      const pops: Pop[] = [];
      const pl = project(W, H, laneAt(P), PLAYER_T);
      GOOD_LANES.forEach((lane, i) => {
        const s = START + i * STEP;
        const p = (P - s) / DUR;
        const tc = collectAt(i);
        if (P >= tc) {
          caught += 1;
          const k = (P - tc) / 0.05;
          if (k >= 0 && k < 1) pops.push({ x: pl.x, y: pl.y - 34 - k * 26, life: 1 - k, text: "+1", good: true });
        } else if (p > 0.01) items.push({ lane, p, good: true, a: i * 1.7 });
      });
      BADS.forEach((b, i) => {
        const p = (P - b.s) / DUR;
        if (p > 0.01 && p < 1.08) items.push({ lane: b.lane, p, good: false, a: i * 2.3 });
      });
      const scene: Scene = {
        items, laneX: laneAt(P), flash: 0, shake: 0, clock: P * 7, roadSpeed: 1, timeFrac: null, sparks: [], pops,
      };
      drawScene(ctx, W, H, scene, { color: "#ff6b5e", brand: brandName, shape: "quadrat" });
      if (score.current) score.current.textContent = String(caught);
    };

    const loop = () => {
      if (!alive) return;
      const raw = parseFloat(getComputedStyle(act).getPropertyValue("--sc-p"));
      const P = Number.isFinite(raw) ? raw : 0;
      if (Math.abs(P - last) > 0.0004) {
        last = P;
        paint(P);
      }
      raf = requestAnimationFrame(loop);
    };
    resize();
    paint(0);
    raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [brandName]);

  return (
    <div className="wf-lane" ref={wrap} aria-hidden="true">
      <canvas ref={canvas} className="wf-lane__canvas" />
      <div className="wf-game__pill">
        <i />
        <b ref={score}>0</b>
      </div>
    </div>
  );
}
