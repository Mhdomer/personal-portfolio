import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, FileText, BookOpen } from 'lucide-react';
import { GithubIcon } from './Icons';
import ThemeToggle from './ThemeToggle';

const NAV_SECTIONS = [
  { id: 'work', label: 'Work', mobileLabel: 'Work & Projects' },
  { id: 'experience', label: 'Experience', mobileLabel: 'Experience & Credentials' },
  { id: 'skills', label: 'Skills', mobileLabel: 'Tech Superpowers' },
];

export default function Navbar({ onStartTour, onOpenResume }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [katanaSrc, setKatanaSrc] = useState('/assets/decorations/katana-hang.webp');
  const [activeSection, setActiveSection] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let rafId = null;

    const updateActiveSection = () => {
      rafId = null;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY < 140) {
        setActiveSection(null);
        return;
      }

      if (vh + scrollY >= docHeight - 48) {
        setActiveSection('skills');
        return;
      }

      const probeY = scrollY + vh * 0.34;
      let matched = null;
      for (const item of NAV_SECTIONS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top + scrollY;
          if (probeY >= top) {
            matched = item.id;
          }
        }
      }
      setActiveSection(matched);
    };

    const onScrollOrResize = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 640) setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [mobileMenuOpen]);

  const handleSectionClick = (e, id) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setMobileMenuOpen(false);
    const headerOffset = window.innerWidth >= 640 ? 80 : 64;
    const targetTop = Math.max(0, el.getBoundingClientRect().top + window.scrollY - headerOffset);
    window.scrollTo({
      top: targetTop,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
    if (window.history?.replaceState) {
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300"
      style={{
        background: 'var(--nav-bg)',
        borderColor: 'var(--line)',
        color: 'var(--ink)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Social Icons & Identity (Ziad Sharara layout) */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/Mhdomer"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors border hover:scale-105 active:scale-95 shadow-sm"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--line)',
                color: 'var(--ink)',
              }}
              title="GitHub Profile (github.com/Mhdomer)"
              data-testid="link-nav-github"
            >
              <GithubIcon className="w-4 h-4 fill-current" />
            </a>

            <a
              href="https://mhdomer.github.io"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors border hover:scale-105 active:scale-95 shadow-sm"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--line)',
                color: 'var(--ink)',
              }}
              title="Technical Blog (mhdomer.github.io)"
              data-testid="link-nav-blog"
            >
              <BookOpen className="w-4 h-4" style={{ color: 'var(--brand-coral)' }} />
            </a>

            <a
              href="https://linkedin.com/in/mhd3omar"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors border text-xs font-bold font-mono hover:scale-105 active:scale-95 shadow-sm"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--line)',
                color: 'var(--ink)',
              }}
              title="LinkedIn Profile"
              data-testid="link-nav-linkedin"
            >
              in
            </a>
            <div className="h-4 w-px mx-1 hidden sm:block" style={{ background: 'var(--line)' }} />
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
              }}
              className="text-xs font-mono font-bold tracking-wider hover:opacity-80 transition-opacity hidden sm:inline-block"
              style={{ color: 'var(--ink)' }}
            >
              MHDOMAR<span style={{ color: 'var(--brand-coral)' }}>.DEV</span>
            </a>
          </div>

          {/* Center: Clean Monospace Nav Links with Live Scroll-Spy Underline */}
          <nav
            aria-label="Primary sections"
            className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-wider uppercase"
          >
            {NAV_SECTIONS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleSectionClick(e, item.id)}
                  className="relative py-1.5 transition-colors hover:opacity-100"
                  style={{
                    color: isActive ? 'var(--brand-coral)' : 'var(--ink)',
                    opacity: isActive ? 1 : 0.75,
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-section"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: 'var(--brand-coral)' }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Theme Toggle + Resume */}
          <div className="hidden sm:flex items-center gap-2.5">
            <ThemeToggle />

            <a
              href="/assets/resume/Mohamed_Makhlouf_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                if (onOpenResume) {
                  e.preventDefault();
                  onOpenResume();
                }
              }}
              className="px-3.5 py-2 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-sm flex items-center gap-1.5 border hover:opacity-90 active:scale-95 cursor-pointer"
              style={{
                background: 'var(--button-bg)',
                color: 'var(--button-fg)',
                borderColor: 'var(--line)',
              }}
              title="Inspect or download ATS Resume PDF"
            >
              <FileText className="w-3.5 h-3.5" style={{ color: 'var(--brand-coral)' }} />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />

            <a
              href="/assets/resume/Mohamed_Makhlouf_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                if (onOpenResume) {
                  e.preventDefault();
                  onOpenResume();
                }
              }}
              className="px-2.5 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1 border cursor-pointer"
              style={{
                background: 'var(--button-bg)',
                color: 'var(--button-fg)',
                borderColor: 'var(--line)',
              }}
            >
              <FileText className="w-3 h-3" style={{ color: 'var(--brand-coral)' }} />
              <span>CV</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg opacity-80 hover:opacity-100"
              style={{ color: 'var(--ink)' }}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Authentic Hanging Katana (from sharara.me)
            Mounted with position: absolute; top: 100% so it hangs down from
            the bottom of the navbar directly into the Hero section! */}
        <div
          className="nav-katana block"
          aria-hidden="true"
          data-testid="nav-katana"
          style={{ color: 'var(--ink)' }}
        >
          <div className="nav-katana-swing">
            <span className="nav-katana-rope" />
            <img
              className="nav-katana-blade"
              src={katanaSrc}
              alt=""
              draggable={false}
              loading="lazy"
              decoding="async"
              onError={() => setKatanaSrc('/assets/decorations/katana-ink.webp')}
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="sm:hidden absolute top-full left-0 right-0 z-30 border-b shadow-lg text-xs font-mono uppercase tracking-wider"
            style={{
              background: 'var(--paper)',
              borderColor: 'var(--line)',
              color: 'var(--ink)',
            }}
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {NAV_SECTIONS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleSectionClick(e, item.id)}
                    className="block py-2 transition-opacity hover:opacity-100"
                    style={{
                      color: isActive ? 'var(--brand-coral)' : 'var(--ink)',
                      opacity: isActive ? 1 : 0.8,
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    {item.mobileLabel}
                  </a>
                );
              })}
              <a
                href="https://mhdomer.github.io"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 py-2 font-bold"
                style={{ color: 'var(--brand-coral)' }}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Technical Blog (mhdomer.github.io)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
