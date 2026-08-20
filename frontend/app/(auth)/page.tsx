import Header from "@/components/Header";
import HighPriorityTasksList from "@/components/HighPriorityTasksList";
import RecentProjects from "@/components/RecentProjects";

export default function Page() {
  return (
    <>
      <Header title={<h1 className="text-2xl">Inicio</h1>}/>
      {/** --------===== fila 1 =====-------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 bg-zinc-700 grow-4 gap-0">
        {/** Primer elemento (1/3 de ancho en escritorio / 100% en pantallas menores) */}
        <div className="lg:col-span-1">
          {/** Total de proyectos */}
          <div className="bg-zinc-800/80 border border-emerald-500 lg:m-10 p-5">
            <h3 className="text-3xl font-bold text-white mt-1">5</h3>
            <div>
              <p className="text-sm font-medium text-zinc-200">
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
            <div className="bg-zinc-800/80 border border-emerald-500 lg:mt-10 lg:mb-20 p-5">
              <h3 className="text-3xl font-bold text-zinc-100 mt-1">5</h3>
              <p className="text-sm font-medium text-zinc-200">
                Tareas en Total
              </p>
            </div>
            {/* Tareas pendientes */}
            <div className="bg-zinc-800/80 border border-emerald-500 lg:mt-10 lg:mb-20 p-5">
              <div>
                <h3 className="text-3xl font-bold text-zinc-100 mt-1">5</h3>
                <p className="text-sm font-medium text-zinc-200">
                  Tareas Pendientes
                </p>
              </div>
            </div>
            {/* Tareas completadas */}
            <div className="bg-zinc-800/80 border border-emerald-500 lg:mt-10 lg:mb-20 p-5">
              <div>
                <h3 className="text-3xl font-bold text-zinc-100 mt-1">5</h3>
                <p className="text-sm font-medium text-zinc-200">
                  Tareas Completadas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/** --------===== fila 2 =====-------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start bg-zinc-700 grow-5 lg:gap-10 lg:px-10 pb-10">
        <RecentProjects />
        <HighPriorityTasksList />
      </div>
    </>
  );
}
