import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Img,
} from 'remotion';

export const A2Showcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // -------------------------------------------------------------
  // FULL-BLEED REAL SYSTEM SHOWCASE (480 frames = 16 seconds @ 30fps)
  // Zero mock terminals. 100% verified CLI output and architecture evidence.
  // Act 1: 0 - 245   (0.0s - 8.2s) -> Real AWS CLI Terminal Audit (Port 22 Revocation)
  // Act 2: 235 - 480 (7.8s - 16.0s)-> Production EventBridge & Lambda Architecture Diagram
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
      {/* Edge-to-Edge Browser / Console Chrome */}
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
          {frame < 240
            ? 'https://us-east-1.console.aws.amazon.com/cloudwatch/home#logsV2:log-groups'
            : 'https://a2.compliance.internal/architecture/eventbridge-lambda'}
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
              frame < 240
                ? 'rgba(34, 197, 94, 0.15)'
                : 'rgba(56, 189, 248, 0.15)',
            color: frame < 240 ? '#4ade80' : '#38bdf8',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          {frame < 240
            ? 'SUB-8s AUTO-REMEDIATION'
            : '378 PASSING TESTS · 18 BUGS'}
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
        {/* ACT 1: REAL TERMINAL AUDIT & LAMBDA LOGS */}
        {frame < 250 && <Act1RealCliTerminal frame={frame} fps={fps} />}

        {/* ACT 2: ARCHITECTURE DIAGRAM & DRIFT SPECS */}
        {frame >= 235 && <Act2Architecture frame={frame - 235} fps={fps} />}
      </div>
    </div>
  );
};

// =================================================================
// ACT 1: REAL AWS CLI & LAMBDA LOGS (CAPTURED FROM LIVE ACCOUNT)
// =================================================================
const Act1RealCliTerminal: React.FC<{ frame: number; fps: number }> = ({
  frame,
}) => {
  const zoom = interpolate(frame, [0, 245], [1.0, 1.14], {
    extrapolateRight: 'clamp',
  });
  const panY = interpolate(frame, [0, 245], [0, -30], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [225, 245], [1, 0], {
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
        transformOrigin: '25% 40%',
        backgroundColor: '#0c1017',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Img
        src={staticFile('assets/projects/a2-social-preview.png')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />

      {/* Floating Telemetry Badge */}
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
          AWS CLI & LAMBDA LOGS · PORT 22 INGRESS REVOCATION IN 8 SECONDS
        </span>
      </div>
    </div>
  );
};

// =================================================================
// ACT 2: ARCHITECTURE & EVENTBRIDGE LOOP PREVENTION
// =================================================================
const Act2Architecture: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.9, stiffness: 85 },
  });

  const zoom = interpolate(frame, [0, 245], [1.0, 1.08], {
    extrapolateRight: 'clamp',
  });
  const panY = interpolate(frame, [0, 245], [0, -15], {
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
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '28px',
      }}
    >
      <Img
        src={staticFile('assets/projects/a2-compliance-architecture.png')}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />

      {/* Floating Specs Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '32px',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
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
          EVENTBRIDGE ENGINE · 4 RULES · 378 AUTOMATED PYTEST TESTS
        </span>
      </div>
    </div>
  );
};
