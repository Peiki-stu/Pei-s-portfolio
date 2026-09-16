/**
 * Peggy Portfolio - Live Visual & Text Editor HUD
 * A 方案：全網頁即時調校與文字直改開關
 */
(function () {
  if (window.__LIVE_EDITOR_INITIALIZED__) return;
  window.__LIVE_EDITOR_INITIALIZED__ = true;

  const STORAGE_KEY = `portfolio_draft_${window.location.pathname}`;
  const SETTINGS_KEY = `portfolio_settings_${window.location.pathname}`;

  // 1. 注入 HUD 專屬樣式
  const style = document.createElement("style");
  style.id = "live-editor-styles";
  style.textContent = `
    #live-editor-root {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans TC", sans-serif;
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      color: #2b2725;
      font-size: 13px;
    }
    .dark #live-editor-root, [data-theme="dark"] #live-editor-root {
      color: #f2ece4;
    }
    .hud-trigger-btn {
      background: #2b2725;
      color: #fdfbf4;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 30px;
      padding: 10px 18px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease;
    }
    .hud-trigger-btn:hover {
      transform: scale(1.05) translateY(-2px);
      background: #967155;
    }
    .hud-panel {
      display: none;
      position: absolute;
      bottom: 52px;
      right: 0;
      width: 330px;
      background: rgba(253, 251, 244, 0.96);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(150, 113, 85, 0.25);
      border-radius: 16px;
      padding: 18px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
      flex-direction: column;
      gap: 14px;
    }
    .dark .hud-panel, [data-theme="dark"] .hud-panel {
      background: rgba(24, 22, 20, 0.96);
      border-color: rgba(217, 155, 100, 0.3);
    }
    .hud-panel.open {
      display: flex;
      animation: hudFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes hudFadeIn {
      from { opacity: 0; transform: translateY(12px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .hud-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(150, 113, 85, 0.15);
      padding-bottom: 10px;
    }
    .hud-title {
      font-weight: 600;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .hud-close-btn {
      background: transparent;
      border: none;
      font-size: 16px;
      cursor: pointer;
      color: inherit;
      opacity: 0.6;
      transition: opacity 0.2s;
    }
    .hud-close-btn:hover { opacity: 1; }
    .hud-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .hud-row-title {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 500;
      opacity: 0.8;
    }
    .hud-switch-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(150, 113, 85, 0.08);
      padding: 10px 12px;
      border-radius: 10px;
    }
    .hud-switch {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 22px;
    }
    .hud-switch input { opacity: 0; width: 0; height: 0; }
    .hud-slider-round {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: #ccc;
      transition: .3s;
      border-radius: 22px;
    }
    .hud-slider-round:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .3s;
      border-radius: 50%;
    }
    input:checked + .hud-slider-round {
      background-color: #967155;
    }
    input:checked + .hud-slider-round:before {
      transform: translateX(18px);
    }
    .hud-slider-input {
      width: 100%;
      accent-color: #967155;
      cursor: pointer;
    }
    .hud-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 4px;
    }
    .hud-btn {
      border: 1px solid rgba(150, 113, 85, 0.25);
      background: #fdfbf4;
      color: #2b2725;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .dark .hud-btn, [data-theme="dark"] .hud-btn {
      background: #23201d;
      color: #f2ece4;
    }
    .hud-btn:hover {
      background: #967155;
      color: #ffffff;
      border-color: #967155;
    }
    .hud-btn-primary {
      background: #967155;
      color: #ffffff;
      border-color: #967155;
    }
    .hud-btn-primary:hover {
      background: #7d5c44;
    }
    .hud-badge {
      font-size: 10px;
      background: #967155;
      color: white;
      padding: 2px 6px;
      border-radius: 10px;
    }
    /* 點擊編輯文字時的醒目視覺反饋 */
    body.live-editing [contenteditable="true"] {
      outline: 1px dashed rgba(150, 113, 85, 0.4) !important;
      outline-offset: 2px;
      cursor: text;
      border-radius: 3px;
      transition: outline 0.15s ease, background 0.15s ease;
    }
    body.live-editing [contenteditable="true"]:hover {
      outline: 1.5px dashed #967155 !important;
      background: rgba(150, 113, 85, 0.05);
    }
    body.live-editing [contenteditable="true"]:focus {
      outline: 2px solid #967155 !important;
      background: rgba(150, 113, 85, 0.08);
    }
    .hud-toast {
      position: fixed;
      bottom: 84px;
      right: 24px;
      background: #2b2725;
      color: #fdfbf4;
      padding: 10px 18px;
      border-radius: 30px;
      font-size: 13px;
      z-index: 9999999;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      animation: hudToastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes hudToastIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  // 2. 建立 HUD DOM
  const root = document.createElement("div");
  root.id = "live-editor-root";
  root.innerHTML = `
    <button class="hud-trigger-btn" id="hud-toggle-btn" title="開啟視覺與文字調校模式">
      <span>🛠️</span> 視覺調校模式
    </button>
    <div class="hud-panel" id="hud-panel">
      <div class="hud-header">
        <div class="hud-title">
          <span>🛠️</span> 網頁視覺調校面板 <span class="hud-badge">Draft</span>
        </div>
        <button class="hud-close-btn" id="hud-close-btn">✕</button>
      </div>

      <!-- 1. 文字點擊直接修改 -->
      <div class="hud-switch-box">
        <div>
          <div style="font-weight: 600; font-size: 13px;">✏️ 點擊直接改文字</div>
          <div style="font-size: 11px; opacity: 0.7;">開啟後滑鼠點標題/段落直接打字</div>
        </div>
        <label class="hud-switch">
          <input type="checkbox" id="hud-text-edit-toggle">
          <span class="hud-slider-round"></span>
        </label>
      </div>

      <!-- 2. 行距調整滑桿 -->
      <div class="hud-row">
        <div class="hud-row-title">
          <span>文字行距 (Line Height)</span>
          <span id="hud-val-line-height">1.6</span>
        </div>
        <input type="range" min="1.3" max="1.9" step="0.05" value="1.6" class="hud-slider-input" id="hud-input-line-height">
      </div>

      <!-- 3. 圓角大小調整滑桿 -->
      <div class="hud-row">
        <div class="hud-row-title">
          <span>卡片與按鈕圓角</span>
          <span id="hud-val-radius">12px</span>
        </div>
        <input type="range" min="0" max="24" step="2" value="12" class="hud-slider-input" id="hud-input-radius">
      </div>

      <!-- 4. 區塊間距快速縮放 -->
      <div class="hud-row">
        <div class="hud-row-title">
          <span>留白間距 (Section Gap)</span>
          <span id="hud-val-spacing">標準</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
          <button class="hud-btn" id="hud-btn-compact">緊湊</button>
          <button class="hud-btn" id="hud-btn-normal" style="background:#967155;color:white;">標準</button>
          <button class="hud-btn" id="hud-btn-relaxed">寬鬆</button>
        </div>
      </div>

      <!-- 操作按鈕 -->
      <div class="hud-actions">
        <button class="hud-btn hud-btn-primary" id="hud-copy-btn">
          📋 一鍵複製修改後整頁 HTML
        </button>
        <button class="hud-btn" id="hud-reset-btn" style="opacity: 0.85;">
          ↺ 重設回原本預設值
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(root);

  // 3. 邏輯綁定
  const toggleBtn = document.getElementById("hud-toggle-btn");
  const panel = document.getElementById("hud-panel");
  const closeBtn = document.getElementById("hud-close-btn");
  const textEditToggle = document.getElementById("hud-text-edit-toggle");
  const lineHeightInput = document.getElementById("hud-input-line-height");
  const lineHeightVal = document.getElementById("hud-val-line-height");
  const radiusInput = document.getElementById("hud-input-radius");
  const radiusVal = document.getElementById("hud-val-radius");
  const copyBtn = document.getElementById("hud-copy-btn");
  const resetBtn = document.getElementById("hud-reset-btn");
  const btnCompact = document.getElementById("hud-btn-compact");
  const btnNormal = document.getElementById("hud-btn-normal");
  const btnRelaxed = document.getElementById("hud-btn-relaxed");

  // 開關面板
  toggleBtn.addEventListener("click", () => panel.classList.toggle("open"));
  closeBtn.addEventListener("click", () => panel.classList.remove("open"));

  // 提示訊息
  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "hud-toast";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.3s";
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // 點擊直接改文字邏輯
  const editableSelectors = "h1, h2, h3, h4, p, span.caption, span.label, span.value, .point-title, .point-desc, .section-desc, .swatch-code, .hero-subtitle, .eyebrow";
  
  function setTextEditable(enable) {
    document.body.classList.toggle("live-editing", enable);
    const elements = document.querySelectorAll(editableSelectors);
    elements.forEach(el => {
      if (el.closest("#live-editor-root")) return;
      if (enable) {
        el.setAttribute("contenteditable", "true");
        el.setAttribute("spellcheck", "false");
        el.addEventListener("input", saveDraftDebounced);
      } else {
        el.removeAttribute("contenteditable");
      }
    });
    if (enable) {
      showToast("✏️ 已開啟直接打字模式！點擊頁面文字即可修改");
    }
  }

  textEditToggle.addEventListener("change", (e) => {
    setTextEditable(e.target.checked);
  });

  // 行距調整
  lineHeightInput.addEventListener("input", (e) => {
    const val = e.target.value;
    lineHeightVal.textContent = val;
    document.body.style.lineHeight = val;
    document.documentElement.style.setProperty("--line-height-body", val);
    saveSettings();
  });

  // 圓角調整
  radiusInput.addEventListener("input", (e) => {
    const val = e.target.value + "px";
    radiusVal.textContent = val;
    document.querySelectorAll(".career-note, .execution-block, .flat-stage, .flat-frame, .poster-main-card, .tile-card, .tool-frame, .swatch, .feature-card, .project-card, .gallery-item").forEach(el => {
      el.style.borderRadius = val;
    });
    saveSettings();
  });

  // 間距調整按鈕
  function setSpacing(scale, label, activeBtn) {
    [btnCompact, btnNormal, btnRelaxed].forEach(b => {
      b.style.background = "";
      b.style.color = "";
    });
    activeBtn.style.background = "#967155";
    activeBtn.style.color = "white";
    document.getElementById("hud-val-spacing").textContent = label;

    document.documentElement.style.setProperty("--space-sm", `${0.75 * scale}rem`);
    document.documentElement.style.setProperty("--space-md", `${1.25 * scale}rem`);
    document.documentElement.style.setProperty("--space-lg", `${1.8 * scale}rem`);
    saveSettings();
  }

  btnCompact.addEventListener("click", () => setSpacing(0.75, "緊湊", btnCompact));
  btnNormal.addEventListener("click", () => setSpacing(1, "標準", btnNormal));
  btnRelaxed.addEventListener("click", () => setSpacing(1.3, "寬鬆", btnRelaxed));

  // 自動存草稿至 localStorage
  let saveTimer = null;
  function saveDraftDebounced() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveDraft, 800);
  }

  function saveDraft() {
    const main = document.querySelector("main");
    if (main) {
      localStorage.setItem(STORAGE_KEY, main.innerHTML);
    }
    saveSettings();
  }

  function saveSettings() {
    const settings = {
      lineHeight: lineHeightInput.value,
      radius: radiusInput.value,
      spacing: document.getElementById("hud-val-spacing").textContent
    };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  function restoreDraft() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const main = document.querySelector("main");
    if (saved && main) {
      main.innerHTML = saved;
      showToast("💾 已自動載入先前修改的草稿內容！");
    }
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      try {
        const s = JSON.parse(savedSettings);
        if (s.lineHeight) {
          lineHeightInput.value = s.lineHeight;
          lineHeightVal.textContent = s.lineHeight;
          document.body.style.lineHeight = s.lineHeight;
        }
        if (s.radius) {
          radiusInput.value = s.radius;
          radiusVal.textContent = s.radius + "px";
          document.querySelectorAll(".career-note, .execution-block, .flat-stage, .flat-frame, .poster-main-card, .tile-card, .tool-frame, .swatch, .feature-card, .project-card, .gallery-item").forEach(el => {
            el.style.borderRadius = s.radius + "px";
          });
        }
        if (s.spacing === "緊湊") setSpacing(0.75, "緊湊", btnCompact);
        else if (s.spacing === "寬鬆") setSpacing(1.3, "寬鬆", btnRelaxed);
      } catch (e) {}
    }
  }

  // 一鍵複製完整 HTML
  copyBtn.addEventListener("click", () => {
    // 複製時暫時清除 contenteditable 屬性
    const wasEditing = textEditToggle.checked;
    if (wasEditing) setTextEditable(false);

    const docClone = document.documentElement.cloneNode(true);
    const hudInClone = docClone.querySelector("#live-editor-root");
    const styleInClone = docClone.querySelector("#live-editor-styles");
    if (hudInClone) hudInClone.remove();
    if (styleInClone) styleInClone.remove();

    const cleanHtml = "<!DOCTYPE html>\n" + docClone.outerHTML;

    if (wasEditing) setTextEditable(true);

    navigator.clipboard.writeText(cleanHtml).then(() => {
      showToast("📋 已複製整頁乾淨 HTML！直接在對話框貼給我即可固化！");
    }).catch(() => {
      showToast("請手動選取文字或按允許剪貼簿權限");
    });
  });

  // 重設草稿
  resetBtn.addEventListener("click", () => {
    if (confirm("確定要重設並清空本頁所有未固化的草稿修改嗎？")) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SETTINGS_KEY);
      window.location.reload();
    }
  });

  // 初始載入草稿
  restoreDraft();
})();
