"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";

import { ChevronDown, PanelLeftClose, PanelLeft, Loader2 } from "lucide-react";

import { request } from "@/app/api";

/**
 * Barra lateral desplegable que contiene atajos hacia las rutas: /, /projects y /projects/[id],
 * en este último caso se muestran los últimos 4 proyectos visitados; los más recientes.
 *
 * @example
 * <Sidebar />
 */
export function Sidebar() {
  // true cuando esta desplegado el sidebar y false en caso contrario
  const [isCollapsed, setIsCollapsed] = useState(false);
  // true cuando el mouse esta encima de la flecha al lado de "Proyectos"
  // false cuando no
  const [isHovered, setIsHovered] = useState(false);
  // cuando empiece a cargar la app se encontrará vacía, y cuando se renderice el
  // componente cargará datos de la API de proyectos, por el momento datos simulados
  //const [proyectos, setProyectos] = useState<ItemProyecto[]>([]);  // pendiente añadir tipado
  const [proyectos, setProyectos] = useState([]);
  // true mientras aun no hayan sido cargados en memoria los proyectos disponibles,
  // una vez que cargan los proyectos, la variable cambia a false
  // el contenido renderizado en el Sidebar cambia dependiendo de este estado
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const res = await request("/projects/", "GET", undefined, "projects");
      if (res.error) {
        alert("error - " + res.msg);
        setLoadingProjects(false);
        return;
      }
      setProyectos(res);
      setLoadingProjects(false);
    }

    fetchProjects();
  }, []);
  // limita la cantidad de objetos a renderizar
  proyectos.slice(0, 5);
  return (
    <aside
      className={`
        fixed top-0 left-0 flex flex-col shrink-0 h-screen p-0 m-0 bg-black text-white transition-all duration-300 ease-in-out divide-y divide-gray-700 max-w-26.5 overflow-hidden
      `}
    >
      <button
        className={`
        p-2 overflow-scroll bg-pink-500 hover:bg-pink-600 focus:bg-pink-700 cursor-pointer
        
        ${isCollapsed ? "hidden" : "block"}
      `}
      >
        <Link href="/">Dashboard</Link>
      </button>
      <div
        className={`
        flex p-0

        ${isCollapsed ? "hidden" : "block"}
        `}
      >
        <button className="p-2 bg-pink-500 hover:bg-pink-600 focus:bg-pink-700 cursor-pointer">
          <Link href="/projects">Proyectos</Link>
        </button>
        {/** -------- flecha al lado de Proyectos -------- */}
        <div
          className={`
            flex flex-col justify-center shrink-0 transition-transform duration-200 bg-pink-500 hover:bg-pink-600
            relative
            ${isCollapsed ? "-rotate-90" : ""}
          `}
          onMouseEnter={() => setIsHovered(true) }
          onMouseLeave={() => setIsHovered(false)}
        >
          <ChevronDown
            className={`
            w-5 h-5
            
            ${isCollapsed ? "-rotate-90" : ""}
          `}
          />
        </div>
        {/** -------- flecha al lado de Proyectos -------- */}
        {isHovered &&
          typeof window !== "undefined" &&
          document.getElementById("recent-projects-container") &&
          createPortal(
            <div
              className="bg-gray-900 flex flex-col divide-y divide-gray-700"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {loadingProjects ? (
                <div className="flex items-center justify-center pt-2 pb-2 text-sm text-pink-200">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Cargando...
                </div>
              ) : proyectos.length > 0 ? (
                proyectos.map((item) => (
                  <Link
                    key={item.id}
                    href={`http://localhost:3000/projects/${item.id}` }
                    className="block px-4 py-2 text-sm text-white hover:bg-pink-700 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-400">
                  Sin proyectos
                </div>
              )}
            </div>,
            document.getElementById("recent-projects-container")!,
          )}
        {/** ------------------------- */}
      </div>
      <div id="recent-projects-container" className="flex-1"></div>
      <button
        className="p-2 bg-pink-500 hover:bg-pink-600 focus:bg-pink-700 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <PanelLeft className="w-5 h-5 shrink-0" />
        ) : (
          <PanelLeftClose className="w-5 h-5 shrink-0" />
        )}
      </button>
    </aside>
  );
}
