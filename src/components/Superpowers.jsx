import React from 'react';
import { SectionSakuraHeader } from './DecorativeBranches';

export default function Superpowers() {
  const stackCategories = [
    {
      category: 'Cloud DevSecOps',
      skills: [
        { name: 'AWS EventBridge & Lambda', note: 'Sub-Second Auto-Remediation' },
        { name: 'Terraform (IaC)', note: '110 Resources · 0 Drift' },
        { name: 'AWS IAM & SCPs', note: 'Least-Privilege Design' },
        { name: 'Amazon RDS PostgreSQL', note: 'Row-Level Security (RLS)' },
        { name: 'CloudTrail & CloudWatch', note: 'Centralized Audit Logs' },
      ],
    },
    {
      category: 'AI Security & Defense',
      skills: [
        { name: 'Aegis-2B Engine', note: 'Sub-115ms p99 Latency' },
        { name: 'Amazon Bedrock', note: 'Runtime Interception' },
        { name: 'Quantized 2B SLMs', note: 'Decider Guardrail Model' },
        { name: 'Regex Trie Signatures', note: 'OWASP LLM01 & LLM04' },
      ],
    },
    {
      category: 'Shift-Left CI/CD & Gating',
      skills: [
        { name: 'Trivy Vulnerability Scanner', note: 'Exit Code 1 CVE Blocker' },
        { name: 'Checkov Static Analysis', note: '399 Passed / 0 Failed' },
        { name: 'GitHub Actions (OIDC)', note: 'Zero Stored AWS Keys' },
        { name: 'Docker Multi-Stage', note: 'Non-Root Alpine Hardening' },
        { name: 'AWS Systems Manager (SSM)', note: 'Zero Open Port 22' },
      ],
    },
    {
      category: 'Systems & Networking',
      skills: [
        { name: 'CachyOS Linux (Kernel 6.13+)', note: 'Tuned Workstation' },
        { name: 'Niri Wayland Compositor', note: 'Scrollable Tiling' },
        { name: 'Cisco Networking & VLANs', note: 'CCNA & CCST Certified' },
        { name: 'Wireshark & Packet Forensics', note: 'ASEAN CTF Podium' },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="py-24 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Sakura Branch Adornment */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <SectionSakuraHeader category="Technical Arsenal" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase leading-[1.18] display">
              Tech Stack<br />
              <span style={{ color: 'var(--brand-coral)' }}>I Work With.</span>
            </h2>
            <p className="text-sm mt-3 max-w-xl opacity-75">
              Daily engineering runtimes, cloud platforms, and security tools tested in production and university laboratories.
            </p>
          </div>
        </div>

        {/* Tech Stack Horizontal Table (sharara.me rows) */}
        <div
          className="divide-y border-y font-mono text-xs transition-colors"
          style={{ borderColor: 'var(--line)' }}
        >
          {stackCategories.map((cat, idx) => (
            <div
              key={idx}
              className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start px-2 rounded-lg transition-colors"
              style={{ borderColor: 'var(--line)' }}
            >
              {/* Category Name */}
              <div className="md:col-span-4 uppercase tracking-wider font-bold flex items-center gap-2 opacity-80">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--brand-coral)' }}
                />
                <span>{cat.category}</span>
              </div>

              {/* Skills List */}
              <div className="md:col-span-8 flex flex-wrap gap-2.5">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="px-3 py-1.5 rounded-lg border flex items-center gap-2 transition-all hover:scale-105"
                    style={{
                      background: 'var(--surface)',
                      borderColor: 'var(--line)',
                    }}
                  >
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-[10px] opacity-60 font-sans">/ {skill.note}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
