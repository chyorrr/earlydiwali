'use client';
import { useEffect, useRef, useCallback } from 'react';

const COLORS = [
  '#FFD700', '#FF6B1A', '#FF3366', '#FF69B4', '#00E5FF',
  '#FF4500', '#FFE87C', '#FFA500', '#FF1493', '#C6FF00',
  '#FF6347', '#E0115F', '#9932CC', '#FFFF00', '#00FF88',
];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  color: string; life: number;
  decay: number; size: number;
  gravity: number; friction: number;
  trail: { x: number; y: number }[];
}

interface Rocket {
  x: number; y: number;
  vx: number; vy: number;
  color: string; ticks: number;
  maxTicks: number;
  trail: { x: number; y: number }[];
}

function rndColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function createParticle(x: number, y: number, angle: number, speed: number, type: 'star' | 'spark'): Particle {
  return {
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    color: rndColor(),
    life: 1,
    decay: Math.random() * 0.014 + 0.008,
    size: type === 'star' ? Math.random() * 3 + 2 : Math.random() * 2 + 1,
    gravity: type === 'star' ? 0.055 : 0.025,
    friction: type === 'star' ? 0.972 : 0.992,
    trail: [],
  };
}

function explodeAt(x: number, y: number, particles: Particle[]) {
  const c1 = rndColor(), c2 = rndColor();
  for (let ring = 0; ring < 2; ring++) {
    const count = 90 + Math.floor(Math.random() * 40);
    const speed = ring === 0 ? Math.random() * 5 + 6 : Math.random() * 3 + 3;
    const c = ring === 0 ? c1 : c2;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.15;
      const p = createParticle(x, y, angle, speed + Math.random() * 1.5, 'star');
      p.color = c;
      particles.push(p);
    }
  }
  for (let i = 0; i < 25; i++) {
    const p = createParticle(x, y, Math.random() * Math.PI * 2, Math.random() * 3 + 1, 'spark');
    p.color = '#ffffff';
    particles.push(p);
  }
}

export default function FireworkCanvas({ active, onFinished }: { active: boolean; onFinished?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ particles: [] as Particle[], rockets: [] as Rocket[], animating: false });
  const rafRef = useRef<number>(0);

  const launchRocket = useCallback((fromX: number) => {
    if (typeof window === 'undefined') return;
    const targetX = window.innerWidth * 0.15 + Math.random() * window.innerWidth * 0.7;
    const targetY = Math.random() * (window.innerHeight * 0.4);
    const ticks = 45 + Math.floor(Math.random() * 15);
    stateRef.current.rockets.push({
      x: fromX,
      y: window.innerHeight,
      vx: (targetX - fromX) / ticks,
      vy: (targetY - window.innerHeight) / ticks,
      color: rndColor(),
      ticks: 0,
      maxTicks: ticks,
      trail: [],
    });
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = stateRef.current;
    state.animating = true;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Initial mega burst at top center
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.28;
    const initColors = ['#FFD700', '#FF6B1A', '#FF3366'];
    for (let ring = 0; ring < 3; ring++) {
      setTimeout(() => {
        const count = 120 + ring * 25;
        const speed = 9 - ring * 1.8;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 / count) * i;
          const p = createParticle(cx, cy, angle, speed + Math.random() * 2, 'star');
          p.color = initColors[ring];
          state.particles.push(p);
        }
        for (let i = 0; i < 35; i++) {
          const p = createParticle(cx, cy, Math.random() * Math.PI * 2, Math.random() * 4 + 1, 'spark');
          p.color = '#fff';
          state.particles.push(p);
        }
      }, ring * 120);
    }

    // Cascade follow-up rockets
    let rocketCount = 0;
    const cascadeInterval = setInterval(() => {
      if (rocketCount >= 14) {
        clearInterval(cascadeInterval);
        return;
      }
      launchRocket(window.innerWidth * 0.1 + Math.random() * window.innerWidth * 0.8);
      rocketCount++;
    }, 280);

    // Duration timer to end fireworks
    const endTimer = setTimeout(() => {
      if (onFinished) onFinished();
    }, 6000);

    function loop() {
      if (!state.animating || !ctx || !canvas) return;
      ctx.fillStyle = 'rgba(10,3,5,0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw rockets
      state.rockets = state.rockets.filter((r) => {
        r.ticks++;
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 14) r.trail.shift();
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.015;
        if (r.ticks >= r.maxTicks) {
          explodeAt(r.x, r.y, state.particles);
          return false;
        }

        for (let i = 0; i < r.trail.length; i++) {
          const t = r.trail[i];
          const a = (i / r.trail.length) * 0.7;
          ctx.globalAlpha = a;
          ctx.beginPath();
          ctx.arc(t.x, t.y, 2.5 - (i / r.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = r.color;
          ctx.fill();
        }

        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 12;
        ctx.shadowColor = r.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        return true;
      });

      // Draw particles
      state.particles = state.particles.filter((p) => p.life > 0);
      for (const p of state.particles) {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 6) p.trail.shift();
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        for (let i = 0; i < p.trail.length; i++) {
          const t = p.trail[i];
          ctx.globalAlpha = (i / p.trail.length) * p.life * 0.4;
          ctx.beginPath();
          ctx.arc(t.x, t.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }

        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      state.animating = false;
      cancelAnimationFrame(rafRef.current);
      clearInterval(cascadeInterval);
      clearTimeout(endTimer);
      window.removeEventListener('resize', resize);
    };
  }, [active, launchRocket, onFinished]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 60 }}
    />
  );
}
