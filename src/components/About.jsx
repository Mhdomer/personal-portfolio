import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Download, Maximize2 } from 'lucide-react';

const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

export default function About({ onSelectImage, onOpenResume, proofRequest }) {
  const prefersReducedMotion = useReducedMotion();
  const [highlightedId, setHighlightedId] = useState(null);
  const [highlightedSkill, setHighlightedSkill] = useState('');

  useEffect(() => {
    if (!proofRequest || proofRequest.type !== 'achievement') return undefined;

    setHighlightedId(proofRequest.achievementId);
    setHighlightedSkill(proofRequest.skillName || '');

    requestAnimationFrame(() => {
      const el = document.getElementById(`achievement-${proofRequest.achievementId}`);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const targetY = Math.max(0, Math.round(rect.top + window.scrollY - 116));
      window.scrollTo({
        top: targetY,
        behavior: prefersReducedMotion ? 'instant' : 'smooth',
      });
    });

    const timer = window.setTimeout(() => {
      setHighlightedId(null);
    }, 2600);

    return () => window.clearTimeout(timer);
  }, [proofRequest?.token, prefersReducedMotion]);

  const achievements = [
    {
      id: 'depi',
      title: 'TEAM LEAD · DEPI CLOUD SECURITY',
      htmlDescription:
        'Led university peer group through the <strong>Digital Egypt Pioneers Initiative (DEPI)</strong> capstone, architecting a hardened AWS environment with automated vulnerability triage, IAM least privilege policies, and CI/CD security gates.',
    },
    {
      id: 'utm',
      title: "UTM DEAN'S LIST · CGPA 3.43",
      htmlDescription:
        'Senior Computer Science student specializing in <strong>Networks and Security</strong> at <strong>Universiti Teknologi Malaysia (UTM)</strong>. Maintained high academic standing with focus on distributed systems, memory safety, and network protocols.',
    },
    {
      id: 'asean',
      title: '3RD PLACE · ASEAN CYBER RACE 2025 FINALS',
      htmlDescription:
        'Represented UTM in the international finals (<strong>Cisco Networking Academy</strong>) in November 2025. Solved competitive challenges spanning cloud infrastructure misconfigurations, packet payload forensics with <strong>Wireshark</strong>, and reverse engineering.',
    },
    {
      id: 'alameen',
      title: 'HEALTHCARE INFRASTRUCTURE · AL-AMEEN IT',
      htmlDescription:
        'Industrial Training in clinical outpatient IT operations at <strong>Al-Ameen Medical Complex in Riyadh</strong>. Segmented diagnostic <strong>PACS medical subnets</strong> from administrative networks, hardened multi-clinic endpoints, and automated backup validation.',
    },
    {
      id: 'linux',
      title: 'KNOWLEDGE SHARING · "OMAR DOCUMENTS"',
      htmlDescription:
        'Conducted weekly peer tutoring sessions for junior CS students at UTM in <strong>C++, data structures, and POSIX OS fundamentals</strong>. Creating bilingual technical walkthroughs on YouTube covering <strong>CachyOS Linux</strong>, <strong>Niri Wayland</strong>, and cloud architectures.',
    },
  ];

  return (
    <section
      id="experience"
      className="py-20 scroll-mt-20 transition-colors duration-300 relative"
    >
      <div id="about" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1.15fr] gap-8 lg:gap-14 items-start">
          {/* Left Column: ACHIEVEMENTS */}
          <div className="flex flex-col">
            <div
              className="mb-6 pb-2 border-b flex items-center justify-between"
              style={{ borderColor: 'var(--line)' }}
            >
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest opacity-70">
                ACHIEVEMENTS
              </h3>
            </div>

            {/* Achievements List */}
            <div className="space-y-6">
              {achievements.map((item, idx) => {
                const isHighlighted = highlightedId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    id={`achievement-${item.id}`}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.48,
                      delay: idx * 0.065,
                      ease: EDITORIAL_EASE,
                    }}
                    className={`space-y-1.5 rounded-r-xl transition-all duration-300 ${
                      isHighlighted ? 'pl-3.5 py-2 pr-3 border-l-2' : 'pl-0 py-0.5 border-l-0'
                    }`}
                    style={
                      isHighlighted
                        ? {
                            borderColor: 'var(--brand-coral)',
                            background: 'var(--surface-soft)',
                          }
                        : undefined
                    }
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-bold font-mono uppercase tracking-tight text-[var(--ink)]">
                        {item.title}
                      </h4>
                      <AnimatePresence initial={false}>
                        {isHighlighted && highlightedSkill && (
                          <motion.span
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            data-testid="achievement-proof-badge"
                            className="text-[10px] font-mono px-2 py-0.5 rounded border font-semibold"
                            style={{
                              color: 'var(--brand-coral)',
                              borderColor: 'var(--brand-coral)',
                              background: 'var(--surface)',
                            }}
                          >
                            Proof: {highlightedSkill}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <p
                      className="text-xs sm:text-sm leading-relaxed opacity-80 font-sans"
                      dangerouslySetInnerHTML={{ __html: item.htmlDescription }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Center Vertical Divider Line (Exact match to screenshot) */}
          <motion.div
            initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 0.6 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.72, ease: EDITORIAL_EASE }}
            className="hidden lg:block w-px self-stretch opacity-60 origin-top"
            style={{ background: 'var(--line)' }}
          />

          {/* Right Column: RESUME (Large, Readable Preview) */}
          <div className="flex flex-col">
            <div
              className="mb-6 pb-2 border-b flex items-center justify-between"
              style={{ borderColor: 'var(--line)' }}
            >
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest opacity-70">
                RESUME
              </h3>
              <button
                type="button"
                onClick={() => onOpenResume && onOpenResume()}
                className="text-[11px] font-mono opacity-70 hover:opacity-100 flex items-center gap-1.5 transition-opacity cursor-pointer"
                title="View Fullscreen Resume"
              >
                <Maximize2 className="w-3 h-3 text-[var(--brand-coral)]" />
                <span>View Fullscreen</span>
              </button>
            </div>

            {/* Framed Resume Card (Exact sharara.me geometry with curved top-right) */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.56, delay: 0.08, ease: EDITORIAL_EASE }}
              className="rounded-2xl overflow-hidden shadow-2xl border flex flex-col group transition-colors"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--line)',
              }}
              data-testid="card-resume-preview"
            >
              {/* Document Image Container with Asymmetric Top-Right Curve */}
              <div
                className="relative overflow-hidden cursor-pointer bg-white p-2.5 sm:p-3.5 transition-transform duration-300 group-hover:scale-[1.01]"
                style={{
                  borderTopLeftRadius: '14px',
                  borderTopRightRadius: '42px',
                }}
                onClick={() => (onOpenResume ? onOpenResume() : null)}
              >
                <img
                  src="/assets/resume/resume-preview.webp"
                  alt="Mohamed Makhlouf Resume"
                  width={720}
                  height={932}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/assets/resume/resume-preview.png';
                  }}
                  className="w-full h-auto object-top object-contain block rounded-t-lg"
                />

                {/* Inspect Overlay on Hover */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold bg-black/85 text-white border border-white/20 shadow-xl flex items-center gap-1.5 backdrop-blur-md">
                    <Maximize2 className="w-3.5 h-3.5" style={{ color: 'var(--brand-coral)' }} />
                    <span>Click to View Fullscreen</span>
                  </span>
                </div>
              </div>

              {/* Bottom Full-Width Dark Download Bar (Exact match to screenshot) */}
              <div className="p-0 border-t" style={{ borderColor: 'var(--line)' }}>
                <a
                  href="/assets/resume/Mohamed_Makhlouf_Resume.pdf"
                  download="Mohamed_Makhlouf_Resume.pdf"
                  className="w-full py-3.5 px-4 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 text-white active:scale-[0.99] hover:opacity-90 shadow-inner"
                  style={{ background: '#3b414a' }}
                >
                  <span>DOWNLOAD RESUME</span>
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
