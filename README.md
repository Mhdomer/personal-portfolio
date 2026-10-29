# Mohamed Makhlouf (Mhdomar) - Tech Superpower Portfolio

Personal portfolio website and interactive cloud security defense workbench built for the **AWS Student Builder Challenge: Build Your Tech Superpower** (October 2026).

Deployed live via **AWS Amplify Hosting** with global Amazon CloudFront distribution and Amazon S3.

---

## 1. Project Overview & Story

This portfolio reflects my path as a senior Computer Science student at Universiti Teknologi Malaysia (UTM) specializing in Networks and Security, currently undergoing Industrial Training at the Al-Ameen Medical Complex IT Department in Riyadh, Saudi Arabia.

My technical focus centers on Cloud DevSecOps, sub-120ms AI security guardrails, automated drift remediation, and peer education:
1. **Deterministic DevSecOps Precision:** Shift-left security enforcement (Trivy, Checkov), idempotent self-healing automation (AWS EventBridge, Lambda), and sub-115ms latency budgets for agentic AI.
2. **High-Craft Systems Engineering:** Operating in a tuned CachyOS Linux workstation with Wayland compositors, building scale-to-zero serverless architectures, and maintaining zero-downtime operations in live hospital clinics.

---

## 2. Core Sections Required by Rubric

1. **About Me:**
   - Dual-region journey: Egypt to UTM Malaysia to Al-Ameen Medical Complex IT in Riyadh.
   - Ground-level healthcare IT infrastructure management, endpoint baseline protection, and zero-downtime clinic operations.
   - Competitive trials: 3rd place finalist at ASEAN Cyber Race 2025 CTF Finals (15 teams across 8 Southeast Asian countries).
   - Core philosophy: deterministic error handling, scale-to-zero serverless patterns, and UTM CS peer tutoring.

2. **Skills & Tech Superpowers:**
   - **Autonomous Cloud Security & Remediation:** AWS EventBridge, Lambda (Python Boto3), IAM least-privilege, Terraform, CloudTrail audit trails.
   - **AI Security & Agentic Guardrails:** Sub-115ms p99 latency defense, regex trie fast path, 2B quantized SLM verifiers, OWASP LLM top 10 mitigation.
   - **Shift-Left DevSecOps & Gated CI/CD:** GitHub Actions exit code 1 gates, Trivy container CVE blockers, Checkov static IaC policies, Docker minimal hardening.
   - **Systems Engineering & Linux Workstation:** Tuned CachyOS Linux, kernel 6.13+ flags, Niri Wayland scrollable tiling compositor, POSIX automation, dual-boot NTFS/Ext4 architecture.

3. **Projects & Implementations:**
   - **Aegis-2B:** Hybrid AI security guardrail engine intercepting prompt injection in under 115ms p99 latency with passing automated test suites.
   - **A2 Remediation Engine:** Autonomous AWS compliance and drift remediation engine running on AWS Lambda and EventBridge with 325 unit tests and a read-only MCP audit server.
   - **ASEAN Cyber Race 2025 CTF:** 3rd place finals (cloud misconfigurations, packet analysis, binary exploitation).
   - **MindCraft:** Three-tier AWS infrastructure provisioned with Terraform (47 resources) and gated GitHub Actions Trivy scanning.
   - **SECRH Healthcare IT:** Diagnostic equipment network segmentation and endpoint hardening in Riyadh.
   - **YouTube ("Omar Documents") & Tutoring:** Open bilingual video walkthroughs and university mentoring notes.

---

## 3. The Creative Feature: Interactive Cloud Security Sandbox & Policy Linter

