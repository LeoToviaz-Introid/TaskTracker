import { serverRequest } from "@/app/server-api";
import Header from "@/components/Header";
import HighPriorityTasksList from "@/components/HighPriorityTasksList";
import RecentProjects from "@/components/RecentProjects";

export default async function Page() {
  const stats = await getStats();

  return (
    <>
      <Header title={<h1 className="text-2xl">Inicio</h1>}/>
      {/** --------===== fila 1 =====-------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 bg-gray-900 grow-4 gap-0">
        {/** Primer elemento (1/3 de ancho en escritorio / 100% en pantallas menores) */}
        <div className="lg:col-span-1">
          {/** Total de proyectos */}
          <div className="bg-gray-950 border border-green-500 lg:m-10 p-5">
            <h3 className="text-3xl font-bold text-white mt-1">{stats.total_projects}</h3>
            <div>
              <p className="text-sm font-medium text-gray-300">
                Total de Proyectos
              </p>
            </div>
          </div>
        </div>
        {/** Segundo elemento (2/3 de ancho en escritorio / 100% en pantallas menores) */}
        <div className="lg:col-span-2">
          {/** Tareas: 3 columnas en desktop/tablet, 1 columna (apiladas) en móvil */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 lg:mr-10">
            {/* Tareas en Total */}
            <div className="bg-gray-950 border border-green-500 lg:mt-10 lg:mb-20 p-5">
              <h3 className="text-3xl font-bold text-white mt-1">{stats.total_tasks}</h3>
              <p className="text-sm font-medium text-gray-300">
                Tareas en Total
              </p>
            </div>
            {/* Tareas pendientes */}
            <div className="bg-gray-950 border border-green-500 lg:mt-10 lg:mb-20 p-5">
              <div>
                <h3 className="text-3xl font-bold text-white mt-1">{stats.pending_tasks}</h3>
                <p className="text-sm font-medium text-gray-300">
                  Tareas Pendientes
                </p>
              </div>
            </div>
            {/* Tareas completadas */}
            <div className="bg-gray-950 border border-green-500 lg:mt-10 lg:mb-20 p-5">
              <div>
                <h3 className="text-3xl font-bold text-white mt-1">{stats.completed_tasks}</h3>
                <p className="text-sm font-medium text-gray-300">
                  Tareas Completadas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/** --------===== fila 2 =====-------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start bg-gray-900 grow-5 lg:gap-10 lg:px-10 pb-10">
        <RecentProjects />
        <HighPriorityTasksList />
      </div>
    </>
  );
}

async function getStats() {
  const res = await serverRequest("/stats/", "GET", undefined, "stats");
  return res.error
    ? { total_projects: "-", total_tasks: "-", pending_tasks: "-", completed_tasks: "-" }
    : res;
}
