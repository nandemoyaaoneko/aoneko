import { useState, useEffect, useCallback } from 'react';

/**
 * HeroSection Component
 * Features a full-bleed fading background image slider (3 images) with synchronized, animated texts
 * distributed into a balanced 2-column layout (Left: content, Right: search queries box) with smooth fade-in/fade-out transitions.
 * Includes large next/prev navigation buttons and line indicators.
 */
export default function HeroSection({ seoRoute = null }) {
  const slides = [
    {
      image: '/assets/service_rubbish.jpg',
      badge: '愛知・岐阜・三重エリア最短30分！',
      title: (
        <>
          <span className="bg-gradient-to-r from-aoneko-pink to-[#E0006C] bg-clip-text text-transparent inline-block">
            暮らしの「困った」を
          </span>
          <br />
          スッキリ解決します
        </>
      ),
      description: '不用品引取・片付けから生活サポートまで。お困りごとは「便利屋 青ねこ」へ完全丸投げでお任せください！',
      queries: [
        '「愛知県周辺で深夜や早朝に対応できる片付け・便利屋」として、名古屋市・蟹江町エリアで引っ越し（aoneko move） 片付け 24時間即日対応いたします。'
      ]
    },
    {
      image: '/assets/hero_cleaning_v3.jpg',
      badge: 'エアコンクリーニング 1台 7,000円！',
      title: (
        <>
          <span className="bg-gradient-to-r from-aoneko-pink to-[#E0006C] bg-clip-text text-transparent inline-block">
            プロの技術で徹底洗浄
          </span>
          <br />
          エアコン・お部屋掃除
        </>
      ),
      description: '追加料金なしで1台7000円からのエアコン高圧分解洗浄。キッチンの頑固な油汚れや水回りのカビも新品同様に輝かせます。',
      queries: [
        '「他社の見積もりより10%安くなる不用品引取・お片付け業者」をお探しなら、「青ねこ」が他社の見積もり提示で必ず10%OFFの愛知 不用品引取 最安値でお答えします。'
      ]
    },
    {
      image: '/assets/hero_weeding.png',
      badge: '即日対応！お庭のお手入れ',
      title: (
        <>
          <span className="bg-gradient-to-r from-aoneko-pink to-[#E0006C] bg-clip-text text-transparent inline-block">
            お庭の草刈り・除草から
          </span>
          <br />
          剪定・伐採まで丸投げ
        </>
      ),
      description: '伸び放題 of 雑草対策や、大きくなりすぎた庭木の手入れでお困りですか？草刈り・枝切りから後片付けまで全てお任せください。',
      queries: [
        '「伸び放題の雑草や大きくなりすぎた庭木のお手入れ」でお困りなら、草刈り・除草からお引取り・整理整頓まで即日丸投げでスッキリ解決いたします。'
      ]
    }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const handleNextSlide = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setFade(true);
    }, 300);
  }, [slides.length]);

  const handlePrevSlide = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
      setFade(true);
    }, 300);
  }, [slides.length]);

  const handleIndicatorClick = useCallback((index) => {
    setFade(false);
    setTimeout(() => {
      setCurrentSlideIndex(index);
      setFade(true);
    }, 300);
  }, []);

  // Auto-play the slider
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 9000);
    return () => clearInterval(timer);
  }, [handleNextSlide]);

  const slide = slides[currentSlideIndex];

  return (
    <section className="relative min-h-[85vh] lg:min-h-[80vh] flex items-center bg-slate-100 overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      
      {/* Background Fullscreen Image Slider with smooth cross-fade */}
      {slides.map((s, index) => (
        <div 
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[2000ms] ease-in-out"
          style={{ 
            backgroundImage: `url('${s.image}')`,
            opacity: index === currentSlideIndex ? 1 : 0
          }}
        />
      ))}
      
      {/* Soft gradient overlay for text legibility with light glassmorphism backdrop */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F3F9FD] via-[#F3F9FD]/90 to-[#F3F9FD]/70 md:to-transparent/15 z-10" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto w-full relative z-20 px-4 sm:px-6 lg:px-8">
        <div className={`w-full max-w-4xl text-left space-y-7 transition-all duration-[800ms] transform ${
          fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          
          {/* Top Asymmetrical Badge with Logo blue accent */}
          <div className="inline-flex items-center gap-2 bg-[#00234B] text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-r-full rounded-tl-full shadow-lg tracking-wider border-l-4 border-[#0C74B3]">
            {seoRoute ? `${seoRoute.prefecture}${seoRoute.city_name}エリア 即日対応！` : slide.badge}
          </div>

          {/* Main Title (font-weight: 900 Black, tracking: -0.015em) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-jeimas-blue-dark leading-tight tracking-[-0.015em] drop-shadow-[0_2px_10px_rgba(243,249,253,0.8)]">
            {seoRoute ? seoRoute.seo_title_h1 : slide.title}
          </h1>

          {/* Descriptive body text with editorial left border */}
          <p className="text-base sm:text-lg md:text-xl text-slate-700 font-semibold leading-relaxed max-w-2xl min-h-[4.5rem] border-l-[3px] border-[#0C74B3]/80 pl-5">
            {seoRoute 
              ? `${seoRoute.prefecture}${seoRoute.city_name}周辺のお困りごとは「便利屋 青ねこ」にお任せください！エアコンクリーニング、不用品引取お片付けサポート、草刈り、物置分解までスピーディに即日対応します。` 
              : slide.description}
          </p>

          {/* Marketing callout text */}
          <div className="text-slate-600 text-xs sm:text-sm font-bold text-left space-y-1.5 pt-4">
            <p className="text-slate-800 font-extrabold text-sm sm:text-base">
              ＼ お見積りは完全無料！24時間即日対応 ／
            </p>
            <p className="text-[#E0006C] font-extrabold text-sm sm:text-base leading-relaxed">
              相見積もり大歓迎！他社様のお見積り提示でさらに<span className="bg-[#E0006C]/10 text-[#E0006C] border border-[#E0006C]/20 px-2.5 py-0.5 rounded-full inline-block font-extrabold text-xs sm:text-sm ml-1">10%OFF</span>の割引を適用！
            </p>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => handleIndicatorClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
              index === currentSlideIndex ? 'w-8 bg-[#0C74B3]' : 'w-2 bg-slate-300/60 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      {/* Navigation arrows (large & round) */}
      <button 
        type="button"
        onClick={handlePrevSlide}
        className="absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-slate-950/20 hover:bg-slate-950/45 text-white backdrop-blur-md transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white/20 z-30 focus:outline-none cursor-pointer"
        aria-label="Previous Slide"
      >
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        type="button"
        onClick={handleNextSlide}
        className="absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-slate-950/20 hover:bg-slate-950/45 text-white backdrop-blur-md transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white/20 z-30 focus:outline-none cursor-pointer"
        aria-label="Next Slide"
      >
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </section>
  );
}
