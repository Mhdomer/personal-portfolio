---
name: aws-amplify-deploy
description: Step-by-step guide for deploying and maintaining the portfolio website on AWS Amplify Hosting, configuring CI/CD with GitHub, setting up CloudFront edge caching, and monitoring Free Tier compliance.
---

# AWS Amplify Hosting Deployment Guide

This skill guides the deployment of the portfolio to AWS Amplify Hosting per the AWS Student Builder Challenge requirements.

---

## 1. Amplify Build Specification (`amplify.yml`)

The repository includes a root `amplify.yml` file configured for Vite and React:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

---

## 2. Step-by-Step Deployment via AWS Console

1. **Log in to AWS Management Console:**
   - Navigate to the **AWS Amplify** service console.
2. **Create New App:**
   - Click **Deploy an app** (or **Host web app**).
   - Select **GitHub** as your Git provider and authorize AWS Amplify.
3. **Select Repository & Branch:**
   - Choose `Mhdomer/tech-superpower-portfolio`.
   - Branch: `main`.
4. **Configure Build Settings:**
   - Amplify will automatically detect the `amplify.yml` file in the root.
   - Leave default environment variables (Node.js 20+ runtime).
5. **Save and Deploy:**
   - Click **Save and deploy**.
   - Amplify will initiate the automated 4-stage pipeline: Provision -> Build -> Deploy -> Verify.
   - Once completed, Amplify provides a live URL (e.g., `https://main.d1234567abcdef.amplifyapp.com`).

---

## 3. Post-Deployment Verification Checklist

- [ ] Site loads over HTTPS with a valid Amazon Trust Services SSL certificate.
- [ ] Falling Sakura petals animate smoothly without CPU spikes.
- [ ] Clicking the `[ Superpower Engine ]` button opens the 4-cylinder console.
- [ ] Cylinder 1 (Guardrail) correctly evaluates safe and prompt injection queries.
- [ ] Cylinder 2 (Green FinOps) sliders compute kWh and cost savings dynamically.
- [ ] Cylinder 3 (Peer Tutor) challenge responds with tutor notes.
- [ ] Cylinder 4 (Kaizen Rev) tachometer swings to 8,800 RPM and dispenses mottos.
- [ ] External links (GitHub, YouTube, Email) open correctly.
- [ ] Site layout is fully responsive on mobile screen widths (375px+).

---

## 4. Free Tier & Cost Safeguards

AWS Amplify Hosting offers 1,000 build minutes per month, 15 GB of hosted data, and 5 million requests per month on the AWS Free Tier.
- Ensure `cache.paths` preserves `node_modules` to keep build times under 90 seconds.
- Monitor billing via AWS Cost Explorer and CloudWatch billing alarms.
