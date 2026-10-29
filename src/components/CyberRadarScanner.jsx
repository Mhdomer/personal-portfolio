import React, { useEffect, useRef } from 'react';

export default function CyberRadarScanner() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Interactive cursor coordinates
    let mouse = { x: width * 0.5, y: height * 0.3 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Simulated network nodes
    const nodes = [
      { name: 'Riyadh Al-Ameen IT', xRatio: 0.72, yRatio: 0.28, color: '#10b981' },
      { name: 'UTM Johor Lab', xRatio: 0.85, yRatio: 0.65, color: '#0ea5e9' },
      { name: 'AWS me-central-1', xRatio: 0.22, yRatio: 0.35, color: '#10b981' },
      { name: 'AWS ap-southeast-1', xRatio: 0.38, yRatio: 0.75, color: '#0ea5e9' },
      { name: 'CloudFront Edge PoP', xRatio: 0.5, yRatio: 0.15, color: '#38bdf8' },
    ];

    let radarAngle = 0;
    const radarCenter = { x: width * 0.8, y: height * 0.35 };

    // Floating micro telemetry particles
    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.8,
      alpha: Math.random() * 0.3 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle tactical background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 64;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Interactive mouse proximity aura
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
      grad.addColorStop(0, 'rgba(16, 185, 129, 0.035)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 3. Floating telemetry particles with connecting data lines
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.06 * (1 - dist / 100)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      // 4. Subtle cyber radar sweep in the background
      radarAngle += 0.012;
      const radarRadius = Math.min(width, height) * 0.28;

      ctx.save();
      ctx.translate(radarCenter.x, radarCenter.y);

      // Radar rings
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.04)';
      ctx.lineWidth = 1;
      [0.33, 0.66, 1.0].forEach((ratio) => {
        ctx.beginPath();
        ctx.arc(0, 0, radarRadius * ratio, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Sweep line
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(radarAngle) * radarRadius, Math.sin(radarAngle) * radarRadius);
      ctx.stroke();

      ctx.restore();

      // 5. Tactical Node pips
      nodes.forEach((node) => {
        const nx = node.xRatio * width;
        const ny = node.yRatio * height;

        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing ring
        const pulse = (Date.now() / 1000) % 2;
        ctx.strokeStyle = `${node.color}${Math.floor((1 - pulse / 2) * 80).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(nx, ny, 4 + pulse * 8, 0, Math.PI * 2);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-80"
    />
  );
}
