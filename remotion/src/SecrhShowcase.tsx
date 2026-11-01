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
  // GLOBAL CAMERA & TIMELINE (Total: 480 frames = 16 seconds @ 30fps)
  // Phase 1: 0 - 130   (0.0s - 4.3s) -> Bilingual Patient Portal (EN to AR)
  // Phase 2: 130 - 240 (4.3s - 8.0s) -> Clinical Staff & EHR Records
  // Phase 3: 240 - 370 (8.0s - 12.3s) -> PostgreSQL RLS Pentest Intercept
  // Phase 4: 370 - 480 (12.3s - 16.0s) -> 3-Tier AWS Architecture & Metrics
  // -------------------------------------------------------------

  // Overall seamless loop fade out at the very end (last 12 frames)
  const masterOpacity = interpolate(frame, [0, 10, 468, 480], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#070a0f',
        position: 'relative',
        overflow: 'hidden',
        opacity: masterOpacity,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '10%',
          width: '80%',
          height: '80%',
          background:
            'radial-gradient(circle, rgba(244, 114, 182, 0.08) 0%, rgba(56, 189, 248, 0.04) 50%, transparent 75%)',
          pointerEvents: 'none',
        }}
      />

      {/* PHASE 1: BILINGUAL PATIENT PORTAL (EN -> AR) */}
      {frame < 140 && <PatientPortalSection frame={frame} fps={fps} />}

      {/* PHASE 2: CLINICAL STAFF TRIAGE & EHR */}
      {frame >= 125 && frame < 250 && (
        <ClinicalStaffSection frame={frame - 125} fps={fps} />
      )}

      {/* PHASE 3: POSTGRESQL RLS PENTEST DRILL */}
      {frame >= 235 && frame < 380 && (
        <RlsPentestSection frame={frame - 235} fps={fps} />
      )}

      {/* PHASE 4: 3-TIER AWS ARCHITECTURE & DRILL RESOLUTION */}
      {frame >= 365 && (
        <ArchitectureSection frame={frame - 365} fps={fps} />
      )}
    </div>
  );
};

