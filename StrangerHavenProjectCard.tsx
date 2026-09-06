import React, { useState } from "react";

/**
 * StrangerHavenProjectCard
 *
 * 專為個人作品集網頁設計的旗艦專案卡片組件。
 * 遵守 DESIGN.md 規範與 21st.dev / Kinetics 物理彈簧微動效。
 *
 * 亮點定位：
 * - 網頁設計師｜人工智慧協作設計 (Web Designer ✕ AI-Assisted Prototyping)
 * - 3D 空間照片藝廊 (Three.js / React Three Fiber)
 * - 品牌視覺美學 (Editorial 雜誌感、Noto Serif TC、暖米留白)
 * - 運營自動化工具 (Python Streamlit 轉換平台)
 */

export interface ProjectCardProps {
  onOpenDetails?: () => void;
}

export const StrangerHavenProjectCard: React.FC<ProjectCardProps> = ({ onOpenDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "3d" | "editorial" | "tool" | "ai">("overview");

  const handleOpen = () => {
    if (onOpenDetails) {
      onOpenDetails();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 作品集卡片 (Bento Grid Card with Kinetics Spring Physics)                */}
      {/* ========================================================================= */}
      <article
        onClick={handleOpen}
        className="group relative rounded-3xl overflow-hidden p-1 border border-white/10 hover:border-indigo-500/40 bg-slate-900/80 backdrop-blur-xl transition-all duration-300 shadow-2xl shadow-black/50 cursor-pointer"
        style={{
          transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.015) translateY(-2px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1) translateY(0)")}
      >
        <div className="p-6 md:p-8 rounded-[22px] bg-gradient-to-br from-[#121929]/90 via-[#0f1524]/95 to-[#0b0f19] flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* 左側視覺預覽 (3D Web & Visual Mockup) */}
          <div className="lg:w-7/12 relative rounded-2xl overflow-hidden bg-[#050508] border border-white/10 min-h-[320px] flex flex-col justify-between group/preview">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-950/20 via-transparent to-indigo-950/30 pointer-events-none" />
            
            {/* 標籤欄 */}
            <div className="relative z-10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider bg-amber-900/40 text-amber-300 border border-amber-500/30">
                  陌生益所 Stranger Haven
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider bg-indigo-900/40 text-indigo-300 border border-indigo-500/30">
                  3D Web Experience
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-black/50 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur">
                27+ 視覺資產模組
              </span>
            </div>

            {/* 3D 空間感示意 */}
            <div className="relative z-10 px-6 py-4 flex-1 flex items-center justify-center">
              <div className="relative w-full max-w-sm h-40 flex items-center justify-center">
                
                {/* 左側軌道海報 */}
                <div className="w-28 h-36 rounded-lg shadow-xl overflow-hidden border border-amber-200/20 transform -rotate-6 -translate-x-10 scale-90 transition-transform duration-500 group-hover/preview:-translate-x-12 bg-[#fdfbf4] p-2 flex flex-col justify-between">
                  <div className="text-[8px] font-serif text-[#967155] font-bold">5月活動海報</div>
                  <div className="h-16 bg-amber-100/60 rounded flex items-center justify-center text-[9px] text-[#967155] font-serif text-center px-1">
                    人與人真誠交流
                  </div>
                  <div className="text-[7px] text-slate-500 font-mono">0501.jpg</div>
                </div>

                {/* 中央主要海報 */}
                <div className="w-32 h-44 rounded-xl shadow-2xl overflow-hidden border-2 border-indigo-500/40 z-20 transition-transform duration-500 group-hover/preview:scale-105 bg-[#fdfbf4] p-2.5 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[9px] font-serif text-[#967155] font-bold">
                    <span>課程總表</span>
                    <span className="text-[7px] font-mono px-1 rounded bg-amber-100 text-amber-800">精選</span>
                  </div>
                  <div className="h-20 bg-gradient-to-b from-amber-50 to-orange-50/70 rounded border border-amber-200/40 p-1 flex flex-col justify-center items-center text-center">
                    <span className="font-serif text-[11px] text-[#2c2c2c] font-bold">比起課程本身</span>
                    <span className="font-serif text-[9px] text-[#967155] mt-0.5">我們更在乎連結</span>
                  </div>
                  <div className="flex justify-between items-center text-[7px] text-[#8c8c8c] font-mono">
                    <span>Editorial Layout</span>
                    <span>Cam: 0.4x</span>
                  </div>
                </div>

                {/* 右側軌道海報 */}
                <div className="w-28 h-36 rounded-lg shadow-xl overflow-hidden border border-amber-200/20 transform rotate-6 translate-x-10 scale-90 transition-transform duration-500 group-hover/preview:translate-x-12 bg-[#fdfbf4] p-2 flex flex-col justify-between">
                  <div className="text-[8px] font-serif text-[#967155] font-bold">IG 專版</div>
                  <div className="h-16 bg-amber-100/60 rounded flex items-center justify-center text-[9px] text-[#967155] font-serif text-center px-1">
                    溫柔留白 · 慢生活
                  </div>
                  <div className="text-[7px] text-slate-500 font-mono">0502ig.jpg</div>
                </div>

              </div>
            </div>

            {/* 底部狀態列 */}
            <div className="relative z-10 p-3.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>Three.js 雙軌無限空間藝廊</span>
              </div>
              <span className="text-indigo-300 group-hover/preview:translate-x-1 transition-transform inline-flex items-center gap-1">
                閱讀 Case Study <span>→</span>
              </span>
            </div>
          </div>

          {/* 右側內容與價值敘述 */}
          <div className="lg:w-5/12 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-slate-300 border border-white/10">
                  WEB DESIGN
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  AI-COLLABORATIVE
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  EDITORIAL STYLE
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight mb-1 group-hover:text-indigo-300 transition-colors">
                陌生益所 Stranger Haven
              </h3>
              <p className="text-sm font-medium text-amber-200/80 mb-3 font-serif">
                品牌數位美學體系重塑與 3D 空間互動設計
              </p>

              <p className="text-slate-300 text-sm leading-relaxed mb-5">
                以「Editorial 雜誌感」重構品牌數位體驗。作為網頁設計師，我主導視覺語言與空間動線，並<strong>透過 AI 協作開發 React + Three.js 3D 空間藝廊與 Python 自動化上架工具</strong>，兼顧品牌的高級感傳達與日常運營效率。
              </p>

              {/* 關鍵成效指針 */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-xl font-bold text-emerald-400 font-mono">+70%</div>
                  <div className="text-[11px] text-slate-400">上架籌備時間縮減</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-xl font-bold text-indigo-400 font-mono">100%</div>
                  <div class="text-[11px] text-slate-400">全渠道視覺美學統一</div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-1.5 mb-4 text-[11px] font-mono text-slate-400">
                <span className="px-2 py-0.5 rounded bg-white/5">React 18</span>
                <span className="px-2 py-0.5 rounded bg-white/5">Three.js / Fiber</span>
                <span className="px-2 py-0.5 rounded bg-white/5">Tailwind CSS</span>
                <span className="px-2 py-0.5 rounded bg-white/5">Python Streamlit</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-xs text-slate-400">
                  <span className="text-slate-500">角色：</span> 網頁設計師 ✕ 視覺編輯
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-500/25 transition-transform"
                  style={{ transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                >
                  <span>閱讀完整 Case Study</span>
                  <span>→</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </article>

      {/* ========================================================================= */}
      {/* 完整 Case Study 展開彈窗 (Interactive Modal with 5 Tabs)                    */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-5xl max-h-[92vh] bg-[#0d1322] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "modalSpring 0.45s cubic-bezier(0.18, 1.25, 0.4, 1) forwards" }}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-slate-900/80 backdrop-blur sticky top-0 z-20">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">陌生益所 Stranger Haven</h3>
                <p className="text-xs text-slate-400 font-serif">品牌數位美學體系重塑與 3D 空間互動設計 Case Study</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 bg-[#090d17] px-6 text-xs font-medium gap-2 pt-2 overflow-x-auto">
              {[
                { id: "overview", label: "01. 專案概觀 & 挑戰" },
                { id: "3d", label: "02. 3D 空間藝廊 (Three.js)" },
                { id: "editorial", label: "03. Editorial 視覺系統" },
                { id: "tool", label: "04. 上架工具自動化 (Python)" },
                { id: "ai", label: "05. AI 協作聲明與成果" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 px-3 transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? "text-indigo-400 border-indigo-500 font-semibold"
                      : "text-slate-400 border-transparent hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 text-slate-300 text-sm leading-relaxed">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-[#172033] to-[#121929] border border-white/10">
                    <p className="text-base md:text-lg text-white font-serif leading-relaxed mb-3">
                      「比起課程本身，我們更加在乎學員間的連結；課前皆包含自我介紹環節，是認識夥伴與共同成長的起點。」
                    </p>
                    <p className="text-slate-300 text-xs md:text-sm">
                      本專案針對獨立電商品牌「陌生益所 Stranger Haven」進行數位體驗升級。我統籌網頁視覺與活動體驗，拒絕促銷電商套版，建立「Editorial 雜誌感」視覺系統；並導入 AI 協作設計，落地了 3D 空間照片藝廊與自動化上架工具。
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-rose-500/[0.04] border border-rose-500/20">
                      <div className="text-rose-400 font-mono text-xs mb-1">01. 視覺困境</div>
                      <h4 className="text-white font-semibold text-xs mb-1">避免廉價商業 UI 感</h4>
                      <p className="text-xs text-slate-400">剔除粗暴按鈕與強烈 CTA，轉向獨立選物店與雜誌般的留白美學。</p>
                    </div>
                    <div className="p-4 rounded-xl bg-rose-500/[0.04] border border-rose-500/20">
                      <div className="text-rose-400 font-mono text-xs mb-1">02. 展示困境</div>
                      <h4 className="text-white font-semibold text-xs mb-1">27+ 海報難以沉浸展出</h4>
                      <p className="text-xs text-slate-400">打破靜態列表，打造雙軌無限空間漫遊的 3D 沉浸式展示。</p>
                    </div>
                    <div className="p-4 rounded-xl bg-rose-500/[0.04] border border-rose-500/20">
                      <div className="text-rose-400 font-mono text-xs mb-1">03. 運營困境</div>
                      <h4 className="text-white font-semibold text-xs mb-1">非結構化文案上架繁瑣</h4>
                      <p className="text-xs text-slate-400">自研 Python 工具自動解析文字並生成規格化 HTML 與平台匯入檔。</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "3d" && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white">Three.js 3D 雙軌無限空間藝廊</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    採用 React 18 搭配 @react-three/fiber 與 @react-three/drei 構建。相機以 0.4x 慢速在雙軌（x = -2.3 / +2.3）之間優雅前進，景深淡出邊界自然，搭配點擊展開的無邊框 Lightbox 燈箱，將 27 款課程海報升華為藝術展覽體驗。
                  </p>
                  <div className="p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs text-indigo-300">
                    <div>// 3D 核心配置</div>
                    <div className="text-slate-400">· 左右分軌排列，徹底解決圖片重疊</div>
                    <div className="text-slate-400">· 獨立組件容器，可全螢幕亦可嵌入網頁 Section</div>
                    <div className="text-slate-400">· 支援手機觸控、滑鼠滾輪與鍵盤鍵位交互</div>
                  </div>
                </div>
              )}

              {activeTab === "editorial" && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white">Editorial 雜誌感品牌美學規範</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#fdfbf4] text-[#2c2c2c]">
                      <div className="font-bold">#fdfbf4</div>
                      <div className="text-[10px] text-slate-600">溫潤米白底色</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#967155] text-white">
                      <div className="font-bold">#967155</div>
                      <div className="text-[10px] text-amber-200">品牌大地棕</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#4a4a4a] text-white">
                      <div className="font-bold">#4a4a4a</div>
                      <div className="text-[10px] text-slate-300">深沉閱讀黑</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#E8C28E] text-slate-900">
                      <div className="font-bold">#E8C28E</div>
                      <div className="text-[10px] text-slate-800">溫暖微金按鈕</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300">
                    採用 <code>Noto Serif TC</code> 作為標題、<code>Noto Sans TC</code> 作為內文，配置 2.0-2.2 的大行距與 3px 字距，讓讀者在呼吸留白間感受慢生活的質感。
                  </p>
                </div>
              )}

              {activeTab === "tool" && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white">Python 文案自動轉換系統 (Streamlit)</h4>
                  <p className="text-xs text-slate-300">
                    透過自然語言過濾與正規表達式清洗，自動抽取時間、地點、費用、導師介紹，並即時預覽品牌格式 HTML，一鍵導出電商平台規格的 CSV/XLSX，上架週期縮短 70%。
                  </p>
                </div>
              )}

              {activeTab === "ai" && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
                    <h4 className="text-sm font-bold text-white mb-2">人工智慧協作正式聲明</h4>
                    <p className="text-xs text-slate-200 leading-relaxed mb-3">
                      本作品在製作過程中使用人工智慧作為開發協作工具。我主要負責網站的<strong>整體概念、視覺方向、版面配置、使用者體驗、3D 互動效果構想與最終呈現</strong>；並透過人工智慧協助將設計想法轉化為可以實際操作的 3D 網頁原型與自動化運營工具。
                    </p>
                    <p className="text-[11px] text-slate-400">
                      製作過程中，我持續測試與調優程式產生的效果與微動效手感，確保最終成果完全符合品牌氛圍與使用需求。
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 px-6 border-t border-white/10 flex justify-end bg-slate-900/80">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StrangerHavenProjectCard;
