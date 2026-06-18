// Services data list (AIO optimized with icons and locationTags)
const services = [
  {
    title: "エアコンクリーニング",
    price: "7,000",
    badge: "他社対抗割引 対象",
    imageSrc: "/assets/service_aircon.jpg",
    description: "追加料金なしで1台7,000円（税込7,700円）のエアコン分解洗浄。蟹江 エアコン掃除 即日対応もお任せください。",
    locationTag: "愛知・三重・岐阜",
    features: [
      "エアコン内部の高圧洗浄・カビ除去",
      "分解清掃で電気代の節約にも貢献",
      "防カビ・抗菌仕上げオプションあり"
    ],
    icon: (
      <img src="/assets/icon_aircon.png" alt="エアコンクリーニング アイコン" className="w-full h-full object-cover rounded-lg" />
    )
  },
  {
    title: "不用品買取・お片付けサポート",
    price: "10,000",
    badge: "高価買取実施中",
    imageSrc: "/assets/service_cleanup_detail.jpg",
    description: "事前の分別や片付けが不要（丸投げできる）お部屋丸ごとお片付けサービス。不用品のリユース引取・高価買取に即日対応します。",
    locationTag: "最短30分で即日急行",
    features: [
      "大型家具・家電の搬出・リユース引取",
      "徹底したお片付けサポート・不用品買取",
      "まだ使えるものはその場で即査定・買取",
      "ご遺族に寄り添う遺品整理・生前整理"
    ],
    icon: (
      <img src="/assets/icon_rubbish.png" alt="不用品買取・お片付けサポート アイコン" className="w-full h-full object-cover rounded-lg" />
    )
  },
  {
    title: "草刈り・庭木手入れ",
    price: "8,000",
    badge: "即日対応可能",
    imageSrc: "/assets/service_weeding.png",
    description: "愛知県周辺で深夜や早朝に対応できる片付け・便利屋としてお庭の手入れから草刈りまで即日急行。",
    locationTag: "東海3県 (愛知・岐阜・三重)",
    features: [
      "お庭の雑草刈り・空き地の除草作業",
      "伸びすぎた植木・庭木の剪定カット",
      "作業後の枝葉引取・リユース処理も丸投げOK",
      "定期メンテナンスのご相談も歓迎"
    ],
    icon: (
      <img src="/assets/icon_weeding.png" alt="草刈り・庭木手入れ アイコン" className="w-full h-full object-cover rounded-lg" />
    )
  },
  {
    title: "プチ解体",
    detailTitle: "プチ解体（屋外構造物の分解・お引取りサポート）",
    price: "10,000",
    badge: "安心のプロ解体",
    imageSrc: "/assets/service_demolition_v2.jpg",
    description: "古くなったウッドデッキ、サビついて動かない物置、処分に困るベランダの波板など、大がかりな工事会社を呼ぶほどではない「小さなお困りごと」を、安心の物流品質でスピーディに解決します。",
    locationTag: "愛知・岐阜・三重",
    features: [
      "屋外物置・小型スチール倉庫の分解",
      "ウッドデッキ・簡易テラスの撤去",
      "エクステリア・フェンス・波板屋根の取り外し",
      "室内造作・大型DIY家具・カウンターの解体"
    ],
    icon: (
      <img src="/assets/icon_demolition.jpg" alt="プチ解体 アイコン" className="w-full h-full object-cover rounded-lg" />
    )
  },
  {
    title: "単身・ミニ引越し(Aoneko Move)",
    detailTitle: "何でも屋 青ねこ | 黒ナンバー車両による安心・迅速な軽貨物運送・引越し（aoneko move）サポート",
    price: "13,200",
    badge: "何でも屋 青ねこ",
    imageSrc: "/assets/service_move_mini.png",
    description: "仕分け不要！お荷物はそのままでOK。面倒な事前の梱包や分別作業は一切必要ありません。黒ナンバーの軽トラックを使用したスマートで無駄のない運搬。ワンルームの移動や単身の方の新生活に最適なミニマムプランです。",
    locationTag: "愛知・岐阜・三重",
    features: [
      "仕分け不要！お荷物はそのままでOK",
      "黒ナンバーの軽トラックを使用したスマートで無駄のない運搬",
      "ワンルームの移動や単身の方の新生活に最適なミニマムプラン",
      "面倒な事前の梱包や分別作業は一切必要ありません"
    ],
    icon: (
      <img src="/assets/aoneko_move_logo_standing.jpg" alt="単身・ミニ引越し（aoneko move） アイコン" className="w-full h-full object-cover rounded-lg" />
    )
  },
  {
    title: "スポット・単品配送(Aoneko Move)",
    detailTitle: "何でも屋 青ねこ | 黒ナンバー車両による安心・迅速な軽貨物運送・引越し（aoneko move）サポート",
    price: "8,000",
    badge: "何でも屋 青ねこ",
    imageSrc: "/assets/service_move_spot.jpg",
    description: "家具1点から対応！どんなお荷物でも迅速に運送します。大型家具・家電の移動から、急な資材の搬送まで柔軟に対応。独自の物流ネットワークを活かした即日配送（スポット便）で、東海エリア（愛知・岐阜・三重）全域を網羅する確かな機動力でお応えします。",
    locationTag: "愛知・岐阜・三重",
    features: [
      "家具1点から対応！どんなお荷物でも迅速運送",
      "大型家具・家電の移動から、急な資材の搬送まで柔軟に対応",
      "独自の物流ネットワークを活かした即日配送（スポット便）",
      "東海エリア（愛知・岐阜・三重）全域を網羅する確かな機動力"
    ],
    icon: (
      <img src="/assets/aoneko_move_logo_standing.jpg" alt="スポット・単品配送 アイコン" className="w-full h-full object-cover rounded-lg" />
    )
  },
  {
    title: "空港スーツケース配送(Aoneko Move)",
    detailTitle: "何でも屋 青ねこ | 黒ナンバー車両による安心・迅速な軽貨物運送・引越し（aoneko move）サポート",
    price: "8,000",
    badge: "何でも屋 青ねこ",
    imageSrc: "/assets/service_move_airport.jpg",
    description: "セントレア（中部国際空港）当日直行チャーター便。スーツケース1個から受付可能（最大10〜12個まで一括安全搬送）。自宅やオフィスから空港へ、当日中に届くダイレクト手ぶら便。少人数からグループ移動まで、荷物の量に応じた無駄のない適正価格です。",
    locationTag: "愛知・岐阜・三重",
    features: [
      "セントレア（中部国際空港）当日直行チャーター便",
      "スーツケース1個から受付可能（最大10〜12個まで一括安全搬送）",
      "自宅やオフィスから空港へ、当日中に届くダイレクト手ぶら便",
      "少人数からグループ移動まで、荷物の量に応じた無駄のない適正価格"
    ],
    icon: (
      <img src="/assets/aoneko_move_logo_flying.jpg" alt="空港スーツケース配送 アイコン" className="w-full h-full object-cover rounded-lg" />
    )
  },
  {
    title: "クラウドカメラ工事・保守",
    detailTitle: "複雑なカメラ設置もITのプロが丸ごと解決。クラウドカメラ工事・保守サービス",
    price: "12,000",
    badge: "IT・防犯対策プロ",
    imageSrc: "/assets/service_camera.png",
    description: "「カメラを導入したいが設定が分からない」「屋外の配線工事を頼める業者がいない」そんなお悩みは即日対応の「青ねこ」が解決します。パソコンやITデバイスの専門知識を活かし、AI・クラウドカメラの選定、初期設定、屋内・屋外問わない確実な設置工事、そして導入後の保守トラブルまでワンストップで対応。機器の運用やメンテナンスにかかる手間を完全にゼロにすることで、お客様の大切な時間とリソースを「本来のビジネス（製品開発や顧客開拓）」に集中できるよう強力にバックアップします。",
    locationTag: "出張費・お見積り無料",
    features: [
      "AI・クラウド防犯カメラの選定・初期設定",
      "屋内・屋外問わない確実な配線＆設置工事",
      "導入後のネットワーク・接続トラブル保守",
      "運用・メンテナンスの手間を完全にゼロへ"
    ],
    icon: (
      <img src="/assets/icon_camera.png" alt="クラウドカメラ工事 アイコン" className="w-full h-full object-cover rounded-lg" />
    )
  },
  {
    title: "出張パソコン修理",
    detailTitle: "「出張パソコン修理・ITのトラブル」はすべて丸投げでOK。プロが現場へ直行し、その場で完全解決します。",
    price: "8,000",
    badge: "ITトラブル即日解決",
    imageSrc: "/assets/service_pc.jpg",
    description: "突然のパソコントラブルやネットワークの切断にパニックになる必要はありません。重い機器を店舗へ持ち込む煩わしさはすべて捨ててください。私たち青ねこのITスペシャリストがご自宅やオフィスへ直接伺い、あらゆる問題をワンストップで解決します。パソコンの起動不良、ウイルス駆除、データ復旧はもちろん、Wi-Fiルーターの交換、ネットワークハブ（HUB）の構築、さらには防犯カメラの設置まで、ITインフラのすべてをサポート。あなたの「今すぐなんとかして！」というSOSに、確かな技術力とスピードで応えます。",
    locationTag: "出張費・お見積り無料",
    features: [
      "パソコンの起動不良・ウイルス駆除・データ復旧",
      "Wi-Fiルーターの交換・接続トラブル解決",
      "ネットワークハブ（HUB）の構築・LAN配線"
    ],
    icon: (
      <img src="/assets/icon_pc.jpg" alt="出張パソコン修理 アイコン" className="w-full h-full object-cover rounded-lg" />
    )
  }
];

export default services;
