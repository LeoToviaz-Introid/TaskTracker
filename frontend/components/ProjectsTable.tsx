import { Info, Pencil, Trash2 } from "lucide-react";

export default async function ProjectsTable() {
  const proyectos = [
    { id: 1, nombre: "Rediseño Web", estado: "En Proceso", fecha: "2026-03-15", },
    { id: 2, nombre: "App Móvil", estado: "Completado", fecha: "2026-02-10" },
  ];
  const proyectosReales = await getProjects();
  console.log("proeyctos simulados, " + proyectos)
  console.log("proeyctos reales, " + proyectosReales)

  return (
    <div className="w-full">
      {/*Como las tablas no se ven bien en móviles, esta se convierte en un conjunto de tarjetas*/}
      <table className="w-full text-left border-collapse block ml-4 md:table">
        <thead className="hidden border border-white bg-zinc-800/80 text-white md:table-header-group">
          <tr className="block md:table-row">
            <th className="p-3 block md:table-cell">Proyecto</th>
            <th className="p-3 block md:table-cell md:text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="block text-white md:table-row-group">
          {proyectos.map((el) => (
            <tr
              key={el.id}
              className="bg-emerald-400 border border-white mb-4 p-4 block md:table-row md:mb-0 md:p-0 md:border-b"
            >
              <td className="p-2 flex justify-between border-b border-white md:border-b-0 md:p-3 md:table-cell md:justify-start">
                <span className="font-bold md:hidden">Proyecto:</span>{" "}
                {el.nombre}
              </td>
              <td className="p-2  flex items-center justify-between md:p-3 md:table-cell">
                <span className="font-bold md:hidden">Acciones: </span>
                <div className="flex items-center gap-4 md:justify-end">
                  <button
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                    onClick={() => console.log("ver")}
                  >
                    <Info className="w-5 h-5" />
                  </button>
                  <button
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                    onClick={() => console.log("editar")}
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                    onClick={() => console.log("borrar")}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

async function getProjects() {
  // obtener datos de API proyectos
  const res = await fetch("http://localhost:8000/projects", {
    method: "GET",
    next: { tags: ["projects"] },
  });
  if (!res.ok) throw new Error("Error al obtener los proyectos");
  return res.json();
}
