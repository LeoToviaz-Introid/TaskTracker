export default function ProjectsList({ projects }) {
  return (
    <div className="w-full bg-gray-900 border border-gray-600 hover:border-green-400 transition-colors duration-150 p-5 ">
      <h3 className="text-lg font-medium text-white mb-4">Mis Proyectos</h3>
      <div className="max-h-48 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
        {projects.map((item) => (
          <div
            key={item.id}
            className="flex items-baseline justify-between text-sm"
          >
            <span className="font-medium text-white whitespace-nowrap">{item.name}</span>
            <div className="flex-1 mx-3 border-b-2 border-dotted border-pink-500" />
            <span className="text-white font-normal whitespace-nowrap">{item.completed_tasks}/{item.total_tasks.toLocaleString()} tareas</span>
          </div>
        ))}
      </div>
    </div>
  );
}
