import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';

// ==========================================
// SCENE 1: THE CRISIS (0s - 6s / Frames 0-180)
// ==========================================
function SceneCrisis() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const scale = spring({ frame, fps, config: { damping: 14, mass: 0.8 } });
  const opacity = interpolate(frame, [0, 15, 160, 175], [0, 1, 1, 0]);

  // Pulse effect on alert
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
      {/* Category Kicker */}
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
        01 · CLINICAL CRISIS & VULNERABILITY
      </div>

      {/* Main Punchy Headline */}
      <h1
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '52px',
          fontWeight: 800,
          color: '#1a202c',
          lineHeight: 1.2,
          maxWidth: '920px',
          margin: '0 0 35px 0',
        }}
      >
        Clinic ran on a single{' '}
        <span
          style={{
            background: '#ffedd5',
            color: '#c2410c',
            padding: '4px 16px',
            borderRadius: '12px',
            border: '2px solid #fdba74',
            display: 'inline-block',
          }}
        >
          unencrypted server.
        </span>
      </h1>

      {/* Centerpiece Crisis Box */}
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
          <span>CRITICAL OUTAGE</span>
          <span>·</span>
          <span>MAY 2023</span>
        </div>

        <div
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#991b1b',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Ransomware Attack Hit Al-Ameen
        </div>

        <p
          style={{
            fontSize: '18px',
            color: '#4b5563',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          5 days of total clinic downtime. Patient records locked. No offsite
          backups, no network segmentation.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 2: THE ARCHITECTURE (6s - 12s / Frames 180-360)
// ==========================================
function SceneArchitecture() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 } });
  const opacity = interpolate(frame, [0, 15, 160, 175], [0, 1, 1, 0]);

  // Staggered Tier Card reveals
  const tier1 = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const tier2 = spring({ frame: frame - 35, fps, config: { damping: 12 } });
  const tier3 = spring({ frame: frame - 55, fps, config: { damping: 12 } });

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
          color: '#0284c7',
          marginBottom: '16px',
        }}
      >
        02 · ARCHITECTURAL RE-ENGINEERING
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
        Engineered a{' '}
        <span
          style={{
            background: '#e0f2fe',
            color: '#0369a1',
            padding: '4px 16px',
            borderRadius: '12px',
            border: '2px solid #7dd3fc',
            display: 'inline-block',
          }}
        >
          3-Tier HIPAA Cloud
        </span>{' '}
        on AWS
      </h1>

      {/* 3 Interactive Pipeline Tiers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          maxWidth: '980px',
          width: '100%',
        }}
      >
        {/* Tier 1 */}
        <div
          style={{
            transform: `scale(${Math.max(0, tier1)})`,
            background: '#ffffff',
            borderRadius: '20px',
            padding: '24px 20px',
            border: '2px solid #bae6fd',
            boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.1)',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: 800,
              color: '#0284c7',
              marginBottom: '8px',
            }}
          >
            TIER 1 · PUBLIC EDGE
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            AWS WAF + ALB
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>
            Rate limiting, SSL offloading, and DDoS filtering.
          </div>
        </div>

        {/* Tier 2 */}
        <div
          style={{
            transform: `scale(${Math.max(0, tier2)})`,
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
            TIER 2 · PRIVATE COMPUTE
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            EC2 API Cluster
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>
            Zero public IPs, internal routing, and SSM console access.
          </div>
        </div>

        {/* Tier 3 */}
        <div
          style={{
            transform: `scale(${Math.max(0, tier3)})`,
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
            TIER 3 · ISOLATED DATA
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            Multi-AZ RDS PostgreSQL
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>
            KMS encryption at rest, automated snapshots, and isolated PACS.
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 3: THE OUTCOMES (12s - 18s / Frames 360-540)
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
        03 · PRODUCTION OUTCOMES & COMPLIANCE
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
        Zero Downtime.{' '}
        <span
          style={{
            background: '#dcfce7',
            color: '#15803d',
            padding: '4px 16px',
            borderRadius: '12px',
            border: '2px solid #86efac',
          }}
        >
          Total Resilience.
        </span>
      </h1>

      {/* 3 Outcome Checklists matching case-pos style */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '780px',
          width: '100%',
        }}
      >
        {/* Item 1 */}
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
            100% automated daily offsite backup verification
          </div>
        </div>

        {/* Item 2 */}
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
            Sub-minute multi-AZ database automated failover
          </div>
        </div>

        {/* Item 3 */}
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
            Zero unencrypted patient medical records at rest
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN COMPOSITION ROOT: SECRH SHOWCASE
// ==========================================
export function SecrhShowcase() {
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
      {/* Editorial Frame Borders */}
      <div
        style={{
          position: 'absolute',
          inset: '16px',
          border: '1px solid rgba(22, 31, 40, 0.12)',
          borderRadius: '24px',
          pointerEvents: 'none',
        }}
      />

      {/* Top Brand Tag */}
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
        SECRH · AL-AMEEN CLINIC AWS MIGRATION
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

      {/* Act 1: 0s - 6s */}
      <Sequence from={0} durationInFrames={180}>
        <SceneCrisis />
      </Sequence>

      {/* Act 2: 6s - 12s */}
      <Sequence from={180} durationInFrames={180}>
        <SceneArchitecture />
      </Sequence>

      {/* Act 3: 12s - 18s */}
      <Sequence from={360} durationInFrames={180}>
        <SceneOutcomes />
      </Sequence>
    </div>
  );
}
