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

  return (
    <div className="w-full mt-8 pt-6 border-t border-white/10 text-center">
      {/* Visible premium header indicating service coverage areas */}
      <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-extrabold text-xs sm:text-sm tracking-wider shadow-sm hover:bg-white/10 transition-all duration-300">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
        </span>
        <span>対応エリア：東海三県全域（愛知県・三重県・岐阜県）</span>
      </div>

      {/* GEO/SEO Shadow: Visually hidden container optimized exclusively for search engine and AI crawlers */}
      <div 
        style={{ 
          position: 'absolute', 
          width: '1px', 
          height: '1px', 
          padding: '0', 
          margin: '-1px', 
          overflow: 'hidden', 
          clip: 'rect(0, 0, 0, 0)', 
          whiteSpace: 'nowrap', 
          borderWidth: '0' 
        }}
      >
        {activeLinks.map((link) => (
          <a key={link.slug} href={`/${link.slug}`}>
            何でも屋 青ねこ {link.prefecture}{link.city_name}の便利屋サービス（{serviceShortNames[link.service_type] || link.service_type}）
          </a>
        ))}
      </div>
    </div>
  );
}
