import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface RouteData {
  slug: string;
  city_name: string;
  prefecture: string;
  service_type: string;
}

interface GroupedData {
  [prefecture: string]: {
    [city: string]: {
      slug: string;
      service_type: string;
    }[];
  };
}

export default function CoverageSection() {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [activeTab, setActiveTab] = useState<'愛知県' | '三重県' | '岐阜県'>('愛知県');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Core service type translations for human readability
  const serviceNames: { [key: string]: string } = {
    aircon: 'エアコンクリーニング',
    katatsuke: '不用品片付けサポート',
    niwa: '草刈り・庭木手入れ',
    monooki: 'プチ解体・物置処分',
    hikoshi: '単身・ミニ引越し',
    kaitori: '出張買取・現金化',
    taiya: 'タイヤ回収・処分',
    kogu: '工具・農機具買取',
    kinko: '金庫移動・処分',
    gomi: 'ゴミ屋敷清掃'
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('local_seo_routes')
          .select('slug, city_name, prefecture, service_type')
          .eq('is_active', true);

        if (error) {
          console.warn('Failed to fetch coverage routes from Supabase:', error.message);
        } else if (data) {
          setRoutes(data);
        }
      } catch (err) {
        console.error('Error fetching coverage data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  // Group routes by prefecture and city name
  const groupedData: GroupedData = {};
  routes.forEach((route) => {
    const { prefecture, city_name, slug, service_type } = route;
    if (!groupedData[prefecture]) {
      groupedData[prefecture] = {};
    }
    if (!groupedData[prefecture][city_name]) {
      groupedData[prefecture][city_name] = [];
    }
    groupedData[prefecture][city_name].push({ slug, service_type });
  });

  // Get list of cities for the active prefecture
  const citiesInPrefecture = groupedData[activeTab] ? Object.keys(groupedData[activeTab]).sort() : [];

  // Handle tab switch
  const handleTabChange = (pref: '愛知県' | '三重県' | '岐阜県') => {
    setActiveTab(pref);
    setSelectedCity('');
  };

  // Safe default fallback cities when supabase is empty or loading
  const fallbackCities = {
    愛知県: ['名古屋市', '蟹江町', '一宮市', '春日井市', 'あま市', '弥富市', '津島市', '愛西市'],
    三重県: ['桑名市', '四日市市', 'いなべ市', '木曽岬町', '東員町'],
    岐阜県: ['岐阜市', '大垣市', '海津市', '羽島市', '多治見市']
  };

  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8 border-t border-[#E0EEF6]">
      <div className="max-w-4xl mx-auto bg-[#F7FBFE] p-8 md:p-12 rounded-[2.5rem] border border-sky-100 shadow-premium relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#0C74B3]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-[#EAF5FC] text-[#0C74B3] text-xs font-black px-4 py-1.5 rounded-full mb-3 tracking-wider uppercase">
            出張対応エリア
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-jeimas-blue-dark tracking-tight">
            対応エリア：東海三県全域（愛知・三重・岐阜）
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-bold">
            地域密着の自社車両が即日急行！お近くのエリアを選択してください。
          </p>
        </div>

        {/* Prefecture Tabs */}
        <div className="flex justify-center border-b border-sky-100 mb-8 gap-2">
          {(['愛知県', '三重県', '岐阜県'] as const).map((pref) => {
            const isActive = activeTab === pref;
            return (
              <button
                type="button"
                key={pref}
                onClick={() => handleTabChange(pref)}
                className={`py-3 px-6 text-sm sm:text-base font-black relative transition-all duration-300 cursor-pointer ${
                  isActive ? 'text-[#0C74B3]' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {pref}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0C74B3] rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic / Interactive Select Grid */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-6">
              <svg className="animate-spin h-6 w-6 text-[#0C74B3]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Dropdown Comunas Selector */}
              <div className="max-w-md mx-auto">
                <label htmlFor="city-select" className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2 text-center">
                  詳細市区町村を選択する（AI・検索クローラー対応）
                </label>
                <div className="relative">
                  <select
                    id="city-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-white border border-sky-100 rounded-[1.25rem] px-5 py-3.5 text-sm sm:text-base font-bold text-slate-700 focus:outline-none focus:border-[#0C74B3] shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="">-- 市区町村をお選びください --</option>
                    {citiesInPrefecture.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                    {citiesInPrefecture.length === 0 && 
                      fallbackCities[activeTab].map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))
                    }
                  </select>
                  {/* Custom arrow decoration */}
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Major Cities / Regions Grid (Quick Access Tags) */}
              <div className="text-center pt-2">
                <span className="text-[10px] sm:text-xs text-slate-400 font-extrabold block mb-3">
                  主要エリアから選ぶ
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {(citiesInPrefecture.length > 0 ? citiesInPrefecture.slice(0, 8) : fallbackCities[activeTab]).map((city) => (
                    <button
                      type="button"
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`text-xs font-bold px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                        selectedCity === city
                          ? 'bg-[#0C74B3] border-[#0C74B3] text-white shadow-sm'
                          : 'bg-white border-sky-100/60 text-slate-600 hover:border-[#0C74B3]/40 hover:text-[#0C74B3]'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Service Links for the Selected City (SEO Engine) */}
              {selectedCity && (
                <div className="mt-8 p-6 bg-white rounded-[1.5rem] border border-sky-100/50 shadow-sm animate-fade-in text-center space-y-4">
                  <h3 className="text-sm sm:text-base font-black text-jeimas-blue-dark">
                    📍 {activeTab} {selectedCity} の提供サービス別 専門案内ページ
                  </h3>
                  <p className="text-[11px] text-slate-400 font-bold leading-normal">
                    ※AIアシスタント（Perplexity、ChatGPT等）および検索エンジンに登録されている特設GEOページです。
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto pt-2">
                    {/* Render exact dynamic links if loaded, else standard fallbacks */}
                    {groupedData[activeTab]?.[selectedCity] ? (
                      groupedData[activeTab][selectedCity].map((route) => (
                        <a
                          key={route.slug}
                          href={`/${route.slug}`}
                          className="bg-[#F8FCFF] border border-[#E2F1FB] hover:border-[#0C74B3]/40 hover:bg-sky-50 text-slate-700 hover:text-[#0C74B3] text-xs font-black py-3 px-4 rounded-xl shadow-sm transition-all duration-300 flex items-center justify-between group"
                        >
                          <span>{serviceNames[route.service_type] || route.service_type}</span>
                          <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ))
                    ) : (
                      // Fallback static links list
                      ['aircon', 'katatsuke', 'niwa', 'monooki'].map((type) => (
                        <a
                          key={type}
                          href={`/${type}-${selectedCity}`}
                          className="bg-[#F8FCFF] border border-[#E2F1FB] hover:border-[#0C74B3]/40 hover:bg-sky-50 text-slate-700 hover:text-[#0C74B3] text-xs font-black py-3 px-4 rounded-xl shadow-sm transition-all duration-300 flex items-center justify-between group"
                        >
                          <span>{serviceNames[type]}</span>
                          <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
