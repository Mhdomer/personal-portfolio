import React from 'react';
import { MousePointerClick, ArrowRight } from 'lucide-react';

export default function Hero({ onOpenConsole, onStartTour }) {
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
            <span className="block">MOHAMED</span>
            <span className="block mt-1 sm:mt-2">MAKHLOUF</span>
          </h1>
        </div>

        {/* Editorial Subtitle & Grounded Bio */}
        <div
          className="editorial-hero-copy mt-8 max-w-[480px] text-[15.5px] leading-7 opacity-85"
          style={{ color: 'var(--ink)' }}
        >
          <strong
            className="mono block text-[12px] uppercase tracking-[0.18em]"
            style={{ color: 'var(--brand-coral)' }}
          >
            Cloud DevSecOps & AI Security Engineer
          </strong>
          <span className="mt-4 block font-sans" id="hero-description">
            I build self-healing cloud infrastructure and sub-115ms AI security guardrails on AWS. Senior CS student at <strong style={{ color: 'var(--ink)' }}>Universiti Teknologi Malaysia (UTM)</strong> and running clinical IT operations at <strong style={{ color: 'var(--ink)' }}>Al-Ameen Medical Complex in Riyadh</strong>: turning manual compliance drift and adversarial prompt injections into automated, sub-second security.
          </span>
        </div>

        {/* Action Buttons: Tour CTA, View Projects, and Visible Rubric Hint */}
        <div className="mt-9 flex flex-wrap items-center gap-3">
          {/* 1. Take Me To Tour CTA (with mouse-pointer-click icon) */}
          <button
            type="button"
            onClick={onStartTour || onOpenConsole}
            className="tour-cta button-primary inline-flex items-center gap-2.5 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] rounded-full shadow-md active:scale-95 transition-all hover:scale-105"
            data-testid="button-hero-tour"
          >
            <span>Give me tour !!</span>
            <MousePointerClick className="w-4 h-4 ml-0.5" />
          </button>

          {/* 2. View Projects */}
          <a
            href="#projects"
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

          {/* 3. AWS Security Lab Hint (Hackathon Rubric Invariant) */}
          <button
            type="button"
            onClick={onOpenConsole}
            className="inline-flex items-center gap-2 px-4 py-3 text-[11px] font-mono font-bold tracking-wider uppercase rounded-full border transition-transform hover:scale-105 shadow-sm"
            style={{
              background: 'var(--surface-soft)',
              borderColor: 'var(--line)',
              color: 'var(--brand-coral)',
            }}
            data-testid="button-hero-hint"
          >
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ background: 'var(--brand-coral)' }}
            />
            <span>AWS Security Lab (Hint!)</span>
          </button>
        </div>
      </div>

      {/* Right Column: Framed Portrait of Mohamed Makhlouf (sharara.me clean square frame) */}
      <div className="katana-hero-photo justify-self-center lg:justify-self-end w-full max-w-[340px]">
        <div className="hero-photo-wrap relative shadow-2xl">
          <div className="hero-photo-slot" data-testid="hero-photo-slot">
            <div className="hero-photo-filled">
              <img
                src="/assets/avatar/mohamed-makhlouf-square.jpg"
                alt="Mohamed Makhlouf - portrait"
                width={480}
                height={482}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onError={(e) => {
                  e.currentTarget.src = '/assets/avatar/mohamed-headshot.jpg';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
