# AWS Student Builder Challenge Submission Guide

**Challenge:** AWS Student Builder Challenge: Build Your Tech Superpower  
**Submission Period:** October 27, 2026 at 12:00 AM PDT to November 6, 2026 at 11:59 PM PST  
**Portal:** AWS Builder Center ("Your project" tab)  
**Participant:** Mohamed Makhlouf (Mhdomar)  
**Location Note:** Residing in Riyadh, Saudi Arabia (active Saudi Iqama, Industrial Training at Al-Ameen IT)  

---

## 1. Hackathon Rubric Alignment Audit

| Rubric Criterion | Weight | How Our Implementation Satisfies It |
| :--- | :--- | :--- |
| **Creativity and Memorability** | **30%** | **Interactive Cloud Security Defense Sandbox & Real Policy AST Linter:** A fully functional, client-side cybersecurity tool suite. Visitors can type or edit any AWS IAM JSON policy and receive live AST evaluation across 5 CIS AWS Foundations Benchmark rules, compute a dynamic risk score (0-100), and auto-remediate to least-privilege with a single click. Includes an interactive Cloud Incident Crisis decision engine (real-time MTTR, cost impact, and compliance scores) and a live Aegis-2B prompt defense benchmark computing Shannon entropy ($H$) and microsecond latency. Discovered via the prominent `[ Security Lab & Policy Linter (Hint!) ]` button. |
| **Working AWS Implementation** | **25%** | **Deployed on AWS Amplify Hosting:** Built with Vite and React 19, producing static assets in `dist/` deployed via root `amplify.yml`. Distributed globally via Amazon CloudFront CDN and Amazon S3 with immutable cache headers. Core AWS services: Amplify, CloudFront, S3, Lambda, EventBridge, and Bedrock. |
| **Communication Quality** | **25%** | **Substantive Documentation & Real Program Evidence:** Dedicated AWS Challenge architecture section, real program screenshots (`aegis-aws-architecture.png`, `pr1-trivy-gate-blocked.png`, `a2-compliance-architecture.png`, `alamin-network-topology.svg`) with an image inspection lightbox, tested benchmarks (325 unit tests, 115ms p99 latency), and genuine student engineer voice. |
| **Portfolio Completeness & Usability** | **20%** | **All 3 Core Sections Present:** Section 1 (About Me & ASEAN Cyber Race CTF), Section 2 (Tech Superpowers & Telemetry), Section 3 (Real Program Implementations). Works cleanly on desktop and mobile without breaking page navigation. Strictly zero em dashes. |

---

## 2. Screenshot Checklist (Attach Under "Your Project")

1. **Amplify Console:** Screenshot showing successful deployment status (`Verify` stage green) with live URL.
2. **Desktop Homepage:** Screenshot of the hero section featuring the Real Program Evidence Deck and visible hint button (`[ Security Lab & Policy Linter (Hint!) ]`).
3. **AWS Challenge Architecture Section:** Screenshot of Section 02 showing the 4 AWS architecture cards and rubric grid.
4. **Interactive Security Sandbox:** Screenshot of Tool 1 (Live IAM AST Policy Linter showing risk score and findings) or Tool 2 (Incident Crisis Simulator).
5. **Real Program Lightbox:** Screenshot of the full-resolution image modal displaying `pr1-trivy-gate-blocked.png` or `aegis-aws-architecture.png`.
6. **Mobile Viewport:** Screenshot of the portfolio on mobile showing responsive layout and drawer.

---

## 3. Builder Center Project Write-up Template (Copy-Paste Ready)

### Project Title
**Autonomous Cloud DevSecOps & Low-Latency AI Defense**

### Elevator Pitch
A high-performance cloud security portfolio deployed globally on AWS Amplify Hosting, Amazon CloudFront, and Amazon S3. Built for the AWS Student Builder Challenge, it pairs shift-left DevSecOps precision with disciplined cybersecurity design, featuring an interactive Cloud Security Defense Sandbox demonstrating real-time client-side IAM AST policy linting, incident response crisis simulation, and sub-115ms AI guardrail benchmarking with Shannon entropy analysis.

### The Creative Feature & Visible Hint
The creative feature is the **Interactive Cloud Security Defense Sandbox & Policy Linter**, discovered via a visible `[ Security Lab & Policy Linter ]` button with a pulsing "Hint!" badge in the top navigation bar, hero section, and AWS architecture section:
1. **Live AWS IAM & S3 Policy AST Security Linter:** An interactive in-browser code editor where visitors can type or paste any IAM JSON policy. An actual client-side AST engine evaluates 5 CIS AWS Foundations Benchmark rules (unrestricted admin access, anonymous public access, privilege escalation vectors, missing in-transit TLS, and un-MFA destructive APIs). Computes a dynamic risk score (0-100) and includes an "Auto-Remediate to Least-Privilege" button that algorithmically transforms the policy into compliant least-privilege code.
2. **Cloud Incident Crisis Decision Simulator:** A playable scenario engine based on real incidents (Al-Ameen patient audit bucket exposure, compromised CI/CD access key spawning miners, and clinical LLM prompt injection). Visitors choose architectural mitigations and observe real-time MTTR, cost impact, and compliance scores.
3. **Aegis-2B AI Guardrail & Shannon Entropy Benchmark:** Live client-side Shannon Entropy calculation ($H = -\sum p_i \log_2 p_i$) and regex signature trie evaluation benchmarked against OWASP LLM01 and LLM04, displaying microsecond execution timing with browser `performance.now()`.

### AWS Services Used
- **AWS Amplify Hosting:** Automated CI/CD deployment from GitHub on every push, managing static artifact builds and zero-downtime previews.
- **Amazon CloudFront:** Global edge content delivery network providing sub-50ms Time to First Byte (TTFB).
- **Amazon S3:** Encrypted storage of static production bundle chunks with immutable cache policies.
- **AWS EventBridge & AWS Lambda:** Event-driven serverless compliance engine detecting unauthorized changes (public S3 ACLs, open security groups) and self-healing them in real time (A2 Compliance Engine).
- **Amazon Bedrock:** Foundation model runtime defended by the sub-115ms Aegis-2B dual-tier guardrail.
- **Amazon CloudWatch & AWS CloudTrail:** Real-time compliance logging, metric alarms, and audit trails.

### Challenges Hit & Key Learnings
- **Challenge 1 (Guardrail Latency Barrier):** Standard enterprise LLM guardrails introduce 800ms to 1,500ms of overhead, causing user friction. We engineered Aegis-2B as a dual-tier pipeline: a fast-path regex trie intercepts known attack signatures in sub-5ms, while ambiguous prompts route through a quantized 2B parameter SLM verifier on serverless containers, achieving a verified ~115ms p99 latency.
- **Challenge 2 (Non-Intrusive Interactive Experience):** Designing an interactive security sandbox without cluttering standard portfolio navigation. We engineered the sandbox as an accessible modal overlay with keyboard navigation (`ESC` to close) that can be opened and closed seamlessly without resetting reading position.
- **Key Learning:** Security cannot be an afterthought checked during annual audits. In modern AWS architectures, security policies must be written as automated code: shift-left CI/CD gates that block vulnerable container builds, and event-driven Lambda functions that remediate infrastructure drift on the triggering event.
