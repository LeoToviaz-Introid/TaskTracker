"use client";

import Header from "@/components/Header";
import NewModelButton from "@/components/NewModelButton";
import TaskList from "@/components/TaskList";

export default function Page() {
  return (
    <>
      <Header
        title={<h2>(Nombre Proyecto)</h2>}
        text={"X/Y"}
        button={
          <NewModelButton
            text="Nueva Tarea"
            placeholder="Escribe el nombre de la tarea"
          />
        }
        description={
          <p className="text-sm text-zinc-700">
            Descripcion de prueba... Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Adipisci sapiente eum iure, nihil voluptates ullam
            neque consequuntur quis magnam quasi maxime repellendus, laborum,
            pariatur deserunt repudiandae omnis aperiam ad commodi.
          </p>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-blue-50 p-4">
        <div className="bg-rose-400 p-2">
          <TaskList titulo="Por hacer" />
        </div>
        <div className="bg-indigo-500 p-2">
          <TaskList titulo="En progreso" />
        </div>
        <div className="bg-gray-700 text-white p-2">
          <TaskList titulo="Completadas" />
        </div>
      </div>
    </>
  );
}
