"use client";

import { useEffect } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";

import { Plus } from "lucide-react";
import { X } from "lucide-react";

import TablaProyectos from "@/components/TablaProyectos";

export default function Page() {
  // true cuando este siendo mostrado el popup de nuevo proyecto y false en caso contrario
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="grid grid-rows-[1fr_3fr] h-screen">
      <div className="grid grid-cols-[3fr_1fr] bg-zinc-700 text-white">
        <h2 className="text-2xl mt-10 ml-40">Proyectos</h2>

        <div className="self-start mt-14">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-emerald-400 hover:bg-emerald-500 text-zinc-900 font-medium px-4 py-2 flex items-center gap-2 border border-emerald-500 cursor-pointer"
          >
            Nuevo Proyecto <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-zinc-700 flex justify-center items-start p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-6xl">
          <TablaProyectos />
        </div>
      </div>
      <PopupNuevoProyecto
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
}

function PopupNuevoProyecto({ isOpen, onClose }) {
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

        <h3 className="text-xl font-semibold mb-4">Nuevo Proyecto</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("nuevo proyecto");
            onClose();
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              required
              placeholder="Escribe el nombre del proyecto"
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
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-900 text-sm font-semibold cursor-pointer"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
