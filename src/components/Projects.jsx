import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion';
import { Maximize2, ArrowUpRight, Code2, GitBranch, Volume2, VolumeX, Eye, X } from 'lucide-react';
import { SectionSakuraHeader } from './DecorativeBranches';
import InteractiveArchitectureTrace from './InteractiveArchitectureTrace';
import AnnotatedCodeSpec from './AnnotatedCodeSpec';

const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

function SpringHeightFrame({ children }) {
  const prefersReducedMotion = useReducedMotion();
  const contentRef = useRef(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;

    const measure = (entries) => {
      const boxHeight =
        entries?.[0]?.borderBoxSize?.[0]?.blockSize ?? el.getBoundingClientRect().height;
      const next = Math.round(boxHeight);
      if (next > 0) {
        setHeight((prev) => (prev === next ? prev : next));
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={false}
      animate={prefersReducedMotion || height === null ? { height: 'auto' } : { height }}
      transition={{ type: 'spring', stiffness: 380, damping: 36, mass: 0.7 }}
      className="overflow-hidden"
    >
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}

function ViewportVideo({ src, poster, isMuted }) {
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView) {
      el.play()?.catch(() => {});
    } else {
      el.pause();
    }
  }, [inView, src]);

  return (
    <video
      ref={videoRef}
      loop
      muted={isMuted}
      playsInline
      preload="metadata"
      poster={poster}
      src={src}
      className="w-full h-full object-cover"
    />
  );
}

