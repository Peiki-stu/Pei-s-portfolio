# 影片剪輯類別（Video Editing）設計規格書

## 1. 專案背景與目標
為郭佩綺個人作品集（Pei's Portfolio）新增第四項分類「影片剪輯」（Video Editing）。
展示兩大影音作品：
1. **國民水果「芭樂」特輯！水果知識網**（16:9 橫式 YouTube 知識普及動畫，獲農業知識入口網典藏收錄）
2. **音樂與日常 · Live Reel**（9:16 直式音樂現場短影音，底片膠卷調色與節奏剪輯）

使用者要求：快速建立以供預覽測試（方案 B：簡約卡片畫廊 + 燈箱播放）。

## 2. 資訊架構與全站更新
### 2.1 導覽列（Navigation）
全站所有頁面（`index.html`, `stranger.html`, `animal-teeth.html`, `graphic-design.html`, 以及新建的 `video.html`）統一導覽列：
- 網頁美編 (`stranger.html`)
- 專題製作 (`animal-teeth.html`)
- 平面設計 (`graphic-design.html`)
- 影片剪輯 (`video.html`)
- 色彩主題切換按鈕（🌙 / ☀️）

### 2.2 首頁（`index.html`）
在 Selected Works 瀑布流網格中新增【影片剪輯】精選卡片：
- 圖片：芭樂動畫封面
- 標題：國民水果「芭樂」特輯
- 描述：影片剪輯 · 農業知識入口網
- 連結：`video.html#guava`

## 3. `video.html` 頁面規格
### 3.1 視覺與設計系統（Design System）
- 遵循 `DESIGN.md` 與現有風格一致性：
  - CSS 變數：`--bg`, `--text`, `--text-muted`, `--line`, `--accent`, `--card-bg`
  - 預設深色模式（`data-theme="dark"`），支援與全站同步的 localStorage 主題切換
  - 字型：`Noto Serif TC`（標題）、`Noto Sans TC`（內文）
  - 微動效：Kinetics 彈簧過渡 `cubic-bezier(0.34, 1.56, 0.64, 1)`

### 3.2 頂部 Hero
- Eyebrow: `MOTION & VIDEO EDITING`
- 標題: `影片剪輯`
- 簡介: 專注於節奏流暢感與資訊動態敘事，涵蓋農業知識普及動畫短片與現場音樂短影音紀錄。
- 標籤: `#知識動畫 #音樂活動紀錄 #短影音 #節奏剪輯`

### 3.3 影片卡片畫廊（Video Gallery Grid）
雙欄響應式卡片排列：
1. **卡片 1（芭樂動畫）**
   - 比例：16:9
   - 封面截圖：清晰動畫主視覺，帶播放按鈕 overlay
   - 標籤：動畫剪輯 · 農業知識入口網典藏
   - 標題：國民水果「芭樂」特輯！水果知識網
   - 簡介：以家鄉高雄阿蓮芭樂田為起點，將芭樂小百科、家族品種與營養特調轉化為生動節奏的動態知識動畫。
   - 點擊操作：開啟 16:9 燈箱播放 YouTube 影片。

2. **卡片 2（音樂與日常）**
   - 比例：9:16
   - 封面截圖：現場演出的底片膠卷質感畫面，帶播放按鈕 overlay
   - 標籤：短影音剪輯 · 現場音樂
   - 標題：音樂與日常 · Live Reel
   - 簡介：以復古膠卷色調與音樂律動為核心，記錄現場情緒張力與生活光影的直式短影音。
   - 點擊操作：開啟 9:16 直式燈箱播放自訂影片播放器。

### 3.4 燈箱播放器（Lightbox Modal）
- 黑色半透明遮罩搭配高斯模糊（`backdrop-filter: blur(12px)`）。
- 彈簧動畫放大淡入。
- 支援 ESC 鍵、點擊遮罩或點擊關閉按鈕退出。
- 關閉燈箱時自動暫停影片，避免背景持續播放聲音。
- 自適應寬度與高度：橫式影片以 16:9 比例最大寬度呈現，直式影片以 9:16 手機比例限制高度呈現。

## 4. 媒體資源管理
- `assets/video/`：
  - `guava-cover.jpg`：芭樂動畫封面圖
  - `music-daily-cover.png`：音樂與日常封面圖
  - `music-daily.mp4`：將原始 86MB `.mov` 轉換壓縮為網頁標準相容之高品質 MP4（約 5~8MB），確保各端即時順暢播放。
