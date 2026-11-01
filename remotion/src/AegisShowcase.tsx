import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Img,
} from 'remotion';

export const AegisShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // -------------------------------------------------------------
  // FULL-BLEED REAL SYSTEM SHOWCASE (480 frames = 16 seconds @ 30fps)
  // Zero mock terminals. 100% verified web dashboard, telemetry, & architecture.
  // Act 1: 0 - 165   (0.0s - 5.5s) -> Live Web Dashboard (GuardDuty triage, risk scores, git diff)
  // Act 2: 155 - 330 (5.2s - 11.0s)-> Empirical Benchmark Telemetry (uv run aegis_demo.py)
  // Act 3: 320 - 480 (10.7s - 16.0s)-> Production AWS Cloud Architecture (Bedrock, Decider 2B)
  // -------------------------------------------------------------

  const masterOpacity = interpolate(frame, [0, 8, 470, 480], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#090d14',
        position: 'relative',
        overflow: 'hidden',
        opacity: masterOpacity,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Edge-to-Edge Browser Navigation Chrome */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '46px',
          backgroundColor: '#121824',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          zIndex: 40,
        }}
      >
        {/* macOS Window Controls */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
            }}
          />
          <span
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#eab308',
            }}
          />
          <span
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
            }}
          />
        </div>

        {/* Dynamic Address Bar URL */}
        <div
          style={{
            backgroundColor: '#0a0e17',
            padding: '5px 28px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#94a3b8',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '12.5px',
            letterSpacing: '0.02em',
          }}
        >
          {frame < 160
            ? 'https://aegis.defense.internal/dashboard'
            : frame < 325
            ? 'https://aegis.defense.internal/benchmarks/telemetry'
            : 'https://aegis.defense.internal/architecture/aws-topology'}
        </div>

        {/* Dynamic Status Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 700,
            fontFamily: '"JetBrains Mono", monospace',
            backgroundColor:
              frame < 160
                ? 'rgba(34, 197, 94, 0.15)'
                : frame < 325
                ? 'rgba(56, 189, 248, 0.15)'
                : 'rgba(244, 114, 182, 0.15)',
            color:
              frame < 160
                ? '#4ade80'
                : frame < 325
                ? '#38bdf8'
                : '#f472b6',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          {frame < 160
            ? 'FAIL-CLOSED CIRCUIT BREAKER'
            : frame < 325
            ? '0.852ms IN-MEMORY INFERENCE'
            : 'AWS BEDROCK · 3-TIER ROUTER'}
        </div>
      </div>

      {/* Main Viewport Container */}
      <div
        style={{
          position: 'absolute',
          top: '46px',
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}
      >
        {/* ACT 1: LIVE DASHBOARD */}
        {frame < 170 && <Act1Dashboard frame={frame} fps={fps} />}

        {/* ACT 2: EMPIRICAL TELEMETRY BENCHMARK */}
        {frame >= 155 && frame < 335 && (
          <Act2Benchmark frame={frame - 155} fps={fps} />
        )}

        {/* ACT 3: AWS PRODUCTION ARCHITECTURE */}
        {frame >= 320 && (
          <Act3Architecture frame={frame - 320} fps={fps} />
        )}
      </div>
    </div>
  );
};

// =================================================================
// ACT 1: REAL WEB DASHBOARD
// =================================================================
const Act1Dashboard: React.FC<{ frame: number; fps: number }> = ({
  frame,
}) => {
  const zoom = interpolate(frame, [0, 165], [1.0, 1.08], {
    extrapolateRight: 'clamp',
  });
  const panY = interpolate(frame, [0, 165], [0, -25], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [150, 165], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        transform: `scale(${zoom}) translateY(${panY}px)`,
        transformOrigin: '20% 30%',
        backgroundColor: '#ffffff',
      }}
    >
      <Img
        src={staticFile('assets/projects/aegis-web-dashboard.png')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top left',
        }}
      />

      {/* Floating Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '32px',
          backgroundColor: 'rgba(15, 23, 42, 0.94)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #22c55e',
          borderRadius: '10px',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#22c55e',
          }}
        />
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '12px',
            fontWeight: 700,
            color: '#f0fdf4',
            letterSpacing: '0.04em',
          }}
        >
          AEGIS-2B DASHBOARD · BOTOCORE INTERCEPTION · 1,134 TOKENS SAVED
        </span>
      </div>
    </div>
  );
};

// =================================================================
// ACT 2: EMPIRICAL BENCHMARK TELEMETRY (TERMINAL EXPERIMENT)
// =================================================================
const Act2Benchmark: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.8, stiffness: 95 },
  });

  const zoom = interpolate(frame, [0, 170], [1.02, 1.12], {
    extrapolateRight: 'clamp',
  });
  const panY = interpolate(frame, [0, 170], [0, -30], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [0, 15, 155, 170], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const slideX = interpolate(enterSpring, [0, 1], [30, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        transform: `scale(${zoom}) translateX(${slideX}px) translateY(${panY}px)`,
        transformOrigin: 'center center',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <Img
        src={staticFile('assets/projects/decider-terminal-proof.png')}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />

      {/* Floating Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '32px',
          backgroundColor: 'rgba(15, 23, 42, 0.94)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #38bdf8',
          borderRadius: '10px',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#38bdf8',
          }}
        />
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '12px',
            fontWeight: 700,
            color: '#f0f9ff',
            letterSpacing: '0.04em',
          }}
        >
          EMPIRICAL TELEMETRY · 0.852ms INFERENCE · ZERO MUTATION DISPATCHED
        </span>
      </div>
    </div>
  );
};

// =================================================================
// ACT 3: AWS BEDROCK & LAMBDA ARCHITECTURE
// =================================================================
const Act3Architecture: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.9, stiffness: 85 },
  });

  const zoom = interpolate(frame, [0, 160], [1.0, 1.07], {
    extrapolateRight: 'clamp',
  });
  const panY = interpolate(frame, [0, 160], [0, -15], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const slideY = interpolate(enterSpring, [0, 1], [40, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        transform: `scale(${zoom}) translateY(${slideY + panY}px)`,
        transformOrigin: 'center center',
        backgroundColor: '#0c1017',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <Img
        src={staticFile('assets/projects/aegis-aws-architecture.png')}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />

      {/* Floating Architecture Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '32px',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #f472b6',
          borderRadius: '10px',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#f472b6',
          }}
        />
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '12px',
            fontWeight: 700,
            color: '#fdf2f8',
            letterSpacing: '0.04em',
          }}
        >
          AWS PRODUCTION ARCHITECTURE · BEDROCK + LOCAL 2B SLM CIRCUIT BREAKER
        </span>
      </div>
    </div>
  );
};
