# HP公開チェックリストアプリ

## 📋 プロジェクト概要
- **名前**: HP公開チェックリストアプリ
- **パス**: `C:\Users\taked\Desktop\hp-checklist\`
- **技術**: React + Vite + TailwindCSS
- **用途**: HP公開前の45項目チェックリストを管理するWebアプリ

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

## 📊 チェックリストデータ（45項目）
### 1. HTMLの構造・SEO関連（8項目）
- タイトル・メタ情報（3項目）
- 見出し構造（3項目）
- 画像（2項目）

### 2. テキスト・コンテンツ（6項目）
- 誤字脱字、敬体/常体、全角/半角、句読点、固有名詞、連絡先

### 3. リンク・ボタン（4項目）
- リンク切れ、新規タブ開く、ボタンテキスト、フォーム送信

### 4. 表示・デザイン（5項目）
- レスポンシブ、ブラウザ確認、フォントサイズ、色のコントラスト、ファビコン

### 5. パフォーマンス・技術（6項目）
- 表示速度、SSL、robots.txt、sitemap.xml、Search Console、GA

### 6. 法的・その他（4項目）
- プライバシーポリシー、お問い合わせフォーム、コピーライト、特定商取引法

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
│   │   └── checklist.js        # 45項目のチェックリストデータ
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
- **機能**: HPのURLを入力してSEO要素を自動チェック
- **チェック項目**:
  1. `<title>タグ` - ページタイトルの有無
  2. `<meta description>` - ディスクリプション設定確認
  3. `OGPタグ` - SNS共有時のOG情報
  4. `<h1>タグ` - H1見出しの有無
  5. `HTTPS` - セキュアプロトコル対応確認
  6. `ファビコン` - ブランドアイコン設定確認
- **技術**: AllOrigins API + 正規表現マッチング
- **UI**: トグルボタンでチェックリストとURLチェッカーを切り替え

## ✅ 完成条件
- [x] すべての45項目がチェックリストに表示される
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
- [x] 6項目のSEOチェック機能（title, meta, OGP, h1, HTTPS, favicon）
- [x] GitHub Pages で公開
- [x] GitHub Actions自動デプロイ設定
- [x] Git リポジトリ作成・運用

## 🌐 公開URL
- **GitHub Pages:** https://takeda-png.github.io/hp-checklist/
- **GitHub リポジトリ:** https://github.com/takeda-png/hp-checklist

## 📝 最終更新（2026-03-01）
- ✅ URLチェッカー機能をメインアプリケーションに完全統合
- ✅ トグルボタンで「チェックリスト」⇄「URLをチェック」切り替え機能
- ✅ AllOrigins API経由でCORS対応スクレイピング実装
- ✅ 6項目のSEOチェック機能（正規表現マッチング）
- ✅ GitHub Pages デプロイ確認完了
- ✅ GitHub Actions自動ビルド・デプロイ設定
- ✅ TailwindCSS CDN対応により安定した動作確認

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
