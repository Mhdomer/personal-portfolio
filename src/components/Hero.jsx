import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MousePointerClick, ArrowRight } from 'lucide-react';

const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

export default function Hero({ onStartTour, isReady = true }) {
  const prefersReducedMotion = useReducedMotion();
  const visible = isReady || prefersReducedMotion;

  return (
    <section
      id="top"
      className="section-anchor max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 editorial-hero katana-hero grid min-h-[calc(100dvh-72px)] items-center gap-12 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
      style={{ color: 'var(--ink)' }}
    >
      {/* Left Column: Typographic Editorial Layout (sharara.me clean layout) */}
      <div className="katana-hero-content">
        {/* Display Name with Subtle Terracotta Sun Aura */}
        <div className="hero-copy display max-w-[900px]">
          <h1 className="m-0 font-bold text-[var(--ink)]">
            <span className="block overflow-hidden pb-1 -mb-1">
              <motion.span
                className="block"
                initial={prefersReducedMotion ? false : { y: '108%' }}
                animate={visible ? { y: '0%' } : { y: '108%' }}
                transition={{ duration: 0.6, delay: 0.04, ease: EDITORIAL_EASE }}
              >
                MOHAMED
              </motion.span>
            </span>
            <span className="block overflow-hidden mt-1 sm:mt-2 pb-1 -mb-1">
              <motion.span
                className="block"
                initial={prefersReducedMotion ? false : { y: '108%' }}
                animate={visible ? { y: '0%' } : { y: '108%' }}
                transition={{ duration: 0.6, delay: 0.12, ease: EDITORIAL_EASE }}
              >
                MAKHLOUF
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Editorial Subtitle & Grounded Bio */}
        <div
          className="editorial-hero-copy mt-8 max-w-[480px] text-[15.5px] leading-7 opacity-85"
          style={{ color: 'var(--ink)' }}
        >
          <motion.strong
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EDITORIAL_EASE }}
            className="mono block text-[12px] uppercase tracking-[0.18em]"
            style={{ color: 'var(--brand-coral)' }}
          >
            Cloud Security & DevSecOps Engineer
          </motion.strong>
          <motion.span
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.52, delay: 0.27, ease: EDITORIAL_EASE }}
            className="mt-4 block font-sans"
            id="hero-description"
          >
            Final-year Computer Science student at <strong style={{ color: 'var(--ink)' }}>Universiti Teknologi Malaysia (UTM)</strong> specializing in Networks and Security, running clinical IT operations at <strong style={{ color: 'var(--ink)' }}>Al-Ameen Medical Complex in Riyadh</strong>. I help engineering teams ship secure AWS workloads faster by automating IAM least privilege, catching CVEs inside CI/CD gates, and cutting cloud incident remediation time to sub-8s.
          </motion.span>
        </div>

        {/* Action Buttons: Tour CTA, View Projects, and Resume PDF */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.52, delay: 0.34, ease: EDITORIAL_EASE }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          {/* 1. Interactive Tour CTA with zooming red back glow (sharara.me exact aesthetic) */}
          <div className="tour-cta-wrapper relative inline-flex items-center justify-center">
            {/* Animated Red Back Glow Layer (zooms out and in behind the card) */}
            <span className="tour-cta-backglow" aria-hidden="true" />

            <button
              type="button"
              onClick={onStartTour}
              className="tour-cta tour-cta-sharara group relative z-10 inline-flex items-center gap-2.5 px-6 py-3.5 text-[12px] font-mono font-bold uppercase tracking-[0.16em] cursor-pointer"
              data-testid="button-hero-tour"
            >
              <span className="relative z-10 font-bold text-[#151a21]">GIVE ME TOUR !!</span>
              <span className="animate-mouse-bob relative z-10 text-[#151a21]">
                <MousePointerClick className="w-4 h-4" />
              </span>
              {/* Interactive light sheen on hover */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            </button>
          </div>

          {/* 2. View Projects */}
          <a
            href="#work"
            onClick={(e) => {
              const workEl = document.getElementById('work');
              if (!workEl) return;
              e.preventDefault();
              workEl.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
            }}
            className="inline-flex items-center gap-2 px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] rounded-full border transition-all hover:scale-105 shadow-sm"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--line-strong)',
              color: 'var(--ink)',
            }}
            data-testid="button-hero-projects"
          >
            <span>View Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* 3. Resume PDF */}
          <a
            href="/assets/resume/Mohamed_Makhlouf_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 text-[12px] font-mono font-bold uppercase tracking-[0.16em] rounded-full border transition-all hover:scale-105 shadow-sm"
            style={{
              background: 'var(--surface-soft)',
              borderColor: 'var(--line)',
              color: 'var(--brand-coral)',
            }}
            data-testid="button-hero-resume"
          >
            <span>Resume [PDF]</span>
          </a>
        </motion.div>
      </div>

      {/* Right Column: Framed Portrait of Mohamed Makhlouf (sharara.me clean square frame) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.985 }}
        animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.985 }}
        transition={{ duration: 0.64, delay: 0.16, ease: EDITORIAL_EASE }}
        className="katana-hero-photo justify-self-center lg:justify-self-end w-full max-w-[340px]"
      >
        <div className="hero-photo-wrap relative shadow-2xl">
          <div className="hero-photo-slot" data-testid="hero-photo-slot">
            <div className="hero-photo-filled">
              <picture>
                <source srcSet="/assets/avatar/mohamed-makhlouf-square.webp" type="image/webp" />
                <img
                  src="/assets/avatar/mohamed-makhlouf-square.jpg"
                  alt="Mohamed Makhlouf - portrait"
                  width={480}
                  height={480}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/avatar/mohamed-headshot.jpg';
                  }}
                />
              </picture>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
