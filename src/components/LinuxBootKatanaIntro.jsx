import React, { useState, useEffect, useMemo } from 'react';
import { FastForward } from 'lucide-react';

/**
 * Epic Linux Boot & Pixel-Art Katana Unsheath Intro
 * 1. Monospace DevSecOps terminal output with animated progress bar
 * 2. Sheathed two-piece pixel-art katana + black saya ready stance on ./unsheath_blade.sh
 * 3. Throat-occluded metallic blade draw out of the crimson koiguchi mouth
 * 4. Center katana sweep + jagged polygon split (Panel A left, Panel B right) + 22 debris shards
 */

const SHARD_COUNT = 22;

// Jagged polygon cut lines matching sharara.me geometry
const CLIP_PANEL_A =
  'polygon(0 0, 50.8% 0, 51.4% 18%, 50.2% 34%, 51.6% 52%, 50.3% 70%, 51.3% 86%, 50.8% 100%, 0 100%)';
const CLIP_PANEL_B =
  'polygon(100% 0, 50% 0, 50.6% 18%, 49.4% 34%, 50.8% 52%, 49.5% 70%, 50.5% 86%, 50% 100%, 100% 100%)';

// Plane tucked 3.5% inside the opaque black saya collar (z-20) so zero throat gap appears during draw
const KOIGUCHI_OCCLUSION_CLIP =
  'polygon(18% -55%, 165% -55%, 165% 86%, 70% 32%, 63.5% 25.5%)';

