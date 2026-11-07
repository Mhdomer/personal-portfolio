import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionSakuraHeader } from './DecorativeBranches';

const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

export default function Superpowers({ onSelectProof }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const stackCategories = [
    {
      category: 'Cloud DevSecOps',
      skills: [
        {
          name: 'AWS EventBridge & Lambda',
          note: 'Sub-Second Auto-Remediation',
          hint: 'Inspect A2 Live Drift Fix trace (8s MTTR)',
          proof: {
            type: 'project',
            systemId: 'a2-remediation',
            innerView: 'diagram',
            traceMode: 'normal',
          },
        },
        {
          name: 'Terraform (IaC)',
          note: '110 Resources · 0 Drift',
          hint: 'Inspect SECRH Terraform RDS module (Pin 01)',
          proof: {
            type: 'project',
            systemId: 'secrh-pdms',
            innerView: 'code',
            pinId: 'subnet',
          },
        },
        {
          name: 'AWS IAM & SCPs',
          note: 'Least-Privilege Design',
          hint: 'Inspect A2 caller-identity ARN guard (Pin 01)',
          proof: {
            type: 'project',
            systemId: 'a2-remediation',
            innerView: 'code',
            pinId: 'loop',
          },
        },
        {
          name: 'Amazon RDS PostgreSQL',
          note: 'Row-Level Security (RLS)',
          hint: 'Inspect SECRH IDOR / PostgreSQL RLS attack trace',
          proof: {
            type: 'project',
            systemId: 'secrh-pdms',
            innerView: 'diagram',
            traceMode: 'attack',
          },
        },
        {
          name: 'CloudTrail & CloudWatch',
          note: 'Centralized Audit Logs',
          hint: 'Inspect A2 CloudTrail loop-guard trace',
          proof: {
            type: 'project',
            systemId: 'a2-remediation',
            innerView: 'diagram',
            traceMode: 'attack',
          },
        },
      ],
    },
    {
      category: 'AI Security & Defense',
      skills: [
        {
          name: 'Aegis-2B Engine',
          note: 'Sub-115ms p99 Latency',
          hint: 'Inspect Aegis-2B Verified Tool Call trace (114.5ms p99)',
          proof: {
            type: 'project',
            systemId: 'aegis-2b',
            innerView: 'diagram',
            traceMode: 'normal',
          },
        },
        {
          name: 'Amazon Bedrock',
          note: 'Runtime Interception',
          hint: 'Inspect Aegis-2B fail-closed Bedrock gate (Pin 01)',
          proof: {
            type: 'project',
            systemId: 'aegis-2b',
            innerView: 'code',
            pinId: 'breaker',
          },
        },
        {
          name: 'Quantized 2B SLMs',
          note: 'Decider Guardrail Model',
          hint: 'Inspect Aegis-2B 0.85 SLM confidence gate (Pin 03)',
          proof: {
            type: 'project',
            systemId: 'aegis-2b',
            innerView: 'code',
            pinId: 'gate',
          },
        },
        {
          name: 'Regex Trie Signatures',
          note: 'OWASP LLM01 & LLM04',
          hint: 'Inspect Aegis-2B Prompt Injection trace (0.74ms block)',
          proof: {
            type: 'project',
            systemId: 'aegis-2b',
            innerView: 'diagram',
            traceMode: 'attack',
          },
        },
      ],
    },
    {
      category: 'Shift-Left CI/CD & Gating',
      skills: [
        {
          name: 'Trivy Vulnerability Scanner',
          note: 'Exit Code 1 CVE Blocker',
          hint: 'Inspect MindCraft CVE-2024-21626 Exit Code 1 trace',
          proof: {
            type: 'project',
            systemId: 'mindcraft-cicd',
            innerView: 'diagram',
            traceMode: 'attack',
          },
        },
        {
          name: 'Checkov Static Analysis',
          note: '399 Passed / 0 Failed',
          hint: 'Inspect MindCraft Checkov IaC gate (Pin 03)',
          proof: {
            type: 'project',
            systemId: 'mindcraft-cicd',
            innerView: 'code',
            pinId: 'checkov',
          },
        },
        {
          name: 'GitHub Actions (OIDC)',
          note: 'Zero Stored AWS Keys',
          hint: 'Inspect MindCraft keyless AWS SSM OIDC node',
          proof: {
            type: 'project',
            systemId: 'mindcraft-cicd',
            innerView: 'diagram',
            traceMode: 'normal',
            nodeId: 'ssm',
          },
        },
        {
          name: 'Docker Multi-Stage',
          note: 'Non-Root Alpine Hardening',
          hint: 'Inspect MindCraft pre-registry PR build (Pin 01)',
          proof: {
            type: 'project',
            systemId: 'mindcraft-cicd',
            innerView: 'code',
            pinId: 'prbuild',
          },
        },
        {
          name: 'AWS Systems Manager (SSM)',
          note: 'Zero Open Port 22',
          hint: 'Inspect SECRH private SSM deployment node (no Port 22)',
          proof: {
            type: 'project',
            systemId: 'secrh-pdms',
            innerView: 'diagram',
            traceMode: 'normal',
            nodeId: 'ssm',
          },
        },
      ],
    },
    {
      category: 'Systems & Networking',
      skills: [
        {
          name: 'CachyOS Linux (Kernel 6.13+)',
          note: 'Tuned Workstation',
          hint: 'Jump to Linux & POSIX systems mentoring record',
          proof: {
            type: 'achievement',
            achievementId: 'linux',
          },
        },
        {
          name: 'Niri Wayland Compositor',
          note: 'Scrollable Tiling',
          hint: 'Jump to CachyOS & Niri Wayland walkthroughs record',
          proof: {
            type: 'achievement',
            achievementId: 'linux',
          },
        },
        {
          name: 'Cisco Networking & VLANs',
          note: 'CCNA & CCST Certified',
          hint: 'Jump to Al-Ameen PACS clinical subnet segmentation',
          proof: {
            type: 'achievement',
            achievementId: 'alameen',
          },
        },
        {
          name: 'Wireshark & Packet Forensics',
          note: 'ASEAN CTF Podium',
          hint: 'Jump to ASEAN Cyber Race 2025 Finals podium',
          proof: {
            type: 'achievement',
            achievementId: 'asean',
          },
        },
      ],
    },
  ];

  const handleSkillClick = (skill) => {
    if (!onSelectProof || !skill.proof) return;
    onSelectProof({
      ...skill.proof,
      skillName: skill.name,
      token: Date.now(),
    });
  };

  return (
    <section
      id="skills"
      className="py-24 scroll-mt-20 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Sakura Branch Adornment */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <SectionSakuraHeader category="Technical Arsenal" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase leading-[1.18] display">
              <span className="block overflow-hidden pb-1 -mb-1">
                <motion.span
                  className="block"
                  initial={prefersReducedMotion ? false : { y: '105%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.54, ease: EDITORIAL_EASE }}
                >
                  Tech Stack
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1 -mb-1">
                <motion.span
                  className="block"
                  style={{ color: 'var(--brand-coral)' }}
                  initial={prefersReducedMotion ? false : { y: '105%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.54, delay: 0.07, ease: EDITORIAL_EASE }}
                >
                  I Work With.
                </motion.span>
              </span>
            </h2>
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.75, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.48, delay: 0.14, ease: EDITORIAL_EASE }}
              className="text-sm mt-3 max-w-xl opacity-75"
            >
              Daily engineering runtimes, cloud platforms, and security tools tested in production and university laboratories.
            </motion.p>
          </div>

          <div className="text-[11px] font-mono uppercase tracking-wider opacity-65 flex items-center gap-1.5">
            <ArrowUpRight className="w-3.5 h-3.5" style={{ color: 'var(--brand-coral)' }} />
            <span>Click any tool to inspect live proof</span>
          </div>
        </div>

        {/* Tech Stack Horizontal Table (sharara.me rows) */}
        <div
          className="divide-y border-y font-mono text-xs transition-colors"
          style={{ borderColor: 'var(--line)' }}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {stackCategories.map((cat, idx) => {
            const isDimmed = hoveredIdx !== null && hoveredIdx !== idx;
            return (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.46, delay: idx * 0.07, ease: EDITORIAL_EASE }}
                onMouseEnter={() => setHoveredIdx(idx)}
                style={{ borderColor: 'var(--line)' }}
              >
                <div
                  className={`py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start px-2 rounded-lg transition-opacity duration-200 ${
                    isDimmed ? 'md:opacity-55' : 'opacity-100'
                  }`}
                >
                  {/* Category Name */}
                  <div className="md:col-span-4 uppercase tracking-wider font-bold flex items-center gap-2 opacity-80">
                    <span
                      className="w-1.5 h-1.5 rounded-full transition-transform duration-200"
                      style={{
                        background: 'var(--brand-coral)',
                        transform: hoveredIdx === idx ? 'scale(1.35)' : 'scale(1)',
                      }}
                    />
                    <span>{cat.category}</span>
                  </div>

                  {/* Interactive Proof-Linked Skills List */}
                  <div className="md:col-span-8 flex flex-wrap gap-2.5">
                    {cat.skills.map((skill, sIdx) => (
                      <motion.button
                        key={sIdx}
                        type="button"
                        onClick={() => handleSkillClick(skill)}
                        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                        title={skill.hint}
                        data-testid={`skill-proof-${idx}-${sIdx}`}
                        className="group px-3 py-1.5 rounded-lg border border-[var(--line)] hover:border-[var(--brand-coral)] flex items-center gap-2 text-left transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--brand-coral)]"
                        style={{
                          background: 'var(--surface)',
                        }}
                      >
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-[10px] opacity-60 font-sans">/ {skill.note}</span>
                        <ArrowUpRight
                          className="w-3 h-3 opacity-35 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0"
                          style={{ color: 'var(--brand-coral)' }}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
