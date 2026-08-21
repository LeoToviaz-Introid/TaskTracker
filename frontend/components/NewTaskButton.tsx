"use client";

import { useEffect } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";

import { Plus } from "lucide-react";
import { X } from "lucide-react";

import { refreshTag } from "@/app/actions";
import { request } from "@/app/api"

export default function NewTaskButton({ text = "Nueva Tarea", projectId }) {
  // true cuando este siendo mostrado el popup de nuevo proyecto y false en caso contrario
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-4 py-2 flex items-center gap-2 border border-pink-600 cursor-pointer"
      >
        {text} <Plus className="w-5 h-5" />
      </button>

      <NewTaskPopup
        projectId={projectId}
        formTitle={text}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
}

function NewTaskPopup({ formTitle, projectId, isOpen, onClose }) {
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
        <h3 className="text-xl font-semibold mb-4">{formTitle}</h3>
        <NewTaskForm projectId={projectId} onClose={onClose} />
      </div>
    </div>,
    document.body,
  );
}

function NewTaskForm({ projectId, onClose }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  //const [taskProjectId, setTaskProjectId] = useState("");
  const [taskEstado, setTaskEstado] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");

  const [projects, setProjects] = useState([]);
  // true mientras aun no hayan sido cargados en memoria los proyectos disponibles,
  // una vez que cargan los proyectos, la variable cambia a false
  // el contenido renderizado en el formulario cambia dependiendo de este estado
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const res = await request("/projects/", "GET", undefined, "projects");
      if (res.error) {
        alert("error - " + res.msg);
        setLoadingProjects(false);
        return;
      }
      setProjects(res);
      setLoadingProjects(false);
    }

    fetchProjects();
  }, []);

  // true mientras se este enviando la petición al servidor, el botón de enviar
  // se desactiva mientras la petición este en progreso
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(projectId);
    const data = {
      name: taskName,
      description: taskDescription,
      project: Number(projectId),
      estado: taskEstado,
      priority: taskPriority,
      due_date: taskDueDate,
    };
    console.log(data);

    const res = await request("/tasks/", "POST", data, undefined);
    if (res.error) {
      alert("error - " + res.msg);
      setIsSubmitting(false);
      return;
    }
    console.log("Tarea creada exitosamente:", res);

    // limpiar el formulario y cerrar
    setTaskName("");
    setTaskDescription("");
    setTaskEstado("");
    setTaskPriority("");
    setTaskDueDate("");
    onClose();
    refreshTag("project-tasks");
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
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Escribe el nombre de la tarea"
          className="w-full px-3 py-2 bg-black border border-gray-600 text-white focus:outline-none focus:border-pink-500"
        />
        {/* -------- Description -------- */}
        <label className="block text-sm font-medium mt-1 mb-1">
          Descripción
        </label>
        <input
          type="text"
          required
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Escribe la descripción"
          className="w-full px-3 py-2 bg-black border border-gray-600 text-white focus:outline-none focus:border-pink-500"
        />
        {/* -------- Estado -------- */}
        <label className="block text-sm font-medium mt-1 mb-1">Estado</label>
        <select
          required
          value={taskEstado}
          onChange={(e) => setTaskEstado(e.target.value)}
          className="w-full px-3 py-2 bg-black border border-gray-600 text-white focus:outline-none focus:border-pink-500 cursor-pointer"
        >
          <option value="" disabled>
            Selecciona un estado
          </option>
          <option value="pending">Pendiente</option>
          <option value="in_progress">En Progreso</option>
          <option value="completed">Completado</option>
        </select>
        {/* -------- Prioridad -------- */}
        <label className="block text-sm font-medium mt-1 mb-1">Prioridad</label>
        <select
          required
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
          className="w-full px-3 py-2 bg-black border border-gray-600 text-white focus:outline-none focus:border-pink-500 cursor-pointer"
        >
          <option value="" disabled>
            Selecciona la prioridad
          </option>
          <option value="high">Alta</option>
          <option value="medium">Media</option>
          <option value="low">Baja</option>
        </select>
        {/* -------- Fecha de Vencimiento -------- */}
        <label className="block text-sm font-medium mt-1 mb-1">
          Fecha de Vencimiento
        </label>
        <input
          type="date"
          required
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
          className="w-full px-3 py-2 bg-black border border-gray-600 text-white focus:outline-none focus:border-pink-500 [color-scheme:dark]"
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
