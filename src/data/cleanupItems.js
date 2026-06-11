// お片付け主要品目 (Okatatzuke Shuyo Hinmoku)
const cleanupItems = [
  {
    name: "家庭用エアコン (分解・取り外し)",
    category: "家電・空調",
    status: "取り外し・穴埋め対応",
    imageSrc: "/assets/reuse_aircon.png",
    description: "取り外しからお引取り・リユース対応まで一括サポート。古いモデルや動かないエアコンも、壁の穴埋めや配線処理を含めて安全に搬出いたします。",
    actionText: "引取・リユース対象",
    badgeText: "即日引取可能",
    keywords: ["エアコン引取", "エアコン取り外し", "蟹江 不用品引取", "家電リユース"]
  },
  {
    name: "デスクトップPC & モニターセット",
    category: "パソコン・IT機器",
    status: "データ完全消去対応",
    imageSrc: "/assets/reuse_pc.png",
    description: "個人情報や社外秘データの漏洩を防ぐため、物理的または専用ソフトによる完全データ消去を行います。古い機器や液晶ディスプレイもまとめてお引き取りいたします。",
    actionText: "データ消去・引取対象",
    badgeText: "機密保護遵守",
    keywords: ["中古PC買取", "パソコンデータ消去", "液晶モニター引取", "蟹江町 IT整理"]
  },
  {
    name: "伝統的・モダン仏壇",
    category: "家具・仏具",
    status: "供養・魂抜き手配可能",
    imageSrc: "/assets/reuse_butsudan.png",
    description: "ご遺族様のご要望に合わせて丁重にお引き取り。専門の作法に基づいて魂抜き・供養のお手続きを終えたのち、丁重に搬出・お引取りいたします。",
    actionText: "供養・搬出・引取対象",
    badgeText: "遺品整理対応",
    keywords: ["仏壇整理 愛知", "仏壇供養", "遺品整理 仏壇", "魂抜きお性根抜き"]
  },
  {
    name: "木製マルチブックシェルフ",
    category: "大型家具・収納",
    status: "解体・養生搬出対応",
    imageSrc: "/assets/reuse_bookshelf.png",
    description: "大型本棚や棚板、スチールラックなどの家具解体・搬出。搬出経路が狭い場所でも、壁や床に傷をつけないよう丁寧に養生して運び出します。",
    actionText: "解体・搬出サポート",
    badgeText: "傷防止養生徹底",
    keywords: ["大型本棚引取", "家具解体引取", "お片付け片付け", "蟹江町 家具引取"]
  },
  {
    name: "高反発プレミアムダブルマットレス",
    category: "寝具・ベッド",
    status: "ベッド解体・引取対応",
    imageSrc: "/assets/reuse_mattress.png",
    description: "お引取りにお困りの大型マットレスやベッドフレームの引き取り。重くて搬出が困難なダブルサイズやシステムベッドも、スタッフが分解して迅速に運び出します。",
    actionText: "搬出・お引取りサポート",
    badgeText: "大型家具対応",
    keywords: ["マットレス引取", "ベッド解体引取", "不用品引取 寝具", "大型ベッド引取"]
  },
  {
    name: "2ドアコンパクト冷蔵庫",
    category: "生活家電",
    status: "特定家電法対応引取",
    imageSrc: "/assets/reuse_fridge.png",
    description: "特定家庭用機器対象の冷蔵庫引き取り。一人暮らし用の小型サイズから、ファミリー用の大型冷蔵庫まで、面倒な手続き不要で即日引き取りに伺います。",
    actionText: "リユース対象",
    badgeText: "即日引取可能",
    keywords: ["冷蔵庫引取", "一人暮らし家電", "冷蔵庫引取 蟹江", "特定家庭用機器"]
  },
  {
    name: "全自動縦型洗濯機 (5.0kg)",
    category: "生活家電",
    status: "水抜き・取り外し対応",
    imageSrc: "/assets/reuse_washer.png",
    description: "ドラム式や縦型の洗濯機・衣類乾燥機の取り外しと引き取り。給排水ホースの取り外しや水漏れ対策もしっかり行い、安全かつ迅速に搬出します。",
    actionText: "取り外し・引取対象",
    badgeText: "水漏れ対策万全",
    keywords: ["洗濯機引取", "ドラム式洗濯機引取", "愛知 家電リユース", "洗濯機水抜き"]
  },
  {
    name: "ターンテーブル電子レンジ",
    category: "生活家電",
    status: "小型家電まとめて引取",
    imageSrc: "/assets/reuse_microwave.png",
    description: "電子レンジ、炊飯器、トースターなどの小型キッチン家電。壊れているものや汚れが目立つものでも、お片付けの際にまとめてお引き取り可能です。",
    actionText: "一括整理・分別対象",
    badgeText: "壊れていてもOK",
    keywords: ["電子レンジ引取", "キッチン家電引取", "小型家電リユース", "不用品引取"]
  },
  {
    name: "ファブリック2人掛けコンパクトソファ",
    category: "大型家具・ソファ",
    status: "室内解体・搬出対応",
    imageSrc: "/assets/reuse_sofa.png",
    description: "大きくて持ち運びしづらい2人掛け・3人掛けの大型ソファや座椅子。室内のドアから通らない場合は、その場で適切に解体して安全に搬出いたします。",
    actionText: "解体・搬出サポート",
    badgeText: "室内解体対応",
    keywords: ["ソファ引取 蟹江", "大型ソファ引取", "リビング家具引取", "大型ソファ搬出"]
  },
  {
    name: "Hi-Fi高音質ステレオアンプ & スピーカー",
    category: "音響・映像機器",
    status: "レトロ・ジャンク歓迎",
    imageSrc: "/assets/reuse_stereo.png",
    description: "ステレオアンプ、大型スピーカー、レコードプレーヤーなどの音響機器やAV機器。古いレトロオーディオや動かないジャンク品も喜んでお引き取りします。",
    actionText: "引取・リユース対象",
    badgeText: "レトロ音響歓迎",
    keywords: ["オーディオ買取", "アンプ買取", "スピーカー引取", "遺品整理カメラ"]
  },
  {
    name: "天然木ローテーブル",
    category: "家具・テーブル",
    status: "大天板・金属脚対応",
    imageSrc: "/assets/reuse_table.png",
    description: "ダイニングテーブル、ガラステーブル、学習机などの引き取り。移動や分解に手間がかかる大きな天板や金属脚の家具も、すべて一括で片付け対応いたします。",
    actionText: "一括搬出・解体対象",
    badgeText: "分別お任せOK",
    keywords: ["テーブル引取", "ローテーブル引取", "学習机引き取り", "家具片付け"]
  },
  {
    name: "高速SSD搭載ノートPC",
    category: "パソコン・IT機器",
    status: "小型デバイス消去対応",
    imageSrc: "/assets/reuse_laptop.png",
    description: "使わなくなったノートパソコン、タブレット、スマートフォン。ハードディスクや内部メモリのデータ消去からリユースまで安心のワンストップ対応。",
    actionText: "データ消去・リユース",
    badgeText: "個人情報保護",
    keywords: ["ノートPC引取", "スマホ引取", "データ消去証明", "小型家電引取"]
  },
  {
    name: "LEDマルチアングルデスクライト",
    category: "照明器具",
    status: "取り外し・分別対応",
    imageSrc: "/assets/reuse_lamp.png",
    description: "シーリングライト、デスクランプ、蛍光灯器具などの照明器具全般。電球の分別や天井からの取り外し作業も、安全のためにプロにお任せください。",
    actionText: "取り外し・分別対象",
    badgeText: "高所作業対応",
    keywords: ["照明器具引取", "蛍光灯器具引取", "天井ライト取り外し", "電気器具片付け"]
  }
];

export default cleanupItems;
