import { useState, useEffect } from 'react'
import { checklistData } from './data/checklist'

function App() {
  const [checkedItems, setCheckedItems] = useState({})
  const [filterPriority, setFilterPriority] = useState('all')
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [showURLChecker, setShowURLChecker] = useState(false)
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

  const handleReset = () => {
    if (window.confirm('すべてチェックを外しますか？')) {
      setCheckedItems({})
    }
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

      const results = {
        url: urlInput,
        checks: [
          { name: '<title>タグ', ok: /<title>([^<]+)<\/title>/i.test(htmlContent) },
          { name: '<meta description>', ok: /name=["']description["']\s+content=/i.test(htmlContent) },
          { name: 'OGPタグ', ok: /property=["']og:title["']/i.test(htmlContent) },
          { name: '<h1>タグ', ok: /<h1[^>]*>/i.test(htmlContent) },
          { name: 'HTTPS', ok: urlInput.startsWith('https://') },
          { name: 'ファビコン', ok: /favicon|shortcut icon/i.test(htmlContent) }
        ]
      }
      setUrlResults(results)
    } catch (error) {
      alert(`エラー: ${error.message}`)
      setUrlResults(null)
    } finally {
      setUrlLoading(false)
    }
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
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f0f0f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#333' }}>HP公開チェックリスト</h1>
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
          <p>HP のURLを入力して、自動チェックを実行します</p>

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
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {urlResults.checks.map((check, idx) => (
                  <li key={idx} style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
                    <span style={{ color: check.ok ? '#4caf50' : '#f44336', fontWeight: 'bold' }}>
                      {check.ok ? '✓' : '✗'}
                    </span>
                    {' '} {check.name}
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: '15px', color: '#666', fontSize: '14px' }}>
                ※ 簡易的な自動チェックです。下記のチェックリストで手動確認してください。
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
        <h3>完了状況: {completed} / {total} ({Math.round(completed/total*100)}%)</h3>
        <div style={{ width: '100%', height: '20px', backgroundColor: '#ddd', borderRadius: '4px' }}>
          <div style={{ width: `${Math.round(completed/total*100)}%`, height: '100%', backgroundColor: '#2196f3', borderRadius: '4px' }}></div>
        </div>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
        <button onClick={handleReset} style={{ padding: '8px 16px', backgroundColor: '#999', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          リセット
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
              <span>{category.items.filter(i => checkedItems[i.id]).length} / {category.items.length}</span>
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
                    <span style={{ 
                      marginLeft: '10px', 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      color: 'white',
                      fontSize: '12px',
                      backgroundColor: item.priority === '高' ? '#f44336' : item.priority === '中' ? '#ff9800' : '#4caf50'
                    }}>
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
