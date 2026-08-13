"use client";

import { Info, Pencil, Trash2 } from "lucide-react";

/**
 * Conjunto de íconos pulsables (botones) para realizar operaciones CRUD sobre un proyecto en específico.
 * Este componente se hizo ya que dejar funciones de cliente en el componente padre ProjectsTable
 * causaba un bucle infinito de peticiones (al mezclar lógica de servidor y lógica de cliente).
 * Se decidió crear este componente en lugar de cambiar el componente padre ProjectsTable a un componente
 * del cliente para mantener el caché de Next y una sintaxis más limpia.
 * 
 * @example
 * <ProjectActions >
 */
export default function ProjectActions() {
  return (
    <>
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
    </>
  );
}
