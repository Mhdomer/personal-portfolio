import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';

// ==========================================
// SCENE 1: THE BOTTLENECK (0s - 6s)
// ==========================================
function SceneBottleneck() {
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
        01 · AI SECURITY & LATENCY BOTTLENECK
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
        Enterprise LLM guardrails add{' '}
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
          1,800ms+ latency.
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
          <span>HEAVY LLM JUDGE</span>
          <span>·</span>
          <span>1,840ms P99</span>
        </div>

        <div
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#991b1b',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Slow Agent Loops & Token Waste
        </div>

        <p
          style={{
            fontSize: '18px',
            color: '#4b5563',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Evaluating every prompt with a full model costs tokens on blocked attacks
          and ruins real-time conversational UX.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 2: DUAL-TIER DEFENSE (6s - 12s)
// ==========================================
function SceneDualTier() {
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
          color: '#ec4899',
          marginBottom: '16px',
        }}
      >
        02 · DUAL-TIER DEFENSE PIPELINE
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
            background: '#fce7f3',
            color: '#be185d',
            padding: '4px 16px',
            borderRadius: '12px',
            border: '2px solid #f472b6',
            display: 'inline-block',
          }}
        >
          Sub-115ms Circuit Breaker
        </span>{' '}
        for Bedrock
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
            border: '2px solid #fbcfe8',
            boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.1)',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: 800,
              color: '#db2777',
              marginBottom: '8px',
            }}
          >
            TIER 1 · FAST TRIAGE
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            Sub-0.8ms Regex Trie
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>
            Deterministic pattern matching intercepts OWASP LLM01 injections in under 1 millisecond.
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
            TIER 2 · SLM VERIFIER
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            Quantized 2B Model
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>
            Evaluates ambiguous edge cases on Lambda container before calling Amazon Bedrock.
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
            ACTION CERTIFICATION
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            SHA-256 Audit Receipts
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>
            Cryptographically sealed receipts prove safety certification for every tool mutation.
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 3: BENCHMARK RESULTS (12s - 18s)
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
        03 · BENCHMARK TELEMETRY & RESULTS
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
        16.1x Faster.{' '}
        <span
          style={{
            background: '#dcfce7',
            color: '#15803d',
            padding: '4px 16px',
            borderRadius: '12px',
            border: '2px solid #86efac',
          }}
        >
          100% Attack Prevention.
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
            114.5ms p99 latency vs 1,840ms Bedrock roundtrip
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
            100% cost reduction on blocked prompt injections
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
            Cryptographic SHA-256 tamper-evident action audit trail
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN COMPOSITION ROOT: AEGIS SHOWCASE
// ==========================================
export function AegisShowcase() {
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
        AEGIS-2B · AI SECURITY CIRCUIT BREAKER
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
        <SceneBottleneck />
      </Sequence>

      <Sequence from={180} durationInFrames={180}>
        <SceneDualTier />
      </Sequence>

      <Sequence from={360} durationInFrames={180}>
        <SceneOutcomes />
      </Sequence>
    </div>
  );
}
