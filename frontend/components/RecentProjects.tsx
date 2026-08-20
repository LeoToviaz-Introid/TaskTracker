const proyectosDB = [
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
  { id: 11, nombre: "Proyecto Ignorado 11", completadas: 0, total: 10 },
  { id: 12, nombre: "Proyecto Ignorado 12", completadas: 0, total: 10 },
  { id: 13, nombre: "Proyecto Ignorado 13", completadas: 0, total: 10 },
  { id: 14, nombre: "Proyecto Ignorado 14", completadas: 0, total: 10 },
  { id: 15, nombre: "Proyecto Ignorado 15", completadas: 0, total: 10 },
];

export default function RecentProjects() {
  // Se limitan los proyectos a 10 en el ciente, el endpoint API real realizará el filtrado en el servidor una vez sea implementado
  const proyectos = proyectosDB.slice(0, 10);

  return (
    <div className="w-full bg-gray-900 border border-gray-600 hover:border-green-400 transition-colors duration-150 p-5 ">
      <h3 className="text-lg font-medium text-white mb-4">Proyectos Recientes</h3>
      <div className="max-h-48 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
        {proyectos.map((item) => (
          <div
            key={item.id}
            className="flex items-baseline justify-between text-sm"
          >
            <span className="font-medium text-white whitespace-nowrap">{item.nombre}</span>
            <div className="flex-1 mx-3 border-b-2 border-dotted border-pink-500" />
            <span className="text-white font-normal whitespace-nowrap">{item.completadas}/{item.total.toLocaleString()} tareas</span>
          </div>
        ))}
      </div>
    </div>
  );
}
