import React, { useEffect, useRef } from 'react';

/**
 * Interactive Cursor Sword Slash Layer (sharara.me effect)
 * Creates dynamic glowing blade slashes along the cursor movement path.
 */
export default function CursorSwordSlash() {
  const slashLayerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia?.('(pointer: fine)').matches) return;
    const layer = slashLayerRef.current;
    if (!layer) return;

    let lastX = -9999;
    let lastY = -9999;
    let lastTime = 0;
    let rafId = 0;
    let pendingPoint = null;

    const spawnSlash = (x, y) => {
      if (layer.childElementCount > 24) return;
      const slash = document.createElement('span');
      slash.className = 'cursor-slash';
      const width = 22 + Math.random() * 12;
      const angle = -38 + Math.random() * 14;
      slash.style.left = `${x}px`;
      slash.style.top = `${y}px`;
      slash.style.width = `${width}px`;
      slash.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      layer.appendChild(slash);
      window.setTimeout(() => slash.remove(), 500);
    };

    const handlePointerMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      const now = performance.now();
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist < 28 && now - lastTime < 100) return;

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
      pendingPoint = { x: e.clientX, y: e.clientY };

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          if (pendingPoint) {
            spawnSlash(pendingPoint.x, pendingPoint.y);
            pendingPoint = null;
          }
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId) cancelAnimationFrame(rafId);
      layer.innerHTML = '';
    };
  }, []);

  return <div ref={slashLayerRef} className="cursor-slash-layer" aria-hidden="true" />;
}
