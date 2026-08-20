"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { request } from "@/app/api";

export default function Page() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // true mientras se este enviando la petición al servidor, el botón de enviar
  // se desactiva mientras la petición este en progreso
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      username: user,
      password: password,
    };
    const res = await request("/login/", "POST", data);
    if (res.error) {
      alert("error - " + res.msg);
      setIsSubmitting(false);
      return;
    }
    const tokens = res;
    // guardar el access token jwt en una cookie para que el middleware
    // pueda verificar el inicio de sesión al navegar entre rutas
    // el refresh token no se utiliza en esta aplicación
    document.cookie = `access_token=${tokens.access}; path=/; max-age=3600`;

    // redirigir al dashboard
    router.push("/");
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="mx-2 md:mx-10">
        <h1 className="text-white">TaskTracker</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            {/* -------- Username -------- */}
            <label className="block text-sm font-medium mb-1 text-white">Usuario</label>
            <input
              type="text"
              required
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Usuario"
              className="w-full px-3 py-2 bg-black border border-gray-600 text-white focus:outline-none focus:border-pink-500"
            />
            {/* -------- Password -------- */}
            <label className="block text-sm font-medium mb-1 text-white">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-3 py-2 bg-black border border-gray-600 text-white focus:outline-none focus:border-pink-500"
            />
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold cursor-pointer"
            >
              {isSubmitting ? "Buscando..." : "Iniciar Sesión"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
