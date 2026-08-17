"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

import { Plus } from "lucide-react";
import { X } from "lucide-react";

import { refreshTag } from "@/app/actions";

export default function NewProjectButton({ text = "Nuevo Proyecto" }) {
  // true cuando este siendo mostrado el popup de nuevo proyecto y false en caso contrario
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="bg-emerald-400 hover:bg-emerald-500 text-zinc-900 font-medium px-4 py-2 flex items-center gap-2 border border-emerald-500 cursor-pointer"
      >
        {text} <Plus className="w-5 h-5" />
      </button>

      <NewProjectPopup
        formTitle={text}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
}

function NewProjectPopup({ formTitle, isOpen, onClose }) {
  // estos check ayudan a verificar que el componente no se renderice
  // fuera del navegador, intentar acceder a document.body causará error
  if (!isOpen || typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-zinc-800 p-6 text-white shadow-xl border border-zinc-700 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-zinc-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-semibold mb-4">{formTitle}</h3>
        <NewProjectForm onClose={onClose} />
      </div>
    </div>,
    document.body,
  );
}

function NewProjectForm({ onClose }) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  // true mientras se este enviando la petición al servidor, el botón de enviar
  // se desactiva mientras la petición este en progreso
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      name: projectName,
      description: projectDescription,
    };
    console.log(data);

    const response = await fetch("http://localhost:8000/projects/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok)
      throw new Error(`Error al el proyecto: ${response.statusText}`);

    const createdProject = await response.json();
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
          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500"
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
          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500"
        />
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-sm font-medium cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-900 text-sm font-semibold cursor-pointer"
        >
          {isSubmitting ? "Guardando..." : "Enviar"}
        </button>
      </div>
    </form>
  );
}
