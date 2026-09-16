# Portfolio Site Expansion & Live Editor Implementation Plan

> **Goal:** Create unified portfolio homepage, graphic design page, rewire project pages, and inject Live Editor HUD across all 4 pages.
> **Architecture Spec:** `docs/superpowers/specs/2026-09-16-portfolio-site-expansion-and-live-editor-design.md`

---

## Tasks

- [ ] **Task 1: Create `stranger.html` from current `index.html`**
  - Duplicate current `index.html` as `stranger.html`
  - Update navbar: `index.html` (Logo & 首頁), `stranger.html` (active: 陌生益所), `animal-teeth.html` (咬牙切齒), `graphic-design.html` (平面設計)

- [ ] **Task 2: Build `assets/live-editor.js` (Modular Visual HUD)**
  - Floating pill: `🛠️ 視覺調校` (bottom-right)
  - Drawer UI:
    - Text edit toggle: switches `contenteditable="true"` on `h1, h2, h3, p, span.caption, .value`
    - Sliders: Line-height (`1.4` - `1.9`), Spacing scale (`0.8` - `1.4`), Border-radius (`0px` - `24px`)
    - Auto-save to `localStorage` key `portfolio_draft_<pathname>`
    - Copy edited HTML button
    - Restore/Reset defaults button

- [ ] **Task 3: Build `index.html` (Homepage)**
  - Implement layout from `code_artifact.html` using original tokens (`#fdfbf4`, `#967155`, dark mode `#12100e`)
  - Top 2 cards (4:3): `assets/web-mockup.jpg` -> `stranger.html`, `Capstone Project/web_assets/intro2.webp` -> `animal-teeth.html`
  - Bottom card (21:9): `assets/course-activity.png` -> `graphic-design.html`
  - Include `assets/live-editor.js`

- [ ] **Task 4: Build `graphic-design.html`**
  - Header & Hero with A+R statement for Graphic Design
  - Responsive multi-column showcase featuring real assets (`美編圖0412.png`, `美編圖0420.jpg`, `美編圖0426.jpg`, `美編圖0501.jpg`, `美編圖0605.jpg`, `美編圖0618.jpg`)
  - Include `assets/live-editor.js`

- [ ] **Task 5: Update `animal-teeth.html`**
  - Update navbar links (`index.html`, `stranger.html`, `animal-teeth.html`, `graphic-design.html`)
  - Include `assets/live-editor.js`

- [ ] **Task 6: Verification & Git Commit**
  - Run HTML validation across all 4 files
  - Verify zero mismatched tags, verify links
  - Commit all changes
