import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://ivbtpcxzyxrhevxoyqlh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2YnRwY3h6eXhyaGV2eG95cWxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NDQ4MDcsImV4cCI6MjA5NjQyMDgwN30.MdvF8WsMK5h37yEojHGrb8rkElpXHPI3UePZr4-92G4';
const serviceAccountPath = path.join(__dirname, '../service_account.json');
const logsPath = path.join(__dirname, '../indexing_logs.json');

async function runIndexing() {
  console.log('--- Google Indexing Flow Started ---');
  
  // 1. Verify service account file
  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(`Service account file not found at: ${serviceAccountPath}`);
  }
  console.log(`Loaded service account: ${serviceAccountPath}`);

  // 2. Load indexing logs
  let indexingLogs = {
    last_run_timestamp: null,
    total_submitted: 0,
    indexed_slugs: [],
    history: []
  };

  if (fs.existsSync(logsPath)) {
    try {
      indexingLogs = JSON.parse(fs.readFileSync(logsPath, 'utf8'));
      if (!Array.isArray(indexingLogs.indexed_slugs)) {
        indexingLogs.indexed_slugs = [];
      }
      if (!Array.isArray(indexingLogs.history)) {
        indexingLogs.history = [];
      }
    } catch (e) {
      console.warn('Could not parse indexing_logs.json, starting fresh:', e.message);
    }
  }
  console.log(`Loaded indexing history. Total URLs indexed so far: ${indexingLogs.indexed_slugs.length}`);

  // 3. Fetch all active routes from Supabase
  console.log('Fetching active routes from Supabase database...');
  let allRoutes = [];
  let offset = 0;
  const limit = 1000;
  let hasMore = true;

  while (hasMore) {
    const url = `${supabaseUrl}/rest/v1/local_seo_routes?select=slug&is_active=eq.true&limit=${limit}&offset=${offset}&order=slug`;
    const headers = {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`
    };

    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`Failed to fetch routes from Supabase: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    allRoutes = allRoutes.concat(data);
    
    if (data.length < limit) {
      hasMore = false;
    } else {
      offset += limit;
    }
  }
  console.log(`Fetched ${allRoutes.length} active routes from database.`);

  // 4. Filter for routes that have not been indexed yet
  const alreadyIndexedSet = new Set(indexingLogs.indexed_slugs);
  const startSlug = indexingLogs.start_slug || null;
  const unindexedRoutes = allRoutes.filter(r => {
    if (alreadyIndexedSet.has(r.slug)) return false;
    if (startSlug && r.slug < startSlug) return false;
    return true;
  });
  console.log(`Found ${unindexedRoutes.length} unindexed URLs (skipping slugs before: ${startSlug || 'none'}).`);

  if (unindexedRoutes.length === 0) {
    console.log('All URLs are already indexed! Exiting.');
    return;
  }

  // 5. Select the block of 200 URLs to submit
  const batchSize = 200;
  const routesToSubmit = unindexedRoutes.slice(0, batchSize);
  console.log(`Selected ${routesToSubmit.length} URLs for submission.`);

  // 6. Authenticate with Google APIs
  const auth = new google.auth.GoogleAuth({
    keyFile: serviceAccountPath,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
  const authClient = await auth.getClient();
  const indexing = google.indexing({
    version: 'v3',
    auth: authClient
  });

  // 7. Submit URLs to Google Indexing API
  const runResults = [];
  const successSlugs = [];
  const failureSlugs = [];

  for (let i = 0; i < routesToSubmit.length; i++) {
    const route = routesToSubmit[i];
    const targetUrl = `https://nandemoya-aoneko.jp/${route.slug}`;
    console.log(`[${i + 1}/${routesToSubmit.length}] Submitting: ${targetUrl}`);

    try {
      const response = await indexing.urlNotifications.publish({
        requestBody: {
          url: targetUrl,
          type: 'URL_UPDATED'
        }
      });
      
      runResults.push({
        slug: route.slug,
        status: 'success',
        statusCode: response.status,
        data: response.data
      });
      successSlugs.push(route.slug);
    } catch (err) {
      console.error(`Failed to submit ${route.slug}:`, err.message);
      runResults.push({
        slug: route.slug,
        status: 'failed',
        error: err.message
      });
      failureSlugs.push(route.slug);
    }

    // Small delay to respect API rate limits (e.g. 100ms)
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // 8. Update logs and history
  const currentIsoString = new Date().toISOString();
  indexingLogs.last_run_timestamp = currentIsoString;
  indexingLogs.indexed_slugs = indexingLogs.indexed_slugs.concat(successSlugs);
  indexingLogs.total_submitted = indexingLogs.indexed_slugs.length;

  indexingLogs.history.push({
    timestamp: currentIsoString,
    attempted_count: routesToSubmit.length,
    success_count: successSlugs.length,
    failure_count: failureSlugs.length,
    success_slugs: successSlugs,
    failures: runResults.filter(r => r.status === 'failed')
  });

  fs.writeFileSync(logsPath, JSON.stringify(indexingLogs, null, 2), 'utf8');
  console.log(`\nSubmission complete! Logs saved to: ${logsPath}`);
  console.log(`Successful: ${successSlugs.length}, Failed: ${failureSlugs.length}`);
}

runIndexing().catch(err => {
  console.error('Indexing run failed:', err);
  process.exit(1);
});
