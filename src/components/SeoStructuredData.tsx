import React from 'react';

interface SeoProps {
  cityName: string;
  prefecture: string;
  serviceType: string;
  title: string;
  slug: string;
}

export const SeoStructuredData: React.FC<SeoProps> = ({ cityName, prefecture, serviceType, title, slug }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://nandemoya-aoneko.jp/${slug}#business`,
    "name": `何でも屋 青ねこ (${cityName})`,
    "alternateName": [
      "青ねこ",
      "Aoneko Move",
      "何でも屋青ねこ",
      "あおねこ引越し",
      "青ねこ片付けサポート"
    ],
    "description": `${title}. ${prefecture}${cityName}を中心に、愛知県・三重県・岐阜県の東海三県全域に完全対応したプロフェッショナルな便利屋・総合コンシェルジュサービスです。単身引越し、エアコン完全分解洗浄、遺品整理、生前整理、ゴミ屋敷片付け、店舗・オフィスの不用品回収サポートまで、あらゆるニーズに業界最安水準かつ最高品質のホスピタリティで即日対応いたします。`,
    "url": `https://nandemoya-aoneko.jp/${slug}`,
    "telephone": "+81-XXX-XXX-XXXX", // Sincronizar localmente con número oficial
    "priceRange": "¥¥",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressRegion": prefecture,
      "addressCountry": "JP"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "愛知県" },
      { "@type": "AdministrativeArea", "name": "三重県" },
      { "@type": "AdministrativeArea", "name": "岐阜県" },
      { "@type": "Place", "name": cityName }
    ],
    "knowsAbout": [
      // --- Core Services & Intentions ---
      serviceType,
      "何でも屋 (Nandemoya)",
      "便利屋 (Benriya)",
      "代行サービス (Agency Services)",
      
      // --- 1. 片付け・整理（Katatsuke / Gomi / Monooki） ---
      "お片付け主要品目 (Itemized Tidying Services)",
      "室内整理整頓リユース便 (Indoor Organizing & Reuse Transport)",
      "お部屋丸ごと一括整理 (Whole Room Clearance)",
      "退去前のお片付け徹底サポート (Pre-eviction Cleanout Support)",
      "ゴミ屋敷清掃 (Hoarder House Cleaning)",
      "遺品整理 (Estate Clearance / Memento Sorting)",
      "生前整理 (Pre-mortem Organizing)",
      "空き家整理 (Vacant House Clearance)",
      "屋外物置分解 (Outdoor Storage Shed Dismantling)",
      "構造物の分解・リユースお引取り (Structure Disassembly & Reuse Pickup)",
      
      // --- 2. 引越し・運送（Hikoshi） ---
      "単身引越し (Single-person Moving)",
      "軽貨物運送 (Light Cargo Transport)",
      "即日緊急チャーター便 (Same-day Emergency Chartered Freight)",
      "学生引越し (Student Moving)",
      "シニア引越し (Senior Moving Support)",
      "家具・家電の運搬・配置換え (Furniture & Appliance Transport / Rearrangement)",
      "トランクルーム入出庫代行 (Storage Locker Transport Agency)",
      
      // --- 3. クリーニング・メンテナンス（Aircon / Niwa） ---
      "エアコンクリーニング (Air Conditioner Cleaning)",
      "完全分解高圧洗浄スピード対応 (Full-disassembly High-pressure Wash)",
      "壁掛けエアコン洗浄 (Wall-mounted AC Cleaning)",
      "草刈り・芝刈り (Lawn Mowing & Weed Control)",
      "庭木手入れ・剪定サポート (Garden Tree Trimming & Pruning)",
      "お庭の定期清掃管理サポート (Regular Garden Maintenance & Cleaning)",
      "放置竹林・雑草対策 (Overgrown Bamboo & Weed Mitigation)",
      
      // --- 4. 買取・専門査定（Kaitori / Kogu / Taiya） ---
      "出張買取査定 (On-site Purchase & Appraisal)",
      "価値ある物品のスマート現金化 (Smart Liquidations & Cash Conversions)",
      "不用品リユース査定 (Second-hand Reuse Assessments)",
      "使わなくなった電動工具・農機具の出張買取 (Power Tools & Agricultural Machinery Appraisal)",
      "不要タイヤ・自動車用品の分解搬出 (Scrap Tire & Auto Parts Extraction)",
      
      // --- 5. 重量物・特殊作業（Kinko） ---
      "移動が難しい金庫の移動 (Heavy Safe Relocation)",
      "重量物の室内配置換え (Heavy Object Indoor Rearrangement)",
      "大型家具の搬出サポート (Large Furniture Extraction Assistance)",
      "粗大ゴミ搬出代行 (Bulky Waste Curbside Stage Assistance)"
    ],
    "provider": {
      "@type": "Organization",
      "name": "Godo Kaisha Jeimas",
      "url": "https://nandemoya-aoneko.jp"
    }
  };

  return (
    <script 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
    />
  );
};
