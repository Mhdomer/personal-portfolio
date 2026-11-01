import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Img,
} from 'remotion';

export const MindcraftShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // -------------------------------------------------------------
  // FULL-BLEED REAL SYSTEM SHOWCASE (480 frames = 16 seconds @ 30fps)
  // Zero mock terminals. 100% verified live application & cloud evidence.
  // Act 1: 0 - 130   (0.0s - 4.3s) -> Live Web App (https://mind-craft-k21f.vercel.app/)
  // Act 2: 120 - 245 (4.0s - 8.2s) -> Shift-Left Gate (GitHub Actions PR #1 Trivy Gate)
  // Act 3: 235 - 365 (7.8s - 12.2s)-> AWS EC2 Console (3 Running Workload Instances)
  // Act 4: 355 - 480 (11.8s - 16.0s)-> Production 3-Tier AWS VPC Architecture Diagram
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
          {frame < 125
            ? 'https://mind-craft-k21f.vercel.app/'
            : frame < 240
            ? 'https://github.com/Mhdomer/mindcraft-aws-migration/pull/1'
            : frame < 360
            ? 'https://ap-southeast-1.console.aws.amazon.com/ec2/home#Instances'
            : 'https://mindcraft.aws.internal/vpc/3-tier-topology'}
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
              frame < 125
                ? 'rgba(56, 189, 248, 0.15)'
                : frame < 240
                ? 'rgba(239, 68, 68, 0.2)'
                : frame < 360
                ? 'rgba(34, 197, 94, 0.15)'
                : 'rgba(244, 114, 182, 0.15)',
            color:
              frame < 125
                ? '#38bdf8'
                : frame < 240
                ? '#f87171'
                : frame < 360
                ? '#4ade80'
                : '#f472b6',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          {frame < 125
            ? 'LIVE APP · NEXT.JS 14'
            : frame < 240
            ? 'TRIVY GATE · BLOCKED (EXIT CODE 1)'
            : frame < 360
            ? 'AWS EC2 · 3 INSTANCES RUNNING'
            : 'TERRAFORM · 47 RESOURCES'}
        </div>
      </div>

      {/* Main Viewport Container (Edge-to-Edge below 46px header) */}
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
        {/* ACT 1: LIVE DEPLOYED APP */}
        {frame < 135 && <Act1LiveApp frame={frame} fps={fps} />}

        {/* ACT 2: SHIFT-LEFT TRIVY SECURITY GATE PR */}
        {frame >= 120 && frame < 250 && (
          <Act2TrivyGate frame={frame - 120} fps={fps} />
        )}

        {/* ACT 3: AWS EC2 RUNNING INSTANCES */}
        {frame >= 235 && frame < 370 && (
          <Act3AwsConsole frame={frame - 235} fps={fps} />
        )}

        {/* ACT 4: 3-TIER AWS ARCHITECTURE DIAGRAM */}
        {frame >= 355 && (
          <Act4Architecture frame={frame - 355} fps={fps} />
        )}
      </div>
    </div>
  );
};

// =================================================================
// ACT 1: LIVE DEPLOYED APP (NEXT.JS 14 APP ROUTER)
// =================================================================
const Act1LiveApp: React.FC<{ frame: number; fps: number }> = ({
  frame,
}) => {
  const zoom = interpolate(frame, [0, 130], [1.0, 1.07], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [115, 130], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        transform: `scale(${zoom})`,
        transformOrigin: 'top center',
        backgroundColor: '#7dd3fc',
      }}
    >
      <Img
        src={staticFile('assets/projects/mindcraft-live-preview.png')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top center',
        }}
      />

      {/* Floating Hero Badge */}
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
          LIVE WEB APPLICATION · NEXT.JS 14 INTERACTIVE SQL PLATFORM
        </span>
      </div>
    </div>
  );
};

// =================================================================
// ACT 2: SHIFT-LEFT TRIVY CONTAINER SECURITY GATE (PULL REQUEST #1)
// =================================================================
const Act2TrivyGate: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 100 },
  });

  const zoom = interpolate(frame, [0, 125], [1.02, 1.15], {
    extrapolateRight: 'clamp',
  });
  const panY = interpolate(frame, [0, 125], [0, -40], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [0, 15, 110, 125], [0, 1, 1, 0], {
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
        transformOrigin: '25% 45%',
        backgroundColor: '#0d1117',
      }}
    >
      <Img
        src={staticFile('assets/projects/pr1-trivy-gate-blocked.png')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'left center',
        }}
      />

      {/* Floating Trivy Hard Gate Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '32px',
          backgroundColor: 'rgba(15, 23, 42, 0.94)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #ef4444',
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
            backgroundColor: '#ef4444',
          }}
        />
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '12px',
            fontWeight: 700,
            color: '#fef2f2',
            letterSpacing: '0.04em',
          }}
        >
          GITHUB ACTIONS CI/CD · TRIVY CONTAINER CVE HARD GATE (EXIT CODE 1)
        </span>
      </div>
    </div>
  );
};

// =================================================================
// ACT 3: AWS EC2 RUNNING WORKLOAD INSTANCES CONSOLE
// =================================================================
const Act3AwsConsole: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.8, stiffness: 90 },
  });

  const zoom = interpolate(frame, [0, 135], [1.0, 1.12], {
    extrapolateRight: 'clamp',
  });
  const panX = interpolate(frame, [0, 135], [0, -35], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [0, 15, 120, 135], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const slideY = interpolate(enterSpring, [0, 1], [30, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        transform: `scale(${zoom}) translateX(${panX}px) translateY(${slideY}px)`,
        transformOrigin: 'left center',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Img
        src={staticFile('assets/projects/mindcraft-aws-console-instances.png')}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
        }}
      />

      {/* Floating AWS Console Badge */}
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
          AWS CLOUD CONSOLE · 3-TIER EC2 WORKLOADS (AP-SOUTHEAST-1)
        </span>
      </div>
    </div>
  );
};

// =================================================================
// ACT 4: PRODUCTION 3-TIER AWS ARCHITECTURE DIAGRAM
// =================================================================
const Act4Architecture: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.9, stiffness: 80 },
  });

  const zoom = interpolate(frame, [0, 125], [1.0, 1.08], {
    extrapolateRight: 'clamp',
  });
  const panY = interpolate(frame, [0, 125], [0, -20], {
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
        padding: '24px',
      }}
    >
      <Img
        src={staticFile('assets/projects/mindcraft-aws-architecture.png')}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />

      {/* Floating Architecture Specs Badge */}
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
          3-TIER ARCHITECTURE · 47 TERRAFORM RESOURCES · PRIVATE MONGO SUBNET
        </span>
      </div>
    </div>
  );
};
