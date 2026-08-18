"use client";

import { useState } from "react";

export default function Page() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  // true mientras se este enviando la petición al servidor, el botón de enviar
  // se desactiva mientras la petición este en progreso
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      user: user,
      password: password,
    };
    console.log(data);

    const response = await fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Error al iniciar sesión.`);

    const createdTask = await response.json();
    console.log("Tarea creada exitosamente:", createdTask);

    // limpiar el formulario y cerrar
    setUser("");
    setPassword("");
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="mx-2 md:mx-10">
        <h1>TaskTracker</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            {/* -------- Username -------- */}
            <label className="block text-sm font-medium mb-1">Usuario</label>
            <input
              type="text"
              required
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Usuario"
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500"
            />
            {/* -------- Password -------- */}
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-900 text-sm font-semibold cursor-pointer"
            >
              {isSubmitting ? "Buscando..." : "Iniciar Sesión"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
