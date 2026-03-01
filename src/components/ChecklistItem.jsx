const priorityColors = {
  高: { bg: 'bg-red-100', text: 'text-red-800', badge: 'bg-red-600' },
  中: { bg: 'bg-yellow-100', text: 'text-yellow-800', badge: 'bg-yellow-600' },
  低: { bg: 'bg-green-100', text: 'text-green-800', badge: 'bg-green-600' },
}

export default function ChecklistItem({ item, checked, onCheck }) {
  const colors = priorityColors[item.priority]

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
        checked ? 'bg-gray-100' : 'bg-gray-50'
      } hover:bg-white border border-gray-200`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onCheck(item.id)}
        className="w-5 h-5 mt-1 cursor-pointer accent-blue-600"
      />
      <div className="flex-1">
        <p
          className={`${checked ? 'text-gray-500 line-through' : 'text-gray-900'} ${
            checked ? '' : 'font-medium'
          }`}
        >
          {item.title}
        </p>
      </div>
      <span className={`px-3 py-1 rounded-full text-white text-sm font-medium whitespace-nowrap ${colors.badge}`}>
        {item.priority}
      </span>
    </div>
  )
}
