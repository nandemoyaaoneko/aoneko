
/**
 * TrustShield Component
 * Presents the 3 pillars of customer trust in a clean light-blue grid.
 * Strict non-dark theme compliance with border-radius: 2.5rem design consistency.
 */
export default function TrustShield() {
  const pillars = [
    {
      title: "24時間365日年中無休",
      subtitle: "夜間・早朝でも即対応可能",
      description: "急なエアコンの故障、深夜のお部屋の片付けなど、どんな時間帯でもスピーディーにお伺いします。エリア内最短30分駆けつけ！",
      icon: (
        <svg className="w-8 h-8 text-[#0C74B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "【地域最安値】の絶対保証",
      subtitle: "他社のお見積りからさらに10%OFF",
      description: "「本当に一番安いの？」という不安を完全にゼロにします。他社様のお見積書や画像をご提示いただければ、その金額から確実に【10%お値引き】して即日対応。無駄な相見積もりの時間はもう必要ありません。",
      icon: (
        <svg className="w-8 h-8 text-[#0C74B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "最大1億円の損害賠償保険",
      subtitle: "万が一のトラブルも万全保証",
      description: "作業中の万が一の物損や事故に備え、大手損害保険に加入しております。お客様の家財を最初から最後までしっかりと安心してお預けいただけます。",
      icon: (
        <svg className="w-8 h-8 text-[#0C74B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            青ねこが選ばれる3つの安心理由
          </h2>
          <div className="h-1.5 w-16 bg-[#0C74B3] mx-auto mt-4 rounded-full" />
          <p className="text-sm sm:text-base text-slate-500 mt-4 font-medium">
            私たちは「親切・丁寧・誠実」をモットーに、地域の皆様が心から信頼できるサービスをご提供します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={index}
              className="premium-container bg-[#F4F9FC] border border-sky-50 p-8 rounded-5xl hover:shadow-lg hover:shadow-sky-100/50 hover:bg-[#EEF5FA] transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md shadow-sky-100 group-hover:scale-110 transition-transform duration-300 mb-6 border border-sky-100/30">
                {pillar.icon}
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1">
                {pillar.title}
              </h3>
              <p className="text-xs font-bold text-[#0C74B3] mb-4">
                {pillar.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
