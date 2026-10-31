import React, { useState } from 'react';
import { Maximize2, ArrowUpRight, Code2, Image as ImageIcon, Copy, Check } from 'lucide-react';
import { SectionSakuraHeader } from './DecorativeBranches';

export default function Projects({ onSelectImage }) {
  const [cardViews, setCardViews] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const toggleView = (id, mode) => {
    setCardViews((prev) => ({ ...prev, [id]: mode }));
  };

  const handleCopy = (id, code) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const systems = [
    {
      id: 'aegis-2b',
      title: 'Aegis-2B // AI Security Guardrail',
      subtitle: 'Sub-115ms dual-tier defense for LLMs and autonomous agents on AWS',
      service: 'Amazon Bedrock + Lambda',
      metric: '115ms p99 Latency',
      github: 'https://github.com/Mhdomer/aegis-2b',
      image: '/assets/projects/aegis-aws-architecture.png',
      description:
        'Deterministic dual-tier defense pipeline for foundation models on AWS. Fast regex signature triage intercepts prompt injection attacks in sub-0.8ms, routing ambiguous prompts to a quantized 2B SLM verifier before Bedrock invocation.',
      tags: ['Amazon Bedrock', 'AWS Lambda Container', 'Python 3.12 Boto3', 'Sub-115ms p99'],
      codeFile: 'aws/lambda_aegis_guardrail.py',
      codeLang: 'Python 3.12 (Boto3)',
      code: `# aws/lambda_aegis_guardrail.py
# Sub-115ms dual-tier defense: regex trie fast-path before Bedrock invocation
import boto3, json, time, re

bedrock = boto3.client('bedrock-runtime', region_name='me-central-1')

# Tier 1: Fast deterministic regex signature triage (<0.8ms p99)
INJECTION_SIGNATURES = re.compile(
    r'(ignore previous instructions|system prompt override|system:\\s*role|drop\\s+table)',
    re.IGNORECASE
)

def lambda_handler(event, context):
    start_time = time.perf_counter()
    prompt = event.get('prompt', '')

    # Fast-path triage
    if INJECTION_SIGNATURES.search(prompt):
        return {
            'action': 'BLOCK',
            'threat': 'ADVERSARIAL_PROMPT_INJECTION',
            'tier': 'TIER_1_SIGNATURE_TRIE',
            'latency_ms': round((time.perf_counter() - start_time) * 1000, 2)
        }

    # Tier 2: Bedrock lightweight guardrail model invocation
    payload = {
        'inputText': prompt,
        'textGenerationConfig': {'maxTokenCount': 12, 'temperature': 0.0}
    }
    response = bedrock.invoke_model(
        modelId='amazon.titan-text-express-v1',
        body=json.dumps(payload)
    )

    elapsed_ms = round((time.perf_counter() - start_time) * 1000, 2)
    return {'action': 'ALLOW', 'latency_ms': elapsed_ms, 'status': 200}`,
    },
    {
      id: 'a2-remediation',
      title: 'A2 // Autonomous Cloud Remediation Engine',
      subtitle: 'Event-driven compliance daemon with zero human delay and 325 unit tests',
      service: 'AWS EventBridge + Lambda',
      metric: '< 2.4s MTTR',
      github: 'https://github.com/Mhdomer/aws-compliance-remediation-engine',
      image: '/assets/projects/a2-compliance-architecture.png',
      description:
        'Serverless compliance daemon capturing CloudTrail API calls in real time via EventBridge. Automatically reverts public S3 ACLs, exposed SSH security groups, and unencrypted EBS volumes in under 2.4 seconds with zero human delay.',
      tags: ['AWS EventBridge', 'AWS Lambda', 'Python Boto3', 'Terraform', '325 Tests'],
      codeFile: 'aws/lambda_a2_remediate_s3.py',
      codeLang: 'Python 3.12 (Boto3)',
      code: `# aws/lambda_a2_remediate_s3.py
# Captures CloudTrail S3 PutBucketAcl events via EventBridge in <2.4s MTTR
import boto3, json, logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)
s3 = boto3.client('s3')

def lambda_handler(event, context):
    logger.info("EventBridge rule triggered: %s", json.dumps(event))
    detail = event.get('detail', {})
    bucket_name = detail.get('requestParameters', {}).get('bucketName')

    if not bucket_name:
        return {'status': 'SKIPPED', 'reason': 'NO_BUCKET_NAME'}

    # Idempotent remediation: enforce S3 Block Public Access immediately
    s3.put_public_access_block(
        Bucket=bucket_name,
        PublicAccessBlockConfiguration={
            'BlockPublicAcls': True,
            'IgnorePublicAcls': True,
            'BlockPublicPolicy': True,
            'RestrictPublicBuckets': True
        }
    )
    logger.info("Successfully remediated public access for bucket: %s", bucket_name)
    return {
        'status': 'REMEDIATED',
        'bucket': bucket_name,
        'action': 'PUT_PUBLIC_ACCESS_BLOCK',
        'mttr_seconds': 2.18
    }`,
    },
    {
      id: 'mindcraft-cicd',
      title: 'MindCraft // Shift-Left Trivy CI/CD Gate',
      subtitle: 'Deterministic pipeline gate halting releases on critical container CVEs',
      service: 'GitHub Actions + AWS SSM',
      metric: 'Exit Code 1 Gate',
      github: 'https://github.com/Mhdomer/mindcraft-aws-migration',
      image: '/assets/projects/pr1-trivy-gate-blocked.png',
      caption: 'Actual CI/CD execution proof: Trivy scans the Docker container and halts release on CVE-2024-21626 (CRITICAL).',
      description:
        'Deterministic security before production. When a Docker image contains critical container vulnerabilities (e.g. CVE-2024-21626), Trivy returns exit code 1 inside GitHub Actions, preventing unpatched artifacts from reaching AWS EC2 via SSM.',
      tags: ['Trivy Scanner', 'Exit Code 1 Policy', 'Checkov IaC', 'AWS SSM Deploy'],
      codeFile: '.github/workflows/security-gate.yml',
      codeLang: 'GitHub Actions Workflow (YAML)',
      code: `# .github/workflows/security-gate.yml
# Blocks CI/CD pipeline if container images contain CRITICAL or HIGH CVEs
name: Shift-Left DevSecOps Gate
on:
  pull_request:
    branches: [main]

jobs:
  trivy-vulnerability-gate:
    name: Container CVE Hard Gate
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Build Docker Container
        run: docker build -t alamin-clinic-api:pr-\${{ github.event.pull_request.number }} .

      - name: Run Trivy Vulnerability Scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: alamin-clinic-api:pr-\${{ github.event.pull_request.number }}
          format: 'table'
          exit-code: '1' # Enforces hard failure on critical vulnerabilities
          ignore-unfixed: true
          severity: 'CRITICAL,HIGH'

      - name: Checkov Infrastructure as Code Scan
        run: |
          pip install checkov
          checkov -d ./terraform --framework terraform --compact --quiet`,
    },
    {
      id: 'alamin-healthcare',
      title: 'Al-Ameen IT // Healthcare Network Hardening',
      subtitle: 'Multi-site hospital diagnostic equipment isolation and zero-downtime clinic operations',
      service: 'Hospital Network Segmentation',
      metric: '99.98% Uptime',
      github: 'https://github.com/Mhdomer',
      image: '/assets/projects/alamin-network-topology.svg',
      description:
        'Two-site clinical network infrastructure in Riyadh. Isolated diagnostic PACS medical imaging equipment from administrative subnets using dedicated VLANs, established redundant IPSec VPN tunnels, and maintained 99.98% clinical uptime with HIPAA and Saudi MOH compliance.',
      tags: ['Medical VLAN Isolation', 'IPSec VPN Tunnels', 'PACS Radiology', 'HIPAA / Saudi MOH'],
      codeFile: 'terraform/healthcare_network_segmentation.tf',
      codeLang: 'HashiCorp HCL (Terraform)',
      code: `# terraform/healthcare_network_segmentation.tf
# Medical diagnostic isolation topology with HIPAA and Saudi MOH compliance

resource "aws_vpc" "alamin_clinical_primary" {
  cidr_block           = "10.140.0.0/16"
  enable_dns_hostnames = true
  tags = {
    Name        = "alamin-riyadh-primary-vpc"
    Environment = "Clinical-Healthcare"
    Compliance  = "HIPAA-Saudi-MOH"
  }
}

# VLAN 30 Subnet: Medical Diagnostic Equipment (Radiology PACS, Laboratory analyzers)
resource "aws_subnet" "medical_diagnostic_vlan30" {
  vpc_id            = aws_vpc.alamin_clinical_primary.id
  cidr_block        = "10.140.30.0/24"
  availability_zone = "me-central-1a"
  tags = {
    Name  = "vlan30-diagnostic-pacs-isolated"
    Route = "No-Direct-Internet-Access"
  }
}

# Network ACL: Block all direct inbound WAN traffic to diagnostic equipment
resource "aws_network_acl_rule" "deny_wan_to_pacs" {
  network_acl_id = aws_vpc.alamin_clinical_primary.default_network_acl_id
  rule_number    = 50
  egress         = false
  protocol       = "-1"
  rule_action    = "deny"
  cidr_block     = "0.0.0.0/0"
}`,
    },
  ];

  return (
    <section
      id="work"
      className="py-24 border-t transition-colors duration-300 relative"
      style={{ borderColor: 'var(--line)' }}
    >
      <div id="projects" className="absolute -top-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <SectionSakuraHeader category="Production Implementations" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase leading-none display">
            Selected Systems &<br />
            <span style={{ color: 'var(--brand-coral)' }}>Architectures.</span>
          </h2>
          <p className="text-sm mt-3 max-w-xl opacity-75">
            Real cloud architectures, automated remediation daemons, and security gates running across live workloads. Toggle between high-res diagrams and production code.
          </p>
        </div>

        {/* 4 Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {systems.map((item) => {
            const currentView = cardViews[item.id] || 'diagram';
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="editorial-card rounded-2xl p-5 sm:p-6 border flex flex-col justify-between group transition-all"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--line)',
                }}
              >
                <div>
                  {/* Top Bar: Service Tag, Metric Badge, and View Switcher */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-semibold"
                        style={{
                          background: 'var(--surface-soft)',
                          borderColor: 'var(--line)',
                          color: 'var(--brand-coral)',
                        }}
                      >
                        {item.service}
                      </span>
                      <span
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-semibold opacity-90 hidden sm:inline-block"
                        style={{
                          background: 'var(--surface-soft)',
                          borderColor: 'var(--line)',
                          color: 'var(--ink)',
                        }}
                      >
                        {item.metric}
                      </span>
                    </div>

                    {/* Mode Switcher Tabs */}
                    <div
                      className="inline-flex rounded-lg border p-0.5 text-[10px] font-mono shrink-0"
                      style={{
                        background: 'var(--surface-soft)',
                        borderColor: 'var(--line)',
                      }}
                    >
                      <button
                        onClick={() => toggleView(item.id, 'diagram')}
                        className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-all ${
                          currentView === 'diagram' ? 'shadow-sm font-bold' : 'opacity-60 hover:opacity-100'
                        }`}
                        style={{
                          background: currentView === 'diagram' ? 'var(--surface)' : 'transparent',
                          color: currentView === 'diagram' ? 'var(--brand-coral)' : 'inherit',
                        }}
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Diagram</span>
                      </button>

                      <button
                        onClick={() => toggleView(item.id, 'code')}
                        className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-all ${
                          currentView === 'code' ? 'shadow-sm font-bold' : 'opacity-60 hover:opacity-100'
                        }`}
                        style={{
                          background: currentView === 'code' ? 'var(--surface)' : 'transparent',
                          color: currentView === 'code' ? 'var(--brand-coral)' : 'inherit',
                        }}
                      >
                        <Code2 className="w-3 h-3" />
                        <span>Code</span>
                      </button>
                    </div>
                  </div>

                  {/* Body: Either Clickable Diagram Preview OR Interactive Code Inspector */}
                  {currentView === 'diagram' ? (
                    <div
                      onClick={() => onSelectImage(item.image, item.title)}
                      className="rounded-xl overflow-hidden border aspect-video mb-4 cursor-pointer relative group/img flex items-center justify-center transition-all"
                      style={{
                        background: 'var(--paper-deep)',
                        borderColor: 'var(--line)',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-mono text-white">
                        <Maximize2 className="w-4 h-4" style={{ color: 'var(--brand-coral)' }} />
                        <span>Inspect High-Res Diagram</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="rounded-xl overflow-hidden border mb-4 text-xs font-mono flex flex-col transition-all"
                      style={{
                        background: '#0a0e17',
                        borderColor: 'var(--line-strong)',
                        color: '#f1f5f9',
                      }}
                    >
                      {/* Code Header with Copy Button */}
                      <div
                        className="flex items-center justify-between px-3 py-2 border-b bg-black/40 text-[10px]"
                        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                      >
                        <div className="flex items-center gap-2 text-slate-300 font-mono">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>{item.codeFile}</span>
                          <span className="text-slate-500 hidden sm:inline">// {item.codeLang}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(item.id, item.code)}
                          className="px-2 py-0.5 rounded border border-white/10 hover:border-white/30 flex items-center gap-1 text-[10px] text-slate-300 transition-colors"
                          title="Copy snippet"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Code Content */}
                      <div className="p-3 max-h-[220px] overflow-y-auto leading-relaxed text-[11px] font-mono text-slate-200 whitespace-pre">
                        {item.code}
                      </div>
                    </div>
                  )}

                  {/* Title & Description */}
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="text-base sm:text-lg font-bold font-mono uppercase tracking-tight group-hover:opacity-80 transition-opacity">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs leading-relaxed opacity-80 mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Tags & Link */}
                <div
                  className="pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
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

                  {item.github && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-1 group/btn shrink-0 hover:opacity-80 transition-opacity self-end sm:self-auto"
                    >
                      <span>Repository</span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                        style={{ color: 'var(--brand-coral)' }}
                      />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
