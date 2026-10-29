import React from 'react';
import { Maximize2, ArrowUpRight } from 'lucide-react';
import { SectionSakuraHeader } from './DecorativeBranches';

export default function Projects({ onSelectImage, onOpenConsole }) {
  const projects = [
    {
      id: 'aegis-2b',
      title: 'Aegis-2B: AI Security Guardrail',
      subtitle: 'Sub-115ms dual-tier defense for LLMs and autonomous agents on AWS',
      category: 'ai-security',
      github: 'https://github.com/Mhdomer/aegis-2b',
      image: '/assets/projects/aegis-web-dashboard.png',
      description:
        'A deterministic defense framework designed for LLM applications. Fast regex trie intercepts signatures in sub-5ms, then routes ambiguous prompts through a quantized 2B parameter SLM verifier before Amazon Bedrock invocation.',
      metric: '115ms p99 Latency',
      tags: ['Python 3.12', 'AWS Bedrock', 'Hugging Face SLM', 'Docker'],
    },
    {
      id: 'a2-remediation',
      title: 'A2: Cloud Remediation Engine',
      subtitle: 'Autonomous event-driven security auto-fix engine with zero human delay',
      category: 'cloud-security',
      github: 'https://github.com/Mhdomer/aws-compliance-remediation-engine',
      image: '/assets/projects/a2-compliance-architecture.png',
      description:
        'Event-driven serverless daemon on EventBridge and Lambda that detects and remediates public S3 ACLs, open security groups (port 22), weak KMS keys, and unencrypted EBS volumes on the triggering CloudTrail event in <2.4 seconds.',
      metric: '< 2.4s MTTR',
      tags: ['AWS EventBridge', 'AWS Lambda', 'Boto3', 'Terraform'],
    },
    {
      id: 'mindcraft-cicd',
      title: 'MindCraft: Trivy Shift-Left CI/CD Gate',
      subtitle: 'Automated GitHub Actions pipeline halting releases on critical container CVEs',
      category: 'cloud-security',
      github: 'https://github.com/Mhdomer/mindcraft-aws-migration',
      image: '/assets/projects/pr1-trivy-gate-blocked.png',
      description:
        'Deterministic security before production. When a Docker image contains critical container vulnerabilities, Trivy returns exit code 1 inside GitHub Actions, preventing unpatched artifacts from reaching AWS EC2 via SSM.',
      metric: 'Exit Code 1 Gate',
      tags: ['Trivy', 'GitHub Actions', 'AWS SSM', 'Docker Alpine'],
    },
    {
      id: 'secrh-healthcare',
      title: 'SECRH: Healthcare IT Network Hardening',
      subtitle: 'Hospital network segmentation and endpoint hardening at Al-Ameen IT, Riyadh',
      category: 'healthcare',
      github: 'https://github.com/Mhdomer',
      image: '/assets/projects/alamin-network-topology.svg',
      description:
        'Multi-clinic field operations in Riyadh. Segmented diagnostic PACS medical equipment from general administration subnets, automated daily backup validation, and achieved 99.98% clinical uptime.',
      metric: '99.98% Uptime',
      tags: ['Network Segmentation', 'VLANs', 'Syslog', 'Endpoint Hardening'],
    },
  ];

  return (
    <section
      id="projects"
      className="py-24 border-t transition-colors duration-300 relative"
      style={{ borderColor: 'var(--line)' }}
    >
      <div id="work" className="absolute -top-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Sakura Branch Adornment */}
        <div className="mb-14">
          <SectionSakuraHeader category="Selected Work" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase leading-none display">
            A Few Things<br />
            <span style={{ color: 'var(--brand-coral)' }}>I've Made.</span>
          </h2>
          <p className="text-sm mt-3 max-w-xl opacity-75">
            Tested repositories and live cloud deployments. Click any card preview to inspect full-resolution architecture proofs.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <div
              key={p.id}
              className="editorial-card rounded-2xl p-6 flex flex-col justify-between group relative"
            >
              <div>
                {/* Image Frame */}
                <div
                  onClick={() => onSelectImage(p.image, p.title)}
                  className="rounded-xl overflow-hidden border aspect-video mb-5 cursor-pointer relative flex items-center justify-center group/img"
                  style={{
                    background: 'var(--paper-deep)',
                    borderColor: 'var(--line)',
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover object-top opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-mono text-white">
                    <Maximize2 className="w-4 h-4" style={{ color: 'var(--brand-coral)' }} />
                    <span>Expand High-Res</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight group-hover:opacity-80 transition-opacity">
                    {p.title}
                  </h3>
                  <span
                    className="px-2.5 py-0.5 rounded-full border text-xs font-mono font-semibold shrink-0"
                    style={{
                      background: 'var(--surface-soft)',
                      borderColor: 'var(--line)',
                      color: 'var(--brand-coral)',
                    }}
                  >
                    {p.metric}
                  </span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed opacity-80 mb-4">
                  {p.description}
                </p>
              </div>

              {/* Bottom Tags & Link */}
              <div
                className="pt-4 border-t flex items-center justify-between gap-2"
                style={{ borderColor: 'var(--line)' }}
              >
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded border"
                      style={{
                        background: 'var(--surface-soft)',
                        borderColor: 'var(--line)',
                        opacity: 0.85,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-1 group/btn shrink-0 hover:opacity-80 transition-opacity"
                  >
                    <span>Open Project</span>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                      style={{ color: 'var(--brand-coral)' }}
                    />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
