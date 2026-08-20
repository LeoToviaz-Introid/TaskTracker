const tareasBD = [
  { id: 1, proyecto: "Proyecto 1", accion: "Hacer X" },
  { id: 2, proyecto: "TrackTracker", accion: "Hacer Y" },
  { id: 3, proyecto: "Aivat 3000", accion: "Optimizar consultas SQL" },
  { id: 4, proyecto: "E-Commerce App", accion: "Corregir pasarela de pago" },
  { id: 5, proyecto: "Sistema Inventarios", accion: "Actualizar dependencias" },
  { id: 6, proyecto: "Landing Page", accion: "Ajustar responsivo mobile" },
  { id: 7, proyecto: "API Gateway", accion: "Configurar CORS" },
  { id: 8, proyecto: "Módulo Facturación", accion: "Generar PDF de pruebas" },
  { id: 9, proyecto: "App iOS", accion: "Resolver crash en login" },
  { id: 10, proyecto: "Auditoría", accion: "Revisar tokens JWT" },
  { id: 11, proyecto: "TrackTracker", accion: "Añadir filtros de búsqueda" },
  { id: 12, proyecto: "Aivat 3000", accion: "Subir build a producción" },
  { id: 13, proyecto: "E-Commerce App", accion: "Integrar Webhooks" },
  { id: 14, proyecto: "Sistema Inventarios", accion: "Exportar reportes a Excel" },
  { id: 15, proyecto: "Landing Page", accion: "Cambiar assets a WebP" },
  { id: 16, proyecto: "API Gateway", accion: "Limitar Rate Limit" },
  { id: 17, proyecto: "Módulo Facturación", accion: "Validación de RFC" },
  { id: 18, proyecto: "App iOS", accion: "Probar en iOS 18" },
  { id: 19, proyecto: "Auditoría", accion: "Documentar vulnerabilidades" },
  { id: 20, proyecto: "Base de Datos", accion: "Crear respaldos automáticos" },
  // Este elemento 21 no se muestra en el componente debido al límite de 20
  { id: 21, proyecto: "Proyecto Extra", accion: "Tarea ignorada" },
];

export default function HighPriorityTasksList() {
  // Se limitan las tareas a 20 en el cliente, el endpoint API real realizará el filtrado en el servidor
  const tareas = tareasBD.slice(0, 20);

  return (
    <div className="w-full bg-zinc-800/80 border border-white hover:border-emerald-300/80 transition-colors duration-150 p-5">
      <h3 className="text-lg font-medium text-white mb-4">Tareas Urgentes</h3>
      <div className="max-h-48 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-slate-200">
        {tareas.map((item) => (
          <div
            key={item.id}
            className="pb-2 border-b border-dotted border-slate-200 last:border-none text-sm flex items-center gap-1.5"
          >
            <span className="text-white font-normal">{item.proyecto}</span>
            <span className="text-emerald-500">-&gt;</span>
            <span className="text-white font-medium">{item.accion}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
