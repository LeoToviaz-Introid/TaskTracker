import Header from "@/components/Header";
import NewModelButton from "@/components/NewModelButton";
import TaskList from "@/components/TaskList";

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const project = await getProject(id);
  const projectTasks = await getProjectTasks(id);

  const pendingTasks = projectTasks.filter((el) => el.estado === "pending");
  const inProgressTasks = projectTasks.filter((el) => el.estado === "in_progress");
  const completedTasks = projectTasks.filter((el) => el.estado === "completed");

  return (
    <>
      <Header
        title={<h2>{project.name}</h2>}
        text={`${completedTasks.length}/${projectTasks.length}`}
        button={
          <NewModelButton
            text="Nueva Tarea"
            placeholder="Escribe el nombre de la tarea"
          />
        }
        description={
          <p className="text-sm text-zinc-700">{project.description}</p>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-blue-50 p-4">
        <div className="bg-rose-400 p-2">
          <TaskList
            title="Por hacer"
            tasks={pendingTasks}
          />
        </div>
        <div className="bg-indigo-500 p-2">
          <TaskList
            title="En progreso"
            tasks={inProgressTasks}
          />
        </div>
        <div className="bg-gray-700 text-white p-2">
          <TaskList
            title="Completadas"
            tasks={completedTasks}
          />
        </div>
      </div>
    </>
  );
}

async function getProject(id) {
  // obtener detalles de un proyecto
  const res = await fetch(`http://localhost:8000/projects/${id}/`, {
    method: "GET",
    next: { tags: ["project"] },
  });
  if (!res.ok) throw new Error("Error al obtener los proyectos");
  return res.json();
}
async function getProjectTasks(id) {
  // obtener tareas de un proyecto
  const res = await fetch(`http://localhost:8000/projects/${id}/tasks/`, {
    method: "GET",
    next: { tags: ["project-tasks"] },
  });
  if (!res.ok) throw new Error("Error al obtener las tareas del proyecto");
  return res.json();
}
