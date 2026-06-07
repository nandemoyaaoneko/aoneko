import React, { useState } from 'react';
import SEOHead from './components/SEOHead';
import HeroSection from './components/HeroSection';
import ServiceCard from './components/ServiceCard';
import TrustShield from './components/TrustShield';
import StickyCTA from './components/StickyCTA';

export default function App() {
  // First FAQ accordion item is expanded by default (index 0)
  const [activeFaq, setActiveFaq] = useState(0);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Services data list (AIO optimized)
  const services = [
    {
      title: "エアコンクリーニング",
      price: "7,000",
      badge: "他社対抗割引 対象",
      imageSrc: "/assets/service_aircon.png",
      description: "追加料金なしで1台7000円のエアコン分解洗浄。蟹江 エアコン掃除 即日対応もお任せください。",
      features: [
        "エアコン内部の高圧洗浄・カビ除去",
        "分解清掃で電気代の節約にも貢献",
        "防カビ・抗菌仕上げオプションあり",
        "女性スタッフ帯同のご相談も可能"
      ]
    },
    {
      title: "草刈り・庭木手入れ",
      price: "8,000",
      badge: "即日対応可能",
      imageSrc: "/assets/service_weeding.png",
      description: "愛知県周辺で深夜や早朝に対応できる片付け・便利屋としてお庭の手入れから草刈りまで即日急行。",
      features: [
        "お庭の雑草刈り・空き地の除草作業",
        "伸びすぎた植木・庭木の剪定カット",
        "作業後のゴミ回収・処分も丸投げOK",
        "定期メンテナンスのご相談も歓迎"
      ]
    },
    {
      title: "不用品回収・お片付け",
      price: "10,000",
      badge: "高価買取実施中",
      imageSrc: "/assets/service_rubbish.png",
      description: "事前の分別や片付けが不要（丸投げできる）ゴミ屋敷清掃サービス。不用品回収 即日処分、粗大ゴミ 格安 処分対応。",
      features: [
        "大型家具・家電の搬出から処分まで",
        "ゴミ屋敷の丸ごと一掃お片付け",
        "まだ使えるものはその場で即査定・買取",
        "遺品整理・生前整理もお任せください"
      ]
    },
    {
      title: "ハウスクリーニング",
      price: "12,000",
      badge: "水回りセット割引あり",
      imageSrc: "/assets/service_cleaning.png",
      description: "他社の見積もりより10%安くなる不用品回収業者と連携した、お引越し・片付け・水回り清掃の格安丸投げプラン。",
      features: [
        "キッチン・換気扇の頑固な油汚れ清掃",
        "お風呂・洗面所の水アカ・カビ退治",
        "窓ガラス・サッシ・ベランダの洗浄",
        "引っ越し前後の入退去丸ごと清掃"
      ]
    }
  ];

  // Steps data list with premium Gold (#D4AF37) details
  const steps = [
    {
      num: "01",
      title: "お問い合わせ",
      desc: "お電話またはWebよりご相談ください。24時間体制で受け付けております。",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#D4AF37" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      num: "02",
      title: "無料お見積り",
      desc: "現地にて丁寧に査定いたします。その場で金額をご提示し、キャンセルも無料です。",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#D4AF37" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      num: "03",
      title: "作業実施",
      desc: "プロの技術で迅速に作業を行います。マナーを徹底し新品靴下に履き替えます。",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#D4AF37" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      num: "04",
      title: "お支払い",
      desc: "作業内容をご確認いただき、問題がなければお支払いにて完了となります。",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#D4AF37" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  // FAQs data list
  const faqs = [
    {
      q: "お見積り後に断っても大丈夫ですか？",
      a: "はい、もちろんです。お見積りは完全無料で行っております。金額や内容にご納得いただけない場合は、その場でお断りいただいても出張料や査定料などは一切発生いたしません。"
    },
    {
      q: "早朝や深夜の対応は可能ですか？",
      a: "はい、対応可能です。「何でも屋 青ねこ」は24時間365日営業しておりますので、お客様のライフスタイルやご都合に合わせて柔軟に作業スケジュールを調整いたします。"
    },
    {
      q: "どんな物でも引き取りや買取が可能ですか？",
      a: "家電製品、家具、衣類、趣味の品、ブランド品など幅広く買取を行っております。状態や法令によって引き取りが難しい場合もございますが、最善の処分・片付け方法をご提案いたします。"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-700 antialiased font-sans">
      <SEOHead />

      {/* Header (Top) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sky-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          {/* Logo brand (Left) */}
          <div className="flex items-center gap-3">
            <div className="bg-[#EAF5FC] p-2.5 rounded-full text-[#0C74B3]">
              <svg className="w-8 h-8" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 15 C40 15 32 25 32 37 C32 43 34 49 38 53 C30 58 24 67 24 78 C24 81 26 83 29 83 L71 83 C74 83 76 81 76 78 C76 67 70 58 62 53 C66 49 68 43 68 37 C68 25 60 15 50 15 Z" />
                <path d="M22 10 L38 28" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <path d="M78 10 L62 28" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black text-jeimas-blue-dark tracking-tight block">何でも屋 青ねこ</span>
              <span className="text-[10px] text-[#0C74B3] font-bold block leading-none">地域密着型お助け便利屋</span>
            </div>
          </div>

          {/* Quick contact (Right) */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:block text-right">
              <span className="text-xs text-jeimas-blue-dark font-extrabold">
                24時間受付中 お見積り無料！
              </span>
            </div>

            {/* CTA Call button in Aoneko Red */}
            <a 
              href="tel:0120-502-622" 
              className="shine-button flex items-center gap-2 bg-gradient-to-r from-aoneko-red to-[#F03030] text-white font-bold py-2.5 px-4 rounded-[2.5rem] border border-white/10 shadow-[0_4px_12px_-3px_rgba(220,38,38,0.4)] transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm sm:text-base font-black">0120-502-622</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main semantic container */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Services Section ("サービス一覧") */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="services">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-jeimas-blue-dark tracking-[-0.02em]">
              サービス一覧
            </h2>
            <div className="h-1.5 w-16 bg-[#D4AF37] mx-auto mt-4 rounded-full" />
            <p className="text-sm sm:text-base text-slate-500 mt-4 font-bold">
              プロの技術で、あなたのご毎日をもっと快適に。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((svc, idx) => (
              <ServiceCard 
                key={idx}
                title={svc.title}
                price={svc.price}
                badge={svc.badge}
                imageSrc={svc.imageSrc}
                description={svc.description}
                features={svc.features}
              />
            ))}
          </div>
        </section>

        {/* Brand Trust Banner */}
        <TrustShield />

        {/* Process Section ("ご依頼の流れ") */}
        <section className="py-20 bg-gradient-to-b from-[#F0F9FF]/30 to-white px-4 sm:px-6 lg:px-8" id="process">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-jeimas-blue-dark tracking-[-0.02em]">
                ご依頼の流れ
              </h2>
              <div className="h-1.5 w-16 bg-[#D4AF37] mx-auto mt-4 rounded-full" />
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
                    <h3 className="text-lg font-black text-jeimas-blue-dark mb-2 pr-8">
                      {st.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
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

        {/* FAQ Section ("よくある質問") */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" id="faq">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-jeimas-blue-dark tracking-[-0.02em]">
              よくある質問
            </h2>
            <div className="h-1.5 w-16 bg-[#D4AF37] mx-auto mt-4 rounded-full" />
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
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center text-left py-6 px-8 hover:bg-[#FBFDFE] transition-colors"
                  >
                    <span className="font-bold text-jeimas-blue-dark text-sm sm:text-base pr-4 flex items-center gap-3">
                      <span className="text-[#D4AF37] font-black">Q.</span>
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
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-60 border-t border-sky-50' : 'max-h-0'}`}
                  >
                    <div className="p-8 bg-[#FBFDFE] text-slate-600 text-sm sm:text-base leading-relaxed font-medium flex gap-3">
                      <span className="text-[#E08F24] font-black">A.</span>
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="bg-jeimas-blue py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-sky-100/50 relative overflow-hidden">
          {/* Subtle gold decoration in background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />

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
              className="shine-button inline-flex items-center justify-center gap-4 bg-gradient-to-r from-aoneko-red to-[#F03030] text-white font-extrabold py-5 px-10 rounded-[2.5rem] border border-white/10 shadow-[0_12px_28px_-6px_rgba(220,38,38,0.55),0_8px_16px_-6px_rgba(220,38,38,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 mt-4"
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
      <footer className="bg-slate-900 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-850">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Logo brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="bg-slate-800 p-2.5 rounded-full">
                <svg className="w-6 h-6 text-white" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 15 C40 15 32 25 32 37 C32 43 34 49 38 53 C30 58 24 67 24 78 C24 81 26 83 29 83 L71 83 C74 83 76 81 76 78 C76 67 70 58 62 53 C66 49 68 43 68 37 C68 25 60 15 50 15 Z" />
                  <path d="M22 10 L38 28" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  <path d="M78 10 L62 28" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">何でも屋 青ねこ</span>
            </div>
            <p className="text-sm font-medium leading-relaxed max-w-sm">
              地域密着型便利屋として、エアコンクリーニング、草刈り、不用品回収など、お客様の「困った」を何でもサポートいたします。24時間受付中！
            </p>
          </div>

          {/* Menus / Links (3 Columns) */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white text-sm font-bold tracking-wider mb-4">対応エリア</h4>
              <p className="text-sm font-medium leading-loose">愛知県（蟹江町、名古屋市）</p>
              <p className="text-sm font-medium leading-loose">岐阜県</p>
              <p className="text-sm font-medium leading-loose">三重県</p>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold tracking-wider mb-4">運営会社</h4>
              <p className="text-sm font-medium leading-loose">便利屋「青ねこ」事務局</p>
              <p className="text-sm font-medium leading-loose">電話: 0120-502-622</p>
              <p className="text-sm font-medium leading-loose">受付: 24時間年中無休</p>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold tracking-wider mb-4">メニュー</h4>
              <ul className="space-y-2 text-sm font-medium">
                <li><a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
                <li><a href="#" className="hover:text-white transition-colors">特定商取引法表記</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Centered copyright line */}
        <div className="max-w-7xl mx-auto border-t border-slate-800/80 pt-8 text-center text-xs font-medium">
          <p>© Nandemoya Aoneko. All Rights Reserved. 古物商許可 第XXXXXXXXXX号</p>
        </div>
      </footer>

      {/* Floating CTA for Mobile screens */}
      <StickyCTA />
    </div>
  );
}
