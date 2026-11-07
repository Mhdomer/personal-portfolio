import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Code2, Copy, Check, Pin, GitBranch } from 'lucide-react';

export const CODE_TRADEOFF_PINS = {
  'secrh-pdms': [
    {
      id: 'subnet',
      num: '01',
      label: 'Private Subnets',
      lines: [3, 10],
      heading: 'Zero-IGW Multi-AZ Subnet Isolation',
      rationale:
        'Places PostgreSQL across two isolated private subnets with zero route-table path to the Internet Gateway. Even if an engineer misconfigures a security group, RDS has no public route.',
    },
    {
      id: 'ssl',
      num: '02',
      label: 'Forced TLS',
      lines: [16, 20],
      heading: 'Immediate In-Transit SSL Enforcement',
      rationale:
        'Setting rds.force_ssl = 1 with immediate apply drops any unencrypted psql connection inside the VPC, pairing transport encryption with engine-level Row-Level Security (RLS).',
    },
    {
      id: 'kms',
      num: '03',
      label: 'Multi-AZ + KMS',
      lines: [30, 38],
      heading: 'Ransomware-Resilient Storage & 17m40s DR',
      rationale:
        'Built directly in response to the May 2023 clinic ransomware outage. Customer-managed KMS keys, Multi-AZ standby, and mandatory snapshots reconstructed the stack in 17m40s.',
    },
  ],

  'a2-remediation': [
    {
      id: 'loop',
      num: '01',
      label: 'ARN Loop Guard',
      lines: [8, 16],
      heading: 'Structural Loop Freedom via Caller Identity',
      rationale:
        'Compares CloudTrail sessionIssuer.arn against ENGINE_ROLE_ARN before running Boto3. Naive resource-tag checks suffer from eventual-consistency race conditions and runaway Lambda billing.',
    },
    {
      id: 'sts',
      num: '02',
      label: 'STS Fallback',
      lines: [17, 18],
      heading: 'Regional Assumed-Role Edge Case',
      rationale:
        'Certain regional STS CloudTrail events omit sessionContext.sessionIssuer. Falling back to role-name matching on identity.arn closed a subtle self-invocation bypass caught in testing.',
    },
    {
      id: 's3block',
      num: '03',
      label: 'Atomic S3 Block',
      lines: [27, 36],
      heading: 'Sub-2.4s Atomic Public Access Lockdown',
      rationale:
        'Enforces all four S3 PublicAccessBlock flags in a single API call (<2.4s MTTR) rather than patching individual ACL grants that callers could re-expose via bucket policies.',
    },
  ],

  'aegis-2b': [
    {
      id: 'breaker',
      num: '01',
      label: 'Fail-Closed Gate',
      lines: [7, 9],
      heading: 'Typed Fail-Closed Circuit Breaker',
      rationale:
        'Raises CircuitBreakerTrippedError prior to any Boto3 mutation or Bedrock invocation, guaranteeing $0.00 foundation-model token spend whenever regex triage (<0.8ms) trips.',
    },
    {
      id: 'receipt',
      num: '02',
      label: 'SHA-256 Receipt',
      lines: [22, 24],
      heading: 'Deterministic Tamper-Evident Audit Digest',
      rationale:
        'Hashes canonical pipe-delimited fields (timestamp, target ARN, tool, decision, 4-decimal confidence) so incident responders can prove no audit field was modified post-execution.',
    },
    {
      id: 'gate',
      num: '03',
      label: '0.85 SLM Gate',
      lines: [28, 29],
      heading: '16.1x Faster Quantized 2B Threshold',
      rationale:
        'Calibrated on the quantized 2B SLM (114.5ms p99 vs 1,840ms Bedrock guardrail roundtrip), halting ambiguous tool mutations whenever semantic safety confidence drops below 0.85.',
    },
  ],

  'mindcraft-cicd': [
    {
      id: 'prbuild',
      num: '01',
      label: 'Local PR Build',
      lines: [16, 17],
      heading: 'Pre-Registry Candidate Image Tagging',
      rationale:
        'Builds and tags the PR candidate container locally inside the ephemeral GitHub runner before AWS OIDC login so vulnerable layers never reach Amazon ECR storage.',
    },
    {
      id: 'trivy',
      num: '02',
      label: 'Exit Code 1 Gate',
      lines: [23, 26],
      heading: 'Hard Failure on Actionable Container CVEs',
      rationale:
        'Combines exit-code 1 on CRITICAL/HIGH CVEs (blocking breakouts like CVE-2024-21626) with ignore-unfixed true to prevent unpatchable upstream distro noise from causing gate bypasses.',
    },
    {
      id: 'checkov',
      num: '03',
      label: 'Checkov IaC Scan',
      lines: [28, 31],
      heading: 'Unified Container + Terraform Shift-Left Gate',
      rationale:
        'Pairs container CVE scanning with Checkov static HCL verification across all 47 AWS resources so neither a vulnerable image nor an open SG reaches private EC2 via SSM.',
    },
  ],
};

