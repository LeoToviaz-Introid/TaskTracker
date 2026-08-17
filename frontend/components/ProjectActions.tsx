"use client";

import Link from "next/link";

import { Info, Trash2 } from "lucide-react";

import { refreshTag } from "@/app/actions";

import CreateEditProjectButton from "./CreateEditProjectButton";

/**
 * Conjunto de íconos pulsables (botones) para realizar operaciones CRUD sobre un proyecto en específico.
 * Este componente se hizo ya que dejar funciones de cliente en el componente padre ProjectsTable
 * causaba un bucle infinito de peticiones (al mezclar lógica de servidor y lógica de cliente).
 * Se decidió crear este componente en lugar de cambiar el componente padre ProjectsTable a un componente
 * del cliente para mantener el caché de Next y una sintaxis más limpia.
 * 
 * @example
 * <ProjectActions />
 */
export default function ProjectActions({project}) {
  const deleteProject = async () => {
    if (!confirm("¿Eliminar proyecto?")) return;
    const res = await fetch(`http://localhost:8000/projects/${project.id}/`, {
      method: "DELETE",
    });
    if (res.ok) refreshTag("projects");
  };

  return (
    <>
      <button
        className="hover:opacity-80 transition-opacity cursor-pointer"
      >
        <Link href={`/projects/${project.id}`}><Info className="w-5 h-5" /></Link>
      </button>
      <button
        className="hover:opacity-80 transition-opacity cursor-pointer"
        onClick={() => console.log("editar")}
      >
        <CreateEditProjectButton project={project} />
      </button>
      <button
        className="hover:opacity-80 transition-opacity cursor-pointer"
        onClick={deleteProject}
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </>
  );
}
