import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Read .env file manually to get configuration
const envPath = path.join(__dirname, '../.env');
let supabaseUrl = 'https://ivbtpcxzyxrhevxoyqlh.supabase.co';
let supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2YnRwY3h6eXhyaGV2eG95cWxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NDQ4MDcsImV4cCI6MjA5NjQyMDgwN30.MdvF8WsMK5h37yEojHGrb8rkElpXHPI3UePZr4-92G4';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split(/\r?\n/);
  for (const line of lines) {
    const matchUrl = line.match(/^\s*VITE_SUPABASE_URL\s*=\s*["']?(.*?)["']?\s*$/);
    if (matchUrl) supabaseUrl = matchUrl[1];
    const matchKey = line.match(/^\s*VITE_SUPABASE_ANON_KEY\s*=\s*["']?(.*?)["']?\s*$/);
    if (matchKey) supabaseAnonKey = matchKey[1];
  }
}

async function generateSitemap() {
  console.log(`Generating sitemap from Supabase: ${supabaseUrl}...`);
  
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  const writeStream = fs.createWriteStream(sitemapPath, { encoding: 'utf8' });

  // Helper to write to stream synchronously/awaitable
  const write = (chunk) => new Promise((resolve, reject) => {
    if (!writeStream.write(chunk)) {
      writeStream.once('drain', resolve);
    } else {
      process.nextTick(resolve);
    }
  });

  // Write XML Header
  await write('<?xml version="1.0" encoding="UTF-8"?>\n');
  await write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n');

  // Add homepage
  await write('  <url>\n');
  await write('    <loc>https://nandemoya-aoneko.jp/</loc>\n');
  await write('    <changefreq>daily</changefreq>\n');
  await write('    <priority>1.0</priority>\n');
  await write('  </url>\n');

  let offset = 0;
  const limit = 1000;
  let hasMore = true;
  let totalWritten = 0;

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
    
    console.log(`Fetched ${data.length} active routes from database...`);

    for (const route of data) {
      const dateStr = route.created_at ? new Date(route.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      let routeXml = '  <url>\n';
      routeXml += `    <loc>https://nandemoya-aoneko.jp/${route.slug}</loc>\n`;
      routeXml += `    <lastmod>${dateStr}</lastmod>\n`;
      routeXml += '    <changefreq>weekly</changefreq>\n';
      routeXml += '    <priority>0.8</priority>\n';
      routeXml += '  </url>\n';
      
      await write(routeXml);
      totalWritten++;
    }

    if (data.length < limit) {
      hasMore = false;
    } else {
      offset += limit;
    }
  }

  await write('</urlset>\n');
  
  writeStream.end();
  console.log(`Sitemap written successfully to: ${sitemapPath} (total URLs: ${totalWritten + 1})`);
}

generateSitemap().catch(err => {
  console.error('Failed to generate sitemap:', err);
  process.exit(1);
});
