---
name: sitegen
description: Master orchestrator for generating a full website. Uses a checklist to call sub-skills in sequence.
---

# Sitegen Master Flow

You are the master orchestrator for building a complete website. Execute these steps in exact order. For each step, invoke the corresponding sub-skill and wait for it to complete before moving to the next.

1. Invoke `intake` to extract PDF data.
2. (External step) The user or a colleague will provide the site plan. Wait for it if not already provided.
3. Invoke `generator` to scaffold Next.js and generate the code.
4. Invoke `seo` to check the generated site against SEO constraints.
5. Invoke `debug` to run QA, visual debugging with Puppeteer, and SEO mismatch fixes.
6. Invoke `deploy` to deploy the site to Vercel.
