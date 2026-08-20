export default function TaskList({ title, tasks }) {
  return (
    <div className="w-full max-w-md max-h-140 flex flex-col bg-gray-800/80 border border-white hover:border-emerald-300/80 transition-all delay-75 ease-in-out p-5">
      <h3 className="text-lg font-medium text-white mb-4">{title}</h3>
      <hr className="text-white py-2" />
      <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-200">
        {tasks.map((el) => (
          <div
            key={el.id}
            data-task-id={el.id}
            className={`draggable-task touch-none select-none flex items-center justify-between text-sm cursor-grab active:cursor-grabbing`}
          >
            <span
              className={`
                 font-medium p-1 border border-white/20 hover:bg-blue-100/20 w-full
                ${
                  el.priority === "high"
                    ? "text-red-100"
                    : el.priority === "medium"
                      ? "text-yellow-100"
                      : "text-blue-100"
                }
                whitespace-nowrap
              `}
            >
              {el.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
