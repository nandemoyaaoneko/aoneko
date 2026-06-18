import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface RouteData {
  slug: string;
  city_name: string;
  prefecture: string;
  service_type: string;
}

export default function CoverageSection() {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState(true);

  // Short translations for the service types in sitemap
  const serviceShortNames: { [key: string]: string } = {
    aircon: 'エアコン',
    katatsuke: '片付け',
    niwa: '草刈り',
    monooki: 'プチ解体',
    hikoshi: '引越し',
    kaitori: '買取',
    taiya: 'タイヤ',
    kogu: '工具',
    kinko: '金庫',
    gomi: 'ゴミ清掃'
  };

  const fallbackLinks: RouteData[] = [
    { slug: 'aircon-nagoya', city_name: '名古屋市', prefecture: '愛知県', service_type: 'aircon' },
    { slug: 'katatsuke-nagoya', city_name: '名古屋市', prefecture: '愛知県', service_type: 'katatsuke' },
    { slug: 'monooki-nagoya', city_name: '名古屋市', prefecture: '愛知県', service_type: 'monooki' },
    { slug: 'niwa-nagoya', city_name: '名古屋市', prefecture: '愛知県', service_type: 'niwa' },
    { slug: 'aircon-kanie', city_name: '蟹江町', prefecture: '愛知県', service_type: 'aircon' },
    { slug: 'katatsuke-kanie', city_name: '蟹江町', prefecture: '愛知県', service_type: 'katatsuke' },
    { slug: 'monooki-kanie', city_name: '蟹江町', prefecture: '愛知県', service_type: 'monooki' },
    { slug: 'niwa-kanie', city_name: '蟹江町', prefecture: '愛知県', service_type: 'niwa' },
    { slug: 'aircon-kuwana', city_name: '桑名市', prefecture: '三重県', service_type: 'aircon' },
    { slug: 'katatsuke-kuwana', city_name: '桑名市', prefecture: '三重県', service_type: 'katatsuke' },
    { slug: 'aircon-yokkaichi', city_name: '四日市市', prefecture: '三重県', service_type: 'aircon' },
    { slug: 'katatsuke-yokkaichi', city_name: '四日市市', prefecture: '三重県', service_type: 'katatsuke' },
    { slug: 'aircon-gifu', city_name: '岐阜市', prefecture: '岐阜県', service_type: 'aircon' },
    { slug: 'katatsuke-gifu', city_name: '岐阜市', prefecture: '岐阜県', service_type: 'katatsuke' },
  ];

  useEffect(() => {
    const fetchRoutes = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        let allRoutes: RouteData[] = [];
        let page = 0;
        const pageSize = 1000;
        let hasMore = true;

        while (hasMore) {
          const { data, error } = await supabase
            .from('local_seo_routes')
            .select('slug, city_name, prefecture, service_type')
            .eq('is_active', true)
            .range(page * pageSize, (page + 1) * pageSize - 1);

          if (error) {
            console.warn('Failed to fetch coverage routes from Supabase:', error.message);
            hasMore = false;
          } else if (data && data.length > 0) {
            allRoutes = [...allRoutes, ...data];
            if (data.length < pageSize) {
              hasMore = false;
            } else {
              page++;
            }
          } else {
            hasMore = false;
          }
        }

        if (allRoutes.length > 0) {
          // Sort to keep links structured by city and service type
          allRoutes.sort((a, b) => {
            const prefComp = a.prefecture.localeCompare(b.prefecture, 'ja');
            if (prefComp !== 0) return prefComp;
            const cityComp = a.city_name.localeCompare(b.city_name, 'ja');
            if (cityComp !== 0) return cityComp;
            return a.service_type.localeCompare(b.service_type, 'ja');
          });
          setRoutes(allRoutes);
        }
      } catch (err) {
        console.error('Error fetching coverage data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  const activeLinks = routes.length > 0 ? routes : fallbackLinks;

  // Filter links by prefecture
  const aichiLinks = activeLinks.filter((link) => link.prefecture === '愛知県');
  const mieLinks = activeLinks.filter((link) => link.prefecture === '三重県');
  const gifuLinks = activeLinks.filter((link) => link.prefecture === '岐阜県');

  const renderLinkGrid = (links: RouteData[]) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-2">
        {links.map((link) => (
          <a
            key={link.slug}
            href={`/${link.slug}`}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/25 rounded-xl py-1.5 px-3 text-[10px] sm:text-xs font-semibold transition-all duration-300 shadow-sm text-center truncate block"
          >
            {link.city_name}（{serviceShortNames[link.service_type] || link.service_type}）
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full mt-12 pt-8 border-t border-white/10 text-left">
      <h3 className="text-base sm:text-lg font-black text-white tracking-wide mb-2">
        📍 東海三県・詳細出張対応エリア（SEO・AIインデックス用）
      </h3>
      <p className="text-[10px] sm:text-xs text-sky-100/70 font-semibold mb-6">
        ※各市区町村での専門サービス案内ページ一覧です。AI検索エンジンおよび各種ロボットがインデックスするために登録されています。
      </p>

      {loading ? (
        <div className="flex justify-center py-4">
          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Aichi prefecture links */}
          {aichiLinks.length > 0 && (
            <div>
              <h4 className="text-xs sm:text-sm font-black text-white/95 border-b border-white/10 pb-1.5 mb-3">
                【愛知県】
              </h4>
              {renderLinkGrid(aichiLinks)}
            </div>
          )}

          {/* Mie prefecture links */}
          {mieLinks.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs sm:text-sm font-black text-white/95 border-b border-white/10 pb-1.5 mb-3">
                【三重県】
              </h4>
              {renderLinkGrid(mieLinks)}
            </div>
          )}

          {/* Gifu prefecture links */}
          {gifuLinks.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs sm:text-sm font-black text-white/95 border-b border-white/10 pb-1.5 mb-3">
                【岐阜県】
              </h4>
              {renderLinkGrid(gifuLinks)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
