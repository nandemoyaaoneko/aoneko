import { useState, useEffect, useRef } from 'react';
import SEOHead from './components/SEOHead';
import HeroSection from './components/HeroSection';
import ServiceCard from './components/ServiceCard';
import TrustShield from './components/TrustShield';
import StickyCTA from './components/StickyCTA';
import FloatingLineButton from './components/FloatingLineButton';
import ScrollToTopButton from './components/ScrollToTopButton';

import cleanupItems from './data/cleanupItems';
import strengthSlides from './data/strengthSlides';
import services from './data/services';
import steps from './data/steps';
import { securityPoints, compliancePoints } from './data/securityCompliance';
import faqs from './data/faqs';

export default function App() {
  const WEB3FORMS_ACCESS_KEY = "1eac69c5-f18d-4203-912a-6f4ae0752065";

  // First FAQ accordion item is expanded by default (index 0)
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Web3Forms Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    botcheck: false
  });
  const [formStatus, setFormStatus] = useState(null); // null | 'submitting' | 'success' | 'error'

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Client-side honeypot validation
    if (formData.botcheck) {
      console.warn("Spam detected via honeypot.");
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', botcheck: false });
      return;
    }

    setFormStatus('submitting');

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "【何でも屋 青ねこ】Webサイトからのお問い合わせ",
      from_name: "青ねこ Webサイト",
      ...formData
    };
    delete payload.botcheck;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '', botcheck: false });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error("Web3Forms submit error:", error);
      setFormStatus('error');
    }
  };

  const logoRef = useRef(null);
  const galleryRef = useRef(null);
  const strengthsRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const handleServiceMouseEnter = (idx) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveServiceIdx(idx);
    }, 150);
  };

  const handleServiceMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const scrollStrengthsLeft = () => {
    if (strengthsRef.current) {
      strengthsRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollStrengthsRight = () => {
    if (strengthsRef.current) {
      strengthsRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      if (logoRef.current) {
        // Clear any existing scroll-stop timeout
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // Disable transition while scrolling so the rotation follows scroll immediately
        logoRef.current.style.transition = 'none';

        const rotation = window.scrollY * 0.25;
        logoRef.current.style.transform = `rotate(${rotation}deg)`;

        // Set a timeout to detect when the user stops scrolling
        timeoutId = setTimeout(() => {
          if (logoRef.current) {
            // Find the nearest multiple of 360 degrees so the kitty faces straight up
            const nearest360 = Math.round(rotation / 360) * 360;
            // Use a smooth overshoot cubic-bezier to make the rotation alignment feel premium and alive
            logoRef.current.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            logoRef.current.style.transform = `rotate(${nearest360}deg)`;
          }
        }, 150); // 150ms threshold for scroll stop detection
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-700 antialiased font-sans">
      <SEOHead faqs={faqs} />

      {/* Header (Top) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sky-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          {/* Logo brand (Left) */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-sky-100 shadow-sm flex items-center justify-center shrink-0">
              <img 
                ref={logoRef}
                src="/assets/logo.jpg" 
                alt="何でも屋 青ねこ ロゴ" 
                className="w-full h-full object-cover will-change-transform" 
              />
            </div>
            <div>
              <span className="text-sm sm:text-lg md:text-xl font-black text-jeimas-blue-dark tracking-tight block">何でも屋 青ねこ</span>
            </div>
          </div>

          {/* Navigation Links (Center) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-black text-xs sm:text-sm tracking-wide text-jeimas-blue-dark">
            <a href="#" className="hover:text-[#0C74B3] transition-colors duration-200">
              ホーム
            </a>
            <a href="#services" className="hover:text-[#0C74B3] transition-colors duration-200">
              サービス一覧
            </a>
            <a href="#process" className="hover:text-[#0C74B3] transition-colors duration-200">
              お片付けサービスの流れ
            </a>
            <a href="#contact" className="hover:text-[#0C74B3] transition-colors duration-200">
              お問い合わせ
            </a>
          </nav>

          {/* Quick contact (Right) */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:block text-right">
              <span className="text-xs text-jeimas-blue-dark font-extrabold">
                24時間受付中 お見積り無料！
              </span>
            </div>

            {/* CTA Call button in Aoneko Red (Desktop/Tablet) */}
            <a 
              href="tel:0120-502-622" 
              className="shine-button hidden md:flex items-center gap-2 bg-gradient-to-r from-aoneko-pink to-[#E0006C] text-white font-extrabold py-3 px-5 sm:px-6 rounded-[2.5rem] border border-white/10 shadow-[0_4px_12px_-3px_rgba(255,0,127,0.45)] transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white shrink-0 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-base sm:text-lg lg:text-xl font-black tracking-tight">0120-502-622</span>
            </a>

            {/* Compact Call button in Aoneko Red (Mobile only) */}
            <a 
              href="tel:0120-502-622" 
              className="shine-button md:hidden flex items-center gap-1.5 bg-gradient-to-r from-aoneko-pink to-[#E0006C] text-white font-extrabold py-2 px-3 sm:px-3.5 rounded-[2.5rem] border border-white/10 shadow-[0_4px_12px_-3px_rgba(255,0,127,0.45)] transition-all duration-300 shrink-0"
              aria-label="フリーダイヤル 0120-502-622 で電話をかける"
            >
              <svg className="w-4 h-4 text-white animate-bounce shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-[11px] sm:text-xs font-black tracking-tight leading-none">0120-502-622</span>
            </a>

            {/* Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-full border border-sky-100 bg-[#F3F9FD] text-[#0C74B3] hover:bg-sky-50 transition-colors focus:outline-none cursor-pointer shrink-0"
              aria-label="メニューを開く"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-sky-100/50 shadow-lg py-4 px-6 absolute top-20 left-0 right-0 z-30 transition-all duration-300 ease-in-out">
            <nav className="flex flex-col gap-4 font-black text-sm tracking-wide text-jeimas-blue-dark">
              <a 
                href="#" 
                onClick={() => setIsMenuOpen(false)} 
                className="hover:text-[#0C74B3] py-2 border-b border-sky-50/50 transition-colors duration-200"
              >
                ホーム
              </a>
              <a 
                href="#services" 
                onClick={() => setIsMenuOpen(false)} 
                className="hover:text-[#0C74B3] py-2 border-b border-sky-50/50 transition-colors duration-200"
              >
                サービス一覧
              </a>
              <a 
                href="#process" 
                onClick={() => setIsMenuOpen(false)} 
                className="hover:text-[#0C74B3] py-2 border-b border-sky-50/50 transition-colors duration-200"
              >
                お片付けサービスの流れ
              </a>
              <a 
                href="#faq" 
                onClick={() => setIsMenuOpen(false)} 
                className="hover:text-[#0C74B3] py-2 border-b border-sky-50/50 transition-colors duration-200"
              >
                よくある質問
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMenuOpen(false)} 
                className="hover:text-[#0C74B3] py-2 transition-colors duration-200"
              >
                お問い合わせ
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main semantic container */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Services Section ("サービス一覧") */}
        <section className="py-24 bg-[#EAF5FC]/40 relative overflow-hidden" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6 border-b border-[#E0EEF6] pb-6">
              <div className="text-left">
                <h2 className="text-3xl sm:text-4xl font-black text-jeimas-blue-dark tracking-[-0.02em]">
                  サービス一覧
                </h2>
                <p className="text-sm sm:text-base text-slate-500 mt-2 font-bold">
                  プロの技術で、あなたのご毎日をもっと快適に。
                </p>
              </div>
              
              {/* SNS Buttons - right next to Services title */}
              <div className="flex items-center gap-2.5">
                <a 
                  href="https://www.instagram.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full border border-sky-100 bg-white text-[#0C74B3] flex items-center justify-center transition-all duration-300 hover:bg-[#EAF5FC] hover:border-[#0C74B3]/30 hover:scale-105 shadow-sm"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full border border-sky-100 bg-white text-[#0C74B3] flex items-center justify-center transition-all duration-300 hover:bg-[#EAF5FC] hover:border-[#0C74B3]/30 hover:scale-105 shadow-sm"
                  aria-label="TikTok"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.69a6.34 6.34 0 0 0 10.86 4.43 6.27 6.27 0 0 0 1.93-4.45V10.5a8.25 8.25 0 0 0 5.21 1.79v-3.5a4.78 4.78 0 0 1-3.41-2.1z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.youtube.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full border border-sky-100 bg-white text-[#0C74B3] flex items-center justify-center transition-all duration-300 hover:bg-[#EAF5FC] hover:border-[#0C74B3]/30 hover:scale-105 shadow-sm"
                  aria-label="YouTube"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.948.502 5.837a3.003 3.003 0 0 0 2.11 2.107c1.883.511 9.388.511 9.388.511s7.505 0 9.388-.511a3.002 3.002 0 0 0 2.11-2.107c.502-1.89.502-5.837.502-5.837s0-3.948-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Desktop-only: Selector + Detail Interactive Panel */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Selector Column (Stacked Column on Desktop) */}
              <div className="flex lg:flex-col gap-3 lg:col-span-4">
                {services.map((svc, idx) => {
                  const isActive = activeServiceIdx === idx;
                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => {
                        handleServiceMouseLeave();
                        setActiveServiceIdx(idx);
                      }}
                      onMouseEnter={() => handleServiceMouseEnter(idx)}
                      onMouseLeave={handleServiceMouseLeave}
                      className={`w-full text-left py-3 px-4 lg:py-3.5 lg:px-5 rounded-[1.25rem] border transition-all duration-300 flex items-center gap-4 group relative overflow-hidden cursor-pointer ${
                        isActive 
                          ? 'bg-white border-[#0C74B3] shadow-md shadow-sky-100/60' 
                          : 'bg-white/70 border-[#E0EEF6] hover:bg-white hover:border-[#0C74B3]/40 shadow-sm'
                      }`}
                    >

                      {/* Icon Container */}
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 border ${
                        isActive 
                          ? 'bg-[#0C74B3] border-[#0C74B3] text-white' 
                          : 'bg-[#EAF5FC] border-sky-200/50 text-[#0C74B3] group-hover:bg-[#0C74B3] group-hover:border-[#0C74B3] group-hover:text-white'
                      }`}>
                        {svc.icon}
                      </div>
                      {/* Title & Badge */}
                      <div className="text-left">
                        <span className={`text-sm sm:text-base font-black block leading-none ${isActive ? 'text-[#0C74B3]' : 'text-slate-800'}`}>
                          {svc.title}
                        </span>
                        <span className="text-[9px] text-[#0C74B3] font-bold block mt-1 leading-none">
                          {svc.badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Detail Card Column */}
              <div className="lg:col-span-8 h-full animate-fade-in" key={activeServiceIdx}>
                <ServiceCard 
                  index={activeServiceIdx}
                  title={services[activeServiceIdx].detailTitle || services[activeServiceIdx].title}
                  price={services[activeServiceIdx].price}
                  badge={services[activeServiceIdx].badge}
                  imageSrc={services[activeServiceIdx].imageSrc}
                  description={services[activeServiceIdx].description}
                  features={services[activeServiceIdx].features}
                  locationTag={services[activeServiceIdx].locationTag}
                  icon={services[activeServiceIdx].icon}
                />
              </div>

            </div>

            {/* Mobile/Tablet-only: Sequential vertical list of all 4 service cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:hidden">
              {services.map((svc, idx) => (
                <ServiceCard 
                  key={idx}
                  index={idx}
                  title={svc.detailTitle || svc.title}
                  price={svc.price}
                  badge={svc.badge}
                  imageSrc={svc.imageSrc}
                  description={svc.description}
                  features={svc.features}
                  locationTag={svc.locationTag}
                  icon={svc.icon}
                />
              ))}
            </div>

            {/* Payment Methods Info */}
            <div className="mt-20 pt-16 border-t border-[#E0EEF6] max-w-4xl mx-auto text-center space-y-8 relative z-10">
              <h3 className="text-xl sm:text-2xl font-black text-jeimas-blue-dark tracking-tight">
                各種クレジットカードやpay payでの決済も可能！
              </h3>
              
              <div className="relative max-w-md mx-auto rounded-[24px] overflow-hidden shadow-premium border border-[#E0EEF6] bg-white p-3 hover:scale-[1.01] transition-all duration-300">
                <img 
                  src="/assets/payment.jpg" 
                  alt="お支払い方法 - 各種クレジットカード・PayPay決済対応" 
                  className="w-full h-auto rounded-[16px]"
                />
              </div>

              <p className="text-sm sm:text-base text-slate-600 font-semibold leading-relaxed max-w-2xl mx-auto">
                お支払い方法は現金・クレジット・PayPay・振込に対応！<br className="hidden sm:inline" />
                簡単・便利にご利用いただけます。
              </p>
            </div>
          </div>
        </section>

        {/* Security Section (SECURITY ACTION) */}
        <section className="w-full bg-sky-50/30 py-20 px-4">
          <div className="max-w-7xl mx-auto bg-white/95 p-8 md:p-12 rounded-[2.5rem] border border-sky-100 shadow-xl backdrop-blur-sm">
            
            {/* Header Section */}
            <div className="text-center mb-16 border-b border-sky-100 pb-8">
              <p className="inline-block bg-sky-100/50 text-sky-800 text-sm font-bold px-4 py-1.5 rounded-full mb-4">情報セキュリティ対策</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-sky-950 mb-4">安心・安全への確かな取り組み</h2>
              <h3 className="text-xl md:text-2xl font-semibold text-sky-800 max-w-2xl mx-auto">
                経済産業省推進「SECURITY ACTION」一つ星宣言企業
              </h3>
            </div>

            {/* Grid Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              
              {/* Panel 1: IT & Data Security */}
              <div className="bg-sky-50/50 rounded-[2rem] p-8 flex flex-col items-center border border-sky-50">
                <div className="mb-8 w-full flex justify-center">
                  <div className="max-w-[140px] sm:max-w-[160px] hover:scale-[1.02] transition-transform duration-300">
                    <img 
                      src="/assets/security_action.png" 
                      alt="経済産業省推進 SECURITY ACTION 一つ星宣言" 
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
                
                <ul className="space-y-4 w-full">
                  {securityPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-4 p-4 bg-white rounded-[1.5rem] shadow-sm border border-sky-50 animate-hover transition-transform duration-300 hover:scale-[1.01]">
                      <div className="p-2.5 bg-sky-100/80 rounded-full text-sky-600 shrink-0">
                        {point.icon} 
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-sky-900 text-sm mb-1">{point.title}</h4>
                        <p className="text-gray-600 text-xs leading-relaxed">{point.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Panel 2: Kobutsu & Compliance */}
              <div className="bg-sky-50/50 rounded-[2.5rem] p-8 flex flex-col items-center border border-sky-50">
                <div className="mb-8 w-full flex justify-center">
                  <div className="inline-block bg-white text-sky-900 font-bold px-6 py-3 rounded-full shadow-sm border border-sky-200 text-center text-sm">
                    愛知県公安委員会許可正規事業者 <br/>
                    <span className="text-sky-700 block mt-1">【古物商許可 第542662601800号】</span>
                  </div>
                </div>
                
                <ul className="space-y-4 w-full">
                  {compliancePoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-4 p-4 bg-white rounded-[1.5rem] shadow-sm border border-sky-50 animate-hover transition-transform duration-300 hover:scale-[1.01]">
                      <div className="p-2.5 bg-sky-100/80 rounded-full text-sky-600 shrink-0">
                        {point.icon}
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-sky-900 text-sm mb-1">{point.title}</h4>
                        <p className="text-gray-600 text-xs leading-relaxed">{point.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Brand Trust Banner */}
        <TrustShield />

        {/* Process Section ("ご依頼の流れ") */}
        <section className="py-20 bg-gradient-to-b from-[#F0F9FF]/30 to-white px-4 sm:px-6 lg:px-8" id="process">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-jeimas-blue-dark tracking-[-0.02em]">
                お片付けサービスの流れ
              </h2>
              <div className="h-1.5 w-16 bg-[#0C74B3] mx-auto mt-4 rounded-full" />
              <p className="text-sm sm:text-base text-slate-500 mt-4 font-bold">
                お問い合わせから作業完了まで、丁寧かつスピーディーにサポートします。
              </p>
            </div>

            {/* Steps Container (flex/grid with arrows divisors) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
              {steps.map((st, idx) => (
                <div key={idx} className="relative flex">
                  <div className="premium-container bg-white border border-sky-100/50 p-8 rounded-5xl shadow-premium hover:shadow-lg transition-all duration-300 w-full relative">
                    {/* Big number on top right */}
                    <div className="absolute top-6 right-8 text-4xl font-black text-jeimas-blue/10">
                      {st.num}
                    </div>
                    {/* Step Icon with Premium Gold detail */}
                    <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center mb-6">
                      {st.icon}
                    </div>
                    <h3 className="text-lg font-black text-jeimas-blue-dark mb-1 pr-8">
                      {st.title}
                    </h3>
                    {st.lead && (
                      <p className="text-xs font-black text-[#0C74B3] mb-3 leading-tight">
                        {st.lead}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
                      {st.desc}
                    </p>
                  </div>
                  
                  {/* Arrow divisor (desktop only, except last card) */}
                  {idx < 3 && (
                    <div className="hidden lg:flex absolute top-1/2 right-[-24px] transform -translate-y-1/2 z-20 text-sky-200">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* お片付け主要品目 Section */}
        <section className="py-24 bg-white relative overflow-hidden" id="reuse">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-0 w-80 h-80 bg-sky-50 rounded-full blur-3xl opacity-60 pointer-events-none -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#EAF5FC]/40 rounded-full blur-3xl opacity-75 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block bg-[#EAF5FC] text-[#0C74B3] text-xs font-black px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
                お片付け主要品目
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-jeimas-blue-dark tracking-[-0.02em]">
                お片付け主要品目
              </h2>
              <div className="h-1.5 w-16 bg-[#0C74B3] mx-auto mt-4 rounded-full" />
              <p className="text-sm sm:text-base text-slate-500 mt-4 font-bold max-w-2xl mx-auto leading-relaxed">
                お部屋の整理整頓や出張買取にて、お引取り・お買取が可能な主な対象品目です。テレビや冷蔵庫などの生活家電から、動かすのが難しい大型家具、大切なデータが入ったスマホ・PCまで、すべて安心してお任せください。
              </p>
            </div>

            {/* Scroll Navigation Container */}
            <div className="relative group">
              {/* Left Arrow Button */}
              <button 
                type="button"
                onClick={scrollLeft}
                className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-[#E0EEF6] shadow-premium flex items-center justify-center text-slate-500 hover:text-[#0C74B3] hover:border-[#0C74B3]/40 hover:scale-105 transition-all duration-300 z-20 cursor-pointer hidden md:flex"
                aria-label="前へスクロール"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Right Arrow Button */}
              <button 
                type="button"
                onClick={scrollRight}
                className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-[#E0EEF6] shadow-premium flex items-center justify-center text-slate-500 hover:text-[#0C74B3] hover:border-[#0C74B3]/40 hover:scale-105 transition-all duration-300 z-20 cursor-pointer hidden md:flex"
                aria-label="次へスクロール"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Horizontal Scroll Area */}
              <div 
                ref={galleryRef}
                className="flex gap-6 overflow-x-auto py-6 px-2 scroll-smooth snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {cleanupItems.map((item, idx) => (
                  <div 
                    key={idx}
                    className="w-[280px] sm:w-[320px] shrink-0 snap-start bg-white rounded-[2.5rem] border border-[#E0EEF6] shadow-premium hover:shadow-lg hover:border-[#0C74B3]/25 transition-all duration-300 flex flex-col justify-between overflow-hidden group/card"
                  >
                    <div>
                      {/* Image Box */}
                      <div className="relative aspect-square w-full bg-white overflow-hidden border-b border-[#F0F7FA] p-8 flex items-center justify-center">
                        <img 
                          src={item.imageSrc} 
                          alt={`何でも屋 青ねこ 主要品目 - ${item.name}`} 
                          className="max-w-full max-h-full object-contain"
                        />
                        {/* Category Badge */}
                        <span className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm text-white text-[9px] font-black px-2.5 py-1 rounded-full border border-white/10 tracking-wider">
                          {item.category}
                        </span>
                        {/* Status tag */}
                        <span className="absolute bottom-3 right-3 z-10 bg-[#0C74B3] text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-sm">
                          ✓ {item.status}
                        </span>
                      </div>

                      {/* Content Box */}
                      <div className="p-5 space-y-3 text-left">
                        <h3 className="text-base sm:text-lg font-black text-jeimas-blue-dark leading-tight group-hover/card:text-[#0C74B3] transition-colors duration-300">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-3 min-h-[4.5rem]">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 space-y-4">
                      {/* Divider */}
                      <div className="h-[1px] bg-slate-100 w-full" />

                      {/* Bottom Box (Collection Status) */}
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <p className="text-[9px] text-slate-400 font-bold leading-none">お片付け時の対応</p>
                          <p className="text-sm sm:text-base font-black text-[#0C74B3] mt-1">{item.actionText}</p>
                        </div>
                        <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold border border-emerald-100">
                          {item.badgeText}
                        </span>
                      </div>

                      {/* SEO Tags Container */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.keywords.slice(0, 3).map((kw, kIdx) => (
                          <span key={kIdx} className="text-[8px] font-bold text-slate-400 bg-slate-50 border border-slate-100 rounded py-0.5 px-1.5">
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section Footer Callout */}
            <div className="mt-12 text-center space-y-6">
              <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                ※お引取り・お買取の可否は、お品物の状態や年式などにより細かく変動いたします。<br className="hidden sm:inline" />
                詳細なリユース査定や買取のご相談は、お気軽にフリーダイヤルにてお問い合わせください。
              </p>

              {/* Action Buttons (Phone & LINE) */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto pt-2">
                {/* LINE Button */}
                <a 
                  href="https://line.me/ti/p/XbHxvB_Kbu" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b04b] text-white font-extrabold py-3 px-8 rounded-full shadow-[0_4px_12px_rgba(6,199,85,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 5.84 2 10.58c0 2.9 1.7 5.48 4.38 7.09l-.46 2.8c-.08.48.27.67.66.41l3.86-2.31c.5.07 1 .11 1.56.11 5.52 0 10-3.84 10-8.58S17.52 2 12 2z"/>
                  </svg>
                  <div className="text-left leading-tight">
                    <p className="text-[10px] opacity-90 tracking-wider">LINEでかんたん</p>
                    <p className="text-base font-black">無料相談</p>
                  </div>
                </a>

                {/* Toll-Free Call Button */}
                <a 
                  href="tel:0120-502-622" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-aoneko-pink to-[#E0006C] text-white font-extrabold py-3 px-8 rounded-full shadow-[0_4px_12px_rgba(255,0,127,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer"
                >
                  <svg className="w-4.5 h-4.5 fill-none stroke-current stroke-[2.5] shrink-0" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="text-left leading-tight">
                    <p className="text-[10px] opacity-90 tracking-wider">通話無料でお問い合わせ</p>
                    <p className="text-base font-black">0120-502-622</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section ("よくある質問") */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" id="faq">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-jeimas-blue-dark tracking-[-0.02em]">
              よくある質問
            </h2>
            <div className="h-1.5 w-16 bg-[#0C74B3] mx-auto mt-4 rounded-full" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="premium-container bg-white border border-[#E4EEF4] rounded-5xl overflow-hidden transition-all duration-300 shadow-premium"
                >
                  <button 
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center text-left py-6 px-8 hover:bg-[#FBFDFE] transition-colors"
                  >
                    <span className="font-bold text-jeimas-blue-dark text-sm sm:text-base pr-4 flex items-center gap-3">
                      <span className="text-[#0C74B3] font-black">Q.</span>
                      {faq.q}
                    </span>
                    <svg 
                      className={`w-5 h-5 text-slate-400 shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-jeimas-blue' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] border-t border-sky-50' : 'max-h-0'}`}
                  >
                    <div className="p-8 bg-[#FBFDFE] text-slate-600 text-sm sm:text-base leading-relaxed font-medium flex gap-3">
                      <span className="text-[#E08F24] font-black shrink-0">A.</span>
                      <p className="whitespace-pre-line">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 安心して選べる強み Section */}
        <section className="py-24 bg-[#F8FBFD] relative overflow-hidden" id="strengths">
          {/* Background decoration */}
          <div className="absolute top-1/4 right-0 w-80 h-80 bg-sky-100/40 rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute bottom-12 left-10 w-96 h-96 bg-sky-50 rounded-full blur-3xl opacity-80 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block bg-[#EAF5FC] text-[#0C74B3] text-xs font-black px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
                何でも屋 青ねこの強み
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-jeimas-blue-dark tracking-[-0.02em]">
                安心して選べる強み
              </h2>
              <div className="h-1.5 w-16 bg-[#0C74B3] mx-auto mt-4 rounded-full" />
              <p className="text-sm sm:text-base text-slate-500 mt-4 font-bold max-w-2xl mx-auto leading-relaxed">
                何でも屋 青ねこが東海エリアの皆様に選ばれる理由。確かな機動力とプロの物流品質、お財布に優しいスマートオフセットなど、独自の強みをご紹介します。
              </p>
            </div>



            {/* Scroll Navigation Container */}
            <div className="relative group">
              {/* Left Arrow Button */}
              <button 
                type="button"
                onClick={scrollStrengthsLeft}
                className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-[#E0EEF6] shadow-premium flex items-center justify-center text-slate-500 hover:text-[#0C74B3] hover:border-[#0C74B3]/40 hover:scale-105 transition-all duration-300 z-20 cursor-pointer hidden md:flex"
                aria-label="前へスクロール"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Right Arrow Button */}
              <button 
                type="button"
                onClick={scrollStrengthsRight}
                className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-[#E0EEF6] shadow-premium flex items-center justify-center text-slate-500 hover:text-[#0C74B3] hover:border-[#0C74B3]/40 hover:scale-105 transition-all duration-300 z-20 cursor-pointer hidden md:flex"
                aria-label="次へスクロール"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Horizontal Scroll Area */}
              <div 
                ref={strengthsRef}
                className="flex gap-6 overflow-x-auto py-6 px-2 scroll-smooth snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {strengthSlides.map((slide, idx) => {
                  const isCTA = idx === 7;
                  const getIcon = () => {
                    switch (idx) {
                      case 0:
                        return (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 3h-2M21 12h-2M3 12h2M12 21h-2" />
                          </svg>
                        );
                      case 1:
                        return (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                          </svg>
                        );
                      case 2:
                        return (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-9h6m-6 3h6m-3-6C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Z" />
                          </svg>
                        );
                      case 3:
                        return (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125a1.125 1.125 0 0 0 1.125-1.125V9.75M8.25 14.25h8.25M2.25 9.75H14.25m-2.25 4.5V9.75m0-4.5h4.5a2.25 2.25 0 0 1 2.25 2.25v2.25" />
                          </svg>
                        );
                      case 4:
                        return (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L6 12Zm0 0h7.5" />
                          </svg>
                        );
                      case 5:
                        return (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0 1 12 2.714Z" />
                          </svg>
                        );
                      case 6:
                        return (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                          </svg>
                        );
                      case 7:
                        return (
                          <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                          </svg>
                        );
                      default:
                        return null;
                    }
                  };

                  if (isCTA) {
                    return (
                      <a 
                        key={idx}
                        href="tel:0120-502-622"
                        className="w-[290px] sm:w-[350px] shrink-0 snap-start rounded-[2.5rem] border p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 block hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(12,116,179,0.3)] hover:scale-[1.01] bg-gradient-to-br from-[#0C74B3] to-[#085a8c] border-white/10 text-white cursor-pointer"
                      >
                        {/* Top glowing accent border */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-aoneko-pink via-red-500 to-[#E0006C]" />

                        {/* Floating Slide Number with premium fade */}
                        <div className="absolute top-6 right-8 text-5xl font-black text-white/10">
                          {slide.num}
                        </div>

                        <div className="space-y-6">
                          {/* Slide Category/Badge */}
                          <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-aoneko-pink to-[#E0006C] text-white flex items-center justify-center shrink-0 shadow-md">
                              {getIcon()}
                            </div>
                            <span className="text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider bg-white/20 text-white">
                              {slide.tag}
                            </span>
                          </div>

                          {/* Title & Description */}
                          <div className="space-y-3 text-left">
                            <h3 className="text-base sm:text-lg font-black leading-tight text-white">
                              {slide.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-sky-100 font-semibold leading-relaxed">
                              {slide.desc}
                            </p>
                          </div>
                        </div>

                        {/* Accent bottom detail */}
                        <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-center">
                          <span className="text-[10px] text-sky-200/80 font-bold">Aoneko Quality</span>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-gradient-to-r from-aoneko-pink to-[#E0006C] text-white">
                            {slide.badge}
                          </span>
                        </div>
                      </a>
                    );
                  }

                  return (
                    <div 
                      key={idx}
                      className="w-[290px] sm:w-[350px] shrink-0 snap-start rounded-[2.5rem] border p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 bg-white border-[#E0EEF6] shadow-premium hover:-translate-y-1 hover:shadow-2xl hover:border-[#0C74B3]/40"
                    >
                      {/* Top accent border */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 to-[#0C74B3]" />

                      {/* Floating Slide Number with premium fade */}
                      <div className="absolute top-6 right-8 text-5xl font-black text-slate-100">
                        {slide.num}
                      </div>

                      <div className="space-y-6">
                        {/* Slide Category/Badge */}
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-full bg-[#EAF5FC] text-[#0C74B3] flex items-center justify-center shrink-0">
                            {getIcon()}
                          </div>
                          <span className="text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider bg-slate-100 text-slate-500">
                            {slide.tag}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-3 text-left">
                          <h3 className="text-base sm:text-lg font-black leading-tight text-jeimas-blue-dark">
                            {slide.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                            {slide.desc}
                          </p>
                        </div>
                      </div>

                      {/* Accent bottom detail */}
                      <div className="pt-6 border-t border-slate-100/50 mt-6 flex justify-between items-center">
                        <span className="text-[10px] text-slate-400 font-bold">Aoneko Quality</span>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-sky-50 text-[#0C74B3]">
                          {slide.badge}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>


          </div>
        </section>

        {/* Contact Form Section ("お問い合わせフォーム") */}
        <section className="py-24 bg-gradient-to-b from-white to-[#EAF5FC]/20 px-4 sm:px-6 lg:px-8" id="contact">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-jeimas-blue-dark tracking-[-0.02em]">
                お問い合わせフォーム
              </h2>
              <div className="h-1.5 w-16 bg-[#0C74B3] mx-auto mt-4 rounded-full" />
              <p className="text-sm sm:text-base text-slate-500 mt-4 font-bold">
                必要事項をご記入の上、「送信する」ボタンを押してください。
              </p>
            </div>

            <div className="premium-container bg-white border border-[#E4EEF4] rounded-[2.5rem] p-8 sm:p-12 shadow-premium relative overflow-hidden">
              {formStatus === 'success' ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-sm">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">送信が完了しました</h3>
                  <p className="text-sm text-slate-600 font-semibold leading-relaxed max-w-md mx-auto">
                    お問い合わせありがとうございます。内容を確認の上、担当者より折り返しご連絡させていただきます。
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormStatus(null)}
                    className="mt-6 text-sm font-extrabold text-[#0C74B3] hover:underline cursor-pointer"
                  >
                    もう一度フォームを表示する
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Urgent Contact Alert Box */}
                  <div className="bg-[#EBF5FC]/60 border border-sky-100 rounded-2xl p-4 sm:p-5 mb-8 text-left space-y-3">
                    <p className="text-xs sm:text-sm font-black text-jeimas-blue-dark flex items-center gap-2">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E0006C] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E0006C]"></span>
                      </span>
                      お急ぎの方へ
                    </p>
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                      お急ぎの場合は、LINEでのお見積りまたはお電話（フリーダイヤル）でのご連絡が便利です。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-1">
                      {/* LINE quote link */}
                      <a 
                        href="https://line.me/ti/p/XbHxvB_Kbu" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b04b] text-white font-extrabold text-xs py-2.5 px-5 rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                      >
                        {/* LINE SVG */}
                        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 5.84 2 10.58c0 2.9 1.7 5.48 4.38 7.09l-.46 2.8c-.08.48.27.67.66.41l3.86-2.31c.5.07 1 .11 1.56.11 5.52 0 10-3.84 10-8.58S17.52 2 12 2z"/>
                        </svg>
                        <span>LINEで即時見積もり</span>
                      </a>

                      {/* Phone call link */}
                      <a 
                        href="tel:0120-502-622" 
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-aoneko-pink to-[#E0006C] text-white font-extrabold text-xs py-2.5 px-5 rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5] shrink-0" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>電話する（0120-502-622）</span>
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-black text-slate-700">
                        お名前 <span className="text-red-500 text-xs">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="例：山田（苗字のみ、ニックネームも可）"
                        className="w-full px-5 py-4 rounded-2xl border border-sky-100 bg-[#FBFDFE] focus:outline-none focus:border-[#0C74B3] focus:bg-white text-sm font-semibold transition-all duration-200"
                      />
                    </div>
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="block text-sm font-black text-slate-700">
                        電話番号 <span className="text-red-500 text-xs">*</span>
                      </label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="例：090-1234-5678"
                        className="w-full px-5 py-4 rounded-2xl border border-sky-100 bg-[#FBFDFE] focus:outline-none focus:border-[#0C74B3] focus:bg-white text-sm font-semibold transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-black text-slate-700">
                      メールアドレス <span className="text-slate-400 text-xs font-semibold">(任意)</span>
                    </label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="例：example@aoneko.com"
                      className="w-full px-5 py-4 rounded-2xl border border-sky-100 bg-[#FBFDFE] focus:outline-none focus:border-[#0C74B3] focus:bg-white text-sm font-semibold transition-all duration-200"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="block text-sm font-black text-slate-700">
                      お問い合わせ内容 <span className="text-slate-400 text-xs font-semibold">(任意)</span>
                    </label>
                    <textarea 
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="ご相談内容やご希望の作業（エアコンクリーニング、草刈り、不用品買取・お片付けサポートなど）をご記入ください。"
                      className="w-full px-5 py-4 rounded-2xl border border-sky-100 bg-[#FBFDFE] focus:outline-none focus:border-[#0C74B3] focus:bg-white text-sm font-semibold transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Anti-spam / Botcheck (Web3Forms requirement) */}
                  <input 
                    type="checkbox" 
                    name="botcheck" 
                    checked={formData.botcheck}
                    onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked })}
                    className="hidden" 
                    style={{ display: 'none' }} 
                    tabIndex="-1"
                    aria-hidden="true"
                  />

                  {/* Error Message */}
                  {formStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>エラーが発生しました。お手数ですが、時間をおいて再度お試しいただくか、お電話でお問い合わせください。</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="text-center pt-4">
                    <p className="text-[11px] sm:text-xs text-slate-500 font-bold mb-3">
                      ※送信後、24時間以内に担当者より折り返しご連絡いたします。
                    </p>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="shine-button inline-flex items-center justify-center gap-3 bg-gradient-to-r from-aoneko-pink to-[#E0006C] text-white font-extrabold py-4 px-10 rounded-[2.5rem] border border-white/10 shadow-[0_12px_28px_-6px_rgba(255,0,127,0.5),0_8px_16px_-6px_rgba(255,0,127,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:pointer-events-none cursor-pointer w-full sm:w-auto"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>送信中...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          <span>送信する</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="bg-jeimas-blue py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-sky-100/50 relative overflow-hidden">
          {/* Subtle blue decoration in background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0C74B3]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-[-0.02em]">
              暮らしの「困った」を今すぐ解消！
            </h2>
            <p className="text-sm sm:text-base text-sky-100 font-bold">
              ご相談・お見積りは無料です。まずはお気軽にお電話ください。
            </p>
            
            {/* Massive Aoneko Red CTA Button */}
            <a 
              href="tel:0120-502-622" 
              className="shine-button inline-flex items-center justify-center gap-4 bg-gradient-to-r from-aoneko-pink to-[#E0006C] text-white font-extrabold py-5 px-10 rounded-[2.5rem] border border-white/10 shadow-[0_12px_28px_-6px_rgba(255,0,127,0.6),0_8px_16px_-6px_rgba(255,0,127,0.35)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 mt-4"
            >
              <div className="bg-white/20 p-2.5 rounded-full">
                <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[10px] opacity-90 tracking-wider">24時間受付中・通話料無料</p>
                <p className="text-xl sm:text-2xl font-black">0120-502-622</p>
              </div>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-aoneko-celeste text-jeimas-blue-dark pt-16 pb-44 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-jeimas-blue-dark/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Logo brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3 text-jeimas-blue-dark">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-jeimas-blue-dark/20 shadow-sm flex items-center justify-center shrink-0">
                <img src="/assets/logo.jpg" alt="何でも屋 青ねこ ロゴ" className="w-full h-full object-cover" />
              </div>
              <span className="text-lg font-black tracking-tight">何でも屋 青ねこ</span>
            </div>
            <p className="text-sm font-semibold leading-relaxed max-w-sm text-jeimas-blue-dark/80">
              地域密着型便利屋として、エアコンクリーニング、草刈り、不用品買取・お片付けサポート、複雑なカメラ設置、出張パソコン修理、出張買取など、お客様の「困った」を何でもサポートいたします。
            </p>
            
            <div className="text-xs font-semibold leading-relaxed text-jeimas-blue-dark/80 space-y-1 pt-4 border-t border-jeimas-blue-dark/15 max-w-sm">
              <p>会社名： 合同会社 Jeimas</p>
              <p>便利屋「青ねこ」事務局</p>
              <p className="font-extrabold text-[#0C74B3]">電話番号： 0120-502-622</p>
              <p>所在地：蟹江営業所<br />〒497-0048 愛知県海部郡蟹江町舟入三丁目321番地</p>
            </div>
          </div>

          {/* Menus / Links (2 Columns) */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-jeimas-blue-dark text-sm font-black tracking-wider mb-4">対応エリア</h4>
              <p className="text-sm font-semibold leading-loose text-jeimas-blue-dark/80">
                愛知県・岐阜県・三重県
              </p>
              <p className="text-sm font-black leading-loose text-[#0C74B3] mt-2">
                受付: 24時間年中無休
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/40 p-4 rounded-3xl border border-sky-100/50">
                {/* IPA Logo */}
                <div className="w-20 h-20 shrink-0 bg-white rounded-2xl p-1 shadow-sm flex items-center justify-center border border-sky-50">
                  <img 
                    src="/assets/security_action.png" 
                    alt="SECURITY ACTION" 
                    className="w-full h-auto object-contain"
                  />
                </div>
                {/* Security Texts */}
                <div className="text-left space-y-1">
                  <p className="text-xs font-black text-jeimas-blue-dark leading-tight">安心・安全への確かな取り組み</p>
                  <p className="text-[10px] font-bold text-slate-500 leading-tight">経済産業省推進「SECURITY ACTION」一つ星宣言企業</p>
                  <p className="text-[10px] font-semibold text-slate-500 leading-tight">古物商許可 愛知県公安委員会 第542662601800号</p>
                </div>
              </div>

              {/* SNS Buttons in Footer */}
              <div className="mt-4 flex justify-center sm:justify-start items-center gap-3">
                <a 
                  href="https://www.instagram.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-7.5 h-7.5 rounded-full border border-jeimas-blue-dark/15 bg-white/40 text-jeimas-blue-dark flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-[#0C74B3] hover:scale-105 shadow-sm"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-7.5 h-7.5 rounded-full border border-jeimas-blue-dark/15 bg-white/40 text-jeimas-blue-dark flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-[#0C74B3] hover:scale-105 shadow-sm"
                  aria-label="TikTok"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.69a6.34 6.34 0 0 0 10.86 4.43 6.27 6.27 0 0 0 1.93-4.45V10.5a8.25 8.25 0 0 0 5.21 1.79v-3.5a4.78 4.78 0 0 1-3.41-2.1z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.youtube.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-7.5 h-7.5 rounded-full border border-jeimas-blue-dark/15 bg-white/40 text-jeimas-blue-dark flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-[#0C74B3] hover:scale-105 shadow-sm"
                  aria-label="YouTube"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.948.502 5.837a3.003 3.003 0 0 0 2.11 2.107c1.883.511 9.388.511 9.388.511s7.505 0 9.388-.511a3.002 3.002 0 0 0 2.11-2.107c.502-1.89.502-5.837.502-5.837s0-3.948-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Centered copyright line */}
        <div className="max-w-7xl mx-auto border-t border-jeimas-blue-dark/15 pt-8 text-center text-xs font-semibold text-jeimas-blue-dark/70">
          <p>© Nandemoya Aoneko. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Floating CTA for Mobile screens */}
      <StickyCTA />

      {/* Floating LINE Button */}
      <FloatingLineButton />

      {/* Floating Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}