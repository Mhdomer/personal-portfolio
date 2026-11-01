import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Img,
} from 'remotion';

export const SecrhShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // -------------------------------------------------------------
  // FULL-BLEED REAL SYSTEM SHOWCASE (480 frames = 16 seconds @ 30fps)
  // Zero mock terminals. 100% verified clinic software and architecture.
  // Act 1: 0 - 130   (0.0s - 4.3s) -> Patient Portal (English Appointments)
  // Act 2: 120 - 245 (4.0s - 8.2s) -> Patient Portal (Arabic RTL Localization)
  // Act 3: 235 - 365 (7.8s - 12.2s)-> Clinical Staff Triage & EHR Records
  // Act 4: 355 - 480 (11.8s - 16.0s)-> Production 3-Tier AWS Architecture
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
          {frame < 240
            ? 'https://secrh.alaminclinics.com/patient/portal'
            : frame < 360
            ? 'https://secrh.alaminclinics.com/staff/clinical-triage'
            : 'https://secrh.alaminclinics.com/infrastructure/aws-topology'}
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
                ? '#c2410c'
                : frame < 360
                ? 'rgba(34, 197, 94, 0.15)'
                : 'rgba(244, 114, 182, 0.15)',
            color:
              frame < 125
                ? '#38bdf8'
                : frame < 240
                ? '#ffffff'
                : frame < 360
                ? '#4ade80'
                : '#f472b6',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          {frame < 125
            ? 'EN · ENGLISH PORTAL'
            : frame < 240
            ? 'العربية (RTL) ✓'
            : frame < 360
            ? 'DOCTOR SESSION ACTIVE'
            : 'AWS PRODUCTION · 110 RES'}
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
        {/* ACT 1: PATIENT PORTAL (ENGLISH) */}
        {frame < 135 && <Act1PatientEnglish frame={frame} fps={fps} />}

        {/* ACT 2: PATIENT PORTAL (ARABIC RTL) */}
        {frame >= 120 && frame < 250 && (
          <Act2PatientArabic frame={frame - 120} fps={fps} />
        )}

        {/* ACT 3: CLINICAL STAFF TRIAGE & EHR */}
        {frame >= 235 && frame < 370 && (
          <Act3StaffEhr frame={frame - 235} fps={fps} />
        )}

        {/* ACT 4: 3-TIER AWS ARCHITECTURE & DR METRICS */}
        {frame >= 355 && (
          <Act4Architecture frame={frame - 355} fps={fps} />
        )}
      </div>
    </div>
  );
};

// =================================================================
// ACT 1: FULL-BLEED PATIENT PORTAL (ENGLISH)
// =================================================================
const Act1PatientEnglish: React.FC<{ frame: number; fps: number }> = ({
  frame,
}) => {
  const zoom = interpolate(frame, [0, 130], [1.0, 1.08], {
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
      }}
    >
      <Img
        src={staticFile('assets/projects/secrh-patient-dashboard.jpg')}
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
          PATIENT PORTAL · ENGLISH APPOINTMENTS & QUEUE
        </span>
      </div>
    </div>
  );
};

