import { useState, useEffect, useRef } from 'react';
import SEOHead from './components/SEOHead';
import HeroSection from './components/HeroSection';
import ServiceCard from './components/ServiceCard';
import TrustShield from './components/TrustShield';
import StickyCTA from './components/StickyCTA';
import FloatingLineButton from './components/FloatingLineButton';
import ScrollToTopButton from './components/ScrollToTopButton';

export default function App() {
  const WEB3FORMS_ACCESS_KEY = "1eac69c5-f18d-4203-912a-6f4ae0752065";

  // First FAQ accordion item is expanded by default (index 0)
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Web3Forms Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    botcheck: false
  });
  const [formStatus, setFormStatus] = useState(null); // null | 'submitting' | 'success' | 'error'

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Client-side honeypot validation
    if (formData.botcheck) {
      console.warn("Spam detected via honeypot.");
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', botcheck: false });
      return;
    }

    setFormStatus('submitting');

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "【何でも屋 青ねこ】Webサイトからのお問い合わせ",
      from_name: "青ねこ Webサイト",
      ...formData
    };
    delete payload.botcheck;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '', botcheck: false });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error("Web3Forms submit error:", error);
      setFormStatus('error');
    }
  };

  const logoRef = useRef(null);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      if (logoRef.current) {
        // Clear any existing scroll-stop timeout
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // Disable transition while scrolling so the rotation follows scroll immediately
        logoRef.current.style.transition = 'none';

        const rotation = window.scrollY * 0.25;
        logoRef.current.style.transform = `rotate(${rotation}deg)`;

        // Set a timeout to detect when the user stops scrolling
        timeoutId = setTimeout(() => {
          if (logoRef.current) {
            // Find the nearest multiple of 360 degrees so the kitty faces straight up
            const nearest360 = Math.round(rotation / 360) * 360;
            // Use a smooth overshoot cubic-bezier to make the rotation alignment feel premium and alive
            logoRef.current.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            logoRef.current.style.transform = `rotate(${nearest360}deg)`;
          }
        }, 150); // 150ms threshold for scroll stop detection
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

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
      imageSrc: "/assets/service_rubbish.png",
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
      title: "単身・ミニ引越し",
      detailTitle: "Aoneko Move | 黒ナンバー車両による安心・迅速な軽貨物運送・引越しサポート",
      price: "13,200",
      badge: "Aoneko Move",
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
        <img src="/assets/aoneko_move_logo_standing.jpg" alt="単身・ミニ引越し アイコン" className="w-full h-full object-cover rounded-lg" />
      )
    },
    {
      title: "スポット・単品配送",
      detailTitle: "Aoneko Move | 黒ナンバー車両による安心・迅速な軽貨物運送・引越しサポート",
      price: "8,000",
      badge: "Aoneko Move",
      imageSrc: "/assets/service_move_spot.png",
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
      title: "空港スーツケース配送",
      detailTitle: "Aoneko Move | 黒ナンバー車両による安心・迅速な軽貨物運送・引越しサポート",
      price: "8,000",
      badge: "Aoneko Move",
      imageSrc: "/assets/service_move_airport.png",
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

  // Steps data list with premium Gold (#D4AF37) details
  const steps = [
    {
      num: "01",
      title: "お問い合わせ",
      desc: "お電話またはWebよりご相談ください。24時間体制で受け付けております。",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#0C74B3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      )
    },
    {
      num: "02",
      title: "無料お見積り",
      desc: "現地にて丁寧に査定いたします。その場で金額をご提示し、キャンセルも無料です。",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#0C74B3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
    {
      num: "03",
      title: "作業実施",
      desc: "プロの技術で迅速に作業を行います。",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#0C74B3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      )
    },
    {
      num: "04",
      title: "お支払い",
      desc: "作業内容をご確認いただき、問題がなければお支払いにて完了となります。",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#0C74B3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      )
    }
  ];

  // FAQs data list
  const faqs = [
    {
      q: "他社の見積もりより10%安くなる不用品買取・お片付け業者はありますか？",
      a: "はい、「何でも屋 青ねこ」では相見積もり10%OFFキャンペーンを行っており、他社の見積もりを提示いただければ、その金額から必ず10%安く不用品買取・お片付けを即日で行います。愛知 不用品買取・お片付け最安値に挑戦中です。"
    },
    {
      q: "お見積り後に断っても大丈夫ですか？",
      a: "はい、もちろんです。お見積りは完全無料で行っております。金額や内容にご納得いただけない場合は、その場でお断りいただいても出張料や査定料などは一切発生いたしません。"
    },
    {
      q: "愛知県周辺で深夜や早朝に対応できる片付け・便利屋はありますか？",
      a: "はい、「何でも屋 青ねこ」は愛知県（名古屋市、蟹江町など）、岐阜県、三重県エリアで深夜・早朝を問わず引っ越し 片付けや不用品回収の出張作業に24時間対応できる便利屋です。お客様のライフスタイルやご都合に合わせて柔軟に作業スケジュールを調整いたします。"
    },
    {
      q: "事前の分別や片付けが不要（丸投げできる）お部屋の片付けサポートサービスはありますか？",
      a: "はい、「何でも屋 青ねこ」のお部屋お片付け丸投げプランなら、事前の分別や整理、片付けは一切不要ですべてスタッフに丸投げでお任せいただけます。大きなお荷物や不用品のリユース引取・買取もあわせて対応します。"
    },
    {
      q: "追加料金なしで1台7,000円のエアコン分解洗浄は可能ですか？",
      a: "はい、「何でも屋 青ねこ」では追加料金なしで1台7,000円（税別、税込7,700円）からのエアコンクリーニング・エアコン分解洗浄を実施しております。蟹江 エアコン掃除 即日対応も可能です。"
    },
    {
      q: "どんな物でも引き取りや買取が可能ですか？",
      a: `家電製品、家具、生活雑貨、趣味の品、工具など幅広く買取・リユース引取を行っております。

※真贋査定を要するハイブランド品（高級バッグ・時計・財布など）の「買取」は、トラブル防止のため原則として行っておりません。ただし、お部屋のお片付けに伴う「リユース引取」としてはお引き受け可能ですのでご相談ください。

状態や法令によって引き取りが難しい場合もございますが、最善のお片付け・リユース方法をご提案いたします。`
    }
  ];

  const securityPoints = [
    {
      title: "防犯カメラとネットワーク保護",
      description: "セキュアな通信設定から不正アクセス対策まで、強固なインフラを構築。",
      icon: (
        <svg className="w-5 h-5 text-sky-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      )
    },
    {
      title: "法人・個人データ管理",
      description: "国のガイドラインに準拠した厳格な情報保護プロセス。",
      icon: (
        <svg className="w-5 h-5 text-sky-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75m-16.5-3.75v3.75" />
        </svg>
      )
    },
    {
      title: "ITセキュリティ監査",
      description: "「SECURITY ACTION」一つ星宣言企業としての内部統制。",
      icon: (
        <svg className="w-5 h-5 text-sky-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0110 21a3.745 3.745 0 01-3.068-1.593 3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0114 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      )
    }
  ];

  const compliancePoints = [
    {
      title: "法令遵守の徹底",
      description: "出張買取における適正かつ合法的なプロセスを厳守。",
      icon: (
        <svg className="w-5 h-5 text-sky-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5H5.25V21h13.5z" />
        </svg>
      )
    },
    {
      title: "透明性の高い取引",
      description: "パソコンやスマートフォンの誠実な査定と明確な買取手順。",
      icon: (
        <svg className="w-5 h-5 text-sky-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      )
    },
    {
      title: "安全なデバイス管理",
      description: "回収後の確実なデータ消去と端末の安全な取り扱い。",
      icon: (
        <svg className="w-5 h-5 text-sky-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-700 antialiased font-sans">
      <SEOHead faqs={faqs} />

      {/* Header (Top) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sky-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          {/* Logo brand (Left) */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-sky-100 shadow-sm flex items-center justify-center shrink-0">
              <img 
                ref={logoRef}
                src="/assets/logo.jpg" 
                alt="何でも屋 青ねこ ロゴ" 
                className="w-full h-full object-cover will-change-transform" 
              />
            </div>
            <div>
              <span className="text-sm sm:text-lg md:text-xl font-black text-jeimas-blue-dark tracking-tight block">何でも屋 青ねこ</span>
            </div>
          </div>

          {/* Navigation Links (Center) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-black text-xs sm:text-sm tracking-wide text-jeimas-blue-dark">
            <a href="#" className="hover:text-[#0C74B3] transition-colors duration-200">
              ホーム
            </a>
            <a href="#services" className="hover:text-[#0C74B3] transition-colors duration-200">
              サービス一覧
            </a>
            <a href="#process" className="hover:text-[#0C74B3] transition-colors duration-200">
              ご依頼の流れ
            </a>
            <a href="#contact" className="hover:text-[#0C74B3] transition-colors duration-200">
              お問い合わせ
            </a>
          </nav>

          {/* Quick contact (Right) */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:block text-right">
              <span className="text-xs text-jeimas-blue-dark font-extrabold">
                24時間受付中 お見積り無料！
              </span>
            </div>

            {/* CTA Call button in Aoneko Red (Desktop/Tablet) */}
            <a 
              href="tel:0120-502-622" 
              className="shine-button hidden md:flex items-center gap-2 bg-gradient-to-r from-aoneko-pink to-[#E0006C] text-white font-extrabold py-3 px-5 sm:px-6 rounded-[2.5rem] border border-white/10 shadow-[0_4px_12px_-3px_rgba(255,0,127,0.45)] transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white shrink-0 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-base sm:text-lg lg:text-xl font-black tracking-tight">0120-502-622</span>
            </a>

            {/* Compact Call button in Aoneko Red (Mobile only) */}
            <a 
              href="tel:0120-502-622" 
              className="shine-button md:hidden flex items-center gap-1.5 bg-gradient-to-r from-aoneko-pink to-[#E0006C] text-white font-extrabold py-2 px-3 sm:px-3.5 rounded-[2.5rem] border border-white/10 shadow-[0_4px_12px_-3px_rgba(255,0,127,0.45)] transition-all duration-300 shrink-0"
              aria-label="フリーダイヤルで電話をかける"
            >
              <svg className="w-4 h-4 text-white animate-bounce shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-[10px] sm:text-xs font-black tracking-tight leading-none">フリーダイヤル</span>
            </a>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-full border border-sky-100 bg-[#F3F9FD] text-[#0C74B3] hover:bg-sky-50 transition-colors focus:outline-none cursor-pointer shrink-0"
              aria-label="メニューを開く"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-sky-100/50 shadow-lg py-4 px-6 absolute top-20 left-0 right-0 z-30 transition-all duration-300 ease-in-out">
            <nav className="flex flex-col gap-4 font-black text-sm tracking-wide text-jeimas-blue-dark">
              <a 
                href="#" 
                onClick={() => setIsMenuOpen(false)} 
                className="hover:text-[#0C74B3] py-2 border-b border-sky-50/50 transition-colors duration-200"
              >
                ホーム
              </a>
              <a 
                href="#services" 
                onClick={() => setIsMenuOpen(false)} 
                className="hover:text-[#0C74B3] py-2 border-b border-sky-50/50 transition-colors duration-200"
              >
                サービス一覧
              </a>
              <a 
                href="#process" 
                onClick={() => setIsMenuOpen(false)} 
                className="hover:text-[#0C74B3] py-2 border-b border-sky-50/50 transition-colors duration-200"
              >
                ご依頼の流れ
              </a>
              <a 
                href="#faq" 
                onClick={() => setIsMenuOpen(false)} 
                className="hover:text-[#0C74B3] py-2 border-b border-sky-50/50 transition-colors duration-200"
              >
                よくある質問
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMenuOpen(false)} 
                className="hover:text-[#0C74B3] py-2 transition-colors duration-200"
              >
                お問い合わせ
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main semantic container */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Services Section ("サービス一覧") */}
        <section className="py-24 bg-[#EAF5FC]/40 relative overflow-hidden" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-jeimas-blue-dark tracking-[-0.02em]">
                サービス一覧
              </h2>
              <div className="h-1.5 w-16 bg-[#0C74B3] mx-auto mt-4 rounded-full" />
              <p className="text-sm sm:text-base text-slate-500 mt-4 font-bold">
                プロの技術で、あなたのご毎日をもっと快適に。
              </p>
            </div>

            {/* Desktop-only: Selector + Detail Interactive Panel */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Selector Column (Stacked Column on Desktop) */}
              <div className="flex lg:flex-col gap-3 lg:col-span-4">
                {services.map((svc, idx) => {
                  const isActive = activeServiceIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveServiceIdx(idx)}
                      onMouseEnter={() => setActiveServiceIdx(idx)}
                      className={`w-full text-left p-5 rounded-3xl border transition-all duration-300 flex items-center gap-4 group relative overflow-hidden cursor-pointer ${
                        isActive 
                          ? 'bg-white border-[#0C74B3] shadow-md shadow-sky-100/60' 
                          : 'bg-white/70 border-[#E0EEF6] hover:bg-white hover:border-[#0C74B3]/40 shadow-sm'
                      }`}
                    >

                      {/* Icon Container */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                        isActive 
                          ? 'bg-[#0C74B3] border-[#0C74B3] text-white' 
                          : 'bg-[#EAF5FC] border-sky-200/50 text-[#0C74B3] group-hover:bg-[#0C74B3] group-hover:border-[#0C74B3] group-hover:text-white'
                      }`}>
                        {svc.icon}
                      </div>
                      {/* Title & Badge */}
                      <div className="text-left">
                        <span className={`text-sm sm:text-base font-black block leading-none ${isActive ? 'text-[#0C74B3]' : 'text-slate-800'}`}>
                          {svc.title}
                        </span>
                        <span className="text-[9px] text-[#0C74B3] font-bold block mt-1 leading-none">
                          {svc.badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Detail Card Column */}
              <div className="lg:col-span-8 h-full">
                <ServiceCard 
                  index={activeServiceIdx}
                  title={services[activeServiceIdx].detailTitle || services[activeServiceIdx].title}
                  price={services[activeServiceIdx].price}
                  badge={services[activeServiceIdx].badge}
                  imageSrc={services[activeServiceIdx].imageSrc}
                  description={services[activeServiceIdx].description}
                  features={services[activeServiceIdx].features}
                  locationTag={services[activeServiceIdx].locationTag}
                  icon={services[activeServiceIdx].icon}
                />
              </div>

            </div>

            {/* Mobile/Tablet-only: Sequential vertical list of all 4 service cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:hidden">
              {services.map((svc, idx) => (
                <ServiceCard 
                  key={idx}
                  index={idx}
                  title={svc.detailTitle || svc.title}
                  price={svc.price}
                  badge={svc.badge}
                  imageSrc={svc.imageSrc}
                  description={svc.description}
                  features={svc.features}
                  locationTag={svc.locationTag}
                  icon={svc.icon}
                />
              ))}
            </div>

            {/* Payment Methods Info */}
            <div className="mt-20 pt-16 border-t border-[#E0EEF6] max-w-4xl mx-auto text-center space-y-8 relative z-10">
              <h3 className="text-xl sm:text-2xl font-black text-jeimas-blue-dark tracking-tight">
                各種クレジットカードやpay payでの決済も可能！
              </h3>
              
              <div className="relative max-w-md mx-auto rounded-[24px] overflow-hidden shadow-premium border border-[#E0EEF6] bg-white p-3 hover:scale-[1.01] transition-all duration-300">
                <img 
                  src="/assets/payment.jpg" 
                  alt="お支払い方法 - 各種クレジットカード・PayPay決済対応" 
                  className="w-full h-auto rounded-[16px]"
                />
              </div>

              <p className="text-sm sm:text-base text-slate-600 font-semibold leading-relaxed max-w-2xl mx-auto">
                お支払い方法は現金・クレジット・PayPay・振込に対応！<br className="hidden sm:inline" />
                簡単・便利にご利用いただけます。
              </p>
            </div>
          </div>
        </section>

        {/* Security Section (SECURITY ACTION) */}
        <section className="w-full bg-sky-50/30 py-20 px-4">
          <div className="max-w-7xl mx-auto bg-white/95 p-8 md:p-12 rounded-[2.5rem] border border-sky-100 shadow-xl backdrop-blur-sm">
            
            {/* Header Section */}
            <div className="text-center mb-16 border-b border-sky-100 pb-8">
              <p className="inline-block bg-sky-100/50 text-sky-800 text-sm font-bold px-4 py-1.5 rounded-full mb-4">情報セキュリティ対策</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-sky-950 mb-4">安心・安全への確かな取り組み</h2>
              <h3 className="text-xl md:text-2xl font-semibold text-sky-800 max-w-2xl mx-auto">
                経済産業省推進「SECURITY ACTION」一つ星宣言企業
              </h3>
            </div>

            {/* Grid Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              
              {/* Panel 1: IT & Data Security */}
              <div className="bg-sky-50/50 rounded-[2rem] p-8 flex flex-col items-center border border-sky-50">
                <div className="mb-8 w-full flex justify-center">
                  <div className="max-w-[140px] sm:max-w-[160px] hover:scale-[1.02] transition-transform duration-300">
                    <img 
                      src="/assets/security_action.png" 
                      alt="経済産業省推進 SECURITY ACTION 一つ星宣言" 
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
                
                <ul className="space-y-4 w-full">
                  {securityPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-4 p-4 bg-white rounded-[1.5rem] shadow-sm border border-sky-50 animate-hover transition-transform duration-300 hover:scale-[1.01]">
                      <div className="p-2.5 bg-sky-100/80 rounded-full text-sky-600 shrink-0">
                        {point.icon} 
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-sky-900 text-sm mb-1">{point.title}</h4>
                        <p className="text-gray-600 text-xs leading-relaxed">{point.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Panel 2: Kobutsu & Compliance */}
              <div className="bg-sky-50/50 rounded-[2rem] p-8 flex flex-col items-center border border-sky-50">
                <div className="mb-8 w-full flex justify-center">
                  <div className="inline-block bg-white text-sky-900 font-bold px-6 py-3 rounded-full shadow-sm border border-sky-200 text-center text-sm">
                    愛知県公安委員会許可正規事業者 <br/>
                    <span className="text-sky-700 block mt-1">【古物商許可 第542662601800号】</span>
                  </div>
                </div>
                
                <ul className="space-y-4 w-full">
                  {compliancePoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-4 p-4 bg-white rounded-[1.5rem] shadow-sm border border-sky-50 animate-hover transition-transform duration-300 hover:scale-[1.01]">
                      <div className="p-2.5 bg-sky-100/80 rounded-full text-sky-600 shrink-0">
                        {point.icon}
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-sky-900 text-sm mb-1">{point.title}</h4>
                        <p className="text-gray-600 text-xs leading-relaxed">{point.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Brand Trust Banner */}
        <TrustShield />

        {/* Process Section ("ご依頼の流れ") */}
        <section className="py-20 bg-gradient-to-b from-[#F0F9FF]/30 to-white px-4 sm:px-6 lg:px-8" id="process">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-jeimas-blue-dark tracking-[-0.02em]">
                ご依頼の流れ
              </h2>
              <div className="h-1.5 w-16 bg-[#0C74B3] mx-auto mt-4 rounded-full" />
              <p className="text-sm sm:text-base text-slate-500 mt-4 font-bold">
                お問い合わせから作業完了まで、丁寧かつスピーディーにサポートします。
              </p>
            </div>

            {/* Steps Container (flex/grid with arrows divisors) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
              {steps.map((st, idx) => (
                <div key={idx} className="relative flex">
                  <div className="premium-container bg-white border border-sky-100/50 p-8 rounded-5xl shadow-premium hover:shadow-lg transition-all duration-300 w-full relative">
                    {/* Big number on top right */}
                    <div className="absolute top-6 right-8 text-4xl font-black text-jeimas-blue/10">
                      {st.num}
                    </div>
                    {/* Step Icon with Premium Gold detail */}
                    <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center mb-6">
                      {st.icon}
                    </div>
                    <h3 className="text-lg font-black text-jeimas-blue-dark mb-2 pr-8">
                      {st.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                      {st.desc}
                    </p>
                  </div>
                  
                  {/* Arrow divisor (desktop only, except last card) */}
                  {idx < 3 && (
                    <div className="hidden lg:flex absolute top-1/2 right-[-24px] transform -translate-y-1/2 z-20 text-sky-200">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section ("よくある質問") */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" id="faq">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-jeimas-blue-dark tracking-[-0.02em]">
              よくある質問
            </h2>
            <div className="h-1.5 w-16 bg-[#0C74B3] mx-auto mt-4 rounded-full" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="premium-container bg-white border border-[#E4EEF4] rounded-5xl overflow-hidden transition-all duration-300 shadow-premium"
                >
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center text-left py-6 px-8 hover:bg-[#FBFDFE] transition-colors"
                  >
                    <span className="font-bold text-jeimas-blue-dark text-sm sm:text-base pr-4 flex items-center gap-3">
                      <span className="text-[#0C74B3] font-black">Q.</span>
                      {faq.q}
                    </span>
                    <svg 
                      className={`w-5 h-5 text-slate-400 shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-jeimas-blue' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] border-t border-sky-50' : 'max-h-0'}`}
                  >
                    <div className="p-8 bg-[#FBFDFE] text-slate-600 text-sm sm:text-base leading-relaxed font-medium flex gap-3">
                      <span className="text-[#E08F24] font-black shrink-0">A.</span>
                      <p className="whitespace-pre-line">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Form Section ("お問い合わせフォーム") */}
        <section className="py-24 bg-gradient-to-b from-white to-[#EAF5FC]/20 px-4 sm:px-6 lg:px-8" id="contact">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-jeimas-blue-dark tracking-[-0.02em]">
                お問い合わせフォーム
              </h2>
              <div className="h-1.5 w-16 bg-[#0C74B3] mx-auto mt-4 rounded-full" />
              <p className="text-sm sm:text-base text-slate-500 mt-4 font-bold">
                必要事項をご記入の上、「送信する」ボタンを押してください。
              </p>
            </div>

            <div className="premium-container bg-white border border-[#E4EEF4] rounded-[2.5rem] p-8 sm:p-12 shadow-premium relative overflow-hidden">
              {formStatus === 'success' ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-sm">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">送信が完了しました</h3>
                  <p className="text-sm text-slate-600 font-semibold leading-relaxed max-w-md mx-auto">
                    お問い合わせありがとうございます。内容を確認の上、担当者より折り返しご連絡させていただきます。
                  </p>
                  <button
                    onClick={() => setFormStatus(null)}
                    className="mt-6 text-sm font-extrabold text-[#0C74B3] hover:underline cursor-pointer"
                  >
                    もう一度フォームを表示する
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Urgent Contact Alert Box */}
                  <div className="bg-[#EBF5FC]/60 border border-sky-100 rounded-2xl p-4 sm:p-5 mb-8 text-left space-y-3">
                    <p className="text-xs sm:text-sm font-black text-jeimas-blue-dark flex items-center gap-2">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E0006C] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E0006C]"></span>
                      </span>
                      お急ぎの方へ
                    </p>
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                      お急ぎの場合は、LINEでのお見積りまたはお電話（フリーダイヤル）でのご連絡が便利です。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-1">
                      {/* LINE quote link */}
                      <a 
                        href="https://line.me/ti/p/XbHxvB_Kbu" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b04b] text-white font-extrabold text-xs py-2.5 px-5 rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                      >
                        {/* LINE SVG */}
                        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 5.84 2 10.58c0 2.9 1.7 5.48 4.38 7.09l-.46 2.8c-.08.48.27.67.66.41l3.86-2.31c.5.07 1 .11 1.56.11 5.52 0 10-3.84 10-8.58S17.52 2 12 2z"/>
                        </svg>
                        <span>LINEで即時見積もり</span>
                      </a>

                      {/* Phone call link */}
                      <a 
                        href="tel:0120-502-622" 
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-aoneko-pink to-[#E0006C] text-white font-extrabold text-xs py-2.5 px-5 rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5] shrink-0" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>電話する（0120-502-622）</span>
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-black text-slate-700">
                        お名前 <span className="text-red-500 text-xs">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="例：山田（苗字のみ、ニックネームも可）"
                        className="w-full px-5 py-4 rounded-2xl border border-sky-100 bg-[#FBFDFE] focus:outline-none focus:border-[#0C74B3] focus:bg-white text-sm font-semibold transition-all duration-200"
                      />
                    </div>
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="block text-sm font-black text-slate-700">
                        電話番号 <span className="text-red-500 text-xs">*</span>
                      </label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="例：090-1234-5678"
                        className="w-full px-5 py-4 rounded-2xl border border-sky-100 bg-[#FBFDFE] focus:outline-none focus:border-[#0C74B3] focus:bg-white text-sm font-semibold transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-black text-slate-700">
                      メールアドレス <span className="text-slate-400 text-xs font-semibold">(任意)</span>
                    </label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="例：example@aoneko.com"
                      className="w-full px-5 py-4 rounded-2xl border border-sky-100 bg-[#FBFDFE] focus:outline-none focus:border-[#0C74B3] focus:bg-white text-sm font-semibold transition-all duration-200"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="block text-sm font-black text-slate-700">
                      お問い合わせ内容 <span className="text-slate-400 text-xs font-semibold">(任意)</span>
                    </label>
                    <textarea 
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="ご相談内容やご希望の作業（エアコンクリーニング、草刈り、不用品買取・お片付けサポートなど）をご記入ください。"
                      className="w-full px-5 py-4 rounded-2xl border border-sky-100 bg-[#FBFDFE] focus:outline-none focus:border-[#0C74B3] focus:bg-white text-sm font-semibold transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Anti-spam / Botcheck (Web3Forms requirement) */}
                  <input 
                    type="checkbox" 
                    name="botcheck" 
                    checked={formData.botcheck}
                    onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked })}
                    className="hidden" 
                    style={{ display: 'none' }} 
                  />

                  {/* Error Message */}
                  {formStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>エラーが発生しました。お手数ですが、時間をおいて再度お試しいただくか、お電話でお問い合わせください。</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="text-center pt-4">
                    <p className="text-[11px] sm:text-xs text-slate-500 font-bold mb-3">
                      ※送信後、24時間以内に担当者より折り返しご連絡いたします。
                    </p>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="shine-button inline-flex items-center justify-center gap-3 bg-gradient-to-r from-aoneko-pink to-[#E0006C] text-white font-extrabold py-4 px-10 rounded-[2.5rem] border border-white/10 shadow-[0_12px_28px_-6px_rgba(255,0,127,0.5),0_8px_16px_-6px_rgba(255,0,127,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:pointer-events-none cursor-pointer w-full sm:w-auto"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>送信中...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          <span>送信する</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="bg-jeimas-blue py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-sky-100/50 relative overflow-hidden">
          {/* Subtle blue decoration in background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0C74B3]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-[-0.02em]">
              暮らしの「困った」を今すぐ解消！
            </h2>
            <p className="text-sm sm:text-base text-sky-100 font-bold">
              ご相談・お見積りは無料です。まずはお気軽にお電話ください。
            </p>
            
            {/* Massive Aoneko Red CTA Button */}
            <a 
              href="tel:0120-502-622" 
              className="shine-button inline-flex items-center justify-center gap-4 bg-gradient-to-r from-aoneko-pink to-[#E0006C] text-white font-extrabold py-5 px-10 rounded-[2.5rem] border border-white/10 shadow-[0_12px_28px_-6px_rgba(255,0,127,0.6),0_8px_16px_-6px_rgba(255,0,127,0.35)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 mt-4"
            >
              <div className="bg-white/20 p-2.5 rounded-full">
                <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[10px] opacity-90 tracking-wider">24時間受付中・通話料無料</p>
                <p className="text-xl sm:text-2xl font-black">0120-502-622</p>
              </div>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-aoneko-celeste text-jeimas-blue-dark pt-16 pb-44 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-jeimas-blue-dark/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Logo brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3 text-jeimas-blue-dark">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-jeimas-blue-dark/20 shadow-sm flex items-center justify-center shrink-0">
                <img src="/assets/logo.jpg" alt="何でも屋 青ねこ ロゴ" className="w-full h-full object-cover" />
              </div>
              <span className="text-lg font-black tracking-tight">何でも屋 青ねこ</span>
            </div>
            <p className="text-sm font-semibold leading-relaxed max-w-sm text-jeimas-blue-dark/80">
              地域密着型便利屋として、エアコンクリーニング、草刈り、不用品買取・お片付けサポート、複雑なカメラ設置、出張パソコン修理、出張買取など、お客様の「困った」を何でもサポートいたします。
            </p>
            
            <div className="text-xs font-semibold leading-relaxed text-jeimas-blue-dark/80 space-y-1 pt-4 border-t border-jeimas-blue-dark/15 max-w-sm">
              <p>会社名： 合同会社 Jeimas</p>
              <p>便利屋「青ねこ」事務局</p>
              <p className="font-extrabold text-[#0C74B3]">電話番号： 0120-502-622</p>
              <p>所在地：蟹江営業所<br />〒497-0048 愛知県海部郡蟹江町舟入三丁目321番地</p>
            </div>
          </div>

          {/* Menus / Links (2 Columns) */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-jeimas-blue-dark text-sm font-black tracking-wider mb-4">対応エリア</h4>
              <p className="text-sm font-semibold leading-loose text-jeimas-blue-dark/80">
                愛知県・岐阜県・三重県
              </p>
              <p className="text-sm font-black leading-loose text-[#0C74B3] mt-2">
                受付: 24時間年中無休
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/40 p-4 rounded-3xl border border-sky-100/50">
                {/* IPA Logo */}
                <div className="w-20 h-20 shrink-0 bg-white rounded-2xl p-1 shadow-sm flex items-center justify-center border border-sky-50">
                  <img 
                    src="/assets/security_action.png" 
                    alt="SECURITY ACTION" 
                    className="w-full h-auto object-contain"
                  />
                </div>
                {/* Security Texts */}
                <div className="text-left space-y-1">
                  <p className="text-xs font-black text-jeimas-blue-dark leading-tight">安心・安全への確かな取り組み</p>
                  <p className="text-[10px] font-bold text-slate-500 leading-tight">経済産業省推進「SECURITY ACTION」一つ星宣言企業</p>
                  <p className="text-[10px] font-semibold text-slate-500 leading-tight">古物商許可 愛知県公安委員会 第542662601800号</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Centered copyright line */}
        <div className="max-w-7xl mx-auto border-t border-jeimas-blue-dark/15 pt-8 text-center text-xs font-semibold text-jeimas-blue-dark/70">
          <p>© Nandemoya Aoneko. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Floating CTA for Mobile screens */}
      <StickyCTA />

      {/* Floating LINE Button */}
      <FloatingLineButton />

      {/* Floating Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}