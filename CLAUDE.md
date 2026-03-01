# HP公開チェックリストアプリ

## 📋 プロジェクト概要
- **名前**: HP公開チェックリストアプリ
- **パス**: `C:\Users\taked\Desktop\hp-checklist\`
- **技術**: React + Vite + TailwindCSS
- **用途**: HP公開前の45項目チェックリストを管理するWebアプリ

## 🎯 機能要件
- チェックリスト項目の表示とチェック管理
- チェック状態をlocalStorageに保存（キー: `hp-checklist-state`）
- メモ欄をlocalStorageに保存（キー: `hp-checklist-memos`）
- 完了数 / 全体数のカウント表示
- 優先度（高・中・低）でフィルタリング
- カテゴリごとにアコーディオン折りたたみ可能
- 「リセット」ボタンで全チェックを外す機能
- メモ欄に自由にテキスト入力可能

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
- **スタイリング**: TailwindCSS
- **データ管理**: src/data/checklist.js
- **localStorage キー**:
  - `hp-checklist-state` （チェック状態）
  - `hp-checklist-memos` （メモ内容）
- **コンポーネント分割**: 適切に分割

## 📁 ファイル構成
```
hp-checklist/
├── src/
│   ├── data/
│   │   └── checklist.js        # チェックリストデータ
│   ├── components/
│   │   ├── ChecklistItem.jsx   # チェック項目
│   │   ├── CategorySection.jsx  # カテゴリセクション
│   │   ├── FilterBar.jsx       # フィルタバー
│   │   └── StatsBar.jsx        # 完了数表示
│   ├── App.jsx
│   ├── App.css
│   ├── index.css               # Tailwind設定
│   └── main.jsx
├── index.html
├── vite.config.js
├── postcss.config.js
├── tailwind.config.js
├── package.json
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
    "item_id_1": true,
    "item_id_2": false,
    ...
  },
  "hp-checklist-memos": {
    "category_1": "メモテキスト...",
    ...
  }
}
```

## ✅ 完成条件
- [ ] すべての45項目がチェックリストに表示される
- [ ] チェック状態がlocalStorageで保存・復元される
- [ ] 優先度フィルタリング機能が動作する
- [ ] カテゴリ別アコーディオンが動作する
- [ ] メモ欄が動作し、localStorageに保存される
- [ ] リセットボタンで全チェックが外れる
- [ ] 完了数が正確に表示される
- [ ] TailwindCSSでビジネスライクなデザインが実装される
- [ ] スマホでレスポンシブに表示される
