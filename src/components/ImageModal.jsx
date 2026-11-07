import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

export default function ImageModal({ imageSrc, title, isOpen, onClose }) {
  const prefersReducedMotion = useReducedMotion();
  const lastMediaRef = useRef({ src: '', title: '' });

  if (imageSrc) {
    lastMediaRef.current = { src: imageSrc, title: title || 'System Architecture & Evidence' };
  }

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const activeSrc = imageSrc || lastMediaRef.current.src;
  const activeTitle = title || lastMediaRef.current.title || 'System Architecture & Evidence';
  const showModal = Boolean(isOpen && activeSrc);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          key="editorial-image-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.05 : 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={activeTitle}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md select-none"
        >
          <motion.div
            key="editorial-image-modal-sheet"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.965, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.975, y: 8, transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] } }
            }
            transition={{ type: 'spring', stiffness: 400, damping: 34, mass: 0.75 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full border rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            style={{
              background: 'var(--surface-sheet)',
              borderColor: 'var(--line-strong)',
              color: 'var(--ink)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 sm:px-5 py-3 border-b text-xs font-mono shrink-0"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--line)',
              }}
            >
              <div className="flex items-center gap-2.5 font-semibold truncate pr-3">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: 'var(--brand-coral)' }}
                />
                <span className="truncate uppercase tracking-tight">{activeTitle}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-lg border text-[11px] font-mono flex items-center gap-1.5 hover:opacity-85 transition-opacity"
                  style={{
                    background: 'var(--surface-soft)',
                    borderColor: 'var(--line)',
                    color: 'var(--ink)',
                  }}
                >
                  <span>Open Raw</span>
                  <ExternalLink className="w-3 h-3" style={{ color: 'var(--brand-coral)' }} />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close preview modal"
                  className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Media Display (Image or Video) */}
            <div
              className="p-3 sm:p-6 overflow-auto flex-1 flex items-center justify-center"
              style={{ background: 'var(--paper-deep)' }}
            >
              {activeSrc.endsWith('.mp4') ? (
                <video
                  src={activeSrc}
                  autoPlay
                  loop
                  controls
                  playsInline
                  className="max-h-[75vh] w-auto max-w-full rounded-xl border shadow-xl"
                  style={{ borderColor: 'var(--line)' }}
                />
              ) : (
                <img
                  src={activeSrc}
                  alt={activeTitle}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl border shadow-xl bg-white/5"
                  style={{ borderColor: 'var(--line)' }}
                />
              )}
            </div>

            {/* Footer */}
            <div
              className="px-4 sm:px-5 py-2.5 border-t flex items-center justify-between gap-3 text-[11px] font-mono"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--line)',
              }}
            >
              <span className="opacity-70">Click outside or press [ESC] to close</span>
              <span className="font-semibold truncate" style={{ color: 'var(--brand-coral)' }}>
                Mohamed Makhlouf · System Evidence
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
