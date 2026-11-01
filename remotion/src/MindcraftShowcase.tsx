import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';

// ==========================================
// SCENE 1: CONTAINER CVE DRIFT (0s - 6s)
// ==========================================
function SceneVulnerability() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 14, mass: 0.8 } });
  const opacity = interpolate(frame, [0, 15, 160, 175], [0, 1, 1, 0]);
  const pulse = Math.sin(frame * 0.15) * 4;

  return (
    <div
      style={{
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: '40px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#d9532f',
          marginBottom: '20px',
        }}
      >
        01 · CONTAINER & CLOUD DRIFT
      </div>

      <h1
        style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '52px',
          fontWeight: 800,
          color: '#1a202c',
          lineHeight: 1.2,
          maxWidth: '920px',
          margin: '0 0 35px 0',
        }}
      >
        Vulnerable images slip past{' '}
        <span
          style={{
            background: '#fee2e2',
            color: '#b91c1c',
            padding: '4px 16px',
            borderRadius: '12px',
            border: '2px solid #fca5a5',
            display: 'inline-block',
          }}
        >
          deployment unnoticed.
        </span>
      </h1>

      <div
        style={{
          transform: `scale(${scale}) translateY(${pulse}px)`,
          background: '#ffffff',
          borderRadius: '24px',
          border: '2px solid #fecaca',
          boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.25)',
          padding: '36px 48px',
          maxWidth: '680px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            background: '#fee2e2',
            color: '#b91c1c',
            fontSize: '16px',
            fontFamily: 'monospace',
            fontWeight: 800,
            padding: '8px 20px',
            borderRadius: '100px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>CRITICAL CVE DETECTED</span>
          <span>·</span>
          <span>DOCKER IMAGE</span>
        </div>

        <div
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#991b1b',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          CVE-2024-21626 Container Escape
        </div>

        <p
          style={{
            fontSize: '18px',
            color: '#4b5563',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Coursework relied on opaque cloud hosting with zero subnet isolation or
          shift-left security gates.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 2: SHIFT-LEFT CI/CD (6s - 12s)
// ==========================================
function ScenePipeline() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 } });
  const opacity = interpolate(frame, [0, 15, 160, 175], [0, 1, 1, 0]);

  const step1 = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const step2 = spring({ frame: frame - 35, fps, config: { damping: 12 } });
  const step3 = spring({ frame: frame - 55, fps, config: { damping: 12 } });

  return (
    <div
      style={{
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: '40px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#2563eb',
          marginBottom: '16px',
        }}
      >
        02 · SHIFT-LEFT DEVSECOPS PIPELINE
      </div>

      <h1
        style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '48px',
          fontWeight: 800,
          color: '#1a202c',
          lineHeight: 1.2,
          maxWidth: '920px',
          margin: '0 0 35px 0',
          transform: `scale(${entrance})`,
        }}
      >
        Engineered{' '}
        <span
          style={{
            background: '#dbeafe',
            color: '#1d4ed8',
            padding: '4px 16px',
            borderRadius: '12px',
            border: '2px solid #93c5fd',
            display: 'inline-block',
          }}
        >
          Trivy Security Gate
        </span>{' '}
        in CI/CD
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          maxWidth: '980px',
          width: '100%',
        }}
      >
        <div
          style={{
            transform: `scale(${Math.max(0, step1)})`,
            background: '#ffffff',
            borderRadius: '20px',
            padding: '24px 20px',
            border: '2px solid #bfdbfe',
            boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.1)',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: 800,
              color: '#2563eb',
              marginBottom: '8px',
            }}
          >
            STAGE 1 · BUILD & SCAN
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            Trivy Vulnerability Check
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>
            GitHub Actions scans Docker container image for critical/high vulnerabilities.
          </div>
        </div>

        <div
          style={{
            transform: `scale(${Math.max(0, step2)})`,
            background: '#ffffff',
            borderRadius: '20px',
            padding: '24px 20px',
            border: '2px solid #fed7aa',
            boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.1)',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: 800,
              color: '#ea580c',
              marginBottom: '8px',
            }}
          >
            STAGE 2 · HARD FAILURE
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            Exit Code 1 Blocker
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>
            PR merges are strictly halted when unpatched vulnerabilities are found.
          </div>
        </div>

        <div
          style={{
            transform: `scale(${Math.max(0, step3)})`,
            background: '#ffffff',
            borderRadius: '20px',
            padding: '24px 20px',
            border: '2px solid #bbf7d0',
            boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.1)',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: 800,
              color: '#16a34a',
              marginBottom: '8px',
            }}
          >
            STAGE 3 · SECURE DEPLOY
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            AWS SSM & OIDC
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>
            Zero stored AWS keys. Container artifact deployed via encrypted SSM session.
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 3: VERIFIED RESULTS (12s - 18s)
// ==========================================
function SceneOutcomes() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 15], [0, 1]);

  const item1 = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const item2 = spring({ frame: frame - 30, fps, config: { damping: 14 } });
  const item3 = spring({ frame: frame - 50, fps, config: { damping: 14 } });

  return (
    <div
      style={{
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: '40px',
      }}
    >
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#16a34a',
          marginBottom: '16px',
        }}
      >
        03 · SHIFT-LEFT AUDIT BENCHMARKS
      </div>

      <h1
        style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '50px',
          fontWeight: 800,
          color: '#1a202c',
          lineHeight: 1.15,
          marginBottom: '35px',
          textAlign: 'center',
        }}
      >
        Exit Code 1 Gate.{' '}
        <span
          style={{
            background: '#dcfce7',
            color: '#15803d',
            padding: '4px 16px',
            borderRadius: '12px',
            border: '2px solid #86efac',
          }}
        >
          Zero Stored Secrets.
        </span>
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '780px',
          width: '100%',
        }}
      >
        <div
          style={{
            transform: `translateX(${interpolate(item1, [0, 1], [-40, 0])}px)`,
            opacity: item1,
            background: '#ffffff',
            borderRadius: '18px',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            border: '2px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#22c55e',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '20px',
              flexShrink: 0,
            }}
          >
            ✓
          </div>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#1e293b',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Hard CI/CD gate halts PR merges on critical container CVEs
          </div>
        </div>

        <div
          style={{
            transform: `translateX(${interpolate(item2, [0, 1], [-40, 0])}px)`,
            opacity: item2,
            background: '#ffffff',
            borderRadius: '18px',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            border: '2px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#22c55e',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '20px',
              flexShrink: 0,
            }}
          >
            ✓
          </div>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#1e293b',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            399 of 399 Checkov IaC security checks passing
          </div>
        </div>

        <div
          style={{
            transform: `translateX(${interpolate(item3, [0, 1], [-40, 0])}px)`,
            opacity: item3,
            background: '#ffffff',
            borderRadius: '18px',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            border: '2px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#22c55e',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '20px',
              flexShrink: 0,
            }}
          >
            ✓
          </div>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#1e293b',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Zero long-lived AWS access keys using OIDC & SSM sessions
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN COMPOSITION ROOT: MINDCRAFT SHOWCASE
// ==========================================
export function MindcraftShowcase() {
  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#f6f1e8',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '16px',
          border: '1px solid rgba(22, 31, 40, 0.12)',
          borderRadius: '24px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '32px',
          left: '36px',
          fontFamily: 'monospace',
          fontSize: '14px',
          fontWeight: 700,
          color: '#1e293b',
          opacity: 0.75,
          letterSpacing: '0.12em',
        }}
      >
        MINDCRAFT · 3-TIER AWS & TRIVY CI/CD GATE
      </div>

      <div
        style={{
          position: 'absolute',
          top: '32px',
          right: '36px',
          fontFamily: 'monospace',
          fontSize: '14px',
          fontWeight: 700,
          color: '#d9532f',
          letterSpacing: '0.12em',
        }}
      >
        MHDOMAR.DEV
      </div>

      <Sequence from={0} durationInFrames={180}>
        <SceneVulnerability />
      </Sequence>

      <Sequence from={180} durationInFrames={180}>
        <ScenePipeline />
      </Sequence>

      <Sequence from={360} durationInFrames={180}>
        <SceneOutcomes />
      </Sequence>
    </div>
  );
}
