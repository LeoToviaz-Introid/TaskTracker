import { serverRequest } from "@/app/server-api";

import ProjectActions from "./ProjectActions";

export default async function ProjectsTable() {
  const proyectos = await getProjects();

  return (
    <div className="w-full">
      {/*Como las tablas no se ven bien en móviles, esta se convierte en un conjunto de tarjetas*/}
      <table className="w-full text-left border-collapse block ml-4 md:table">
        <thead className="hidden border border-white bg-black text-white md:table-header-group">
          <tr className="block md:table-row">
            <th className="p-3 block md:table-cell">Proyecto</th>
            <th className="p-3 block md:table-cell md:text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="block text-white md:table-row-group">
          {proyectos.map((el) => (
            <tr
              key={el.id}
              className="bg-gray-800 border-gray-700 border mb-4 p-4 block md:table-row md:mb-0 md:p-0 md:border-b"
            >
              <td className="p-2 flex justify-between border-b md:border-b-0 md:p-3 md:table-cell md:justify-start">
                <span className="font-bold md:hidden">Proyecto:</span>{" "}
                {el.name}
              </td>
              <td className="p-2 flex items-center justify-between md:p-3 md:table-cell">
                <span className="font-bold md:hidden">Acciones: </span>
                <div className="flex items-center gap-4 md:justify-end">
                  <ProjectActions project={el}/>
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
  // obtener proyectos
  const res = await serverRequest("/projects/", "GET", undefined, "projects");
  if (res.error) return [];
  return res;
}
