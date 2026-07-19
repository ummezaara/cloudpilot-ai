# CloudPilot AI

AI-powered SaaS dashboard that generates AWS cloud architectures from plain-English
requirements. Built as a GenAI + Cloud Computing internship MVP.

## Requirements
- **Node.js 20.9+** (required by Next.js 16 — check with `node -v`)

## Tech Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui primitives (Button)
- Framer Motion (architecture diagram animation)
- jsPDF (client-side PDF report generation — no server required)
- localStorage (generation history)

## Getting Started

```bash
npm install
npm run dev
```

- `/` — minimal hero landing page
- `/dashboard` — the actual product

## What This MVP Does

Describe an application requirement, click **Generate Architecture**, and the dashboard
populates with a recommended AWS service list, an architecture diagram, a plain-English
explanation, a cost estimate, and a Terraform starter template — laid out as a 3-row
widget grid (metrics row → full-width diagram → detail row). Content grows naturally
and the page scrolls normally; the requirement panel stays pinned (`position: sticky`)
while you scroll through the results.

**Working interactions:**
- **Generate Architecture** — large primary button directly below the requirement textarea; simulates a generation with a loading state, then populates all 5 result cards
- **Copy Prompt** — below the textarea; copies the current requirement text to the clipboard
- **Example prompts / Recent** — one click fills the textarea; the last 5 successful generations are saved to `localStorage` and reselectable, with a **Clear** action
- **Copy** (Terraform card) — copies the generated Terraform to the clipboard
- **Download** (Terraform card) — downloads a real `main.tf` file
- **Download PDF** (header) — generates a branded, multi-section PDF report client-side (requirement, AWS services, a vector-drawn architecture diagram, cost estimate, Terraform preview, CloudPilot AI branding on every page)
- Editing the prompt after a successful generation marks results stale (back to placeholders) until you generate again

Generation is simulated client-side with realistic mock data
(`lib/hooks/use-architecture-generation.ts` + `config/architecture-demo.ts`) so the full
UI flow works end to end before a real API is wired in as a follow-up step.

## Layout & Responsive Behavior

- **Desktop (1024px+):** natural page scroll. A 280px requirement panel sticks to the
  top-left as you scroll (`lg:sticky lg:top-20`); a 3-row widget grid fills the right —
  AWS Services + Cost Estimate (top, compact), Architecture Diagram (middle, full width,
  responsive height clamped between 450–600px via `h-[clamp(450px,55vh,600px)]`),
  Explanation + Terraform Preview (bottom, grow to fit their content). Every grid track
  still uses `minmax(0, ...)` and every grid item still has `min-width: 0` so long
  unbreakable content (Terraform code, diagram labels) can't stretch the grid wider
  than the viewport — that constraint is about horizontal overflow and is independent
  of vertical scrolling, which is now fully natural.
- **Tablet / Mobile (<1024px):** single-column stack, page scrolls naturally (unchanged).

Note: the Terraform code block intentionally keeps its own internal horizontal
scrollbar for long lines — that's standard code-block behavior (same as GitHub or a
code editor), unrelated to page scrolling.

## Folder Structure

```
app/
  page.tsx                    # landing page
  dashboard/page.tsx           # dashboard page
  layout.tsx
  globals.css                  # includes the .dashboard-grid layout definition
components/
  ui/
    button.tsx                 # shadcn/ui primitive
  landing/
    hero.tsx
  dashboard/
    card-shell.tsx              # shared card chrome used by all 5 result cards
    loading-states.tsx          # shared EmptyState / Skeleton primitives
    action-button.tsx           # shared icon+label button chrome
    copy-button.tsx             # clipboard-copy action (uses ActionButton)
    download-button.tsx         # file-download action (uses ActionButton)
    prompt-chip-list.tsx        # shared chip list (examples + history)
    dashboard-header.tsx        # top bar + Download PDF
    requirement-panel.tsx       # left panel: input, copy, generate, examples, history
    results-panel.tsx           # right panel: the 3-row widget grid
    cards/                      # the 5 individual result cards
  shared/
    architecture-diagram.tsx    # reusable diagram — swaps for real Mermaid output later
config/
  architecture-demo.ts          # single source of truth for all mock/demo data,
                                 # including diagram node/edge layout (shared by the
                                 # React diagram AND the PDF generator)
lib/
  hooks/
    use-architecture-generation.ts  # generation state
    use-architecture-history.ts     # localStorage-backed history
  pdf/
    generate-report.ts          # jsPDF report builder
  utils.ts
```
