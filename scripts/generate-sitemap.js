import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ivbtpcxzyxrhevxoyqlh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_XDbeCrXHYHfNidJ3hrAM-g_aWXiEwU9';

async function generateSitemap() {
  console.log('Generating sitemap from Supabase routes...');
  
  let allRoutes = [];
  let offset = 0;
  const limit = 1000;
  let hasMore = true;

  while (hasMore) {
    const url = `${supabaseUrl}/rest/v1/local_seo_routes?select=slug,created_at&is_active=eq.true&limit=${limit}&offset=${offset}&order=slug`;
    const headers = {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`
    };

    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`Failed to fetch routes: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    allRoutes = allRoutes.concat(data);
    console.log(`Fetched ${data.length} active routes (total: ${allRoutes.length})`);
    if (data.length < limit) {
      hasMore = false;
    } else {
      offset += limit;
    }
  }

  console.log(`Successfully fetched ${allRoutes.length} active routes. Writing XML...`);

  // Build sitemap XML content
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add homepage
  xml += '  <url>\n';
  xml += '    <loc>https://nandemoya-aoneko.jp/</loc>\n';
  xml += '    <changefreq>daily</changefreq>\n';
  xml += '    <priority>1.0</priority>\n';
  xml += '  </url>\n';

  // Add all dynamic routes
  for (const route of allRoutes) {
    const dateStr = route.created_at ? new Date(route.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    xml += '  <url>\n';
    xml += `    <loc>https://nandemoya-aoneko.jp/${route.slug}</loc>\n`;
    xml += `    <lastmod>${dateStr}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`Sitemap written successfully to: ${sitemapPath}`);
}

generateSitemap().catch(err => {
  console.error('Failed to generate sitemap:', err);
  process.exit(1);
});
