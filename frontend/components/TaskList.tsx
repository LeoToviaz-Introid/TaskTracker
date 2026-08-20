export default function TaskList({ title, tasks }) {
  return (
    <div className="w-full max-w-md max-h-140 flex flex-col bg-gray-900 border border-gray-600 hover:border-green-400 transition-all delay-75 ease-in-out p-5">
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
                 font-medium p-1 border border-gray-600 hover:bg-pink-500/20 w-full
                ${
                  el.priority === "high"
                    ? "text-pink-300"
                    : el.priority === "medium"
                      ? "text-green-300"
                      : "text-gray-300"
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
