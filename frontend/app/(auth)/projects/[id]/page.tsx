import { serverRequest } from "@/app/server-api";
import Header from "@/components/Header";
import KanbanBoard from "@/components/KanbanBoard";
import NewTaskButton from "@/components/NewTaskButton";

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const project = await getProject(id);
  const projectTasks = await getProjectTasks(id);
  const completedTasks = projectTasks.filter((el) => el.estado === "completed");

  return (
    <>
      <Header
        title={<h2>{project.name}</h2>}
        text={`${completedTasks.length}/${projectTasks.length}`}
        button={<NewTaskButton />}
        description={
          <p className="text-sm text-zinc-700">{project.description}</p>
        }
      />
      {/* re-renderizar automaticamente el componente cuando cambie projectTasks gracias a key */}
      <KanbanBoard  key={JSON.stringify(projectTasks)} projectTasks={projectTasks} projectId={id} />
    </>
  );
}

async function getProject(id) {
  // obtener detalles de un proyecto
  const res = await serverRequest(
    `/projects/${id}/`,
    "GET",
    undefined,
    "project",
  );
  if (res.error) return {};
  return res;
}
async function getProjectTasks(id) {
  // obtener tareas de un proyecto
  const res = await serverRequest(
    `/projects/${id}/tasks/`,
    "GET",
    undefined,
    "project-tasks",
  );
  if (res.error) return [];
  return res;
}
