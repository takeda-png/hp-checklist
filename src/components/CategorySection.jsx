import { useState } from 'react'
import ChecklistItem from './ChecklistItem'
import { ChevronDown } from 'lucide-react'

export default function CategorySection({
  category,
  isExpanded,
  onToggle,
  checkedItems,
  onCheck,
  memo,
  onMemoChange,
}) {
  const [showMemo, setShowMemo] = useState(false)

  // このカテゴリのすべてのアイテムIDを取得
  const allItemIds = category.items.map((item) => item.id)
  // このカテゴリのチェック状態をカウント
  const checkedCount = allItemIds.filter((id) => checkedItems[id]).length
  const totalCount = category.items.length

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* ヘッダー */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-200"
      >
        <div className="flex items-center gap-4 flex-1 text-left">
          <ChevronDown
            size={20}
            className={`transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
          />
          <div>
            <h2 className="text-lg font-bold text-gray-900">{category.category}</h2>
            {category.subcategory && (
              <p className="text-sm text-gray-600">{category.subcategory}</p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">
            {checkedCount} / {totalCount}
          </p>
          <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${totalCount === 0 ? 0 : (checkedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>
      </button>

      {/* コンテンツ */}
      {isExpanded && (
        <div className="px-6 py-4">
          {/* チェックリスト項目 */}
          <div className="space-y-3 mb-4">
            {category.items.map((item) => (
              <ChecklistItem
                key={item.id}
                item={item}
                checked={checkedItems[item.id] || false}
                onCheck={onCheck}
              />
            ))}
          </div>

          {/* メモ欄 */}
          <div className="border-t border-gray-200 pt-4">
            <button
              onClick={() => setShowMemo(!showMemo)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {showMemo ? 'メモを閉じる' : 'メモを追加'}
            </button>
            {showMemo && (
              <textarea
                value={memo}
                onChange={(e) => onMemoChange(e.target.value)}
                placeholder="このカテゴリについて自由にメモを入力できます..."
                className="w-full mt-3 p-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
