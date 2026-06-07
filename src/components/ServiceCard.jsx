import React from 'react';

/**
 * ServiceCard Component
 * Displays service offerings. Accepts props for absolute operability.
 * Adheres strictly to the light blue aesthetic and custom 2.5rem border radius.
 */
export default function ServiceCard({
  title = "エアコンクリーニング",
  price = "7,000",
  features = [
    "エアコン内部の高圧洗浄・カビ除去",
    "分解清掃で電気代の節約にも貢献",
    "防カビ・抗菌仕上げオプションあり",
    "女性スタッフ帯同のご相談も可能"
  ],
  badge = "他社対抗割引 対象",
  imageSrc = "/assets/service_aircon.png",
  description = "追加料金なしで1台7000円のエアコン分解洗浄。プロの高圧クリーニングをお届けします。",
  icon = null
}) {

  return (
    <article className="premium-container max-w-md mx-auto bg-white border border-[#E0EEF6] shadow-md shadow-sky-100/40 hover:shadow-xl hover:shadow-sky-100 hover:scale-[1.01] transition-all duration-300 p-8 flex flex-col justify-between rounded-5xl">
      
      <div>
        {/* Service Header / Badge */}
        <div className="flex justify-between items-center mb-6">
          <span className="bg-[#E2F1FB] text-[#0C74B3] text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
            {badge}
          </span>
          <div className="bg-[#F0F8FD] p-3 rounded-full text-[#38A5E7]">
            {icon || (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            )}
          </div>
        </div>

        {/* Thumbnail Image with 2.5rem border radius container (Premium Hover Zoom) */}
        <div className="image-zoom-container relative overflow-hidden rounded-[2rem] bg-sky-50 mb-6 aspect-video border border-[#F0F7FA]">
          <img 
            src={imageSrc} 
            alt={`何でも屋 青ねこ - ${title}`} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Service Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">
          {title}
        </h3>

        {/* Service Description / AIO Queries */}
        {description && (
          <p className="text-xs text-slate-500 mb-4 leading-relaxed font-semibold">
            {description}
          </p>
        )}

        {/* Pricing Anchor */}
        <div className="flex items-baseline gap-1.5 mb-6 bg-[#F3F9FD] py-3 px-5 rounded-[1.5rem] border border-sky-50">
          <span className="text-xs text-slate-500 font-bold">安心の定額価格</span>
          <span className="text-2xl sm:text-3xl font-black text-[#0C74B3]">{price}</span>
          <span className="text-sm font-bold text-slate-800">円 ~</span>
          <span className="text-[10px] text-[#D97706] bg-amber-50 px-2.5 py-0.5 rounded-full font-bold ml-auto border border-amber-100">
            相見積もりで更にお安く！
          </span>
        </div>

        {/* Features Checklist */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
              <svg className="w-5 h-5 text-[#3AB33E] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action CTA with border-radius: 2.5rem and shine sweep */}
      <a 
        href="tel:0120-502-622" 
        className="shine-button w-full flex items-center justify-center gap-2 bg-gradient-to-r from-aoneko-red to-[#F03030] text-white font-extrabold py-4 rounded-[2.5rem] border border-white/10 shadow-[0_8px_20px_-6px_rgba(220,38,38,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
      >
        <span>今すぐ無料見積もり</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>

    </article>
  );
}
