"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

import { Plus } from "lucide-react";
import { X } from "lucide-react";

export default function NewModelButton({ text, placeholder }) {
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
      <PopupNuevoProyecto
        text={text}
        placeholder={placeholder}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
}

function PopupNuevoProyecto({ text, placeholder, isOpen, onClose }) {
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

        <h3 className="text-xl font-semibold mb-4">{text}</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              required
              placeholder={placeholder}
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
