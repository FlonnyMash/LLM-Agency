"use client";

import { useEffect, useRef } from "react";

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
uniform float uAlpha;
uniform vec2 uMouse;
uniform vec3 uTrail[18];

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / max(uRes.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);

  vec2 mouse = vec2(uMouse.x * aspect, uMouse.y);
  vec2 fromMouse = p - mouse;

  vec2 q = p * 1.65;
  q.x += uTime * 0.06;
  q += fromMouse * 0.18;

  float n1 = fbm(q + uTime * 0.04);
  float n2 = fbm(q + vec2(5.2, 1.3) - uTime * 0.03);
  vec2 warp = vec2(n1, n2);
  float silk = fbm(q + warp * 1.55);

  float ribbon = 0.0;
  for (int i = 0; i < 18; i++) {
    vec2 t = vec2(uTrail[i].x * aspect, uTrail[i].y);
    float s = uTrail[i].z;
    vec2 d = p - t;
    d += (warp - 0.5) * 0.22;
    float r = length(d);
    ribbon += s * smoothstep(0.38, 0.0, r);
  }

  float band = smoothstep(0.28, 0.52, uv.y) * smoothstep(1.02, 0.58, uv.y);
  float dens = silk * (0.42 + 0.58 * band) + ribbon * 0.95;
  dens = smoothstep(0.32, 0.88, dens);
  dens *= 0.55 + 0.45 * silk;

  float phase = silk * 3.8 + ribbon * 1.8 + uTime * 0.11;
  vec3 col = 0.5 + 0.5 * cos(6.28318 * (phase + vec3(0.0, 0.18, 0.36)));
  col = mix(col, vec3(1.0, 0.52, 0.22), smoothstep(0.35, 1.0, ribbon) * 0.4);
  col = mix(col, vec3(0.45, 0.82, 1.0), (1.0 - ribbon) * silk * 0.28);
  col = mix(col, vec3(0.88, 0.04, 0.0), ribbon * silk * 0.12);

  float glow = exp(-9.0 * length(fromMouse)) * uAlpha;
  col += vec3(0.55, 0.7, 1.0) * glow * 0.35;

  float alpha = dens * uAlpha * 0.82 + glow * 0.18;
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
    const uAlpha = gl.getUniformLocation(program, "uAlpha");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uTrail = gl.getUniformLocation(program, "uTrail[0]");

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const trail = new Float32Array(18 * 3);
    const mouse = { x: 0.5, y: 0.65, tx: 0.5, ty: 0.65 };
    let intensity = 0;
    let hovering = false;
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

    const hitTest = (clientX: number, clientY: number) => {
      const host = section ?? canvas.parentElement;
      if (!host) return false;
      const rect = host.getBoundingClientRect();
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    };

    const toUv = (clientX: number, clientY: number) => {
      const host = section ?? canvas.parentElement;
      if (!host) return;
      const rect = host.getBoundingClientRect();
      mouse.tx = (clientX - rect.left) / Math.max(rect.width, 1);
      mouse.ty = 1 - (clientY - rect.top) / Math.max(rect.height, 1);
    };

    const onLeave = () => {
      hovering = false;
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      intensity += ((hovering ? 1 : 0) - intensity) * Math.min(1, dt * 3.2);
      if (intensity < 0.004 && !hovering) {
        canvas.style.opacity = "0";
        frame = 0;
        return;
      }
      canvas.style.opacity = "1";
      frame = requestAnimationFrame(loop);

      resize();

      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;

      for (let i = 17; i >= 1; i--) {
        trail[i * 3] = trail[(i - 1) * 3];
        trail[i * 3 + 1] = trail[(i - 1) * 3 + 1];
        trail[i * 3 + 2] = trail[(i - 1) * 3 + 2] * 0.88;
      }
      const dx = mouse.tx - mouse.x;
      const dy = mouse.ty - mouse.y;
      const speed = Math.min(1, Math.hypot(dx, dy) * 18);
      trail[0] = mouse.x;
      trail[1] = mouse.y;
      trail[2] = hovering ? 0.35 + speed * 0.65 : trail[2] * 0.9;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, now * 0.001);
      gl.uniform1f(uAlpha, intensity);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform3fv(uTrail, trail);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const kick = () => {
      if (!running || frame) return;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      const inside = hitTest(event.clientX, event.clientY);
      hovering = inside;
      if (inside) {
        toUv(event.clientX, event.clientY);
        kick();
      }
    };

    resize();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    const onMotion = () => {
      if (reduced.matches) {
        hovering = false;
        intensity = 0;
      }
    };
    reduced.addEventListener("change", onMotion);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
      reduced.removeEventListener("change", onMotion);
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
