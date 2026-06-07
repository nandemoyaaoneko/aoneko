import React from 'react';

/**
 * StickyCTA Component
 * Fixed at the bottom for mobile devices to encourage immediate actions.
 * Prominently offers the 10% competitor price match discount.
 */
export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-md border-t border-sky-100 shadow-2xl flex flex-col sm:flex-row justify-between items-center gap-3 md:hidden">
      
      {/* Promo Info */}
      <div className="text-center sm:text-left flex items-center gap-2">
        <span className="bg-[#DCEEFA] text-[#0C74B3] text-[10px] font-black px-2 py-0.5 rounded-full border border-sky-200">
          相見積もり歓迎
        </span>
        <p className="text-xs font-bold text-slate-700">
          他社の見積もり提示で<span className="text-[#0C74B3] text-sm">必ず10%OFF！</span>
        </p>
      </div>

      {/* Primary Calling Button with border-radius: 2.5rem and shine sweep */}
      <a 
        href="tel:0120-502-622" 
        className="shine-button w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-aoneko-red to-[#F03030] text-white font-extrabold py-3 px-6 rounded-[2.5rem] border border-white/10 shadow-[0_8px_20px_-6px_rgba(220,38,38,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
      >
        <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="text-sm tracking-wide">無料相談の電話をかける</span>
      </a>

    </div>
  );
}
