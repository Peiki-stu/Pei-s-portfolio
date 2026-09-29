# 影片剪輯類別（Video Editing）實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 為郭佩綺個人作品集建立第四項類別「影片剪輯」（video.html），更新全站導覽列與首頁卡片，並以簡約卡片畫廊 + 燈箱播放器展示芭樂動畫與音樂短影音。

**Architecture:** 依循現有原生 HTML5 + CSS Variables 設計系統，建立獨立 `video.html` 頁面，以純 CSS / Vanilla JS 實作彈簧物理動畫之 Lightbox Modal 播放器（自適應 16:9 YouTube 嵌入與 9:16 直式 MP4 影片）。更新 `index.html` 瀑布流網格與所有頁面的 header nav。

**Tech Stack:** HTML5, CSS3 (Variables, Kinetics spring transitions, Flexbox/Grid), Vanilla JavaScript (localStorage theme, Modal controls, YouTube iframe API).

## Global Constraints
- 設計規範：遵循 `DESIGN.md` 與 `.agents/skills/design-system/SKILL.md`，使用語意化 CSS 變數與 Kinetics spring physics `cubic-bezier(0.34, 1.56, 0.64, 1)`。
- 全站預設深色模式（`data-theme="dark"`），與現有 `localStorage.getItem("peggy-portfolio-theme-v2")` 完美相容。
- 導覽列一致性：5 個頁面（`index.html`, `stranger.html`, `animal-teeth.html`, `graphic-design.html`, `video.html`）均包含四個連結：網頁美編、專題製作、平面設計、影片剪輯，以及主題切換鈕。

---

### Task 1: 媒體資源準備（Assets Preparation）

**Files:**
- Create: `assets/video/`
- Create: `assets/video/guava-cover.jpg`
- Create: `assets/video/music-daily-cover.png`
- Create: `assets/video/music-daily.mp4`

- [ ] **Step 1: 建立資源目錄並下載芭樂動畫高畫質封面**
- [ ] **Step 2: 轉換「音樂與日常.mov」為高品質輕量 MP4，並建立封面圖**
- [ ] **Step 3: 驗證媒體檔案與尺寸**
- [ ] **Step 4: Commit 資源檔案**

---

### Task 2: 建立 `video.html` 影片剪輯專頁

**Files:**
- Create: `video.html`

- [ ] **Step 1: 編寫 HTML 結構與語意化 CSS**
  - 頂部導覽列（4 個分類，`影片剪輯` active）
  - Hero 區塊（標題、副標、標籤）
  - Video Gallery Grid（雙欄卡片，芭樂動畫與音樂短影音，hover 微動效）
  - Lightbox Modal（支援 16:9 YouTube 與 9:16 直式短影音切換、ESC 鍵關閉、遮罩關閉、關閉時自動暫停）
  - 頁尾 Footer
- [ ] **Step 2: 實作深色模式與燈箱互動 JavaScript**
- [ ] **Step 3: Commit `video.html`**

---

### Task 3: 同步更新全站導覽列與首頁瀑布流

**Files:**
- Modify: `index.html`
- Modify: `stranger.html`
- Modify: `animal-teeth.html`
- Modify: `graphic-design.html`

- [ ] **Step 1: 在 `index.html` 導覽列加入「影片剪輯」，並在瀑布流中新增影片卡片**
- [ ] **Step 2: 在 `stranger.html` 導覽列加入「影片剪輯」**
- [ ] **Step 3: 在 `animal-teeth.html` 導覽列加入「影片剪輯」**
- [ ] **Step 4: 在 `graphic-design.html` 導覽列加入「影片剪輯」**
- [ ] **Step 5: Commit 導覽列更新**

---

### Task 4: 測試與驗證

- [ ] **Step 1: 檢查各頁面導覽列跳轉與 active 狀態**
- [ ] **Step 2: 驗證燈箱播放器之 YouTube 與 MP4 播放、關閉暫停與響應式比例**
- [ ] **Step 3: 驗證深淺色切換在所有頁面運作正常**
- [ ] **Step 4: 提交最終成果供使用者預覽測試**
