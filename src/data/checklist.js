export const checklistData = [
  {
    id: "1",
    category: "HTMLの構造・SEO関連",
    subcategory: "タイトル・メタ情報",
    items: [
      {
        id: "1-1",
        title: "<title>タグが各ページに設定されているか（重複なし）",
        priority: "高",
      },
      {
        id: "1-2",
        title: "<meta description>が各ページに設定されているか（120〜160文字）",
        priority: "高",
      },
      {
        id: "1-3",
        title: "OGPタグ（og:title / og:description / og:image）が設定されているか",
        priority: "中",
      },
      {
        id: "1-4",
        title: "<meta description>が120～160文字か",
        priority: "中",
      },
    ],
  },
  {
    id: "2",
    category: "HTMLの構造・SEO関連",
    subcategory: "見出し構造",
    items: [
      {
        id: "2-1",
        title: "<h1>タグが各ページに1つだけ存在するか",
        priority: "高",
      },
      {
        id: "2-2",
        title: "<h2><h3>が順番通りに使われているか（飛び級なし）",
        priority: "高",
      },
      {
        id: "2-3",
        title: "見出しにキーワードが自然に含まれているか",
        priority: "高",
      },
    ],
  },
  {
    id: "3",
    category: "HTMLの構造・SEO関連",
    subcategory: "画像",
    items: [
      {
        id: "3-1",
        title: "<img>タグにalt属性が設定されているか",
        priority: "中",
      },
      {
        id: "3-2",
        title: "画像ファイルが重くないか（1枚500KB以内が目安）",
        priority: "中",
      },
    ],
  },
  {
    id: "4",
    category: "テキスト・コンテンツ",
    subcategory: "",
    items: [
      {
        id: "4-1",
        title: "誤字脱字・変換ミスがないか",
        priority: "高",
      },
      {
        id: "4-2",
        title: "敬体（です・ます）と常体（だ・である）が混在していないか",
        priority: "中",
      },
      {
        id: "4-3",
        title: "全角・半角が統一されているか（電話番号・英数字など）",
        priority: "中",
      },
      {
        id: "4-4",
        title: "句読点の使い方が統一されているか",
        priority: "低",
      },
      {
        id: "4-5",
        title: "会社名・サービス名などの固有名詞が正確か",
        priority: "高",
      },
      {
        id: "4-6",
        title: "住所・電話番号・メールアドレスが正しいか",
        priority: "高",
      },
    ],
  },
  {
    id: "5",
    category: "リンク・ボタン",
    subcategory: "",
    items: [
      {
        id: "5-1",
        title: "リンク切れがないか（特に内部リンク）",
        priority: "高",
      },
      {
        id: "5-2",
        title: "外部リンクは新しいタブで開く設定か（target=\"_blank\"）",
        priority: "中",
      },
      {
        id: "5-3",
        title: "ボタンのテキストが「こちら」など曖昧になっていないか",
        priority: "低",
      },
      {
        id: "5-4",
        title: "フォームの送信ボタンが正常に動作するか",
        priority: "高",
      },
    ],
  },
  {
    id: "6",
    category: "表示・デザイン",
    subcategory: "",
    items: [
      {
        id: "6-1",
        title: "PC・スマホ・タブレット各サイズで崩れていないか",
        priority: "高",
      },
      {
        id: "6-2",
        title: "主要ブラウザで確認しているか（Chrome・Safari・Edge）",
        priority: "高",
      },
      {
        id: "6-3",
        title: "フォントサイズが小さすぎないか（本文は16px以上が目安）",
        priority: "中",
      },
      {
        id: "6-4",
        title: "色のコントラストが弱くて読みにくくないか",
        priority: "中",
      },
      {
        id: "6-5",
        title: "ファビコン（タブのアイコン）が設定されているか",
        priority: "低",
      },
      {
        id: "6-6",
        title: "viewportメタタグが設定されているか（レスポンシブ対応）",
        priority: "高",
      },
    ],
  },
  {
    id: "7",
    category: "パフォーマンス・技術",
    subcategory: "",
    items: [
      {
        id: "7-1",
        title: "ページの表示速度が遅くないか（PageSpeed Insightsで確認）",
        priority: "高",
      },
      {
        id: "7-2",
        title: "SSL（HTTPS）になっているか",
        priority: "高",
      },
      {
        id: "7-3",
        title: "robots.txtが意図した設定になっているか",
        priority: "中",
      },
      {
        id: "7-4",
        title: "sitemap.xmlが存在するか",
        priority: "中",
      },
      {
        id: "7-5",
        title: "Googleサーチコンソールにsitemap.xmlを送信済みか",
        priority: "高",
      },
      {
        id: "7-6",
        title: "Google Analyticsなどの解析タグが正しく入っているか",
        priority: "高",
      },
      {
        id: "7-7",
        title: "Google Tag Manager（タグマネ）が導入されているか",
        priority: "中",
      },
      {
        id: "7-8",
        title: "charsetメタタグが正しく設定されているか（UTF-8など）",
        priority: "中",
      },
    ],
  },
  {
    id: "8",
    category: "法的・その他",
    subcategory: "",
    items: [
      {
        id: "8-1",
        title: "プライバシーポリシーのページがあるか",
        priority: "高",
      },
      {
        id: "8-2",
        title: "お問い合わせフォームで確認メールが届くか",
        priority: "高",
      },
      {
        id: "8-3",
        title: "コピーライト表記の年が最新か（© 2025 など）",
        priority: "低",
      },
      {
        id: "8-4",
        title: "特定商取引法に基づく表記が必要な場合は設置されているか（ECサイト等）",
        priority: "高",
      },
      {
        id: "8-5",
        title: "お問い合わせフォームがあるか（contactフォーム等）",
        priority: "高",
      },
    ],
  },
  {
    id: "9",
    category: "キーワード・SEO分析",
    subcategory: "Googleサーチコンソール",
    items: [
      {
        id: "9-1",
        title: "サーチコンソールに登録・認証されているか",
        priority: "高",
      },
      {
        id: "9-2",
        title: "実際に表示・クリックされているキーワードを把握しているか",
        priority: "高",
      },
      {
        id: "9-3",
        title: "検索順位が意図したキーワードで出ているか",
        priority: "高",
      },
      {
        id: "9-4",
        title: "インデックスエラーが出ているページがないか",
        priority: "高",
      },
    ],
  },
  {
    id: "10",
    category: "キーワード・SEO分析",
    subcategory: "キーワードとページ内容の一致確認",
    items: [
      {
        id: "10-1",
        title: "<title>タグに狙うキーワードが含まれているか",
        priority: "高",
      },
      {
        id: "10-2",
        title: "<h1>タグに狙うキーワードが含まれているか",
        priority: "高",
      },
      {
        id: "10-3",
        title: "<meta description>にキーワードが自然に含まれているか",
        priority: "高",
      },
      {
        id: "10-4",
        title: "本文中にキーワードが適度に含まれているか（詰め込みすぎNG）",
        priority: "中",
      },
      {
        id: "10-5",
        title: "ページごとに「1ページ＝1テーマ」のキーワードになっているか",
        priority: "中",
      },
    ],
  },
  {
    id: "11",
    category: "キーワード・SEO分析",
    subcategory: "競合・キーワード調査",
    items: [
      {
        id: "11-1",
        title: "狙いたいキーワードで実際にGoogle検索して上位に出ているか確認しているか",
        priority: "中",
      },
      {
        id: "11-2",
        title: "UbersuggestなどでサイトURLを分析し推定順位を把握しているか",
        priority: "中",
      },
      {
        id: "11-3",
        title: "競合サイトと比べてコンテンツの量・質が劣っていないか",
        priority: "中",
      },
    ],
  },
];
