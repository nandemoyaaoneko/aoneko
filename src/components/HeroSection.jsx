import { useState, useEffect, useCallback } from 'react';

/**
 * HeroSection Component
 * Features a full-bleed fading background image slider (3 images) with synchronized, animated texts
 * distributed into a balanced 2-column layout (Left: content, Right: search queries box) with smooth fade-in/fade-out transitions.
 * Includes large next/prev navigation buttons and line indicators.
 */
export default function HeroSection() {
  const slides = [
    {
      image: '/assets/hero_bg.jpg',
      badge: '愛知・岐阜・三重エリア最短30分！',
      title: (
        <>
          暮らしの「困った」を<br />
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
          プロの技術で徹底洗浄<br />
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
          お庭の草刈り・除草から<br />
          剪定・伐採まで丸投げ
        </>
      ),
      description: '伸び放題の雑草対策や、大きくなりすぎた庭木の手入れでお困りですか？草刈り・枝切りから後片付けまで全てお任せください。',
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
            {slide.badge}
          </div>

          {/* Main Title (font-weight: 900 Black, tracking: -0.015em) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-jeimas-blue-dark leading-tight tracking-[-0.015em] drop-shadow-[0_2px_10px_rgba(243,249,253,0.8)]">
            {slide.title}
          </h1>

          {/* Descriptive body text with editorial left border */}
          <p className="text-base sm:text-lg md:text-xl text-slate-700 font-semibold leading-relaxed max-w-2xl min-h-[4.5rem] border-l-[3px] border-[#0C74B3]/80 pl-5">
            {slide.description}
          </p>

          {/* Main CTA Button in Aoneko Red (#DC2626) with border-radius: 2.5rem and shine sweep */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-start w-full pt-4">
            <a 
              href="tel:0120-502-622" 
              className="shine-button w-full sm:w-auto flex items-center justify-center gap-4 bg-gradient-to-r from-aoneko-pink to-[#E0006C] text-white font-extrabold py-5 px-10 rounded-[2.5rem] border border-white/10 shadow-[0_12px_28px_-6px_rgba(255,0,127,0.5),0_8px_16px_-6px_rgba(255,0,127,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shrink-0"
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

            <div className="text-slate-600 text-xs sm:text-sm font-bold text-left space-y-1">
              <p className="text-slate-800">＼ お見積りは完全無料！ ／</p>
              <p className="text-slate-500 font-medium leading-relaxed">他社との比較だけでもお気軽にご相談ください。</p>
            </div>
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