Per the hackathon guidelines, the portfolio includes an interactive, fully functioning creative feature with a visible hint:
- **Visible Hint:** Clearly marked with a glowing `[ Security Lab & Policy Linter (Hint!) ]` button in the navigation bar, hero section, and AWS architecture section.
- **The Interactive Security Sandbox:** An actual client-side cybersecurity tool suite:
  - **Tool 1 (Live AWS IAM Policy AST Security Linter):** An interactive code editor where visitors can edit or paste any IAM JSON policy. An actual client-side AST engine evaluates 5 CIS AWS Foundations Benchmark rules (unrestricted admin access, anonymous public access, privilege escalation vectors, missing in-transit TLS, and un-MFA destructive APIs). Computes a dynamic risk score (0-100) and includes an "Auto-Remediate to Least-Privilege" button that algorithmically transforms the policy into compliant least-privilege code.
  - **Tool 2 (Cloud Incident Crisis Decision Simulator):** A playable scenario engine based on real incidents (Al-Ameen patient audit bucket exposure, compromised CI/CD access key spawning miners, and clinical LLM prompt injection). Visitors choose architectural mitigations and observe real-time MTTR, cost impact, and compliance scores.
  - **Tool 3 (Aegis-2B AI Guardrail & Shannon Entropy Benchmark):** Live client-side Shannon Entropy calculation ($H = -\sum p_i \log_2 p_i$) and regex signature trie evaluation benchmarked against OWASP LLM01 and LLM04, displaying microsecond execution timing with browser `performance.now()`.

---

## 4. Architecture & AWS Services Used

```
[ Visitor Browser ]
       │
       ▼  (HTTPS / TLS 1.3)
[ AWS Amplify Hosting ]
       │
       ├─► [ Amazon CloudFront CDN ] (Global edge caching)
       ├─► [ Amazon S3 ] (Encrypted static asset storage)
       └─► [ CI/CD Build Pipeline ] (Automated build on git push)
```

- **AWS Amplify Hosting:** Manages git-based continuous deployment, asset compression, and automated preview builds.
- **Amazon CloudFront:** Distributes assets to global edge locations for sub-50ms Time to First Byte (TTFB).
- **Amazon S3:** Serves production bundle chunks with immutable cache headers.
- **Amplify Build Specification (`amplify.yml`):** Runs `npm ci` and `npm run build` targeting Node 20+.

---

## 5. Local Development

Prerequisites: Node.js 18+ (tested on Node v20/v22/v26) and npm.

```bash
# 1. Clone repository
git clone https://github.com/Mhdomer/tech-superpower-portfolio.git

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build production bundle
npm run build

# 5. Preview production build locally
npm run preview
```

---

## 6. Project Structure

```
tech-superpower-portfolio/
├── amplify.yml                       # AWS Amplify CI/CD configuration
├── index.html                        # HTML entry with font preloads
├── package.json                      # React 19, Vite, Tailwind, Lucide, Canvas-Confetti
├── postcss.config.js                 # PostCSS configuration
├── tailwind.config.js                # Custom charcoal and cyber palette tokens
├── vite.config.js                    # Vite build setup with dist output
├── src/
│   ├── main.jsx                      # React DOM root mount
│   ├── App.jsx                       # Application layout & modal state management
│   ├── index.css                     # Custom scrollbars, scanlines, cyber styling
│   └── components/
│       ├── Navbar.jsx                # Sticky header with visible hint button
│       ├── Hero.jsx                  # Value proposition, credentials, telemetry badges
│       ├── AwsChallengeArchitecture.jsx # Dedicated AWS hackathon architecture section
│       ├── About.jsx                 # Journey, systems craft, sustainability, tutoring
│       ├── Superpowers.jsx           # Core superpowers, tools, and verified metrics
│       ├── Projects.jsx              # Featured projects with stats and AWS tags
│       ├── InteractiveSecurityLabModal.jsx # Real client-side IAM AST linter & crisis simulator
│       ├── ImageModal.jsx            # High-resolution screenshot inspection lightbox
│       └── Footer.jsx                # Social links, email, and AWS credit
└── LICENSE                           # MIT License
```

---

## 7. License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
