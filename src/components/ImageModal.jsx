import React, { useEffect } from 'react';
import { X, ExternalLink, Download } from 'lucide-react';

export default function ImageModal({ imageSrc, title, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !imageSrc) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-charcoal-950/85 backdrop-blur-md select-none animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full bg-charcoal-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-charcoal-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-white font-semibold truncate">
            <span className="w-2 h-2 rounded-full bg-cyber-emerald"></span>
            <span className="truncate">{title || 'Program Evidence Screenshot'}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={imageSrc}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Open Raw</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Display */}
        <div className="p-4 sm:p-6 overflow-auto flex-1 flex items-center justify-center bg-charcoal-950/60">
          <img
            src={imageSrc}
            alt={title || 'Screenshot'}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg border border-white/5 shadow-lg"
          />
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-charcoal-800 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Click anywhere outside or press [ESC] to close</span>
          <span className="text-cyber-cyan">Mohamed Makhlouf (Mhdomar) Portfolio Evidence</span>
        </div>
      </div>
    </div>
  );
}