const TOKEN_PATTERN =
  /("""[\s\S]*?"""|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|#.*$|\b(?:resource|parameter|def|class|return|if|elif|else|in|not|and|or|import|from|raise|pass|with)\b|\b(?:true|false|True|False|None)\b|\b(?:str|dict|bool|float|int|Any|Dict|Exception|AuditReceipt|CircuitBreakerTrippedError)\b|\b\d+(?:\.\d+)?\b)/g;

const KEYWORD_SET = new Set([
  'resource',
  'parameter',
  'def',
  'class',
  'return',
  'if',
  'elif',
  'else',
  'in',
  'not',
  'and',
  'or',
  'import',
  'from',
  'raise',
  'pass',
  'with',
]);

function classifyToken(tok) {
  if (tok.startsWith('#')) return 'var(--syn-comment)';
  if (tok.startsWith('"') || tok.startsWith("'")) return 'var(--syn-string)';
  if (tok.startsWith('@')) return 'var(--syn-type)';
  if (/^(true|false|True|False|None|\d+(?:\.\d+)?)$/.test(tok)) return 'var(--syn-number)';
  if (/^(str|dict|bool|float|int|Any|Dict|Exception|AuditReceipt|CircuitBreakerTrippedError)$/.test(tok)) {
    return 'var(--syn-type)';
  }
  return 'var(--syn-keyword)';
}

function tokenizeCodeLine(line, isYaml) {
  const segments = [];
  let workingLine = line;

  // Highlight leading YAML keys or Python @decorators without regex lookbehinds (Safari <16.4 safe)
  if (isYaml) {
    const yamlMatch = line.match(/^(\s*-?\s*)([\w-]+)(:)/);
    if (yamlMatch) {
      if (yamlMatch[1]) segments.push({ text: yamlMatch[1], color: null });
      segments.push({ text: yamlMatch[2], color: 'var(--syn-type)', weight: 600 });
      segments.push({ text: yamlMatch[3], color: null });
      workingLine = line.slice(yamlMatch[0].length);
    }
  } else {
    const decMatch = line.match(/^(\s*)(@[A-Za-z_]\w*)/);
    if (decMatch) {
      if (decMatch[1]) segments.push({ text: decMatch[1], color: null });
      segments.push({ text: decMatch[2], color: 'var(--syn-type)' });
      workingLine = line.slice(decMatch[0].length);
    }
  }

  let lastIdx = 0;
  for (const match of workingLine.matchAll(TOKEN_PATTERN)) {
    const idx = match.index ?? 0;
    if (idx > lastIdx) {
      segments.push({ text: workingLine.slice(lastIdx, idx), color: null });
    }
    const raw = match[0];
    const isDotProperty = idx > 0 && workingLine[idx - 1] === '.' && KEYWORD_SET.has(raw);
    segments.push({
      text: raw,
      color: isDotProperty ? null : classifyToken(raw),
      italic: raw.startsWith('#'),
    });
    lastIdx = idx + raw.length;
  }

  if (lastIdx < workingLine.length) {
    segments.push({ text: workingLine.slice(lastIdx), color: null });
  }

  if (segments.length === 0) {
    segments.push({ text: ' ', color: null });
  }

  return segments;
}

export default function AnnotatedCodeSpec({
  systemId,
  codeFile,
  codeLang,
  code,
  initialPinId,
  pinToken,
  onJumpToArchitecture,
}) {
  const prefersReducedMotion = useReducedMotion();
  const pins = CODE_TRADEOFF_PINS[systemId] || CODE_TRADEOFF_PINS['secrh-pdms'];

  const [activePinId, setActivePinId] = useState(() => {
    if (initialPinId && pins.some((p) => p.id === initialPinId)) return initialPinId;
    return pins[0].id;
  });
  const [copied, setCopied] = useState(false);

  const scrollContainerRef = useRef(null);
  const lineRefs = useRef({});

  // Sync pin selection when switching projects or jumping from an Architecture node or Tech Stack badge
  useEffect(() => {
    const targetPin =
      initialPinId && pins.some((p) => p.id === initialPinId) ? initialPinId : pins[0].id;
    setActivePinId(targetPin);
  }, [systemId, initialPinId, pinToken, pins]);

  const activePin = pins.find((p) => p.id === activePinId) || pins[0];

  // Smoothly scroll ONLY the internal code pane without yanking browser window scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    const startLineEl = lineRefs.current[activePin.lines[0]];
    if (!container || !startLineEl) return;

    const targetTop = Math.max(0, Math.round(startLineEl.offsetTop - 36));
    container.scrollTo({
      top: targetTop,
      behavior: prefersReducedMotion ? 'instant' : 'smooth',
    });
  }, [activePin, systemId, pinToken, prefersReducedMotion]);

  const handleCopy = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isYaml = codeFile.endsWith('.yml') || codeFile.endsWith('.yaml');

  const parsedLines = useMemo(() => {
    return code.split('\n').map((rawLine, idx) => {
      const lineNum = idx + 1;
      const owningPin = pins.find((p) => lineNum >= p.lines[0] && lineNum <= p.lines[1]) || null;
      return {
        lineNum,
        segments: tokenizeCodeLine(rawLine, isYaml),
        owningPin,
      };
    });
  }, [code, pins, isYaml]);

  return (
    <div
      className="flex flex-col"
      style={{ background: 'var(--syn-bg)', color: 'var(--ink)' }}
    >
      {/* Zone 1A: File Path Header + Actions */}
      <div
        className="flex items-center justify-between gap-2 px-3.5 py-2 border-b text-xs font-mono"
        style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Code2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--brand-coral)' }} />
          <span className="truncate font-semibold">{codeFile}</span>
          {codeLang && (
            <span className="hidden xl:inline text-[10px] opacity-55 whitespace-nowrap">
              · {codeLang}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {onJumpToArchitecture && (
            <button
              type="button"
              onClick={onJumpToArchitecture}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono border flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity cursor-pointer whitespace-nowrap"
              style={{
                background: 'var(--surface-soft)',
                borderColor: 'var(--line)',
                color: 'var(--ink)',
              }}
              title="Return to interactive architecture schematic"
            >
              <GitBranch className="w-3 h-3" style={{ color: 'var(--brand-coral)' }} />
              <span className="hidden sm:inline">Trace</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="px-2.5 py-1 rounded-md text-[11px] font-mono border flex items-center gap-1.5 transition-opacity hover:opacity-100 opacity-90 cursor-pointer whitespace-nowrap"
            style={{
              background: 'var(--surface-soft)',
              borderColor: 'var(--line)',
              color: 'var(--ink)',
            }}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" style={{ color: 'var(--trace-pass)' }} />
                <span style={{ color: 'var(--trace-pass)' }}>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Zone 1B: Clickable Engineering Tradeoff Pin Bar */}
      <div
        className="flex items-center gap-1.5 px-3.5 py-1.5 border-b overflow-x-auto"
        style={{ background: 'var(--paper-deep)', borderColor: 'var(--line)' }}
        role="tablist"
        aria-label="Engineering tradeoff annotations"
      >
        <span className="text-[10px] font-mono uppercase tracking-wider opacity-60 mr-1 flex items-center gap-1 flex-shrink-0">
          <Pin className="w-3 h-3" style={{ color: 'var(--brand-coral)' }} />
          <span className="hidden sm:inline">Pins:</span>
        </span>

        {pins.map((pin) => {
          const isSelected = pin.id === activePin.id;
          return (
            <button
              key={pin.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActivePinId(pin.id)}
              className="relative px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap flex-shrink-0"
              style={{
                color: isSelected ? 'var(--button-fg)' : 'var(--ink)',
                fontWeight: isSelected ? 700 : 500,
              }}
            >
              {isSelected && (
                <motion.span
                  layoutId={`code-pin-pill-${systemId}`}
                  transition={{ type: 'spring', stiffness: 440, damping: 32 }}
                  className="absolute inset-0 rounded-md shadow-sm"
                  style={{ background: 'var(--button-bg)' }}
                />
              )}
              <span
                className="relative z-10 text-[10px] font-bold"
                style={{ color: isSelected ? 'var(--syn-pin-active)' : 'var(--brand-coral)' }}
              >
                {pin.num}
              </span>
              <span className="relative z-10">{pin.label}</span>
            </button>
          );
        })}
      </div>

      {/* Zone 2: Syntax-Highlighted Code Scroll Pane with Gutter Pins */}
      <div
        ref={scrollContainerRef}
        className="relative h-[238px] sm:h-[252px] overflow-y-auto overflow-x-auto py-2.5 font-mono text-[11.5px] leading-[1.62]"
      >
        <div className="min-w-max">
          {parsedLines.map(({ lineNum, segments, owningPin }) => {
            const isActiveLine =
              lineNum >= activePin.lines[0] && lineNum <= activePin.lines[1];
            const isPinStart = owningPin && owningPin.lines[0] === lineNum;

            return (
              <div
                key={lineNum}
                ref={(el) => {
                  lineRefs.current[lineNum] = el;
                }}
                onClick={owningPin ? () => setActivePinId(owningPin.id) : undefined}
                className={`flex items-baseline px-3 transition-colors ${
                  owningPin ? 'cursor-pointer' : ''
                }`}
                style={{
                  background: isActiveLine ? 'var(--syn-highlight)' : 'transparent',
                  borderLeft: isActiveLine
                    ? '2.5px solid var(--brand-coral)'
                    : '2.5px solid transparent',
                  opacity: isActiveLine ? 1 : 0.84,
                }}
              >
                {/* Gutter: Line Number + Pin Indicator Dot */}
                <span
                  className="w-9 flex-shrink-0 select-none text-right pr-3 text-[10.5px] inline-flex items-center justify-end gap-1"
                  style={{
                    color: isActiveLine ? 'var(--brand-coral)' : 'var(--syn-gutter)',
                    fontWeight: isActiveLine ? 700 : 400,
                  }}
                >
                  {isPinStart && (
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: isActiveLine ? 'var(--brand-coral)' : 'var(--syn-gutter)',
                      }}
                    />
                  )}
                  <span>{String(lineNum).padStart(2, '0')}</span>
                </span>

                {/* Tokenized Code Content */}
                <span className="whitespace-pre pr-4">
                  {segments.map((seg, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        color: seg.color || 'var(--ink)',
                        fontStyle: seg.italic ? 'italic' : 'normal',
                        fontWeight: seg.weight || (seg.color === 'var(--syn-keyword)' ? 600 : 400),
                      }}
                    >
                      {seg.text}
                    </span>
                  ))}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Zone 3: Pinned Engineering Tradeoff Rationale Strip */}
      <div
        className="px-3.5 py-2.5 border-t min-h-[76px] flex flex-col justify-center"
        style={{ background: 'var(--paper-deep)', borderColor: 'var(--line)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${systemId}-${activePin.id}`}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.16 }}
            className="space-y-1"
          >
            <div className="flex items-center justify-between gap-2 text-[10.5px] font-mono uppercase tracking-wider">
              <span className="font-bold" style={{ color: 'var(--brand-coral)' }}>
                {`PIN ${activePin.num} · ${activePin.heading}`}
              </span>
              <span className="opacity-65 whitespace-nowrap flex-shrink-0">
                {`L${activePin.lines[0]}-L${activePin.lines[1]}`}
              </span>
            </div>
            <p className="text-[11.5px] font-sans leading-relaxed opacity-90">
              {activePin.rationale}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
