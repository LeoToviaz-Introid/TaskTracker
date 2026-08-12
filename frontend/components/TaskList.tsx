const tareasDB = [
  { id: 1, nombre: "TrackTracker", completadas: 14, total: 61 },
  { id: 2, nombre: "Aivat 3000", completadas: 20, total: 2000 },
  { id: 3, nombre: "E-Commerce App", completadas: 5, total: 12 },
  { id: 4, nombre: "Sistema de Inventarios", completadas: 45, total: 50 },
  { id: 5, nombre: "Landing Page Redesign", completadas: 8, total: 10 },
  { id: 6, nombre: "API Gateway", completadas: 12, total: 15 },
  { id: 7, nombre: "Módulo de Facturación", completadas: 3, total: 8 },
  { id: 8, nombre: "App Móvil iOS", completadas: 19, total: 20 },
  { id: 9, nombre: "Auditoría de Seguridad", completadas: 2, total: 5 },
  { id: 10, nombre: "Base de Datos Analytics", completadas: 1, total: 4 },
  // Este elemento 11 no se muestra en el componente debido al límite de 10
  { id: 11, nombre: "Tarea 11", completadas: 0, total: 10 },
  { id: 12, nombre: "Tarea 12", completadas: 0, total: 10 },
  { id: 13, nombre: "Tarea 13", completadas: 0, total: 10 },
  { id: 14, nombre: "Tarea 14", completadas: 0, total: 10 },
  { id: 15, nombre: "Tarea 15", completadas: 0, total: 10 },
  { id: 16, nombre: "Tarea 16", completadas: 0, total: 10 },
  { id: 17, nombre: "Tarea 17", completadas: 0, total: 10 },
  { id: 18, nombre: "Tarea 18", completadas: 0, total: 10 },
  { id: 19, nombre: "Tarea 19", completadas: 0, total: 10 },
  { id: 20, nombre: "Tarea 20", completadas: 0, total: 10 },
  { id: 21, nombre: "Tarea 21", completadas: 0, total: 10 },
  { id: 22, nombre: "Tarea 22", completadas: 0, total: 10 },
];

export default function TaskList({titulo}) {
  // Se limitan los proyectos a 10 en el ciente, el endpoint API real realizará el filtrado en el servidor una vez sea implementado
  const proyectos = tareasDB.slice(0, 20);

  return (
    <div className="w-full max-w-md max-h-140 flex flex-col bg-gray-800/80 border border-white hover:border-emerald-300/80 transition-all delay-75 ease-in-out p-5">
      <h3 className="text-lg font-medium text-white mb-4">
        {titulo}
      </h3>
      <hr className="text-white py-2" />
      <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
        {proyectos.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-sm"
          >
            <span className="font-medium text-white whitespace-nowrap">{item.nombre}</span>
            <div className="flex-1 mx-3 border-b-2 border-dotted border-emerald-500 self-end mb-1" />
            <span className="text-white font-normal whitespace-nowrap">{item.completadas}/{item.total} tareas</span>
          </div>
        ))}
      </div>
    </div>
  );
}