export default function LinuxBootKatanaIntro({ isOpen, onClose }) {
  // Stages: 'typing' -> 'unsheathing' -> 'slashing' -> 'falling' -> 'done'
  const [stage, setStage] = useState('typing');
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(1);

  // Preload both pixel-art katana sprites immediately on mount so zero network decode lag occurs
  useEffect(() => {
    ['/assets/decorations/katana-pixel-blade.png', '/assets/decorations/katana-pixel-saya.png'].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Synthesize realistic metallic katana blade draw & slash whoosh sound
  const playKatanaAudio = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // 1. Metallic koiguchi blade draw ring
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(3200, now);
      osc1.frequency.exponentialRampToValueAtTime(1400, now + 0.42);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(4800, now);
      osc2.frequency.exponentialRampToValueAtTime(1900, now + 0.36);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.26, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.58);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.6);
      osc2.stop(now + 0.6);

      // 2. Delayed high-speed slash air displacement (+0.32s when blade sweeps center)
      const slashTime = now + 0.32;
      const bufferSize = Math.floor(ctx.sampleRate * 0.42);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(480, slashTime);
      filter.frequency.exponentialRampToValueAtTime(2900, slashTime + 0.12);
      filter.frequency.exponentialRampToValueAtTime(320, slashTime + 0.38);
      filter.Q.setValueAtTime(4, slashTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, slashTime);
      noiseGain.gain.linearRampToValueAtTime(0.35, slashTime + 0.1);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, slashTime + 0.4);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(slashTime);
      noise.stop(slashTime + 0.42);
      window.setTimeout(() => {
        ctx.close?.()?.catch(() => {});
      }, 950);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  // Keyboard shortcut: ESC or Space skips immediately only while boot intro is open
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Terminal Typing & Progress sequence
  useEffect(() => {
    if (!isOpen) {
      setStage('typing');
      setProgress(0);
      setVisibleLines(1);
      return undefined;
    }

    if (stage === 'typing') {
      const lineTimer = setInterval(() => {
        setVisibleLines((prev) => {
          if (prev < 6) return prev + 1;
          clearInterval(lineTimer);
          return prev;
        });
      }, 250);

      const progTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progTimer);
            return 100;
          }
          const increment = Math.floor(Math.random() * 12) + 8;
          return Math.min(100, prev + increment);
        });
      }, 115);

      return () => {
        clearInterval(lineTimer);
        clearInterval(progTimer);
      };
    }

    return undefined;
  }, [isOpen, stage]);

  // Orchestrate Unsheath -> Center Slash -> Panel Split
  useEffect(() => {
    if (stage === 'typing' && progress >= 100 && visibleLines >= 6) {
      const drawTimer = setTimeout(() => {
        playKatanaAudio();
        setStage('unsheathing');
      }, 240);
      return () => clearTimeout(drawTimer);
    }

    if (stage === 'unsheathing') {
      const slashTimer = setTimeout(() => {
        setStage('slashing');
      }, 380);
      return () => clearTimeout(slashTimer);
    }

    if (stage === 'slashing') {
      const fallTimer = setTimeout(() => {
        setStage('falling');
      }, 270);
      return () => clearTimeout(fallTimer);
    }

    if (stage === 'falling') {
      const doneTimer = setTimeout(() => {
        setStage('done');
        onClose();
      }, 1020);
      return () => clearTimeout(doneTimer);
    }

    return undefined;
  }, [progress, visibleLines, stage, onClose]);

  // Deterministic Shards for Falling Debris
  const shards = useMemo(() => {
    return Array.from({ length: SHARD_COUNT }).map((_, idx) => {
      const topPct = 6 + idx * 4.2;
      const isLeft = idx % 2 === 0;
      const targetX = (isLeft ? -1 : 1) * (40 + idx * 8);
      const targetY = 220 + idx * 24;
      const targetRotate = (isLeft ? -1 : 1) * (180 + idx * 25);
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

  const showKatanaRig = visibleLines >= 5 || stage !== 'typing';
  const isUnsheathing = stage === 'unsheathing';
  const isSlashing = stage === 'slashing';
  const isFalling = stage === 'falling';

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
          <span>·</span>
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
            <div className="pl-4 text-[#f472b6] font-bold border-l-2 border-[#f472b6]/60 text-xs animate-pulse">
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
                className="h-full bg-gradient-to-r from-emerald-500 via-[#e06b5c] to-[#f472b6] transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[#f472b6] font-bold font-mono min-w-[40px] text-right">
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
    <div
      className={`fixed inset-0 z-50 overflow-hidden select-none ${
        isFalling ? 'bg-transparent pointer-events-none' : 'bg-[#080b10]'
      }`}
    >
      {/* Top Right Skip Button */}
      <button
        type="button"
        onClick={onClose}
        className={`absolute top-5 right-5 z-50 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-all text-xs font-mono shadow-xl backdrop-blur-md cursor-pointer ${
          isFalling ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <FastForward className="w-3.5 h-3.5 text-[#f472b6]" />
        <span>Skip [ESC]</span>
      </button>

      {/* PANEL A: LEFT HALF (Cut along jagged polygon, falls down-left) */}
      <div
        className="intro-panel intro-panel-a absolute inset-0 z-20 pointer-events-none"
        style={{
          clipPath: CLIP_PANEL_A,
          transform: isFalling
            ? 'translate(-38vw, 65vh) rotate(-11deg)'
            : isSlashing
            ? 'translate(-6px, 4px) rotate(-0.5deg)'
            : 'translate(0, 0)',
          opacity: isFalling ? 0 : 1,
          transition: isFalling
            ? 'transform 920ms cubic-bezier(0.55, 0, 1, 0.45), opacity 850ms ease-in'
            : isSlashing
            ? 'transform 120ms ease-out'
            : 'none',
          willChange: 'transform, opacity',
        }}
      >
        {renderTerminalContent()}
      </div>

      {/* PANEL B: RIGHT HALF (Cut along jagged polygon, falls down-right) */}
      <div
        className="intro-panel intro-panel-b absolute inset-0 z-10 pointer-events-none"
        style={{
          clipPath: CLIP_PANEL_B,
          transform: isFalling
            ? 'translate(38vw, 75vh) rotate(11deg)'
            : isSlashing
            ? 'translate(6px, 4px) rotate(0.5deg)'
            : 'translate(0, 0)',
          opacity: isFalling ? 0 : 1,
          transition: isFalling
            ? 'transform 960ms cubic-bezier(0.55, 0, 1, 0.45), opacity 880ms ease-in'
            : isSlashing
            ? 'transform 120ms ease-out'
            : 'none',
          willChange: 'transform, opacity',
        }}
      >
        {renderTerminalContent()}
      </div>

      {/* 22 GEOMETRIC DEBRIS SHARDS */}
      {(isSlashing || isFalling) && (
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
                transform: isFalling
                  ? `translate(${shard.targetX}px, ${shard.targetY}px) rotate(${shard.targetRotate}deg)`
                  : 'translate(0, 0) scale(1)',
                opacity: isFalling ? 0 : 0.95,
                transition: `transform ${750 + shard.id * 18}ms cubic-bezier(0.55, 0, 1, 0.45), opacity ${700 + shard.id * 15}ms ease-in`,
              }}
            />
          ))}
        </div>
      )}

      {/* TWO-PIECE PIXEL-ART KATANA + BLACK SCABBARD (SAYA) RIG */}
      <div
        aria-hidden="true"
        data-testid="boot-katana-rig"
        data-stage={stage}
        className="absolute inset-0 z-40 pointer-events-none overflow-hidden flex items-center justify-center"
      >
        {/* Shared Coordinate Rig (620:740 aspect ratio) */}
        <div
          className="relative w-[300px] sm:w-[400px] md:w-[450px] aspect-[620/740]"
          style={{
            opacity: !showKatanaRig ? 0 : isFalling ? 0 : 1,
            transform: !showKatanaRig
              ? 'translate(10vw, 6vh) scale(0.94)'
              : isUnsheathing
              ? 'translate(4.5vw, 4.5vh) scale(1)'
              : isSlashing
              ? 'translate(0vw, 0vh) scale(1.06)'
              : isFalling
              ? 'translate(-5vw, 9vh) scale(1.04)'
              : 'translate(7vw, 3vh) scale(0.98)',
            transition: isFalling
              ? 'transform 420ms ease-out, opacity 300ms ease-out'
              : 'transform 340ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease-out',
            willChange: 'transform, opacity',
          }}
        >
          {/* Blade Layer: clipped at the koiguchi throat plane until fully drawn in 'slashing' */}
          <div
            className="absolute inset-0 z-10"
            style={{
              clipPath: isSlashing || isFalling ? 'none' : KOIGUCHI_OCCLUSION_CLIP,
            }}
          >
            <img
              src="/assets/decorations/katana-pixel-blade.png"
              alt=""
              draggable={false}
              className="w-full h-full object-contain pixel-crisp"
              style={{
                transform: isFalling
                  ? 'translate(-12%, 22%) rotate(-32deg)'
                  : isSlashing
                  ? 'translate(-4%, 4%) rotate(-26deg)'
                  : isUnsheathing
                  ? 'translate(36%, -40%) rotate(1.5deg)'
                  : 'translate(0%, 0%) rotate(0deg)',
                filter:
                  isSlashing || isUnsheathing
                    ? 'drop-shadow(0 0 26px rgba(244, 114, 182, 0.78)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.55))'
                    : 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.65))',
                transition: isSlashing
                  ? 'transform 240ms cubic-bezier(0.16, 1, 0.3, 1), filter 200ms ease-out'
                  : isUnsheathing
                  ? 'transform 360ms cubic-bezier(0.2, 0.9, 0.28, 1), filter 220ms ease-out'
                  : 'transform 320ms ease-out',
                willChange: 'transform',
              }}
            />
          </div>

          {/* Black Scabbard (Saya) Layer: stays locked to koiguchi clip plane during draw, drops away on slash */}
          <img
            src="/assets/decorations/katana-pixel-saya.png"
            alt=""
            draggable={false}
            className="absolute inset-0 z-20 w-full h-full object-contain pixel-crisp"
            style={{
              opacity: isSlashing || isFalling ? 0 : 1,
              transform:
                isSlashing || isFalling
                  ? 'translate(-28%, 32%) rotate(-10deg)'
                  : 'translate(0%, 0%) rotate(0deg)',
              filter: 'drop-shadow(0 10px 24px rgba(0, 0, 0, 0.8))',
              transition:
                isSlashing || isFalling
                  ? 'transform 260ms ease-in, opacity 200ms ease-out'
                  : 'transform 340ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease-out',
              willChange: 'transform, opacity',
            }}
          />

          {/* Metallic Koiguchi Spark right at the scabbard throat (70%, 25%) during draw */}
          <div
            className="absolute z-30 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              left: '70%',
              top: '25%',
              background:
                'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(244,114,182,0.75) 38%, rgba(224,107,92,0) 72%)',
              opacity: isUnsheathing ? 1 : showKatanaRig && stage === 'typing' ? 0.35 : 0,
              transform: isUnsheathing
                ? 'translate(-50%, -50%) scale(1.35)'
                : 'translate(-50%, -50%) scale(0.55)',
              transition: 'opacity 180ms ease-out, transform 260ms ease-out',
            }}
          />
        </div>

        {/* Subtle Impact Flash on Cleave */}
        {(isSlashing || isFalling) && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/20 blur-3xl pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isFalling ? 0 : 0.7,
            }}
          />
        )}
      </div>
    </div>
  );
}
