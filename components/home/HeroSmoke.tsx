"use client";

import { useEffect, useRef } from "react";

const MAX_POINTS = 40;
const FADE_SEC = 2.8;
const MIN_DIST = 0.012;

const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec3 uTrail[40];

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

float distSeg(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1.0e-5), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / max(uRes.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);

  float n = fbm(p * 5.0 + uTime * 0.12);
  p += (n - 0.5) * 0.035;

  float line = 0.0;
  for (int i = 0; i < 39; i++) {
    float lifeA = uTrail[i].z;
    float lifeB = uTrail[i + 1].z;
    if (lifeA > 0.001 || lifeB > 0.001) {
      vec2 a = vec2(uTrail[i].x * aspect, uTrail[i].y);
      vec2 b = vec2(uTrail[i + 1].x * aspect, uTrail[i + 1].y);
      float d = distSeg(p, a, b);
      float life = max(lifeA, lifeB);
      float core = smoothstep(0.018, 0.0, d);
      float halo = smoothstep(0.055, 0.0, d);
      line += (core * 0.85 + halo * 0.35) * life;
    }
  }

  float head = uTrail[0].z;
  vec2 h = vec2(uTrail[0].x * aspect, uTrail[0].y);
  float hd = length(p - h);
  line += head * smoothstep(0.028, 0.0, hd) * 0.45;

  line = clamp(line, 0.0, 1.0);
  float wisp = 0.65 + 0.35 * fbm(p * 8.0 - uTime * 0.2);
  line *= wisp;

  vec3 col = mix(
    vec3(0.78, 0.86, 1.0),
    vec3(1.0, 0.98, 0.94),
    smoothstep(0.15, 0.85, line)
  );
  float alpha = line * 0.72;
  gl_FragColor = vec4(col * alpha, alpha);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function HeroSmoke() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uTrail = gl.getUniformLocation(program, "uTrail[0]");

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    type Point = { x: number; y: number; life: number };
    const points: Point[] = [];
    const packed = new Float32Array(MAX_POINTS * 3);

    let running = true;
    let frame = 0;
    let last = performance.now();

    const section = canvas.closest("section");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const { clientWidth: w, clientHeight: h } = canvas;
      const width = Math.max(1, Math.floor(w * dpr));
      const height = Math.max(1, Math.floor(h * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const hostRect = () => {
      const host = section ?? canvas.parentElement;
      return host?.getBoundingClientRect() ?? null;
    };

    const toUv = (clientX: number, clientY: number) => {
      const rect = hostRect();
      if (!rect) return null;
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return null;
      }
      return {
        x: (clientX - rect.left) / Math.max(rect.width, 1),
        y: 1 - (clientY - rect.top) / Math.max(rect.height, 1),
      };
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      for (let i = points.length - 1; i >= 0; i--) {
        points[i].life -= dt / FADE_SEC;
        if (points[i].life <= 0) points.splice(i, 1);
      }

      if (points.length === 0) {
        canvas.style.opacity = "0";
        frame = 0;
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        return;
      }

      canvas.style.opacity = "1";
      frame = requestAnimationFrame(loop);
      resize();

      packed.fill(0);
      for (let i = 0; i < points.length && i < MAX_POINTS; i++) {
        packed[i * 3] = points[i].x;
        packed[i * 3 + 1] = points[i].y;
        packed[i * 3 + 2] = Math.max(0, points[i].life);
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, now * 0.001);
      gl.uniform3fv(uTrail, packed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const kick = () => {
      if (!running || frame) return;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };

    const pushPoint = (x: number, y: number) => {
      const lastPt = points[0];
      if (
        lastPt &&
        Math.hypot(lastPt.x - x, lastPt.y - y) < MIN_DIST
      ) {
        lastPt.x = x;
        lastPt.y = y;
        lastPt.life = 1;
      } else {
        points.unshift({ x, y, life: 1 });
        if (points.length > MAX_POINTS) points.pop();
      }
      kick();
    };

    const onMove = (event: PointerEvent) => {
      const uv = toUv(event.clientX, event.clientY);
      if (!uv) return;
      pushPoint(uv.x, uv.y);
    };

    resize();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full mix-blend-screen"
    />
  );
}
