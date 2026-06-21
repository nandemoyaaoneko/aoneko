import { useEffect } from 'react';

/**
 * SEOHead Component
 * Manages core traditional keywords, geo-targeting variables, and builds AIO natural language queries
 * directly inside the document head, including Open Graph tags, canonical link, and local schemas
 * to ensure maximum indexation and recommendation by search engines and LLM artificial intelligences.
 */
export default function SEOHead({ faqs = [], seoRoute = null }) {
  useEffect(() => {
    const defaultTitle = "エアコンクリーニング 7,700円 | 不用品買取・お片付けサポート 即日片付けなら何でも屋・便利屋「青ねこ」【愛知県・蟹江町・名古屋市・岐阜県・三重県】";
    const defaultDesc = "愛知 不用品リユース引取・買取最安値に挑戦！蟹江 エアコン掃除 即日、三重 不用品整理お片付け業者なら便利屋「青ねこ」にお任せください。他社のお見積り提示で必ず10%OFFの相見積もり割引実施中！大きなお荷物の整理整頓、引っ越し（aoneko move）に伴う整理整頓を丸投げで24時間365日対応。";
    const defaultKeywords = "何でも屋 青ねこ,便利屋 青ねこ,青ねこ,aoneko move,エアコンクリーニング,不用品回収,お片付けサポート,草刈り,庭木手入れ,物置分解,プチ解体,出張買取,愛知県,蟹江町,名古屋市,岐阜県,三重県";

    const serviceTranslations = {
      'pasokon-shuri': 'パソコン修理・データ復旧・画面修理',
      'kusakari': '草刈り・庭木手入れ・エアコンクリーニング',
      'sokujitsu': '即日対応・24時間受付・夜間対応',
      'keitora-hikoshi': '軽トラ引越し・不用品回収・ゴミ屋敷片付け'
    };

    let title = defaultTitle;
    let desc = defaultDesc;

    if (seoRoute) {
      let isComposite = false;
      let serviceTranslated = '';
      
      for (const [key, val] of Object.entries(serviceTranslations)) {
        if (seoRoute.slug.endsWith(key) || seoRoute.service_type === key) {
          isComposite = true;
          serviceTranslated = val;
          break;
        }
      }

      if (isComposite) {
        title = `【公式】便利屋 青ねこ ${seoRoute.prefecture}${seoRoute.city_name} | ${serviceTranslated} 24時間即日対応`;
        desc = `${seoRoute.prefecture}${seoRoute.city_name}周辺で便利屋・何でも屋をお探しなら「便利屋 青ねこ」にお任せください。${serviceTranslated}の即日対応、エアコン掃除、不用品お片付けサポートなど、お庭や住まいのお困りごとを24時間体制でスピード解決します。他社のお見積り提示でさらに10%OFFの相見積もり割引実施中！`;
      } else {
        title = `${seoRoute.seo_title_h1} | 何でも屋・便利屋「青ねこ」`;
        desc = `${seoRoute.prefecture}${seoRoute.city_name}周辺で便利屋・何でも屋をお探しなら「青ねこ」にお任せください。${seoRoute.seo_title_h1}の即日対応、エアコン掃除、不用品お片付けサポートなど、お庭や住まいのお困りごとを24時間体制でスピード解決します。他社のお見積り提示でさらに10%OFFの相見積もり割引実施中！`;
      }
    }

    const keywords = seoRoute
      ? `${seoRoute.city_name} ${seoRoute.seo_title_h1},${seoRoute.city_name} 便利屋,${seoRoute.city_name} 何でも屋,${seoRoute.city_name} エアコンクリーニング,${seoRoute.city_name} 不用品回収,${seoRoute.city_name} 片付け,${seoRoute.city_name} 物置処分,${defaultKeywords}`
      : defaultKeywords;

    const currentUrl = window.location.href;
    const originUrl = window.location.origin;
    const logoUrl = `${originUrl}/assets/logo.jpg`;

    // Update main properties
    document.title = title;

    // Helper to get or create element
    const updateOrCreateMeta = (selector, attributeName, attributeValue, contentValue) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // Update meta tags
    updateOrCreateMeta('meta[name="description"]', 'name', 'description', desc);
    updateOrCreateMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    updateOrCreateMeta('meta[name="robots"]', 'name', 'robots', 'index, follow');

    // Update Open Graph tags
    updateOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', title);
    updateOrCreateMeta('meta[property="og:description"]', 'property', 'og:description', desc);
    updateOrCreateMeta('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    updateOrCreateMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    updateOrCreateMeta('meta[property="og:image"]', 'property', 'og:image', logoUrl);
    updateOrCreateMeta('meta[property="og:site_name"]', 'property', 'og:site_name', '何でも屋 青ねこ');
    updateOrCreateMeta('meta[property="og:locale"]', 'property', 'og:locale', 'ja_JP');

    // Update Twitter Card tags
    updateOrCreateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateOrCreateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateOrCreateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', desc);
    updateOrCreateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', logoUrl);

    // Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // Update Favicon Link
    let faviconLink = document.querySelector('link[rel="icon"][type="image/x-icon"]');
    if (!faviconLink) {
      faviconLink = document.createElement('link');
      faviconLink.setAttribute('rel', 'icon');
      faviconLink.setAttribute('type', 'image/x-icon');
      document.head.appendChild(faviconLink);
    }
    faviconLink.setAttribute('href', '/favicon.ico');

    // Update Apple Touch Icon
    let appleTouchLink = document.querySelector('link[rel="apple-touch-icon"]');
    if (!appleTouchLink) {
      appleTouchLink = document.createElement('link');
      appleTouchLink.setAttribute('rel', 'apple-touch-icon');
      document.head.appendChild(appleTouchLink);
    }
    appleTouchLink.setAttribute('href', '/assets/logo-avatar.png');

    // Update JSON-LD Structured Data
    const schemaId = 'json-ld-localbusiness';
    let script = document.getElementById(schemaId);
    if (!script) {
      script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": `${originUrl}/#localbusiness`,
          "name": seoRoute ? `何でも屋 青ねこ (${seoRoute.city_name})` : "何でも屋 青ねこ",
          "alternateName": ["青ねこ", "何でも屋青ねこ", "便利屋 青ねこ"],
          "description": desc,
          "telephone": "0120-502-622",
          "url": currentUrl,
          "logo": logoUrl,
          "image": logoUrl,
          "priceRange": "￥7,000 - ￥50,000",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "JP",
            "addressRegion": seoRoute ? seoRoute.prefecture : "愛知県",
            "addressLocality": seoRoute ? seoRoute.city_name : "蟹江町"
          },
          "areaServed": [
            { "@type": "AdministrativeArea", "name": "愛知県" },
            { "@type": "AdministrativeArea", "name": "名古屋市" },
            { "@type": "AdministrativeArea", "name": "蟹江町" },
            { "@type": "AdministrativeArea", "name": "岐阜県" },
            { "@type": "AdministrativeArea", "name": "三重県" },
            ...(seoRoute ? [{ "@type": "Place", "name": seoRoute.city_name }] : [])
          ],
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          }
        },
        {
          "@type": "FAQPage",
          "@id": `${originUrl}/#faq`,
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          }))
        }
      ]
    };

    script.textContent = JSON.stringify(schemaData, null, 2);

  }, [faqs, seoRoute]);

  return null;
}
