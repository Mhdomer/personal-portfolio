import React from 'react';
import { ExternalLink, ShieldCheck, Shield } from 'lucide-react';

export default function Footer({ onOpenConsole }) {
  return (
    <footer
      className="border-t py-16 relative z-20 transition-colors duration-300"
      style={{
        background: 'var(--surface-sheet)',
        borderColor: 'var(--line)',
        color: 'var(--ink)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Column 1: Identity & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg border flex items-center justify-center"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--line)',
                  color: 'var(--brand-coral)',
                }}
              >
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold font-mono text-base">
                MHDOMAR<span style={{ color: 'var(--brand-coral)' }}>.DEV</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm opacity-75">
              Mohamed Makhlouf. Senior Computer Science student at Universiti Teknologi Malaysia (UTM) undergoing Industrial Training at Al-Ameen Medical Complex IT Dept, Riyadh. Dedicated to Cloud DevSecOps, AI Security, shift-left gating, and peer mentorship.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenConsole}
                className="text-xs font-mono underline underline-offset-4 flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                style={{ color: 'var(--brand-coral)' }}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Launch Interactive Security Sandbox</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider opacity-60">Sections</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#work" className="hover:opacity-100 transition-opacity text-xs font-mono">
                  Work & Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:opacity-100 transition-opacity text-xs font-mono">
                  Tech Superpowers
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:opacity-100 transition-opacity text-xs font-mono">
                  Experience & Resume
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Mhdomer/aegis-2b"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-mono"
                  style={{ color: 'var(--brand-coral)' }}
                >
                  <span>Aegis-2B Guardrail Repo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Communication & Inquiries */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider opacity-60">Connect & Inquiries</h4>
            <div className="space-y-2 text-xs font-mono">
              <div>
                <span className="opacity-60">Work Email: </span>
                <a
                  href="mailto:muhamedomar.g@gmail.com"
                  className="hover:underline"
                  style={{ color: 'var(--brand-coral)' }}
                >
                  muhamedomar.g@gmail.com
                </a>
              </div>
              <div>
                <span className="opacity-60">UTM Academic: </span>
                <a
                  href="mailto:omarmohamed.m@graduate.utm.my"
                  className="hover:underline"
                  style={{ color: 'var(--brand-coral)' }}
                >
                  omarmohamed.m@graduate.utm.my
                </a>
              </div>
              <div>
                <span className="opacity-60">LinkedIn: </span>
                <a
                  href="https://linkedin.com/in/mhd3omar"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                  style={{ color: 'var(--brand-coral)' }}
                >
                  linkedin.com/in/mhd3omar
                </a>
              </div>
              <div>
                <span className="opacity-60">YouTube: </span>
                <a
                  href="https://www.youtube.com/@omardocuments"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                  style={{ color: 'var(--brand-coral)' }}
                >
                  Omar Documents (@omardocuments)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Rubric Badge */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono opacity-70"
          style={{ borderColor: 'var(--line)' }}
        >
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Mohamed Makhlouf (Mhdomar)</span>
            <span>•</span>
            <span style={{ color: 'var(--brand-coral)' }}>AWS Student Builder Challenge</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Mhdomer/tech-superpower-portfolio"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-100 transition-opacity flex items-center gap-1"
            >
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <span>Hosted on AWS Amplify</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
