import React from 'react';

/**
 * Japanese Ink Sakura Branch SVG Component
 * Reverse-engineered directly from sharara.me
 */
export function BranchSvg({ flip = false, sparse = false, className = '' }) {
  return (
    <svg
      viewBox="0 0 320 220"
      className={`deco-branch ${flip ? 'flip' : ''} ${className}`}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      {/* Branch Stem & Twigs */}
      <g>
        <path d="M8,212 C60,170 96,150 150,128 C200,108 244,84 306,44" />
        <path d="M70,176 C92,160 104,148 118,128" />
        <path d="M128,140 C150,128 160,116 170,98" />
        <path d="M196,108 C216,96 228,86 238,70" />
        {!sparse && <path d="M52,190 C66,184 76,178 84,168" />}
        <path d="M156,126 C168,122 176,116 182,108" />
      </g>

      {/* Sakura Petal Buds & Leaf Accents */}
      <g fill="currentColor" opacity="0.85">
        <ellipse cx="118" cy="124" rx="7" ry="4.4" transform="rotate(-24 118 124)" />
        <ellipse cx="124" cy="130" rx="6" ry="3.8" transform="rotate(18 124 130)" />
        <ellipse cx="172" cy="94" rx="7" ry="4.4" transform="rotate(-20 172 94)" />
        <ellipse cx="178" cy="100" rx="6" ry="3.8" transform="rotate(22 178 100)" />
        <ellipse cx="240" cy="66" rx="7" ry="4.4" transform="rotate(-24 240 66)" />
        <ellipse cx="246" cy="72" rx="6" ry="3.8" transform="rotate(18 246 72)" />
        {!sparse && <ellipse cx="84" cy="164" rx="6.4" ry="4" transform="rotate(-22 84 164)" />}
        {!sparse && <ellipse cx="90" cy="170" rx="5.4" ry="3.4" transform="rotate(20 90 170)" />}
        <ellipse cx="272" cy="48" rx="6.4" ry="4" transform="rotate(-20 272 48)" />
        <circle cx="112" cy="134" r="2.4" />
        <circle cx="184" cy="104" r="2.4" />
        <circle cx="252" cy="76" r="2.4" />
        {!sparse && <circle cx="96" cy="174" r="2.2" />}
      </g>
    </svg>
  );
}

/**
 * Full page decorative branches positioned across the viewport:
 * - Top-left reaching into the hero
 * - Top-right crossing behind the hanging katana
 * - Mid-left and bottom-right across content sections
 */
export default function DecorativeBranches() {
  return (
    <div
      className="deco-branches"
      aria-hidden="true"
      data-testid="decorative-branches"
    >
      <div className="deco-branch-tl">
        <BranchSvg />
      </div>
      <div className="deco-branch-tr">
        <BranchSvg flip sparse />
      </div>
      <div className="deco-branch-bl">
        <BranchSvg flip />
      </div>
      <div className="deco-branch-br">
        <BranchSvg />
      </div>
    </div>
  );
}

/**
 * Compact Sakura Leaf & Branch Flourish for section headers
 */
export function SectionSakuraHeader({ title, category, className = '' }) {
  return (
    <div className={`relative mb-8 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-7 opacity-75 shrink-0" style={{ color: 'var(--brand-coral)' }}>
          <svg viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4,42 C30,30 50,22 92,10" />
            <path d="M35,28 C45,22 55,18 65,10" />
            <ellipse cx="48" cy="22" rx="4.5" ry="2.8" fill="currentColor" transform="rotate(-20 48 22)" />
            <ellipse cx="54" cy="25" rx="3.8" ry="2.2" fill="currentColor" transform="rotate(18 54 25)" />
            <ellipse cx="80" cy="14" rx="4.5" ry="2.8" fill="currentColor" transform="rotate(-20 80 14)" />
            <circle cx="43" cy="26" r="1.5" fill="currentColor" />
            <circle cx="75" cy="17" r="1.5" fill="currentColor" />
          </svg>
        </div>
        <div>
          {category && (
            <div className="text-xs font-mono font-bold uppercase tracking-widest opacity-60">
              {category}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
