# Mohamed Makhlouf (Mhdomar) | Personal Portfolio & Cloud Security Workbench

Personal portfolio website and interactive cloud security defense workbench of Mohamed Makhlouf (Omar / Mhdomar), Cloud DevSecOps & AI Security Engineer and Computer Science student at Universiti Teknologi Malaysia (UTM).

Deployed live via **AWS Amplify Hosting** with global Amazon CloudFront edge caching and Amazon S3.

---

## 1. Overview & Systems Philosophy

This portfolio reflects my work in the trenches as a senior Computer Science student at UTM specializing in Networks and Security, currently running clinical IT infrastructure operations at the Al-Ameen Medical Complex IT Department in Riyadh, Saudi Arabia.

My technical focus centers on Cloud DevSecOps, sub-120ms AI security guardrails, automated drift remediation, and peer education:
1. **Deterministic DevSecOps Precision:** Shift-left security enforcement (Trivy, Checkov), idempotent self-healing automation (AWS EventBridge, Lambda), and sub-115ms latency budgets for agentic AI.
2. **High-Craft Systems Engineering:** Operating on a tuned CachyOS Linux workstation with Wayland compositors, building scale-to-zero serverless architectures, and maintaining zero-downtime operations in live hospital clinics.

---

## 2. Core Sections

1. **About Me:**
   - Dual-region journey: Egypt to UTM Malaysia to Al-Ameen Medical Complex IT in Riyadh.
   - Ground-level healthcare IT infrastructure management, endpoint baseline protection, and zero-downtime clinic operations.
   - Competitive trials: 3rd place finalist at ASEAN Cyber Race 2025 CTF Finals (15 teams across 8 Southeast Asian countries).
   - Core philosophy: deterministic error handling, scale-to-zero serverless patterns, and UTM CS peer tutoring.

2. **Skills & Superpowers:**
   - **Autonomous Cloud Security & Remediation:** AWS EventBridge, Lambda (Python Boto3), IAM least-privilege, Terraform, CloudTrail audit trails.
   - **AI Security & Agentic Guardrails:** Sub-115ms p99 latency defense, regex trie fast path, 2B quantized SLM verifiers, OWASP LLM top 10 mitigation.
   - **Shift-Left DevSecOps & Gated CI/CD:** GitHub Actions exit code 1 gates, Trivy container CVE blockers, Checkov static IaC policies, Docker minimal hardening.
   - **Systems Engineering & Linux Workstation:** Tuned CachyOS Linux, kernel 6.13+ flags, Niri Wayland scrollable tiling compositor, POSIX automation, dual-boot NTFS/Ext4 architecture.

3. **Cloud Systems Architecture:**
   - **Aegis-2B AI Guardrail Dataflow:** Sub-115ms dual-tier defense on Amazon Bedrock + Lambda.
   - **A2 Event-Driven Remediation:** Real-time CloudTrail event capture with idempotent Python 3.12 handlers.
   - **Shift-Left CI/CD Gate:** Container vulnerability scanning halting releases on critical CVEs.
   - **Al-Ameen Healthcare Topology:** Multi-site diagnostic equipment VLAN isolation and IPSec VPN tunnels.

4. **Projects & Implementations:**
   - **Aegis-2B:** Hybrid AI security guardrail engine intercepting prompt injection in under 115ms p99 latency with passing automated test suites.
   - **A2 Remediation Engine:** Autonomous AWS compliance and drift remediation engine running on AWS Lambda and EventBridge with 325 unit tests and a read-only MCP audit server.
   - **ASEAN Cyber Race 2025 CTF:** 3rd place finals (cloud misconfigurations, packet analysis, binary exploitation).
   - **MindCraft:** Three-tier AWS infrastructure provisioned with Terraform (47 resources) and gated GitHub Actions Trivy scanning.
   - **SECRH Healthcare IT:** Diagnostic equipment network segmentation and endpoint hardening in Riyadh.
   - **YouTube ("Omar Documents") & Tutoring:** Open bilingual video walkthroughs and university mentoring notes.

---

## 3. Architecture & AWS Services Used

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

## 4. Local Development

Prerequisites: Node.js 18+ (tested on Node v20/v22/v26) and npm.

```bash
# 1. Clone repository
git clone https://github.com/Mhdomer/personal-portfolio.git

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

## 5. Project Structure

```
personal-portfolio/
├── amplify.yml                       # AWS Amplify CI/CD configuration
├── index.html                        # HTML entry with font preloads
├── package.json                      # React 19, Vite, Tailwind, Lucide, Canvas-Confetti
├── postcss.config.js                 # PostCSS configuration
├── tailwind.config.js                # Custom charcoal, terracotta, and cyber palette tokens
├── vite.config.js                    # Vite build setup with dist output
├── src/
│   ├── main.jsx                      # React DOM root mount
│   ├── App.jsx                       # Application layout and modal state management
│   ├── index.css                     # Custom scrollbars, scanlines, paper textures
│   └── components/
│       ├── Navbar.jsx                # Sticky header with navigation links, theme toggle, and resume link
│       ├── Hero.jsx                  # Value proposition, credentials, telemetry badges, and CTAs
│       ├── CloudSystemsArchitecture.jsx # Production cloud architecture and code specs
│       ├── About.jsx                 # Journey, systems craft, sustainability, tutoring, and ATS resume preview
│       ├── Superpowers.jsx           # Core superpowers, tools, and verified metrics
│       ├── Projects.jsx              # Featured projects with stats and AWS tags
│       ├── EngineeringCultureGallery.jsx # Live snapshots, homelab setups, and dev culture
│       ├── InteractiveTourGuide.jsx  # Interactive virtual cursor portfolio tour
│       ├── ImageModal.jsx            # High-resolution screenshot inspection lightbox
│       ├── DecorativeBranches.jsx    # Japanese ink sakura branches
│       ├── FallingSakuraLeaves.jsx   # Ambient falling sakura physics
│       ├── CursorSwordSlash.jsx      # Interactive katana cursor slash effect
│       ├── LinuxBootKatanaIntro.jsx  # Linux boot terminal typing intro
│       ├── ThemeToggle.jsx           # Dark/light theme switcher
│       ├── Icons.jsx                 # Custom SVG icons
│       └── Footer.jsx                # Social links, email, and AWS hosting credit
└── LICENSE                           # MIT License
```

---

## 6. License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
