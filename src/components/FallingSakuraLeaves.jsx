import React from 'react';

/**
 * Authentic 14-leaf drifting sakura / terracotta leaves from sharara.me
 * High-performance CSS keyframe animation with 3D tilt, drift, and veins.
 */
export default function FallingSakuraLeaves() {
  return (
    <div className="falling-leaves" aria-hidden="true" data-testid="falling-leaves">
      {Array.from({ length: 14 }, (_, i) => (
        <span key={i} className={`falling-leaf falling-leaf-${i + 1}`} />
      ))}
    </div>
  );
}
