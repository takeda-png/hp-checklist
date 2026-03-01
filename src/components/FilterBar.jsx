export default function FilterBar({ filterPriority, onFilterChange, onReset }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterPriority === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            すべて
          </button>
          <button
            onClick={() => onFilterChange('高')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterPriority === '高'
                ? 'bg-red-600 text-white'
                : 'bg-red-100 text-red-900 hover:bg-red-200'
            }`}
          >
            優先度：高
          </button>
          <button
            onClick={() => onFilterChange('中')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterPriority === '中'
                ? 'bg-yellow-600 text-white'
                : 'bg-yellow-100 text-yellow-900 hover:bg-yellow-200'
            }`}
          >
            優先度：中
          </button>
          <button
            onClick={() => onFilterChange('低')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterPriority === '低'
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-900 hover:bg-green-200'
            }`}
          >
            優先度：低
          </button>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 rounded-lg font-medium bg-gray-300 text-gray-900 hover:bg-gray-400 transition-colors"
        >
          リセット
        </button>
      </div>
    </div>
  )
}
