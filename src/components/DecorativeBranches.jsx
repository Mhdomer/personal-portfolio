import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

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
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const yTopLeft = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const yTopRight = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const yMidLeft = useTransform(scrollYProgress, [0, 1], [18, -26]);
  const yBottomRight = useTransform(scrollYProgress, [0, 1], [28, -20]);

  return (
    <div
      className="deco-branches"
      aria-hidden="true"
      data-testid="decorative-branches"
    >
      <motion.div
        className="deco-branch-tl"
        style={prefersReducedMotion ? undefined : { y: yTopLeft }}
      >
        <BranchSvg />
      </motion.div>
      <motion.div
        className="deco-branch-tr"
        style={prefersReducedMotion ? undefined : { y: yTopRight }}
      >
        <BranchSvg flip sparse />
      </motion.div>
      <motion.div
        className="deco-branch-bl"
        style={prefersReducedMotion ? undefined : { y: yMidLeft }}
      >
        <BranchSvg flip />
      </motion.div>
      <motion.div
        className="deco-branch-br"
        style={prefersReducedMotion ? undefined : { y: yBottomRight }}
      >
        <BranchSvg />
      </motion.div>
    </div>
  );
}

/**
 * Compact Sakura Leaf & Branch Flourish for section headers
 */
export function SectionSakuraHeader({ category, className = '' }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`relative mb-8 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-7 opacity-75 shrink-0" style={{ color: 'var(--brand-coral)' }}>
          <svg viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <motion.path
              d="M4,42 C30,30 50,22 92,10"
              initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.62, ease: EDITORIAL_EASE }}
            />
            <motion.path
              d="M35,28 C45,22 55,18 65,10"
              initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.12, ease: EDITORIAL_EASE }}
            />
            <motion.g
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.22, ease: EDITORIAL_EASE }}
            >
              <ellipse cx="48" cy="22" rx="4.5" ry="2.8" fill="currentColor" transform="rotate(-20 48 22)" />
              <ellipse cx="54" cy="25" rx="3.8" ry="2.2" fill="currentColor" transform="rotate(18 54 25)" />
              <ellipse cx="80" cy="14" rx="4.5" ry="2.8" fill="currentColor" transform="rotate(-20 80 14)" />
              <circle cx="43" cy="26" r="1.5" fill="currentColor" />
              <circle cx="75" cy="17" r="1.5" fill="currentColor" />
            </motion.g>
          </svg>
        </div>
        <div>
          {category && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 5 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.08, ease: EDITORIAL_EASE }}
              className="text-xs font-mono font-bold uppercase tracking-widest opacity-60"
            >
              {category}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Section Sakura Divider Flourish (bridges horizontal section borders)
 */
export function SectionSakuraDivider({ flip = false, className = '' }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`relative w-full overflow-hidden py-4 pointer-events-none select-none flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 opacity-40">
        <motion.div
          initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.68, ease: EDITORIAL_EASE }}
          className="h-px flex-1 origin-right"
          style={{ background: 'var(--line)' }}
        />
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.08, ease: EDITORIAL_EASE }}
          className="w-16 h-8 shrink-0 transition-colors"
          style={{ color: 'var(--ink)' }}
        >
          <svg
            viewBox="0 0 120 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
          >
            <path d="M5,22 C35,18 70,20 115,12" />
            <path d="M45,20 C60,14 75,10 85,6" />
            <path d="M25,21 C35,26 48,28 58,32" />
            <ellipse cx="60" cy="14" rx="4.5" ry="2.6" fill="currentColor" transform="rotate(-18 60 14)" />
            <ellipse cx="66" cy="16" rx="3.8" ry="2.2" fill="currentColor" transform="rotate(22 66 16)" />
            <ellipse cx="88" cy="8" rx="4.2" ry="2.4" fill="currentColor" transform="rotate(-15 88 8)" />
            <ellipse cx="40" cy="24" rx="3.8" ry="2.2" fill="currentColor" transform="rotate(25 40 24)" />
            <circle cx="55" cy="16" r="1.5" fill="currentColor" />
            <circle cx="82" cy="10" r="1.5" fill="currentColor" />
          </svg>
        </motion.div>
        <motion.div
          initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.68, ease: EDITORIAL_EASE }}
          className="h-px flex-1 origin-left"
          style={{ background: 'var(--line)' }}
        />
      </div>
    </div>
  );
}
