import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  ExternalLink,
  Copy,
  Check,
  Mail,
  Phone,
  Maximize2,
  Minimize2,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';

export default function AtsResumeModal({ isOpen, onClose }) {
  const [copiedField, setCopiedField] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState('pdf'); // 'pdf' or 'image'

  // Keyboard shortcuts: ESC closes modal, F toggles fullscreen
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsFullscreen(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = (text, fieldName) => {
    navigator?.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const CONTACTS = [
    {
      id: 'email',
      label: 'Email',
      value: 'muhamedomar.g@gmail.com',
      display: 'muhamedomar.g@gmail.com',
      icon: Mail,
    },
    {
      id: 'phone-sa',
      label: 'Saudi Mobile',
      value: '+966533741162',
      display: '+966 53 374 1162',
      icon: Phone,
    },
    {
      id: 'phone-my',
      label: 'Malaysian Mobile',
      value: '+601111383171',
      display: '+60 11-1138 3171',
      icon: Phone,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`relative flex flex-col overflow-hidden border shadow-2xl transition-all duration-200 ${
          isFullscreen
            ? 'fixed inset-0 w-full h-full rounded-none border-0'
            : 'w-full max-w-6xl h-[94vh] rounded-2xl'
        }`}
        style={{
          background: 'var(--surface-sheet)',
          borderColor: 'var(--line-strong)',
          color: 'var(--ink)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div
          className="flex items-center justify-between px-4 sm:px-6 py-3 border-b select-none shrink-0"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--line)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg border"
              style={{
                background: 'var(--surface-soft)',
                borderColor: 'var(--line)',
                color: 'var(--brand-coral)',
              }}
            >
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold font-mono uppercase tracking-tight">
                  Mohamed Makhlouf // Resume
                </h3>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full border opacity-75">
                  1-Page LaTeX PDF
                </span>
              </div>
              <p className="text-[11px] font-mono opacity-70">
                Cloud DevSecOps & AI Security Engineer • Senior CS (UTM) • Al-Ameen IT
              </p>
            </div>
          </div>

          {/* Top Actions: Mode Switch, Fullscreen, Open Raw, Download, Close */}
          <div className="flex items-center gap-2">
            {/* View Mode Switcher */}
            <div
              className="hidden md:flex items-center p-0.5 rounded-lg border text-xs font-mono"
              style={{
                background: 'var(--surface-soft)',
                borderColor: 'var(--line)',
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode('pdf')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
                  viewMode === 'pdf'
                    ? 'font-bold text-white shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  background: viewMode === 'pdf' ? 'var(--brand-coral)' : 'transparent',
                }}
                title="Interactive PDF with clickable hyperlinks"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>PDF (Clickable Links)</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('image')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
                  viewMode === 'image'
                    ? 'font-bold text-white shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  background: viewMode === 'image' ? 'var(--brand-coral)' : 'transparent',
                }}
                title="High-resolution image preview"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Image View</span>
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg border hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              style={{
                borderColor: 'var(--line)',
              }}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Open Raw PDF in New Tab */}
            <a
              href="/assets/resume/Mohamed_Makhlouf_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-mono hover:opacity-80 transition-opacity"
              style={{
                background: 'var(--surface-soft)',
                borderColor: 'var(--line)',
              }}
              title="Open raw PDF in new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5" style={{ color: 'var(--brand-coral)' }} />
              <span>Open in Tab</span>
            </a>

            {/* Download PDF Button */}
            <a
              href="/assets/resume/Mohamed_Makhlouf_Resume.pdf"
              download="Mohamed_Makhlouf_Resume.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-white transition-all shadow-sm active:scale-95"
              style={{ background: 'var(--brand-coral)' }}
              title="Download 1-page PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors ml-1"
              title="Close modal (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Contact Copy Bar */}
        <div
          className="px-4 sm:px-6 py-2 border-b flex flex-wrap items-center gap-2 text-xs font-mono shrink-0 select-none"
          style={{
            background: 'var(--surface-soft)',
            borderColor: 'var(--line)',
          }}
        >
          <span className="text-[10px] uppercase font-bold opacity-60 mr-1">
            Copy Contacts:
          </span>
          {CONTACTS.map((c) => {
            const isCopied = copiedField === c.id;
            const IconComponent = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => copyToClipboard(c.value, c.id)}
                className="px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all active:scale-95 text-[11px]"
                style={{
                  background: 'var(--surface)',
                  borderColor: isCopied ? 'var(--brand-coral)' : 'var(--line)',
                  color: isCopied ? 'var(--brand-coral)' : 'inherit',
                }}
                title={`Click to copy ${c.label}`}
              >
                <IconComponent className="w-3 h-3 opacity-70" />
                <span>{c.display}</span>
                {isCopied ? (
                  <Check className="w-3 h-3 text-emerald-500" />
                ) : (
                  <Copy className="w-3 h-3 opacity-50" />
                )}
              </button>
            );
          })}

          <div className="ml-auto text-[10px] font-mono opacity-60 hidden md:block">
            Links inside the PDF are clickable. Press ESC to close.
          </div>
        </div>

        {/* Document Body Area */}
        <div
          className="flex-1 w-full h-full min-h-0 overflow-hidden relative flex flex-col"
          style={{ background: '#1c1f24' }}
        >
          {viewMode === 'pdf' ? (
            <iframe
              src="/assets/resume/Mohamed_Makhlouf_Resume.pdf#view=Fit"
              className="w-full h-full border-0 flex-1 block"
              title="Mohamed Makhlouf Resume"
            />
          ) : (
            <div className="flex-1 w-full h-full overflow-y-auto p-4 sm:p-6 flex justify-center items-start">
              <div
                className="rounded-xl shadow-2xl border overflow-hidden max-w-3xl w-full"
                style={{ borderColor: 'var(--line-strong)' }}
              >
                <img
                  src="/assets/resume/resume-preview.png"
                  alt="Mohamed Makhlouf Resume"
                  className="w-full h-auto block select-text"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
