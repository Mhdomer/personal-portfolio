import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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

function getDefaultResumeMode() {
  if (typeof window === 'undefined') return 'pdf';
  if (window.innerWidth < 768 || window.matchMedia?.('(pointer: coarse)').matches) {
    return 'image';
  }
  return 'pdf';
}

export default function AtsResumeModal({ isOpen, onClose }) {
  const prefersReducedMotion = useReducedMotion();
  const [copiedField, setCopiedField] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState(getDefaultResumeMode);

  useEffect(() => {
    if (!isOpen) return undefined;

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

  const copyToClipboard = (text, fieldName) => {
    navigator?.clipboard?.writeText?.(text)?.catch(() => {});
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

  const VIEW_OPTIONS = [
    { id: 'pdf', label: 'PDF View', shortLabel: 'PDF', Icon: FileText, title: 'Interactive PDF with clickable hyperlinks' },
    { id: 'image', label: 'Image View', shortLabel: 'Img', Icon: ImageIcon, title: 'High-resolution image preview' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="ats-resume-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.05 : 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Mohamed Makhlouf Resume"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            key="ats-resume-modal-sheet"
            layout={!prefersReducedMotion}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.965, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.975, y: 10, transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] } }
            }
            transition={{ type: 'spring', stiffness: 400, damping: 34, mass: 0.78 }}
            className={`relative flex flex-col overflow-hidden border shadow-2xl ${
              isFullscreen
                ? 'fixed inset-0 w-full h-full rounded-none border-0'
                : 'w-full max-w-6xl h-[92dvh] max-h-[94vh] rounded-2xl'
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
              className="flex items-center justify-between gap-2.5 sm:gap-4 px-3 sm:px-6 py-3 border-b select-none shrink-0"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--line)',
              }}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div
                  className="hidden sm:flex p-2 rounded-lg border shrink-0"
                  style={{
                    background: 'var(--surface-soft)',
                    borderColor: 'var(--line)',
                    color: 'var(--brand-coral)',
                  }}
                >
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-base font-bold font-mono uppercase tracking-tight truncate">
                      Mohamed Makhlouf · Resume
                    </h3>
                    <span className="hidden lg:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full border opacity-75 whitespace-nowrap shrink-0">
                      1-Page LaTeX PDF
                    </span>
                  </div>
                  <p className="hidden sm:block text-[11px] font-mono opacity-70 truncate">
                    Cloud Security & DevSecOps Engineer • Senior CS (UTM) • Al-Ameen IT
                  </p>
                </div>
              </div>

              {/* Top Actions: Mode Switch, Fullscreen, Open Raw, Download, Close */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* View Mode Switcher */}
                <div
                  className="flex items-center p-0.5 rounded-lg border text-[11px] sm:text-xs font-mono shrink-0"
                  style={{
                    background: 'var(--surface-soft)',
                    borderColor: 'var(--line)',
                  }}
                >
                  {VIEW_OPTIONS.map(({ id, label, shortLabel, Icon, title }) => {
                    const isSelected = viewMode === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setViewMode(id)}
                        className={`relative px-2 sm:px-2.5 py-1 sm:py-1.5 rounded flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                          isSelected
                            ? 'font-bold text-white'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                        title={title}
                      >
                        {isSelected && (
                          <motion.span
                            layoutId="resume-modal-view-pill"
                            transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                            className="absolute inset-0 rounded shadow-sm"
                            style={{ background: 'var(--brand-coral)' }}
                          />
                        )}
                        <Icon className="w-3.5 h-3.5 relative z-10 shrink-0" />
                        <span className="relative z-10 hidden md:inline">{label}</span>
                        <span className="relative z-10 md:hidden">{shortLabel}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Fullscreen Toggle */}
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="hidden sm:inline-flex p-1.5 rounded-lg border hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
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
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
                  style={{
                    background: 'var(--surface-soft)',
                    borderColor: 'var(--line)',
                  }}
                  title="Open raw PDF in new browser tab"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--brand-coral)' }} />
                  <span>Open in Tab</span>
                </a>

                {/* Download PDF Button */}
                <a
                  href="/assets/resume/Mohamed_Makhlouf_Resume.pdf"
                  download="Mohamed_Makhlouf_Resume.pdf"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-white transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
                  style={{ background: 'var(--brand-coral)' }}
                  title="Download 1-page PDF"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline">Download PDF</span>
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume modal"
                  className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors ml-0.5 cursor-pointer shrink-0"
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
                    type="button"
                    onClick={() => copyToClipboard(c.value, c.id)}
                    className="px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all active:scale-95 text-[11px] cursor-pointer"
                    style={{
                      background: 'var(--surface)',
                      borderColor: isCopied ? 'var(--brand-coral)' : 'var(--line)',
                      color: isCopied ? 'var(--brand-coral)' : 'inherit',
                    }}
                    title={`Click to copy ${c.label}`}
                  >
                    <IconComponent className="w-3 h-3 opacity-70" />
                    <span>{c.display}</span>
                    <AnimatePresence mode="wait" initial={false}>
                      {isCopied ? (
                        <motion.span
                          key="copied"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.6, opacity: 0 }}
                          transition={{ duration: 0.14 }}
                          className="inline-flex"
                        >
                          <Check className="w-3 h-3 text-emerald-500" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.5 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.14 }}
                          className="inline-flex"
                        >
                          <Copy className="w-3 h-3" />
                        </motion.span>
                      )}
                    </AnimatePresence>
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
              <AnimatePresence mode="wait" initial={false}>
                {viewMode === 'pdf' ? (
                  <motion.div
                    key="resume-pdf-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.16 }}
                    className="flex-1 w-full h-full flex flex-col"
                  >
                    <iframe
                      src="/assets/resume/Mohamed_Makhlouf_Resume.pdf#view=Fit"
                      className="w-full h-full border-0 flex-1 block"
                      title="Mohamed Makhlouf Resume"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="resume-image-view"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 w-full h-full overflow-y-auto p-4 sm:p-6 flex justify-center items-start"
                  >
                    <div
                      className="rounded-xl shadow-2xl border overflow-hidden max-w-3xl w-full"
                      style={{ borderColor: 'var(--line-strong)' }}
                    >
                      <img
                        src="/assets/resume/resume-preview.webp"
                        alt="Mohamed Makhlouf Resume"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/assets/resume/resume-preview.png';
                        }}
                        className="w-full h-auto block select-text"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
