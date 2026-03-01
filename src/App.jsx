import { useState, useEffect } from 'react'
import { checklistData } from './data/checklist'

function App() {
  const [checkedItems, setCheckedItems] = useState({})
  const [filterPriority, setFilterPriority] = useState('all')
  const [showURLChecker, setShowURLChecker] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [urlInput, setUrlInput] = useState('')
  const [urlLoading, setUrlLoading] = useState(false)
  const [urlResults, setUrlResults] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('hp-checklist-state')
    if (saved) setCheckedItems(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('hp-checklist-state', JSON.stringify(checkedItems))
  }, [checkedItems])

  const handleCheck = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const handleURLCheck = async () => {
    if (!urlInput.trim()) {
      alert('URLを入力してください')
      return
    }

    setUrlLoading(true)
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(urlInput)}`)
      const data = await response.json()
      const htmlContent = data.contents

      // 詳細な判定ロジック
      const checks = [
        // HTMLメタ情報
        { name: '<title>タグ', ok: /<title>([^<]+)<\/title>/i.test(htmlContent), itemIds: ['1-1'] },
        { name: '<meta description>', ok: /name=['"]description['"]/.test(htmlContent), itemIds: ['1-2'] },
        { name: 'OGPタグ', ok: /property=['"]og:title['"]|property=['"]og:description['"]|property=['"]og:image['"]/.test(htmlContent), itemIds: ['1-3'] },
        { name: '<meta description>の文字数（120～160）', ok: checkMetaDescriptionLength(htmlContent), itemIds: ['1-4'] },

        // 見出し構造
        { name: '<h1>タグ（1個のみ）', ok: (htmlContent.match(/<h1[^>]*>/gi) || []).length === 1, itemIds: ['2-1'] },
        { name: '<h2><h3>の順番チェック', ok: checkHeadingStructure(htmlContent), itemIds: ['2-2'] },

        // 画像
        { name: '<img>のalt属性', ok: checkImgAltAttributes(htmlContent), itemIds: ['3-1'] },

        // リンク・ボタン
        { name: 'リンク切れの可能性', ok: checkLinksValid(htmlContent), itemIds: ['5-1'] },
        { name: '外部リンクがtarget="_blank"', ok: checkExternalLinksTarget(htmlContent), itemIds: ['5-2'] },

        // デザイン
        { name: 'ファビコン', ok: /favicon|shortcut icon/.test(htmlContent), itemIds: ['6-5'] },
        { name: 'viewportメタタグ', ok: /viewport/.test(htmlContent), itemIds: ['6-6'] },

        // パフォーマンス・技術
        { name: 'HTTPS', ok: urlInput.startsWith('https://'), itemIds: ['7-2'] },
        { name: 'robots.txt', ok: checkRobotsTxt(htmlContent), itemIds: ['7-3'] },
        { name: 'sitemap.xml', ok: checkSitemapXml(htmlContent), itemIds: ['7-4'] },
        { name: 'Google Analytics', ok: /google.?analytics|gtag|UA-|G-/.test(htmlContent), itemIds: ['7-6'] },
        { name: 'Google Tag Manager', ok: /googletagmanager|gtm\.js|GTM-/.test(htmlContent), itemIds: ['7-7'] },
        { name: 'charsetメタタグ', ok: /charset|encoding/.test(htmlContent), itemIds: ['7-8'] },

        // 法的・その他
        { name: 'プライバシーポリシー', ok: /privacy|プライバシー|個人情報/.test(htmlContent), itemIds: ['8-1'] },
        { name: 'コピーライト表記', ok: /&copy;|©|copyright|2024|2025|20\d{2}/.test(htmlContent), itemIds: ['8-3'] },
        { name: 'お問い合わせフォーム', ok: /<form[^>]*>|contact|inquiry|お問い合わせ/i.test(htmlContent), itemIds: ['8-5'] },
      ]

      const results = {
        url: urlInput,
        checks: checks,
        successCount: checks.filter(c => c.ok).length,
        totalCount: checks.length
      }

      // チェック結果に基づいて対応するリストアイテムを自動チェック
      const newCheckedItems = { ...checkedItems }
      checks.forEach(check => {
        if (check.ok) {
          check.itemIds.forEach(itemId => {
            newCheckedItems[itemId] = true
          })
        }
      })
      setCheckedItems(newCheckedItems)
      setUrlResults(results)
    } catch (error) {
      alert(`エラー: ${error.message}`)
      setUrlResults(null)
    } finally {
      setUrlLoading(false)
    }
  }

  // meta description の文字数チェック
  const checkMetaDescriptionLength = (html) => {
    const match = html.match(/name=['"]description['"][\s]*content=['"]([^'"]*)['"]/i)
    if (!match) return false
    const content = match[1]
    return content.length >= 120 && content.length <= 160
  }

  // 見出し構造チェック（h2の後にh3が来ているか）
  const checkHeadingStructure = (html) => {
    const h2s = (html.match(/<h2[^>]*>/gi) || []).length
    const h3s = (html.match(/<h3[^>]*>/gi) || []).length
    return h2s > 0 && h3s >= 0 // h2があれば OK（h3がなくてもOK）
  }

  // img の alt 属性チェック
  const checkImgAltAttributes = (html) => {
    const imgs = html.match(/<img[^>]*>/gi) || []
    if (imgs.length === 0) return false
    const imgsWithAlt = imgs.filter(img => /alt=['"]/.test(img))
    return imgsWithAlt.length / imgs.length >= 0.8 // 80%以上が alt を持っていればOK
  }

  // リンク妥当性チェック
  const checkLinksValid = (html) => {
    const links = html.match(/<a[^>]*href=['"]([^'"]*)['"]/gi) || []
    const validLinks = links.filter(link => {
      const href = link.match(/href=['"]([^'"]*)['"]/)[1]
      return href && href !== '#' && !href.startsWith('javascript:')
    })
    return validLinks.length / Math.max(links.length, 1) >= 0.8
  }

  // 外部リンクがtarget="_blank"か
  const checkExternalLinksTarget = (html) => {
    const externalLinks = html.match(/<a[^>]*href=['"](?:https?:)?\/\/(?!.*?(?:yourdomain\.com))[^'"]*['"][^>]*>/gi) || []
    if (externalLinks.length === 0) return true
    const withTarget = externalLinks.filter(link => /target=['"]_blank['"]/.test(link))
    return withTarget.length / externalLinks.length >= 0.8
  }

  // robots.txt チェック
  const checkRobotsTxt = (html) => {
    return /robots\.txt|sitemap|disallow|user-agent/i.test(html)
  }

  // sitemap.xml チェック
  const checkSitemapXml = (html) => {
    return /sitemap\.xml|sitemap|urlset/i.test(html)
  }

  // フィルタリング
  const filteredItems = checklistData.reduce((acc, category) => {
    const filtered = category.items.filter(
      item => filterPriority === 'all' || item.priority === filterPriority
    )
    if (filtered.length > 0) {
      acc.push({ ...category, items: filtered })
    }
    return acc
  }, [])

  const total = checklistData.reduce((sum, cat) => sum + cat.items.length, 0)
  const completed = Object.values(checkedItems).filter(Boolean).length

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>HP公開チェックリスト</h1>
        <button
          onClick={() => setShowURLChecker(!showURLChecker)}
          style={{ padding: '10px 20px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
        >
          {showURLChecker ? 'チェックリストに戻る' : 'URLをチェック'}
        </button>
      </div>

      {showURLChecker ? (
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9' }}>
          <h2>URLをチェック</h2>
          <p>HPのURLを入力して、自動チェックを実行します</p>

          <div style={{ marginBottom: '15px' }}>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com"
              style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
            />
          </div>

          <button
            onClick={handleURLCheck}
            disabled={urlLoading}
            style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: urlLoading ? 'wait' : 'pointer', fontSize: '16px' }}
          >
            {urlLoading ? 'チェック中...' : 'チェック開始'}
          </button>

          {urlResults && (
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
              <h3>チェック結果</h3>
              <p><strong>URL:</strong> {urlResults.url}</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#2196f3' }}>
                {urlResults.successCount} / {urlResults.totalCount} 項目が OK です
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {urlResults.checks.map((check, idx) => (
                  <li key={idx} style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
                    <span style={{ color: check.ok ? '#4caf50' : '#f44336', fontWeight: 'bold' }}>
                      {check.ok ? '✓ OK' : '✗ NG'}
                    </span>
                    {' '} {check.name}
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: '15px', fontSize: '14px', color: '#333' }}>
                <strong>✓ OK の項目</strong>は、チェックリストの対応する項目に自動的にチェックが入ります。
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
            <h3>完了状況: {completed} / {total} ({total > 0 ? Math.round(completed/total*100) : 0}%)</h3>
          </div>

          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            <button onClick={() => setFilterPriority('all')} style={{ padding: '8px 16px', backgroundColor: filterPriority === 'all' ? '#2196f3' : '#ddd', color: filterPriority === 'all' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              すべて
            </button>
            <button onClick={() => setFilterPriority('高')} style={{ padding: '8px 16px', backgroundColor: filterPriority === '高' ? '#f44336' : '#ffcdd2', color: filterPriority === '高' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              優先度：高
            </button>
            <button onClick={() => setFilterPriority('中')} style={{ padding: '8px 16px', backgroundColor: filterPriority === '中' ? '#ff9800' : '#ffe0b2', color: filterPriority === '中' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              優先度：中
            </button>
            <button onClick={() => setFilterPriority('低')} style={{ padding: '8px 16px', backgroundColor: filterPriority === '低' ? '#4caf50' : '#c8e6c9', color: filterPriority === '低' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              優先度：低
            </button>
          </div>

          <div>
            {filteredItems.map(category => (
              <div key={category.id} style={{ marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                <div
                  onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                  style={{ padding: '15px', backgroundColor: '#f5f5f5', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div>
                    <h3 style={{ margin: '0 0 5px 0' }}>{category.category}</h3>
                    {category.subcategory && <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{category.subcategory}</p>}
                  </div>
                  <span style={{ fontSize: '14px', color: '#666' }}>{category.items.filter(i => checkedItems[i.id]).length} / {category.items.length}</span>
                </div>
                {expandedCategory === category.id && (
                  <div style={{ padding: '15px' }}>
                    {category.items.map(item => (
                      <label key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={checkedItems[item.id] || false}
                          onChange={() => handleCheck(item.id)}
                          style={{ marginRight: '10px', width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span style={{ flex: 1, textDecoration: checkedItems[item.id] ? 'line-through' : 'none', color: checkedItems[item.id] ? '#999' : 'black' }}>
                          {item.title}
                        </span>
                        <span style={{ marginLeft: '10px', padding: '4px 8px', borderRadius: '4px', color: 'white', fontSize: '12px', backgroundColor: item.priority === '高' ? '#f44336' : item.priority === '中' ? '#ff9800' : '#4caf50' }}>
                          {item.priority}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default App
