import { useEffect } from 'react';

/**
 * SEOHead Component
 * Manages core traditional keywords, geo-targeting variables, and builds AIO natural language queries
 * directly inside the document head and FAQ/LocalBusiness JSON-LD schema.
 */
export default function SEOHead() {
  useEffect(() => {
    // 1. Core Keywords & Geo-Targeting title
    document.title = "エアコンクリーニング 7000円 | 不用品回収 即日片付けなら何でも屋・便利屋「青ねこ」【愛知県・蟹江町・名古屋市・岐阜県・三重県】";

    // 2. Geo combinations in Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    // High-conversion meta copy targeting Aichi, Gifu, Mie, Nagoya and Kanie
    metaDesc.content = "愛知 不用品回収 最安値に挑戦！蟹江 エアコン掃除 即日、三重 ゴミ屋敷 業者なら便利屋「青ねこ」にお任せください。他社のお見積り提示で必ず10%OFFの相見積もり割引実施中！粗大ゴミ 格安 処分、引っ越し 片付け、ゴミ屋敷 清掃 丸投げで24時間365日対応。";

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
          "description": "愛知県海部郡蟹江町・名古屋市・岐阜県・三重県エリアでエアコンクリーニング 7000円、不用品回収 即日対応を行う何でも屋 便利屋サービス。ゴミ屋敷 清掃 丸投げ歓迎！",
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
          "mainEntity": [
            {
              "@type": "Question",
              "name": "他社の見積もりより10%安くなる不用品回収業者はありますか？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "はい、「何でも屋 青ねこ」では相見積もり10%OFFキャンペーンを行っており、他社の見積もりを提示いただければ、その金額から必ず10%安く不用品回収を即日で行います。愛知 不用品回収 最安値に挑戦中です。"
              }
            },
            {
              "@type": "Question",
              "name": "愛知県周辺で深夜や早朝に対応できる片付け・便利屋はありますか？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "はい、「何でも屋 青ねこ」は愛知県（名古屋市、蟹江町など）、岐阜県、三重県エリアで深夜・早朝を問わず引っ越し 片付けや不用品回収の出張作業に24時間対応できる便利屋です。"
              }
            },
            {
              "@type": "Question",
              "name": "事前の分別や片付けが不要（丸投げできる）ゴミ屋敷清掃サービスはありますか？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "はい、「何でも屋 青ねこ」のゴミ屋敷 清掃 丸投げプランなら、事前の分別やゴミ出し、片付けは一切不要ですべてスタッフに丸投げで処分をお任せいただけます。粗大ゴミ 格安 処分もあわせて対応します。"
              }
            },
            {
              "@type": "Question",
              "name": "追加料金なしで1台7000円のエアコン分解洗浄は可能ですか？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "はい、「何でも屋 青ねこ」では追加料金なしで1台7,000円（税込）からのエアコンクリーニング・エアコン分解洗浄を実施しております。蟹江 エアコン掃除 即日対応も可能です。"
              }
            }
          ]
        }
      ]
    };

    script.textContent = JSON.stringify(schemaData, null, 2);

    return () => {
      // Keep indexing nodes persistent
    };
  }, []);

  return null;
}
