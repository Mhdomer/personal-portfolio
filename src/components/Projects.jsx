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
      title: 'Aegis-2B // Sub-Second AI Safety Circuit Breaker',
      subtitle: 'Dual-tier defense for LLMs and Bedrock agents achieving sub-115ms p99 latency',
      service: 'Amazon Bedrock + AWS Lambda',
      metric: '115ms p99 · 16x Faster',
      github: 'https://github.com/Mhdomer/aegis-2b',
      image: '/assets/projects/aegis-aws-architecture.png',
      caption: 'Dual-tier AI safety architecture: sub-0.8ms regex signature triage followed by quantized 2B SLM verification before Amazon Bedrock foundation model execution.',
      description:
        'Deterministic dual-tier defense pipeline for foundation models on AWS. Fast regex signature triage intercepts prompt injection attacks (OWASP LLM01/LLM04) in sub-0.8ms, routing ambiguous prompts to a quantized 2B SLM verifier before Bedrock invocation. Measured 16x speedup over monolithic LLM guardrails.',
      tags: ['Amazon Bedrock', 'AWS Lambda Container', 'Python 3.12 Boto3', 'Sub-115ms p99'],
      codeFile: 'aegis/dispatcher.py',
      codeLang: 'Python 3.12 (Boto3)',
      code: `# aegis/dispatcher.py
# Sub-115ms fail-closed action dispatcher & tamper-evident audit receipts
import boto3, json, time, hashlib
from dataclasses import dataclass
from typing import Any, Dict

class CircuitBreakerTrippedError(Exception):
    """Halt action mutation when safety thresholds fail."""
    pass

@dataclass
class AuditReceipt:
    timestamp: str
    target_arn: str
    proposed_tool: str
    parameters: Dict[str, Any]
    guardrail_decision: str
    circuit_confidence: float
    execution_status: str
    receipt_hash: str = ""

    def __post_init__(self):
        canonical = f"{self.timestamp}|{self.target_arn}|{self.proposed_tool}|{self.guardrail_decision}|{self.circuit_confidence:.4f}"
        self.receipt_hash = "sha256:" + hashlib.sha256(canonical.encode()).hexdigest()[:16]

def dispatch_cloud_mutation(action_request: dict) -> AuditReceipt:
    # Evaluated in <0.8ms via regex triage, then verified via 2B SLM
    if action_request.get("confidence", 0.0) < 0.85:
        raise CircuitBreakerTrippedError("AI safety score below threshold. Mutation halted.")
    
    # Boto3 execution only on verified certification
    return AuditReceipt(
        timestamp="2026-10-31T14:00:00Z",
        target_arn=action_request["target_arn"],
        proposed_tool=action_request["tool"],
        parameters=action_request.get("params", {}),
        guardrail_decision="ALLOW",
        circuit_confidence=0.98,
        execution_status="EXECUTED"
    )`,
    },
    {
      id: 'a2-remediation',
      title: 'A2 // Autonomous Cloud Compliance & Remediation Engine',
      subtitle: 'Event-driven compliance daemon on EventBridge & Lambda with 352 unit tests',
      service: 'AWS EventBridge + Lambda',
      metric: '8s MTTR · 352 Tests',
      github: 'https://github.com/Mhdomer/aws-compliance-remediation-engine',
      image: '/assets/projects/a2-compliance-architecture.png',
      caption: 'Real-time EventBridge routing of CloudTrail API calls to Lambda with structural loop freedom and least-privilege MCP inspection server.',
      description:
        'Serverless compliance daemon capturing CloudTrail API calls in real time via EventBridge. Automatically reverts public S3 ACLs, restores customer SSE-KMS keys, tags and stops EC2 instances with unencrypted EBS volumes, and revokes open ports 22/3389 with an 8-second MTTR. Includes a read-only MCP agent server verified via Python AST testing and least-privilege IAM policies.',
      tags: ['AWS EventBridge', 'AWS Lambda', 'Python Boto3', 'Terraform', '352 Tests', 'MCP Server'],
      codeFile: 'lambda/handler.py',
      codeLang: 'Python 3.12 (Boto3)',
      code: `# lambda/handler.py
# Event-driven compliance daemon with structural loop prevention
import os, boto3, json, logging

logger = logging.getLogger("a2_compliance_engine")
s3 = boto3.client("s3")

def _is_self_invocation(detail: dict) -> bool:
    """Structural loop freedom: ignore API calls made by the engine itself."""
    engine_role_arn = os.environ.get("ENGINE_ROLE_ARN", "")
    if not engine_role_arn:
        return False
    identity = detail.get("userIdentity", {})
    issuer_arn = identity.get("sessionContext", {}).get("sessionIssuer", {}).get("arn", "")
    if issuer_arn:
        return issuer_arn == engine_role_arn
    role_name = engine_role_arn.rsplit("/", 1)[-1]
    return f":assumed-role/{role_name}/" in identity.get("arn", "")

def lambda_handler(event, context):
    detail = event.get("detail", {})
    if _is_self_invocation(detail):
        return {"status": "SKIPPED_SELF_INVOCATION"}
    
    event_name = detail.get("eventName")
    # Remediate public S3 ACLs in <2.4s MTTR
    if event_name in ("PutBucketAcl", "DeleteBucketPublicAccessBlock"):
        bucket = detail.get("requestParameters", {}).get("bucketName")
        s3.put_public_access_block(
            Bucket=bucket,
            PublicAccessBlockConfiguration={
                "BlockPublicAcls": True, "IgnorePublicAcls": True,
                "BlockPublicPolicy": True, "RestrictPublicBuckets": True
            }
        )
        return {"status": "REMEDIATED", "bucket": bucket, "action": "BLOCK_PUBLIC_ACCESS"}`,
    },
    {
      id: 'secrh-pdms',
      title: 'SECRH // Secure Cloud Patient Data Management System',
      subtitle: 'HIPAA-aligned 3-tier AWS architecture replacing ransomware-compromised legacy servers',
      service: 'AWS 3-Tier (ALB + EC2 + RDS) + Terraform',
      metric: '110 Resources · 0 Drift',
      github: 'https://github.com/Mhdomer/secure-cloud-pdms',
      image: '/assets/projects/secrh-aws-architecture.png',
      caption: 'Full 3-tier AWS architecture in ap-southeast-1: ALB in public subnets, EC2 Docker containers in private app subnets, Multi-AZ RDS PostgreSQL with RLS in isolated DB subnets.',
      description:
        'Solo final-year project (237 of 239 commits) under Dr. Johan Mohamad Sharif at UTM, replacing an on-premise clinic server compromised by ransomware. Built across 11 Terraform modules (110 resources, 0 drift). Enforces two-layer defense in depth: API middleware RBAC plus PostgreSQL Row-Level Security (RLS). Self-conducted pentest uncovered and patched a critical cross-tenant IDOR leak on sick_leaves. Live disaster recovery drill reconstructed infrastructure in 17m40s (target <=25m). Features a 3-stage CI/CD gate with Trivy and Checkov, deploying via AWS SSM and OIDC with zero open ports.',
      tags: ['AWS 3-Tier Architecture', 'PostgreSQL RLS', 'Terraform (110 Resources)', 'OIDC Deployment', 'Checkov 399/399'],
      codeFile: 'infrastructure/terraform/modules/rds/main.tf',
      codeLang: 'HashiCorp HCL (Terraform)',
      code: `# infrastructure/terraform/modules/rds/main.tf
# SECRH Healthcare PDMS: Isolated DB subnet, forced SSL & Multi-AZ RDS
resource "aws_db_subnet_group" "main" {
  name       = "\${var.project_name}-\${var.environment}-db-subnet-group"
  subnet_ids = var.db_subnet_ids # Private isolated subnets across 2 AZs

  tags = merge(var.tags, {
    Name = "\${var.project_name}-\${var.environment}-db-subnet-group"
  })
}

resource "aws_db_parameter_group" "main" {
  name   = "\${var.project_name}-\${var.environment}-pg16"
  family = "postgres16"

  parameter {
    name         = "rds.force_ssl"
    value        = "1"
    apply_method = "immediate"
  }
}

resource "aws_db_instance" "main" {
  identifier              = "\${var.project_name}-\${var.environment}-rds"
  engine                  = "postgres"
  engine_version          = "16.3"
  instance_class          = "db.t4g.micro"
  allocated_storage       = 20
  storage_type            = "gp3"
  storage_encrypted       = true
  kms_key_id              = var.kms_key_arn
  db_subnet_group_name    = aws_db_subnet_group.main.name
  vpc_security_group_ids  = [var.rds_security_group_id]
  parameter_group_name    = aws_db_parameter_group.main.name
  publicly_accessible     = false
  multi_az                = true
  deletion_protection     = true
  skip_final_snapshot     = false
}`,
    },
    {
      id: 'mindcraft-cicd',
      title: 'MindCraft // Three-Tier AWS Migration & Shift-Left Gate',
      subtitle: 'Solo migration of coursework app to 47 Terraform resources with Trivy CVE gating',
      service: 'Terraform + Docker + GitHub Actions',
      metric: 'Exit Code 1 Gate · 47 Resources',
      github: 'https://github.com/Mhdomer/mindcraft-aws-migration',
      image: '/assets/projects/pr1-trivy-gate-blocked.png',
      caption: 'Actual CI/CD execution proof: Trivy scans the Docker container and halts release on CVE-2024-21626 (CRITICAL).',
      description:
        'Solo re-architecture of university team coursework (63 commits by Mohamed, top contributor) from Firebase/Vercel into self-managed 3-tier AWS infrastructure. Provisioned 47 Terraform resources across VPC, ALB, EC2, CloudWatch, Secrets Manager, and ECR. Enforces shift-left container security in GitHub Actions: Trivy halts release on critical CVEs with exit code 1 before deployment via AWS SSM. Documented across 5 Architecture Decision Records (ADRs).',
      tags: ['Trivy Scanner', 'Exit Code 1 Policy', 'Terraform (47 Resources)', 'Docker', 'AWS SSM Deploy'],
      codeFile: '.github/workflows/security-gate.yml',
      codeLang: 'GitHub Actions Workflow (YAML)',
      code: `# .github/workflows/security-gate.yml
# Shift-left CI/CD security gate blocking releases on critical container CVEs
name: Shift-Left DevSecOps Gate
on:
  pull_request:
    branches: [main]

jobs:
  trivy-vulnerability-gate:
    name: Container CVE Hard Gate
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Build Docker Container
        run: docker build -t mindcraft-api:pr-\${{ github.event.pull_request.number }} .

      - name: Run Trivy Vulnerability Scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: mindcraft-api:pr-\${{ github.event.pull_request.number }}
          format: 'table'
          exit-code: '1' # Enforces hard failure on critical/high CVEs
          ignore-unfixed: true
          severity: 'CRITICAL,HIGH'

      - name: Checkov Static IaC Security Scan
        run: |
          pip install checkov
          checkov -d ./terraform --framework terraform --compact --quiet`,
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase leading-[1.18] display">
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
