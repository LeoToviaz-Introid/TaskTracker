import { request } from "@/app/api";
import Header from "@/components/Header";
import NewTaskButton from "@/components/NewTaskButton";
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
        button={<NewTaskButton/>}
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
  const res = await request(`/projects/${id}/`, "GET", undefined, "project");
  if (res.error) return {};
  return res;
}
async function getProjectTasks(id) {
  // obtener tareas de un proyecto
  const res = await request(`/projects/${id}/tasks/`, "GET", undefined, "project-tasks");
  if (res.error) return [];
  return res;
}
