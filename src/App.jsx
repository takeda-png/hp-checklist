import { useState, useEffect } from 'react'
import { checklistData } from './data/checklist'
import FilterBar from './components/FilterBar'
import StatsBar from './components/StatsBar'
import CategorySection from './components/CategorySection'

function App() {
  const [checkedItems, setCheckedItems] = useState({})
  const [memos, setMemos] = useState({})
  const [filterPriority, setFilterPriority] = useState('all')
  const [expandedCategories, setExpandedCategories] = useState({})

  // localStorage から初期データを読み込む
  useEffect(() => {
    const savedState = localStorage.getItem('hp-checklist-state')
    const savedMemos = localStorage.getItem('hp-checklist-memos')

    if (savedState) setCheckedItems(JSON.parse(savedState))
    if (savedMemos) setMemos(JSON.parse(savedMemos))

    // 最初はすべてのカテゴリを展開
    const initialExpanded = {}
    checklistData.forEach((cat) => {
      initialExpanded[cat.id] = true
    })
    setExpandedCategories(initialExpanded)
  }, [])

  // checkedItems を localStorage に保存
  useEffect(() => {
    localStorage.setItem('hp-checklist-state', JSON.stringify(checkedItems))
  }, [checkedItems])

  // memos を localStorage に保存
  useEffect(() => {
    localStorage.setItem('hp-checklist-memos', JSON.stringify(memos))
  }, [memos])

  const handleCheck = (itemId) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  const handleMemoChange = (categoryId, text) => {
    setMemos((prev) => ({
      ...prev,
      [categoryId]: text,
    }))
  }

  const handleReset = () => {
    if (window.confirm('すべてのチェックをリセットしますか？')) {
      setCheckedItems({})
    }
  }

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  // フィルタリング済みのカテゴリデータを作成
  const filteredData = checklistData.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) => filterPriority === 'all' || item.priority === filterPriority
    ),
  })).filter((cat) => cat.items.length > 0)

  // 完了数を計算
  const totalItems = checklistData.reduce((sum, cat) => sum + cat.items.length, 0)
  const completedItems = Object.values(checkedItems).filter(Boolean).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HP公開チェックリスト</h1>
          <p className="text-gray-600">
            HP公開前に確認すべき45項目のチェックリストです。すべての項目をチェックして、完璧なHP公開を目指しましょう。
          </p>
        </div>

        {/* 統計情報バー */}
        <StatsBar completed={completedItems} total={totalItems} />

        {/* フィルタバー */}
        <FilterBar
          filterPriority={filterPriority}
          onFilterChange={setFilterPriority}
          onReset={handleReset}
        />

        {/* チェックリスト */}
        <div className="space-y-4">
          {filteredData.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-600 text-lg">
                選択された優先度に該当する項目がありません
              </p>
            </div>
          ) : (
            filteredData.map((category) => (
              <CategorySection
                key={category.id}
                category={category}
                isExpanded={expandedCategories[category.id]}
                onToggle={() => toggleCategory(category.id)}
                checkedItems={checkedItems}
                onCheck={handleCheck}
                memo={memos[category.id] || ''}
                onMemoChange={(text) => handleMemoChange(category.id, text)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
