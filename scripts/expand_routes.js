import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target Supabase Configuration (Tokio Instance ivbtpcxzyxrhevxoyqlh)
const supabaseUrl = 'https://ivbtpcxzyxrhevxoyqlh.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2YnRwY3h6eXhyaGV2eG95cWxoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDg0NDgwNywiZXhwIjoyMDk2NDIwODA3fQ.2EyD9U1JzgwRzBfXBoXvGQxecrH17lTjtLuziYo3gdw';

const targetUrl = `${supabaseUrl}/rest/v1/local_seo_routes?on_conflict=slug`;

const SUFFIX_MAP = {
  'pasokon-shuri': {
    suffix: '-pasokon-shuri',
    service_keyword: 'パソコン修理・データ復旧・画面修理',
    main_category: 'ITサポート'
  },
  'kusakari': {
    suffix: '-kusakari',
    service_keyword: '草刈り・庭木手入れ・エアコンクリーニング',
    main_category: '便利屋'
  },
  'sokujitsu': {
    suffix: '-sokujitsu',
    service_keyword: '即日対応・24時間受付・夜間対応',
    main_category: '緊急対応'
  },
  'keitora-hikoshi': {
    suffix: '-keitora-hikoshi',
    service_keyword: '軽トラ引越し・不用品回収・ゴミ屋敷片付け',
    main_category: '格安物流'
  }
};

async function expandRoutes() {
  const jsonPath = 'T:/TODO/MIS PAGINAS WEB Y PROYECTOS/AONEKO 365/AONEKO 365 NEW/LANDING/src/data/geo_routes.json';
  console.log(`Loading local base routes from: ${jsonPath}...`);
  
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`Base routes file not found at: ${jsonPath}`);
  }

  const baseRoutes = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log(`Loaded ${baseRoutes.length} base routes from geo_routes.json.`);

  const allRoutesToUpsert = [];
  const currentIsoString = new Date().toISOString();

  // 1. Prepare base routes for upsert
  for (const baseRoute of baseRoutes) {
    allRoutesToUpsert.push({
      slug: baseRoute.slug,
      city_name: baseRoute.city_name,
      prefecture: baseRoute.prefecture,
      seo_title_h1: baseRoute.seo_title_h1,
      service_type: baseRoute.service_type || 'aircon',
      is_active: true,
      created_at: baseRoute.created_at || currentIsoString,
      service_keyword: 'general',
      main_category: 'logistics'
    });
  }

  // 2. Prepare composite routes (1,956 * 4 = 7,824)
  for (const baseRoute of baseRoutes) {
    for (const [serviceType, details] of Object.entries(SUFFIX_MAP)) {
      const compositeSlug = `${baseRoute.slug}${details.suffix}`;
      
      // Premium pattern: 【公式】便利屋 青ねこ [Prefectura][Ciudad] | [Servicio Traducido] 24時間即日対応
      const title = `【公式】便利屋 青ねこ ${baseRoute.prefecture}${baseRoute.city_name} | ${details.service_keyword} 24時間即日対応`;

      allRoutesToUpsert.push({
        slug: compositeSlug,
        city_name: baseRoute.city_name,
        prefecture: baseRoute.prefecture,
        seo_title_h1: title,
        service_type: serviceType,
        is_active: true,
        created_at: currentIsoString,
        service_keyword: details.service_keyword,
        main_category: details.main_category
      });
    }
  }

  console.log(`Total routes prepared for injection: ${allRoutesToUpsert.length} (Base: ${baseRoutes.length}, Composite: ${baseRoutes.length * 4})`);

  // Bulk Insert/Upsert to Supabase
  console.log(`Starting bulk insertion to Supabase: ${supabaseUrl}...`);
  const chunkSize = 100;
  
  for (let i = 0; i < allRoutesToUpsert.length; i += chunkSize) {
    const chunk = allRoutesToUpsert.slice(i, i + chunkSize);
    console.log(`Inserting chunk ${i / chunkSize + 1}/${Math.ceil(allRoutesToUpsert.length / chunkSize)} (${chunk.length} rows)...`);

    const headers = {
      'apikey': supabaseServiceRoleKey,
      'Authorization': `Bearer ${supabaseServiceRoleKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    };

    const res = await fetch(targetUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(chunk)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`Failed to insert chunk at index ${i}:`, errText);
      throw new Error(`Target insert failed: ${res.status} ${res.statusText}`);
    }
  }

  console.log('Expansion, base alignment, and injection completed successfully!');
}

expandRoutes().catch(err => {
  console.error('Expansion failed:', err);
  process.exit(1);
});
