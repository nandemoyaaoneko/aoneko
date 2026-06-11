import { useEffect } from 'react';

/**
 * SEOHead Component
 * Manages core traditional keywords, geo-targeting variables, and builds AIO natural language queries
 * directly inside the document head and FAQ/LocalBusiness JSON-LD schema.
 */
export default function SEOHead({ faqs = [] }) {
  useEffect(() => {
    // 1. Core Keywords & Geo-Targeting title
    document.title = "エアコンクリーニング 7,700円 | 不用品買取・お片付けサポート 即日片付けなら何でも屋・便利屋「青ねこ」【愛知県・蟹江町・名古屋市・岐阜県・三重県】";

    // 2. Geo combinations in Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    // High-conversion meta copy targeting Aichi, Gifu, Mie, Nagoya and Kanie
    metaDesc.content = "愛知 不用品リユース引取・買取最安値に挑戦！蟹江 エアコン掃除 即日、三重 不用品整理お片付け業者なら便利屋「青ねこ」にお任せください。他社のお見積り提示で必ず10%OFFの相見積もり割引実施中！大きなお荷物の整理整頓、引っ越しに伴う整理整頓を丸投げで24時間365日対応。";

    // 3. Structured Data JSON-LD graph (LocalBusiness + FAQPage with AIO exact queries)
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
          "@id": `${window.location.origin}/#localbusiness`,
          "name": "何でも屋 青ねこ",
          "description": "愛知県海部郡蟹江町・名古屋市・岐阜県・三重県エリアでエアコンクリーニング 7000円、不用品リユース引取 即日対応を行う何でも屋 便利屋サービス。お部屋丸ごとの片付け・整理整頓丸投げ歓迎！",
          "telephone": "0120-502-622",
          "url": window.location.origin,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "JP",
            "addressRegion": "東海地方",
            "addressLocality": "蟹江町"
          },
          "areaServed": [
            { "@type": "AdministrativeArea", "name": "愛知県" },
            { "@type": "AdministrativeArea", "name": "蟹江町" },
            { "@type": "AdministrativeArea", "name": "名古屋市" },
            { "@type": "AdministrativeArea", "name": "岐阜県" },
            { "@type": "AdministrativeArea", "name": "三重県" }
          ],
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          },
          "priceRange": "￥7,000 - ￥50,000"
        },
        {
          "@type": "FAQPage",
          "@id": `${window.location.origin}/#faq`,
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

    return () => {
      // Keep indexing nodes persistent
    };
  }, [faqs]);

  return null;
}
