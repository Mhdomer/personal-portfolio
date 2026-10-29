import React, { useState, useEffect, useMemo } from 'react';
import { FastForward, Terminal } from 'lucide-react';

/**
 * Epic Linux Boot & Katana Slice Intro
 * Reproduces the authentic sharara.me physics:
 * 1. Monospace DevSecOps terminal output with animated progress bar
 * 2. Razor-sharp Katana blade sweep with synthesized metallic audio
 * 3. Jagged split along polygon cut line (Panel A falls left, Panel B falls right)
 * 4. 22 geometric debris shards bursting and tumbling with gravity
 */

const SHARD_COUNT = 22;

// Jagged polygon cut lines matching sharara.me geometry
const CLIP_PANEL_A = 'polygon(0 0, 50.8% 0, 51.4% 18%, 50.2% 34%, 51.6% 52%, 50.3% 70%, 51.3% 86%, 50.8% 100%, 0 100%)';
const CLIP_PANEL_B = 'polygon(100% 0, 50% 0, 50.6% 18%, 49.4% 34%, 50.8% 52%, 49.5% 70%, 50.5% 86%, 50% 100%, 100% 100%)';

export default function LinuxBootKatanaIntro({ isOpen, onClose }) {
  // Stages: 'typing' -> 'slashing' -> 'falling' -> 'done'
  const [stage, setStage] = useState('typing');
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(1);

  // Synthesize realistic metallic katana blade draw & whoosh sound
  const playKatanaAudio = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // 1. Blade metallic draw resonance
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(3200, now);
      osc1.frequency.exponentialRampToValueAtTime(1400, now + 0.35);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(4800, now);
      osc2.frequency.exponentialRampToValueAtTime(1900, now + 0.3);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.55);
      osc2.stop(now + 0.55);

      // 2. High-speed whoosh / air displacement
      const bufferSize = ctx.sampleRate * 0.45;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, now);
      filter.frequency.exponentialRampToValueAtTime(2800, now + 0.14);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.4);
      filter.Q.setValueAtTime(4, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, now);
      noiseGain.gain.linearRampToValueAtTime(0.35, now + 0.12);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.45);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  // Keyboard shortcut: ESC or Space skips immediately
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Terminal Typing & Progress sequence
  useEffect(() => {
    if (!isOpen) {
      setStage('typing');
      setProgress(0);
      setVisibleLines(1);
      return;
    }

    if (stage === 'typing') {
      // Progressively reveal command lines
      const lineTimer = setInterval(() => {
        setVisibleLines((prev) => {
          if (prev < 6) return prev + 1;
          clearInterval(lineTimer);
          return prev;
        });
      }, 260);

      // Animate progress bar to 100%
      const progTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progTimer);
            return 100;
          }
          const increment = Math.floor(Math.random() * 12) + 8;
          return Math.min(100, prev + increment);
        });
      }, 120);

      return () => {
        clearInterval(lineTimer);
        clearInterval(progTimer);
      };
    }
  }, [isOpen, stage]);

  // Trigger Katana Slice when Progress Hits 100%
  useEffect(() => {
    if (stage === 'typing' && progress >= 100) {
      const slashTimer = setTimeout(() => {
        playKatanaAudio();
        setStage('slashing');
      }, 350);
      return () => clearTimeout(slashTimer);
    }

    if (stage === 'slashing') {
      const fallTimer = setTimeout(() => {
        setStage('falling');
      }, 180);
      return () => clearTimeout(fallTimer);
    }

    if (stage === 'falling') {
      const doneTimer = setTimeout(() => {
        setStage('done');
        onClose();
      }, 1050);
      return () => clearTimeout(doneTimer);
    }
  }, [progress, stage, onClose]);

  // Deterministic Shards for Falling Debris
  const shards = useMemo(() => {
    return Array.from({ length: SHARD_COUNT }).map((_, idx) => {
      const topPct = 6 + (idx * 4.2);
      const isLeft = idx % 2 === 0;
      const targetX = (isLeft ? -1 : 1) * (40 + (idx * 8));
      const targetY = 220 + (idx * 24);
      const targetRotate = (isLeft ? -1 : 1) * (180 + (idx * 25));
      const sizeW = 8 + (idx % 5) * 2.5;
      const sizeH = 10 + ((idx + 2) % 4) * 3;
      return {
        id: idx,
        topPct,
        targetX,
        targetY,
        targetRotate,
        sizeW,
        sizeH,
      };
    });
  }, []);

  if (!isOpen || stage === 'done') return null;

  // Reusable Full Terminal Content (rendered identically in both Panel A and Panel B)
  const renderTerminalContent = () => (
    <div className="absolute inset-0 bg-[#080b10] text-[#9aa39d] p-6 sm:p-12 md:p-16 flex flex-col justify-between font-mono select-none overflow-hidden">
      {/* Background Subtle CRT Scanlines & Vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 3px)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(140% 120% at 50% 45%, transparent 55%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-200 font-semibold tracking-wider uppercase text-[11px]">
            mhdomar · devsecops_portfolio
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-500 font-mono">
          <span>x86_64 · cachyos 6.13</span>
          <span>//</span>
          <span>dual-boot uefi (ntfs /mnt/data)</span>
        </div>
      </div>

      {/* Main Terminal Lines */}
      <div className="relative z-10 max-w-3xl my-auto space-y-4 text-xs sm:text-[13.5px] leading-relaxed">
        <div className="text-slate-500 text-[11px]">
          + mhdomar@cachyos · x86_64 · utf-8 · tz asia/riyadh
        </div>

        {/* Command 1 */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold">
            <span className="text-emerald-400">mhdomar@cachyos:~/portfolio $</span>
            <span className="text-slate-100">boot --portfolio</span>
          </div>
        </div>

        {/* Command 2: Whoami */}
        {visibleLines >= 2 && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold">
              <span className="text-emerald-400">mhdomar@cachyos:~$</span>
              <span className="text-slate-100">whoami</span>
            </div>
            <div className="pl-4 text-slate-300 border-l-2 border-emerald-500/40 text-xs">
              ✓ mohamed-makhlouf · cloud devsecops & ai security engineer
            </div>
          </div>
        )}

        {/* Command 3: Purpose */}
        {visibleLines >= 3 && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold">
              <span className="text-emerald-400">mhdomar@cachyos:~$</span>
              <span className="text-slate-100">cat /etc/purpose</span>
            </div>
            <div className="pl-4 text-slate-300 border-l-2 border-emerald-500/40 text-xs">
              · turning manual compliance drift into sub-second automated cloud security
            </div>
          </div>
        )}

        {/* Command 4: Pytest */}
        {visibleLines >= 4 && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold">
              <span className="text-emerald-400">mhdomar@cachyos:~$</span>
              <span className="text-slate-100">pytest tests/ -q</span>
            </div>
            <div className="pl-4 text-emerald-300 border-l-2 border-emerald-500/40 text-xs">
              ✓ 6/6 passed · aegis-2b guardrails · 115ms p99 latency
            </div>
          </div>
        )}

        {/* Command 5: EventBridge & Bedrock */}
        {visibleLines >= 5 && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold">
              <span className="text-emerald-400">mhdomar@cachyos:~$</span>
              <span className="text-slate-100">aws eventbridge list-rules</span>
            </div>
            <div className="pl-4 text-slate-300 border-l-2 border-emerald-500/40 text-xs">
              ✓ a2-compliance-bus · active · mttr &lt; 2.4s
            </div>
          </div>
        )}

        {/* Command 6: Unsheath Katana Blade */}
        {visibleLines >= 6 && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold">
              <span className="text-emerald-400">mhdomar@cachyos:~$</span>
              <span className="text-slate-100">./unsheath_blade.sh</span>
            </div>
            <div className="pl-4 text-[#e06b5c] font-bold border-l-2 border-[#e06b5c]/60 text-xs animate-pulse">
              ✓ perimeter hardened · unsheathing cyber katana...
            </div>
          </div>
        )}

        {/* Progress Bar & Status */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>assembling security experience</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-48 sm:w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-[#e06b5c] transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[#e06b5c] font-bold font-mono min-w-[40px] text-right">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 text-[10px] text-slate-500">
        <span>© MOHAMED MAKHLOUF · UTM & AL-AMEEN IT</span>
        <span>zsh 5.9 · 80x24 · cachyos-linux · main*</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none bg-black">
      {/* Top Right Skip Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-all text-xs font-mono shadow-xl backdrop-blur-md"
      >
        <FastForward className="w-3.5 h-3.5 text-[#e06b5c]" />
        <span>Skip [ESC]</span>
      </button>

      {/* -------------------------------------------------------------
          PANEL A: LEFT HALF (Cut along jagged polygon, falls down-left)
          ------------------------------------------------------------- */}
      <div
        className="intro-panel intro-panel-a absolute inset-0 z-20 pointer-events-none"
        style={{
          clipPath: CLIP_PANEL_A,
          transform:
            stage === 'falling'
              ? 'translate(-38vw, 65vh) rotate(-11deg)'
              : stage === 'slashing'
              ? 'translate(-6px, 4px) rotate(-0.5deg)'
              : 'translate(0, 0)',
          opacity: stage === 'falling' ? 0 : 1,
          transition:
            stage === 'falling'
              ? 'transform 920ms cubic-bezier(0.55, 0, 1, 0.45), opacity 850ms ease-in'
              : stage === 'slashing'
              ? 'transform 120ms ease-out'
              : 'none',
          willChange: 'transform, opacity',
        }}
      >
        {renderTerminalContent()}
      </div>

      {/* -------------------------------------------------------------
          PANEL B: RIGHT HALF (Cut along jagged polygon, falls down-right)
          ------------------------------------------------------------- */}
      <div
        className="intro-panel intro-panel-b absolute inset-0 z-10 pointer-events-none"
        style={{
          clipPath: CLIP_PANEL_B,
          transform:
            stage === 'falling'
              ? 'translate(38vw, 75vh) rotate(11deg)'
              : stage === 'slashing'
              ? 'translate(6px, 4px) rotate(0.5deg)'
              : 'translate(0, 0)',
          opacity: stage === 'falling' ? 0 : 1,
          transition:
            stage === 'falling'
              ? 'transform 960ms cubic-bezier(0.55, 0, 1, 0.45), opacity 880ms ease-in'
              : stage === 'slashing'
              ? 'transform 120ms ease-out'
              : 'none',
          willChange: 'transform, opacity',
        }}
      >
        {renderTerminalContent()}
      </div>

      {/* -------------------------------------------------------------
          22 GEOMETRIC DEBRIS SHARDS (sharara.me exact falling polygons)
          ------------------------------------------------------------- */}
      {(stage === 'slashing' || stage === 'falling') && (
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
          {shards.map((shard) => (
            <div
              key={shard.id}
              className="absolute bg-gradient-to-br from-[#2a3240] to-[#0c0e12] border border-white/20 shadow-lg"
              style={{
                left: '50%',
                top: `${shard.topPct}%`,
                width: `${shard.sizeW}px`,
                height: `${shard.sizeH}px`,
                clipPath: 'polygon(50% 0, 100% 55%, 62% 100%, 0 72%)',
                transform:
                  stage === 'falling'
                    ? `translate(${shard.targetX}px, ${shard.targetY}px) rotate(${shard.targetRotate}deg)`
                    : 'translate(0, 0) scale(1)',
                opacity: stage === 'falling' ? 0 : 0.95,
                transition: `transform ${750 + shard.id * 18}ms cubic-bezier(0.55, 0, 1, 0.45), opacity ${700 + shard.id * 15}ms ease-in`,
              }}
            />
          ))}
        </div>
      )}

      {/* -------------------------------------------------------------
          THE KATANA BLADE SLASH & LUMINESCENT STREAK
          ------------------------------------------------------------- */}
      {(stage === 'slashing' || stage === 'falling') && (
        <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
          {/* Katana Blade Sweeping Across Center Slice Line */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{
              opacity: stage === 'falling' ? 0 : 1,
            }}
          >
            <img
              src="/assets/decorations/katana-ink.webp"
              alt="Katana Blade"
              className="w-[520px] sm:w-[740px] h-auto object-contain drop-shadow-[0_0_50px_rgba(224,107,92,1)]"
              style={{
                transform: 'rotate(-24deg) translateY(-20px)',
                filter: 'invert(91%) sepia(9%) saturate(416%) hue-rotate(352deg) brightness(110%)',
              }}
            />
          </div>

          {/* Electric Slash Line cutting straight down the screen */}
          <div
            className="absolute w-[4px] bg-gradient-to-b from-transparent via-white via-[#e06b5c] to-transparent shadow-[0_0_35px_12px_rgba(224,107,92,0.9),0_0_15px_4px_rgba(255,255,255,1)]"
            style={{
              left: '50.5%',
              top: '-10%',
              bottom: '-10%',
              transform: 'translateX(-50%)',
              opacity: stage === 'falling' ? 0 : 1,
              transition: 'opacity 300ms ease-out',
            }}
          />

          {/* Central Flash of Impact */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/40 blur-3xl pointer-events-none transition-opacity duration-300"
            style={{
              opacity: stage === 'falling' ? 0 : 0.8,
            }}
          />
        </div>
      )}
    </div>
  );
}
