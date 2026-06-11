
/**
 * ServiceCard Component
 * Re-designed as a split 2-column detail card:
 * - Left column: smaller aspect-[4/3] image + pricing box + call CTA button.
 * - Right column: badge, service title, narrow easily-readable description, features list.
 */
export default function ServiceCard({
  title = "エアコンクリーニング",
  price = "7,000",
  features = [
    "エアコン内部の高圧洗浄・カビ除去",
    "分解清掃で電気代の節約にも貢献",
    "防カビ・抗菌仕上げオプションあり"
  ],
  badge = "他社対抗割引 対象",
  imageSrc = "/assets/service_aircon.png",
  description = "追加料金なしで1台7000円のエアコン分解洗浄。蟹江 エアコン掃除 即日対応もお任せください。",
  locationTag = "愛知・岐阜・三重",
  icon = null
}) {

  return (
    <article className="bg-white rounded-[32px] border border-[#E0EEF6] shadow-premium p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300">
      

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10 h-full">
        
        {/* Left column inside card: Image + Price + CTA */}
        <div className="lg:col-span-5 space-y-6 w-full flex flex-col justify-between h-full">
          <div className="space-y-6">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden shadow-inner bg-sky-50 border border-[#F0F7FA]">
              <div className="absolute inset-0 bg-[#0C74B3]/5 mix-blend-overlay z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent z-10"></div>

              <img 
                src={imageSrc} 
                alt={`何でも屋 青ねこ - ${title}`} 
                className="w-full h-full object-cover transition-transform duration-[4000ms] hover:scale-105 ease-out"
              />

              {/* Location / Tag Overlay */}
              <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                <svg className="w-3 h-3 text-[#0C74B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-[8px] font-bold text-white/90 tracking-wider">
                  {locationTag}
                </span>
              </div>
            </div>

            {/* Pricing block */}
            <div className="flex items-baseline gap-1.5 bg-[#F3F9FD] py-3.5 px-5 rounded-[1.5rem] border border-sky-50">
              <span className="text-xs text-slate-500 font-bold">安心定額</span>
              <span className="text-2xl sm:text-3xl font-black text-[#0C74B3]">{price}</span>
              <span className="text-sm font-bold text-slate-800">円 ~</span>
              <span className="text-[9px] text-[#D97706] bg-amber-50 px-2 py-0.5 rounded-full font-bold ml-auto border border-amber-100">
                見積り無料
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <a 
            href="tel:0120-502-622" 
            className="shine-button w-full flex items-center justify-center gap-2 bg-gradient-to-r from-aoneko-pink to-[#E0006C] text-white font-extrabold py-4 rounded-[2.5rem] border border-white/10 shadow-[0_8px_20px_-6px_rgba(255,0,127,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-6"
          >
            <span>電話で無料見積もり</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Right column inside card: Title + Description + Checklist */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between h-full w-full">
          <div className="space-y-4">
            <div>
              <span className="bg-[#E2F1FB] text-[#0C74B3] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                {badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-jeimas-blue-dark leading-tight flex items-center gap-3">
                {icon && <span className="w-8 h-8 text-[#0C74B3] shrink-0">{icon}</span>}
                <span>{title}</span>
              </h3>
            </div>

            {/* Description - narrower column makes it much easier to read! */}
            <p className="text-sm text-slate-600 leading-relaxed font-semibold">
              {description}
            </p>
          </div>

          <div className="h-[1px] bg-slate-100 w-full" />

          {/* Features Checklist */}
          <div>
            <h4 className="text-xs text-slate-400 font-black tracking-wider uppercase mb-3">サービスの特徴</h4>
            <ul className="space-y-3">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <svg className="w-5 h-5 text-[#3AB33E] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold">{feature}</span>
                </li>
              ))}
            </ul>
            {title.includes("不用品買取") && (
              <div className="mt-4 pt-3 border-t border-sky-100/20 text-left space-y-3">
                <p className="text-[8px] sm:text-[9px] text-sky-800/40 leading-normal font-medium">
                  ※価値のあるお品物は適正価格で買取し、整理費用からお値引きいたします。<br className="hidden md:block"/>
                  廃棄物処理が必要な場合は、提携の一般廃棄物収集運搬業者を手配いたします。
                </p>
                {/* Nuevo Banner de Descuento (Marketing) */}
                <div className="bg-sky-100/80 border border-sky-200 text-sky-800 font-bold text-[10px] sm:text-xs px-4 py-2.5 rounded-full shadow-sm text-center">
                  <span className="text-sm mr-1">🤝</span> 相見積もり大歓迎！他社様のお見積り提示でさらに<span className="text-red-500 font-extrabold mx-1">10%OFF</span>の割引を適用！
                </div>
              </div>
            )}
          </div>

          {!title.includes("不用品買取") && (
            <div className="pt-2 text-[10px] text-slate-400 font-bold leading-normal">
              <span>※相見積もり大歓迎！他社様のお見積り提示でさらに10%OFFの割引を適用いたします。</span>
            </div>
          )}
        </div>

      </div>

      {/* Hover Glow Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#0C74B3] to-transparent group-hover:w-full transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
    </article>
  );
}
