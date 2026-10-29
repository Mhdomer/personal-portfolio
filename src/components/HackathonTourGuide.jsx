import React, { useState, useEffect, useRef } from 'react';
import { FastForward } from 'lucide-react';

/**
 * Interactive Virtual Mouse Tour Guide (sharara.me exact implementation)
 * An animated virtual cursor navigates between targets:
 * - Moves over GitHub and LinkedIn links in navbar with informative callout bubbles
 * - Highlights the bio text in yellow word-by-word with real browser text selection
 * - Smoothly scrolls to each section (Architecture, Superpowers, Projects, Experience, Resume)
 * - Pressing ESC, scrolling, or clicking anywhere aborts immediately
 */

// Helper to find all word boundary text nodes inside a container
function getTextWordBoundaries(element) {
  const walker = document.createTreeWalker(element, window.NodeFilter.SHOW_TEXT);
  const boundaries = [];
  let node = walker.nextNode();
  while (node) {
    const text = node.textContent ?? '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];
      if (!/\s/.test(char) && (i + 1 >= text.length || /\s/.test(nextChar))) {
        boundaries.push({ node, offset: i + 1 });
      }
    }
    node = walker.nextNode();
  }
  return boundaries;
}

// Cubic bezier smooth easing: t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function HackathonTourGuide({ isOpen, onClose }) {
  const [active, setActive] = useState(false);
  const [caption, setCaption] = useState('');
  const [captionOn, setCaptionOn] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorRef = useRef(null);
  const isCancelledRef = useRef(false);
  const isRunningRef = useRef(false);
  const currentPosRef = useRef({ x: 60, y: 120 });

  // Update cursor and tooltip position on viewport
  const setCursorPos = (targetX, targetY) => {
    const maxX = window.innerWidth - 24;
    const maxY = window.innerHeight - 24;
    const clampedX = Math.round(Math.max(12, Math.min(targetX, maxX)));
    const clampedY = Math.round(Math.max(12, Math.min(targetY, maxY)));
    currentPosRef.current = { x: clampedX, y: clampedY };

    if (!cursorRef.current) return;
    cursorRef.current.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;

    // Auto-adjust caption position to avoid overflowing viewport
    const captionEl = cursorRef.current.querySelector('.tour-caption');
    if (!captionEl) return;
    const captionW = captionEl.offsetWidth || 220;
    const captionH = captionEl.offsetHeight || 60;

    const placeLeft = clampedX + 24 + captionW > maxX;
    const placeTop = clampedY + 28 + captionH > maxY;

    captionEl.style.left = placeLeft ? `-${captionW + 12}px` : '24px';
    captionEl.style.top = placeTop ? `-${captionH + 8}px` : '24px';
  };

  // Wait utility respecting cancellation
  const waitMs = (ms) =>
    new Promise((resolve) => {
      const start = performance.now();
      const tick = () => {
        if (isCancelledRef.current || performance.now() - start >= ms) {
          resolve();
        } else {
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
    });

  // Smooth cursor motion from current pos to target
  const animateCursorTo = (destX, destY, durationMs = 800) =>
    new Promise((resolve) => {
      if (isCancelledRef.current) return resolve();
      const startX = currentPosRef.current.x;
      const startY = currentPosRef.current.y;
      const startTime = performance.now();

      const step = (now) => {
        if (isCancelledRef.current) return resolve();
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        const eased = easeInOutCubic(progress);

        const curX = startX + (destX - startX) * eased;
        const curY = startY + (destY - startY) * eased;
        setCursorPos(curX, curY);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(step);
    });

  // Smooth scroll window to position
  const animateScrollTo = (targetY, durationMs = 800) =>
    new Promise((resolve) => {
      const startY = window.scrollY;
      const diff = targetY - startY;
      if (Math.abs(diff) < 6) return resolve();
      const startTime = performance.now();

      const step = (now) => {
        if (isCancelledRef.current) return resolve();
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        const eased = easeInOutCubic(progress);

        window.scrollTo({ top: startY + diff * eased, behavior: 'instant' });

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(step);
    });

  // Word-by-word yellow text selection highlight animation
  const animateTextSelection = async (element, holdMs = 2000) => {
    const selection = window.getSelection();
    if (!selection) return;

    const wordBoundaries = getTextWordBoundaries(element);
    if (wordBoundaries.length < 2) return;

    const firstNode = wordBoundaries[0].node;
    const startOffset = Math.max(0, (firstNode.textContent ?? '').search(/\S/));

    for (let i = 0; i < wordBoundaries.length; i++) {
      if (isCancelledRef.current) break;
      const boundary = wordBoundaries[i];

      const range = document.createRange();
      range.setStart(firstNode, startOffset);
      range.setEnd(boundary.node, boundary.offset);

      selection.removeAllRanges();
      selection.addRange(range);

      // Position cursor at the right edge of selection
      const probeRange = document.createRange();
      probeRange.setStart(boundary.node, Math.max(0, boundary.offset - 1));
      probeRange.setEnd(boundary.node, boundary.offset);
      const rect = probeRange.getBoundingClientRect();

      setCursorPos(rect.right + 2, rect.top + rect.height / 2);
      await waitMs(75);
    }

    await waitMs(holdMs);
    selection.removeAllRanges();
  };

  // Main Tour Step Runner
  const runTour = async () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    isCancelledRef.current = false;
    setActive(true);
    document.body.classList.add('tour-active');

    // Initial cursor placement near top left
    setCursorPos(80, 140);
    await waitMs(350);

    const tourSteps = [
      {
        selector: '[data-testid="link-nav-github"]',
        caption: 'Start here. All my open source security projects and code live here.',
        action: 'hover',
        hold: 1600,
      },
      {
        selector: '[data-testid="link-nav-linkedin"]',
        caption: "Pick your platform and let's connect.",
        action: 'hover',
        hold: 1400,
      },
      {
        selector: '#hero-description',
        caption: '',
        action: 'select',
        hold: 1800,
        silent: true,
      },
      {
        selector: '[data-testid="button-hero-hint"]',
        caption: 'Interactive Cloud Security Sandbox: live IAM AST linter and incident simulator.',
        action: 'click',
        hold: 1800,
      },
      {
        selector: '#aws-architecture',
        caption: 'Production AWS architecture: Amazon Bedrock guardrails and EventBridge remediation.',
        action: 'visit',
        hold: 2400,
      },
      {
        selector: '#skills',
        caption: 'Core engineering capabilities: Cloud DevSecOps, AI Security, and Linux systems.',
        action: 'visit',
        hold: 2200,
      },
      {
        selector: '#projects',
        caption: 'Aegis-2B AI Guardrail: sub-115ms p99 latency passing 6/6 deterministic tests.',
        action: 'visit',
        hold: 2200,
      },
      {
        selector: '#experience',
        caption: "A few wins worth pinning up: UTM Dean's List and 3rd Place ASEAN Cyber Race CTF.",
        action: 'visit',
        hold: 2000,
      },
      {
        selector: '[data-testid="card-resume-preview"]',
        caption: 'Click here to inspect or download my 1-page ATS-verified LaTeX resume.',
        action: 'hover',
        hold: 2200,
      },
    ];

    try {
      for (const step of tourSteps) {
        if (isCancelledRef.current) break;

        const el = document.querySelector(step.selector);
        if (!el) continue;

        // Auto-scroll target into viewport if offscreen
        const rect = el.getBoundingClientRect();
        const absTop = window.scrollY + rect.top;
        const targetScrollY = Math.max(0, absTop - (window.innerHeight / 3));

        if (Math.abs(window.scrollY - targetScrollY) > 80) {
          await animateScrollTo(targetScrollY, 650);
        }

        // Move cursor to element
        const updatedRect = el.getBoundingClientRect();
        const destX = updatedRect.left + (updatedRect.width * 0.45);
        const destY = updatedRect.top + (updatedRect.height * 0.45);
        await animateCursorTo(destX, destY, 600);

        // Show caption bubble if not silent and caption text is provided
        if (!step.silent && step.caption) {
          setCaption(step.caption);
          setCaptionOn(true);
        } else {
          setCaptionOn(false);
          setCaption('');
        }

        if (step.action === 'select') {
          await animateTextSelection(el, step.hold);
        } else if (step.action === 'click') {
          setIsClicking(true);
          await waitMs(220);
          setIsClicking(false);
          await waitMs(step.hold);
        } else {
          await waitMs(step.hold);
        }

        setCaptionOn(false);
        await waitMs(250);
      }

      // Concluding step
      if (!isCancelledRef.current) {
        setCaption('That is the tour. Now it is yours to explore.');
        setCaptionOn(true);
        await waitMs(1800);
        setCaptionOn(false);
      }
    } finally {
      // Cleanup
      window.getSelection()?.removeAllRanges();
      document.body.classList.remove('tour-active');
      setActive(false);
      isRunningRef.current = false;
      onClose && onClose();
    }
  };

  // Trigger when isOpen prop changes
  useEffect(() => {
    if (isOpen) {
      runTour();
    } else {
      isCancelledRef.current = true;
      window.getSelection()?.removeAllRanges();
      document.body.classList.remove('tour-active');
      setActive(false);
    }
  }, [isOpen]);

  // Global cancel listeners: ESC, wheel scroll, or touch move
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        isCancelledRef.current = true;
        window.getSelection()?.removeAllRanges();
        document.body.classList.remove('tour-active');
        setActive(false);
        onClose && onClose();
      }
    };

    const handleInterrupt = () => {
      isCancelledRef.current = true;
      window.getSelection()?.removeAllRanges();
      document.body.classList.remove('tour-active');
      setActive(false);
      onClose && onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleInterrupt, { passive: true });
    window.addEventListener('touchmove', handleInterrupt, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleInterrupt);
      window.removeEventListener('touchmove', handleInterrupt);
    };
  }, [active, onClose]);

  if (!active && !isOpen) return null;

  return (
    <>
      {/* Floating Exit Button in Top-Right */}
      <button
        onClick={() => {
          isCancelledRef.current = true;
          window.getSelection()?.removeAllRanges();
          document.body.classList.remove('tour-active');
          setActive(false);
          onClose && onClose();
        }}
        className="fixed top-5 right-5 z-[10000] px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-black text-slate-200 hover:text-white border border-white/15 flex items-center gap-1.5 text-xs font-mono shadow-2xl backdrop-blur-md transition-all animate-fade-in"
      >
        <FastForward className="w-3.5 h-3.5 text-[#e06b5c]" />
        <span>Exit Tour [ESC]</span>
      </button>

      {/* The Animated Virtual iPad / Terracotta Mouse Cursor */}
      <div
        ref={cursorRef}
        className={`tour-cursor ${active ? 'tour-cursor-on' : ''} ${
          isClicking ? 'tour-cursor-click' : ''
        }`}
        aria-hidden="true"
      >
        {/* SVG Terracotta Pointer Arrow (matches sharara.me geometry) */}
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path
            d="M5 2.6 L17.6 13 L11.4 13.7 L14.3 20 L11.7 21.1 L8.9 14.7 L5 18 Z"
            fill="var(--brand-coral)"
            stroke="#202a36"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>

        {/* Speech Bubble Tooltip Caption */}
        <div
          className={`tour-caption ${captionOn ? 'tour-caption-on' : ''}`}
          role="status"
        >
          {caption}
        </div>
      </div>
    </>
  );
}
