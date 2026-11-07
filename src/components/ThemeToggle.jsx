import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { Sun, Moon } from 'lucide-react';

function readInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const params = new URLSearchParams(window.location.search);
  const queryTheme = params.get('theme');
  if (queryTheme === 'light' || queryTheme === 'dark') return queryTheme;
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyRootTheme(nextTheme) {
  const root = document.documentElement;
  if (nextTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  const meta = document.getElementById('meta-theme-color');
  if (meta) {
    meta.setAttribute('content', nextTheme === 'dark' ? '#151a21' : '#ece4d3');
  }
  localStorage.setItem('theme', nextTheme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(readInitialTheme);
  const isDark = theme === 'dark';

  useEffect(() => {
    applyRootTheme(theme);
  }, []);

  useEffect(() => {
    const onExternalSync = (ev) => {
      if (ev?.detail === 'light' || ev?.detail === 'dark') {
        setTheme(ev.detail);
      }
    };
    window.addEventListener('editorial-theme-change', onExternalSync);
    return () => window.removeEventListener('editorial-theme-change', onExternalSync);
  }, []);

  const toggleTheme = (e) => {
    const nextTheme = isDark ? 'light' : 'dark';
    const commitTheme = () => {
      setTheme(nextTheme);
      applyRootTheme(nextTheme);
      window.dispatchEvent(new CustomEvent('editorial-theme-change', { detail: nextTheme }));
    };

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (
      typeof document === 'undefined' ||
      typeof document.startViewTransition !== 'function' ||
      prefersReducedMotion
    ) {
      commitTheme();
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(rect.left + rect.width / 2);
    const y = Math.round(rect.top + rect.height / 2);
    const endRadius = Math.ceil(
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
    );

    const root = document.documentElement;
    root.classList.add('theme-transitioning');

    try {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          commitTheme();
        });
      });

      transition.ready
        .then(() => {
          root.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 520,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          );
        })
        .catch(() => {});

      transition.finished
        .catch(() => {})
        .finally(() => {
          root.classList.remove('theme-transitioning');
        });
    } catch {
      root.classList.remove('theme-transitioning');
      commitTheme();
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle light or dark theme"
      aria-pressed={isDark}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      data-testid="button-theme-toggle"
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-thumb">
          {isDark ? <Sun size={12} className="text-amber-300" /> : <Moon size={12} className="text-slate-800" />}
        </span>
      </span>
      <span className="theme-toggle-label">{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
