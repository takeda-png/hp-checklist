# HP公開チェックリストアプリ

## 📋 プロジェクト概要
- **名前**: HP公開チェックリストアプリ
- **パス**: `C:\Users\taked\Desktop\hp-checklist\`
- **技術**: React + Vite + TailwindCSS
- **用途**: HP公開前の50項目チェックリストを管理するWebアプリ

## 🎯 機能要件
- チェックリスト項目の表示とチェック管理
- チェック状態をlocalStorageに保存（キー: `hp-checklist-state`）
- 完了数 / 全体数のカウント表示とプログレスバー
- 優先度（高・中・低）でフィルタリング
- カテゴリごとにアコーディオン折りたたみ可能
- 「リセット」ボタンで全チェックを外す機能
- チェック済み項目はグレーアウト表示

## 🔍 URLチェック機能
- URLを入力するフォーム
- 簡易的な自動チェック：
  - `<title>タグ` の有無
  - `<meta description>` の有無
  - `OGPタグ` の有無
  - `<h1>タグ` の有無
  - `HTTPS` 対応確認
  - `ファビコン` の有無
- スクレイピング（AllOrigins API 経由）
- 結果表示と検証

## 🎨 デザイン要件
- シンプルで見やすいビジネスライクなデザイン
- 優先度「高」→ 赤系バッジ、「中」→ 黄系バッジ、「低」→ 緑系バッジ
- チェック済み項目はテキストをグレーアウト
- スマホでも使いやすいレスポンシブデザイン

## 📊 チェックリストデータ（50項目）
### 1. HTMLの構造・SEO関連（9項目）
- タイトル・メタ情報（4項目）：title、meta description、OGP、meta description文字数
- 見出し構造（3項目）：h1、h2/h3順番、見出しキーワード
- 画像（2項目）：img alt属性、画像ファイルサイズ

### 2. テキスト・コンテンツ（6項目）
- 誤字脱字、敬体/常体、全角/半角、句読点、固有名詞、連絡先

### 3. リンク・ボタン（4項目）
- リンク切れ、新規タブ開く、ボタンテキスト、フォーム送信

### 4. 表示・デザイン（6項目）
- レスポンシブ、ブラウザ確認、フォントサイズ、色のコントラスト、ファビコン、viewport

### 5. パフォーマンス・技術（8項目）
- 表示速度、SSL/HTTPS、robots.txt、sitemap.xml、Search Console、GA、Google Tag Manager、charset

### 6. 法的・その他（5項目）
- プライバシーポリシー、お問い合わせフォーム、コピーライト、特定商取引法、コンタクトフォーム

### 7. キーワード・SEO分析（12項目）
- Googleサーチコンソール（4項目）
- キーワード/ページ内容の一致確認（5項目）
- 競合・キーワード調査（3項目）

## 🔧 技術要件
- **フレームワーク**: React + Vite
- **スタイリング**: TailwindCSS (CDN版)
- **データ管理**: src/data/checklist.js
- **localStorage キー**:
  - `hp-checklist-state` （チェック状態: {itemId: boolean}形式）
- **外部API**: AllOrigins（CORS対応のスクレイピング）
- **デプロイ**: GitHub Pages + GitHub Actions自動デプロイ

## 📁 ファイル構成
```
hp-checklist/
├── src/
│   ├── data/
│   │   └── checklist.js        # 50項目のチェックリストデータ
│   ├── App.jsx                 # メインコンポーネント（チェックリスト＋URLチェッカー）
│   ├── main.jsx                # エントリーポイント
├── public/
│   └── vite.svg
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages自動デプロイ
├── index.html                  # HTMLテンプレート（TailwindCSS CDN対応）
├── vite.config.js              # Vite設定（/api/fetchプロキシ含む）
├── package.json
├── .gitignore
└── CLAUDE.md
```

## 🚀 セットアップ手順
1. `npm install` – 依存関係をインストール
2. `npm run dev` – 開発サーバーを起動
3. ブラウザで http://localhost:5173 を開く

## 🔐 localStorage 構造
```json
{
  "hp-checklist-state": {
    "title_1": true,
    "title_2": false,
    "title_3": true,
    ...
  }
}
```

## 🌐 URLチェッカーの実装
- **機能**: HPのURLを入力してHTML要素を自動判定し、チェックリストに自動反映
- **自動判定項目（25項目 + 3ボーナス）**:

  **HTMLメタ情報（4項目）:**
  1. `<title>タグ` - ページタイトルの有無
  2. `<meta description>` - ディスクリプション設定確認
  3. `OGPタグ` - SNS共有時のOG情報
  4. `<meta description>の文字数` - 120～160文字チェック

  **見出し構造（2項目）:**
  5. `<h1>タグ（1個のみ）` - H1見出しが1個だけか確認
  6. `<h2><h3>の順番チェック` - 見出しの階層構造確認

  **画像（3項目）✨ NEW:**
  7. `<img>のalt属性` - 画像に代替テキストがあるか
  8. `画像ファイルサイズ（500KB以内）` - 大きすぎる画像の検出
  9. `画像width/height属性` - レスポンシブ対応確認

  **リンク・ボタン（4項目）✨ NEW:**
  10. `リンク切れの可能性` - 有効なリンク率確認
  11. `外部リンクがtarget="_blank"` - 外部リンクの新規タブ設定確認
  12. `ボタンテキスト明確性` - 「こちら」など曖昧なテキストを検出
  13. `フォーム送信ボタン（action設定）` - フォームがaction属性を持つか確認

  **デザイン（2項目）:**
  14. `ファビコン` - ブランドアイコン設定確認
  15. `viewportメタタグ` - レスポンシブ対応確認

  **パフォーマンス・技術（7項目）✨ NEW:**
  16. `HTTPS` - セキュアプロトコル対応確認
  17. `robots.txt（実ファイル確認）` - robots.txtファイルの実存在確認
  18. `sitemap.xml（実ファイル確認）` - sitemap.xmlの実存在確認
  19. `Google Analytics` - GA タグの設置確認
  20. `Google Tag Manager` - GTM タグの設置確認
  21. `charsetメタタグ` - 文字コード設定確認
  22. `Google Search Console` - サーチコンソール登録確認

  **法的・その他（3項目）:**
  23. `プライバシーポリシー` - プライバシーポリシーページの存在確認
  24. `コピーライト表記` - 著作権表記の有無確認
  25. `お問い合わせフォーム` - コンタクトフォームの存在確認

  **ボーナス検出（参考情報・チェックリスト対応なし）:**
  - `Microsoft Clarity` - ヒートマップツール検出
  - `Hotjar` - ユーザー行動分析ツール検出
  - `Segment` - データ統合プラットフォーム検出

- **技術**: AllOrigins API + 正規表現マッチング + HTMLパース
- **自動チェック**: OK の項目は、対応するチェックリスト項目に自動的にチェックが入る
- **UI**: トグルボタンでチェックリストとURLチェッカーを切り替え

## ✅ 完成条件
- [x] すべての50項目がチェックリストに表示される
- [x] チェック状態がlocalStorageで保存・復元される
- [x] 優先度フィルタリング機能が動作する（高・中・低）
- [x] カテゴリ別アコーディオンが動作する
- [x] リセットボタンで全チェックが外れる
- [x] 完了数／全体数とプログレスバーが正確に表示される
- [x] チェック済み項目はグレーアウト表示
- [x] インラインスタイルでビジネスライクなデザイン実装
- [x] スマホでレスポンシブに表示される
- [x] URLチェッカー機能実装（メインチェックリストに統合）
- [x] URLチェッカーのトグルボタンで切り替え可能
- [x] 25項目の自動判定機能（HTML要素検出、タグチェック、リンク検証、フォーム検査）
- [x] 3ボーナス項目（Clarity、Hotjar、Segment検出）
- [x] チェック結果に基づいてチェックリスト項目を自動チェック
- [x] 画像ファイルサイズ、フォーム、リンクテキストの詳細チェック
- [x] robots.txt・sitemap.xml実ファイル確認
- [x] Google Search Console設置確認
- [x] GitHub Pages で公開
- [x] GitHub Actions自動デプロイ設定
- [x] Git リポジトリ作成・運用

## 🌐 公開URL
- **GitHub Pages:** https://takeda-png.github.io/hp-checklist/
- **GitHub リポジトリ:** https://github.com/takeda-png/hp-checklist

## 📝 最終更新（2026-03-01）
### 第1次実装（初期版）
- ✅ URLチェッカー機能をメインアプリケーションに完全統合
- ✅ トグルボタンで「チェックリスト」⇄「URLをチェック」切り替え機能
- ✅ AllOrigins API経由でCORS対応スクレイピング実装
- ✅ 6項目のSEOチェック機能（正規表現マッチング）
- ✅ GitHub Pages デプロイ確認完了
- ✅ GitHub Actions自動ビルド・デプロイ設定
- ✅ TailwindCSS CDN対応により安定した動作確認

### 第2次実装（拡張版・2026-03-01）
- ✅ チェックリスト項目を 45 → 50 項目に拡張
- ✅ URL チェッカーを 6 項目 → 21 項目に拡張
- ✅ Meta description 文字数チェック（120～160文字）
- ✅ H1 タグ個数チェック（1個のみ）
- ✅ viewport メタタグ確認（レスポンシブ対応）
- ✅ charset メタタグ確認
- ✅ Google Tag Manager（タグマネ）検出
- ✅ お問い合わせフォーム検出
- ✅ リンク切れ検出・外部リンク target="_blank" 確認
- ✅ robots.txt・sitemap.xml 存在確認
- ✅ チェック結果を自動的にチェックリスト項目に反映
- ✅ API 費用ゼロ（正規表現とテキスト分析のみ）

### 第3次実装（確定版・2026-03-01）
- ✅ App.jsx 完全復帰（21項目URL自動チェック機能）
- ✅ GitHub Pages デプロイ修正（force_orphan: true）
- ✅ 50項目チェックリスト＋21項目URL自動判定が完全動作
- ✅ localStorage 永続化（チェック状態保存）
- ✅ URL検証結果のチェックリスト自動反映機能

### 第4次実装（拡張版・2026-03-01・一旦完了）
- ✅ 画像ファイルサイズチェック追加（item 3-2）
- ✅ ボタンテキスト明確性検出（item 5-3）
- ✅ フォーム送信ボタン設定確認（item 5-4）
- ✅ 画像 width/height 属性確認（item 6-1）
- ✅ robots.txt・sitemap.xml 実ファイル確認（item 7-3, 7-4）
- ✅ Google Search Console 登録確認（item 9-1）
- ✅ ボーナス: Clarity・Hotjar・Segment 検出
- ✅ **自動判定項目: 21 → 25項目に拡張**
- ✅ **完全にAPI費用ゼロで実装** （AllOrigins無料 + 正規表現）
- ✅ GitHub Pages 正常動作確認
- ✅ すべての機能がプロダクション環境で稼働

## 🔧 開発環境起動
```bash
npm install          # 初回のみ
npm run dev          # 開発サーバー起動 (http://localhost:5173)
npm run build        # 本番ビルド
npm run preview      # ビルド結果プレビュー
```

## 📌 主要な実装ファイル
- **App.jsx**: メインコンポーネント（全機能を含むシングルコンポーネント）
  - State: checkedItems, filterPriority, expandedCategory, showURLChecker, urlInput, urlLoading, urlResults
  - 機能: チェックリスト管理、URL検証、localStorage同期
  - UI: インラインスタイル（Tailwindクラス非使用）
