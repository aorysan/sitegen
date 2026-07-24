---
name: intake
description: Extract text, persuasion points, and visual assets from Company Profile PDFs.
---

# Sitegen Intake

You are the first step in the site generation pipeline. Your task is to process a Company Profile PDF to extract raw data. You DO NOT design the page structure or plan the code; you only prepare clean, structured data for the `planning` skill.

## 1. Run Extraction
Execute the extraction script:
`python .agents/skills/sitegen/intake/scripts/extract.py <path_to_compro.pdf>`

## 2. Compile Data
Read the script output. The script automatically saves images to `D:\AryokPunya\Magang\sitegen\assets`.
Create a file named `intake_data.md` containing:
- **Raw Text**: Cleaned up text, preserving all persuasion points, value propositions, and contact info.
- **Asset Links**: A list of all image paths that were saved in the `assets/` directory.
- **Brand Colors**: Note any brand colors detected or inferred from the text/PDF.

Do NOT plan the website pages. Your only output should be `intake_data.md`.
