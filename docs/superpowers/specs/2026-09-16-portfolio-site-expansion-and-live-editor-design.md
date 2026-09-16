# Portfolio Site Architecture & Live Visual Editor Design Spec

- **Date**: 2026-09-16
- **Author**: Peggy Kuo / Antigravity
- **Status**: Approved

---

## 1. Overview & Objective

Expand the portfolio website from individual project pages into a unified, multi-page portfolio website while preserving the established minimalist editorial visual identity (Noto Serif/Sans TC, warm beige `#fdfbf4`, earth brown `#967155`, dark mode `#12100e`, floating icon theme toggle, 12px rounded cards, unified footer).

Additionally, implement an in-browser **Live Visual Editor HUD ("A 方案：全網頁即時調校與文字直改開關")** across all pages, allowing the user to directly click and edit copy, tweak line-height, spacing, and border-radius via sliders, auto-save drafts locally, export changes, and have Antigravity remove/permanently solidify the changes upon completion.

---

## 2. Site Architecture & Routing

| URL / File | Page Title | Purpose & Visual Content |
| :--- | :--- | :--- |
| `index.html` | 首頁 (Homepage) | Pure visual showcase layout based on `code_artifact.html`. 2 columns on top (4:3 aspect ratio cards for 陌生益所 and 咬牙切齒), and 1 wide banner spanning 2 columns below (21:9 / 3:1 for 平面設計). |
| `stranger.html` | 專案一 · 陌生益所 | The complete 陌生益所 case study page (brand web design, activity visuals, structured copy tool). |
| `animal-teeth.html` | 專案二 · 咬牙切齒 | The complete graduation project case study page (3D flipbook, infographics, exhibition video). |
| `graphic-design.html` | 平面設計頁 (Graphic Design) | Multi-column gallery showcasing promotional activity graphics, social media banners, and print design assets from `assets/`. |

---

## 3. Design System & Tokens (Preserving Original Identity)

- **Color Tokens**:
  - Light Canvas: `--bg: #fdfbf4`
  - Dark Canvas: `--bg: #12100e`
  - Primary Text: `--text: #2b2725` (Dark: `#f2ece4`)
  - Muted Text: `--text-muted: #6b635e` (Dark: `#a39990`)
  - Accent / Brand: `--accent: #967155` (Dark: `#d99b64`)
  - Line / Border: `--line: rgba(150, 113, 85, 0.18)` (Dark: `rgba(217, 155, 100, 0.2)`)
  - Card Background: `--card-bg: rgba(150, 113, 85, 0.035)` (Dark: `rgba(217, 155, 100, 0.04)`)
- **Typography**:
  - Title: `"Noto Serif TC", serif` (weights: 400, 500, 600)
  - Body: `"Noto Sans TC", sans-serif` (weights: 300, 400, 500)
- **Header Navigation**:
  - Sticky glassmorphism header (`backdrop-filter: blur(12px)`).
  - Left logo: `郭佩綺 · 作品集` (links to `index.html`).
  - Right nav items: `首頁` (active on index), `陌生益所` (active on stranger), `咬牙切齒` (active on animal-teeth), `平面設計` (active on graphic-design).
  - Theme toggle button: Pure floating icon `☀️`/`🌙` with spring hover animation.
- **Footer**:
  - Low-key typography: `聯絡方式 spad9111@gmail.com` with mailto link.
  - Copyright: `© 2026 郭佩綺 作品集。版權所有。`

---

## 4. Homepage Specification (`index.html`)

- **Structure**:
  - Header (matching other pages).
  - Main hero visual grid:
    - Card 1 (Top Left, 4:3 ratio): `assets/web-mockup.jpg` for 陌生益所. Hover zoom `scale(1.03)`, subtle caption overlay "陌生益所 ｜ 品牌視覺與網站體驗優化", clicking navigates to `stranger.html`.
    - Card 2 (Top Right, 4:3 ratio): `Capstone Project/web_assets/intro2.webp` for 咬牙切齒. Hover zoom `scale(1.03)`, subtle caption overlay "咬牙切齒 ｜ 資訊圖表與書籍設計", clicking navigates to `animal-teeth.html`.
    - Card 3 (Bottom Full Width, 21:9 / 3:1 ratio): Banner showcasing graphic design highlights (`assets/course-activity.png` / `assets/美編圖0426.jpg`), clicking navigates to `graphic-design.html`.
  - Footer.

---

## 5. Graphic Design Page Specification (`graphic-design.html`)

- **Structure**:
  - Header & Hero introducing "平面與社群視覺設計".
  - A+R Summary: "梳理品牌視覺語彙，統一活動宣傳版型，透過不對稱編排與俐落色彩規範，強化社群行銷轉化率。"
  - Showcase Grid:
    - Multi-column masonry or responsive grid (2-3 columns).
    - Features real assets: `assets/美編圖0412.png`, `assets/美編圖0420.jpg`, `assets/美編圖0426.jpg`, `assets/美編圖0501.jpg`, `assets/美編圖0605.jpg`, `assets/美編圖0618.jpg`.
    - Unified 12px rounded cards with hover spring elevation.
  - Footer.

---

## 6. Live Visual Editor HUD ("A 方案：全網頁即時調校與文字直改開關")

- **HUD Architecture**:
  - A self-contained script (`live-editor.js` or inline component) embedded across all 4 pages.
  - UI Component: Floating pill in bottom-right corner `🛠️ 視覺調校`.
  - Expanding Control Drawer (glassmorphic dark/light panel):
    1. **✏️ 點擊直接改文字 (Live Text Edit)**:
       - Toggle switch turning `contenteditable="true"` on headings (`h1`, `h2`, `h3`), paragraphs (`p`), spans (`.caption`, `.label`, `.value`, `.brief-text`).
       - Active state adds subtle dotted outline on hover and focus ring.
    2. **📐 即時版面數值調整 (CSS Variables Live Sliders)**:
       - **行距 (Line-Height)**: Slider `1.4` to `1.9` (default `1.6`), updates `--line-height-body` / `body.style.lineHeight`.
       - **區塊留白 (Section Spacing)**: 3-step buttons or slider (緊湊: 0.8x, 標準: 1x, 寬鬆: 1.3x).
       - **卡片圓角 (Border Radius)**: Slider `0px` to `24px` (default `12px`), updates `--card-radius`.
    3. **💾 本地草稿暫存 (Local Storage Auto-Save)**:
       - Key: `portfolio_live_draft_<pathname>`.
       - Auto-saves changes every 2 seconds or on blur.
       - On reload, restores saved text and slider values.
       - Includes "重設為預設值 (Reset)" button.
    4. **📋 一鍵複製修改代碼 (Copy / Export)**:
       - Generates full current page HTML (with HUD cleanly excluded or flag marked) and copies to clipboard.
       - User can easily paste in chat or click download.
    5. **👁️ 預覽訪客視角 (Hide/Collapse)**:
       - Closes drawer into mini floating badge.
- **Decommissioning Process**:
  - Once the user finalizes text and spacing, they notify the agent.
  - The agent reads the confirmed values and removes the HUD script, leaving behind 100% clean production code.

---

## 7. Verification & Success Criteria

1. All 4 HTML files validate with 0 mismatched tags via HTML parser.
2. Dark mode toggle works consistently across all pages, preserving user preference in `localStorage`.
3. Navigation links correctly highlight the active page and link properly across all pages (`index.html`, `stranger.html`, `animal-teeth.html`, `graphic-design.html`).
4. Live editor toggle allows typing in text and moving sliders without breaking layout.
