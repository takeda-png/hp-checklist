export default function StatsBar({ completed, total }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">完了状況</p>
          <p className="text-4xl font-bold text-blue-600">
            {completed} <span className="text-xl text-gray-400">/ {total}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-600 text-sm mb-2">進捗率</p>
          <div className="w-40 bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{percentage}%</p>
        </div>
      </div>
    </div>
  )
}