export default function Projects({ onSelectImage, proofRequest }) {
  const prefersReducedMotion = useReducedMotion();
  const workbenchRef = useRef(null);
  const [activeId, setActiveId] = useState('secrh-pdms');
  const [innerView, setInnerView] = useState('preview'); // 'preview' | 'diagram' | 'code'
  const [isMuted, setIsMuted] = useState(true);
  const [codePinId, setCodePinId] = useState(null);
  const [activeProof, setActiveProof] = useState(null);

  useEffect(() => {
    if (!proofRequest || proofRequest.type !== 'project') return;

    setActiveId(proofRequest.systemId);
    setInnerView(proofRequest.innerView || 'diagram');
    setCodePinId(proofRequest.pinId || null);
    setActiveProof(proofRequest);

    requestAnimationFrame(() => {
      const el = workbenchRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const targetY = Math.max(0, Math.round(rect.top + window.scrollY - 88));
      window.scrollTo({
        top: targetY,
        behavior: prefersReducedMotion ? 'instant' : 'smooth',
      });
    });
  }, [proofRequest?.token, prefersReducedMotion]);

  const systems = [
    {
      id: 'secrh-pdms',
      tabLabel: 'SECRH PDMS',
      kicker: '01 · FINAL YEAR PROJECT · UTM · 2026',
      title: 'SECRH: SECURE CLOUD PDMS',
      subtitle: 'A HIPAA-aligned 3-tier AWS architecture replacing an on-premise clinic server compromised by ransomware.',
      service: 'AWS 3-Tier (ALB + EC2 + RDS) + Terraform',
      metric: '110 Resources · 0 Drift',
      github: 'https://github.com/Mhdomer/secure-cloud-pdms',
      previewImage: '/assets/projects/secrh-patient-dashboard.webp',
      diagramImage: '/assets/projects/secrh-aws-architecture.webp',
      videoSrc: '/assets/projects/secrh-showcase.mp4',
      problem:
        'Alamin Clinic in Riyadh ran patient records on a single on-premise server. In May 2023, a ransomware attack took it down for 5 days with unrecoverable data loss. Legacy records lacked encryption at rest, network access tiers, and offsite disaster recovery.',
      whatIBuilt:
        'Solo architected and deployed a hardened 3-tier AWS environment across 2 AZs via 11 Terraform modules (110 resources, 0 drift). Enforced two-layer defense in depth: API role middleware in httpOnly cookies plus database-level PostgreSQL Row-Level Security (RLS) on all medical records. Built shift-left gating in GitHub Actions with Trivy, SonarQube, and Checkov deploying via AWS SSM and OIDC with zero open ports.',
      result:
        'Reconstructed complete infrastructure in 17m40s during a live disaster recovery drill (target ≤25m). Discovered and patched a critical cross-tenant IDOR leak on sick_leaves during self-conducted pentest. 399 of 399 Checkov IaC checks passed.',
      tags: ['React 18', 'Node.js 20', 'PostgreSQL RLS', 'Terraform (110 Resources)', 'Docker', 'Trivy', 'Checkov', 'AWS SSM (OIDC)'],
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
      id: 'a2-remediation',
      tabLabel: 'A2 Remediation',
      kicker: '02 · CLOUD DEVSECOPS · AWS COMPLIANCE · 2026',
      title: 'A2: AUTONOMOUS CLOUD REMEDIATION',
      subtitle: 'Serverless event-driven daemon fixing security group drift, weak KMS keys, and open ports on the CloudTrail event.',
      service: 'AWS EventBridge + Lambda',
      metric: '8s MTTR · 352 Tests',
      github: 'https://github.com/Mhdomer/aws-compliance-remediation-engine',
      previewImage: '/assets/projects/a2-social-preview.webp',
      diagramImage: '/assets/projects/a2-compliance-architecture.webp',
      videoSrc: '/assets/projects/a2-showcase.mp4',
      problem:
        'Periodic compliance audits leave security exposure windows open for days. When developers accidentally make S3 buckets public, open SSH port 22 to 0.0.0.0/0, or launch unencrypted EBS volumes, traditional tools wait for scheduled scans rather than remediating instantly.',
      whatIBuilt:
        'Serverless compliance daemon capturing CloudTrail API calls in real time via EventBridge. Designed structural loop freedom comparing sessionContext.sessionIssuer.arn to prevent self-invocation loops. Created a read-only MCP agent server with 6 inspection tools verified by Python AST analysis and least-privilege IAM policies.',
      result:
        '8-second MTTR measured end-to-end to detect and revoke open port 22 on live AWS. Reverts public S3 ACLs in under 2.4 seconds. Backed by 352 Python unit tests, 26 Terraform tests, and 18 documented failure post-mortems.',
      tags: ['Python 3.12 (Boto3)', 'AWS EventBridge', 'AWS Lambda', 'Terraform', 'CloudTrail', 'SQS DLQ', 'MCP Server'],
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
      id: 'aegis-2b',
      tabLabel: 'Aegis-2B',
      kicker: '03 · AI SECURITY & DEFENSE · AWS BEDROCK · 2026',
      title: 'AEGIS-2B: AI CIRCUIT BREAKER',
      subtitle: 'Sub-115ms dual-tier defense for LLMs and Bedrock agents halting prompt injection attacks before model invocation.',
      service: 'Amazon Bedrock + AWS Lambda',
      metric: '115ms p99 · 16x Faster',
      github: 'https://github.com/Mhdomer/aegis-2b',
      previewImage: '/assets/projects/aegis-hero-banner.webp',
      diagramImage: '/assets/projects/aegis-aws-architecture.webp',
      videoSrc: '/assets/projects/aegis-showcase.mp4',
      problem:
        'Enterprise LLM guardrails add 1,800ms+ of roundtrip latency and charge token costs even when evaluating blatant prompt injections. Monolithic cloud guardrails bottleneck real-time agent loops and fail to provide tamper-evident action audit trails.',
      whatIBuilt:
        'Dual-tier defense pipeline for foundation models on AWS. Fast deterministic regex signature triage intercepts prompt injection attacks (OWASP LLM01/LLM04) in sub-0.8ms, routing ambiguous prompts to a quantized 2B SLM verifier on Lambda before calling Amazon Bedrock. Dispatches verified Boto3 mutations with SHA-256 tamper-evident audit receipts.',
      result:
        '16.1x faster safety circuit breaking (114.5ms p99 latency vs 1,840ms Bedrock roundtrip) with 100% cost reduction on blocked attacks. Submitted to AWS Strands Decider Hackathon.',
      tags: ['Amazon Bedrock', 'AWS Lambda Container', 'Python 3.12 Boto3', 'Quantized 2B SLM', 'SHA-256 Receipts'],
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
      id: 'mindcraft-cicd',
      tabLabel: 'MindCraft CI/CD',
      kicker: '04 · DEVSECOPS & INFRASTRUCTURE · TERRAFORM · 2026',
      title: 'MINDCRAFT: THREE-TIER AWS MIGRATION',
      subtitle: 'Solo re-architecture of university team coursework from Firebase to self-managed 3-tier AWS with Trivy CVE gating.',
      service: 'Terraform + Docker + GitHub Actions',
      metric: 'Exit Code 1 Gate · 47 Resources',
      github: 'https://github.com/Mhdomer/mindcraft-aws-migration',
      liveDemo: 'https://mind-craft-k21f.vercel.app/',
      previewImage: '/assets/projects/mindcraft-preview.webp',
      diagramImage: '/assets/projects/mindcraft-aws-architecture.webp',
      videoSrc: '/assets/projects/mindcraft-showcase.mp4',
      problem:
        'Firebase hides everything below the application layer, giving zero control over database networking, subnets, and container vulnerabilities. Vulnerable dependencies and container CVEs slip into production environments without shift-left security enforcement.',
      whatIBuilt:
        'Solo migrated coursework app onto self-managed 3-tier AWS infrastructure: Next.js frontend, Express API container, and MongoDB on EC2 in private isolated subnets. Provisioned 47 Terraform resources across VPC, ALB, EC2, CloudWatch, Secrets Manager, and ECR. Enforced Trivy container scanning in GitHub Actions.',
      result:
        'Trivy gate returns exit code 1 inside GitHub Actions on critical container CVEs (e.g. CVE-2024-21626), preventing unpatched artifacts from reaching AWS EC2 via SSM. Documented across 5 Architecture Decision Records (ADRs).',
      tags: ['Next.js 14', 'Express', 'MongoDB', 'Docker', 'Terraform (47 Resources)', 'GitHub Actions', 'Trivy', 'AWS SSM'],
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

  const currentSystem = systems.find((s) => s.id === activeId) || systems[0];

  const selectSystem = (id) => {
    setActiveId(id);
    setCodePinId(null);
    setActiveProof(null);
  };

  const subTabs = [
    { id: 'preview', label: 'Preview', Icon: Eye },
    { id: 'diagram', label: 'Architecture', Icon: GitBranch, isLive: true },
    { id: 'code', label: 'Code Spec', Icon: Code2 },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="work"
        className="py-24 scroll-mt-20 transition-colors duration-300 relative"
      >
        <div id="projects" className="absolute -top-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with Horizontal Project Navigation Tabs */}
          <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b" style={{ borderColor: 'var(--line)' }}>
            <div>
              <SectionSakuraHeader category="Production Implementations" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase leading-[1.18] display">
                <span className="block overflow-hidden pb-1 -mb-1">
                  <motion.span
                    className="block"
                    initial={prefersReducedMotion ? false : { y: '105%' }}
                    whileInView={{ y: '0%' }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.54, ease: EDITORIAL_EASE }}
                  >
                    Selected Systems &
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
                    Architectures.
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
                Production cloud architectures, automated remediation engines, and AI security guardrails running across live workloads.
              </motion.p>
            </div>

            {/* Project Switcher Tabs (Ziad Sharara pattern with spring continuity) */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono">
              {systems.map((s, index) => {
                const isActive = activeId === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectSystem(s.id)}
                    className="group inline-flex items-center gap-2 pb-2 transition-colors relative cursor-pointer"
                    style={{
                      color: isActive ? 'var(--brand-coral)' : 'var(--ink)',
                      opacity: isActive ? 1 : 0.65,
                    }}
                  >
                    <span className="font-mono text-[11px] opacity-75">0{index + 1}</span>
                    <span className={`tracking-wider uppercase ${isActive ? 'font-bold' : 'font-medium'}`}>
                      {s.tabLabel}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="project-tab-underline"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: 'var(--brand-coral)' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Project Showcase: 2-Column Editorial Grid */}
          <div
            ref={workbenchRef}
            id="work-workbench"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start scroll-mt-24"
          >
            {/* Left Column: Visual Media & Device Showcase Card */}
            <div className="lg:col-span-6 flex flex-col space-y-4">
              {/* View Sub-Tabs + Optional Active Proof Breadcrumb */}
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div
                  className="flex items-center gap-1 p-1 rounded-xl border w-fit"
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--line)',
                  }}
                >
                  {subTabs.map(({ id, label, Icon, isLive }) => {
                    const isSelected = innerView === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setInnerView(id);
                          setActiveProof(null);
                        }}
                        className="relative px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                        style={{
                          color: isSelected ? 'var(--button-fg)' : 'var(--ink)',
                          fontWeight: isSelected ? 700 : 500,
                        }}
                      >
                        {isSelected && (
                          <motion.span
                            layoutId="project-subtab-pill"
                            transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                            className="absolute inset-0 rounded-lg shadow-sm"
                            style={{ background: 'var(--button-bg)' }}
                          />
                        )}
                        <Icon className="w-3.5 h-3.5 relative z-10" />
                        <span className="relative z-10">{label}</span>
                        {isLive && !isSelected && (
                          <span
                            className="relative z-10 w-1.5 h-1.5 rounded-full"
                            style={{ background: 'var(--brand-coral)' }}
                            title="Interactive live packet trace"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence initial={false}>
                  {activeProof && activeProof.systemId === currentSystem.id && (
                    <motion.div
                      key={activeProof.token}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.2, ease: EDITORIAL_EASE }}
                      data-testid="active-proof-pill"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-mono max-w-full"
                      style={{
                        background: 'var(--surface-soft)',
                        borderColor: 'var(--brand-coral)',
                        color: 'var(--ink)',
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: 'var(--brand-coral)' }}
                      />
                      <span className="opacity-65">Proof:</span>
                      <span className="font-semibold truncate max-w-[180px] sm:max-w-[220px]">
                        {activeProof.skillName}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveProof(null)}
                        aria-label="Clear proof highlight"
                        className="ml-0.5 p-0.5 rounded opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Media Frame Container (sharara.me device frame style) */}
              <div
                className="rounded-3xl border overflow-hidden shadow-2xl relative group transition-colors"
                style={{
                  background: 'var(--paper-deep)',
                  borderColor: 'var(--line)',
                }}
              >
                <SpringHeightFrame>
                  <AnimatePresence mode="wait" initial={false}>
                    {innerView === 'preview' && (
                      <motion.div
                        key={`${currentSystem.id}-preview`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="relative aspect-[16/11] overflow-hidden flex items-center justify-center bg-black/5 cursor-pointer"
                        onClick={() => onSelectImage && onSelectImage(currentSystem.videoSrc || currentSystem.previewImage, currentSystem.title)}
                      >
                        {currentSystem.videoSrc ? (
                          <ViewportVideo
                            key={currentSystem.videoSrc}
                            src={currentSystem.videoSrc}
                            poster={currentSystem.previewImage}
                            isMuted={isMuted}
                          />
                        ) : (
                          <img
                            src={currentSystem.previewImage}
                            alt={currentSystem.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-contain p-2"
                          />
                        )}

                        {/* Audio / Video Status Pill Badge (Sharara aesthetic) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMuted(!isMuted);
                          }}
                          className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-mono flex items-center gap-1.5 border border-white/10 shadow-lg hover:bg-black/90 transition-colors z-10"
                          title={isMuted ? 'Audio muted (Video preview ready)' : 'Audio unmuted'}
                        >
                          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-neutral-300" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                          <span>{isMuted ? 'Sound off' : 'Sound on'}</span>
                        </button>

                        {/* Click to Enlarge / Inspect Trigger */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectImage && onSelectImage(currentSystem.videoSrc || currentSystem.previewImage, currentSystem.title);
                          }}
                          className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-mono flex items-center gap-1.5 border border-white/10 shadow-lg hover:bg-black/90 transition-colors opacity-90 hover:opacity-100 z-10"
                        >
                          <Maximize2 className="w-3.5 h-3.5" style={{ color: 'var(--brand-coral)' }} />
                          <span className="hidden sm:inline">Inspect High-Res</span>
                        </button>
                      </motion.div>
                    )}

                    {innerView === 'diagram' && (
                      <motion.div
                        key={`${currentSystem.id}-diagram`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <InteractiveArchitectureTrace
                          systemId={currentSystem.id}
                          systemTitle={currentSystem.title}
                          diagramImage={currentSystem.diagramImage}
                          onOpenFullDiagram={onSelectImage}
                          externalFocus={
                            activeProof && activeProof.systemId === currentSystem.id
                              ? {
                                  systemId: activeProof.systemId,
                                  mode: activeProof.traceMode,
                                  nodeId: activeProof.nodeId,
                                  token: activeProof.token,
                                }
                              : null
                          }
                          onJumpToCode={(pinId) => {
                            setCodePinId(pinId || null);
                            setInnerView('code');
                          }}
                        />
                      </motion.div>
                    )}

                    {innerView === 'code' && (
                      <motion.div
                        key={`${currentSystem.id}-code`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <AnnotatedCodeSpec
                          systemId={currentSystem.id}
                          codeFile={currentSystem.codeFile}
                          codeLang={currentSystem.codeLang}
                          code={currentSystem.code}
                          initialPinId={codePinId}
                          pinToken={activeProof?.token}
                          onJumpToArchitecture={() => setInnerView('diagram')}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </SpringHeightFrame>
              </div>

              {/* Sub-label under visual frame */}
              <div className="flex items-center justify-between text-xs font-mono opacity-70 px-1">
                <span>{currentSystem.service}</span>
                <span className="font-bold" style={{ color: 'var(--brand-coral)' }}>
                  {currentSystem.metric}
                </span>
              </div>
            </div>

            {/* Right Column: Editorial Narrative & Impact Breakdown */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentSystem.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.19, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  {/* Header: Kicker + Title + Summary */}
                  <div className="space-y-2">
                    <div
                      className="text-xs font-mono uppercase tracking-[0.18em] font-semibold"
                      style={{ color: 'var(--brand-coral)' }}
                    >
                      {currentSystem.kicker}
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight uppercase leading-tight display">
                      {currentSystem.title}
                    </h3>
                    <p className="text-sm sm:text-base opacity-80 leading-relaxed font-sans pt-1">
                      {currentSystem.subtitle}
                    </p>
                  </div>

                  {/* The 3 Editorial Rows (Problem, Built, Result) */}
                  <div className="space-y-4 pt-2">
                    {/* Row 1: The Problem */}
                    <div
                      className="pt-4 border-t flex flex-col sm:flex-row gap-2 sm:gap-6"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      <div className="w-28 sm:w-32 flex-shrink-0 text-xs font-mono uppercase tracking-wider opacity-60 pt-0.5">
                        THE PROBLEM
                      </div>
                      <div className="flex-1 text-xs sm:text-sm leading-relaxed opacity-85">
                        {currentSystem.problem}
                      </div>
                    </div>

                    {/* Row 2: What I Built */}
                    <div
                      className="pt-4 border-t flex flex-col sm:flex-row gap-2 sm:gap-6"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      <div className="w-28 sm:w-32 flex-shrink-0 text-xs font-mono uppercase tracking-wider opacity-60 pt-0.5">
                        WHAT I BUILT
                      </div>
                      <div className="flex-1 text-xs sm:text-sm leading-relaxed opacity-85">
                        {currentSystem.whatIBuilt}
                      </div>
                    </div>

                    {/* Row 3: The Result */}
                    <div
                      className="pt-4 border-t flex flex-col sm:flex-row gap-2 sm:gap-6"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      <div
                        className="w-28 sm:w-32 flex-shrink-0 text-xs font-mono uppercase tracking-wider font-bold pt-0.5"
                        style={{ color: 'var(--brand-coral)' }}
                      >
                        THE RESULT
                      </div>
                      <div className="flex-1 text-xs sm:text-sm leading-relaxed font-semibold" style={{ color: 'var(--ink)' }}>
                        {currentSystem.result}
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Tags & External Links */}
                  <div
                    className="pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    style={{ borderColor: 'var(--line)' }}
                  >
                    <div className="text-xs font-mono opacity-75 flex flex-wrap gap-x-2 gap-y-1">
                      {currentSystem.tags.map((tag, idx) => (
                        <span key={idx} className="inline-flex items-center">
                          {tag}
                          {idx < currentSystem.tags.length - 1 && <span className="opacity-40 ml-2">·</span>}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 flex-shrink-0">
                      {currentSystem.liveDemo && (
                        <a
                          href={currentSystem.liveDemo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all border shadow-sm hover:scale-105 whitespace-nowrap"
                          style={{
                            background: 'var(--brand-coral)',
                            borderColor: 'var(--brand-coral)',
                            color: '#ffffff',
                          }}
                        >
                          <span>Live App</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                        </a>
                      )}

                      <a
                        href={currentSystem.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all border shadow-sm hover:scale-105 whitespace-nowrap"
                        style={{
                          background: 'var(--surface)',
                          borderColor: 'var(--line-strong)',
                          color: 'var(--ink)',
                        }}
                      >
                        <span>GitHub</span>
                        <ArrowUpRight className="w-3.5 h-3.5" style={{ color: 'var(--brand-coral)' }} />
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          if (innerView === 'diagram') {
                            onSelectImage && onSelectImage(currentSystem.diagramImage, `${currentSystem.title} Architecture Diagram`);
                          } else {
                            setInnerView('diagram');
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all border hover:opacity-85 cursor-pointer whitespace-nowrap"
                        style={{
                          background: innerView === 'diagram' ? 'var(--surface-soft)' : 'transparent',
                          borderColor: innerView === 'diagram' ? 'var(--brand-coral)' : 'var(--line)',
                          color: 'var(--ink)',
                        }}
                      >
                        <GitBranch className="w-3.5 h-3.5" style={{ color: 'var(--brand-coral)' }} />
                        <span>{innerView === 'diagram' ? 'Full PNG' : 'Live Trace'}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Minimal Bottom Quick Selector Strip for all 4 Projects */}
          <div className="mt-16 pt-8 border-t grid grid-cols-2 md:grid-cols-4 gap-4" style={{ borderColor: 'var(--line)' }}>
            {systems.map((s, index) => {
              const isActive = activeId === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => selectSystem(s.id)}
                  className="relative p-3.5 rounded-2xl border text-left transition-all hover:-translate-y-0.5 group cursor-pointer"
                  style={{
                    background: isActive ? 'var(--surface-soft)' : 'var(--surface)',
                    borderColor: isActive ? 'transparent' : 'var(--line)',
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-bottom-card-ring"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-2xl border pointer-events-none"
                      style={{ borderColor: 'var(--brand-coral)' }}
                    />
                  )}
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1.5 opacity-60 relative z-10">
                    <span>0{index + 1}</span>
                    <span className="text-[10px] font-bold" style={{ color: isActive ? 'var(--brand-coral)' : 'inherit' }}>
                      {isActive ? 'ACTIVE' : 'VIEW'}
                    </span>
                  </div>
                  <div className="font-bold text-xs font-mono uppercase tracking-tight truncate group-hover:opacity-80 relative z-10">
                    {s.tabLabel}
                  </div>
                  <div className="text-[11px] opacity-70 truncate mt-1 relative z-10">
                    {s.metric}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
