export default function HighPriorityTasksList({ tasks }) {
  return (
    <div className="w-full bg-gray-900 border border-gray-600 hover:border-green-400 transition-colors duration-150 p-5">
      <h3 className="text-lg font-medium text-white mb-4">Tareas Urgentes</h3>
      <div className="max-h-48 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-slate-200">
        {tasks.map((item) => (
          <div
            key={item.id}
            className="pb-2 border-b border-dotted border-gray-600 last:border-none text-sm flex items-center gap-1.5"
          >
            <span className="text-white font-normal">{item.project_name}</span>
            <span className="text-pink-500">-&gt;</span>
            <span className="text-white font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
