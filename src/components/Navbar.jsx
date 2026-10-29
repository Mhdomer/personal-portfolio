import React, { useState } from 'react';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { GithubIcon } from './Icons';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ onOpenConsole, onStartTour }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [katanaSrc, setKatanaSrc] = useState('/assets/decorations/katana-hang.webp');

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
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Mhdomer"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors border"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--line)',
                color: 'var(--ink)',
              }}
              title="GitHub"
              data-testid="link-nav-github"
            >
              <GithubIcon className="w-4 h-4 fill-current" />
            </a>
            <a
              href="https://linkedin.com/in/mhd3omar"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors border text-xs font-bold font-mono"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--line)',
                color: 'var(--ink)',
              }}
              title="LinkedIn"
              data-testid="link-nav-linkedin"
            >
              in
            </a>
            <div className="h-4 w-px mx-1 hidden sm:block" style={{ background: 'var(--line)' }} />
            <a
              href="#"
              className="text-xs font-mono font-bold tracking-wider hover:opacity-80 transition-opacity hidden sm:inline-block"
              style={{ color: 'var(--ink)' }}
            >
              MHDOMAR<span style={{ color: 'var(--brand-coral)' }}>.DEV</span>
            </a>
          </div>

          {/* Center: Clean Monospace Nav Links */}
          <div className="hidden md:flex items-center space-x-8 text-xs font-mono font-medium tracking-wider uppercase opacity-80">
            <a href="#work" className="hover:opacity-100 transition-opacity">
              Work
            </a>
            <a href="#skills" className="hover:opacity-100 transition-opacity">
              Skills
            </a>
            <a href="#experience" className="hover:opacity-100 transition-opacity">
              Experience
            </a>
            <a
              href="#culture"
              className="hover:opacity-100 transition-opacity"
              style={{ color: 'var(--brand-coral)' }}
            >
              Culture & Memes
            </a>
          </div>

          {/* Right: The Visible Hint Creative Feature Button + Theme Toggle + Tour */}
          <div className="hidden sm:flex items-center gap-2.5">
            <ThemeToggle />

            <button
              onClick={onStartTour}
              className="px-3 py-2 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-all border flex items-center gap-1.5 hover:opacity-80 active:scale-95 shadow-sm"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--line)',
                color: 'var(--ink)',
              }}
              title="Launch AWS Hackathon Guided Tour"
            >
              <span>Tour</span>
              <span style={{ color: 'var(--brand-coral)' }}>⚡</span>
            </button>

            <button
              onClick={onOpenConsole}
              className="px-4 py-2 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 group border"
              style={{
                background: 'var(--button-bg)',
                color: 'var(--button-fg)',
                borderColor: 'var(--line)',
              }}
            >
              <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" style={{ color: 'var(--brand-coral)' }} />
              <span>Security Lab</span>
              <span
                className="text-[10px] text-white px-1.5 py-0.5 rounded-full font-sans lowercase"
                style={{ background: 'var(--brand-coral)' }}
              >
                hint!
              </span>
            </button>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />

            <button
              onClick={onOpenConsole}
              className="px-2.5 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1 border"
              style={{
                background: 'var(--button-bg)',
                color: 'var(--button-fg)',
                borderColor: 'var(--line)',
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" style={{ color: 'var(--brand-coral)' }} />
              <span>Lab</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg opacity-80 hover:opacity-100"
              style={{ color: 'var(--ink)' }}
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
      {mobileMenuOpen && (
        <div
          className="sm:hidden px-4 pt-2 pb-4 space-y-2 border-t text-xs font-mono uppercase tracking-wider"
          style={{
            background: 'var(--paper)',
            borderColor: 'var(--line)',
            color: 'var(--ink)',
          }}
        >
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 opacity-80 hover:opacity-100"
          >
            Work & Projects
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 opacity-80 hover:opacity-100"
          >
            Tech Superpowers
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 opacity-80 hover:opacity-100"
          >
            Experience & Credentials
          </a>
          <a
            href="#culture"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2"
            style={{ color: 'var(--brand-coral)' }}
          >
            Dev Culture & Memes
          </a>
        </div>
      )}
    </header>
  );
}
