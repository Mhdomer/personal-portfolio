import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { SectionSakuraHeader } from './DecorativeBranches';

export default function Superpowers({ onOpenConsole }) {
  const stackCategories = [
    {
      category: 'Cloud DevSecOps',
      skills: [
        { name: 'AWS EventBridge', note: 'Drift Routing' },
        { name: 'AWS Lambda (Python 3.12 Boto3)', note: 'Auto-Remediation' },
        { name: 'AWS IAM', note: 'Least-Privilege & SCP' },
        { name: 'Terraform', note: 'Immutable IaC' },
        { name: 'Amazon S3 & CloudWatch', note: 'Encrypted Audits' },
      ],
    },
    {
      category: 'AI Security & Defense',
      skills: [
        { name: 'Aegis-2B Engine', note: 'Sub-115ms p99 Latency' },
        { name: 'Amazon Bedrock', note: 'Runtime Interception' },
        { name: 'Hugging Face SLMs', note: 'Quantized 2B Models' },
        { name: 'Regex Trie Signatures', note: 'OWASP LLM01 & LLM04' },
      ],
    },
    {
      category: 'Shift-Left CI/CD & Gating',
      skills: [
        { name: 'Trivy', note: 'Container CVE Blocker' },
        { name: 'Checkov', note: 'Static IaC Scans' },
        { name: 'GitHub Actions', note: 'Exit Code 1 Gates' },
        { name: 'Docker', note: 'Alpine Hardening' },
        { name: 'AWS Systems Manager (SSM)', note: 'Fleet Deploy' },
      ],
    },
    {
      category: 'Systems & Workstation',
      skills: [
        { name: 'CachyOS Linux (Kernel 6.13+)', note: 'Tuned Workstation' },
        { name: 'Niri Wayland', note: 'Scrollable Tiling' },
        { name: 'POSIX Shell (Bash, Sed, Awk)', note: 'Automation' },
        { name: 'Wireshark & Packet Forensics', note: 'CTF Finals' },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="py-24 border-t transition-colors duration-300"
      style={{ borderColor: 'var(--line)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Sakura Branch Adornment */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <SectionSakuraHeader category="Technical Arsenal" />
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase leading-none display">
              Tech Stack<br />
              <span style={{ color: 'var(--brand-coral)' }}>I Work With.</span>
            </h2>
            <p className="text-sm mt-3 max-w-xl opacity-75">
              Daily engineering runtimes, cloud platforms, and security tools tested in production and university laboratories.
            </p>
          </div>

          <button
            onClick={onOpenConsole}
            className="self-start md:self-auto px-5 py-2.5 rounded-full border text-xs font-mono flex items-center gap-2 transition-all shadow-sm hover:scale-105 group"
            style={{
              background: 'var(--surface-soft)',
              borderColor: 'var(--line)',
              color: 'var(--ink)',
            }}
          >
            <ShieldCheck
              className="w-4 h-4 group-hover:scale-110 transition-transform"
              style={{ color: 'var(--brand-coral)' }}
            />
            <span>Launch Interactive Security Lab</span>
            <span style={{ color: 'var(--brand-coral)' }}>→</span>
          </button>
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
