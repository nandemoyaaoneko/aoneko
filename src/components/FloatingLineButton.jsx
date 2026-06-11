
/**
 * FloatingLineButton Component
 * Fixed floating button on the right side of the screen.
 * Always accompanies the user on the right side while browsing, adjusted responsively
 * to sit above the mobile sticky CTA.
 */
export default function FloatingLineButton() {
  const lineUrl = "https://line.me/ti/p/XbHxvB_Kbu";
  
  return (
    <a 
      href={lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-32 md:bottom-6 z-40 flex items-center gap-2.5 bg-[#06C755] hover:bg-[#05b04b] text-white font-black py-3 px-5 rounded-full shadow-[0_8px_24px_rgba(6,199,85,0.4)] hover:shadow-[0_12px_28px_rgba(6,199,85,0.55)] hover:scale-[1.05] active:scale-[0.95] transition-all duration-300 border border-white/15 group cursor-pointer"
      aria-label="LINEでお見積り"
    >
      {/* LINE Logo SVG (White Bubble, Green Letters) */}
      <div className="w-6 h-6 shrink-0 relative flex items-center justify-center">
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 5.84 2 10.58c0 2.9 1.7 5.48 4.38 7.09l-.46 2.8c-.08.48.27.67.66.41l3.86-2.31c.5.07 1 .11 1.56.11 5.52 0 10-3.84 10-8.58S17.52 2 12 2z"/>
          <path fill="#06C755" d="M6.79 7.37h.76v3.86h1.75v.67H6.79V7.37zm3.26 0h.76v4.53h-.76V7.37zm1.51 0h.76l1.83 2.91V7.37h.76v4.53h-.76l-1.83-2.89v2.89h-.76V7.37zm4.1 0h2.59v.67h-1.83v1.23h1.64v.67h-1.64v1.29h1.83v.67h-2.59V7.37z"/>
        </svg>
      </div>
      <span className="text-xs sm:text-sm tracking-wide">LINEで見積もり</span>
    </a>
  );
}
