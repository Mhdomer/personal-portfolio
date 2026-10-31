import React from 'react';
import { Download, ExternalLink, Maximize2 } from 'lucide-react';
import { SectionSakuraHeader } from './DecorativeBranches';

export default function About({ onSelectImage, onOpenResume }) {
  const achievements = [
    {
      title: "UTM DEAN'S LIST // CGPA 3.43",
      category: 'Academic Honor',
      description:
        'Senior Computer Science student specializing in Networks and Security at Universiti Teknologi Malaysia (UTM). Maintained high academic standing with focus on distributed systems, memory management, and network protocols.',
    },
    {
      title: '3RD PLACE // ASEAN CYBER RACE 2025 FINALS',
      category: 'International CTF Podium',
      description:
        'Represented UTM in the international finals (Cisco Networking Academy) in November 2025. Solved competitive challenges spanning cloud infrastructure misconfigurations, packet payload forensics with Wireshark, and reverse engineering.',
    },
    {
      title: 'AL-AMEEN MEDICAL COMPLEX IT // RIYADH',
      category: 'Healthcare Infrastructure',
      description:
        'Industrial Training in clinical outpatient IT operations. Segmented diagnostic PACS medical subnets from administrative networks, hardened multi-clinic endpoints, and automated backup validation to protect patient health records.',
    },
    {
      title: 'PEER TUTORING & "OMAR DOCUMENTS"',
      category: 'Knowledge Sharing',
      description:
        'Conducted weekly peer tutoring sessions for junior CS students at UTM in C++, data structures, and POSIX operating system fundamentals. Creating bilingual technical walkthroughs on YouTube covering CachyOS Linux, Niri Wayland, and cloud architectures.',
    },
  ];

  return (
    <section
      id="experience"
      className="py-24 border-t transition-colors duration-300"
      style={{ borderColor: 'var(--line)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Achievements (sharara.me editorial layout) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <SectionSakuraHeader category="Proven Track Record" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase leading-[1.12] display">
                Experience &<br />
                <span style={{ color: 'var(--brand-coral)' }}>Achievements.</span>
              </h2>
            </div>

            <div className="space-y-6">
              {achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="space-y-1.5 pb-6 border-b last:border-none"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-bold font-mono uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded border"
                      style={{
                        background: 'var(--surface)',
                        borderColor: 'var(--line)',
                        color: 'var(--brand-coral)',
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-80">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Clean Framed Resume Card (Exact match to screenshot) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="text-xs font-mono font-bold uppercase tracking-widest mb-4 opacity-60">
              RESUME
            </div>

            <div
              className="rounded-3xl overflow-hidden shadow-2xl border flex flex-col group transition-all"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--line)',
              }}
              data-testid="card-resume-preview"
            >
              {/* Document Image Container with rounded top white paper sheet */}
              <div
                className="relative overflow-hidden cursor-pointer bg-white transition-transform duration-300 group-hover:scale-[1.01]"
                style={{
                  borderTopLeftRadius: '22px',
                  borderTopRightRadius: '22px',
                }}
                onClick={() =>
                  onOpenResume
                    ? onOpenResume()
                    : onSelectImage &&
                      onSelectImage(
                        '/assets/resume/resume-preview.png',
                        'Mohamed Makhlouf // Cloud DevSecOps & AI Security Resume'
                      )
                }
              >
                <img
                  src="/assets/resume/resume-preview.png"
                  alt="Mohamed Makhlouf Resume"
                  className="w-full h-auto object-top object-contain block select-text"
                />

                {/* Inspect Overlay on Hover */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span
                    className="px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold border shadow-xl flex items-center gap-1.5 backdrop-blur-md"
                    style={{
                      background: 'var(--button-bg)',
                      color: 'var(--button-fg)',
                      borderColor: 'var(--line)',
                    }}
                  >
                    <Maximize2 className="w-3.5 h-3.5" style={{ color: 'var(--brand-coral)' }} />
                    <span>Click to View Interactive ATS Resume</span>
                  </span>
                </div>
              </div>

              {/* Bottom Action Footer Bar */}
              <div
                className="p-3 sm:p-4 border-t flex items-center gap-2.5"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--line)',
                }}
              >
                <a
                  href="/assets/resume/Mohamed_Makhlouf_Resume.pdf"
                  download="Mohamed_Makhlouf_Resume.pdf"
                  className="flex-1 py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 text-white hover:opacity-90"
                  style={{ background: 'var(--brand-coral)' }}
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD RESUME</span>
                </a>
                <button
                  type="button"
                  onClick={() =>
                    onOpenResume
                      ? onOpenResume()
                      : window.open('/assets/resume/Mohamed_Makhlouf_Resume.pdf', '_blank')
                  }
                  className="py-3 px-4 rounded-xl border font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 hover:opacity-80 active:scale-95"
                  style={{
                    background: 'var(--surface-soft)',
                    borderColor: 'var(--line)',
                    color: 'var(--ink)',
                  }}
                  title="Open interactive 1-page PDF modal"
                >
                  <ExternalLink className="w-4 h-4" style={{ color: 'var(--brand-coral)' }} />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
