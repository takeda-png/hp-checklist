import { useState } from 'react'
import { Loader } from 'lucide-react'

export default function URLChecker({ onCheckedItems, checklistData }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState(null)

  const handleCheck = async () => {
    if (!url.trim()) {
      setError('URLを入力してください')
      return
    }

    setLoading(true)
    setError('')
    setResults(null)

    try {
      // URLをスクレイピング
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error('URLの取得に失敗しました')
      }

      const htmlContent = data.contents

      // Claude APIで自動チェック（簡易版）
      const results = {}
      
      // 簡易的なチェック（実装例）
      // 実際にはバックエンドでClaude APIを呼び出すべき
      
      // 1. <title>タグの確認
      const titleMatch = htmlContent.match(/<title>([^<]+)<\/title>/i)
      results['1-1'] = !!titleMatch
      
      // 2. <meta description>の確認
      const metaDescMatch = htmlContent.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)
      results['1-2'] = !!metaDescMatch
      
      // 3. OGPタグの確認
      const ogMatch = htmlContent.match(/<meta\s+property=["']og:title["']/i)
      results['1-3'] = !!ogMatch
      
      // 4. <h1>タグの確認
      const h1Match = htmlContent.match(/<h1[^>]*>([^<]+)<\/h1>/i)
      results['2-1'] = !!h1Match
      
      // 5. HTTPS確認
      results['7-2'] = url.startsWith('https://')
      
      // 6. favicon確認
      results['6-5'] = htmlContent.includes('favicon')

      setResults({
        url,
        checkedItems: results,
        summary: {
          total: Object.keys(results).length,
          checked: Object.values(results).filter(Boolean).length
        }
      })

      onCheckedItems(results)
    } catch (err) {
      setError(`エラー: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (results) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">チェック結果</h2>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-2">チェック対象URL:</p>
          <p className="text-blue-600 break-all">{results.url}</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-gray-700 mb-2">自動チェック結果</p>
          <p className="text-2xl font-bold text-blue-600">
            {results.summary.checked} / {results.summary.total} 項目確認
          </p>
          <p className="text-gray-600 text-sm mt-2">
            ※ 簡易的な自動チェックです。すべての項目は手動で確認してください
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-900 text-sm">
            💡 <strong>ご注意:</strong> 詳細なチェック（誤字脱字、敬語、コントラスト比など）はClaude APIを使用した高度な分析が必要です。下記のチェックリストで手動確認を行ってください。
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">URLを入力してチェック</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            HPのURL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <p className="text-gray-500 text-sm mt-1">
            公開中のHTTP(S)URLを入力してください
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleCheck}
          disabled={loading || !url.trim()}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && <Loader size={20} className="animate-spin" />}
          {loading ? 'チェック中...' : 'チェック開始'}
        </button>
      </div>
    </div>
  )
}
