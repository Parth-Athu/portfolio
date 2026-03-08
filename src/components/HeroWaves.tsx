import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const waves = [
      { amplitude: 40, frequency: 0.008, speed: 0.015, color: "rgba(20, 184, 166, 0.08)", yOffset: 0.3 },
      { amplitude: 30, frequency: 0.012, speed: 0.02, color: "rgba(6, 182, 212, 0.06)", yOffset: 0.45 },
      { amplitude: 50, frequency: 0.006, speed: 0.01, color: "rgba(139, 92, 246, 0.05)", yOffset: 0.6 },
      { amplitude: 25, frequency: 0.015, speed: 0.025, color: "rgba(20, 184, 166, 0.04)", yOffset: 0.75 },
    ];

    let phase = 0;
    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1.5;

        for (let x = 0; x < w; x += 2) {
          const y = h * wave.yOffset +
            Math.sin(x * wave.frequency + phase * wave.speed * 60) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 + phase * wave.speed * 30) * wave.amplitude * 0.5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      phase += 0.016;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

export default function HeroWaves() {
  return <AnimatedWaves />;
}
