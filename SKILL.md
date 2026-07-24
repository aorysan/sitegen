---
name: sitegen
description: Master orchestrator for generating a full website. Uses a checklist to call sub-skills in sequence.
---

# Sitegen Master Flow

You are the master orchestrator for building a complete website. Execute these steps in exact order. For each step, invoke the corresponding sub-skill and wait for it to complete before moving to the next.

1. Invoke `intake` to extract PDF data.
2. Invoke `planner` to analyze intake data and generate PRD markdown.
3. Invoke `qa-reviewer` to review and score the PRD (minimum 90/100). If < 90, loop back to step 2 for revision.
4. Invoke `generator` to scaffold Next.js and generate the code based on the approved PRD.
5. Invoke `seo` to run technical checks, review the generated content against the PRD, and validate against SEO constraints.
6. Invoke `debug` to run QA, visual debugging with Puppeteer, and SEO mismatch fixes.
7. Invoke `deploy` to deploy the site to Vercel.
