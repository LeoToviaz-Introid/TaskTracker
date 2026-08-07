import { Info, Pencil, Trash2 } from "lucide-react";

export default function TablaProyectos() {
  const proyectos = [
    { id: 1, nombre: "Rediseño Web", estado: "En Proceso", fecha: "2026-03-15", },
    { id: 2, nombre: "App Móvil", estado: "Completado", fecha: "2026-02-10" },
  ];

  return (
    <div className="w-full">
      {/*Como las tablas no se ven bien en móviles, esta se convierte en un conjunto de tarjetas*/}
      <table className="w-full text-left border-collapse block ml-4 md:table">
        <thead className="hidden md:table-header-group border border-white bg-zinc-800/80 text-white">
          <tr className="block md:table-row">
            <th className="p-3 block md:table-cell">Proyecto</th>
            <th className="p-3 block md:table-cell">Acciones</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group text-white">
          {proyectos.map((proy) => (
            <tr
              key={proy.id}
              className="bg-emerald-400 border border-white mb-4 p-4 block md:table-row md:mb-0 md:p-0 md:border-b"
            >
              <td className="p-2 md:p-3 md:table-cell flex justify-between md:justify-start">
                <span className="font-bold md:hidden">Proyecto:</span>{" "}
                {proy.nombre}
              </td>
              <td className="p-2 md:p-3 flex items-center md:table-cell justify-between md:justify-start">
                <span className="font-bold md:hidden">Acciones: </span>
                <div className="flex items-center gap-4">
                  <button className="hover:opacity-80 transition-opacity cursor-pointer">
                    <Info className="w-5 h-5" />
                  </button>
                  <button className="hover:opacity-80 transition-opacity cursor-pointer">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button className="hover:opacity-80 transition-opacity cursor-pointer">
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
