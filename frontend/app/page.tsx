import ProyectosRecientes from "@/components/ProyectosRecientes";
import TareasUrgentes from "@/components/TareasUrgentes";

export default function Page() {
  return (
    <div className="flex flex-col h-screen text-white">
      {/** --------===== fila 1 =====-------- */}
      <div className="flex flex-col justify-center bg-zinc-700 grow-2">
        <h2 className="text-2xl ml-6">Inicio</h2>
      </div>
      {/** --------===== fila 1 =====-------- */}
      {/** --------===== fila 2 =====-------- */}
      <div className="flex bg-zinc-700 grow-4">
        <div className="flex flex-1 grow">
          {/** -------- total de proyectos -------- */}
          <div className="flex flex-col flex-1 self-start bg-zinc-800/80 border border-emerald-500 m-10 p-5">
            <h3 className="text-3xl font-bold text-white mt-1">5</h3>
            <div>
              <p className="text-sm font-medium text-zinc-200">
                Total de Proyectos
              </p>
            </div>
          </div>
          {/** div relleno */}
          <div className="flex-1"></div>
          {/** div relleno */}
          {/** -------- total de proyectos -------- */}
        </div>
        <div className="flex flex-1 flex-col">
          {/** -------- tareas en total/pendientes/completadas -------- */}
          <div className="flex items-stretch flex-1 grow-4 mr-10">
            {/* Tareas en Total */}
            <div className="flex flex-1 flex-col bg-zinc-800/80 border border-emerald-500 mt-10 mb-20 p-5">
              <h3 className="text-3xl font-bold text-zinc-100 mt-1">5</h3>
              <p className="text-sm font-medium text-zinc-200">
                Tareas en Total
              </p>
            </div>
            {/* Tareas pendientes */}
            <div className="flex flex-1 flex-col bg-zinc-800/80 border border-emerald-500 mt-10 mb-20 p-5">
              <div>
                <h3 className="text-3xl font-bold text-zinc-100 mt-1">5</h3>
                <p className="text-sm font-medium text-zinc-200">
                  Tareas Pendientes
                </p>
              </div>
            </div>
            {/* Tareas completadas */}
            <div className="flex flex-1 flex-col bg-zinc-800/80 border border-emerald-500 mt-10 mb-20 p-5">
              <div>
                <h3 className="text-3xl font-bold text-zinc-100 mt-1">5</h3>
                <p className="text-sm font-medium text-zinc-200">
                  Tareas Completadas
                </p>
              </div>
            </div>
          </div>
          {/** div relleno */}
          <div className="flex-1"></div>
          {/** div relleno */}
          {/** -------- tareas en total/pendientes/completadas -------- */}
        </div>
      </div>
      {/** --------===== fila 2 =====-------- */}
      {/** --------===== fila 3 =====-------- */}
      <div className="flex bg-zinc-700 grow-5">
        <div className="grow-5">
          <ProyectosRecientes />
        </div>
        <div className="grow-5">
          <TareasUrgentes />
        </div>
      </div>
      {/** --------===== fila 3 =====-------- */}
    </div>
  );
}