// =================================================================
// ACT 2: FULL-BLEED PATIENT PORTAL (ARABIC RTL LOCALIZATION)
// =================================================================
const Act2PatientArabic: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 100 },
  });

  const zoom = interpolate(frame, [0, 125], [1.0, 1.08], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [0, 15, 110, 125], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const slideX = interpolate(enterSpring, [0, 1], [40, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        transform: `scale(${zoom}) translateX(${slideX}px)`,
        transformOrigin: 'top center',
      }}
    >
      <Img
        src={staticFile('assets/projects/secrh-patient-dashboard-ar.jpg')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top center',
        }}
      />

      {/* Floating Arabic Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '32px',
          backgroundColor: 'rgba(15, 23, 42, 0.94)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #ea580c',
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
            backgroundColor: '#ea580c',
          }}
        />
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '12px',
            fontWeight: 700,
            color: '#fff7ed',
            letterSpacing: '0.04em',
          }}
        >
          BILINGUAL PATIENT PORTAL · ARABIC RTL MODE (RIYADH)
        </span>
      </div>
    </div>
  );
};

// =================================================================
// ACT 3: FULL-BLEED CLINICAL STAFF TRIAGE & EHR
// =================================================================
const Act3StaffEhr: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.8, stiffness: 90 },
  });

  const zoom = interpolate(frame, [0, 130], [1.0, 1.07], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [0, 12, 115, 130], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Floating EHR card springs in at 1.0s (frame 30)
  const ehrSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 105 },
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        transform: `scale(${zoom})`,
        transformOrigin: 'top center',
      }}
    >
      {/* Background Staff Triage */}
      <Img
        src={staticFile('assets/projects/secrh-staff-dashboard.jpg')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top center',
          transform: `translateY(${interpolate(enterSpring, [0, 1], [30, 0])}px)`,
        }}
      />

      {/* Floating EHR Medical Record Viewport Card */}
      {frame >= 28 && (
        <div
          style={{
            position: 'absolute',
            bottom: '70px',
            right: '40px',
            width: '640px',
            backgroundColor: '#0c121e',
            borderRadius: '16px',
            border: '1px solid rgba(56, 189, 248, 0.45)',
            boxShadow:
              '0 30px 60px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(56, 189, 248, 0.2)',
            overflow: 'hidden',
            transform: `scale(${interpolate(ehrSpring, [0, 1], [0.9, 1])}) translateY(${interpolate(ehrSpring, [0, 1], [35, 0])}px)`,
            opacity: interpolate(ehrSpring, [0, 1], [0, 1]),
          }}
        >
          <div
            style={{
              padding: '12px 18px',
              backgroundColor: '#142033',
              borderBottom: '1px solid rgba(56, 189, 248, 0.25)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '12px',
                fontWeight: 700,
                color: '#38bdf8',
              }}
            >
              PATIENT ELECTRONIC HEALTH RECORD · #P-10492
            </span>
            <span
              style={{
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                color: '#4ade80',
                padding: '3px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                fontFamily: '"JetBrains Mono", monospace',
              }}
            >
              HIPAA-ALIGNED EHR
            </span>
          </div>
          <Img
            src={staticFile('assets/projects/secrh-medical-records.jpg')}
            style={{
              width: '100%',
              height: '320px',
              objectFit: 'cover',
              objectPosition: 'top center',
            }}
          />
        </div>
      )}

      {/* Floating Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '32px',
          backgroundColor: 'rgba(15, 23, 42, 0.94)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #4ade80',
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
            backgroundColor: '#4ade80',
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
          CLINICAL STAFF TRIAGE & HIPAA MEDICAL RECORDS
        </span>
      </div>
    </div>
  );
};

// =================================================================
// ACT 4: FULL-BLEED 3-TIER PRODUCTION AWS ARCHITECTURE
// =================================================================
const Act4Architecture: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 95 },
  });

  const zoom = interpolate(frame, [0, 120], [0.98, 1.04], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        backgroundColor: '#0a0e17',
        display: 'flex',
        flexDirection: 'column',
        transform: `scale(${zoom})`,
        transformOrigin: 'center center',
      }}
    >
      {/* Edge-to-Edge Architecture Diagram */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px',
          transform: `translateY(${interpolate(enterSpring, [0, 1], [30, 0])}px)`,
        }}
      >
        <Img
          src={staticFile('assets/projects/secrh-aws-architecture.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Bottom Telemetry Metrics Strip */}
      <div
        style={{
          height: '48px',
          backgroundColor: '#0f172a',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '12px',
          color: '#94a3b8',
          padding: '0 20px',
        }}
      >
        <div>
          <span style={{ color: '#38bdf8', fontWeight: 700 }}>VPC: </span>
          2 AZs · Private Isolated DB Subnets
        </div>
        <div>
          <span style={{ color: '#4ade80', fontWeight: 700 }}>DR Drill: </span>
          17m40s RTO Reconstruction
        </div>
        <div>
          <span style={{ color: '#f472b6', fontWeight: 700 }}>IaC Check: </span>
          399/399 Checkov Passed
        </div>
      </div>

      {/* Floating Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '64px',
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
          HARDENED 3-TIER AWS ARCHITECTURE · 110 RESOURCES · 0 DRIFT
        </span>
      </div>
    </div>
  );
};
