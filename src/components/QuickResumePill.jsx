import React, { useState, useEffect } from 'react';
import { FileText, ArrowUpRight, Download } from 'lucide-react';

export default function QuickResumePill({ onOpenResume }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal pill once scrolled past hero (200px)
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick Resume Access"
      className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
    >
      <div
        className="rounded-full border shadow-2xl p-1.5 flex items-center gap-1 backdrop-blur-xl transition-all hover:scale-105"
        style={{
          background: 'var(--surface-sheet)',
          borderColor: 'var(--line-strong)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Main Inspect Trigger Button */}
        <button
          type="button"
          onClick={onOpenResume}
          className="flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer group"
          style={{ color: 'var(--ink)' }}
          title="Inspect Mohamed Makhlouf ATS Resume"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <FileText className="w-3.5 h-3.5" style={{ color: 'var(--brand-coral)' }} />
          <span className="tracking-wider uppercase">Resume [PDF]</span>
        </button>

        {/* Vertical Divider */}
        <div className="w-px h-4 opacity-30" style={{ background: 'var(--line)' }} />

        {/* Direct Download Link */}
        <a
          href="/assets/resume/Mohamed_Makhlouf_Resume.pdf"
          target="_blank"
          rel="noreferrer"
          download="Mohamed_Makhlouf_Resume.pdf"
          className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-black/10 dark:hover:bg-white/10"
          style={{ color: 'var(--ink)' }}
          title="Download PDF directly"
        >
          <Download className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
}