// =================================================================
// 1. PATIENT PORTAL (BILINGUAL ENGLISH -> ARABIC RTL)
// =================================================================
const PatientPortalSection: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  // Enter spring
  const enterProgress = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 90 },
  });

  // Continuous subtle camera push-in
  const cameraZoom = interpolate(frame, [0, 130], [0.95, 1.05], {
    extrapolateRight: 'clamp',
  });

  // Exit transition
  const exitOpacity = interpolate(frame, [118, 135], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Language switch at frame 60 (2.0s)
  const isArabic = frame >= 65;
  const langSwitchProgress = spring({
    frame: frame - 65,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 110 },
  });

  const enOpacity = interpolate(frame, [58, 68], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const arOpacity = interpolate(frame, [65, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const arSlide = interpolate(langSwitchProgress, [0, 1], [30, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: exitOpacity,
        transform: `scale(${cameraZoom})`,
        transformOrigin: 'center center',
      }}
    >
      {/* Floating Device Frame */}
      <div
        style={{
          width: '1080px',
          height: '680px',
          backgroundColor: '#111827',
          borderRadius: '18px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow:
            '0 35px 70px -15px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transform: `translateY(${interpolate(enterProgress, [0, 1], [50, 0])}px)`,
        }}
      >
        {/* Browser Top Navigation Bar */}
        <div
          style={{
            height: '46px',
            backgroundColor: '#161f30',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 18px',
          }}
        >
          {/* macOS window dots */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
              }}
            />
            <span
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: '#eab308',
              }}
            />
            <span
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
              }}
            />
          </div>

          {/* URL Pill */}
          <div
            style={{
              backgroundColor: '#0d131f',
              padding: '5px 22px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              color: '#94a3b8',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              letterSpacing: '0.02em',
            }}
          >
            https://secrh.alaminclinics.com/patient/portal
          </div>

          {/* Interactive Language Switcher Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: isArabic ? '#c2410c' : '#1e293b',
              padding: '4px 12px',
              borderRadius: '14px',
              fontSize: '11px',
              fontWeight: 700,
              color: '#ffffff',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            {isArabic ? 'العربية (RTL) ✓' : 'EN · English'}
          </div>
        </div>

        {/* Viewport Display (Crossfade EN to AR) */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            backgroundColor: '#0b0f17',
            overflow: 'hidden',
          }}
        >
          {/* English Dashboard */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: enOpacity,
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
          </div>

          {/* Arabic Dashboard (Slides in) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: arOpacity,
              transform: `translateX(${arSlide}px)`,
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
          </div>
        </div>
      </div>

      {/* Floating Bottom Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '48px',
          right: '80px',
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #f472b6',
          borderRadius: '10px',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 10px 25px rgba(244, 114, 182, 0.25)',
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
          {isArabic
            ? 'BILINGUAL PATIENT PORTAL · ARABIC RTL MODE'
            : 'BILINGUAL PATIENT PORTAL · ENGLISH APPOINTMENTS'}
        </span>
      </div>
    </div>
  );
};

// =================================================================
// 2. CLINICAL STAFF TRIAGE & EHR MEDICAL RECORDS
// =================================================================
const ClinicalStaffSection: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enterProgress = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 95 },
  });

  const exitOpacity = interpolate(frame, [105, 120], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cameraPan = interpolate(frame, [0, 115], [0, -35], {
    extrapolateRight: 'clamp',
  });

  const ehrPopupSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 13, mass: 0.7, stiffness: 100 },
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: exitOpacity,
      }}
    >
      {/* Main Staff Dashboard Card */}
      <div
        style={{
          width: '1080px',
          height: '680px',
          backgroundColor: '#111827',
          borderRadius: '18px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow:
            '0 35px 70px -15px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
          position: 'relative',
          transform: `translateY(${interpolate(enterProgress, [0, 1], [40, 0])}px)`,
        }}
      >
        {/* Top Header */}
        <div
          style={{
            height: '46px',
            backgroundColor: '#161f30',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 18px',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
              }}
            />
            <span
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: '#eab308',
              }}
            />
            <span
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
              }}
            />
          </div>

          <div
            style={{
              backgroundColor: '#0d131f',
              padding: '5px 22px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              color: '#38bdf8',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
            }}
          >
            https://secrh.alaminclinics.com/staff/triage-queue
          </div>

          <div
            style={{
              color: '#22c55e',
              fontSize: '11px',
              fontFamily: '"JetBrains Mono", monospace',
              fontWeight: 700,
            }}
          >
            DOCTOR SESSION ACTIVE
          </div>
        </div>

        {/* Staff Dashboard Image */}
        <div
          style={{
            width: '100%',
            height: 'calc(100% - 46px)',
            overflow: 'hidden',
            transform: `translateY(${cameraPan}px)`,
          }}
        >
          <Img
            src={staticFile('assets/projects/secrh-staff-dashboard.jpg')}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Floating Medical Record EHR Card (Pops in at 1.2s) */}
        {frame >= 35 && (
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              width: '520px',
              backgroundColor: '#0d1424',
              borderRadius: '14px',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.9)',
              overflow: 'hidden',
              transform: `scale(${interpolate(ehrPopupSpring, [0, 1], [0.85, 1])}) translateY(${interpolate(ehrPopupSpring, [0, 1], [30, 0])}px)`,
              opacity: interpolate(ehrPopupSpring, [0, 1], [0, 1]),
            }}
          >
            <div
              style={{
                padding: '10px 16px',
                backgroundColor: '#162238',
                borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#38bdf8',
                }}
              >
                PATIENT EHR · RECORD #P-10492
              </span>
              <span
                style={{
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  color: '#4ade80',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '10px',
                  fontWeight: 700,
                }}
              >
                HIPAA-ALIGNED
              </span>
            </div>
            <Img
              src={staticFile('assets/projects/secrh-medical-records.jpg')}
              style={{
                width: '100%',
                height: '240px',
                objectFit: 'cover',
                objectPosition: 'top center',
              }}
            />
          </div>
        )}
      </div>

      {/* Floating Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '48px',
          right: '80px',
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #38bdf8',
          borderRadius: '10px',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 10px 25px rgba(56, 189, 248, 0.25)',
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
          CLINICAL TRIAGE & EHR VITALS MANAGEMENT
        </span>
      </div>
    </div>
  );
};

// =================================================================
// 3. POSTGRESQL ROW-LEVEL SECURITY (RLS) PENTEST INTERCEPT
// =================================================================
const RlsPentestSection: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enterProgress = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 95 },
  });

  const exitOpacity = interpolate(frame, [125, 140], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Macro-zoom tightly into the RLS error block
  const zoom = interpolate(frame, [45, 120], [1.0, 1.12], {
    extrapolateRight: 'clamp',
  });

  // Impact ripple when the IDOR error strikes (frame 40)
  const isAttackBlocked = frame >= 42;
  const errorFlash = isAttackBlocked
    ? Math.max(0, Math.sin((frame - 42) * 0.4) * Math.exp(-(frame - 42) * 0.08))
    : 0;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: exitOpacity,
        transform: `scale(${zoom})`,
        transformOrigin: 'center 60%',
      }}
    >
      {/* Terminal Window Card */}
      <div
        style={{
          width: '1080px',
          height: '660px',
          backgroundColor: '#0c1017',
          borderRadius: '18px',
          border: isAttackBlocked
            ? `1px solid rgba(239, 68, 68, ${0.4 + errorFlash * 0.6})`
            : '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: isAttackBlocked
            ? `0 35px 80px -15px rgba(239, 68, 68, ${0.2 + errorFlash * 0.3}), 0 0 0 1px rgba(239, 68, 68, 0.2)`
            : '0 35px 70px -15px rgba(0, 0, 0, 0.85)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transform: `translateY(${interpolate(enterProgress, [0, 1], [40, 0])}px)`,
        }}
      >
        {/* Terminal Title Bar */}
        <div
          style={{
            height: '46px',
            backgroundColor: '#141a24',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 18px',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
              }}
            />
            <span
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: '#eab308',
              }}
            />
            <span
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
              }}
            />
          </div>

          <div
            style={{
              color: '#94a3b8',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            postgres@rds-pg16:secrh_db · Isolated Private Subnet
          </div>

          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#f87171',
              padding: '3px 10px',
              borderRadius: '6px',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            PENTEST SIMULATION
          </div>
        </div>

        {/* Terminal Body */}
        <div
          style={{
            padding: '24px 30px',
            fontFamily: '"JetBrains Mono", Menlo, Consolas, monospace',
            fontSize: '14.5px',
            lineHeight: 1.6,
            color: '#e2e8f0',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          {/* Query 1: Legitimate User Query */}
          <div>
            <span style={{ color: '#f472b6', fontWeight: 700 }}>
              postgres@rds-pg16:secrh_db${' '}
            </span>
            <span style={{ color: '#f1f5f9' }}>
              psql -U patient_session -d secrh_production
            </span>
          </div>

          <div style={{ marginTop: '10px' }}>
            <span style={{ color: '#38bdf8' }}>secrh_db=&gt; </span>
            <span>SELECT id, patient_name, diagnosis FROM medical_records;</span>
          </div>

          {/* Table Result */}
          <div
            style={{
              marginTop: '6px',
              color: '#94a3b8',
              fontSize: '13.5px',
            }}
          >
            <div>{' id   | patient_name    | diagnosis              | status'}</div>
            <div>{'------+-----------------+------------------------+--------'}</div>
            <div style={{ color: '#f8fafc' }}>
              {' 1042 | Mohamed Omar    | Acute Pharyngitis (J02)| ACTIVE'}
            </div>
            <div style={{ color: '#4ade80', fontWeight: 700 }}>
              (1 row) [RLS POLICY: patient_isolation_policy ENFORCED]
            </div>
          </div>

          {/* Attack Phase */}
          {frame >= 20 && (
            <div style={{ marginTop: '18px' }}>
              <div style={{ color: '#eab308', fontStyle: 'italic' }}>
                -- Simulating cross-tenant IDOR attack on unauthorized sick_leaves:
              </div>
              <div style={{ marginTop: '4px' }}>
                <span style={{ color: '#38bdf8' }}>secrh_db=&gt; </span>
                <span style={{ color: '#fca5a5' }}>
                  SELECT * FROM sick_leaves WHERE patient_id = 'P-09924';
                </span>
              </div>
            </div>
          )}

          {/* Error Block */}
          {isAttackBlocked && (
            <div
              style={{
                marginTop: '12px',
                padding: '12px 18px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderLeft: '4px solid #ef4444',
                borderRadius: '4px',
              }}
            >
              <div style={{ color: '#f87171', fontWeight: 800 }}>
                ERROR: 42501: permission denied for relation sick_leaves
              </div>
              <div style={{ color: '#fca5a5', fontSize: '13px', marginTop: '2px' }}>
                DETAIL: PostgreSQL Row-Level Security policy 'patient_isolation' rejected access.
              </div>
              <div style={{ color: '#4ade80', fontSize: '12.5px', marginTop: '4px', fontWeight: 700 }}>
                [DEFENSE IN DEPTH] Database-level policy denies unauthorized cross-tenant row read.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '48px',
          right: '80px',
          backgroundColor: 'rgba(15, 23, 42, 0.94)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #ef4444',
          borderRadius: '10px',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
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
          POSTGRESQL ROW-LEVEL SECURITY · ZERO IDOR DATA LEAK
        </span>
      </div>
    </div>
  );
};

// =================================================================
// 4. 3-TIER AWS ARCHITECTURE & DISASTER RECOVERY DRILL
// =================================================================
const ArchitectureSection: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enterProgress = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 95 },
  });

  const zoom = interpolate(frame, [0, 110], [0.94, 1.02], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${zoom})`,
      }}
    >
      {/* Architecture Display Card */}
      <div
        style={{
          width: '1080px',
          height: '680px',
          backgroundColor: '#111827',
          borderRadius: '18px',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          boxShadow:
            '0 35px 70px -15px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(56, 189, 248, 0.2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transform: `translateY(${interpolate(enterProgress, [0, 1], [40, 0])}px)`,
        }}
      >
        {/* Header */}
        <div
          style={{
            height: '46px',
            backgroundColor: '#162238',
            borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 18px',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
              }}
            />
            <span
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: '#eab308',
              }}
            />
            <span
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
              }}
            />
          </div>

          <div
            style={{
              color: '#38bdf8',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            AWS 3-Tier Production Architecture · Terraform Modules
          </div>

          <div
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
              color: '#4ade80',
              padding: '3px 10px',
              borderRadius: '6px',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            110 RESOURCES · 0 DRIFT
          </div>
        </div>

        {/* Architecture Image */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#0a0e17',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
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

        {/* Bottom Telemetry Bar */}
        <div
          style={{
            height: '46px',
            backgroundColor: '#0f172a',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '12px',
            color: '#94a3b8',
          }}
        >
          <div>
            <span style={{ color: '#38bdf8' }}>VPC: </span>2 AZs · Private DB Subnets
          </div>
          <div>
            <span style={{ color: '#4ade80' }}>Disaster Recovery: </span>17m40s RTO Drill
          </div>
          <div>
            <span style={{ color: '#f472b6' }}>IaC Verification: </span>399/399 Checkov Passed
          </div>
        </div>
      </div>

      {/* Floating Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '48px',
          right: '80px',
          backgroundColor: 'rgba(15, 23, 42, 0.94)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #38bdf8',
          borderRadius: '10px',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 10px 25px rgba(56, 189, 248, 0.3)',
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
