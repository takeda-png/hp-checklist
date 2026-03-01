import { useState, useEffect } from 'react'
import { checklistData } from './data/checklist'

function App() {
  const [checkedItems, setCheckedItems] = useState({})

  useEffect(() => {
    const saved = localStorage.getItem('hp-checklist-state')
    if (saved) setCheckedItems(JSON.parse(saved))
  }, [])

  return (
    <div style={{ padding: '20px', backgroundColor: '#e3f2fd', minHeight: '100vh' }}>
      <h1>HP公開チェックリスト</h1>
      <p>カテゴリ: {checklistData.length}</p>
      <p>アイテム: {checklistData.reduce((sum, cat) => sum + cat.items.length, 0)}</p>
    </div>
  )
}

export default App
