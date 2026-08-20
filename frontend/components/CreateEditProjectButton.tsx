"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

import { Pencil } from "lucide-react";
import { Plus } from "lucide-react";
import { X } from "lucide-react";

import { refreshTag } from "@/app/actions";
import { request } from "@/app/api"

/**
 * Este componente renderiza un botón que al pulsarlo, crea un modal con un formulario dentro para crear un nuevo
 * proyecto en la base de datos.
 * 
 * El parámetro project definirá como verdadera la variable editing en caso de que no sea nulo,
 * dependiendo del valor de la variable editing, el componente cambiará ligeramente su renderizado
 * y funcionamiento. Esto debido a que el componente se adaptó para funcionar para tanto la operación GET como PUT de un proyecto.
 */
export default function CreateEditProjectButton({project}) {
  // true cuando este siendo mostrado el popup de nuevo proyecto y false en caso contrario
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const editing = Boolean(project);

  return (
    <>
      {editing ? (
        <Pencil
          className="w-5 h-5"
          onClick={() => setIsPopupOpen(true)} />
      ) : (
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-4 py-2 flex items-center gap-2 border border-pink-600 cursor-pointer"
        >
          {"Nuevo Proyecto"} <Plus className="w-5 h-5" />
        </button>
      )}

      <NewProjectPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        editing={editing}
        project={project}
      />
    </>
  );
}

function NewProjectPopup({ isOpen, onClose, editing, project }) {
  // estos check ayudan a verificar que el componente no se renderice
  // fuera del navegador, intentar acceder a document.body causará error
  if (!isOpen || typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-gray-900 p-6 text-white shadow-xl border border-gray-600 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-pink-300 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-semibold mb-4">{editing ? "Editar Proyecto" : "Nuevo Proyecto"}</h3>
        <ProjectForm
          onClose={onClose}
          editing={editing}
          project={project}
        />
      </div>
    </div>,
    document.body,
  );
}

function ProjectForm({ onClose, editing, project }) {
  const [projectName, setProjectName] = useState(project ? project.name : "");
  const [projectDescription, setProjectDescription] = useState(project ? project.description : "");

  // true mientras se este enviando la petición al servidor, el botón de enviar
  // se desactiva mientras la petición este en progreso
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const endpoint = editing ? `/projects/${project.id}/` : "/projects/";
    const method = editing ? "PUT" : "POST";
    const data = {
      name: projectName,
      description: projectDescription,
    };
    console.log(data);

    const res = await request(endpoint, method, data, undefined);
    if (res.error) {
      alert("error - " + res.msg);
      setIsSubmitting(false);
      return;
    }
    const createdProject = res;
    console.log("Proyecto creado exitosamente:", createdProject);

    // limpiar el formulario y cerrar
    setProjectName("");
    setProjectDescription("");
    onClose();
    refreshTag("projects");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        {/* -------- Name -------- */}
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          type="text"
          required
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Escribe el nombre del proyecto"
          className="w-full px-3 py-2 bg-black border border-gray-600 text-white focus:outline-none focus:border-pink-500"
        />
        {/* -------- Description -------- */}
        <label className="block text-sm font-medium mt-1 mb-1">
          Descripción
        </label>
        <input
          type="text"
          required
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="Escribe la descripción"
          className="w-full px-3 py-2 bg-black border border-gray-600 text-white focus:outline-none focus:border-pink-500"
        />
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-sm font-medium cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold cursor-pointer"
        >
          {isSubmitting ? "Guardando..." : "Enviar"}
        </button>
      </div>
    </form>
  );
}
