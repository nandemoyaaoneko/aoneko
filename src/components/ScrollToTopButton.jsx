import { useState, useEffect } from 'react';

/**
 * ScrollToTopButton Component
 * Floating scroll-to-top button positioned on the left side of the screen.
 * Appears only when the user scrolls down a certain distance, and smooth scrolls back to top.
 */
export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed left-4 bottom-32 md:bottom-6 z-40 w-12 h-12 rounded-full flex items-center justify-center bg-[#0C74B3]/90 hover:bg-[#0C74B3] text-white backdrop-blur-sm shadow-[0_8px_24px_rgba(12,116,179,0.35)] hover:shadow-[0_12px_28px_rgba(12,116,179,0.5)] hover:scale-[1.05] active:scale-[0.95] transition-all duration-300 border border-white/15 cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'
      }`}
      aria-label="ページトップへ戻る"
    >
      <svg className="w-6 h-6 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}
