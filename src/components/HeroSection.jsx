import React from 'react';

/**
 * HeroSection Component
 * Replicates the visual architecture of image_0.png.
 * Features a full-bleed background image, dark blue badge, Noto Sans JP typography,
 * and a high-contrast Aoneko Red CTA button with 2.5rem border-radius.
 */
export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-slate-100 overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      
      {/* Background Fullscreen Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/hero_bg.png')" }}
      />
      
      {/* Soft gradient overlay for text legibility (Light Blue / White overlay from left to right) */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent/10 md:from-[#F3F9FD] md:via-[#F3F9FD]/95 md:to-transparent/10" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-2xl space-y-6 text-center md:text-left">
          
          {/* Top Left Floating Badge (Dark Blue background #0B2545, white text) */}
          <div className="inline-block bg-jeimas-blue text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md tracking-wider">
            愛知・岐阜・三重エリア最短20分！
          </div>

          {/* Main Title (font-weight: 900 Black, tracking: -0.02em, color: Jeimas Blue #00234B) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-jeimas-blue-dark leading-tight tracking-[-0.02em]">
            暮らしの「困った」を<br />
            スッキリ解決します
          </h1>

          {/* Descriptive body text */}
          <p className="text-base sm:text-lg md:text-xl text-slate-700 font-medium leading-relaxed">
            エアコンクリーニング 7000円から不用品回収 即日作業まで。<br />
            粗大ゴミ 格安 処分、ゴミ屋敷 清掃 丸投げなど、便利屋「青ねこ」へ完全丸投げでお任せください！
          </p>

          {/* Main CTA Button in Aoneko Red (#DC2626) with border-radius: 2.5rem and shine sweep */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start pt-4">
            <a 
              href="tel:0120-502-622" 
              className="shine-button w-full sm:w-auto flex items-center justify-center gap-4 bg-gradient-to-r from-aoneko-red to-[#F03030] text-white font-extrabold py-5 px-8 sm:px-12 rounded-[2.5rem] border border-white/10 shadow-[0_12px_28px_-6px_rgba(220,38,38,0.45),0_8px_16px_-6px_rgba(220,38,38,0.25)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
            >
              <div className="bg-white/20 p-2.5 rounded-full">
                <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[10px] opacity-90 tracking-wider">通話料無料・24時間365日受付</p>
                <p className="text-lg sm:text-xl md:text-2xl font-black">0120-502-622</p>
              </div>
            </a>

            <div className="text-slate-500 text-xs sm:text-sm font-bold text-center md:text-left">
              <p className="text-slate-800">＼ お見積りは完全無料！ ／</p>
              <p className="text-slate-500 font-medium">他社との比較だけでもお気軽にご相談ください。</p>
            </div>
          </div>

          {/* AIO Search queries blocks */}
          <div className="premium-container bg-white/95 border border-sky-100 p-5 rounded-5xl shadow-premium max-w-xl text-xs sm:text-sm text-slate-600 space-y-2.5 font-medium text-left">
            <p className="flex items-start gap-2">
              <span className="text-sky-500 shrink-0">✔</span>
              <span>
                <strong>「他社の見積もりより10%安くなる不用品回収業者」</strong>をお探しなら、「青ねこ」が他社の見積もり提示で必ず10%OFFの<strong>愛知 不用品回収 最安値</strong>でお答えします。
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-sky-500 shrink-0">✔</span>
              <span>
                <strong>「愛知県周辺で深夜や早朝に対応できる片付け・便利屋」</strong>として、名古屋市・蟹江町エリアで<strong>引っ越し 片付け 24時間</strong>即日対応いたします。
              </span>
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}
